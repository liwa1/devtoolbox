import { useEffect, useRef } from "react";

/**
 * Google AdSense ad unit component.
 * Replace the data-ad-client and data-ad-slot with your own values from
 * https://www.google.com/adsense/
 * 
 * Steps to activate:
 * 1. Create an AdSense account at https://www.google.com/adsense/
 * 2. Add your site and get approved
 * 3. Replace "ca-pub-XXXXXXXXXXXXXXXX" with your publisher ID
 * 4. Create ad units and replace "XXXXXXXXXX" with your slot IDs
 * 5. Add the AdSense script in index.html (already done)
 */

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded (blocked by ad blocker or not configured)
    }
  }, []);

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Carbon Ads — Developer-friendly, ethical ads.
 * Apply at https://www.carbonads.net/
 * 
 * Steps:
 * 1. Apply at carbonads.net
 * 2. Get accepted (need ~10k monthly pageviews)
 * 3. Replace the serve URL and placement ID below
 */
export function CarbonAd({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "//cdn.carbonads.com/carbon.js?serve=XXXXXXX&placement=devtoolboxapp";
    script.id = "_carbonads_js";
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className={`carbon-ad-wrapper ${className}`} />;
}

/**
 * Inline ad placeholder — shows when ads are not yet configured.
 * Replace with real AdBanner or CarbonAd once you have accounts.
 */
export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border-2 border-dashed border-surface-200 bg-surface-50 p-4 text-center dark:border-surface-700 dark:bg-surface-900/50 ${className}`}
    >
      <p className="text-xs text-surface-400 dark:text-surface-500">
        📢 Ad Space — <a href="https://www.google.com/adsense/" target="_blank" rel="noopener" className="underline hover:text-primary-500">Configure AdSense</a> or{" "}
        <a href="https://www.carbonads.net/" target="_blank" rel="noopener" className="underline hover:text-primary-500">Carbon Ads</a>
      </p>
    </div>
  );
}
