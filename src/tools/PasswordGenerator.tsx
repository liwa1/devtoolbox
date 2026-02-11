import { useState, useCallback } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

const CHARS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, options: Record<string, boolean>): string {
  let charset = "";
  if (options.lowercase) charset += CHARS.lowercase;
  if (options.uppercase) charset += CHARS.uppercase;
  if (options.numbers) charset += CHARS.numbers;
  if (options.symbols) charset += CHARS.symbols;
  if (!charset) charset = CHARS.lowercase + CHARS.uppercase + CHARS.numbers;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

function getStrength(pw: string): { label: string; color: string; percent: number } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;

  if (score <= 2) return { label: "Weak", color: "bg-red-500", percent: 25 };
  if (score <= 3) return { label: "Fair", color: "bg-yellow-500", percent: 50 };
  if (score <= 4) return { label: "Strong", color: "bg-blue-500", percent: 75 };
  return { label: "Very Strong", color: "bg-green-500", percent: 100 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() => generatePassword(16, { lowercase: true, uppercase: true, numbers: true, symbols: true }));

  const generate = useCallback(() => {
    setPassword(generatePassword(length, options));
  }, [length, options]);

  const strength = getStrength(password);

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, customizable passwords. Cryptographically secure random password generator."
      path="/password-generator"
    >
      {/* Password display */}
      <div className="rounded-lg border border-surface-200 bg-surface-50 p-4 dark:border-surface-700 dark:bg-surface-900">
        <div className="flex items-center justify-between gap-3">
          <code className="flex-1 break-all text-lg font-semibold text-surface-900 dark:text-white select-all">
            {password}
          </code>
          <CopyButton text={password} />
        </div>
        {/* Strength bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-surface-500 dark:text-surface-400">Strength</span>
            <span className="font-medium text-surface-700 dark:text-surface-300">{strength.label}</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-surface-200 dark:bg-surface-700">
            <div
              className={`h-2 rounded-full ${strength.color} transition-all`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
              Length: {length}
            </label>
          </div>
          <input
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-300">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="rounded"
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Generate New Password
        </button>
      </div>
    </ToolLayout>
  );
}
