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
      <h1 className="page-title">{t("Artworks")}</h1>
      <p className="page-lead">{t("Browse the permanent collection.")}</p>
      <ul className="grid-catalog">
        {artworks.map((artwork, index) => {
          const image = artwork.images[0];
          return (
            <li key={artwork.id}>
              <Link href={`/artworks/${artwork.slug}`}>
                <Card className="card-interactive group h-full overflow-hidden">
                  {image ? (
                    <div className="-mx-4 -mt-4 mb-3 aspect-4/3 overflow-hidden">
                      <CmsImage
                        src={image.url}
                        alt={image.alt}
                        priority={index < 4}
                        cover
                        className="image-hover-zoom object-top ease-out"
                      />
                    </div>
                  ) : null}
                  <h2 className="font-medium">{artwork.title}</h2>
                  <p className="card-meta">{artwork.artist}</p>
                  <div className="badge-row mt-2">
                    {artwork.year ? <Badge>{artwork.year}</Badge> : null}
                    {artwork.medium ? (
                      <Badge className="badge-subtle">{artwork.medium}</Badge>
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
