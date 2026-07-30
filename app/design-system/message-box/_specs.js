// Spec de la page Message Box. Markup reproduit à l'identique de l'usage prod
// (.modal-info-box + variantes ; le ton critical = .scan-alert, classe parallèle).

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const CriticalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ICON = { info: InfoIcon, alert: AlertIcon, success: SuccessIcon, critical: CriticalIcon };

// tone : info (défaut, primary) · alert (amber) · success (vert) · critical (rouge,
// via .scan-alert). alert/critical portent role="alert". strong : passe le texte en 700.
export function MessageBox({ tone = "info", children, strong = false }) {
  const cls =
    tone === "critical"
      ? "scan-alert"
      : `modal-info-box${tone !== "info" ? ` modal-info-box--${tone}` : ""}`;
  const Icon = ICON[tone];
  const role = tone === "alert" || tone === "critical" ? "alert" : undefined;
  return (
    <div className={cls} role={role}>
      <Icon />
      <span>{strong ? <span className="modal-info-box-strong">{children}</span> : children}</span>
    </div>
  );
}
