import { DetailSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { PageShell } from "@/components/layout/PageShell";
import { ExhibitionDetail } from "@/features/gallery/components/ExhibitionDetail";

type ExhibitionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExhibitionPage({ params }: ExhibitionPageProps) {
  const { slug } = await params;

  return (
    <PageShell>
      <QuerySection fallback={<DetailSkeleton />}>
        <ExhibitionDetail slug={slug} />
      </QuerySection>
    </PageShell>
  );
}
