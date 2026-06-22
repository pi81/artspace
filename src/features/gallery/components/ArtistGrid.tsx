"use client";

import { Card } from "@/components/ui/Card";
import { useArtists } from "@/hooks/useCmsQueries";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function ArtistGrid() {
  const { data: artists } = useArtists();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{t("Artists")}</h1>
      <p className="text-muted mt-2">
        {t("Meet the artists in our collection.")}
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/artists/${artist.slug}`}>
              <Card className="transition hover:shadow-md">
                <h2 className="font-medium">{artist.name}</h2>
                {(artist.birthYear ?? artist.deathYear) ? (
                  <p className="text-muted mt-1 text-sm">
                    {artist.birthYear ?? "?"} — {artist.deathYear ?? "?"}
                  </p>
                ) : null}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
