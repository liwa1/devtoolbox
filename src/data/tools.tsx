import type { ReactNode } from "react";
import {
  FiCode,
  FiHash,
  FiLink,
  FiKey,
  FiClock,
  FiLock,
  FiType,
  FiFileText,
  FiCopy,
  FiGrid,
  FiDroplet,
  FiTerminal,
  FiImage,
  FiShield,
  FiAlignLeft,
  FiDatabase,
  FiActivity,
  FiRepeat,
  FiColumns,
  FiGlobe,
  FiLayers,
  FiCalendar,
  FiServer,
} from "react-icons/fi";

export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: ReactNode;
  category: ToolCategory;
  keywords: string[];
  premium?: boolean;
}

export type ToolCategory =
  | "Encoders / Decoders"
  | "Generators"
  | "Formatters"
  | "Converters"
  | "Text"
  | "Web";

export const categories: ToolCategory[] = [
  "Encoders / Decoders",
  "Generators",
  "Formatters",
  "Converters",
  "Text",
  "Web",
];

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate and minify JSON data with syntax highlighting",
    path: "/json-formatter",
    icon: FiCode({ size: 22 }),
    category: "Formatters",
    keywords: ["json", "format", "validate", "beautify", "minify", "parse"],
  },
  {
    id: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings instantly",
    path: "/base64",
    icon: FiCopy({ size: 22 }),
    category: "Encoders / Decoders",
    keywords: ["base64", "encode", "decode", "binary", "string"],
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode and decode URL components",
    path: "/url-encoder",
    icon: FiLink({ size: 22 }),
    category: "Encoders / Decoders",
    keywords: ["url", "encode", "decode", "percent", "uri", "component"],
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes",
    path: "/hash-generator",
    icon: FiHash({ size: 22 }),
    category: "Generators",
    keywords: ["hash", "md5", "sha", "sha256", "sha512", "checksum", "digest"],
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) in bulk",
    path: "/uuid-generator",
    icon: FiGrid({ size: 22 }),
    category: "Generators",
    keywords: ["uuid", "guid", "unique", "id", "random", "v4"],
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs",
    path: "/lorem-ipsum",
    icon: FiAlignLeft({ size: 22 }),
    category: "Generators",
    keywords: ["lorem", "ipsum", "placeholder", "text", "dummy", "filler"],
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Convert colors between HEX, RGB, and HSL formats",
    path: "/color-converter",
    icon: FiDroplet({ size: 22 }),
    category: "Converters",
    keywords: ["color", "hex", "rgb", "hsl", "converter", "palette", "picker"],
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions in real time",
    path: "/regex-tester",
    icon: FiTerminal({ size: 22 }),
    category: "Text",
    keywords: ["regex", "regexp", "regular", "expression", "test", "match", "pattern"],
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens",
    path: "/jwt-decoder",
    icon: FiShield({ size: 22 }),
    category: "Encoders / Decoders",
    keywords: ["jwt", "json", "web", "token", "decode", "header", "payload"],
  },
  {
    id: "markdown-preview",
    name: "Markdown Preview",
    description: "Write and preview Markdown in real time",
    path: "/markdown-preview",
    icon: FiFileText({ size: 22 }),
    category: "Formatters",
    keywords: ["markdown", "md", "preview", "render", "editor", "github"],
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    path: "/timestamp-converter",
    icon: FiClock({ size: 22 }),
    category: "Converters",
    keywords: ["timestamp", "unix", "epoch", "date", "time", "convert"],
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, customizable passwords",
    path: "/password-generator",
    icon: FiLock({ size: 22 }),
    category: "Generators",
    keywords: ["password", "generate", "strong", "secure", "random"],
  },
  {
    id: "html-entities",
    name: "HTML Entity Encoder",
    description: "Encode and decode HTML entities",
    path: "/html-entities",
    icon: FiType({ size: 22 }),
    category: "Encoders / Decoders",
    keywords: ["html", "entity", "encode", "decode", "amp", "special", "characters"],
  },
  {
    id: "css-minifier",
    name: "CSS Minifier",
    description: "Minify and beautify CSS code",
    path: "/css-minifier",
    icon: FiCode({ size: 22 }),
    category: "Formatters",
    keywords: ["css", "minify", "beautify", "compress", "format", "style"],
  },
  {
    id: "qrcode-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    path: "/qrcode-generator",
    icon: FiImage({ size: 22 }),
    category: "Web",
    keywords: ["qr", "qrcode", "barcode", "scan", "generate", "url"],
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    path: "/sql-formatter",
    icon: FiKey({ size: 22 }),
    category: "Formatters",
    keywords: ["sql", "format", "query", "beautify", "database"],
  },
  // ── Premium Tools ──
  {
    id: "number-base-converter",
    name: "Number Base Converter",
    description: "Convert text to binary, hex, octal and between number bases",
    path: "/number-base-converter",
    icon: FiDatabase({ size: 22 }),
    category: "Converters",
    keywords: ["binary", "hex", "octal", "decimal", "base", "number", "convert"],
    premium: true,
  },
  {
    id: "text-analyzer",
    name: "Text Analyzer",
    description: "Word count, reading time, word frequency analysis",
    path: "/text-analyzer",
    icon: FiActivity({ size: 22 }),
    category: "Text",
    keywords: ["word", "count", "character", "reading", "time", "frequency", "analyze"],
    premium: true,
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert between camelCase, snake_case, PascalCase and more",
    path: "/case-converter",
    icon: FiRepeat({ size: 22 }),
    category: "Text",
    keywords: ["case", "camel", "snake", "pascal", "kebab", "upper", "lower", "convert"],
    premium: true,
  },
  {
    id: "text-diff",
    name: "Text Diff Checker",
    description: "Compare two texts and see differences highlighted",
    path: "/text-diff",
    icon: FiColumns({ size: 22 }),
    category: "Text",
    keywords: ["diff", "compare", "difference", "text", "merge", "change"],
    premium: true,
  },
  {
    id: "json-csv",
    name: "JSON ↔ CSV Converter",
    description: "Convert between JSON and CSV formats",
    path: "/json-csv",
    icon: FiLayers({ size: 22 }),
    category: "Converters",
    keywords: ["json", "csv", "convert", "export", "import", "table", "data"],
    premium: true,
  },
  {
    id: "cron-parser",
    name: "Cron Expression Parser",
    description: "Parse cron expressions and see next execution times",
    path: "/cron-parser",
    icon: FiCalendar({ size: 22 }),
    category: "Web",
    keywords: ["cron", "crontab", "schedule", "timer", "expression", "parse"],
    premium: true,
  },
  {
    id: "json-yaml",
    name: "JSON ↔ YAML Converter",
    description: "Convert between JSON and YAML formats",
    path: "/json-yaml",
    icon: FiServer({ size: 22 }),
    category: "Converters",
    keywords: ["json", "yaml", "yml", "convert", "kubernetes", "config"],
    premium: true,
  },
  {
    id: "my-info",
    name: "My IP & Browser Info",
    description: "See your public IP, browser info, screen size and device details",
    path: "/my-info",
    icon: FiGlobe({ size: 22 }),
    category: "Web",
    keywords: ["ip", "browser", "info", "user", "agent", "screen", "device", "timezone"],
    premium: true,
  },
];

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return tools;
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q))
  );
}
