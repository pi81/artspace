import { PageShell } from "@/components/layout/PageShell";
import { textLinkClass } from "@/components/ui/interactive";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export default function HomePage() {
  return (
    <PageShell className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{t("ArtSpace")}</h1>
      <p className="mt-3 max-w-xl text-muted">
        {t("Headless gallery shell is up. Browse artworks, artists, and exhibitions.")}
      </p>
      <nav aria-label={t("Quick links")} className="mt-8 flex flex-wrap gap-4">
        <Link href="/artworks" className={textLinkClass}>
          {t("Artworks")}
        </Link>
        <Link href="/artists" className={textLinkClass}>
          {t("Artists")}
        </Link>
        <Link href="/exhibitions" className={textLinkClass}>
          {t("Exhibitions")}
        </Link>
      </nav>
    </PageShell>
  );
}
