import type { ComponentType } from "react";

export type TagHandlerProps = {
  attribs: Record<string, string>;
};

export type TagHandler = ComponentType<TagHandlerProps>;
