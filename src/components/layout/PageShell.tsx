import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/features/gallery/components/SiteHeader";
import clsx from "clsx";
import { SkipLink } from "./SkipLink";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="content"
        tabIndex={-1}
        className={clsx("page-container min-h-[70vh] px-4 py-10 outline-none sm:py-12", className)}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
