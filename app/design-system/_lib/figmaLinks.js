// Ponts DS web → fichier Figma (lecture seule).
// Source unique slug (route /design-system/<slug>) → node-id de la page Figma.
// Le partage du fichier (Anyone with the link → can view) se règle côté Figma,
// pas ici : ces liens ne sont que des URLs, ils respectent ce partage.
//
// On n'active une entrée QUE lorsque la page Figma correspondante existe et est
// validée. FigmaCard ne rend rien pour un slug absent — d'où un déploiement
// page par page sans lien mort.

const FILE = "kkuToKrC2Vk5YF2W9nXjc6";

// slug → node-id Figma (format "123:456"). Déployé au fil de l'eau.
export const FIGMA_NODES = {
  // Foundations
  colors: "1495:2",

  // Components (pages Figma existantes — à brancher au fil du déploiement) :
  // buttons: "663:2", card: "876:8", rows: "875:8", modal: "716:2",
  // inputs: "721:2", list: "1214:8", "message-box": "865:8", sidebar: "1125:8",
  // toggle: "744:2", tabs: "645:546", checkbox: "739:2", chip: "844:9",
  // badges: "835:8", toast: "1208:8", spinner: "851:8", dropdown: "992:8",
  // dropzone: "659:2", empty: "1026:8", footer: "1033:8", "navigation-bar": "1062:8",
  // "rating-stars": "848:8", "segmented-pills": "856:8", panels: "1131:8",
  // "weekly-activity": "920:8", autocomplete: "862:8", logo: "246:1413",
};

// URL profonde vers la page/le node Figma. null si le slug n'est pas (encore) mappé.
export function figmaUrl(slug) {
  const node = FIGMA_NODES[slug];
  if (!node) return null;
  return `https://www.figma.com/design/${FILE}/Readr?node-id=${node.replace(":", "-")}`;
}
