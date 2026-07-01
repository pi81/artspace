import { Spinner } from "@/components/ui/Spinner";
import { t } from "@/lib/i18n/t";
import { ChatAvatar } from "@assistant/components/ChatAvatar";

type ChatAssistantMessageProps = {
  avatarLabel: string;
  text?: string;
  thinking?: boolean;
};

export function ChatAssistantMessage({
  avatarLabel,
  text,
  thinking = false,
}: ChatAssistantMessageProps) {
  return (
    <li>
      <div className="flex items-start justify-start gap-2">
        <ChatAvatar className="mt-0.5" label={avatarLabel} />
        {thinking ? (
          <div className="flex items-center gap-2 rounded-lg bg-black/5 px-3 py-2 dark:bg-white/10">
            <Spinner className="size-4" />
            <span className="text-xs text-muted">{t("Thinking…")}</span>
          </div>
        ) : (
          <div className="max-w-[85%] rounded-lg bg-black/5 px-3 py-2 dark:bg-white/10">
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        )}
      </div>
    </li>
  );
}
