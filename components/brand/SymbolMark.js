export default function SymbolMark({ className, style, title = "Readr" }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <path d="M144 304L512 400" stroke="currentColor" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M144 304L431.225 229.072C484.189 215.255 539.811 215.255 592.775 229.072L779.368 277.748C838.641 293.211 880 346.743 880 408C880 469.257 838.641 522.789 779.368 538.252L592.775 586.928C539.811 600.745 484.189 600.745 431.225 586.928L144 512" stroke="currentColor" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M144 512L431.225 586.928C484.189 600.745 539.811 600.745 592.775 586.928L679.612 564.275C780.986 537.83 880 615.234 880 720M144 720L431.225 794.928C484.189 808.745 539.811 808.745 592.775 794.928L696 768" stroke="currentColor" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
