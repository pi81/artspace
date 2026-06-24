"use client";

import { backLinkClass } from "@/components/ui/interactive";
import { useArtist } from "@/hooks/useCmsQueries";
import { GutenbergContent } from "@/lib/cms/content/gutenberg";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

type ArtistDetailProps = {
  slug: string;
};

export function ArtistDetail({ slug }: ArtistDetailProps) {
  const { data: artist } = useArtist(slug);

  return (
    <article>
      <Link href="/artists" className={backLinkClass}>
        ← {t("Back to artists")}
      </Link>
      <header className="detail-header">
        <p className="eyebrow">{t("Artist")}</p>
        <h1 className="detail-title">{artist.name}</h1>
        {(artist.birthYear ?? artist.deathYear) ? (
          <p className="mt-2 text-muted">
            {artist.birthYear ?? "?"} — {artist.deathYear ?? "?"}
          </p>
        ) : null}
      </header>
      <div className="content detail-body">
        <GutenbergContent body={artist.bodyHtml} />
      </div>
    </article>
  );
}
