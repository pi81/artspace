import { GridSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { ArtworkGrid } from "@/features/gallery/components/ArtworkGrid";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";

export default function ArtworksPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <QuerySection fallback={<GridSkeleton />}>
          <ArtworkGrid />
        </QuerySection>
      </main>
    </>
  );
}
