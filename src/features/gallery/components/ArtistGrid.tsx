"use client";

import { Card } from "@/components/ui/Card";
import { useArtists } from "@/hooks/useCmsQueries";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function ArtistGrid() {
  const { data: artists } = useArtists();

  return (
    <div>
      <h1 className="page-title">{t("Artists")}</h1>
      <p className="page-lead">{t("Meet the artists in our collection.")}</p>
      <ul className="grid-catalog">
        {artists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/artists/${artist.slug}`}>
              <Card className="card-interactive">
                <h2 className="font-medium">{artist.name}</h2>
                {(artist.birthYear ?? artist.deathYear) ? (
                  <p className="card-meta">
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
