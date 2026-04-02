import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t border-black/8 py-6 px-6 flex items-center justify-center gap-4 text-sm text-[#888]">
      <span>© 2026 Pierre Blavette</span>
      <span className="text-[#ccc]">·</span>
      <Link href="/library" className="hover:text-[#1B1B1B] transition-colors">Open app</Link>
      <span className="text-[#ccc]">·</span>
      <a href="https://pierreblavette.com" target="_blank" rel="noopener"
        className="hover:text-[#1B1B1B] transition-colors">
        pierreblavette.com
      </a>
    </footer>
  );
}
