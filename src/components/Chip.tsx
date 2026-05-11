import clsx from "clsx";

export type Tone = "bull" | "bear" | "neutral";

export function Chip({ tone = "neutral", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "chip",
        tone === "bull" && "chip-bull",
        tone === "bear" && "chip-bear",
        tone === "neutral" && "chip-neutral",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ratingTone(rating: string): Tone {
  if (rating.startsWith("bull")) return "bull";
  if (rating.startsWith("bear")) return "bear";
  if (rating.includes("bearish")) return "bear";
  if (rating.includes("bullish")) return "bull";
  return "neutral";
}

export function ratingLabel(rating: string) {
  // Hyphenated values come straight from data
  if (rating === "neutral-bullish") return "Neutral-bullish";
  if (rating === "neutral-bearish") return "Neutral-bearish";
  return rating[0].toUpperCase() + rating.slice(1);
}
