import clsx from "clsx";

export function Callout({
  title,
  children,
  tone = "default",
  className,
}: {
  title?: string;
  children: React.ReactNode;
  tone?: "default" | "warn" | "note" | "key";
  className?: string;
}) {
  return (
    <aside
      className={clsx(
        "callout",
        tone === "warn" && "border-bear/40 bg-[#f7e6e6]",
        tone === "note" && "border-lake-300 bg-lake-50",
        tone === "key" && "border-gold-500/40 bg-[#f8efd8]",
        className
      )}
    >
      {title && <div className="callout-title">{title}</div>}
      <div className="text-ink-700 leading-relaxed">{children}</div>
    </aside>
  );
}

export function Figure({
  caption,
  source,
  children,
  className,
  note,
}: {
  caption: string;
  source?: React.ReactNode;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={clsx("my-6", className)}>
      <div className="bg-paper border border-rule rounded-md p-4 md:p-5">
        {children}
      </div>
      <figcaption className="mt-2 text-sm text-ink-600 italic leading-snug">
        <span className="not-italic text-ink-800 font-medium">Fig.</span> {caption}
        {note && <span className="block text-xs text-ink-500 mt-1 italic">{note}</span>}
      </figcaption>
      {source && <div className="mt-1">{source}</div>}
    </figure>
  );
}
