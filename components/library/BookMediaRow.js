"use client";
import { coverColors, coverLetter } from "@/lib/bookUtils";

/**
 * Shared "book media row" — cover (image or gradient + letter) + title / author / meta.
 * Canonical `.now-reading-*` class set. Used by the Now Reading cards and the barcode
 * ScanPreview (Add a book). Keep both consumers on this component so the two never drift.
 *
 * @param book  { title, author?, genre?, year? }
 * @param cover resolved cover url, or null/undefined for the gradient + letter placeholder
 */
export default function BookMediaRow({ book, cover }) {
  const [c1, c2] = coverColors(book.title);
  const letter = coverLetter(book.title);
  return (
    <div className="now-reading-row">
      <div
        className={`now-reading-cover${cover ? '' : ' now-reading-cover-empty'}`}
        style={{ background: cover ? undefined : `linear-gradient(135deg, ${c1}, ${c2})` }}>
        {cover
          ? <img src={cover} alt={book.title} />
          : <span className="now-reading-cover-letter">{letter}</span>}
      </div>
      <div className="now-reading-text">
        <div className="now-reading-title">{book.title}</div>
        <div className="now-reading-author">{book.author || '—'}</div>
        <div className="book-meta">
          <span>{book.genre || 'NC'}</span>
          <span className="book-meta-sep" aria-hidden="true">·</span>
          <span>{book.year || 'NC'}</span>
        </div>
      </div>
    </div>
  );
}
