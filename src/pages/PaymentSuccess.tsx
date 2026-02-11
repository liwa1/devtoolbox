import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import SEO from "../components/SEO";
import { usePremium } from "../contexts/PremiumContext";

type Status = "loading" | "success" | "error";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { setPremium } = usePremium();
  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Verify payment with our API
    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPremium(true);
          setEmail(data.customer_email);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [searchParams, setPremium]);

  return (
    <>
      <SEO title="Payment" description="Payment confirmation" path="/payment/success" />
      <div className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4 py-16">
        {status === "loading" && (
          <div className="text-center">
            <FiLoader className="mx-auto mb-4 animate-spin text-primary-600" size={48} />
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Vérification du paiement...
            </h1>
            <p className="mt-2 text-surface-500 dark:text-surface-400">
              Merci de patienter quelques secondes.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <FiCheckCircle className="text-green-600 dark:text-green-400" size={48} />
            </div>
            <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white">
              Bienvenue dans le mode Pro ! 🎉
            </h1>
            <p className="mt-3 text-lg text-surface-500 dark:text-surface-400">
              Ton paiement a été confirmé avec succès.
            </p>
            {email && (
              <p className="mt-2 text-sm text-surface-400 dark:text-surface-500">
                Confirmation envoyée à <strong className="text-surface-600 dark:text-surface-300">{email}</strong>
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700 transition-colors"
              >
                Explorer tous les outils
              </Link>
              <Link
                to="/pricing"
                className="rounded-lg border border-surface-300 px-6 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-800 transition-colors"
              >
                Voir mon abonnement
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <FiAlertCircle className="text-red-600 dark:text-red-400" size={48} />
            </div>
            <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white">
              Paiement non confirmé
            </h1>
            <p className="mt-3 text-surface-500 dark:text-surface-400">
              Le paiement n'a pas pu être vérifié. Réessaie ou contacte le support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/pricing"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700 transition-colors"
              >
                Réessayer
              </Link>
              <Link
                to="/"
                className="rounded-lg border border-surface-300 px-6 py-3 text-sm font-semibold text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-800 transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
