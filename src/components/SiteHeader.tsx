import Link from "next/link";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/market", label: "10-Year Market" },
  { href: "/communities", label: "Communities" },
  { href: "/lakefront", label: "Lakefront Premium" },
  { href: "/signals", label: "Signals" },
  { href: "/trends", label: "Trends" },
  { href: "/tools", label: "Tools" },
  { href: "/due-diligence", label: "Due Diligence" },
  { href: "/sources", label: "Sources" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-paper sticky top-0 z-40 backdrop-blur-sm bg-paper/90">
      <div className="canvas flex items-baseline justify-between py-3.5">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="serif text-[1.4rem] tracking-tight font-medium text-ink-800">
            Starnberger See <span className="text-gold-500">Property Review</span>
          </span>
          <span className="hidden md:inline kicker text-ink-500 pl-3 border-l border-rule">
            A private research portal · vol. I
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-[0.82rem] text-ink-700">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="hover:text-ink-900 hover:underline underline-offset-4"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="hairline" />
    </header>
  );
}
