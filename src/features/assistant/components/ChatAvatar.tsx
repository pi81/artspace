import clsx from "clsx";

type ChatAvatarProps = {
  className?: string;
  label: string;
};

export function ChatAvatar({ className, label }: ChatAvatarProps) {
  return (
    <span
      aria-hidden
      className={clsx(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent",
        className,
      )}
    >
      {label}
    </span>
  );
}
