# Sécurité — Readr

Document vivant. Date de création : 20 avril 2026. Synthèse de la session de durcissement sécurité du projet Readr.

---

## TL;DR

Durant une session de 20 avril 2026, **trois secrets en clair** ont été découverts et remédiés. L'ensemble du système de permissions Claude Code a été audité et nettoyé. Un filet de sécurité automatique (pre-commit) a été mis en place.

**Reste à faire** :
- Générer un nouveau PAT GitHub (fine-grained) et l'installer via Keychain macOS
- Ajouter des hooks Claude Code qui bloquent les actions risquées (touche `.env`, force-push sur main…)
- Auditer les MCPs actifs et désactiver ceux non utilisés sur Readr
- Dette architecturale : `NEXT_PUBLIC_WORKER_TOKEN` fuit dans le bundle JS navigateur — à migrer vers une API route Next.js

---

## Les trois fuites trouvées

### Fuite #1 — GitHub Personal Access Token dans l'URL du remote git

**Emplacement** : `.git/config`, stocké en clair dans `origin` :
```
https://ghp_wouU...@github.com/pierreblavette/readr-app.git
```

**Risque** : visible dans toute capture d'écran, backup, sync cloud, partage d'écran. Exécution de `git remote -v` l'affiche.

**Remédiation** :
- PAT révoqué sur GitHub
- Remote reconfiguré sans token : `git remote set-url origin https://github.com/pierreblavette/readr-app.git`
- Authentification future via Keychain macOS (`git config --global credential.helper=osxkeychain`)

### Fuite #2 — Token Vision Worker dans l'historique git

**Emplacement** : `_legacy/app.html` ligne 3521, puis dans 2 commits de l'historique public GitHub (`9ae45e1`, `1639c31`)

```js
const VISION_TOKEN = '6400b645…'; // (redacted, token revoked)
```

**Nature** : shared secret custom qui protège le Worker Cloudflare `readr-vision.pierreblavette.workers.dev` — pas une clé Google directement, mais donne accès au Worker qui consomme le quota Gemini.

**Risque** : quiconque lit les fichiers GitHub publics peut appeler le Worker, cramer le quota Gemini, faire monter la facture.

**Remédiation** :
- Secret Cloudflare `READR_TOKEN` rotaté (dashboard → Worker `readr-vision` → Variables & Secrets → Rotate)
- Token purgé de `_legacy/app.html`
- Nouveau token mis dans `.env.local` (déjà gitignored par défaut Next.js)
- Historique git non réécrit (option volontaire : le token rotaté est inoffensif, inutile de forcer un rewrite)

### Fuite #3 — GitHub PAT dans `~/.claude/settings.json`

**Emplacement** : la config globale Claude Code avait un PAT GitHub inscrit directement dans la section `env` pour alimenter le MCP GitHub :

```json
"env": {
  "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_rXgf..."
}
```

**Risque** : fichier en clair sur le disque ; si `~/.claude/` est un jour synchronisé (iCloud, backup Time Machine, etc.), le token part avec.

**Remédiation** :
- PAT révoqué sur GitHub
- Clé `env` retirée du fichier
- **À venir** : nouveau PAT fine-grained stocké dans Keychain macOS, jamais sur disque (voir plus bas)

---

## Purge des permissions Claude Code

### Avant

Les fichiers `.claude/settings.json` et `.claude/settings.local.json` contenaient, par "Allow always" accumulés au fil des sessions, des patterns qui contournaient le système de permissions :

- **Exécution de code arbitraire** : `Bash(python3)`, `Bash(python3 -:*)`, `Bash(npm run *)`, `Bash(npm run:*)`, `Bash(npx wrangler:*)`, `Bash(npx vercel *)`, `Bash(brew install *)`
- **Sudo** : `Bash(sudo launchctl:*)`, `Bash(sudo -n ls ...)`
- **Destructif** : `Bash(git push *)`, `Bash(git rm *)`, `Bash(git filter-branch *)`, `Bash(git reset *)`, `Bash(git stash *)`, `Bash(rm -rf /tmp/...)`, `Bash(pkill ...)`
- **Contrôle macOS** : `Bash(osascript ...)`
- Du bruit : ~15 entrées `Bash(curl -s ...localhost:3000/...)` hyper-spécifiques, commandes avec paths obsolètes, one-liners Python indéchiffrables

### Après

Allowlist réduite aux patterns **read-only, spécifiques et réutilisables** :
- `Bash(mdfind *)`, `Bash(gitleaks detect *)`, `Bash(gitleaks protect *)`, `Bash(diskutil info *)`, `Bash(openssl rand -hex *)` — commandes d'inspection sans effet de bord
- `Bash(git remote *)`, `Bash(git config *)`, `Bash(gh auth *)`, `Bash(defaults read *)` — lecture système et git
- `Bash(pip3 list:*)`, `Bash(uv --version)`, `Bash(brew --version)`, `Bash(jq --version)` — vérifications d'outils
- `Bash(curl * http://localhost:*)` — remplace les ~15 variantes de test Next.js en une seule entrée
- `Bash(chmod +x .git/hooks/*)` — gestion des hooks git
- MCPs et WebFetch conservés (ciblage par domaine précis pour WebFetch)

**Règle à retenir** : un wildcard sur un interpréteur (`python`, `node`, `npx`, `bash`) équivaut à donner à Claude les clés de la machine. Ne jamais accepter.

---

## Le filet de sécurité : pre-commit hook `gitleaks`

**Installé** : `.git/hooks/pre-commit` (non versionné — local à cette machine).

**Comportement** : avant chaque `git commit`, scan des fichiers en staging avec `gitleaks protect --staged`. Si un secret est détecté (token, clé API, credential avec forte entropie), le commit est **refusé** avec un message clair.

**Bypass** (à n'utiliser que sur faux positif confirmé) :
```bash
git commit --no-verify -m "..."
```

**Test de non-régression** : un commit contenant `const TOKEN = '<hex random>'` doit être bloqué et le HEAD doit rester inchangé.

**Limite connue** : le hook est local (non versionné). Si tu clones le repo sur un autre Mac ou invites un contributeur, le hook ne suit pas. Upgrade futur possible via [husky](https://typicode.github.io/husky/) ou `core.hooksPath`.

---

## Auth GitHub — plan Keychain macOS

### Principe

Au lieu d'avoir le PAT en clair dans `~/.claude/settings.json`, on le stocke dans le **Keychain macOS** (chiffré, propre à l'utilisateur, déverrouillé à la connexion). Un snippet dans ton shell profile lit le token au démarrage d'un terminal et l'expose comme variable d'environnement à Claude Code.

### Étape 1 — créer un PAT fine-grained sur GitHub

https://github.com/settings/personal-access-tokens

- **Type** : Fine-grained personal access token
- **Name** : `claude-code-readr`
- **Expiration** : No expiration (OK car stockage Keychain)
- **Repository access** : Only select repositories → `pierreblavette/readr-app`
- **Permissions** → Repository permissions :
  - Contents : Read and Write
  - Metadata : Read-only (obligatoire)
  - Issues : Read and Write (optionnel, si tu veux gérer issues/PRs via Claude)
  - Pull requests : Read and Write (optionnel)

### Étape 2 — stocker le PAT dans Keychain

```bash
security add-generic-password \
  -a "$USER" \
  -s "claude-github-pat" \
  -w "ghp_..."
```

### Étape 3 — l'exposer à Claude Code via le shell profile

Ajouter dans `~/.zshenv` (créer le fichier si absent) :
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="$(security find-generic-password -a "$USER" -s "claude-github-pat" -w 2>/dev/null)"
```

Puis redémarrer le terminal et Claude Code. La variable sera présente en mémoire du process mais **jamais sur disque en clair**.

### Vérifier que ça marche

```bash
# dans un nouveau terminal
echo "${GITHUB_PERSONAL_ACCESS_TOKEN:0:8}..."
# doit afficher "ghp_xxxx..." sans afficher le token complet
```

---

## Dette architecturale à corriger plus tard

### `NEXT_PUBLIC_WORKER_TOKEN` fuite dans le bundle navigateur

Le code Next.js (`components/library/AddModal.js`, `AddQuoteModal.js`) utilise `process.env.NEXT_PUBLIC_WORKER_TOKEN` pour authentifier les appels au Worker Vision. **Toute variable `NEXT_PUBLIC_*` est inlined dans le bundle JavaScript livré au navigateur** — donc visible par n'importe quel visiteur via DevTools.

**Solution propre** : une API route Next.js (`app/api/vision/route.js`) qui :
- Lit le token côté serveur (via `process.env.WORKER_TOKEN`, sans préfixe `NEXT_PUBLIC_`)
- Reçoit l'image depuis le front, forward la requête au Worker Cloudflare avec le header `X-Readr-Token`
- Renvoie la réponse au front

Le token ne quitte jamais le serveur Next.js. À faire lors de la prochaine itération sur la feature OCR.

### Hook pre-commit non versionné

Le filet `gitleaks` est dans `.git/hooks/pre-commit`, non versionné. Pour qu'il suive le repo et ne dépende pas de cette machine : versionner via [husky](https://typicode.github.io/husky/) (`npm install --save-dev husky`) ou via `core.hooksPath` pointant vers un dossier `scripts/hooks/` versionné.

### Hooks Claude Code automatiques

Pas encore configurés. Objectifs :
- Bloquer avant exécution toute commande qui touche `.env`, `.env.local`, `.ssh/`, `credentials.json`, etc.
- Bloquer `git push --force` sur `main` / `master` / `production`
- Alerter si Claude tente d'éditer des fichiers qui ressemblent à de la config sensible

À configurer dans `~/.claude/settings.json` section `hooks` (voir doc Claude Code — skill `update-config`).

### Audit MCP

7 serveurs MCP actifs sur ce compte Claude Code : Figma, Playwright, GitHub, Notion, Gmail, Calendar, Drive. Chacun a ses propres credentials.

À faire :
- Lister lesquels sont vraiment utilisés sur Readr
- Désactiver les autres dans `~/.claude/settings.json` section `enabledPlugins`
- Vérifier les scopes : par exemple, si le MCP GitHub ne sert qu'à lire, le PAT doit être en lecture seule

---

## Cheat-sheet — opérations courantes

### Rotater le secret du Worker Cloudflare
1. Dashboard Cloudflare → Workers & Pages → `readr-vision` → Settings → Variables and Secrets
2. Trouver `READR_TOKEN` → cliquer **Rotate**
3. Générer une nouvelle valeur : `openssl rand -hex 24` en terminal
4. Coller la valeur → **Deploy**
5. Mettre à jour `.env.local` avec la même valeur

### Scanner le repo à la recherche de secrets
```bash
gitleaks detect --source . --no-banner --redact --verbose
```

### Générer un token aléatoire
```bash
openssl rand -hex 24    # 48 caractères hex (192 bits d'entropie)
```

### Vérifier que le remote git n'expose pas de token
```bash
git remote -v
# doit afficher uniquement https://github.com/.../repo.git — pas de ghp_ dedans
```

### Tester que le hook pre-commit bloque bien
```bash
# créer un fichier avec un faux token
echo "const TOKEN = '$(openssl rand -hex 24)';" > /tmp/test-leak.js
cp /tmp/test-leak.js ./security-test.js
git add security-test.js
git commit -m "this must fail"   # doit être bloqué
# cleanup
git reset HEAD security-test.js
rm security-test.js
```

---

## Commit signing SSH

Depuis le 20 avril 2026, tous les commits (et tags) créés depuis cette machine sont signés avec une clé **Ed25519 dédiée** (`~/.ssh/id_ed25519_signing`). La clé publique est enregistrée sur GitHub comme Signing Key, ce qui fait apparaître le badge **Verified** à côté de chaque commit sur github.com/pierreblavette/readr-app.

Config globale git (`~/.gitconfig`) :
- `gpg.format = ssh`
- `user.signingkey = ~/.ssh/id_ed25519_signing.pub`
- `commit.gpgsign = true`
- `tag.gpgsign = true`
- `gpg.ssh.allowedSignersFile = ~/.ssh/allowed_signers`

Vérifier une signature en local :
```bash
git log --show-signature -1
# doit afficher: Good "git" signature for pierre.blavette@gmail.com
```

## Historique des incidents

| Date | Incident | Résolution |
|---|---|---|
| 2026-04-20 | PAT GitHub en clair dans `.git/config` remote URL | PAT révoqué, remote réécrit, helper Keychain activé |
| 2026-04-20 | Vision Worker token en clair dans `_legacy/app.html` + historique git public | Token Cloudflare rotaté, fichier purgé |
| 2026-04-20 | PAT GitHub en clair dans `~/.claude/settings.json` | PAT révoqué, plan Keychain défini |
