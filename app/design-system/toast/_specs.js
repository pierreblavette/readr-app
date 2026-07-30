// Spec de la page Toast. Markup reproduit à l'identique de components/library/Toast.js.
// .ds-toast-static neutralise le position:fixed + le reveal (opacity 0 + translateY) +
// le z-index 2000 (un flex-item l'honore MÊME en position:static → couvrirait le chrome
// /ds). Ne porte PAS .toast-visible (0,2,0, gagnerait sur nous via library.css) : la
// classe statique (0,2,0) bat la base .toast (0,1,0) et impose l'état visible.

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function ToastSpec({ message = "Reading started", className = "" }) {
  return (
    <div className={`toast ds-toast-static ${className}`.trim()} role="status">
      <CheckIcon />
      <span>{message}</span>
    </div>
  );
}
