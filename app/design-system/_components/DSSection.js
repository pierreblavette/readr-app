import FigmaCard from "./FigmaCard";

// En-tête + corps d'une section du Design System. En multipage, chaque page
// rend une seule DSSection ; l'`id` reste posé pour d'éventuels deep-links.
// La FigmaCard (lien vers le composant Figma) est injectée ici en dernier enfant
// du corps : slug = `id` (= slug de route). Elle ne rend rien si le slug n'est pas
// mappé dans figmaLinks.js — donc zéro modif par page pour brancher un lien.
export default function DSSection({ id, title, sub, children, className = "" }) {
  return (
    <section className={`ds-section${className ? ` ${className}` : ""}`} id={id}>
      <div className="ds-section-header">
        <h2 className="ds-section-title">{title}</h2>
        {sub && <p className="ds-section-sub">{sub}</p>}
      </div>
      <div className="ds-section-body">
        {children}
        <FigmaCard slug={id} />
      </div>
    </section>
  );
}
