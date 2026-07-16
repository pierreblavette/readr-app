import { SYMBOL_ECHO_TINTS, SYMBOL_PATHS, SYMBOL_STROKE } from "./symbolGeometry";

// Seconds between each of the 3 strokes, and how far each echo layer runs ahead
// of the one stacked above it. The Figma export carries geometry only, no
// keyframes — these are the values Pierre set. Last stroke lands at
// 2×STAGGER + 2×ECHO_LEAD + draw = 1.3s (draw duration lives in library.css).
const STAGGER = 0.2;
const ECHO_LEAD = 0.2;

// Renders the symbol's stroke layers, shared by SymbolMark and LogoLockup.
// Static : one layer. Animated : two echo ghosts running ahead of the main
// stroke, matching the 3-layer structure of the Figma motion export.
export default function SymbolStrokes({
  color = "currentColor",
  animated = false,
  echo = SYMBOL_ECHO_TINTS,
  transform,
}) {
  const layers = animated
    ? [...echo.map((c) => ({ color: c, isEcho: true })), { color, isEcho: false }]
    : [{ color, isEcho: false }];

  return (
    <>
      {layers.map((layer, li) => (
        <g
          key={li}
          className={layer.isEcho ? "brand-draw-echo" : undefined}
          transform={transform}
          stroke={layer.color}
          strokeWidth={SYMBOL_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {SYMBOL_PATHS.map((d, pi) => (
            <path
              key={d}
              d={d}
              pathLength={animated ? 1 : undefined}
              style={
                animated
                  ? { animationDelay: `${(pi * STAGGER + li * ECHO_LEAD).toFixed(2)}s` }
                  : undefined
              }
            />
          ))}
        </g>
      ))}
    </>
  );
}
