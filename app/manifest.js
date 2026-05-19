export default function manifest() {
  return {
    id: "/library",
    name: "Readr",
    short_name: "Readr",
    description: "Your books, finally in their place.",
    start_url: "/library",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "fr",
    dir: "ltr",
    categories: ["books", "lifestyle", "productivity"],
    background_color: "#FEFEFF",
    theme_color: "#FEFEFF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
