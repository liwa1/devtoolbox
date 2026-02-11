import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { usePremium } from "../contexts/PremiumContext";

interface PremiumBadgeProps {
  className?: string;
}

export function PremiumBadge({ className = "" }: PremiumBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ${className}`}
    >
      PRO
    </span>
  );
}

export function PremiumGate({ children }: { children: React.ReactNode }) {
  const { isPremium } = usePremium();

  if (isPremium) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-surface-900/80">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          <FiLock size={28} />
        </div>
        <h3 className="text-lg font-bold text-surface-900 dark:text-white">Premium Tool</h3>
        <p className="max-w-xs text-center text-sm text-surface-500 dark:text-surface-400">
          Unlock this tool and all premium features with DevToolbox Pro.
        </p>
        <Link
          to="/pricing"
          className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
        >
          Upgrade to Pro
        </Link>
      </div>
    </div>
  );
}

export function PaywallModal() {
  const { paywallVisible, closePaywall } = usePremium();

  if (!paywallVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closePaywall}>
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-surface-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <FiLock size={28} />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Unlock Premium</h2>
          <p className="mt-2 text-surface-500 dark:text-surface-400">
            Get access to all premium tools and features.
          </p>
          <Link
            to="/pricing"
            onClick={closePaywall}
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            View Pricing
          </Link>
          <button
            onClick={closePaywall}
            className="mt-3 block w-full text-sm text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
