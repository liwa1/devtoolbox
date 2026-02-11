import { Helmet } from "react-helmet-async";
import { getWebsiteJsonLd, getToolJsonLd } from "../utils/seo";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SEO({
  title,
  description = "Free online developer tools: JSON formatter, Base64 encoder, UUID generator, hash generator, regex tester and 20+ tools. Fast, private, no sign-up required.",
  path = "",
}: SEOProps) {
  const siteName = "DevToolbox";
  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — Free Online Developer Tools`;
  const url = `https://devtoolbox.app${path}`;

  const jsonLd = title
    ? getToolJsonLd({ name: title, description, path: path || "/" })
    : getWebsiteJsonLd();

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
