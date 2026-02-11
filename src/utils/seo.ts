import { tools } from "../data/tools";

/**
 * Generate JSON-LD structured data for the website.
 * This helps Google understand your site better and can lead to rich results.
 */
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DevToolbox",
    url: "https://devtoolbox.app",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder, UUID generator, hash generator, regex tester and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://devtoolbox.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function getToolJsonLd(tool: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: `https://devtoolbox.app${tool.path}`,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "DevToolbox",
      url: "https://devtoolbox.app",
    },
  };
}

/**
 * Generate a sitemap XML string.
 * Call this during build or use it in a server-side rendered route.
 */
export function generateSitemapXml(): string {
  const baseUrl = "https://devtoolbox.app";
  const now = new Date().toISOString().split("T")[0];

  const urls = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/pricing", priority: "0.8", changefreq: "monthly" },
    ...tools.map((t) => ({
      loc: t.path,
      priority: "0.9",
      changefreq: "monthly" as const,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}
