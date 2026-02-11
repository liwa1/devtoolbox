import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

// SQL keywords
const KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "AND", "OR", "INSERT", "INTO", "VALUES",
  "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "INDEX",
  "JOIN", "INNER", "LEFT", "RIGHT", "OUTER", "ON", "AS", "IN", "NOT",
  "NULL", "IS", "BETWEEN", "LIKE", "ORDER", "BY", "GROUP", "HAVING",
  "LIMIT", "OFFSET", "UNION", "ALL", "EXISTS", "CASE", "WHEN", "THEN",
  "ELSE", "END", "ASC", "DESC", "DISTINCT", "COUNT", "SUM", "AVG",
  "MIN", "MAX", "WITH", "RECURSIVE", "IF", "BEGIN", "COMMIT", "ROLLBACK",
]);

const MAJOR_KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "OUTER",
  "ON", "ORDER", "GROUP", "HAVING", "LIMIT", "UNION", "INSERT", "INTO",
  "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "ALTER", "DROP", "AND",
  "OR", "WITH",
]);

function formatSQL(sql: string): string {
  // Normalize whitespace
  let s = sql.replace(/\s+/g, " ").trim();

  // Tokenize (very simple)
  const tokens = s.split(/(\s+|,|\(|\))/).filter((t) => t.trim());

  let result = "";
  let indent = 0;
  let newLine = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const upper = token.toUpperCase();

    if (upper === "(") {
      indent++;
      result += " (\n" + "  ".repeat(indent);
      newLine = true;
      continue;
    }
    if (upper === ")") {
      indent = Math.max(0, indent - 1);
      result += "\n" + "  ".repeat(indent) + ")";
      continue;
    }
    if (upper === ",") {
      result += ",\n" + "  ".repeat(indent);
      newLine = true;
      continue;
    }

    if (MAJOR_KEYWORDS.has(upper) && !newLine) {
      result += "\n" + "  ".repeat(Math.max(0, indent)) + (KEYWORDS.has(upper) ? upper : token);
    } else {
      if (!newLine && result.length > 0) result += " ";
      result += KEYWORDS.has(upper) ? upper : token;
    }
    newLine = false;
  }

  return result.trim();
}

function minifySQL(sql: string): string {
  return sql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format and beautify SQL queries. Free online SQL beautifier and minifier."
      path="/sql-formatter"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setOutput(formatSQL(input))}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Format
        </button>
        <button
          onClick={() => setOutput(minifySQL(input))}
          className="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 transition-colors"
        >
          Minify
        </button>
        <button
          onClick={() => setInput("SELECT u.id, u.name, u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.total > 100 AND u.active = 1 ORDER BY o.total DESC LIMIT 50")}
          className="rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 transition-colors"
        >
          Sample
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL query here…"
            className="code-input h-72 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
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
            className="code-input h-72 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none dark:border-surface-700 dark:bg-surface-900 dark:text-green-400"
            spellCheck={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
