// En-tête + corps d'une section du Design System. En multipage, chaque page
// rend une seule DSSection ; l'`id` reste posé pour d'éventuels deep-links.
export default function DSSection({ id, title, sub, children, className = "" }) {
  return (
    <section className={`ds-section${className ? ` ${className}` : ""}`} id={id}>
      <div className="ds-section-header">
        <h2 className="ds-section-title">{title}</h2>
        {sub && <p className="ds-section-sub">{sub}</p>}
      </div>
      <div className="ds-section-body">{children}</div>
    </section>
  );
}
