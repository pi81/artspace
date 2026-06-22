import clsx from "clsx";
import type { HTMLAttributes } from "react";

type SpinnerProps = HTMLAttributes<HTMLDivElement>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        "border-muted border-t-accent size-5 animate-spin rounded-full border-2",
        className,
      )}
      {...props}
    />
  );
}
