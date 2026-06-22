import { DetailSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { ArtistDetail } from "@/features/gallery/components/ArtistDetail";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";

type ArtistPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <QuerySection fallback={<DetailSkeleton />}>
          <ArtistDetail slug={slug} />
        </QuerySection>
      </main>
    </>
  );
}
