import type { MetadataRoute } from "next";
import { articles, categories } from "@/content/articles";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/articles`,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/topics`,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}/articles/${article.slug}`,
    lastModified: new Date(`${article.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const topicPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/topics/${category.toLowerCase()}`,
    lastModified: new Date("2026-11-15"),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticPages, ...topicPages, ...articlePages];
}
