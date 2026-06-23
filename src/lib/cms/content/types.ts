import type { ReactNode } from "react";

export type ContentParser = {
  render(body: string): ReactNode;
};
