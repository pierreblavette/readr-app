import LiveSwatch from "../../_components/LiveSwatch";
import DSSection from "../../_components/DSSection";

// Tokens couleur côté WEB (globals.css) — source de vérité du code. Valeurs lues
// en live via LiveSwatch : aucune valeur hardcodée, la doc ne peut pas dériver.
export default function ColorsWebPage() {
  return (
    <DSSection id="colors-web" title="Colors — Web" sub="Les tokens CSS de globals.css (:root + [data-theme=dark]), rangés par rôle. Valeurs lues en direct depuis la feuille de style — bascule le thème pour voir le dark.">

      <div className="ds-card">
        <div className="ds-card-head">Surfaces</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--bg)" title="Page" token="--bg" />
            <LiveSwatch bg="var(--bg3)" title="Subtle" token="--bg3" />
            <LiveSwatch bg="var(--bg-elevated)" title="Elevated" token="--bg-elevated" />
            <LiveSwatch bg="var(--card)" title="Card" token="--card" />
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Strokes</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--border-subtle)" title="Subtle" token="--border-subtle" />
            <LiveSwatch bg="var(--border)" title="Strong" token="--border" />
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
        <div className="ds-card-head">Text</div>
        <div className="ds-card-body col">
          {[
            ["--text", "Default"],
            ["--text-2", "Secondary"],
            ["--text-3", "Muted"],
          ].map(([token, name]) => (
            <div key={token} className="type-sample">
              <div className="type-sample-preview">
                <div style={{ fontSize: 18, fontWeight: 600, color: `var(${token})` }}>{name} — The quick brown fox jumps over</div>
              </div>
              <div className="type-sample-meta"><span className="ds-token-chip">{token}</span></div>
            </div>
          ))}
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Trois niveaux de texte — même taille et graisse, seule la couleur varie. <span className="ds-token-chip">--text</span> titres &amp; contenu fort · <span className="ds-token-chip">--text-2</span> secondaire (auteur, méta) · <span className="ds-token-chip">--text-3</span> muté (hints, labels). Ces gris reposent sur la rampe <span className="ds-token-chip">neutral/gray-*</span> côté Figma. La couleur seule est le signal le plus faible — jamais pour porter une hiérarchie à elle seule.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Accent</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--accent)" title="Primary" token="--accent / --primary-50" />
            <LiveSwatch bg="var(--accent-bg)" title="Primary Subtle" token="--accent-bg" />
            <LiveSwatch bg="linear-gradient(135deg,var(--ai-from),var(--ai-to))" title="AI Gradient" token="--ai-from / --ai-to" />
            <LiveSwatch bg="var(--teal)" title="Secondary" token="--teal" />
            <LiveSwatch bg="var(--teal-bg)" title="Secondary Subtle" token="--teal-bg" />
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Critical</div>
        <div className="ds-card-body col">
          <div className="ds-swatch-grid">
            <LiveSwatch bg="var(--destructive)" title="Destructive" token="--destructive" />
            <LiveSwatch bg="var(--destructive-hover)" title="Destructive Hover" token="--destructive-hover" />
          </div>
        </div>
        <div className="ds-card-body col">
          <p className="ds-note">Rouge destructif — actions irréversibles et états d&apos;erreur. <span className="ds-token-chip">--destructive</span> porte le texte / l&apos;icône : item de menu « supprimer » (<span className="ds-class">.dropdown-item.is-destructive</span>), message d&apos;erreur (<span className="ds-class">.modal-error</span>), bord de champ invalide. <span className="ds-token-chip">--destructive-hover</span> = le fond plein au survol du bouton de suppression (<span className="ds-class">.confirm-modal-delete</span>). En dark le rouge s&apos;éclaircit pour tenir le contraste sur fond sombre.</p>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Primary scale</div>
        <div className="ds-card-body col">
          <div className="palette-grid">
          {["3","5","10","20","30","40","50","60","70","80","90","100"].map((step) => (
            <LiveSwatch
              key={step}
              size="sm"
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
                size="sm"
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
    </DSSection>
  );
}
