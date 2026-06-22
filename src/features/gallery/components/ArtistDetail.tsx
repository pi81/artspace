"use client";

import { backLinkClass } from "@/components/ui/interactive";
import { useArtist } from "@/hooks/useCmsQueries";
import { GutenbergContent } from "@/lib/gutenberg/content/GutenbergContent";
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
      <header className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">{artist.name}</h1>
        {(artist.birthYear ?? artist.deathYear) ? (
          <p className="mt-2 text-muted">
            {artist.birthYear ?? "?"} — {artist.deathYear ?? "?"}
          </p>
        ) : null}
      </header>
      <div className="mt-8">
        <GutenbergContent html={artist.bodyHtml} />
      </div>
    </article>
  );
}
