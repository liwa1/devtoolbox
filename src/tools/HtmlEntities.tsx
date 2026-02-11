import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

function encodeHtml(str: string): string {
  return str.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

function decodeHtml(str: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

export default function HtmlEntities() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  function convert() {
    setOutput(mode === "encode" ? encodeHtml(input) : decodeHtml(input));
  }

  return (
    <ToolLayout
      title="HTML Entity Encoder / Decoder"
      description="Encode and decode HTML entities. Convert special characters to HTML-safe strings."
      path="/html-entities"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setMode("encode")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "encode" ? "bg-primary-600 text-white" : "border border-surface-300 bg-white text-surface-700 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "decode" ? "bg-primary-600 text-white" : "border border-surface-300 bg-white text-surface-700 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"}`}
        >
          Decode
        </button>
        <button onClick={convert} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
          Convert
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? '<div class="hello">' : "&lt;div class=&quot;hello&quot;&gt;"}
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
    </ToolLayout>
  );
}
