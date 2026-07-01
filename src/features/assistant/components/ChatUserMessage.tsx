type ChatUserMessageProps = {
  text: string;
};

export function ChatUserMessage({ text }: ChatUserMessageProps) {
  return (
    <li>
      <div className="flex justify-end">
        <div className="max-w-[85%] min-w-10 rounded-lg bg-accent px-3 py-2 text-white">
          <p className="mb-0.5 whitespace-pre-wrap">{text}</p>
        </div>
      </div>
    </li>
  );
}
