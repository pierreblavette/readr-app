// Navigation du Design System multipage.
// NAV pilote la sidebar (groupes + ordre). On l'étend lot par lot au fil de la
// migration : n'y lister que les sections dont la route existe déjà, pour ne
// pas exposer de lien mort. NAV_LABELS peut rester complet dès maintenant.
export const NAV = {
  Foundations: ["logo", "colors", "typography", "iconography", "spacing", "cell-row", "shadows", "strokes"],
  Components: ["autocomplete", "badges", "buttons", "card", "checkbox", "chip", "dropdown", "dropzone", "empty", "footer", "inputs", "list", "message-box", "modal", "navigation-bar", "panels", "rating-stars", "rows", "segmented-pills", "sidebar", "spinner", "toast", "toggle", "weekly-activity"],
  // Patterns = explication d'un FONCTIONNEMENT UX (un flux, un comportement), pas un
  // composant. Ex. Editing (sélection + bulk), Filtering, Onboarding (accueil). Un
  // composant, même très intriqué (Modals, Autocomplete), reste dans Components.
  Patterns: ["editing", "filters", "onboarding", "overlays"],
  // Reference = pages utilitaires (mapping tokens, outils de dev). Ordre déclaré,
  // hors ALPHA_GROUPS : ce n'est pas un inventaire d'atomes.
  Reference: ["dev-tools"],
};

// Groupes triés alphabétiquement à l'affichage. Foundations en est exclu : son
// ordre est un parcours d'apprentissage (identité → couleur → typo → espace),
// le casser rendrait la lecture arbitraire. Components, lui, est un inventaire
// plat de 17 atomes sans narration — l'alphabétique y est le seul ordre que le
// lecteur peut deviner, et il évite que l'ordre dérive au fil des migrations.
const ALPHA_GROUPS = ["Components", "Patterns"];

// Items à sous-pages : un composant-famille (ex. Cards) déplie ses variantes dans la
// sidebar quand on est sur l'une d'elles. Le parent pointe sur la 1re (Foundation).
// Le parent (ex. « Cards » → /design-system/card) EST sa page racine (Foundation/overview) ; les
// enfants sont les variantes spécifiques. Clic sur le parent = va à la racine + déplie.
export const NAV_CHILDREN = {
  colors: [
    { label: "Web", href: "/design-system/colors/web" },
    { label: "Figma", href: "/design-system/colors/figma" },
  ],
  buttons: [
    { label: "Dropdown Button", href: "/design-system/buttons/dropdown-button" },
    { label: "Link", href: "/design-system/buttons/link" },
    { label: "Select", href: "/design-system/buttons/select" },
  ],
  card: [
    { label: "Book Card", href: "/design-system/card/book" },
    { label: "Dictionary Card", href: "/design-system/card/dictionary" },
    { label: "Now Reading", href: "/design-system/card/now-reading" },
    { label: "Quote Card", href: "/design-system/card/quote" },
  ],
  rows: [
    { label: "Book Row", href: "/design-system/rows/book" },
    { label: "Collection Row", href: "/design-system/rows/collection" },
    { label: "Quote Row", href: "/design-system/rows/quote" },
    { label: "Now Reading Row", href: "/design-system/rows/now-reading" },
    { label: "Dictionary Row", href: "/design-system/rows/dictionary" },
    { label: "Quiz Row", href: "/design-system/rows/quiz" },
  ],
  modal: [
    { label: "Delete Modal", href: "/design-system/modal/delete" },
    { label: "Finish Reading Modal", href: "/design-system/modal/finish-reading" },
    { label: "Form Modal", href: "/design-system/modal/form" },
  ],
  filters: [
    { label: "Filters Row", href: "/design-system/filters/row" },
    { label: "Filters Panel", href: "/design-system/filters/panel" },
  ],
  panels: [
    { label: "Book Panel", href: "/design-system/panels/book" },
    { label: "Quote Panel", href: "/design-system/panels/quote" },
  ],
  inputs: [
    { label: "Text Field", href: "/design-system/inputs/text-field" },
    { label: "Textarea", href: "/design-system/inputs/textarea" },
    { label: "Search Field", href: "/design-system/inputs/search" },
  ],
  editing: [
    { label: "Kebab", href: "/design-system/editing/kebab" },
    { label: "Bulk", href: "/design-system/editing/bulk" },
  ],
};

// Point d'entrée unique des consommateurs (sidebar + landing) : le tri vit ici,
// pas dupliqué dans chaque vue. Tri sur le LABEL affiché, pas sur le slug —
// c'est ce que le lecteur voit ("Book Card Kebab" avant "Book Chip").
export function sectionsOf(group) {
  const ids = NAV[group] ?? [];
  if (!ALPHA_GROUPS.includes(group)) return ids;
  return [...ids].sort((a, b) => (NAV_LABELS[a] ?? a).localeCompare(NAV_LABELS[b] ?? b));
}

export const NAV_LABELS = {
  "logo": "Logo", "colors": "Colors", "typography": "Typography", "iconography": "Iconography",
  "spacing": "Spacing", "cell-row": "Cell Row", "shadows": "Shadows & Radius", "strokes": "Strokes & Borders",
  "buttons": "Buttons", "dropdown": "Dropdown Menu",
  "inputs": "Text Input", "view-toggle": "View Toggle", "badges": "Badges",
  "checkbox": "Checkbox", "autocomplete": "Autocomplete", "lang-switcher": "Language Switcher",
  "rating-stars": "Rating Stars", "row-checkbox": "Row Checkbox",
  "theme-toggle": "Theme Toggle", "toggle": "Toggle", "rows": "Rows", "book-row": "Book Row", "chip": "Chip", "book-card-kebab": "Kebab", "export-menu": "Export Menu", "sort-menu": "Sort Menu", "segmented-pills": "Segmented Pills",
  "card": "Cards", "quote-card": "Quote Card", "dictionary-card": "Dictionary Card",
  "list": "Table", "sidebar": "Side Menu", "panels": "Side Panels",
  "filters": "Filtering", "filters-panel": "Filters Panel", "filters-row": "Filters Row",
  "editing": "Editing", "kebab": "Kebab", "bulk": "Bulk", "overlays": "Overlays",
  "modal": "Modals", "delete-modal": "Delete Modal", "navigation-bar": "Navigation Bar", "message-box": "Box Message", "upload-box": "Upload Box", "selection-bar": "Selection Bar", "toast": "Toast", "empty": "Empty State", "now-reading": "Now Reading", "weekly-activity": "Data Visualization", "finish-reading": "Finish Reading Modal", "onboarding": "Onboarding", "footer": "Footer", "spinner": "Spinner", "dropzone": "Dropzone",
  "token-usage": "Token Usage", "dev-tools": "Dev Tools",
};
