import DSSection from "../_components/DSSection";
import { BookCardSpec, QuoteCardSpec, DictionaryCardSpec } from "./_specs";

export default function CardFoundationPage() {
  return (
    <DSSection id="card" title="Cards" sub="Famille de surfaces de contenu — même langage (radius 8, bord 1.5, bord primary au hover), décliné par carte. Book, Quote et Dictionary Card documentées ; Collection / Overview partagent la primitive et suivront.">

      {/* 1 — PREVIEW — la famille */}
      <div className="ds-card">
        <div className="ds-card-head">Preview</div>
        <div className="ds-card-body col">
          <div className="ds-preview-board">
          <div className="ds-preview">
            <div className="ds-card-bento">
              <BookCardSpec />
              <div className="ds-card-bento-col">
                <QuoteCardSpec />
                <DictionaryCardSpec />
              </div>
            </div>
          </div>
          </div>
          <p className="ds-note">Trois applications d&apos;un même socle : <strong>Book Card</strong> (cover en tête), <strong>Quote Card</strong> (flex colonne) et <strong>Dictionary Card</strong> (accordéon). Même radius, bord et hover — seul le contenu diffère. Aux hauts breakpoints, Quote et Dictionary partagent une colonne qui, à côté de la Book Card, compose un bloc bento ; sur écran étroit, tout s&apos;empile. Chaque carte a sa page (sous-nav « Cards » de la sidebar).</p>
        </div>
      </div>

      {/* 2 — CARD LANGUAGE (la primitive partagée) */}
      <div className="ds-card">
        <div className="ds-card-head">Card language</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Surface</div>
            <p>Fond <span className="ds-token-chip">--card</span> · radius <strong>8</strong> (<span className="ds-token-chip">--radius</span>) · bord <strong>1.5</strong> <span className="ds-token-chip">--border-subtle</span>. Le socle commun à <em>toutes</em> les cartes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Hover</div>
            <p>Bord <span className="ds-token-chip">--primary-50</span> + léger fond <span className="ds-token-chip">--primary-3</span>. <strong>Pas de lift</strong> : ni <code>translateY</code> ni ombre — conforme à la doctrine « hover = bord / fond / couleur seulement ». Règle unifiée sur toute la famille de cartes.</p>
          </div>
          <div className="ds-token-block">
            <div className="ds-token-name">Selected — <span className="ds-cn">.selected</span></div>
            <p>Bord <span className="ds-token-chip">--primary-50</span> · fond <span className="ds-token-chip">--primary-5</span> · anneau <code>0 0 0 3px</code> <span className="ds-token-chip">--primary-20</span> — même vocabulaire que le focus des inputs.</p>
          </div>
        </div>
      </div>

      {/* 3 — FAMILY */}
      <div className="ds-card">
        <div className="ds-card-head">Family</div>
        <div className="ds-card-body col">
          <div className="ds-token-block">
            <div className="ds-token-name">Mêmes racines, contextes différents</div>
            <p>~10 cartes partagent le langage ci-dessus : <span className="ds-class">.book-card</span>, <span className="ds-class">.quote-card</span>, <span className="ds-class">.col-card</span> (collections), <span className="ds-class">.overview-card</span> / <span className="ds-class">.overview-hero-card</span> / … (dashboard), <span className="ds-class">.now-reading-card</span>, <span className="ds-class">.dictionary-saved-card</span>. Documentées ici en pages dédiées, au fil de l&apos;eau.</p>
          </div>
          <p className="ds-note"><strong>Dette</strong> : ce sont aujourd&apos;hui des classes <em>parallèles</em> (pas d&apos;héritage). Candidat à une primitive <span className="ds-class">.card</span> partagée (surface + radius + bord + hover) que chaque carte composerait — fix prod séparé.</p>
        </div>
      </div>

    </DSSection>
  );
}
