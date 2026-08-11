# Readr — vue projet

> Document de synthèse **auto-suffisant** : lisible sans accès au repo. Destiné à un onboarding rapide (humain ou assistant IA). Pour le détail du design system, voir [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).
>
> **Répartition des sources** : ce repo (`docs/`) porte la **vérité technique** (stack, archi, état réel). Le [PRD Notion](https://www.notion.so/Readr-331637ba44a18194bacad9015aa2e91a) porte la **vérité produit vivante** (vision détaillée, roadmap, backlog d'idées, questions ouvertes). En cas de divergence sur un fait technique, ce document fait foi.

---

## Ce qu'est Readr

Application de **suivi de lecture** personnelle. On y range ses livres (lus, en cours, wishlist), on capture des citations, on définit des mots, on suit ses statistiques de lecture. Baseline produit : *« Your books, finally in their place. »*

Positionnement clé : **local-first, sans compte**. Aucune donnée sur un serveur, tout vit dans le navigateur. C'est un **différenciateur assumé** face à Goodreads / StoryGraph, pas une limitation temporaire (voir « Décisions structurantes »).

Bilingue **EN / FR** (bascule i18n dans l'app). Installable en **PWA** (offline, écran d'accueil iOS/Android).

Cible mobile de référence : **iPhone 16 Pro** (largeur logique 402 px). Toute la responsivité et le design system se calibrent sur cette largeur.

---

## Le problème adressé

Les solutions existantes (Goodreads, StoryGraph, Babelio) frottent sur plusieurs points :

- interfaces surchargées, pensées réseau social avant gestion personnelle ;
- pas de capture physique rapide (photo → livre identifié automatiquement) ;
- données hébergées chez des tiers, sans export ni contrôle réels ;
- pas de mode offline / local-first.

Readr répond par une approche **minimaliste, local-first, et un design system maison rigoureux**.

## Vision & horizons

> Une bibliothèque personnelle belle, rapide et intelligente — qui fonctionne seule, et qui grandit avec toi.

- **Horizon 1 — maintenant** : outil personnel, single-user, `localStorage`. C'est l'état décrit par ce document.
- **Horizon 2 — moyen terme** : accès multi-appareils. La piste retenue est une **synchro Google Drive** (l'app lit/écrit un unique JSON dans le Drive de l'utilisateur — voir « Décisions structurantes »), pas un backend propriétaire.
- **Horizon 3 — long terme, hypothétique** : ouverture multi-utilisateurs / SaaS. Non engagé, et subordonné à l'arbitrage auth ci-dessous.

Cibles : le **lecteur exigeant** (20–50 livres/an, souvent physiques, veut tracker sans réseau social ni pub, sensible au design) et, à l'horizon SaaS, un **utilisateur cherchant une alternative privée à Goodreads**, accessible mobile + desktop.

> Roadmap détaillée et backlog d'idées (Author lookup, Shelf view, Smart collections, Web Share, Quote of the day…) : maintenus **vivants dans le [PRD Notion](https://www.notion.so/Readr-331637ba44a18194bacad9015aa2e91a)**, pas ici — ce document reste une photo stable.

---

## Stack technique

| Couche | Techno |
|---|---|
| Framework | **Next.js 16.2** (App Router) + **React 19** |
| Hébergement front | **Vercel** — auto-deploy à chaque push sur `main` |
| Backend AI | **Cloudflare Worker** `readr-vision` (dépôt séparé, dossier `worker/`) |
| PWA | **serwist** (`@serwist/turbopack`) — SW offline + manifest + splash iOS |
| Persistance | **localStorage** uniquement — pas de base de données, pas d'auth |
| Police | **Plus Jakarta Sans** (police unique ; Fraunces a été retirée) |
| Build | Turbopack |

Port de dev : **3000** (`npm run dev`).

---

## Architecture de l'app

Tout vit sous `app/` (App Router Next.js) :

- **`app/library/`** — le **produit réel** : bibliothèque, overview, collections, citations, dictionnaire, activité. C'est l'app que l'utilisateur voit.
- **`app/design-system/`** — le **design system** documenté, servi à `/design-system` (voir `DESIGN-SYSTEM.md`). 65 pages. N'impacte pas le produit.
- **`app/api/vision/*`** — **proxies serveur** vers le Cloudflare Worker. Une route Next.js par endpoint AI (`books`, `quote`, `cast`, `quiz`, `define`, `barcode`). Leur rôle : garder le secret `WORKER_TOKEN` **côté serveur**, jamais dans le bundle navigateur.
- **`app/sw.js` + `app/serwist/[path]/route.js`** — service worker PWA (SW servi à la demande, pas de fichier statique dans `public/`).
- **`app/manifest.js`, `app/layout.js`** — manifest PWA + métadonnées / viewport / theme-color dynamiques.

**État & persistance** : un hook `useLibrary` centralise le state produit, persisté dans `localStorage` (livres, citations, mots, objectif de lecture, collections…). Pas de backend de données. `lib/useStats.js` dérive les statistiques (streak, top genres, most loved…) à partir de ce state.

---

## Features AI (via le Vision Worker)

Le Worker `readr-vision` proxy des appels **Gemini** (cascade `gemini-2.5-flash` → `gemini-2.5-flash-lite`) et Google Books / OpenLibrary. Il est protégé par un secret partagé (`X-Readr-Token`).

- **Scan ISBN / code-barres** — ajout d'un livre par photo ou caméra (BarcodeDetector natif).
- **Covers** — OpenLibrary en primaire, Google Books en fallback.
- **Define** — définition de dictionnaire pour un mot sauvegardé.
- **Quote** — extraction OCR de citations depuis une photo de page.
- **Character Cast** — génération du casting des personnages d'un livre.
- **Book Quiz** — QCM généré après avoir marqué un livre comme terminé.

> Piège connu : Google déprécie silencieusement les anciens modèles Gemini. Sur un bug « Scan failed », vérifier **d'abord** la page de dépréciation Google. Le fallback doit toujours rester dans la **même génération** de modèles.

---

## Features produit livrées

- **Now Reading** — livres en cours, en tête de bibliothèque.
- **Overview Dashboard** (v1→v3) — hero stats, objectif de lecture, streak, top genres, top authors, most loved (4★+), quotes spotlight, pace vs goal.
- **Collections** — regroupements de livres (limite 10, opérations bulk atomiques).
- **Dictionary** — mots sauvegardés, tables A–Z groupées par lettre.
- **Activity** — graphe d'activité hebdo / mensuel + panneau du jour.
- **Wishlist** — + « Find online » (recherche Amazon / Fnac).
- **Quotes** — capture, favoris (bookmark), panneaux latéraux.
- **Édition** — kebab par carte, sélection + actions groupées (bulk).
- **Toast** — pattern de confirmation unifié.
- **PWA** — manifest, maskable Android, SW offline, splash iOS.

---

## Landing (projet séparé)

Le site marketing est un **projet distinct** : `~/Documents/Projects/Readr/Landing/`, à côté de `Readr/App/`.

- Stack : **Astro** + **Tailwind v4** + **GSAP** (ScrollTrigger, SplitText, Flip).
- 10 sections scroll-driven, déployé standalone sur Vercel (`readr-landing.vercel.app`).
- À terme : landing sur le domaine racine, l'app sur `app.readr.*`.

Ne pas confondre les deux dépôts : ce document décrit **l'app**.

---

## Décisions structurantes

- **Pas d'auth, pas de backend de données.** Choix assumé (local-first = différenciateur ; le vibe-coding évite la dette d'un stack auth/sync/RGPD). Si le besoin de sync multi-device émerge un jour, la piste **canonique** est une **synchro Google Drive** : l'app lit/écrit un unique JSON dans le Drive de l'utilisateur, Readr ne stocke toujours rien (RGPD délégué à Google, promesse « tu possèdes tes données » préservée). L'ancienne option d'un backend propriétaire (**Cloudflare D1 + OAuth**, évoquée dans le PRD comme horizon SaaS) est **dépassée par ce choix** — à ne réévaluer que si un vrai SaaS multi-utilisateurs est priorisé. **Ne pas relancer le sujet auth** sans demande explicite.
- **Token Worker sanctuarisé serveur.** Tout nouvel endpoint Worker doit passer par une route miroir `app/api/vision/<nom>/route.js` lisant `process.env.WORKER_TOKEN`. Ne jamais ressusciter une variable `NEXT_PUBLIC_*` pour un secret.
- **iOS PWA ≠ Safari** — le storage d'une PWA installée est isolé de Safari (isolation Apple).

---

## Repères pour démarrer

```bash
npm run dev      # dev server sur http://localhost:3000
npm run build    # build de prod (Turbopack)
```

- L'app : `http://localhost:3000/library`
- Le design system : `http://localhost:3000/design-system`
