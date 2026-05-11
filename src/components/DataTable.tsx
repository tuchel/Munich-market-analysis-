import React from "react";
import clsx from "clsx";

export function DataTable({
  children,
  className,
  dense,
  caption,
}: {
  children: React.ReactNode;
  className?: string;
  dense?: boolean;
  caption?: string;
}) {
  return (
    <div className={clsx("overflow-x-auto border border-rule rounded-md bg-paper", className)}>
      {caption && (
        <div className="px-4 py-2 border-b border-rule text-sm serif text-ink-800">
          {caption}
        </div>
      )}
      <table className={clsx("editorial", dense && "text-[0.82rem]")}>{children}</table>
    </div>
  );
}
