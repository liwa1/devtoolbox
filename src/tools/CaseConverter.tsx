import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

type TextCase =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "dot"
  | "reverse"
  | "alternating";

function convertCase(text: string, textCase: TextCase): string {
  const words = text.replace(/[_\-\.]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").split(/\s+/).filter(Boolean);
  switch (textCase) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "title":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    case "sentence":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel":
      return words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("");
    case "pascal":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
    case "snake":
      return words.map((w) => w.toLowerCase()).join("_");
    case "kebab":
      return words.map((w) => w.toLowerCase()).join("-");
    case "constant":
      return words.map((w) => w.toUpperCase()).join("_");
    case "dot":
      return words.map((w) => w.toLowerCase()).join(".");
    case "reverse":
      return text.split("").reverse().join("");
    case "alternating":
      return text.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join("");
    default:
      return text;
  }
}

const CASES: { value: TextCase; label: string }[] = [
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
  { value: "camel", label: "camelCase" },
  { value: "pascal", label: "PascalCase" },
  { value: "snake", label: "snake_case" },
  { value: "kebab", label: "kebab-case" },
  { value: "constant", label: "CONSTANT_CASE" },
  { value: "dot", label: "dot.case" },
  { value: "reverse", label: "esreveR" },
  { value: "alternating", label: "aLtErNaTiNg" },
];

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [selectedCase, setSelectedCase] = useState<TextCase>("camel");

  const output = input ? convertCase(input, selectedCase) : "";

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, Title Case and more."
      path="/case-converter"
    >
      <PremiumGate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert…"
            className="code-input h-32 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CASES.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCase(c.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCase === c.value
                  ? "bg-primary-600 text-white"
                  : "border border-surface-300 bg-white text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {output && (
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Output</label>
              <CopyButton text={output} />
            </div>
            <div className="rounded-lg border border-surface-200 bg-surface-50 p-4 dark:border-surface-700 dark:bg-surface-900">
              <code className="break-all text-sm text-surface-800 dark:text-green-400">{output}</code>
            </div>
          </div>
        )}
      </PremiumGate>
    </ToolLayout>
  );
}
