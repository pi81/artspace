import { GridSkeleton } from "@/components/errors/LoadingSkeletons";
import { QuerySection } from "@/components/errors/QuerySection";
import { PageShell } from "@/components/layout/PageShell";
import { ExhibitionGrid } from "@/features/gallery/components/ExhibitionGrid";

export default function ExhibitionsPage() {
  return (
    <PageShell>
      <QuerySection fallback={<GridSkeleton />}>
        <ExhibitionGrid />
      </QuerySection>
    </PageShell>
  );
}
