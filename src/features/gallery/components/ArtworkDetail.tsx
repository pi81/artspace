"use client";

import { Badge } from "@/components/ui/Badge";
import { CmsImage } from "@/components/ui/CmsImage";
import { backLinkClass } from "@/components/ui/interactive";
import { useArtwork } from "@/hooks/useCmsQueries";
import { GutenbergContent } from "@/lib/cms/content/gutenberg";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

type ArtworkDetailProps = {
  slug: string;
};

export function ArtworkDetail({ slug }: ArtworkDetailProps) {
  const { data: artwork } = useArtwork(slug);
  const image = artwork.images[0];

  return (
    <article>
      <Link href="/artworks" className={backLinkClass}>
        ← {t("Back to artworks")}
      </Link>

      <header className="detail-header detail-header--spacious">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          {image ? (
            <figure className="lg:col-span-2 lg:col-start-2 lg:row-start-1">
              <div className="surface-panel--elevated">
                <CmsImage
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority
                  className="w-full"
                />
              </div>
            </figure>
          ) : null}

          <div className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">{t("Artwork")}</p>
            <h1 className="detail-title detail-title--lg">{artwork.title}</h1>
            <p className="mt-3 text-xl text-muted">{artwork.artist}</p>
            <div className="badge-row mt-4">
              {artwork.year ? <Badge>{artwork.year}</Badge> : null}
              {artwork.medium ? <Badge>{artwork.medium}</Badge> : null}
            </div>
          </div>
        </div>
      </header>

      <div className="content content-wide detail-body">
        <GutenbergContent body={artwork.bodyHtml} />
      </div>
    </article>
  );
}
