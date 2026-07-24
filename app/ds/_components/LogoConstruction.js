import SymbolStrokes from "@/components/brand/SymbolStrokes";
import {
  SYMBOL_STROKE,
  LOCKUP_SYMBOL_TRANSFORM,
  LOCKUP_WORDMARK_PATH,
} from "@/components/brand/symbolGeometry";

/* Construction grid — code-driven replacement for the Figma-exported planches
 * logo-construction-{lockup,wordmark}.svg. The grid is DERIVED from the same brand
 * units as the marks (never a baked layout) : x = 148 (logo height, the "d"
 * upright), d = 102 (the "d" laid down, the lateral unit), band = 2x. The real
 * symbol strokes and the real "Readr" path are placed on top — same source of
 * truth as SymbolMark / Wordmark, so a geometry change here follows automatically.
 *
 * Doc artifact only : lives under /ds, stays out of the app bundle. White is baked
 * in (a technical drawing reads on a fixed light mat, like a spec sheet).
 */

// Brand units.
const U = 148; // x — vertical unit, logo height, the "d" upright
const D_W = 102; // the "d" laid down — lateral unit + wordmark's last glyph width
const SYM_W = 180; // symbol cell in the 804 lockup frame
const GAP_W = 102; // 1×d gap between symbol and wordmark
const WORD_W = 522; // wordmark cell

const BAND = 2 * U; // 296 — clear-space band (logo 1x centred in 2x)
const W = 1574;
const H = 1 + 3 * BAND + 1; // 890 — three bands + 1px inset each side
const INNER = W - 2; // 1572

// Colors — fixed light spec-sheet palette (primary-50 lines, primary-5 tint, ink).
const LINE = "#4959E6";
const FILL = "#F4F5FF";
const INK = "#0D0F1A";

// Band edges (y).
const B0 = 1, B1 = 1 + BAND, B2 = 1 + 2 * BAND, B3 = 1 + 3 * BAND; // 1 / 297 / 593 / 889
const LOGO_TOP = B1 + (BAND - U) / 2; // 371 — 0.5x above
const LOGO_BOT = LOGO_TOP + U; // 519

// The "d" glyph in filigree — native box (565..667, 371..519), 102×148. Placed in
// the gap cell (lockup) and flanking the wordmark (wordmark planche) by translation.
const D_ORIGIN_X = 565;
const D_FILIGREE =
  "M613.163 519C585.669 519 565 498.526 565 466.937C565 437.103 585.474 414.679 613.358 414.679C627.593 414.679 640.072 420.723 646.117 429.303V371H667V519H646.117V504.96C639.682 513.15 626.618 519 613.163 519ZM616.088 500.086C633.443 500.086 646.507 486.631 646.507 466.742C646.507 447.047 633.443 433.593 616.088 433.593C598.734 433.593 585.864 446.852 585.864 466.742C585.864 486.826 598.734 500.086 616.088 500.086Z";

// Cell + gauge builders, shared by both variants.
function cellsFor(variant) {
  const total = variant === "lockup" ? SYM_W + GAP_W + WORD_W : D_W + WORD_W + D_W;
  const start = 1 + (INNER - total) / 2; // centred → lockup 385, wordmark 424
  const end = start + total;

  // Logo-height boxes (y LOGO_TOP..LOGO_BOT). d-boxes carry the filigree glyph.
  const widths =
    variant === "lockup"
      ? [["box", SYM_W], ["d", GAP_W], ["box", WORD_W]]
      : [["d", D_W], ["box", WORD_W], ["d", D_W]];
  let x = start;
  const boxes = widths.map(([kind, w]) => {
    const cell = { kind, x, w };
    x += w;
    return cell;
  });

  return { start, end, boxes };
}

// One vertical "2x" gauge : two end caps, a split line, a centred label.
function Gauge({ cx, top, bot }) {
  const mid = (top + bot) / 2;
  const gap = 34; // line breaks 34px either side of the label
  return (
    <g stroke={LINE} strokeWidth={2}>
      <line x1={cx - 3} y1={top} x2={cx + 3} y2={top} />
      <line x1={cx} y1={top} x2={cx} y2={mid - gap} />
      <line x1={cx} y1={mid + gap} x2={cx} y2={bot} />
      <line x1={cx - 3} y1={bot} x2={cx + 3} y2={bot} />
      <text
        x={cx}
        y={mid}
        fill={LINE}
        stroke="none"
        fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
        fontSize={24}
        fontWeight={500}
        textAnchor="middle"
        dominantBaseline="central"
      >
        2x
      </text>
    </g>
  );
}

export default function LogoConstruction({ variant = "lockup" }) {
  const { start, end, boxes } = cellsFor(variant);

  return (
    <svg
      className="lockup-preview"
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Grille de construction Readr — ${variant === "lockup" ? "Symbol & Text" : "Text only"}`}
    >
      {/* Mat + three clear-space bands */}
      <rect x={0} y={0} width={W} height={H} fill="#fff" />
      <rect x={1} y={B0} width={INNER} height={BAND} fill={FILL} stroke={LINE} strokeWidth={2} />
      <rect x={1} y={B2} width={INNER} height={BAND} fill={FILL} stroke={LINE} strokeWidth={2} />

      {/* Lateral clear-space cells (full band height) with the 2x height gauge */}
      <rect x={1} y={B1} width={start - 1} height={BAND} fill={FILL} stroke={LINE} strokeWidth={2} />
      <rect x={end} y={B1} width={W - 1 - end} height={BAND} fill={FILL} stroke={LINE} strokeWidth={2} />

      {/* Logo-height boxes : tinted cells + the "d" filigree in its own cells */}
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={LOGO_TOP} width={b.w} height={U} fill={FILL} stroke={LINE} strokeWidth={2} />
          {b.kind === "d" && (
            <path d={D_FILIGREE} transform={`translate(${b.x - D_ORIGIN_X} 0)`} fill={LINE} opacity={0.25} />
          )}
        </g>
      ))}

      {/* Height gauges : top + bottom bands, then the two lateral cells */}
      <Gauge cx={1 + INNER / 2} top={B0 + 20} bot={B1 - 20} />
      <Gauge cx={1 + INNER / 2} top={B2 + 20} bot={B3 - 20} />
      <Gauge cx={1 + (start - 1) / 2} top={B1 + 20} bot={B2 - 20} />
      <Gauge cx={end + (W - 1 - end) / 2} top={B1 + 20} bot={B2 - 20} />

      {/* The real mark on top — same paths as SymbolMark / Wordmark */}
      {variant === "lockup" ? (
        <g transform={`translate(${start} ${LOGO_TOP})`}>
          <SymbolStrokes color={LINE} transform={LOCKUP_SYMBOL_TRANSFORM} />
          <path d={LOCKUP_WORDMARK_PATH} fill={INK} />
        </g>
      ) : (
        // Wordmark path is native to the 804 frame (x 282..804) → shift into the
        // centre box (starts at start + d) and down to the logo row.
        <g transform={`translate(${start + D_W - 282} ${LOGO_TOP})`}>
          <path d={LOCKUP_WORDMARK_PATH} fill={INK} />
        </g>
      )}
    </svg>
  );
}
