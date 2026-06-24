"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CmsImage } from "@/components/ui/CmsImage";
import { backLinkClass } from "@/components/ui/interactive";
import {
  exhibitionCoverImage,
  formatExhibitionDates,
  pickArtworksByIds,
} from "@/features/gallery/utils/exhibition-helpers";
import { useArtworks, useExhibition } from "@/hooks/useCmsQueries";
import { GutenbergContent } from "@/lib/cms/content/gutenberg";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

type ExhibitionDetailProps = {
  slug: string;
};

export function ExhibitionDetail({ slug }: ExhibitionDetailProps) {
  const { data: exhibition } = useExhibition(slug);
  const { data: artworks } = useArtworks();
  const featuredArtworks = pickArtworksByIds(artworks, exhibition.artworkIds);
  const coverImage = exhibitionCoverImage(exhibition, artworks);
  const dateRange = formatExhibitionDates(exhibition.startDate, exhibition.endDate);

  return (
    <article>
      <Link href="/exhibitions" className={backLinkClass}>
        ← {t("Back to exhibitions")}
      </Link>

      <header className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-black/2 dark:border-white/10 dark:bg-white/5">
        {coverImage ? (
          <div className="relative aspect-21/9 max-h-80 w-full overflow-hidden">
            <CmsImage
              src={coverImage.url}
              alt={coverImage.alt}
              cover
              priority
              className="object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="text-sm font-medium tracking-wide text-white/80 uppercase">
                {t("Exhibition")}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                {exhibition.title}
              </h1>
              {exhibition.summary ? (
                <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
                  {exhibition.summary}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <p className="text-sm font-medium tracking-wide text-accent uppercase">
              {t("Exhibition")}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {exhibition.title}
            </h1>
            {exhibition.summary ? (
              <p className="mt-3 max-w-2xl text-lg text-muted">{exhibition.summary}</p>
            ) : null}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-black/10 px-6 py-4 sm:px-8 dark:border-white/10">
          {dateRange ? <Badge>{dateRange}</Badge> : null}
          {featuredArtworks.length > 0 ? (
            <Badge className="bg-black/5 text-muted dark:bg-white/10">
              {featuredArtworks.length} {t("works")}
            </Badge>
          ) : null}
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="content content-wide lg:col-span-7">
          <GutenbergContent body={exhibition.bodyHtml} />
        </div>

        {featuredArtworks.length > 0 ? (
          <aside className="lg:col-span-5">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              {t("Works in this exhibition")}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featuredArtworks.map((artwork) => {
                const image = artwork.images[0];
                return (
                  <li key={artwork.id}>
                    <Link href={`/artworks/${artwork.slug}`}>
                      <Card className="group overflow-hidden p-0 transition hover:shadow-md">
                        {image ? (
                          <div className="aspect-4/3 overflow-hidden">
                            <CmsImage
                              src={image.url}
                              alt={image.alt}
                              cover
                              className="transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : null}
                        <div className="p-4">
                          <h3 className="font-medium">{artwork.title}</h3>
                          <p className="mt-1 text-sm text-muted">{artwork.artist}</p>
                        </div>
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
