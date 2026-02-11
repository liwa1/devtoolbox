import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

function generateWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateSentences(count: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    const wordCount = 8 + Math.floor(Math.random() * 12);
    sentences.push(generateWords(wordCount));
  }
  return sentences.join(" ");
}

function generateParagraphs(count: number): string {
  const paras: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    paras.push(generateSentences(sentenceCount));
  }
  return paras.join("\n\n");
}

type Mode = "paragraphs" | "sentences" | "words";

export default function LoremIpsum() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(() => generateParagraphs(3));

  function generate() {
    switch (mode) {
      case "paragraphs":
        setOutput(generateParagraphs(count));
        break;
      case "sentences":
        setOutput(generateSentences(count));
        break;
      case "words":
        setOutput(generateWords(count));
        break;
    }
  }

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs. Paragraphs, sentences, or words."
      path="/lorem-ipsum"
    >
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          className="w-20 rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
        />
        <button
          onClick={generate}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Generate
        </button>
        <CopyButton text={output} />
      </div>

      <div className="rounded-lg border border-surface-200 bg-white p-5 dark:border-surface-700 dark:bg-surface-900">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-surface-700 dark:text-surface-300">
          {output}
        </p>
      </div>
    </ToolLayout>
  );
}
