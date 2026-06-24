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

      <header className="surface-panel mt-6 overflow-hidden rounded-2xl">
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
              <p className="eyebrow-on-dark">{t("Exhibition")}</p>
              <h1 className="detail-title detail-title--hero">{exhibition.title}</h1>
              {exhibition.summary ? (
                <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
                  {exhibition.summary}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <p className="eyebrow">{t("Exhibition")}</p>
            <h1 className="detail-title detail-title--hero">{exhibition.title}</h1>
            {exhibition.summary ? (
              <p className="mt-3 max-w-2xl text-lg text-muted">{exhibition.summary}</p>
            ) : null}
          </div>
        )}

        <div className="badge-row border-subtle border-t px-6 py-4 sm:px-8">
          {dateRange ? <Badge>{dateRange}</Badge> : null}
          {featuredArtworks.length > 0 ? (
            <Badge className="badge-subtle">
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
            <h2 className="section-title">{t("Works in this exhibition")}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featuredArtworks.map((artwork) => {
                const image = artwork.images[0];
                return (
                  <li key={artwork.id}>
                    <Link href={`/artworks/${artwork.slug}`}>
                      <Card className="card-interactive group overflow-hidden p-0">
                        {image ? (
                          <div className="aspect-4/3 overflow-hidden">
                            <CmsImage
                              src={image.url}
                              alt={image.alt}
                              cover
                              className="image-hover-zoom"
                            />
                          </div>
                        ) : null}
                        <div className="p-4">
                          <h3 className="font-medium">{artwork.title}</h3>
                          <p className="card-meta">{artwork.artist}</p>
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
