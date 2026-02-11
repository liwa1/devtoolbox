import { generateSitemapXml } from "../src/utils/seo";
import { writeFileSync } from "fs";
import { resolve } from "path";

// Run after build: npx tsx scripts/generate-sitemap.ts
const sitemap = generateSitemapXml();
const outPath = resolve("dist", "sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");
console.log(`✅ Sitemap generated at ${outPath}`);
