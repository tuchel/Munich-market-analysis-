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
        <details className="lg:hidden group self-center relative">
          <summary
            aria-label="Toggle navigation"
            className="list-none cursor-pointer p-1.5 -mr-1.5 text-ink-700 hover:text-ink-900 [&::-webkit-details-marker]:hidden"
          >
            <svg
              className="h-5 w-5 group-open:hidden"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            </svg>
            <svg
              className="h-5 w-5 hidden group-open:block"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full mt-3 w-64 max-w-[calc(100vw-2.5rem)] bg-paper border border-rule shadow-card rounded-md py-2 flex flex-col text-[0.9rem] text-ink-700">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-4 py-2 hover:bg-parchment hover:text-ink-900"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
      <div className="hairline" />
    </header>
  );
}
