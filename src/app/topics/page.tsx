import type { Metadata } from "next";
import Link from "next/link";
import {
  categories,
  getTopicCount,
  topicDescriptions,
} from "@/content/articles";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse the complete website editing tutorial by topic.",
  alternates: {
    canonical: "/topics",
  },
};

export default function TopicsPage() {
  return (
    <main id="main-content">
      <header className="container page-intro">
        <span className="eyebrow">Browse by theme</span>
        <h1 className="page-title">Topics</h1>
        <p className="page-description">
          Different paths into the same questions about making thoughtful
          things.
        </p>
      </header>

      <section className="container topics-directory" aria-label="All topics">
        {categories.map((category, index) => {
          const count = getTopicCount(category);

          return (
            <Link
              key={category}
              href={`/topics/${category.toLowerCase()}`}
              className="topic-directory-row"
            >
              <span className="topic-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{category}</h2>
              <p>{topicDescriptions[category]}</p>
              <span className="topic-directory-count">
                {count} {count === 1 ? "guide" : "guides"}
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
