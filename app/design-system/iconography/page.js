import DSSection from "../_components/DSSection";
import IllustrationBoard from "../_components/IllustrationBoard";
import LiveSwatch from "../_components/LiveSwatch";
import {
  LibraryIcon, WishlistIcon, OverviewGenresIcon, OverviewAuthorsIcon,
  OverviewLovedIcon, OverviewQuotesIcon, OverviewStreakIcon, OverviewGoalIcon, OverviewIcon,
} from "@/components/library/EmptyState";
import NoMatchesIcon from "@/components/library/NoMatchesIcon";
import { DictionaryEmptyIcon } from "@/components/library/DictionaryView";
import { QuotesEmptyIcon } from "@/components/library/QuotesView";
import { CollectionsIcon } from "@/components/library/CollectionsView";
import { CollectionDetailEmptyIcon } from "@/components/library/CollectionDetailView";
import { ReadrIcon, TrackingIcon, ScanIcon, QuoteIcon, WordsIcon, DataControlIcon } from "@/components/library/Onboarding";

// Icône UI : line, viewBox 24, currentColor. sw = épaisseur de trait (défaut 2).
function Icon({ children, sw = 2 }) {
  return (
    <svg className="ds-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

// Set curé d'icônes UI de l'app (paths standard Feather, comme la prod).
const ICONS = [
  { name: "Search", d: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
  { name: "Add", d: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></> },
  { name: "Close", d: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> },
  { name: "Kebab", d: <><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></> },
  { name: "Edit", d: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></> },
  { name: "Delete", d: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></> },
  { name: "Share", d: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></> },
  { name: "Bookmark", d: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /> },
  { name: "Book", d: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { name: "Calendar", d: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
  { name: "Bell", d: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></> },
  { name: "Upload", d: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></> },
];

// Réglages de stroke réels de l'app, par rôle.
const STROKES = [
  { sw: 2, label: "2 · défaut", note: "la majorité des icônes (nav, actions, book)" },
  { sw: 2.5, label: "2.5 · directionnel", note: "chevrons, flèches — un peu plus de présence" },
  { sw: 3, label: "3 · check", note: "la coche d'une checkbox, sur petit format" },
  { sw: 1.5, label: "1.5 · détail", note: "glyphes fins (upload, illustration légère)" },
];

const STROKE_ICONS = {
  2: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  2.5: <polyline points="6 9 12 15 18 9" />,
  3: <polyline points="20 6 9 17 4 12" />,
  1.5: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>,
};

// Pictos d'empty state — tabs (Library, Wishlist, Dictionary, Quotes, Collections,
// Collection vide, No matches) + modules Overview (Genres, Authors…).
const EMPTY_STATES = [
  [LibraryIcon, "Library"],
  [WishlistIcon, "Wishlist"],
  [DictionaryEmptyIcon, "Dictionary"],
  [QuotesEmptyIcon, "Quotes"],
  [CollectionsIcon, "Collections"],
  [CollectionDetailEmptyIcon, "Collection (empty)"],
  [NoMatchesIcon, "No matches"],
  [OverviewGenresIcon, "Genres"],
  [OverviewAuthorsIcon, "Authors"],
  [OverviewLovedIcon, "Most loved"],
  [OverviewQuotesIcon, "Fav. quotes"],
  [OverviewStreakIcon, "Streak"],
  [OverviewGoalIcon, "Goal"],
  [OverviewIcon, "Overview"],
];

// Pictos d'onboarding — mêmes tokens --illus, contexte slides (pas un empty state).
const ONBOARDING = [
  [ReadrIcon, "Readr"],
  [TrackingIcon, "Tracking"],
  [ScanIcon, "Scan"],
  [QuoteIcon, "Quote"],
  [WordsIcon, "Words"],
  [DataControlIcon, "Data control"],
];

const ILLUS = [
  ["--illus-bg-1", "Background 1"], ["--illus-bg-2", "Background 2"], ["--illus-bg-3", "Background 3"], ["--illus-mid", "Mid tone"],
  ["--illus-accent-1", "Accent 1"], ["--illus-accent-2", "Accent 2"], ["--illus-accent-3", "Accent 3"], ["--illus-stroke", "Stroke"],
];

export default function IconographyPage() {
  return (
    <DSSection
      id="iconography"
      title="Iconography"
      sub="Les deux familles d'icônes de Readr : les icônes d'interface, pour agir et naviguer ; les illustrations, pour habiller les écrans vides."
    >
      {/* 1 — PREVIEW : le set d'icônes UI (tuiles à plat, icônes primary-70) */}
      <div className="ds-card">
        <div className="ds-card-head">Preview · icons</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
            <div className="ds-preview">
              <div className="ds-icon-grid ds-icon-grid--preview">
                {ICONS.map(({ name, d }) => (
                  <div key={name} className="ds-icon-tile">
                    <Icon>{d}</Icon>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="ds-note">Un jeu <strong>line</strong> cohérent : <code>viewBox 0 0 24 24</code>, <code>fill: none</code>, <code>stroke: currentColor</code>, coins <code>round</code>. La couleur vient du <strong>contexte</strong> (currentColor) — l&apos;icône hérite de la couleur du texte, donc suit le thème et l&apos;état sans classe dédiée.</p>
        </div>
      </div>

      {/* 2 — ICONS · conventions (stroke scale) */}
      <div className="ds-card">
        <div className="ds-card-head">Icons · stroke</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {STROKES.map(({ sw, label }) => (
              <div key={sw} className="ds-state-sample">
                <Icon sw={sw}>{STROKE_ICONS[sw]}</Icon>
                <span className="ds-class">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          {STROKES.map(({ sw, label, note }) => (
            <div key={sw} className="ds-token-block">
              <div className="ds-token-name">{label}</div>
              <p>{note}.</p>
            </div>
          ))}
          <p className="ds-note">Une seule échelle d&apos;épaisseur, pas une par icône. Le trait <strong>épaissit</strong> quand l&apos;icône rétrécit (la coche à 3 sur 16px reste lisible) ou quand elle doit peser (chevron à 2.5). Défaut <strong>2</strong>.</p>
        </div>
      </div>

      {/* 3 — ICONS · sizing */}
      <div className="ds-card">
        <div className="ds-card-head">Icons · sizing</div>
        <div className="ds-card-body col">
          <div className="ds-states-grid ds-states-grid--boxed ds-states-grid--cols-2">
            {[16, 18, 24].map((s) => (
              <div key={s} className="ds-state-sample">
                <div className="ds-icon-size" style={{ width: s, height: s }}>
                  <Icon><><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></></Icon>
                </div>
                <span className="ds-class">{s}px</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><strong>16</strong> — inline dans une rangée ou un bouton (dropdown-btn, dropdown-item). <strong>18</strong> — icône de nav, un cran plus présente. <strong>24</strong> — le viewBox natif, pour un usage isolé. L&apos;icône occupe toujours sa boîte carrée ; l&apos;espace autour vient du composant hôte, pas de l&apos;icône.</p>
        </div>
      </div>

      {/* 4 — PICTOS · illustrations */}
      <div className="ds-card">
        <div className="ds-card-head">Pictos · empty states</div>
        <div className="ds-card-body col">
          <IllustrationBoard items={EMPTY_STATES.map(([C, label]) => [<C key={label} />, label])} />
          <p className="ds-note">Illustrations <strong>multi-tons</strong> (<code>viewBox 0 0 60 60</code>, classe <span className="ds-class">.empty-icon</span>, tokens <span className="ds-token-chip">--illus-*</span>), réservées aux <strong>empty states</strong> — onglet vide, aucun résultat, module Overview sans données. Plus chaleureuses qu&apos;une icône line, elles n&apos;apparaissent jamais dans un contrôle interactif. Chaque picto est le <strong>composant réel</strong> de l&apos;app, pas une reproduction.</p>
        </div>
      </div>

      {/* 5 — PICTOS · onboarding */}
      <div className="ds-card">
        <div className="ds-card-head">Pictos · onboarding</div>
        <div className="ds-card-body col">
          <IllustrationBoard items={ONBOARDING.map(([C, label]) => [<C key={label} />, label])} />
          <p className="ds-note">Même famille <span className="ds-token-chip">--illus-*</span>, mais contexte <strong>slides d&apos;onboarding</strong> (pas un empty state). Composants réels exportés par <span className="ds-class">Onboarding.js</span>.</p>
        </div>
      </div>

      {/* 5 — PICTOS · palette */}
      <div className="ds-card">
        <div className="ds-card-head">Pictos · palette</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            {ILLUS.map(([t, title]) => (
              <LiveSwatch key={t} bg={`var(${t})`} title={title} token={t} />
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Les pictos ne consomment <strong>que</strong> ces 8 tokens <span className="ds-token-chip">--illus-*</span> — trois fonds (<span className="ds-token-chip">--illus-bg-1/2/3</span>), un ton médian, trois accents et un <span className="ds-token-chip">--illus-stroke</span>. Ils <strong>s&apos;inversent en dark</strong> (le fond le plus clair devient le plus sombre) — une illustration reste lisible sans être refaite. C&apos;est ce qui les distingue des icônes UI (currentColor, un seul ton).</p>
        </div>
      </div>

      {/* 6 — USAGE */}
      <div className="ds-card">
        <div className="ds-card-head">Usage</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Icônes → currentColor</div>
            <p>Une icône UI n&apos;a <strong>jamais</strong> de couleur en dur : <code>stroke: currentColor</code>. Elle hérite du texte de son parent — un <span className="ds-class">.dropdown-item</span> passe l&apos;icône en <span className="ds-token-chip">--primary-50</span> au hover sans la retoucher. Un seul jeu sert tous les thèmes et tous les états.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Pictos → tokens --illus</div>
            <p>Une illustration pilote ses tons par les <span className="ds-token-chip">--illus-*</span>, pas par <code>currentColor</code> (elle a plusieurs tons simultanés). Le thème est géré par l&apos;inversion des tokens, jamais par des variantes de fichier.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Le bon registre</div>
            <p><strong>Icône</strong> pour agir et naviguer (dense, neutre). <strong>Picto</strong> pour accueillir un vide (rare, chaleureux). Ne pas mélanger : une illustration dans un bouton alourdit, une icône line dans un empty state paraît froide.</p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
