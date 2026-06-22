import { DetailSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { ArtworkDetail } from "@/features/gallery/components/ArtworkDetail";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";

type ArtworkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <QuerySection fallback={<DetailSkeleton />}>
          <ArtworkDetail slug={slug} />
        </QuerySection>
      </main>
    </>
  );
}
