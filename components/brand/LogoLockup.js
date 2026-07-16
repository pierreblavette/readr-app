import SymbolStrokes from "./SymbolStrokes";
import {
  LOCKUP_SYMBOL_TRANSFORM,
  LOCKUP_VIEWBOX,
  LOCKUP_WORDMARK_PATH,
} from "./symbolGeometry";

// Horizontal lockup : symbol (primary-50 by default) + wordmark (currentColor).
// Symbol and wordmark are height-aligned by design — both span the full 148.
// On accent backgrounds the symbol turns white like the wordmark : pass
// symbolColor="#FFFFFF" (and matching echo tints when animated).
export default function LogoLockup({
  className,
  style,
  title = "Readr",
  animated = false,
  echo,
  symbolColor = "var(--primary-50)",
}) {
  return (
    <svg
      className={[animated && "brand-draw", className].filter(Boolean).join(" ")}
      style={style}
      viewBox={LOCKUP_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <SymbolStrokes
        color={symbolColor}
        animated={animated}
        echo={echo}
        transform={LOCKUP_SYMBOL_TRANSFORM}
      />
      <path
        className={animated ? "brand-draw-wordmark" : undefined}
        d={LOCKUP_WORDMARK_PATH}
        fill="currentColor"
      />
    </svg>
  );
}
