"use client";

import { useEffect, useMemo, useState } from "react";
import type { Heading } from "@/lib/articles";

export function ArticleToc({ headings }: { headings: Heading[] }) {
  const tocHeadings = useMemo(
    () => headings.filter((heading) => heading.level === 2),
    [headings],
  );
  const [activeId, setActiveId] = useState(tocHeadings[0]?.id ?? "");

  useEffect(() => {
    const elements = tocHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [tocHeadings]);

  if (tocHeadings.length < 3) return null;

  return (
    <aside className="article-toc" aria-label="Table of contents">
      <p className="toc-label">On this page</p>
      <nav className="toc-list">
        {tocHeadings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            data-level={heading.level}
            aria-current={activeId === heading.id ? "location" : undefined}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
