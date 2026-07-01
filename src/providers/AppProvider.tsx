"use client";

import { GalleryChatWidget } from "@project/active";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./query-client";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <GalleryChatWidget />
    </QueryClientProvider>
  );
}
