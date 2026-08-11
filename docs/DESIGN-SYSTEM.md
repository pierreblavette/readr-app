# Readr — Design System

> Document de synthèse **auto-suffisant** du refacto du design system. Carte narrative + technique. La **source visuelle** de vérité reste le DS live à `/design-system` (65 pages) ; ce document en est le plan. Pour la vue projet, voir [`PROJECT.md`](./PROJECT.md).

---

## Philosophie

Le design system est **multipage**, servi à `/design-system` (dossier `app/design-system/`). C'était historiquement un **monolithe** (une page géante) ; il a été éclaté en pages autonomes, la bascule finale correspondant au commit `93c04b7f`. Le monolithe a été supprimé.

Deux principes gouvernent tout le chantier :

1. **DS reuse > classes parallèles.** Avant toute nouvelle classe CSS, chercher si une classe DS couvre déjà le besoin ; l'étendre par un modifier plutôt que créer un doublon.
2. **CSS structurel centralisé > patchs locaux.** On raisonne architecture (gap-driven, `calc()`/`env()`, primitives), pas rustine.

---

## Taxonomie — 4 groupes

La sidebar est pilotée par `app/design-system/_lib/nav.js`.

- **Foundations** — les fondations. Ordre = **parcours d'apprentissage** (identité → couleur → typo → espace), volontairement **non alphabétique** : `logo, colors, typography, iconography, spacing, cell-row, shadows, strokes`.
- **Components** — inventaire **alphabétique** d'atomes (un composant, même intriqué, reste ici) : autocomplete, badges, buttons, card, checkbox, chip, dropdown, dropzone, empty, footer, inputs, list, message-box, modal, navigation-bar, panels, rating-stars, rows, segmented-pills, sidebar, spinner, toast, toggle, weekly-activity.
- **Patterns** — un **flux / comportement UX** (pas un composant) : `editing` (sélection + bulk), `filters`, `onboarding`, `overlays`.
- **Reference** — pages utilitaires : `dev-tools` (mapping de tokens, outils).

**Familles à sous-pages** : certains composants-familles déplient leurs variantes dans la sidebar (nav imbriquée, collapsible). Le parent = la page racine. Familles : **Cards** (book / dictionary / now-reading / quote), **Rows** (book / collection / quote / now-reading / dictionary / quiz), **Buttons** (dropdown-button / link / select), **Modals** (delete / finish-reading / form), **Panels** (book / quote), **Inputs** (text-field / textarea / search), **Filters** (row / panel), **Colors** (web / figma), **Editing** (kebab / bulk).

---

## Contrats d'architecture — le cœur du refacto

### Propagation CSS à sens unique (la règle la plus importante)

Deux feuilles de style :

- **`app/library/library.css`** — CSS **de production**. Change à la fois l'**app** ET le **/ds**.
- **`app/design-system/ds.css`** — scopé au **/ds seul**. Plus les pages `page.js` scopées.

Conséquence : un commit `feat(ds)` / `fix(ds)` qui ne touche que `ds.css` et les pages du DS a **zéro impact sur le produit**. C'est ce qui rend le refacto DS sûr à itérer. `ds.css` est importé **avant** `library.css` → toute neutralisation d'une règle prod dans le /ds se fait en double classe.

### `.ds-scene-frame` — padding des scènes mobiles

Contrat de padding uniforme des scènes de démonstration en mobile (≤600 px). **Opt-in** via la prop `className` du composant `DSSection`. Source unique dans `ds.css`. Évite que chaque page réinvente ses paddings.

### Familles de grilles

Trois familles de grilles de specimens, choisies selon la taille du contenu :

- **State grid** (`--cols-2` / défaut) — petits specimens, 2–3 états. 1 rangée en grand écran, 2 colonnes ≤1280, 1 colonne ≤600.
- **`--hold`** — specimens **larges** (~402 px, largeur iPhone). 2 colonnes au-dessus de 1400, 1 colonne en dessous.
- **Galleries** (`--cols-3` / `--cols-5`) — N colonnes à toutes largeurs (ex. planches d'illustrations).

Règle : toute piste 1-colonne « boxed » doit être `minmax(0, 1fr)`, jamais `1fr` nu (sinon un contenu `nowrap` bloque le rétrécissement).

### Cap `min(402px, 100%)`

Tout specimen de section States/Body est capé à `min(402px, 100%)` — 402 = largeur logique de l'iPhone 16 Pro. **Ce cap se vérifie en le mesurant** (le remplissage peut venir du CSS, pas d'une largeur inline), jamais en grepant.

### Redline — cotation runtime

Primitive de **cotation** (mesures affichées à l'exécution) : mesure les paddings/gaps réels d'un specimen et trace les cotes. Props : `boxSelector`, `boxPadSelector`, `gapSelector`, etc. C'est l'outil qui documente visuellement l'espacement dans le DS.

### Système typographique 3 voix

Trois façons de référencer un élément dans la doc, chacune avec un style visuel dédié :

- **token** → pastille bleue (`.ds-token-chip`).
- **classe CSS** → pastille grise copiable au clic (`.ds-class`).
- **valeur** → `<code>` gras non-bleu.

Copie au clic gérée par un handler délégué (zéro markup).

### Rythme de page & espacement

- **Rythme de page couplé** (`main-wrap` / `ds-section`) : 64 / 40 / 64 au-dessus de 600 px, 40 / 40 / 40 en dessous, latéral 16 sous 480.
- **Spacing** : hiérarchie **16 / 24 / 40 / 60**, gap-driven (le gap sur le container, pas des margins répétées sur les enfants).

### Couleurs — 2 mondes

La page Colors documente **deux mondes** : `web` (couleurs live, tirées du CSS) et `figma` (maintenu à la main, miroir des variables Figma). Règle : **tout changement de couleur se fait dans Figma ET dans `globals.css`** — les deux doivent rester synchronisés.

---

## Historique de migration

Monolithe → split multipage → **Components** bouclé → **Patterns** (Editing/Filtering/Onboarding/Overlays) → **passe Foundations** (application du contrat `.ds-scene-frame` à Spacing / Strokes / Shadows / Iconography) → fusion du *Language switcher* dans la page **Toggle** (3e type de bascule, avec Theme et View).

**Exclusions volontaires** : les pages **Logo** et **Typography** ne suivent pas les mêmes règles de scène et sont laissées de côté (ne pas y appliquer les contrats génériques sans demande explicite).

---

## Où trouver quoi

| Élément | Emplacement |
|---|---|
| Navigation / groupes / familles | `app/design-system/_lib/nav.js` |
| CSS scopé au DS | `app/design-system/ds.css` |
| CSS de production (app + /ds) | `app/library/library.css` |
| Tokens de couleur | `app/globals.css` (+ variables Figma) |
| Pages du DS | `app/design-system/<slug>/page.js` (65 pages) |

Le détail vivant du chantier (état d'avancement fin, pièges par page) est tenu dans la mémoire projet de l'environnement de travail ; **ce document est une photo stable**, le DS live reste la référence visuelle.

## Références Notion complémentaires

Deux pages Notion approfondissent ce document (à jour au moment de leur rédaction) :

- **Design System — Contrat des scènes /ds** : spécification exhaustive du contrat `.ds-scene-frame` (tableau des paddings par scène, exceptions §3 de la largeur specimen, familles de grilles, liste des pages migrées).
- **Breakpoints & Progressive Filters** : table de référence des breakpoints du projet (≤400 / ≤480 / ≤600 / ≤768 / ≤1080 / ≤1280) et mapping de promotion progressive des filtres de la Library.

Toutes deux sous le hub [📚 Readr](https://www.notion.so/Readr-331637ba44a18194bacad9015aa2e91a) dans Notion.
