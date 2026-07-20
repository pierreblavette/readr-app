// Navigation du Design System multipage.
// NAV pilote la sidebar (groupes + ordre). On l'étend lot par lot au fil de la
// migration : n'y lister que les sections dont la route existe déjà, pour ne
// pas exposer de lien mort. NAV_LABELS peut rester complet dès maintenant.
export const NAV = {
  Foundations: ["logo", "colors", "typography", "spacing", "cell-row", "shadows", "strokes"],
};

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
