export const metadata = {
  title: "Offline — Readr",
};

export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        gap: "8px",
      }}
    >
      <h1 style={{ fontSize: "22px", fontWeight: 700 }}>You&apos;re offline</h1>
      <p style={{ fontSize: "15px", color: "var(--text-2)" }}>
        Reconnect to load new content. Your library, quotes and words remain available.
      </p>
    </main>
  );
}
