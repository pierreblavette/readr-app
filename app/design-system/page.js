import { existsSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { NAV, NAV_LABELS, sectionsOf } from "./_lib/nav";
import { MessageBox } from "./message-box/_specs";
import LogoLockup from "@/components/brand/LogoLockup";

// Covers déposés dans _covers/{foundations,components,patterns}/ (mix .svg + .jpg),
// copiés dans public/ds-covers/ et servis en <img> statique (data-URI éviterait mais
// gonflerait le HTML). Map : id de card → chemin relatif dans _covers (garde existsSync
// + basename de l'URL /ds-covers/). Après mise à jour d'un cover, re-copier vers public.
const COVERS = {
  // Foundations (svg)
  logo: "foundations/cover-logo.svg",
  colors: "foundations/cover-color.svg",
  typography: "foundations/cover-typography.svg",
  iconography: "foundations/cover-icon.svg",
  spacing: "foundations/cover-spacing.svg",
  "cell-row": "foundations/cover-cell.svg",
  shadows: "foundations/cover-radius.svg",
  strokes: "foundations/cover-strokes.svg",
  // Components (jpg)
  autocomplete: "components/cover-autocomplete.jpg",
  badges: "components/cover-badge.jpg",
  "book-row": "components/cover-book-row.jpg",
  buttons: "components/cover-box-buttons.jpg",
  card: "components/cover-box-cards.jpg",
  checkbox: "components/cover-checkbox.jpg",
  chip: "components/cover-chip.jpg",
  dropdown: "components/cover-dropdown-menu.jpg",
  dropzone: "components/cover-dropzone.jpg",
  empty: "components/cover-empty-state.jpg",
  footer: "components/cover-footer.jpg",
  inputs: "components/cover-text-input.jpg",
  list: "components/cover-table.jpg",
  "message-box": "components/cover-box-message.jpg",
  modal: "components/cover-modals.jpg",
  panels: "components/cover-side-panel.jpg",
  "rating-stars": "components/cover-ratings.jpg",
  "segmented-pills": "components/cover-segmented-pills.jpg",
  sidebar: "components/cover-side-menu.jpg",
  spinner: "components/cover-side-spinner.jpg",
  toast: "components/cover-toast.jpg",
  toggle: "components/cover-toggle.jpg",
  "weekly-activity": "components/cover-data.jpg",
  // Patterns (mix)
  editing: "patterns/cover-editing.jpg",
  filters: "patterns/cover-filtering.jpg",
  onboarding: "patterns/cover-on-boarding.jpg",
  overlays: "patterns/cover-overlay.svg",
};

function coverFor(id) {
  const rel = COVERS[id];
  if (!rel) return null;
  const file = rel.split("/").pop();
  // On garde sur la copie servie (public/ds-covers) : c'est elle qui est commitée.
  // _covers/ = source d'auteur locale (git-ignorée), re-copiée vers public à chaque MAJ.
  if (!existsSync(join(process.cwd(), "public/ds-covers", file))) return null;
  return `/ds-covers/${file}`;
}

// Landing « Welcome » du Design System (/design-system) — hero + principes +
// sommaire navigable (cards à vignette). NAV grandit, le sommaire suit.

const PRINCIPLES = [
  ["Une seule voix", "Une fonte (Plus Jakarta Sans), une échelle typographique, un bleu de marque. Aucun mélange, aucune exception silencieuse."],
  ["Theme-aware natif", "Chaque token a sa valeur claire et sombre. Surfaces, textes et illustrations basculent via data-theme — jamais de variante de fichier."],
  ["Doc = composant réel", "Chaque page monte le vrai composant de library.css, jamais une réplique. Ce que tu vois ici est ce qui tourne en production."],
  ["L'espace au gap", "Le rythme vertical et horizontal vit dans des gap sur les conteneurs, calc() / env() pour le reste. Structurel, pas de patch local."],
];

const GROUP_SUB = {
  Foundations: "Les décisions de base — couleur, typographie, espace, iconographie, traits. Tout le reste en découle.",
  Components: "Les briques réutilisables, une responsabilité chacune — du bouton au panneau latéral.",
  Patterns: "Des assemblages qui résolvent un flux — édition, filtrage, accueil, overlays.",
  Reference: "Outils et mappings utilitaires.",
};

// Vignettes : composées des vrais composants / tokens quand c'est parlant (theme-aware),
// abstraction token sinon. On établit le style sur 5 cards ; le reste a un défaut soigné.
function Thumb({ id }) {
  switch (id) {
    case "logo":
      return (
        <div className="dsw-vig dsw-vig--logo" aria-hidden="true">
          <LogoLockup className="dsw-lockup" />
        </div>
      );
    case "buttons":
      return (
        <div className="dsw-vig dsw-vig--stack" aria-hidden="true">
          <span className="btn btn-primary btn-sm"><span>Primary</span></span>
          <span className="btn btn-outline btn-sm"><span>Outline</span></span>
        </div>
      );
    case "colors":
      return (
        <div className="dsw-vig dsw-vig--swatches" aria-hidden="true">
          {["--primary-20", "--primary-40", "--primary-50", "--primary-60", "--accent"].map((t) => (
            <span key={t} style={{ background: `var(${t})` }} />
          ))}
        </div>
      );
    case "typography":
      return <div className="dsw-vig dsw-vig--type" aria-hidden="true"><span className="dsw-aa">Aa</span></div>;
    case "checkbox":
      return (
        <div className="dsw-vig dsw-vig--check" aria-hidden="true">
          <span className="dsw-check dsw-check--on">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </span>
          <span className="dsw-check" />
        </div>
      );
    case "card":
      return (
        <div className="dsw-vig dsw-vig--card" aria-hidden="true">
          <div className="dsw-mini-card">
            <div className="dsw-mini-cover" />
            <div className="dsw-mini-lines"><i /><i /></div>
          </div>
        </div>
      );
    default:
      return <div className="dsw-vig dsw-vig--default" aria-hidden="true"><span /><span /><span /></div>;
  }
}

export default function WelcomePage() {
  return (
    <>
      {/* HERO — en-tête de section du DS (title 48/700 + sub). Le clin d'œil
          « living document » vit dans la Box Message ci-dessous, pas dans le sub. */}
      <div className="ds-section-header">
        <h1 className="ds-section-title">Welcome</h1>
        <p className="ds-section-sub">
          Le design system de <strong>Readr</strong> — la source unique de vérité pour les tokens, composants et patterns de l&apos;app. Chaque page montre le composant réel, pas une maquette.
        </p>
      </div>

      {/* Box Message d'intro, au-dessus des Principes */}
      <MessageBox tone="info">This is a living document, meaning it&apos;s always in progress.</MessageBox>

      {/* SOMMAIRE — Principes + groupes, même flux (ds-index, gap 64) */}
      <div className="ds-index">
        <section className="dsw-section">
          <h2 className="panel-section-eyebrow">Principes</h2>
          <div className="dsw-principles">
            {PRINCIPLES.map(([title, text]) => (
              <div key={title} className="dsw-principle">
                <div className="dsw-principle-title">{title}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        {Object.keys(NAV).map((group) => (
          <section key={group} className="ds-index-group">
            <div className="dsw-group-head">
              <h2 className="panel-section-eyebrow">{group}</h2>
              {GROUP_SUB[group] && <p className="dsw-group-sub">{GROUP_SUB[group]}</p>}
            </div>
            <div className="dsw-cards-grid">
              {sectionsOf(group).map((id) => {
                const cover = coverFor(id);
                return (
                  <Link key={id} href={`/design-system/${id}`} className="ds-index-card">
                    <span className={`ds-index-thumb${cover ? " ds-index-thumb--cover" : ""}`}>
                      {cover ? <img className="ds-cover" src={cover} alt="" /> : <Thumb id={id} />}
                    </span>
                    <span className="ds-index-label">{NAV_LABELS[id]}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
