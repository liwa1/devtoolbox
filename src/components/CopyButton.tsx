import { useState, useCallback } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return { copied, copy };
}

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700 transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <FiCheck size={13} className="text-green-500" /> Copied!
        </>
      ) : (
        <>
          <FiCopy size={13} /> Copy
        </>
      )}
    </button>
  );
}
