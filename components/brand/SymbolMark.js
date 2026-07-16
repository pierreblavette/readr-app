import SymbolStrokes from "./SymbolStrokes";
import { SYMBOL_VIEWBOX } from "./symbolGeometry";

export default function SymbolMark({
  className,
  style,
  title = "Readr",
  animated = false,
  echo,
}) {
  return (
    <svg
      className={[animated && "brand-draw", className].filter(Boolean).join(" ")}
      style={style}
      viewBox={SYMBOL_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <SymbolStrokes animated={animated} echo={echo} />
    </svg>
  );
}
