"use client";

import { Badge } from "@/components/ui/Badge";
import { backLinkClass } from "@/components/ui/interactive";
import { useExhibition } from "@/hooks/useCmsQueries";
import { GutenbergContent } from "@/lib/cms/content/gutenberg";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

type ExhibitionDetailProps = {
  slug: string;
};

export function ExhibitionDetail({ slug }: ExhibitionDetailProps) {
  const { data: exhibition } = useExhibition(slug);

  return (
    <article>
      <Link href="/exhibitions" className={backLinkClass}>
        ← {t("Back to exhibitions")}
      </Link>
      <header className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">{exhibition.title}</h1>
        {exhibition.summary ? (
          <p className="mt-2 text-lg text-muted">{exhibition.summary}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {exhibition.startDate ? <Badge>{exhibition.startDate}</Badge> : null}
          {exhibition.endDate ? <Badge>{exhibition.endDate}</Badge> : null}
          {exhibition.artworkIds.length > 0 ? (
            <Badge className="bg-black/5 text-muted dark:bg-white/10">
              {exhibition.artworkIds.length} {t("works")}
            </Badge>
          ) : null}
        </div>
      </header>
      <div className="mt-8">
        <GutenbergContent body={exhibition.bodyHtml} />
      </div>
    </article>
  );
}
