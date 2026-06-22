import type { ReactNode } from "react";

export type GutenbergParser = {
  render(html: string): ReactNode;
};
