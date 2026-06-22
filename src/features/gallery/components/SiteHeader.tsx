"use client";

import { focusRingClass, navLinkClass, transitionClass } from "@/components/ui/interactive";
import { t } from "@/lib/i18n/t";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const navItems = [
  { href: "/artworks", label: t("Artworks") },
  { href: "/artists", label: t("Artists") },
  { href: "/exhibitions", label: t("Exhibitions") },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="bg-background/80 sticky top-0 z-20 border-b border-black/10 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className={clsx(
            transitionClass,
            "text-lg font-semibold tracking-tight hover:opacity-80",
            focusRingClass,
          )}
        >
          {t("ArtSpace")}
        </Link>

        <nav aria-label={t("Primary navigation")} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
              className={clsx(navLinkClass, "rounded-md px-3 py-2")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={clsx(
            transitionClass,
            "inline-flex items-center justify-center rounded-md p-2 md:hidden",
            "hover:bg-black/5 dark:hover:bg-white/10",
            focusRingClass,
          )}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? t("Close menu") : t("Open menu")}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            aria-hidden
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <nav
        id={menuId}
        aria-label={t("Primary navigation")}
        hidden={!menuOpen}
        className="border-t border-black/10 md:hidden dark:border-white/10"
      >
        <ul className="mx-auto max-w-6xl px-2 py-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                className={clsx(navLinkClass, "block rounded-md px-3 py-3 text-base")}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
