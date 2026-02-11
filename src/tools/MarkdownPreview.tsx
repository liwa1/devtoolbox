import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

function simpleMarkdownToHtml(md: string): string {
  let html = md;
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg overflow-auto my-2"><code>$2</code></pre>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 rounded text-sm text-primary-600 dark:text-primary-400">$1</code>');
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
  // Bold & Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 underline" target="_blank" rel="noopener">$1</a>');
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-2" />');
  // Unordered lists
  html = html.replace(/^\- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-2">$&</ul>');
  // Blockquote
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary-400 pl-4 italic text-surface-600 dark:text-surface-400 my-2">$1</blockquote>');
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="my-4 border-surface-200 dark:border-surface-700" />');
  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p class='my-2'>");
  html = `<p class='my-2'>${html}</p>`;

  return html;
}

export default function MarkdownPreview() {
  const [input, setInput] = useState(`# Hello World

This is a **Markdown** preview tool.

## Features
- Real-time preview
- Common Markdown syntax
- \`Inline code\` support

> A nice blockquote here.

---

### Code Block
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

[DevToolbox](https://devtoolbox.app) — Free Developer Tools`);

  const html = simpleMarkdownToHtml(input);

  return (
    <ToolLayout
      title="Markdown Preview"
      description="Write and preview Markdown in real time. Free online Markdown editor and renderer."
      path="/markdown-preview"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Markdown</label>
            <CopyButton text={input} />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="code-input h-[500px] w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Preview</label>
            <CopyButton text={html} />
          </div>
          <div
            className="prose dark:prose-invert h-[500px] overflow-auto rounded-lg border border-surface-200 bg-white p-5 dark:border-surface-700 dark:bg-surface-900"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
