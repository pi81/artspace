"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useExhibitions } from "@/hooks/useCmsQueries";
import { extractPlainText } from "@/lib/cms/html/extract-plain-text";
import { t } from "@/lib/i18n/t";
import Link from "next/link";

export function ExhibitionGrid() {
  const { data: exhibitions } = useExhibitions();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">{t("Exhibitions")}</h1>
      <p className="mt-2 text-muted">{t("Current and past exhibitions.")}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {exhibitions.map((exhibition) => {
          const summary = exhibition.summary || extractPlainText(exhibition.bodyHtml).slice(0, 120);
          return (
            <li key={exhibition.id}>
              <Link href={`/exhibitions/${exhibition.slug}`}>
                <Card className="h-full transition hover:shadow-md">
                  <h2 className="font-medium">{exhibition.title}</h2>
                  {summary ? <p className="mt-2 text-sm text-muted">{summary}</p> : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exhibition.startDate ? <Badge>{exhibition.startDate}</Badge> : null}
                    {exhibition.endDate ? (
                      <Badge className="bg-black/5 text-muted dark:bg-white/10">
                        {exhibition.endDate}
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
