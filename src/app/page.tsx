import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { textLinkClass } from "@/components/ui/interactive";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

const highlights = [
  {
    href: "/artworks",
    title: t("Artworks"),
    description: t("Browse the permanent collection."),
  },
  {
    href: "/artists",
    title: t("Artists"),
    description: t("Meet the artists in our collection."),
  },
  {
    href: "/exhibitions",
    title: t("Exhibitions"),
    description: t("Current and past exhibitions."),
  },
] as const;

export default function HomePage() {
  return (
    <PageShell className="py-14 sm:py-20">
      <section className="max-w-3xl">
        <p className="eyebrow">{t("Gallery")}</p>
        <h1 className="detail-title mt-3 sm:text-5xl">{t("ArtSpace")}</h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">
          {t("A headless gallery experience with artworks, artists, and curated exhibitions.")}
        </p>
      </section>

      <nav aria-label={t("Quick links")} className="mt-12 grid gap-4 sm:grid-cols-3">
        {highlights.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="card-interactive h-full hover:border-accent/30">
              <h2 className="font-serif text-xl font-semibold">{item.title}</h2>
              <p className="card-description">{item.description}</p>
              <span className={`mt-4 inline-block text-sm ${textLinkClass}`}>{t("Explore")} →</span>
            </Card>
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
