import { t } from "@/lib/i18n/t";
import clsx from "clsx";
import Link from "next/link";

const navItems = [
  { href: "/artworks", label: t("Artworks") },
  { href: "/artists", label: t("Artists") },
  { href: "/exhibitions", label: t("Exhibitions") },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {t("ArtSpace")}
        </Link>
        <nav className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "text-muted text-sm transition hover:text-(--foreground)",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
