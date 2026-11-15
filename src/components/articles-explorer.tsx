"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { Article, Category } from "@/content/articles";
import { categories, formatDate, readingTimeLabel } from "@/content/articles";

type Filter = "All" | Category;
type SortOrder = "newest" | "oldest";

export function ArticlesExplorer({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const deferredQuery = useDeferredValue(query);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return articles
      .filter(
        (article) =>
          category === "All" || article.category === category,
      )
      .filter((article) => {
        if (!normalizedQuery) return true;

        return `${article.title} ${article.description} ${article.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) =>
        sortOrder === "newest"
          ? b.publishedAt.localeCompare(a.publishedAt)
          : a.publishedAt.localeCompare(b.publishedAt),
      );
  }, [articles, category, deferredQuery, sortOrder]);

  function resetFilters() {
    setCategory("All");
    setQuery("");
    setSortOrder("newest");
  }

  return (
    <>
      <div className="articles-toolbar">
        <div className="container articles-toolbar-inner">
          <div
            className="filter-list"
            role="group"
            aria-label="Filter by category"
          >
            {(["All", ...categories] as Filter[]).map((item) => (
              <button
                key={item}
                type="button"
                className="filter-button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="toolbar-controls">
            <label className="search-field">
              <span className="sr-only">Search articles</span>
              <Search size={14} strokeWidth={1.7} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles"
              />
            </label>
            <label>
              <span className="sr-only">Sort articles by date</span>
              <select
                className="sort-select"
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value as SortOrder)
                }
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <section className="container article-results" aria-live="polite">
        <div className="results-meta">
          <span>
            {String(filteredArticles.length).padStart(2, "0")}{" "}
            {filteredArticles.length === 1 ? "guide" : "guides"}
          </span>
          <span>
            {category === "All" ? "Every topic" : category} ·{" "}
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </span>
        </div>

        {filteredArticles.length ? (
          <div className="article-list">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="article-list-item"
              >
                <time
                  className="list-date"
                  dateTime={article.publishedAt}
                >
                  {formatDate(article.publishedAt)}
                </time>
                <div className="list-copy">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
                <div className="list-details">
                  <span className="category-label">{article.category}</span>
                  <span>{readingTimeLabel(article.readingTime)}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div>
              <h3>No guides found</h3>
              <p>
                Nothing matches “{query}” in {category.toLowerCase()}. Try a
                broader keyword or return to the complete archive.
              </p>
              <button type="button" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
