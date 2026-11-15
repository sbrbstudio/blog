export const siteBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "");

export function assetPath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${siteBasePath}${path}`;
}

export const siteConfig = {
  name: "Commonplace",
  title: "Commonplace — 网站编辑一体化教程",
  description:
    "针对当前项目启动、文章增删、Markdown 语法、页面修改、SEO 与发布检查的完整操作教程。",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://sbrbstudio.github.io/blog",
  locale: "en_US",
  author: "Lin Yu",
  social: {
    github: "https://github.com/",
    x: "https://x.com/",
    email: "hello@commonplace.studio",
  },
} as const;
