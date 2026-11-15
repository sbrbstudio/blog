"use client";

import { ArrowUpRight, FileText, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "@/content/articles";
import { formatDate } from "@/content/articles";

type SearchDialogProps = {
  articles: Article[];
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ articles, open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navigateToArticle = useCallback(
    (slug: string) => {
      onClose();
      document.body.style.overflow = "";
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        router.push(`/articles/${slug}`);
      });
    },
    [onClose, router],
  );

  const normalizedQuery = query.trim().toLowerCase();
  const results = articles
    .filter((article) => {
      if (!normalizedQuery) return true;

      return `${article.title} ${article.description} ${article.category}`
        .toLowerCase()
        .includes(normalizedQuery);
    })
    .slice(0, 6);

  useEffect(() => {
    if (!open) return;

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      previousActiveElement?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) =>
          results.length ? (index + 1) % results.length : 0,
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) =>
          results.length ? (index - 1 + results.length) % results.length : 0,
        );
      }

      if (event.key === "Enter" && results[activeIndex]) {
        navigateToArticle(results[activeIndex].slug);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, navigateToArticle, onClose, open, results]);

  if (!open) return null;

  return (
    <div
      className="search-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <h2 id="search-title" className="sr-only">
          Search guides
        </h2>
        <div className="search-dialog-input-wrap">
          <Search size={18} strokeWidth={1.7} aria-hidden="true" />
          <input
            ref={inputRef}
            className="search-dialog-input"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search the website editing guide…"
            aria-label="Search guides"
            aria-controls="search-results"
            aria-activedescendant={
              results[activeIndex]
                ? `search-result-${results[activeIndex].slug}`
                : undefined
            }
          />
          <button
            type="button"
            className="icon-button"
            aria-label="Close search"
            onClick={onClose}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div id="search-results" className="search-dialog-body">
          {results.length ? (
            results.map((article, index) => (
              <Link
                id={`search-result-${article.slug}`}
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="search-result"
                data-active={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={(event) => {
                  if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  ) {
                    return;
                  }

                  event.preventDefault();
                  navigateToArticle(article.slug);
                }}
              >
                <span className="search-result-icon">
                  <FileText size={15} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span>
                  <span className="search-result-title">{article.title}</span>
                  <span className="search-result-meta">
                    {article.category} · {formatDate(article.publishedAt)}
                  </span>
                </span>
                <ArrowUpRight
                  className="search-result-arrow"
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            ))
          ) : (
            <p className="search-dialog-empty">
              No guides found. Try a broader term like “MDX” or “SEO”.
            </p>
          )}
        </div>

        <div className="search-dialog-footer" aria-hidden="true">
          <span>↑↓ to navigate · ↵ to open</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
