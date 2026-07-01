import { Button } from "@/components/ui/Button";
import clsx from "clsx";

type ChatWelcomeProps = {
  welcomeMessage: string;
  suggestedPrompts: readonly string[];
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
};

export function ChatWelcome({
  welcomeMessage,
  suggestedPrompts,
  onSelectPrompt,
  disabled,
}: ChatWelcomeProps) {
  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted">{welcomeMessage}</p>
      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt) => (
          <Button
            key={prompt}
            type="button"
            variant="secondary"
            disabled={disabled}
            className={clsx("h-auto px-3 py-1.5 text-left text-xs whitespace-normal")}
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
