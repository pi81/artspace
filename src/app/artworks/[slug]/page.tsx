import { DetailSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { PageShell } from "@/components/layout/PageShell";
import { ArtworkDetail } from "@/features/gallery/components/ArtworkDetail";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;

  return (
    <PageShell>
      <QuerySection fallback={<DetailSkeleton />}>
        <ArtworkDetail slug={slug} />
      </QuerySection>
    </PageShell>
  );
}
