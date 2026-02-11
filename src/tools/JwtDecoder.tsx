import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

function decodeJwtPart(part: string): string {
  try {
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(padded);
    const parsed = JSON.parse(decoded);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return "Invalid JWT part";
  }
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");

  const parts = input.trim().split(".");
  const isValid = parts.length === 3 && input.trim().length > 10;

  const header = isValid ? decodeJwtPart(parts[0]) : "";
  const payload = isValid ? decodeJwtPart(parts[1]) : "";
  const signature = isValid ? parts[2] : "";

  let expInfo = "";
  if (isValid) {
    try {
      const p = JSON.parse(payload);
      if (p.exp) {
        const expDate = new Date(p.exp * 1000);
        const now = new Date();
        expInfo = expDate > now
          ? `Expires: ${expDate.toLocaleString()} (valid)`
          : `Expired: ${expDate.toLocaleString()} (expired)`;
      }
    } catch { /* ignore */ }
  }

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens. View header, payload and expiration. Free online JWT debugger."
      path="/jwt-decoder"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
          Paste JWT Token
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          className="code-input h-28 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          spellCheck={false}
        />
      </div>

      {expInfo && (
        <div className={`rounded-lg border p-3 text-sm ${expInfo.includes("valid") ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400" : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"}`}>
          {expInfo}
        </div>
      )}

      {isValid && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-red-500">Header</label>
              <CopyButton text={header} />
            </div>
            <pre className="overflow-auto rounded-lg border border-surface-200 bg-surface-50 p-3 text-sm text-surface-800 dark:border-surface-700 dark:bg-surface-900 dark:text-red-400">
              {header}
            </pre>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-purple-500">Payload</label>
              <CopyButton text={payload} />
            </div>
            <pre className="overflow-auto rounded-lg border border-surface-200 bg-surface-50 p-3 text-sm text-surface-800 dark:border-surface-700 dark:bg-surface-900 dark:text-purple-400">
              {payload}
            </pre>
          </div>
          <div className="lg:col-span-2">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-cyan-500">Signature</label>
              <CopyButton text={signature} />
            </div>
            <code className="block break-all rounded-lg border border-surface-200 bg-surface-50 p-3 text-sm text-surface-600 dark:border-surface-700 dark:bg-surface-900 dark:text-cyan-400">
              {signature}
            </code>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
