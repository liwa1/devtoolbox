import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
        <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">
          This page doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
