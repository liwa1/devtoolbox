import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import SEO from "./SEO";
import { AdPlaceholder } from "./Ads";

interface ToolLayoutProps {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}

export default function ToolLayout({ title, description, path, children }: ToolLayoutProps) {
  return (
    <>
      <SEO title={title} description={description} path={path} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
        >
          <FiArrowLeft size={14} />
          All Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-surface-500 dark:text-surface-400">{description}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">{children}</div>

        {/* Ad Placement */}
        <div className="mt-10">
          <AdPlaceholder />
        </div>
      </div>
    </>
  );
}
