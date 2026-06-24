"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CmsImage } from "@/components/ui/CmsImage";
import {
  exhibitionCoverImage,
  formatExhibitionDates,
} from "@/features/gallery/utils/exhibition-helpers";
import { useArtworks, useExhibitions } from "@/hooks/useCmsQueries";
import { extractPlainText } from "@/lib/cms/utils/extract-plain-text";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function ExhibitionGrid() {
  const { data: exhibitions } = useExhibitions();
  const { data: artworks } = useArtworks();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{t("Exhibitions")}</h1>
      <p className="mt-2 text-muted">{t("Current and past exhibitions.")}</p>
      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {exhibitions.map((exhibition) => {
          const summary = exhibition.summary || extractPlainText(exhibition.bodyHtml).slice(0, 140);
          const coverImage = exhibitionCoverImage(exhibition, artworks);
          const dateRange = formatExhibitionDates(exhibition.startDate, exhibition.endDate);

          return (
            <li key={exhibition.id}>
              <Link href={`/exhibitions/${exhibition.slug}`}>
                <Card className="group h-full overflow-hidden p-0 transition hover:shadow-lg">
                  {coverImage ? (
                    <div className="relative aspect-16/10 overflow-hidden">
                      <CmsImage
                        src={coverImage.url}
                        alt={coverImage.alt}
                        cover
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h2 className="font-serif text-2xl font-semibold text-white">
                          {exhibition.title}
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <div className="border-b border-black/10 p-5 dark:border-white/10">
                      <h2 className="font-serif text-2xl font-semibold">{exhibition.title}</h2>
                    </div>
                  )}
                  <div className="p-5">
                    {summary ? <p className="text-sm text-muted">{summary}</p> : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {dateRange ? <Badge>{dateRange}</Badge> : null}
                      {exhibition.artworkIds.length > 0 ? (
                        <Badge className="bg-black/5 text-muted dark:bg-white/10">
                          {exhibition.artworkIds.length} {t("works")}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
