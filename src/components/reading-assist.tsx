"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ReadingAssist() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      const article = document.getElementById("article-body");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const readableDistance = Math.max(
        article.offsetHeight - window.innerHeight * 0.55,
        1,
      );
      const progress = Math.min(
        Math.max((window.scrollY - absoluteTop + 180) / readableDistance, 0),
        1,
      );

      document.documentElement.style.setProperty(
        "--reading-progress",
        progress.toFixed(4),
      );
      setShowBackToTop(window.scrollY > 520);
    }

    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.documentElement.style.removeProperty("--reading-progress");
    };
  }, []);

  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "is-visible" : ""}`}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={showBackToTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp
          size={16}
          strokeWidth={1.7}
          aria-hidden="true"
          style={{ margin: "auto" }}
        />
      </button>
    </>
  );
}
