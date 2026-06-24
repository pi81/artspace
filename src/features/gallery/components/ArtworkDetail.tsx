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

      <header className="mt-6 border-b border-black/10 pb-8 lg:pb-10 dark:border-white/10">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          {image ? (
            <figure className="lg:col-span-2 lg:col-start-2 lg:row-start-1">
              <div className="overflow-hidden rounded-xl border border-black/10 bg-black/2 shadow-md dark:border-white/10 dark:bg-white/5">
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
            <p className="text-sm font-medium tracking-wide text-accent uppercase">{t("Artwork")}</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight lg:text-5xl">
              {artwork.title}
            </h1>
            <p className="mt-3 text-xl text-muted">{artwork.artist}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {artwork.year ? <Badge>{artwork.year}</Badge> : null}
              {artwork.medium ? <Badge>{artwork.medium}</Badge> : null}
            </div>
          </div>
        </div>
      </header>

      <div className="content content-wide mt-10">
        <GutenbergContent body={artwork.bodyHtml} />
      </div>
    </article>
  );
}
