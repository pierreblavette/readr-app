// Composants et constantes partagés par la famille Text Input :
// racine (overview) + Text Field + Textarea + Search Field.

export const QUOTE = "« The world was ending and there was nothing to be done about it. »";

export const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><line x1="12" y1="7.5" x2="12" y2="13" /><line x1="12" y1="16.5" x2="12" y2="16.5" />
  </svg>
);

export const WarnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5 22 20.5H2Z" /><line x1="12" y1="10" x2="12" y2="14.5" /><line x1="12" y1="17.5" x2="12" y2="17.5" />
  </svg>
);

// Champ canonique (label + field + helper), focus forcé pour se démarquer sur la
// scène bleue (au repos, bg --bg3 + bord transparent se confondent avec le bleu).
// Réutilisé par la racine et Text Field (Preview / Anatomy).
export function Field() {
  return (
    <div className="modal-field" style={{ width: "100%" }}>
      <label className="modal-field-label">Title</label>
      <input type="text" className="modal-field-input is-focus" defaultValue="Normal People" readOnly style={{ width: "100%" }} />
      <span className="modal-field-hint">10 or 13 digits, dashes optional.</span>
    </div>
  );
}

// Champ de recherche (loupe + input + clear). focus = classe .is-focus (miroir /ds
// du :focus-within, la doc n'ayant pas de vrai focus).
export function SearchBox({ focus = false, style }) {
  return (
    <div className="search-box" style={{ minWidth: 0, ...style }}>
      <SearchIcon />
      <input type="text" className={`search-input${focus ? " is-focus" : ""}`} defaultValue="Sally Rooney" readOnly />
      <button type="button" className="search-clear visible" aria-label="Clear">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
      </button>
    </div>
  );
}
