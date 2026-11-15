export const categories = [
  "Guide",
] as const;

export type Category = (typeof categories)[number];

export type Article = {
  title: string;
  slug: string;
  description: string;
  category: Category;
  publishedAt: string;
  readingTime: number;
  coverImage: string;
  author: string;
  featured?: boolean;
};

export const author = {
  name: "Lin Yu",
  role: "Designer, developer & editor",
  avatar: "/images/author-lin-yu.svg",
  shortBio:
    "Lin is an independent designer and developer who documents practical, maintainable ways to build and edit websites.",
} as const;

export const articles: Article[] = [
  {
    title: "网站编辑一体化教程",
    slug: "website-editing-complete-guide",
    description:
      "从启动网站、添加和删除文章，到 Markdown 语法、修改页面、SEO 检查与发布，一份针对当前项目的完整操作教程。",
    category: "Guide",
    publishedAt: "2026-11-15",
    readingTime: 20,
    coverImage: "/images/website-editing-guide.svg",
    author: author.name,
    featured: true,
  },
];

export const topicDescriptions: Record<Category, string> = {
  Guide:
    "当前网站的维护、文章编辑、Markdown 语法与发布操作说明。",
};

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getTopicCount(category: Category) {
  return articles.filter((article) => article.category === category).length;
}

export function getAdjacentArticles(slug: string) {
  const index = articles.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? articles[index - 1] : undefined,
    next: index < articles.length - 1 ? articles[index + 1] : undefined,
  };
}

export function getRelatedArticles(article: Article, limit = 2) {
  return articles
    .filter(
      (candidate) =>
        candidate.slug !== article.slug &&
        candidate.category === article.category,
    )
    .concat(
      articles.filter(
        (candidate) =>
          candidate.slug !== article.slug &&
          candidate.category !== article.category,
      ),
    )
    .slice(0, limit);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function readingTimeLabel(minutes: number) {
  return `${minutes} 分钟阅读`;
}
