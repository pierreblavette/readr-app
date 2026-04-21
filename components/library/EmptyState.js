export default function EmptyState({ tab, search, t, onAdd }) {
  if (search) return (
    <div className="empty">
      <svg className="empty-icon" viewBox="0 0 80 80" fill="none">
        <rect x="16" y="10" width="36" height="48" rx="4" fill="var(--bg3)"/>
        <rect x="16" y="10" width="6" height="48" rx="2" fill="var(--text-3)"/>
        <line x1="28" y1="24" x2="46" y2="24" stroke="var(--text-3)" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="32" x2="42" y2="32" stroke="var(--text-3)" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="52" cy="50" r="13" fill="var(--bg3)" stroke="var(--text-3)" strokeWidth="3"/>
        <line x1="47" y1="50" x2="57" y2="50" stroke="var(--text-3)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="52" y1="45" x2="52" y2="55" stroke="var(--text-3)" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <p className="empty-title">{t.emptyNoMatch}</p>
      <p className="empty-sub">{t.emptyNoMatchSub}</p>
    </div>
  );

  const title = tab === 'wishlist' ? t.emptyWish    : t.emptyLib;
  const sub   = tab === 'wishlist' ? t.emptyWishSub : t.emptyLibSub;
  const cta   = tab === 'wishlist' ? t.emptyWishCta : t.emptyLibCta;

  return (
    <div className="empty">
      <svg className="empty-icon" viewBox="0 0 80 80" fill="none">
        <rect x="16" y="10" width="36" height="48" rx="4" fill="var(--accent-bg)"/>
        <rect x="16" y="10" width="6" height="48" rx="2" fill="var(--accent)" opacity="0.6"/>
        <line x1="28" y1="24" x2="46" y2="24" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="32" x2="42" y2="32" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="40" x2="38" y2="40" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
        <circle cx="54" cy="54" r="13" fill="var(--accent)"/>
        <line x1="49" y1="54" x2="59" y2="54" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        <line x1="54" y1="49" x2="54" y2="59" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <p className="empty-title">{title}</p>
      <p className="empty-sub">{sub}</p>
      <button className="empty-cta" onClick={onAdd}>{cta}</button>
    </div>
  );
}
