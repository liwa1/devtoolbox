import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

function jsonToCsv(json: string): string {
  const data = JSON.parse(json);
  if (!Array.isArray(data) || data.length === 0) throw new Error("JSON must be an array of objects");

  const headers = Object.keys(data[0]);
  const rows = data.map((obj: Record<string, unknown>) =>
    headers.map((h) => {
      const val = obj[h];
      const str = val === null || val === undefined ? "" : String(val);
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    }).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

function csvToJson(csv: string): string {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) throw new Error("CSV must have at least a header and one row");

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const result = lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || "";
    });
    return obj;
  });

  return JSON.stringify(result, null, 2);
}

export default function JsonCsvConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
  const [error, setError] = useState("");

  function convert() {
    try {
      setOutput(mode === "json-to-csv" ? jsonToCsv(input) : csvToJson(input));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function loadSample() {
    if (mode === "json-to-csv") {
      setInput(JSON.stringify([
        { name: "Alice", age: 30, email: "alice@example.com" },
        { name: "Bob", age: 25, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" },
      ], null, 2));
    } else {
      setInput("name,age,email\nAlice,30,alice@example.com\nBob,25,bob@example.com\nCharlie,35,charlie@example.com");
    }
  }

  return (
    <ToolLayout
      title="JSON ↔ CSV Converter"
      description="Convert between JSON and CSV formats. Free online JSON to CSV and CSV to JSON converter."
      path="/json-csv"
    >
      <PremiumGate>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMode("json-to-csv")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "json-to-csv" ? "bg-primary-600 text-white" : "border border-surface-300 bg-white text-surface-700 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"}`}
          >
            JSON → CSV
          </button>
          <button
            onClick={() => setMode("csv-to-json")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "csv-to-json" ? "bg-primary-600 text-white" : "border border-surface-300 bg-white text-surface-700 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"}`}
          >
            CSV → JSON
          </button>
          <button onClick={convert} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            Convert
          </button>
          <button onClick={loadSample} className="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 transition-colors">
            Sample
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            ⚠ {error}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
              {mode === "json-to-csv" ? "JSON Input" : "CSV Input"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "json-to-csv" ? "Paste JSON array…" : "Paste CSV data…"}
              className="code-input h-64 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                {mode === "json-to-csv" ? "CSV Output" : "JSON Output"}
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <textarea
              value={output}
              readOnly
              className="code-input h-64 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-green-400"
              spellCheck={false}
            />
          </div>
        </div>
      </PremiumGate>
    </ToolLayout>
  );
}
