import { AppProvider } from "@/providers/AppProvider";
import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "ArtSpace",
  description:
    "A headless contemporary art gallery — Next.js portfolio project.",
};

type RootLayoutProps = { children: React.ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
