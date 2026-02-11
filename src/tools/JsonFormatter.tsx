import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function handleSample() {
    const sample = JSON.stringify(
      {
        name: "DevToolbox",
        version: "1.0.0",
        features: ["JSON Formatter", "Base64", "Hash Generator"],
        config: { theme: "dark", lang: "en" },
      },
      null,
      0
    );
    setInput(sample);
  }

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate and minify JSON data with syntax highlighting. Free online JSON beautifier."
      path="/json-formatter"
    >
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={format}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          Minify
        </button>
        <button
          onClick={handleSample}
          className="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700 transition-colors"
        >
          Sample
        </button>
        <select
          value={indentSize}
          onChange={(e) => setIndentSize(Number(e.target.value))}
          className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={1}>Tab</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          ⚠ {error}
        </div>
      )}

      {/* Editor */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here…"
            className="code-input h-80 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
              Output
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here…"
            className="code-input h-80 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-green-400"
            spellCheck={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
