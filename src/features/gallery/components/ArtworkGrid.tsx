"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CmsImage } from "@/components/ui/CmsImage";
import { useArtworks } from "@/hooks/useCmsQueries";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function ArtworkGrid() {
  const { data: artworks } = useArtworks();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{t("Artworks")}</h1>
      <p className="text-muted mt-2">{t("Browse the permanent collection.")}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork, index) => {
          const image = artwork.images[0];
          return (
            <li key={artwork.id}>
              <Link href={`/artworks/${artwork.slug}`}>
                <Card className="group h-full overflow-hidden transition hover:shadow-md">
                  {image ? (
                    <div className="-mx-4 -mt-4 mb-3 aspect-4/3 overflow-hidden">
                      <CmsImage
                        src={image.url}
                        alt={image.alt}
                        priority={index < 4}
                        cover
                        className="transition group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <h2 className="font-medium">{artwork.title}</h2>
                  <p className="text-muted mt-1 text-sm">{artwork.artist}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {artwork.year ? <Badge>{artwork.year}</Badge> : null}
                    {artwork.medium ? (
                      <Badge className="text-muted bg-black/5 dark:bg-white/10">
                        {artwork.medium}
                      </Badge>
                    ) : null}
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
