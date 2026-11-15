import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import {
  articles,
  categories,
  type Category,
  topicDescriptions,
} from "@/content/articles";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryBySlug = new Map(
  categories.map((category) => [category.toLowerCase(), category]),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug.get(slug);

  if (!category) return {};

  return {
    title: `${category} Guides`,
    description: topicDescriptions[category],
    alternates: {
      canonical: `/topics/${slug}`,
    },
    openGraph: {
      title: `${category} Guides — Commonplace`,
      description: topicDescriptions[category],
      url: `/topics/${slug}`,
      type: "website",
    },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const category = categoryBySlug.get(slug) as Category | undefined;

  if (!category) notFound();

  const topicArticles = articles.filter(
    (article) => article.category === category,
  );

  return (
    <main id="main-content">
      <header className="container topic-page-header">
        <span className="eyebrow">
          {topicArticles.length}{" "}
          {topicArticles.length === 1 ? "guide" : "guides"}
        </span>
        <h1>{category}</h1>
        <p>{topicDescriptions[category]}</p>
      </header>

      <section
        className="container topic-articles"
        aria-label={`${category} guides`}
      >
        <div className="article-grid">
          {topicArticles.map((article, index) => (
            <ArticleCard
              key={article.slug}
              article={article}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
