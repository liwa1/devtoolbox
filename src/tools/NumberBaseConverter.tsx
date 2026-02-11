import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

function textToNumber(text: string, base: number): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(base).padStart(base === 16 ? 2 : base === 8 ? 3 : 8, "0"))
    .join(" ");
}

function numberToText(input: string, base: number): string {
  return input
    .trim()
    .split(/\s+/)
    .map((n) => String.fromCharCode(parseInt(n, base)))
    .join("");
}

type Conversion = "binary" | "hex" | "octal" | "decimal";

export default function NumberBaseConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"text-to-number" | "number-to-text">("text-to-number");
  const [base, setBase] = useState<Conversion>("binary");

  const baseMap: Record<Conversion, number> = {
    binary: 2,
    hex: 16,
    octal: 8,
    decimal: 10,
  };

  let output = "";
  try {
    if (mode === "text-to-number") {
      output = textToNumber(input, baseMap[base]);
    } else {
      output = numberToText(input, baseMap[base]);
    }
  } catch {
    output = "Invalid input";
  }

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert text to binary, hex, octal, and decimal. Convert between number bases."
      path="/number-base-converter"
    >
      <PremiumGate>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
            className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
          >
            <option value="text-to-number">Text → Number</option>
            <option value="number-to-text">Number → Text</option>
          </select>
          <select
            value={base}
            onChange={(e) => setBase(e.target.value as Conversion)}
            className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
          >
            <option value="binary">Binary (base 2)</option>
            <option value="octal">Octal (base 8)</option>
            <option value="decimal">Decimal (base 10)</option>
            <option value="hex">Hexadecimal (base 16)</option>
          </select>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "text-to-number" ? "Enter text…" : "Enter numbers separated by spaces…"}
              className="code-input h-48 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Output</label>
              {output && <CopyButton text={output} />}
            </div>
            <textarea
              value={output}
              readOnly
              className="code-input h-48 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-green-400"
              spellCheck={false}
            />
          </div>
        </div>
      </PremiumGate>
    </ToolLayout>
  );
}
