import { SiteHeader } from "@/features/gallery/components/SiteHeader";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          {t("ArtSpace")}
        </h1>
        <p className="text-muted mt-3 max-w-xl">
          {t(
            "Headless gallery shell is up. Browse artworks, artists, and exhibitions.",
          )}
        </p>
        <nav className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/artworks"
            className="text-accent underline-offset-4 hover:underline"
          >
            {t("Artworks")}
          </Link>
          <Link
            href="/artists"
            className="text-accent underline-offset-4 hover:underline"
          >
            {t("Artists")}
          </Link>
          <Link
            href="/exhibitions"
            className="text-accent underline-offset-4 hover:underline"
          >
            {t("Exhibitions")}
          </Link>
        </nav>
      </main>
    </>
  );
}
