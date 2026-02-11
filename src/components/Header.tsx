import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-lg dark:border-surface-800 dark:bg-surface-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg shadow-sm group-hover:bg-primary-700 transition-colors">
            D
          </div>
          <span className="text-xl font-bold text-surface-900 dark:text-white">
            Dev<span className="text-primary-600">Toolbox</span>
          </span>
        </Link>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
          >
            All Tools
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            <span className="inline-flex h-4 items-center rounded bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 text-[10px] font-bold text-white">PRO</span>
            Pricing
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-950 px-4 py-3 space-y-2">
          <Link
            to="/"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          >
            All Tools
          </Link>
          <Link
            to="/pricing"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30"
          >
            <span className="inline-flex h-4 items-center rounded bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 text-[10px] font-bold text-white">PRO</span>
            Pricing
          </Link>
        </div>
      )}
    </header>
  );
}
