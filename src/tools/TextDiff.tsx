import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

function diff(text1: string, text2: string): { type: "same" | "add" | "remove"; text: string }[] {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const result: { type: "same" | "add" | "remove"; text: string }[] = [];

  const maxLen = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i];
    const l2 = lines2[i];

    if (l1 === undefined) {
      result.push({ type: "add", text: l2 });
    } else if (l2 === undefined) {
      result.push({ type: "remove", text: l1 });
    } else if (l1 === l2) {
      result.push({ type: "same", text: l1 });
    } else {
      result.push({ type: "remove", text: l1 });
      result.push({ type: "add", text: l2 });
    }
  }

  return result;
}

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  const diffResult = showDiff ? diff(text1, text2) : [];

  const additions = diffResult.filter((d) => d.type === "add").length;
  const removals = diffResult.filter((d) => d.type === "remove").length;

  const diffText = diffResult
    .map((d) => {
      if (d.type === "add") return `+ ${d.text}`;
      if (d.type === "remove") return `- ${d.text}`;
      return `  ${d.text}`;
    })
    .join("\n");

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two texts and see the differences highlighted. Line-by-line diff tool."
      path="/text-diff"
    >
      <PremiumGate>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
              Original Text
            </label>
            <textarea
              value={text1}
              onChange={(e) => { setText1(e.target.value); setShowDiff(false); }}
              placeholder="Paste original text…"
              className="code-input h-48 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
              Modified Text
            </label>
            <textarea
              value={text2}
              onChange={(e) => { setText2(e.target.value); setShowDiff(false); }}
              placeholder="Paste modified text…"
              className="code-input h-48 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDiff(true)}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Compare
          </button>
          {showDiff && (
            <>
              <span className="text-sm text-green-600 dark:text-green-400">+{additions} additions</span>
              <span className="text-sm text-red-600 dark:text-red-400">-{removals} removals</span>
              <CopyButton text={diffText} />
            </>
          )}
        </div>

        {showDiff && (
          <div className="overflow-auto rounded-lg border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
            {diffResult.map((d, i) => (
              <div
                key={i}
                className={`border-b border-surface-100 px-4 py-1 font-mono text-sm dark:border-surface-800 ${
                  d.type === "add"
                    ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : d.type === "remove"
                    ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    : "text-surface-600 dark:text-surface-400"
                }`}
              >
                <span className="mr-2 select-none inline-block w-4">{d.type === "add" ? "+" : d.type === "remove" ? "−" : " "}</span>
                {d.text}
              </div>
            ))}
          </div>
        )}
      </PremiumGate>
    </ToolLayout>
  );
}
