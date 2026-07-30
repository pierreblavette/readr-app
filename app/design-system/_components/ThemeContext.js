"use client";
import { createContext, useContext } from "react";

// Le layout détient le state `theme` (et applique data-theme sur <html>) et le
// diffuse via ce context. Les pages qui ont besoin du thème en JS — Swatch, qui
// affiche la valeur light/dark d'un token — le consomment via useTheme().
// Tout le reste du rendu thème est purement CSS via [data-theme].
export const DSThemeContext = createContext({ theme: "light", setTheme: () => {} });

export const useTheme = () => useContext(DSThemeContext);
