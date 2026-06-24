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
      <h1 className="page-title">{t("Exhibitions")}</h1>
      <p className="page-lead">{t("Current and past exhibitions.")}</p>
      <ul className="grid-catalog--2col">
        {exhibitions.map((exhibition) => {
          const summary = exhibition.summary || extractPlainText(exhibition.bodyHtml).slice(0, 140);
          const coverImage = exhibitionCoverImage(exhibition, artworks);
          const dateRange = formatExhibitionDates(exhibition.startDate, exhibition.endDate);

          return (
            <li key={exhibition.id}>
              <Link href={`/exhibitions/${exhibition.slug}`}>
                <Card className="card-interactive--lg group h-full overflow-hidden p-0">
                  {coverImage ? (
                    <div className="relative aspect-16/10 overflow-hidden">
                      <CmsImage
                        src={coverImage.url}
                        alt={coverImage.alt}
                        cover
                        className="image-hover-zoom--slow"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h2 className="section-title text-white">{exhibition.title}</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="border-subtle border-b p-5">
                      <h2 className="section-title">{exhibition.title}</h2>
                    </div>
                  )}
                  <div className="p-5">
                    {summary ? <p className="text-muted-sm">{summary}</p> : null}
                    <div className="badge-row mt-4">
                      {dateRange ? <Badge>{dateRange}</Badge> : null}
                      {exhibition.artworkIds.length > 0 ? (
                        <Badge className="badge-subtle">
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
