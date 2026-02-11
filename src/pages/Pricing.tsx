import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiZap, FiShield, FiStar } from "react-icons/fi";
import SEO from "../components/SEO";
import { usePremium } from "../contexts/PremiumContext";

const FREE_FEATURES = [
  "16 free developer tools",
  "Dark / Light mode",
  "No sign-up required",
  "100% client-side processing",
  "Mobile responsive",
];

const PRO_FEATURES = [
  "All free tools included",
  "8 exclusive premium tools",
  "No advertisements",
  "Priority support",
  "Early access to new tools",
  "Bulk operations",
  "Export to multiple formats",
  "Custom themes",
];

export default function Pricing() {
  const { isPremium, setPremium } = usePremium();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const monthlyPrice = 4.99;
  const yearlyPrice = 2.99;
  const currentPrice = billingCycle === "monthly" ? monthlyPrice : yearlyPrice;
  const savings = Math.round((1 - yearlyPrice / monthlyPrice) * 100);

  function handlePurchase() {
    // TODO: Integrate with Stripe, Lemon Squeezy, or Gumroad
    // For now, simulate premium activation
    alert(
      "Payment integration coming soon!\n\n" +
      "To integrate payments, choose one of:\n" +
      "• Stripe (stripe.com) — Most popular\n" +
      "• Lemon Squeezy (lemonsqueezy.com) — Easy setup\n" +
      "• Gumroad (gumroad.com) — Simplest\n\n" +
      "For demo purposes, Premium has been activated."
    );
    setPremium(true);
  }

  return (
    <>
      <SEO
        title="Pricing"
        description="DevToolbox Pro — Unlock premium developer tools, remove ads, and get early access to new features."
        path="/pricing"
      />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-5xl">
            Simple, transparent <span className="text-primary-600">pricing</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-surface-500 dark:text-surface-400">
            Start free forever. Upgrade to Pro for premium tools and no ads.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium ${billingCycle === "monthly" ? "text-surface-900 dark:text-white" : "text-surface-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-primary-600" : "bg-surface-300 dark:bg-surface-600"
              }`}
            >
              <div
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  billingCycle === "yearly" ? "translate-x-5.5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${billingCycle === "yearly" ? "text-surface-900 dark:text-white" : "text-surface-400"}`}
            >
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Save {savings}%
              </span>
            )}
          </div>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <div className="rounded-2xl border border-surface-200 bg-white p-8 dark:border-surface-700 dark:bg-surface-900">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">Free</h3>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                Perfect for occasional use
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-surface-900 dark:text-white">$0</span>
                <span className="text-surface-400"> /forever</span>
              </div>
            </div>
            <Link
              to="/"
              className="mb-8 block w-full rounded-lg border border-surface-300 bg-white py-3 text-center text-sm font-semibold text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
              Get Started Free
            </Link>
            <ul className="space-y-3">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-surface-600 dark:text-surface-300">
                  <FiCheck className="text-green-500 shrink-0" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-2xl border-2 border-primary-500 bg-white p-8 shadow-xl dark:border-primary-600 dark:bg-surface-900">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-4 py-1 text-xs font-bold text-white shadow">
                <FiStar size={12} /> MOST POPULAR
              </span>
            </div>
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-surface-900 dark:text-white">
                <FiZap className="text-amber-500" /> Pro
              </h3>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                For power users & professionals
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-surface-900 dark:text-white">
                  ${currentPrice}
                </span>
                <span className="text-surface-400"> /month</span>
              </div>
              {billingCycle === "yearly" && (
                <p className="mt-1 text-xs text-surface-400">
                  Billed ${(yearlyPrice * 12).toFixed(2)}/year
                </p>
              )}
            </div>

            {isPremium ? (
              <div className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg bg-green-100 py-3 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <FiCheck size={16} /> Active
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                className="mb-8 w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all"
              >
                Upgrade to Pro
              </button>
            )}

            <ul className="space-y-3">
              {PRO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-surface-600 dark:text-surface-300">
                  <FiCheck className="text-primary-500 shrink-0" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-surface-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Can I use the free tools forever?",
                a: "Yes! The free tools will always be free. No sign-up required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and Apple Pay via Stripe.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. Cancel anytime with one click. No questions asked.",
              },
              {
                q: "Is my data safe?",
                a: "All processing happens in your browser. We never store or send your data to any server.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-surface-200 bg-white p-5 dark:border-surface-700 dark:bg-surface-900">
                <h3 className="font-semibold text-surface-900 dark:text-white">{q}</h3>
                <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-surface-400 dark:text-surface-500">
          <div className="flex items-center gap-2">
            <FiShield size={16} /> Secure payments via Stripe
          </div>
          <div className="flex items-center gap-2">
            <FiZap size={16} /> Instant access
          </div>
          <div className="flex items-center gap-2">
            <FiCheck size={16} /> 30-day money-back guarantee
          </div>
        </div>
      </div>
    </>
  );
}
