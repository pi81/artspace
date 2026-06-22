import { DetailSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { PageShell } from "@/components/layout/PageShell";
import { ArtistDetail } from "@/features/gallery/components/ArtistDetail";

type ArtistPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;

  return (
    <PageShell>
      <QuerySection fallback={<DetailSkeleton />}>
        <ArtistDetail slug={slug} />
      </QuerySection>
    </PageShell>
  );
}
