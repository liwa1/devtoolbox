import { useState, useMemo } from "react";
import ToolLayout from "../components/ToolLayout";

interface Match {
  full: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const found: Match[] = [];

      if (flags.includes("g")) {
        let m: RegExpExecArray | null;
        let safety = 0;
        while ((m = regex.exec(testString)) !== null && safety < 1000) {
          found.push({
            full: m[0],
            index: m.index,
            groups: m.slice(1),
          });
          if (m[0].length === 0) regex.lastIndex++;
          safety++;
        }
      } else {
        const m = regex.exec(testString);
        if (m) {
          found.push({ full: m[0], index: m.index, groups: m.slice(1) });
        }
      }
      return { matches: found, error: "" };
    } catch (e) {
      return { matches: [], error: (e as Error).message };
    }
  }, [pattern, flags, testString]);

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and debug regular expressions in real time. See matches, groups and indices."
      path="/regex-tester"
    >
      {/* Pattern */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
            Pattern
          </label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern…"
            className="code-input w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            spellCheck={false}
          />
        </div>
        <div className="w-28">
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
            Flags
          </label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gi"
            className="code-input w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          ⚠ {error}
        </div>
      )}

      {/* Test String */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter test string…"
          className="code-input h-40 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          spellCheck={false}
        />
      </div>

      {/* Matches */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-surface-700 dark:text-surface-300">
          Matches ({matches.length})
        </h3>
        {matches.length > 0 ? (
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div
                key={i}
                className="rounded-lg border border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-400">
                    #{i + 1}
                  </span>
                  <code className="text-surface-800 dark:text-surface-200">"{m.full}"</code>
                  <span className="text-xs text-surface-400">index: {m.index}</span>
                </div>
                {m.groups.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.groups.map((g, gi) => (
                      <span
                        key={gi}
                        className="rounded bg-surface-100 px-2 py-0.5 text-xs text-surface-600 dark:bg-surface-800 dark:text-surface-400"
                      >
                        Group {gi + 1}: "{g}"
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          pattern && testString && (
            <p className="text-sm text-surface-500 dark:text-surface-400">No matches found.</p>
          )
        )}
      </div>
    </ToolLayout>
  );
}
