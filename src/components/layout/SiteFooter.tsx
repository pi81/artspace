import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-black/10 dark:border-white/10">
      <div className="page-container flex flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {t("ArtSpace")}. {t("Headless gallery demo.")}
        </p>
        <nav aria-label={t("Footer navigation")} className="flex flex-wrap gap-4 text-sm">
          <Link href="/artworks" className="hover:text-foreground text-muted">
            {t("Artworks")}
          </Link>
          <Link href="/artists" className="hover:text-foreground text-muted">
            {t("Artists")}
          </Link>
          <Link href="/exhibitions" className="hover:text-foreground text-muted">
            {t("Exhibitions")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
