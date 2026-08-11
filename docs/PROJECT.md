# Readr — vue projet

> Document de synthèse **auto-suffisant** : lisible sans accès au repo. Destiné à un onboarding rapide (humain ou assistant IA). Pour le détail du design system, voir [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

---

## Ce qu'est Readr

Application de **suivi de lecture** personnelle. On y range ses livres (lus, en cours, wishlist), on capture des citations, on définit des mots, on suit ses statistiques de lecture. Baseline produit : *« Your books, finally in their place. »*

Positionnement clé : **local-first, sans compte**. Aucune donnée sur un serveur, tout vit dans le navigateur. C'est un **différenciateur assumé** face à Goodreads / StoryGraph, pas une limitation temporaire (voir « Décisions structurantes »).

Bilingue **EN / FR** (bascule i18n dans l'app). Installable en **PWA** (offline, écran d'accueil iOS/Android).

Cible mobile de référence : **iPhone 16 Pro** (largeur logique 402 px). Toute la responsivité et le design system se calibrent sur cette largeur.

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

- **Pas d'auth, pas de backend de données.** Choix assumé (local-first = différenciateur ; le vibe-coding évite la dette d'un stack auth/sync/RGPD). Si le besoin de sync multi-device émerge un jour, la piste privilégiée est une **synchro Google Drive** (l'app lit/écrit un unique JSON dans le Drive de l'utilisateur — Readr ne stocke toujours rien). **Ne pas relancer le sujet auth** sans demande explicite.
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
