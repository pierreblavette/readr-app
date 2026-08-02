"use client";
import { loadDemoData, wipeAllData } from "@/lib/demoData";
import DSSection from "../_components/DSSection";

export default function DevToolsPage() {
  const onLoad = () => {
    if (!window.confirm("Load demo data ? This will overwrite your current library, quotes, words and collections.")) return;
    const res = loadDemoData();
    if (res.ok) {
      const c = res.counts;
      alert(`Loaded : ${c.books} books, ${c.wishlist} wishlist, ${c.quotes} quotes, ${c.words} words, ${c.collections} collections. Reloading…`);
      window.location.href = "/library";
    } else {
      alert(`Failed : ${res.error}`);
    }
  };

  const onWipe = () => {
    if (!window.confirm("Wipe ALL Readr data from this device ? This cannot be undone.")) return;
    const res = wipeAllData();
    if (res.ok) {
      alert("All Readr data wiped. Reloading…");
      window.location.href = "/library";
    } else {
      alert(`Failed : ${res.error}`);
    }
  };

  return (
    <DSSection
      id="dev-tools"
      title="Dev Tools"
      sub="Local utilities for quick PWA testing — fill or wipe the local data. Not for real users."
    >
      <div className="ds-card">
        <div className="ds-card-head">Load demo data</div>
        <div className="ds-card-body col">
          <p className="ds-note">Injects a realistic seed into localStorage : 15 owned books (mix Reading / Finished with ratings + notes), 10 wishlist items, ~25 quotes, 15 dictionary words (EN + FR), 4 collections, and a yearly reading goal of 30. Timestamps are spread over the last 5 months so the Activity card shows real cubes. Existing data is overwritten — the page reloads to <span className="ds-class">/library</span> after seeding.</p>
          <div className="ds-action-block">
            <button type="button" className="btn btn-primary btn-md" onClick={onLoad}>Load demo data</button>
          </div>
        </div>
      </div>

      <div className="ds-card">
        <div className="ds-card-head">Wipe all data</div>
        <div className="ds-card-body col">
          <p className="ds-note">Removes every <code>readr-*</code> key from localStorage : books, quotes, words, collections, reading goal, last tab, active collection, sidebar collapsed state. Cannot be undone — the page reloads to <span className="ds-class">/library</span> after wiping.</p>
          <div className="ds-action-block">
            <button type="button" className="btn btn-critical btn-md" onClick={onWipe}>Wipe all data</button>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
