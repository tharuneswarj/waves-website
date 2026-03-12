import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/shopify";
import { getAllProjectSlugs } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://waves.company";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/shop`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/studio`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productRoutes = products.map((p) => ({
      url: `${base}/shop/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));
  } catch {
    // Shopify unreachable at build time — skip product routes
  }

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${base}/studio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...projectRoutes];
}
