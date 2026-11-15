import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedArticle } from "@/components/featured-article";
import { Reveal } from "@/components/reveal";
import { articles } from "@/content/articles";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "网站编辑一体化教程",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const guideModules = [
  {
    index: "01",
    title: "启动与目录",
    description: "安装依赖、启动本地网站，并找到主要文件的位置。",
    anchor: "启动与目录",
  },
  {
    index: "02",
    title: "添加文章",
    description: "准备封面、填写元数据，然后创建对应的 MDX 文件。",
    anchor: "添加文章",
  },
  {
    index: "03",
    title: "删除与修改",
    description: "安全移除或更新文章，避免正文、元数据和图片不同步。",
    anchor: "删除与修改",
  },
  {
    index: "04",
    title: "Markdown 语法",
    description: "标题、列表、链接、引用、表格、代码和图片的写法。",
    anchor: "markdown-语法",
  },
  {
    index: "05",
    title: "推送与发布",
    description: "提交到 GitHub，由 Actions 自动构建并更新线上网站。",
    anchor: "github-推送与自动发布",
  },
];

export default function Home() {
  const guide = articles[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      datePublished: article.publishedAt,
      url: `${siteConfig.url}/articles/${article.slug}`,
    })),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="container home-hero" aria-labelledby="hero-title">
        <div>
          <Reveal>
            <span className="eyebrow">当前项目 · 网站维护手册</span>
            <h1 id="hero-title" className="display-title">
              编辑这个网站，从这里开始。
            </h1>
            <p className="hero-subtitle">
              添加文章、删除文章、使用 Markdown、修改页面、启动本地预览，再到检查与发布——所有操作都按当前项目的真实路径和命令说明。
            </p>
          </Reveal>
        </div>
        <Reveal className="hero-aside" delay={120}>
          <p className="hero-note">
            这是一份给自己看的维护手册。只记录这个项目里真实存在的文件、命令和编辑步骤。
          </p>
          <div className="hero-stat">
            <strong>{articles.length}</strong>
            <span>Complete guide</span>
          </div>
        </Reveal>
      </section>

      <section
        className="container section-border section"
        aria-labelledby="featured-title"
      >
        <div className="section-heading">
          <h2 id="featured-title" className="section-title">
            操作教程
          </h2>
          <span className="eyebrow">Current project guide</span>
        </div>
        <Reveal>
          <FeaturedArticle article={guide} />
        </Reveal>
      </section>

      <section className="topics-section" aria-labelledby="inside-title">
        <div className="container section">
          <div className="section-heading">
            <h2 id="inside-title" className="section-title">
              教程目录
            </h2>
            <Link
              href={`/articles/${guide.slug}`}
              className="text-link"
            >
              从头开始阅读
              <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
          <div className="guide-outline">
            {guideModules.map((module) => (
              <Link
                key={module.index}
                href={`/articles/${guide.slug}#${module.anchor}`}
                className="guide-module"
              >
                <div className="guide-module-top">
                  <span className="topic-count">{module.index}</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <Reveal>
          <section className="home-quote" aria-label="Tutorial note">
            <span className="eyebrow">编辑前先确认</span>
            <blockquote>
              “每篇文章都由两个文件共同决定：元数据告诉网站它是什么，MDX 文件决定读者看到什么。”
              <cite>网站编辑一体化教程</cite>
            </blockquote>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
