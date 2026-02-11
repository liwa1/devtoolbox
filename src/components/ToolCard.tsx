import { Link } from "react-router-dom";
import type { Tool } from "../data/tools";
import { PremiumBadge } from "./Premium";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={tool.path}
      className="group relative flex flex-col gap-3 rounded-xl border border-surface-200 bg-white p-5 shadow-sm hover:border-primary-300 hover:shadow-md dark:border-surface-800 dark:bg-surface-900 dark:hover:border-primary-700 transition-all duration-200"
    >
      {tool.premium && (
        <div className="absolute top-3 right-3">
          <PremiumBadge />
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:group-hover:bg-primary-900/50 transition-colors">
          {tool.icon}
        </div>
        <h3 className="font-semibold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {tool.name}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
        {tool.description}
      </p>
      <span className="mt-auto inline-flex items-center text-xs font-medium text-primary-600 dark:text-primary-400">
        {tool.premium ? "Open PRO tool →" : "Open tool →"}
      </span>
    </Link>
  );
}
