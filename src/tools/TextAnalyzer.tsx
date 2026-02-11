import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

function countStats(text: string) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter((s) => s.trim()).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  const speakingTime = Math.max(1, Math.ceil(words / 130));

  // Frequency analysis
  const freq: Record<string, number> = {};
  const wordsArray = text.toLowerCase().match(/\b[a-zA-ZÀ-ÿ]+\b/g) || [];
  for (const w of wordsArray) {
    freq[w] = (freq[w] || 0) + 1;
  }
  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingTime, speakingTime, topWords };
}

export default function TextAnalyzer() {
  const [text, setText] = useState("");
  const stats = countStats(text);

  return (
    <ToolLayout
      title="Text Analyzer"
      description="Analyze text: word count, character count, reading time, word frequency, and more."
      path="/text-analyzer"
    >
      <PremiumGate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
            Enter or paste text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here to analyze…"
            className="code-input h-48 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Characters", stats.chars],
            ["No spaces", stats.charsNoSpaces],
            ["Words", stats.words],
            ["Sentences", stats.sentences],
            ["Paragraphs", stats.paragraphs],
            ["Lines", stats.lines],
            ["Read time", `${stats.readingTime} min`],
            ["Speak time", `${stats.speakingTime} min`],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="rounded-lg border border-surface-200 bg-white p-3 text-center dark:border-surface-700 dark:bg-surface-900"
            >
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{value}</p>
              <p className="text-xs text-surface-500 dark:text-surface-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Top words */}
        {stats.topWords.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-300">
              Top Words
            </h3>
            <div className="flex flex-wrap gap-2">
              {stats.topWords.map(([word, count]) => (
                <span
                  key={word}
                  className="rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-sm dark:border-surface-700 dark:bg-surface-900"
                >
                  <span className="font-medium text-surface-800 dark:text-surface-200">{word}</span>
                  <span className="ml-1.5 text-xs text-surface-400">×{count}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {text && (
          <CopyButton
            text={`Characters: ${stats.chars}\nWords: ${stats.words}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nReading time: ${stats.readingTime} min`}
          />
        )}
      </PremiumGate>
    </ToolLayout>
  );
}
