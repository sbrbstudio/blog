import { ImageResponse } from "next/og";
import { articles, getArticle } from "@/content/articles";

export const alt = "A website editing tutorial from Commonplace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleOpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F7F5",
          padding: "58px 68px",
          color: "#191919",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "flex",
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "#191919",
                color: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </span>
            Commonplace
          </span>
          <span style={{ color: "#3366CC", letterSpacing: "0.1em" }}>
            {article?.category.toUpperCase() ?? "ESSAY"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 980,
            flexDirection: "column",
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: article && article.title.length > 42 ? 58 : 68,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 1.08,
            }}
          >
            {article?.title ?? "Thoughts worth sharing"}
          </span>
          <span
            style={{
              display: "flex",
              maxWidth: 830,
              marginTop: 28,
              color: "#777777",
              fontSize: 22,
              lineHeight: 1.45,
            }}
          >
            {article?.description ?? "Essays on design, technology, and life."}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #DEDEDB",
            paddingTop: 20,
            color: "#777777",
            fontSize: 16,
          }}
        >
          <span>Lin Yu · Commonplace</span>
          <span>{article?.publishedAt ?? "2026"}</span>
        </div>
      </div>
    ),
    size,
  );
}
