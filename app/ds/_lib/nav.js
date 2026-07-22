// Navigation du Design System multipage.
// NAV pilote la sidebar (groupes + ordre). On l'étend lot par lot au fil de la
// migration : n'y lister que les sections dont la route existe déjà, pour ne
// pas exposer de lien mort. NAV_LABELS peut rester complet dès maintenant.
export const NAV = {
  Foundations: ["logo", "colors", "typography", "spacing", "cell-row", "shadows", "strokes"],
  Components: ["autocomplete", "badges", "book-card-kebab", "book-chip", "buttons", "checkbox"],
};

// Groupes triés alphabétiquement à l'affichage. Foundations en est exclu : son
// ordre est un parcours d'apprentissage (identité → couleur → typo → espace),
// le casser rendrait la lecture arbitraire. Components, lui, est un inventaire
// plat de 17 atomes sans narration — l'alphabétique y est le seul ordre que le
// lecteur peut deviner, et il évite que l'ordre dérive au fil des migrations.
const ALPHA_GROUPS = ["Components"];

// Point d'entrée unique des consommateurs (sidebar + landing) : le tri vit ici,
// pas dupliqué dans chaque vue. Tri sur le LABEL affiché, pas sur le slug —
// c'est ce que le lecteur voit ("Book Card Kebab" avant "Book Chip").
export function sectionsOf(group) {
  const ids = NAV[group] ?? [];
  if (!ALPHA_GROUPS.includes(group)) return ids;
  return [...ids].sort((a, b) => (NAV_LABELS[a] ?? a).localeCompare(NAV_LABELS[b] ?? b));
}

export const NAV_LABELS = {
  "logo": "Logo", "colors": "Colors", "typography": "Typography",
  "spacing": "Spacing", "cell-row": "Cell Row", "shadows": "Shadows & Radius", "strokes": "Strokes & Borders",
  "buttons": "Buttons", "dropdown": "Dropdown Menu",
  "inputs": "Inputs", "view-toggle": "View Toggle", "badges": "Badges",
  "checkbox": "Checkbox", "autocomplete": "Autocomplete", "lang-switcher": "Language Switcher",
  "rating-stars": "Rating Stars", "row-checkbox": "Row Checkbox",
  "theme-toggle": "Theme Toggle", "book-chip": "Book Chip", "cloud-chip": "Cloud Chip", "book-card-kebab": "Book Card Kebab", "export-menu": "Export Menu", "sort-menu": "Sort Menu", "segmented-pills": "Segmented Pills",
  "card": "Book Card", "quote-card": "Quote Card", "dictionary-card": "Dictionary Card",
  "list": "List View", "sidebar": "Sidebar", "panel": "Side Panel", "quote-panel": "Quote Panel",
  "filters-panel": "Filters Panel", "filters-row": "Filters Row",
  "modal": "Modal", "delete-modal": "Delete Modal", "message-box": "Message Box", "upload-box": "Upload Box", "selection-bar": "Selection Bar", "toast": "Toast", "empty": "Empty State", "now-reading": "Now Reading", "weekly-activity": "Weekly Activity", "finish-reading": "Finish Reading Modal", "onboarding": "Onboarding", "footer": "Footer",
  "token-usage": "Token Usage", "dev-tools": "Dev Tools",
};
