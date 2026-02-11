import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            © {new Date().getFullYear()} DevToolbox — Free Online Developer Tools
          </p>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
              Go Pro
            </Link>
            <span className="text-xs text-surface-400 dark:text-surface-500">
              All processing happens in your browser. No data is sent to any server.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
