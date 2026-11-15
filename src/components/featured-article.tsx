import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/articles";
import { formatDate, readingTimeLabel } from "@/content/articles";
import { assetPath } from "@/lib/site";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="featured group">
      <div className="featured-image-wrap">
        <Image
          src={assetPath(article.coverImage)}
          alt=""
          fill
          priority
          sizes="(max-width: 860px) 100vw, 66vw"
          className="featured-image"
        />
      </div>
      <div className="featured-copy">
        <div>
          <span className="eyebrow">Complete guide</span>
          <h3 className="featured-title">{article.title}</h3>
          <p className="featured-description">{article.description}</p>
        </div>
        <div>
          <div className="article-meta">
            <span className="category-label">{article.category}</span>
            <span className="meta-dot" aria-hidden="true" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span className="meta-dot" aria-hidden="true" />
            <span>{readingTimeLabel(article.readingTime)}</span>
          </div>
          <span className="text-link" style={{ marginTop: 22 }}>
            Read the tutorial
            <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
