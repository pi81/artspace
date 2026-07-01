"use client";

import { ChatWidget } from "@assistant/components/ChatWidget";
import { galleryAssistantUiConfig } from "./assistant-config";

export function GalleryChatWidget() {
  return <ChatWidget config={galleryAssistantUiConfig} />;
}
