import { useState, useMemo } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

interface CrontabField {
  value: string;
  label: string;
  range: string;
}

const PRESETS: { label: string; value: string }[] = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every day at 9am", value: "0 9 * * *" },
  { label: "Every Monday at 9am", value: "0 9 * * 1" },
  { label: "Every 1st of month", value: "0 0 1 * *" },
  { label: "Every weekday at 8am", value: "0 8 * * 1-5" },
];

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression (need 5 fields)";

  const [minute, hour, dom, month, dow] = parts;
  const segments: string[] = [];

  // Minute
  if (minute === "*") segments.push("Every minute");
  else if (minute.startsWith("*/")) segments.push(`Every ${minute.slice(2)} minutes`);
  else segments.push(`At minute ${minute}`);

  // Hour
  if (hour === "*") { /* already covered */ }
  else if (hour.startsWith("*/")) segments.push(`every ${hour.slice(2)} hours`);
  else segments.push(`past hour ${hour}`);

  // Day of month
  if (dom !== "*") {
    if (dom.startsWith("*/")) segments.push(`every ${dom.slice(2)} days`);
    else segments.push(`on day ${dom} of the month`);
  }

  // Month
  if (month !== "*") {
    const names = month.split(",").map((m) => {
      const n = parseInt(m);
      return isNaN(n) ? m : (MONTHS[n] || m);
    });
    segments.push(`in ${names.join(", ")}`);
  }

  // Day of week
  if (dow !== "*") {
    const names = dow.split(",").map((d) => {
      const n = parseInt(d);
      return isNaN(n) ? d : (DAYS[n] || d);
    });
    if (dow === "1-5") segments.push("on weekdays");
    else if (dow === "0,6") segments.push("on weekends");
    else segments.push(`on ${names.join(", ")}`);
  }

  return segments.join(", ");
}

function getNextRuns(expr: string, count: number = 5): string[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const runs: string[] = [];
  const now = new Date();
  const check = new Date(now);
  check.setSeconds(0);
  check.setMilliseconds(0);

  for (let i = 0; i < 525600 && runs.length < count; i++) {
    check.setMinutes(check.getMinutes() + 1);

    const min = check.getMinutes();
    const hr = check.getHours();
    const dom = check.getDate();
    const mon = check.getMonth() + 1;
    const dow = check.getDay();

    if (matchField(parts[0], min, 0, 59) &&
        matchField(parts[1], hr, 0, 23) &&
        matchField(parts[2], dom, 1, 31) &&
        matchField(parts[3], mon, 1, 12) &&
        matchField(parts[4], dow, 0, 6)) {
      runs.push(check.toLocaleString());
    }
  }

  return runs;
}

function matchField(field: string, value: number, _min: number, _max: number): boolean {
  if (field === "*") return true;
  if (field.startsWith("*/")) {
    const step = parseInt(field.slice(2));
    return value % step === 0;
  }
  return field.split(",").some((part) => {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      return value >= a && value <= b;
    }
    return parseInt(part) === value;
  });
}

export default function CronParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const fields: CrontabField[] = useMemo(() => {
    const parts = expr.trim().split(/\s+/);
    return [
      { value: parts[0] || "*", label: "Minute", range: "0-59" },
      { value: parts[1] || "*", label: "Hour", range: "0-23" },
      { value: parts[2] || "*", label: "Day (month)", range: "1-31" },
      { value: parts[3] || "*", label: "Month", range: "1-12" },
      { value: parts[4] || "*", label: "Day (week)", range: "0-6" },
    ];
  }, [expr]);

  const description = describeCron(expr);
  const nextRuns = getNextRuns(expr);

  return (
    <ToolLayout
      title="Cron Expression Parser"
      description="Parse and explain cron expressions. See next execution times. Free online crontab guru."
      path="/cron-parser"
    >
      <PremiumGate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
            Cron Expression
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              placeholder="* * * * *"
              className="code-input flex-1 rounded-lg border border-surface-200 bg-surface-50 p-3 text-lg outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
            <CopyButton text={expr} />
          </div>
        </div>

        {/* Field breakdown */}
        <div className="grid grid-cols-5 gap-2">
          {fields.map((f) => (
            <div key={f.label} className="rounded-lg border border-surface-200 bg-white p-3 text-center dark:border-surface-700 dark:bg-surface-900">
              <code className="text-lg font-bold text-primary-600 dark:text-primary-400">{f.value}</code>
              <p className="mt-1 text-xs font-medium text-surface-600 dark:text-surface-400">{f.label}</p>
              <p className="text-[10px] text-surface-400 dark:text-surface-500">{f.range}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-300">
            📅 {description}
          </p>
        </div>

        {/* Presets */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-surface-700 dark:text-surface-300">Quick Presets</h3>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setExpr(p.value)}
                className="rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs text-surface-600 hover:border-primary-300 hover:text-primary-600 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-primary-600 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Next runs */}
        {nextRuns.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-surface-700 dark:text-surface-300">
              Next {nextRuns.length} Executions
            </h3>
            <div className="space-y-1">
              {nextRuns.map((run, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-surface-50 px-3 py-2 text-sm dark:bg-surface-900">
                  <span className="text-xs font-bold text-surface-400">{i + 1}.</span>
                  <span className="font-mono text-surface-700 dark:text-surface-300">{run}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </PremiumGate>
    </ToolLayout>
  );
}
