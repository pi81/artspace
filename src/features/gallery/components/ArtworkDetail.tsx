"use client";

import { Badge } from "@/components/ui/Badge";
import { CmsImage } from "@/components/ui/CmsImage";
import { backLinkClass } from "@/components/ui/interactive";
import { useArtwork } from "@/hooks/useCmsQueries";
import { GutenbergContent } from "@/lib/gutenberg/content/GutenbergContent";
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
      <header className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">{artwork.title}</h1>
        <p className="mt-2 text-lg text-muted">{artwork.artist}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {artwork.year ? <Badge>{artwork.year}</Badge> : null}
          {artwork.medium ? <Badge>{artwork.medium}</Badge> : null}
        </div>
      </header>
      {image ? (
        <figure className="mt-8 overflow-hidden rounded-lg">
          <CmsImage
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            className="w-full object-cover"
          />
        </figure>
      ) : null}
      <div className="mt-8">
        <GutenbergContent html={artwork.bodyHtml} />
      </div>
    </article>
  );
}
