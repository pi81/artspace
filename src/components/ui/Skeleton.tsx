import clsx from "clsx";
import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-black/10 dark:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}
