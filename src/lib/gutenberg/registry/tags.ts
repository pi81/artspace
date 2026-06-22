import type { ComponentType } from "react";

type TagHandlerProps = {
  attribs: Record<string, string>;
};

type TagHandler = ComponentType<TagHandlerProps>;

export const tagHandlers: Record<string, TagHandler> = {};
