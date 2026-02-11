import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function beautifyCSS(css: string): string {
  let result = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();

  let indent = 0;
  let output = "";

  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (char === "{") {
      indent++;
      output += " {\n" + "  ".repeat(indent);
    } else if (char === "}") {
      indent--;
      output = output.trimEnd();
      output += "\n" + "  ".repeat(indent) + "}\n" + "  ".repeat(indent);
    } else if (char === ";") {
      output += ";\n" + "  ".repeat(indent);
    } else if (char === ":" && result[i + 1] !== ":") {
      output += ": ";
      // Skip spaces after colon
      while (result[i + 1] === " ") i++;
    } else {
      output += char;
    }
  }

  return output.trim();
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout
      title="CSS Minifier / Beautifier"
      description="Minify and beautify CSS code. Remove comments, whitespace and format CSS. Free online CSS compressor."
      path="/css-minifier"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setOutput(minifyCSS(input))}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Minify
        </button>
        <button
          onClick={() => setOutput(beautifyCSS(input))}
          className="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 transition-colors"
        >
          Beautify
        </button>
        {input && (
          <span className="text-xs text-surface-400 dark:text-surface-500">
            Input: {input.length} chars → Output: {output.length} chars
            {output.length > 0 && input.length > 0 && (
              <> ({Math.round((1 - output.length / input.length) * 100)}% reduction)</>
            )}
          </span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Input CSS</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSS here…"
            className="code-input h-80 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
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
            className="code-input h-80 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-green-400"
            spellCheck={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
