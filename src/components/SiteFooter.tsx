import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-parchment/40 mt-16">
      <div className="canvas py-10 grid md:grid-cols-4 gap-8 text-sm text-ink-700">
        <div>
          <div className="serif text-[1.1rem] text-ink-800 mb-2">Starnberger See Property Review</div>
          <p className="text-ink-600 leading-relaxed">
            Independent, non-commercial research prepared for a single prospective buyer
            evaluating a primary residence in the €5–10M band around the Starnberger See.
          </p>
        </div>
        <div>
          <div className="kicker mb-2">Sections</div>
          <ul className="space-y-1">
            <li><Link href="/market" className="hover:underline">10-Year Market</Link></li>
            <li><Link href="/communities" className="hover:underline">Communities</Link></li>
            <li><Link href="/lakefront" className="hover:underline">Lakefront Premium</Link></li>
            <li><Link href="/signals" className="hover:underline">Signals</Link></li>
          </ul>
        </div>
        <div>
          <div className="kicker mb-2">Trends</div>
          <ul className="space-y-1">
            <li><Link href="/trends/rates" className="hover:underline">Rates & Affordability</Link></li>
            <li><Link href="/trends/demographics" className="hover:underline">Demographics & Supply</Link></li>
            <li><Link href="/trends/policy-climate" className="hover:underline">Policy & Climate</Link></li>
            <li><Link href="/trends/competing-markets" className="hover:underline">Competing Markets</Link></li>
          </ul>
        </div>
        <div>
          <div className="kicker mb-2">Reference</div>
          <ul className="space-y-1">
            <li><Link href="/tools/comparator" className="hover:underline">Comparator</Link></li>
            <li><Link href="/tools/scenarios" className="hover:underline">Scenarios</Link></li>
            <li><Link href="/due-diligence" className="hover:underline">Due-Diligence Checklist</Link></li>
            <li><Link href="/glossary" className="hover:underline">Glossary</Link></li>
            <li><Link href="/methodology" className="hover:underline">Methodology</Link></li>
            <li><Link href="/sources" className="hover:underline">Sources</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="canvas py-4 flex flex-col md:flex-row gap-2 md:items-center justify-between text-xs text-ink-500">
          <div>© {new Date().getFullYear()} — private research, not investment advice.</div>
          <div className="tabnums">
            Data as of Q1 2026 · One-time snapshot · All figures synthesized from public/official sources
          </div>
        </div>
      </div>
    </footer>
  );
}
