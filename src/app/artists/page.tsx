import { GridSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { PageShell } from "@/components/layout/PageShell";
import { ArtistGrid } from "@/features/gallery/components/ArtistGrid";

export default function ArtistsPage() {
  return (
    <PageShell>
      <QuerySection fallback={<GridSkeleton />}>
        <ArtistGrid />
      </QuerySection>
    </PageShell>
  );
}
