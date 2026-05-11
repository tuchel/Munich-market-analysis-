import React from "react";

export function PageHeader({
  kicker,
  title,
  standfirst,
  meta,
}: {
  kicker?: string;
  title: string;
  standfirst?: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <header className="canvas pt-10 md:pt-14 pb-6 border-b border-rule">
      {kicker && <div className="kicker text-ink-500">{kicker}</div>}
      <h1 className="serif text-display-lg md:text-display-xl text-ink-900 mt-2 leading-tight">
        {title}
      </h1>
      {standfirst && (
        <p className="mt-4 max-w-prose text-[1.08rem] leading-relaxed text-ink-700">
          {standfirst}
        </p>
      )}
      {meta && <div className="mt-4 text-xs text-ink-500 tabnums">{meta}</div>}
    </header>
  );
}

export function SectionHeader({
  kicker,
  title,
  sub,
  id,
}: {
  kicker?: string;
  title: string;
  sub?: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="mb-6">
      {kicker && <div className="kicker text-gold-500">{kicker}</div>}
      <h2 className="serif text-display md:text-display-lg text-ink-900 mt-1 leading-tight">
        {title}
      </h2>
      {sub && <p className="mt-2 max-w-prose text-ink-600 leading-relaxed">{sub}</p>}
    </div>
  );
}
