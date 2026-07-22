import Link from "next/link";
import { NAV, NAV_LABELS, sectionsOf } from "./_lib/nav";

// Landing du Design System (/ds) — intro + sommaire navigable de toutes les
// sections migrées. NAV grandit lot par lot, le sommaire suit automatiquement.
export default function DSIndexPage() {
  return (
    <>
      <div className="ds-intro">
        <h1 className="page-title">Design System</h1>
        <p className="page-sub">
          Complete reference for tokens, components and patterns. Native light/dark themes via <code style={{ fontSize: 12, background: "var(--bg3)", padding: "2px 6px", borderRadius: 4 }}>data-theme</code>.
        </p>
      </div>
      <div className="ds-index">
        {Object.keys(NAV).map((group) => (
          <section key={group} className="ds-index-group">
            <h2 className="panel-section-eyebrow">{group}</h2>
            <div className="ds-tile-grid ds-tile-grid--auto">
              {sectionsOf(group).map((id) => (
                <Link key={id} href={`/ds/${id}`} className="ds-index-card">
                  {NAV_LABELS[id]}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
