import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Article } from "@/content/articles";

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

const contentDirectory = path.join(process.cwd(), "src", "content", "posts");

export async function getArticleSource(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { content } = matter(source);

  return { content, filePath };
}

export function extractHeadings(content: string): Heading[] {
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");
  const headings: Heading[] = [];

  for (const line of withoutCodeBlocks.split("\n")) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());

    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-");

    headings.push({
      id,
      text,
      level: match[1] === "##" ? 2 : 3,
    });
  }

  return headings;
}

export async function getArticleContent(article: Article) {
  const { content } = await getArticleSource(article.slug);

  return {
    content,
    headings: extractHeadings(content),
  };
}
