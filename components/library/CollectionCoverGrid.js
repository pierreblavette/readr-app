"use client";
import { useEffect, useState } from "react";
import { coverColors, fetchBookCover, loadGBCache, saveGBCache } from "../../lib/bookUtils";

function CoverCell({ book }) {
  const [cover, setCover] = useState(null);
  const [c1, c2] = book ? coverColors(book.title) : ['var(--illus-bg-2)', 'var(--illus-bg-3)'];

  useEffect(() => {
    if (!book) return;
    const cache = loadGBCache();
    const key = `${book.title}||${book.author}`;
    if (cache[key] !== undefined) { setCover(cache[key]?.thumb || null); return; }
    fetchBookCover(book.title, book.author, cache).then(res => {
      saveGBCache({ ...cache, [key]: res });
      setCover(res?.thumb || null);
    });
  }, [book]);

  if (!book) {
    return <div className="col-card-cover-cell"><div className="col-card-cover-placeholder" /></div>;
  }
  return (
    <div className="col-card-cover-cell">
      {cover
        ? <img src={cover} alt="" className="col-card-cover-img" />
        : <div className="col-card-cover-placeholder" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
      }
    </div>
  );
}

export default function CollectionCoverGrid({ books }) {
  const slots = [0, 1, 2, 3];
  return (
    <div className="col-card-cover-grid">
      {slots.map(i => <CoverCell key={i} book={books[i] || null} />)}
    </div>
  );
}
