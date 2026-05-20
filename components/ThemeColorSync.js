"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

// Keeps <meta name="theme-color"> in sync with the manual theme toggle.
// The app theme is decoupled from the OS (enableSystem={false}), so the
// static themeColor in viewport would leave Android's system bar and
// Safari's URL bar light while the app is dark.
const COLORS = { light: "#FEFEFF", dark: "#0F0F0F" };

export default function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = COLORS[resolvedTheme] || COLORS.light;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [resolvedTheme]);

  return null;
}
