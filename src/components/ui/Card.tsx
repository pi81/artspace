import clsx from "clsx";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-black/10 bg-white/50 p-4 shadow-sm dark:border-white/10 dark:bg-white/5",
        className,
      )}
      {...props}
    />
  );
}
