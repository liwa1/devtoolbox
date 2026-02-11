import { useState, useMemo } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

function jsonToYaml(obj: unknown, indent: number = 0): string {
  const prefix = "  ".repeat(indent);
  if (obj === null || obj === undefined) return "null";
  if (typeof obj === "boolean") return obj ? "true" : "false";
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj.includes("\n") || obj.includes(":") || obj.includes("#") || obj.includes("'") || obj.includes('"') || obj === "" || obj === "true" || obj === "false" || obj === "null") {
      return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => {
      const value = jsonToYaml(item, indent + 1);
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        const lines = value.split("\n");
        return `${prefix}- ${lines[0]}\n${lines.slice(1).map((l) => `${prefix}  ${l}`).join("\n")}`;
      }
      return `${prefix}- ${value}`;
    }).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries.map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `${prefix}${key}:\n${jsonToYaml(value, indent + 1)}`;
      }
      return `${prefix}${key}: ${jsonToYaml(value, indent + 1)}`;
    }).join("\n");
  }
  return String(obj);
}

function simpleYamlToJson(yaml: string): string {
  // Very basic YAML to JSON for common cases
  // For production, use a proper YAML library
  const lines = yaml.split("\n");
  const result: Record<string, unknown> = {};
  let currentKey = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx > 0) {
      const key = trimmed.slice(0, colonIdx).trim();
      const value = trimmed.slice(colonIdx + 1).trim();

      if (value) {
        // Parse value
        if (value === "true") result[key] = true;
        else if (value === "false") result[key] = false;
        else if (value === "null") result[key] = null;
        else if (!isNaN(Number(value))) result[key] = Number(value);
        else if (value.startsWith('"') && value.endsWith('"')) result[key] = value.slice(1, -1);
        else if (value.startsWith("'") && value.endsWith("'")) result[key] = value.slice(1, -1);
        else result[key] = value;
      } else {
        currentKey = key;
        result[currentKey] = {};
      }
    }
  }

  return JSON.stringify(result, null, 2);
}

export default function JsonYamlConverter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
  const [error, setError] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      if (mode === "json-to-yaml") {
        const parsed = JSON.parse(input);
        setError("");
        return jsonToYaml(parsed);
      } else {
        setError("");
        return simpleYamlToJson(input);
      }
    } catch (e) {
      setError((e as Error).message);
      return "";
    }
  }, [input, mode]);

  function loadSample() {
    if (mode === "json-to-yaml") {
      setInput(JSON.stringify({
        apiVersion: "v1",
        metadata: { name: "my-app", labels: { env: "production", tier: "frontend" } },
        spec: { replicas: 3, containers: [{ name: "web", image: "nginx:latest", ports: [{ containerPort: 80 }] }] },
      }, null, 2));
    } else {
      setInput(`apiVersion: v1
metadata:
  name: my-app
  labels:
    env: production
    tier: frontend
spec:
  replicas: 3`);
    }
  }

  return (
    <ToolLayout
      title="JSON ↔ YAML Converter"
      description="Convert between JSON and YAML formats. Free online JSON to YAML and YAML to JSON converter."
      path="/json-yaml"
    >
      <PremiumGate>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMode("json-to-yaml")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "json-to-yaml" ? "bg-primary-600 text-white" : "border border-surface-300 bg-white text-surface-700 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"}`}
          >
            JSON → YAML
          </button>
          <button
            onClick={() => setMode("yaml-to-json")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "yaml-to-json" ? "bg-primary-600 text-white" : "border border-surface-300 bg-white text-surface-700 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"}`}
          >
            YAML → JSON
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
              {mode === "json-to-yaml" ? "JSON" : "YAML"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="code-input h-72 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                {mode === "json-to-yaml" ? "YAML" : "JSON"}
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <textarea
              value={output}
              readOnly
              className="code-input h-72 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-green-400"
              spellCheck={false}
            />
          </div>
        </div>
      </PremiumGate>
    </ToolLayout>
  );
}
