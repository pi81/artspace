import { DetailSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { ExhibitionDetail } from "@/features/gallery/components/ExhibitionDetail";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";

type ExhibitionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExhibitionPage({ params }: ExhibitionPageProps) {
  const { slug } = await params;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <QuerySection fallback={<DetailSkeleton />}>
          <ExhibitionDetail slug={slug} />
        </QuerySection>
      </main>
    </>
  );
}
