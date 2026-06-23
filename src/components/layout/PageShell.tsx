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
        className={clsx("mx-auto max-w-6xl px-4 py-12 outline-none", className)}
      >
        {children}
      </main>
    </>
  );
}
