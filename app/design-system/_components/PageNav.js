"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { flatNav } from "../_lib/nav";

// Pager bas de page : navigue vers la page précédente / suivante du DS sans passer
// par la sidebar. Ordre = flatNav() (miroir sidebar). Inspiré de mews.design.
const ArrowLeft = () => (
  <svg className="ds-pager-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
);
const ArrowRight = () => (
  <svg className="ds-pager-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
);

export default function PageNav() {
  const pathname = usePathname();
  const items = flatNav();
  const i = items.findIndex((it) => it.href === pathname);
  if (i === -1) return null;
  const prev = i > 0 ? items[i - 1] : null;
  const next = i < items.length - 1 ? items[i + 1] : null;
  if (!prev && !next) return null;

  return (
    <nav className="ds-pager" aria-label="Design system pages">
      {prev ? (
        <Link href={prev.href} className="ds-pager-btn ds-pager-btn--prev">
          <ArrowLeft />
          <span className="ds-pager-text">
            <span className="ds-pager-eyebrow">{prev.group}</span>
            <span className="ds-pager-title">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span className="ds-pager-slot" aria-hidden="true" />
      )}
      {next ? (
        <Link href={next.href} className="ds-pager-btn ds-pager-btn--next">
          <span className="ds-pager-text">
            <span className="ds-pager-eyebrow">{next.group}</span>
            <span className="ds-pager-title">{next.title}</span>
          </span>
          <ArrowRight />
        </Link>
      ) : (
        <span className="ds-pager-slot" aria-hidden="true" />
      )}
    </nav>
  );
}
