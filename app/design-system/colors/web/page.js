import LiveSwatch from "../../_components/LiveSwatch";
import DSSection from "../../_components/DSSection";

// Tokens couleur côté WEB (globals.css) — source de vérité du code. Valeurs lues
// en live via LiveSwatch : aucune valeur hardcodée, la doc ne peut pas dériver.
export default function ColorsWebPage() {
  return (
    <DSSection id="colors-web" title="Colors — Web" sub="Les couleurs telles qu'elles vivent dans le code, rangées par rôle et lues en direct — bascule le thème pour voir la version sombre.">

      <div className="ds-card">
        <div className="ds-card-head">Surfaces</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch checker bg="var(--bg)" title="Page" token="--bg" />
            <LiveSwatch checker bg="var(--bg3)" title="Subtle" token="--bg3" />
            <LiveSwatch checker bg="var(--bg-elevated)" title="Elevated" token="--bg-elevated" />
            <LiveSwatch checker bg="var(--card)" title="Card" token="--card" />
            <LiveSwatch checker bg="var(--bg-app)" title="App tint" token="--bg-app" />
            <LiveSwatch checker bg="var(--bg-head)" title="Header" token="--bg-head" />
            <LiveSwatch checker bg="var(--nav)" title="Nav (translucide)" token="--nav" />
            <LiveSwatch checker bg="var(--page-light)" title="Page — fixe clair" token="--page-light" />
            <LiveSwatch checker bg="var(--page-dark)" title="Page — fixe sombre" token="--page-dark" />
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><span className="ds-token-chip">--bg-app</span> / <span className="ds-token-chip">--bg-head</span> sont des teintes primaires quasi-transparentes (fond d&apos;app, fond de header). <span className="ds-token-chip">--nav</span> = blanc translucide de la barre. <span className="ds-token-chip">--page-light</span> / <span className="ds-token-chip">--page-dark</span> sont <strong>fixes</strong> (non thémés) — pour les surfaces qui restent claires ou sombres quel que soit le thème.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Text</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--text)" title="Default" token="--text" />
            <LiveSwatch bg="var(--text-2)" title="Secondary" token="--text-2" />
            <LiveSwatch bg="var(--text-3)" title="Muted" token="--text-3" />
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Trois niveaux de texte. <span className="ds-token-chip">--text</span> titres &amp; contenu fort · <span className="ds-token-chip">--text-2</span> secondaire (auteur, méta) · <span className="ds-token-chip">--text-3</span> muté (hints, labels). Ces gris reposent sur la rampe <span className="ds-token-chip">neutral/gray-*</span> côté Figma. La couleur seule est le signal le plus faible — jamais pour porter une hiérarchie à elle seule.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Strokes</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch checker bg="var(--border-subtle)" title="Subtle" token="--border-subtle" />
            <LiveSwatch checker bg="var(--border)" title="Strong" token="--border" />
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-token-chip">--border-subtle</span></div>
            <p>default stroke for all components (buttons, inputs, cards, containers) and most dividers (row separators, section separators). 1.5px on components, 1px on dividers.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-token-chip">--border</span></div>
            <p>reserved for stronger visual affordances where a subtle stroke isn&apos;t enough : <span className="ds-class">.panel-spinner</span> ring (2px), <span className="ds-class">.import-dropzone</span> dashed border (2px), <span className="ds-class">.ob-dot</span> background. Do not use for regular component strokes.</p>
          </div>
          <p className="ds-note">In dark mode both tokens resolve to <code>#333333</code> — divergence exists only in light mode.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Accent</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--accent)" title="Primary" token="--accent / --primary-50" />
            <LiveSwatch checker bg="var(--accent-bg)" title="Primary Subtle" token="--accent-bg" />
            <LiveSwatch checker bg="var(--ghost-hover)" title="Ghost Hover" token="--ghost-hover" />
            <LiveSwatch bg="linear-gradient(135deg,var(--ai-from),var(--ai-to))" title="AI Gradient" token="--ai-from / --ai-to" />
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><span className="ds-token-chip">--accent</span> = <span className="ds-token-chip">--primary-50</span> (le bleu de marque). <span className="ds-token-chip">--accent-bg</span> = sa teinte de fond. <span className="ds-token-chip">--ghost-hover</span> = survol des boutons ghost. Le dégradé <span className="ds-token-chip">--ai-from</span> → <span className="ds-token-chip">--ai-to</span> signale les actions AI (Character Cast, quiz).</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Semantic</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--teal)" title="Positive" token="--teal" />
            <LiveSwatch checker bg="var(--teal-bg)" title="Positive Subtle" token="--teal-bg" />
            <LiveSwatch bg="var(--alert)" title="Alert" token="--alert" />
            <LiveSwatch checker bg="var(--alert-bg)" title="Alert Subtle" token="--alert-bg" />
            <LiveSwatch bg="var(--destructive)" title="Destructive" token="--destructive" />
            <LiveSwatch bg="var(--destructive-hover)" title="Destructive Hover" token="--destructive-hover" />
          </div>
        </div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Positive — <span className="ds-token-chip">--teal</span> / <span className="ds-token-chip">--teal-bg</span></div>
            <p>Réussite / accompli : barre « objectif atteint » (<span className="ds-class">.overview-goal--achieved</span>). Le fond subtil pour un état positif discret.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Alert — <span className="ds-token-chip">--alert</span> / <span className="ds-token-chip">--alert-bg</span></div>
            <p>État d&apos;avertissement / erreur : message-box alert, badge de quiz incorrect, pace warning. <span className="ds-token-chip">--alert-bg</span> = le fond d&apos;encart. Même valeur que <span className="ds-token-chip">--destructive</span> (<code>#E63946</code>) mais rôle distinct : <em>signaler un état</em>, pas déclencher une action irréversible.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Destructive — <span className="ds-token-chip">--destructive</span> / <span className="ds-token-chip">--destructive-hover</span></div>
            <p>Actions irréversibles : item « supprimer » (<span className="ds-class">.dropdown-item.is-destructive</span>), bord de champ invalide. <span className="ds-token-chip">--destructive-hover</span> = le fond plein au survol du bouton de suppression. En dark, les rouges s&apos;éclaircissent pour tenir le contraste.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Neutral</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch checker bg="var(--light-100)" title="White" token="--light-100" />
            <LiveSwatch checker bg="var(--light-90)" title="White 90%" token="--light-90" />
            <LiveSwatch checker bg="var(--light-20)" title="White 20%" token="--light-20" />
            <LiveSwatch checker bg="var(--dark-100)" title="Ink" token="--dark-100" />
            <LiveSwatch checker bg="var(--dark-80)" title="Ink 80%" token="--dark-80" />
            <LiveSwatch checker bg="var(--dark-70)" title="Ink 70%" token="--dark-70" />
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Neutres <strong>fixes</strong> (non thémés). <span className="ds-token-chip">--light-100</span> = blanc pur — base des textes/icônes sur fond coloré (badges, boutons pleins), tokenisé partout. <span className="ds-token-chip">--light-90</span> / <span className="ds-token-chip">--light-20</span> = blancs translucides (surfaces flottantes, séparateurs). La famille <span className="ds-token-chip">--dark-*</span> (encre <code>#0D0F1A</code> + rgba) porte les overlays neutres (toast, selection bar, backdrops) — plus de présence que les ombres bleues.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Primary scale</div>
        <div className="ds-card-body col">
          <div className="palette-grid">
          {["3","5","10","20","30","40","50","60","70","80","90","100"].map((step) => (
            <LiveSwatch
              key={step}
              anchor={step === "50"}
              bg={`var(--primary-${step})`}
              title={step}
              token={`--primary-${step}`}
            />
          ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note"><span className="ds-token-chip">--primary-N</span> · anchor (<span className="ds-token-chip">--primary-50</span>) = <span className="ds-token-chip">--accent</span> (<code>#4959E6</code>)</p>
          <div className="ds-token-block">
            <div className="ds-token-name"><span className="ds-token-chip">--primary-3</span> (<code>#FAFAFF</code>)</div>
            <p>ultra-subtle tint used for card hover states (<span className="ds-class">.quote-card</span>, <span className="ds-class">.book-card</span>, <span className="ds-class">.now-reading-card</span>, <span className="ds-class">.list-row</span>). One tier below <span className="ds-token-chip">--primary-5</span> so secondary tinted buttons inside stay visible without blending into the hovered card.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Dark mode override</div>
            <p><span className="ds-token-chip">--primary-3</span>, <span className="ds-token-chip">--primary-5</span> and <span className="ds-token-chip">--primary-10</span> resolve to <strong>solid colors</strong> in dark theme (not rgba), computed over the card baseline <span className="ds-token-chip">--card</span> : <span className="ds-token-chip">--primary-3</span> = <code>#1F2128</code> (card hover), <span className="ds-token-chip">--primary-5</span> = <code>#232536</code> (button bg), <span className="ds-token-chip">--primary-10</span> = <code>#2F3666</code> (button hover stronger). Solid (vs rgba) so render is identical regardless of parent baseline. Côté Figma : primitives <span className="ds-token-chip">primary/dark/3</span>, <span className="ds-token-chip">primary/dark/5</span>, <span className="ds-token-chip">primary/dark/10</span>.</p>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Illustration tokens</div>
        <div className="ds-card-body col">
          <div className="palette-grid">
            {["bg-1","bg-2","bg-3","mid","accent-1","accent-2","accent-3","stroke"].map((step) => (
              <LiveSwatch
                key={step}
                bg={`var(--illus-${step})`}
                title={step}
                token={`--illus-${step}`}
              />
            ))}
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">8 tokens used in <span className="ds-class">.empty-icon</span> SVGs (Library, Wishlist, Overview, Dictionary, Quotes, Collections, Onboarding). Light = miroir de la scale primary, dark = échelle de valeur inversée (fonds sombres mutés, stroke clair). Côté Figma : groupe <span className="ds-token-chip">illus/*</span>, aliasé aux primitives <span className="ds-token-chip">primary/*</span>.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">shadcn compat</div>
        <div className="ds-card-body col">
          <p className="ds-note">Non documentés en swatch : <span className="ds-token-chip">--background</span>, <span className="ds-token-chip">--foreground</span>, <span className="ds-token-chip">--primary</span>, <span className="ds-token-chip">--primary-foreground</span>, <span className="ds-token-chip">--secondary</span>, <span className="ds-token-chip">--muted</span>, <span className="ds-token-chip">--muted-foreground</span>, <span className="ds-token-chip">--input</span>, <span className="ds-token-chip">--ring</span>. Ce sont des <strong>alias de compatibilité shadcn/ui</strong> qui miroir les tokens readr ci-dessus (<span className="ds-token-chip">--background</span> = <span className="ds-token-chip">--bg</span>, <span className="ds-token-chip">--foreground</span> = <span className="ds-token-chip">--text</span>, <span className="ds-token-chip">--muted-foreground</span> = <span className="ds-token-chip">--text-3</span>…). On style avec les tokens readr, pas ceux-là.</p>
        </div>
      </div>
    </DSSection>
  );
}
