import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  setPremium: (value: boolean) => void;
  showPaywall: () => void;
  paywallVisible: boolean;
  closePaywall: () => void;
}

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  setPremium: () => {},
  showPaywall: () => {},
  paywallVisible: false,
  closePaywall: () => {},
});

export function usePremium() {
  return useContext(PremiumContext);
}

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem("devtoolbox_premium") === "true";
  });
  const [paywallVisible, setPaywallVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("devtoolbox_premium", isPremium.toString());
  }, [isPremium]);

  function setPremium(value: boolean) {
    setIsPremium(value);
  }

  function showPaywall() {
    setPaywallVisible(true);
  }

  function closePaywall() {
    setPaywallVisible(false);
  }

  return (
    <PremiumContext.Provider value={{ isPremium, setPremium, showPaywall, paywallVisible, closePaywall }}>
      {children}
    </PremiumContext.Provider>
  );
}
