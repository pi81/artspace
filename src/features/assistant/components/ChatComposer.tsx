import { Button } from "@/components/ui/Button";
import { focusRingClass } from "@/components/ui/interactive";
import { t } from "@/lib/i18n/t";
import clsx from "clsx";
import { type SubmitEvent, useState } from "react";

type ChatComposerProps = {
  disabled?: boolean;
  placeholder: string;
  onSend: (text: string) => void;
};

export function ChatComposer({ disabled, placeholder, onSend }: ChatComposerProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();
    if (!text || disabled) return;

    onSend(text);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-muted/40 p-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "flex-1 rounded-lg border border-muted/40 bg-surface px-3 py-2 text-sm",
            focusRingClass,
          )}
        />
        <Button type="submit" disabled={disabled || input.trim().length === 0}>
          {t("Send")}
        </Button>
      </div>
    </form>
  );
}
