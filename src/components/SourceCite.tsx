import { cite } from "@/data/sources";

export function SourceCite({ ids, prefix = "Sources" }: { ids: string[]; prefix?: string }) {
  const sources = cite(...ids);
  return (
    <div className="source-cite mt-2">
      <span className="uppercase tracking-wider font-semibold text-[0.68rem] text-ink-500">
        {prefix}:
      </span>{" "}
      {sources.map((s, i) => (
        <span key={s.id}>
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.title}
            </a>
          ) : (
            s.title
          )}
          <span className="text-ink-500"> — {s.publisher}</span>
          {s.vintage && <span className="text-ink-400"> ({s.vintage})</span>}
          {i < sources.length - 1 ? "; " : ""}
        </span>
      ))}
      .
    </div>
  );
}
