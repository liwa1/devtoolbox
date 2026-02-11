import { useState, useEffect } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateStr, setDateStr] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ts = Number(timestamp);
    if (!isNaN(ts) && timestamp.trim()) {
      // Auto-detect seconds vs milliseconds
      const ms = ts > 1e12 ? ts : ts * 1000;
      const date = new Date(ms);
      if (!isNaN(date.getTime())) {
        setDateStr(date.toISOString());
      } else {
        setDateStr("Invalid timestamp");
      }
    }
  }, [timestamp]);

  function handleDateChange(value: string) {
    setDateStr(value);
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    }
  }

  function setNowTimestamp() {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(ts.toString());
  }

  const currentDate = new Date(now);
  const currentUnix = Math.floor(now / 1000);

  const ts = Number(timestamp);
  const parsed = !isNaN(ts)
    ? new Date(ts > 1e12 ? ts : ts * 1000)
    : null;

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds."
      path="/timestamp-converter"
    >
      {/* Live clock */}
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
        <p className="text-sm font-medium text-primary-700 dark:text-primary-400">
          Current time: <span className="font-mono">{currentDate.toISOString()}</span>
        </p>
        <p className="text-sm text-primary-600 dark:text-primary-500">
          Unix: <span className="font-mono">{currentUnix}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Unix Timestamp</label>
            <CopyButton text={timestamp} />
          </div>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1700000000"
            className="code-input w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          />
          <button
            onClick={setNowTimestamp}
            className="mt-2 rounded-lg border border-surface-300 bg-white px-3 py-1.5 text-xs font-medium text-surface-600 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 transition-colors"
          >
            Use current time
          </button>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">ISO 8601 / Date</label>
            <CopyButton text={dateStr} />
          </div>
          <input
            type="text"
            value={dateStr}
            onChange={(e) => handleDateChange(e.target.value)}
            placeholder="2024-01-01T00:00:00.000Z"
            className="code-input w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          />
        </div>
      </div>

      {parsed && !isNaN(parsed.getTime()) && (
        <div className="rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
          <h3 className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-300">Parsed Details</h3>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            {[
              ["Local", parsed.toLocaleString()],
              ["UTC", parsed.toUTCString()],
              ["ISO 8601", parsed.toISOString()],
              ["Unix (s)", Math.floor(parsed.getTime() / 1000).toString()],
              ["Unix (ms)", parsed.getTime().toString()],
              ["Day of week", parsed.toLocaleDateString("en", { weekday: "long" })],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-2 rounded-lg bg-surface-50 p-2 dark:bg-surface-800">
                <span className="text-surface-500 dark:text-surface-400">{label}</span>
                <span className="font-mono text-surface-800 dark:text-surface-200">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
