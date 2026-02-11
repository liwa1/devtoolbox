import { useState, useCallback } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateUUID());
    }
    setUuids(list);
  }, [count]);

  function formatUuid(uuid: string): string {
    let result = uuid;
    if (noDashes) result = result.replace(/-/g, "");
    if (uppercase) result = result.toUpperCase();
    return result;
  }

  const allFormatted = uuids.map(formatUuid).join("\n");

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUIDs (v4) in bulk. Free online UUID/GUID generator."
      path="/uuid-generator"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={generate}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Generate
        </button>
        <div className="flex items-center gap-2">
          <label className="text-sm text-surface-600 dark:text-surface-400">Count:</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-20 rounded-lg border border-surface-300 bg-white px-3 py-1.5 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
          <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} className="rounded" />
          No dashes
        </label>
        <CopyButton text={allFormatted} />
      </div>

      <div className="rounded-lg border border-surface-200 bg-surface-50 p-4 dark:border-surface-700 dark:bg-surface-900">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 group">
            <code className="text-sm text-surface-800 dark:text-surface-200 select-all">
              {formatUuid(uuid)}
            </code>
            <CopyButton text={formatUuid(uuid)} className="opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
