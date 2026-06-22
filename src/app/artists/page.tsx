import { GridSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { ArtistGrid } from "@/features/gallery/components/ArtistGrid";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";

export default function ArtistsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <QuerySection fallback={<GridSkeleton />}>
          <ArtistGrid />
        </QuerySection>
      </main>
    </>
  );
}
