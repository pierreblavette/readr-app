// Landing du Design System (/ds) — intro seule ; les rubriques vivent chacune
// sur leur route sœur (/ds/logo, /ds/colors, …).
export default function DSIndexPage() {
  return (
    <div className="ds-intro">
      <h1 className="page-title">Design System</h1>
      <p className="page-sub">
        Complete reference for tokens, components and patterns. Native light/dark themes via <code style={{ fontSize: 12, background: "var(--bg3)", padding: "2px 6px", borderRadius: 4 }}>data-theme</code>.
      </p>
    </div>
  );
}
