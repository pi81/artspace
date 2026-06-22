import { focusRingClass, transitionClass } from "@/components/ui/interactive";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:opacity-90 active:scale-[0.98] motion-reduce:active:scale-100",
  secondary:
    "border border-muted hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10",
  ghost: "hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10",
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        transitionClass,
        "inline-flex items-center justify-center rounded-md px-4 py-2",
        "text-sm font-medium",
        "disabled:pointer-events-none disabled:opacity-50",
        focusRingClass,
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
