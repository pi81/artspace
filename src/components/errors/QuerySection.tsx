"use client";

import { Button } from "@/components/ui/Button";
import { CmsNotFoundError } from "@/lib/cms/errors";
import { t } from "@/lib/i18n/t";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

type QuerySectionProps = {
  fallback: ReactNode;
  children: ReactNode;
};

function QueryErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof CmsNotFoundError) {
    notFound();
  }

  const message = error instanceof Error ? error.message : t("Something went wrong");

  return (
    <div className="rounded-lg border border-muted p-6 text-center">
      <p className="text-sm text-muted">{message}</p>
      <Button type="button" variant="secondary" className="mt-4" onClick={resetErrorBoundary}>
        {t("Try again")}
      </Button>
    </div>
  );
}

export function QuerySection({ fallback, children }: QuerySectionProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={QueryErrorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
