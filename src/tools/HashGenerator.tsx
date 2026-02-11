import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

async function computeHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface HashResult {
  name: string;
  algorithm: string;
  value: string;
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<HashResult[]>([]);
  const [uppercase, setUppercase] = useState(false);

  async function generate() {
    if (!input) return;
    const algorithms = [
      { name: "SHA-1", algorithm: "SHA-1" },
      { name: "SHA-256", algorithm: "SHA-256" },
      { name: "SHA-384", algorithm: "SHA-384" },
      { name: "SHA-512", algorithm: "SHA-512" },
    ];

    const hashes = await Promise.all(
      algorithms.map(async (a) => ({
        name: a.name,
        algorithm: a.algorithm,
        value: await computeHash(a.algorithm, input),
      }))
    );
    setResults(hashes);
  }

  function formatHash(hash: string) {
    return uppercase ? hash.toUpperCase() : hash;
  }

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text. Free online hash calculator."
      path="/hash-generator"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash…"
          className="code-input h-32 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={generate}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Generate Hashes
        </button>
        <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded"
          />
          Uppercase
        </label>
      </div>

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <div
              key={r.name}
              className="rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-surface-400 dark:text-surface-500">
                  {r.name}
                </span>
                <CopyButton text={formatHash(r.value)} />
              </div>
              <code className="block break-all text-sm text-surface-800 dark:text-surface-200">
                {formatHash(r.value)}
              </code>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
