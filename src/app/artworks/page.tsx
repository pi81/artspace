import { GridSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { PageShell } from "@/components/layout/PageShell";
import { ArtworkGrid } from "@/features/gallery/components/ArtworkGrid";

export default function ArtworksPage() {
  return (
    <PageShell>
      <QuerySection fallback={<GridSkeleton />}>
        <ArtworkGrid />
      </QuerySection>
    </PageShell>
  );
}
