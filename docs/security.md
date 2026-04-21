# Sécurité — Readr

Document vivant. Date de création : 20 avril 2026. Synthèse de la session de durcissement sécurité du projet Readr.

---

## TL;DR

Session du 20 avril 2026 : **quatre secrets en clair** ont été découverts puis remédiés (3 initiaux + 1 découvert pendant le sweep étendu). L'ensemble du système de permissions Claude Code a été audité et nettoyé. Plusieurs filets de sécurité automatiques ont été mis en place.

**Livrables finaux** :
- ✅ Tous les secrets sur disque en clair déplacés vers Keychain macOS ou rotatés
- ✅ PAT GitHub fine-grained chargé depuis Keychain via `~/.zshenv` (plus jamais sur disque en clair)
- ✅ `NEXT_PUBLIC_WORKER_TOKEN` supprimé du bundle navigateur — remplacé par API routes Next.js (`app/api/vision/books`, `/quote`)
- ✅ Pre-commit `gitleaks` versionné via husky — versionné dans le repo, réinstallé à chaque `npm install`
- ✅ Hook Claude Code global `security-guard.sh` qui bloque sudo, force-push, rm -rf, écritures sur SSH keys/credentials
- ✅ Permissions Claude Code purgées (plus de wildcards dangereux / interpréteurs / sudo)
- ✅ Commit signing SSH Ed25519 configuré, tous les commits depuis le 20 avril sont signés et Verified sur GitHub
- ✅ `.gitignore` durci (env variants, clés privées, credentials, databases)
- ✅ Connecteurs claude.ai inutilisés déconnectés (Gmail, Calendar, Drive)
- ✅ Plugin Claude Code tiers désactivé

**Reste ouvert** (non-bloquant, à évaluer plus tard) :
- Sandbox Claude Code volontairement non activé (voir section dédiée plus bas)
- Audit MCP : scope fin des credentials des MCPs restants (Figma/Notion/GitHub), à faire si niveau de paranoïa augmente

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

## Suivi des dettes architecturales

### ✅ `NEXT_PUBLIC_WORKER_TOKEN` fuite dans le bundle — résolu

Les appels Vision Worker passent désormais par des API routes Next.js serveur-side (`app/api/vision/books/route.js`, `app/api/vision/quote/route.js`) qui lisent `WORKER_TOKEN` via `process.env` (sans préfixe `NEXT_PUBLIC_`). Le token vit uniquement dans `.env.local` côté serveur et dans le Worker Cloudflare — il ne touche plus jamais le bundle JS navigateur.

### ✅ Hook pre-commit versionné — résolu

Husky installé (`npm install --save-dev husky`), hook `gitleaks` vit dans `.husky/pre-commit` versionné dans le repo. À chaque `npm install`, husky réinstalle automatiquement le hook. Plus de dépendance à `.git/hooks/` local.

### ✅ Hooks Claude Code automatiques — résolu

`~/.claude/hooks/security-guard.sh` branché sur `PreToolUse` (Bash/Edit/Write) dans `~/.claude/settings.json`. Bloque sudo, `git push --force`, `rm -rf` sur paths critiques, `chmod 777`, écritures sur clés SSH privées ou fichiers de credentials, écritures sur `.env.production`.

### Sandbox Claude Code — étudié, volontairement non activé

Claude Code propose un mode sandbox macOS-natif (section `sandbox` dans `~/.claude/settings.json`) qui cage les commandes bash : filesystem restreint, network allowlist, etc. Il offrirait une défense en profondeur contre le prompt injection (ex. une commande `curl pastebin.com` exfiltration qui serait bloquée même si elle passait les permissions et hooks).

**Décision au 20 avril 2026 : non activé.** Le stack existant (allowlist de permissions, hook `security-guard.sh`, gitleaks, secrets en Keychain, commits signés) couvre déjà largement le modèle de menace d'un dev solo. L'activation du sandbox implique 30-60 min de tuning (npm/wrangler/Next.js cassent à la première exécution tant que les exceptions ne sont pas écrites), et chaque nouveau projet demande re-tuning.

**Seuils de déclenchement pour réévaluer** : incident réel de prompt injection, ajout d'un teammate au projet, ou élévation du profil de risque (clés payantes importantes dans le compte).

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
| 2026-04-20 | PAT GitHub en clair dans `~/.claude/settings.json` | PAT révoqué, remplacé par nouveau PAT fine-grained dans Keychain + `~/.zshenv` |
| 2026-04-20 | Google API Key en clair dans `~/.claude/.env` (découvert pendant sweep étendu) | Clé déplacée dans Keychain (`claude-google-api-key`), fichier supprimé, chargée via `~/.zshenv` comme `GOOGLE_API_KEY` |
