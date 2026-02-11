import { useState, useEffect, useRef } from "react";
import ToolLayout from "../components/ToolLayout";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://devtoolbox.app");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return;

    // Use a QR code API to generate the image
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
    };
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&margin=8`;
  }, [text, size]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  }

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text or URLs. Download as PNG. Free online QR code maker."
      path="/qrcode-generator"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
              Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL…"
              className="code-input h-32 w-full rounded-lg border border-surface-200 bg-surface-50 p-3 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              spellCheck={false}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
              Size: {size}px
            </label>
            <input
              type="range"
              min={128}
              max={512}
              step={64}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={download}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Download PNG
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="rounded-xl border border-surface-200 bg-white p-4 shadow-sm dark:border-surface-700 dark:bg-surface-900">
            <canvas ref={canvasRef} width={size} height={size} className="rounded-lg" />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
