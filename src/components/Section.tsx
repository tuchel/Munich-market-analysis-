import clsx from "clsx";
import React from "react";

export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "parchment" | "ink";
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-10 md:py-14 border-b border-rule",
        tone === "parchment" && "bg-parchment/50",
        tone === "ink" && "bg-ink-900 text-paper",
        className
      )}
    >
      <div className="canvas">{children}</div>
    </section>
  );
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("prose-editorial max-w-prose text-ink-800", className)}>{children}</div>;
}
