type ChatErrorMessageProps = {
  message: string;
};

export function ChatErrorMessage({ message }: ChatErrorMessageProps) {
  return (
    <li>
      <div
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-800 dark:text-red-200"
        role="alert"
      >
        <p className="text-sm">{message}</p>
      </div>
    </li>
  );
}
