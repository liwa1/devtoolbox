import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { CopyButton } from "../components/CopyButton";
import { PremiumGate } from "../components/Premium";

function getIpInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages.join(", "),
    platform: navigator.platform,
    cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
    doNotTrack: navigator.doNotTrack || "Not set",
    online: navigator.onLine ? "Yes" : "No",
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenColorDepth: screen.colorDepth,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: `UTC${new Date().getTimezoneOffset() > 0 ? "-" : "+"}${Math.abs(new Date().getTimezoneOffset() / 60)}`,
    touchSupport: "ontouchstart" in window ? "Yes" : "No",
    hardwareConcurrency: navigator.hardwareConcurrency || "N/A",
    maxMemory: (navigator as unknown as Record<string, unknown>).deviceMemory || "N/A",
    connectionType: (navigator as unknown as Record<string, { effectiveType?: string }>).connection?.effectiveType || "N/A",
  };
}

export default function WhatIsMyInfo() {
  const [info] = useState(getIpInfo);
  const [publicIp, setPublicIp] = useState("Loading…");
  const [ipLoaded, setIpLoaded] = useState(false);

  if (!ipLoaded) {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((data) => { setPublicIp(data.ip); setIpLoaded(true); })
      .catch(() => { setPublicIp("Unable to detect"); setIpLoaded(true); });
  }

  const allInfo = { publicIp, ...info };
  const infoText = Object.entries(allInfo)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const entries: [string, string | number | boolean][] = [
    ["Public IP", publicIp],
    ["User Agent", info.userAgent],
    ["Language", info.language],
    ["All Languages", info.languages],
    ["Platform", info.platform],
    ["Cookies", info.cookiesEnabled],
    ["Do Not Track", String(info.doNotTrack)],
    ["Online", info.online],
    ["Screen", `${info.screenWidth} × ${info.screenHeight}`],
    ["Color Depth", `${info.screenColorDepth}-bit`],
    ["Window", `${info.windowWidth} × ${info.windowHeight}`],
    ["Pixel Ratio", `${info.devicePixelRatio}x`],
    ["Timezone", info.timezone],
    ["UTC Offset", info.timezoneOffset],
    ["Touch", info.touchSupport],
    ["CPU Cores", String(info.hardwareConcurrency)],
    ["Memory", `${info.maxMemory} GB`],
    ["Connection", String(info.connectionType)],
  ];

  return (
    <ToolLayout
      title="What Is My IP & Browser Info"
      description="See your public IP address, browser info, screen resolution, timezone, and device info."
      path="/my-info"
    >
      <PremiumGate>
        <div className="flex items-center gap-3">
          <CopyButton text={infoText} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {entries.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-surface-200 bg-white px-4 py-3 dark:border-surface-700 dark:bg-surface-900"
            >
              <span className="text-sm font-medium text-surface-500 dark:text-surface-400">{label}</span>
              <span className="max-w-[60%] truncate text-right text-sm font-mono text-surface-800 dark:text-surface-200">
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      </PremiumGate>
    </ToolLayout>
  );
}
