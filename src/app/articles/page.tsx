import type { Metadata } from "next";
import { ArticlesExplorer } from "@/components/articles-explorer";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Website Editing Guide",
  description:
    "A complete tutorial covering website content, design systems, MDX, interactions, SEO, and publishing.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Website Editing Guide — Commonplace",
    description: "One complete workflow for building and editing a website.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  return (
    <main id="main-content">
      <header className="container page-intro">
        <span className="eyebrow">完整编辑手册</span>
        <h1 className="page-title">Website Editing Guide</h1>
        <p className="page-description">
          从内容结构到上线维护，只保留这一篇完整教程。
        </p>
      </header>
      <ArticlesExplorer articles={articles} />
    </main>
  );
}
