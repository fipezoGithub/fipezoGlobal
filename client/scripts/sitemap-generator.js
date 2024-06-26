// const fs = require("fs");
// const globby = require("globby");
function addPage(page) {
  const path = page
    .replace("pages", "")
    .replace(".jsx", "")
    .replace(".mdx", "");
  const route = path === "/index" ? "" : path;
  return `  <url>
    <loc>${`${process.env.CLIENT_URL}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;
}
async function generateSitemap() {
  const { globby } = await import("globby");
  const fs = await import("fs/promises");
  const pages = await globby([
    "pages/**/*{.jsx,.mdx}",
    "!pages/_*.js",
    "!pages/api",
  ]);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join("\n")}
  </urlset>`;
  await fs.writeFile("public/sitemap.xml", sitemap);
}
generateSitemap();
