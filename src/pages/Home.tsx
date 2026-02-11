import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SEO from "../components/SEO";
import ToolCard from "../components/ToolCard";
import { tools, categories, getToolsByCategory, searchTools } from "../data/tools";

export default function Home() {
  const [search, setSearch] = useState("");
  const filtered = search ? searchTools(search) : tools;
  const isSearching = search.trim().length > 0;

  return (
    <>
      <SEO />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white sm:text-5xl">
            Free Online <span className="text-primary-600">Developer Tools</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-surface-500 dark:text-surface-400">
            {tools.length}+ handy tools for developers. JSON formatter, Base64 encoder, hash generator, UUID,
            regex tester & more. Fast, private, no sign-up.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <FiSearch
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"
              />
              <input
                type="text"
                placeholder="Search tools… (e.g. json, base64, hash)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none ring-primary-500 placeholder:text-surface-400 focus:border-primary-400 focus:ring-2 dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder:text-surface-500 dark:focus:border-primary-600 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {isSearching ? (
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </h2>
            {filtered.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <p className="text-center text-surface-500 dark:text-surface-400 py-12">
                No tools found for "{search}". Try a different keyword.
              </p>
            )}
          </div>
        ) : (
          /* Categories */
          <div className="space-y-12">
            {categories.map((category) => {
              const catTools = getToolsByCategory(category);
              if (catTools.length === 0) return null;
              return (
                <section key={category}>
                  <h2 className="mb-4 text-lg font-bold text-surface-900 dark:text-white">
                    {category}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {catTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
