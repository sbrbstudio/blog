import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { formatDate, readingTimeLabel } from "@/content/articles";
import { assetPath } from "@/lib/site";

type ArticleCardProps = {
  article: Article;
  priority?: boolean;
};

export function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="article-card group">
      <div className="article-card-image-wrap">
        <Image
          src={assetPath(article.coverImage)}
          alt=""
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 700px) 100vw, 44vw"
          className="article-card-image"
        />
      </div>
      <div className="article-card-copy">
        <div className="article-meta">
          <span className="category-label">{article.category}</span>
          <span className="meta-dot" aria-hidden="true" />
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <span className="meta-dot" aria-hidden="true" />
          <span>{readingTimeLabel(article.readingTime)}</span>
        </div>
        <h3 className="article-card-title">
          <span>{article.title}</span>
          <ArrowUpRight
            size={17}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{
              display: "inline",
              marginLeft: 8,
              verticalAlign: "2px",
              opacity: 0.42,
            }}
          />
        </h3>
        <p className="article-card-description">{article.description}</p>
      </div>
    </Link>
  );
}
