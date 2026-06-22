import clsx from "clsx";

export const transitionClass = "transition duration-200 ease-out motion-reduce:transition-none";

export const focusRingClass = clsx(
  "rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
);

export const navLinkClass = clsx(
  transitionClass,
  "hover:text-foreground text-sm text-muted",
  focusRingClass,
);

export const backLinkClass = clsx(
  transitionClass,
  "hover:text-foreground text-sm text-muted",
  focusRingClass,
);

export const textLinkClass = clsx(
  transitionClass,
  "text-accent underline-offset-4 hover:underline",
  focusRingClass,
);
