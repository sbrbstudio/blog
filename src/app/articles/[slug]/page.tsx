import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArticleCard } from "@/components/article-card";
import { ArticleToc } from "@/components/article-toc";
import { MdxFigure } from "@/components/mdx-figure";
import { ReadingAssist } from "@/components/reading-assist";
import {
  articles,
  getAdjacentArticles,
  getArticle,
  getRelatedArticles,
  type Article,
  formatDate,
  readingTimeLabel,
} from "@/content/articles";
import { getArticleContent } from "@/lib/articles";
import { assetPath, siteConfig } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => <h2 {...props} />,
  h3: (props: React.ComponentProps<"h3">) => <h3 {...props} />,
  Figure: MdxFigure,
  a: ({ href = "", children, ...props }: React.ComponentProps<"a">) => {
    const external = href.startsWith("http");

    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  const url = `/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: article.author, url: `${siteConfig.url}/about` }],
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      authors: [article.author],
      section: article.category,
      tags: [article.category, "website editing", "markdown", "next.js"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function AdjacentArticleLink({
  article,
  direction,
}: {
  article?: Article;
  direction: "Previous" | "Next";
}) {
  if (!article) {
    return (
      <span
        className="adjacent-link"
        aria-hidden="true"
        style={{ opacity: 0.32 }}
      >
        <span className="adjacent-label">{direction} guide</span>
        <span className="adjacent-title">No other guide in this section.</span>
      </span>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="adjacent-link">
      <span className="adjacent-label">{direction} guide</span>
      <span className="adjacent-title">{article.title}</span>
    </Link>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const [{ content, headings }, { previous, next }, related] = await Promise.all([
    getArticleContent(article),
    Promise.resolve(getAdjacentArticles(article.slug)),
    Promise.resolve(getRelatedArticles(article)),
  ]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: `${siteConfig.url}${article.coverImage}`,
    url: `${siteConfig.url}/articles/${article.slug}`,
    mainEntityOfPage: `${siteConfig.url}/articles/${article.slug}`,
    articleSection: article.category,
    author: {
      "@type": "Person",
      name: article.author,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ReadingAssist />
      <article>
        <header className="container article-hero">
          <div className="article-hero-inner">
            <Link href="/articles" className="back-link">
              <ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" />
              Back to guide index
            </Link>
            <div>
              <Link
                href={`/topics/${article.category.toLowerCase()}`}
                className="article-category"
              >
                {article.category}
              </Link>
              <h1 className="article-title">{article.title}</h1>
              <p className="article-description">{article.description}</p>
              <div className="article-byline">
                <span className="byline-meta">
                  当前项目维护说明
                  {" · "}
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                  {" · "}
                  {readingTimeLabel(article.readingTime)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="article-cover">
          <Image
            src={assetPath(article.coverImage)}
            alt={`Editorial cover for ${article.title}`}
            width={1200}
            height={675}
            priority
            sizes="(max-width: 1000px) 100vw, 960px"
            className="article-cover-image"
          />
        </div>

        <div className="container article-reading-grid">
          <ArticleToc headings={headings} />

          <div id="article-body" className="article-prose">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap",
                        properties: {
                          className: ["heading-anchor"],
                        },
                      },
                    ],
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-light",
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />

            <div className="article-end">
              <div className="manual-note">
                <span className="toc-label">维护提示</span>
                <p>
                  新增或删除文章时，请同步检查
                  <code>src/content/articles.ts</code>、
                  <code>src/content/posts/</code> 和
                  <code>public/images/</code>。最后运行类型检查与生产构建。
                </p>
              </div>
              {previous || next ? (
                <nav
                  className="article-pagination"
                  aria-label="Adjacent guides"
                >
                  {previous ? (
                    <AdjacentArticleLink
                      article={previous}
                      direction="Previous"
                    />
                  ) : null}
                  {next ? (
                    <AdjacentArticleLink
                      article={next}
                      direction="Next"
                    />
                  ) : null}
                </nav>
              ) : (
                <Link href="/articles" className="single-guide-link">
                  <span className="adjacent-label">Guide index</span>
                  <span className="adjacent-title">
                    Return to the complete website editing guide
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>

          <aside className="article-side-actions" aria-label="Article note">
            <span
              className="toc-label"
              style={{ writingMode: "vertical-rl" }}
            >
              Read slowly · {readingTimeLabel(article.readingTime)}
            </span>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section
          className="related-section"
          aria-labelledby="related-heading"
        >
          <div className="container">
            <div className="section-heading">
              <h2 id="related-heading" className="section-title">
                Continue reading
              </h2>
              <Link href="/articles" className="text-link">
                Guide index
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
            <div className="article-grid">
              {related.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.slug}
                  article={relatedArticle}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
