import { GridSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { ExhibitionGrid } from "@/features/gallery/components/ExhibitionGrid";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";

export default function ExhibitionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <QuerySection fallback={<GridSkeleton />}>
          <ExhibitionGrid />
        </QuerySection>
      </main>
    </>
  );
}
