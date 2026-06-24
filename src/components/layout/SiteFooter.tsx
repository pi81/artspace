import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-subtle mt-20 border-t">
      <div className="page-container flex flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-sm">
          © {new Date().getFullYear()} {t("ArtSpace")}. {t("Headless gallery demo.")}
        </p>
        <nav aria-label={t("Footer navigation")} className="flex flex-wrap gap-4 text-sm">
          <Link href="/artworks" className="footer-link">
            {t("Artworks")}
          </Link>
          <Link href="/artists" className="footer-link">
            {t("Artists")}
          </Link>
          <Link href="/exhibitions" className="footer-link">
            {t("Exhibitions")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
