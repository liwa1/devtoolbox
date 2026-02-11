import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  loading: boolean;
  setPremium: (value: boolean, sessionId?: string) => void;
  showPaywall: () => void;
  paywallVisible: boolean;
  closePaywall: () => void;
}

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  loading: true,
  setPremium: () => {},
  showPaywall: () => {},
  paywallVisible: false,
  closePaywall: () => {},
});

export function usePremium() {
  return useContext(PremiumContext);
}

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paywallVisible, setPaywallVisible] = useState(false);

  // On mount, verify the stored session with Stripe
  const verifyPremium = useCallback(async () => {
    const sessionId = localStorage.getItem("devtoolbox_session_id");

    if (!sessionId) {
      // No session stored → not premium
      localStorage.removeItem("devtoolbox_premium");
      setIsPremium(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const data = await res.json();

      if (data.success) {
        setIsPremium(true);
        localStorage.setItem("devtoolbox_premium", "true");
      } else {
        // Payment no longer valid
        setIsPremium(false);
        localStorage.removeItem("devtoolbox_premium");
        localStorage.removeItem("devtoolbox_session_id");
      }
    } catch {
      // Network error — use cached value as fallback
      const cached = localStorage.getItem("devtoolbox_premium") === "true";
      setIsPremium(cached);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    verifyPremium();
  }, [verifyPremium]);

  function setPremium(value: boolean, sessionId?: string) {
    setIsPremium(value);
    if (value && sessionId) {
      localStorage.setItem("devtoolbox_premium", "true");
      localStorage.setItem("devtoolbox_session_id", sessionId);
    } else if (!value) {
      localStorage.removeItem("devtoolbox_premium");
      localStorage.removeItem("devtoolbox_session_id");
    }
  }

  function showPaywall() {
    setPaywallVisible(true);
  }

  function closePaywall() {
    setPaywallVisible(false);
  }

  return (
    <PremiumContext.Provider value={{ isPremium, loading, setPremium, showPaywall, paywallVisible, closePaywall }}>
      {children}
    </PremiumContext.Provider>
  );
}
