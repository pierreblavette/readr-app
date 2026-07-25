import SymbolStrokes from "./SymbolStrokes";
import {
  LOCKUP_SYMBOL_TRANSFORM,
  LOCKUP_VIEWBOX,
  LOCKUP_WORDMARK_PATH,
  LOCKUP_WORDMARK_LETTERS,
} from "./symbolGeometry";

// The wordmark isn't drawn (it's filled) — when animated, its letters cascade in
// from the right. First letter lands as the symbol strokes finish, each next 0.1s
// after (Figma 2026-07). Per-letter delay is inline ; the keyframe lives in library.css.
const LETTER_DELAY = 0.5;
const LETTER_STAGGER = 0.1;

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
      {animated ? (
        LOCKUP_WORDMARK_LETTERS.map((d, i) => (
          <path
            key={i}
            className="brand-draw-letter"
            d={d}
            fill="currentColor"
            fillRule="evenodd"
            style={{ animationDelay: `${(LETTER_DELAY + i * LETTER_STAGGER).toFixed(2)}s` }}
          />
        ))
      ) : (
        <path d={LOCKUP_WORDMARK_PATH} fill="currentColor" />
      )}
    </svg>
  );
}
