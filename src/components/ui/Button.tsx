import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[color:var(--color-accent)] text-white hover:opacity-90",
  secondary:
    "border border-[color:var(--color-muted)] hover:bg-black/5 dark:hover:bg-white/5",
  ghost: "hover:bg-black/5 dark:hover:bg-white/5",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2",
        "text-sm font-medium transition",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        "disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
