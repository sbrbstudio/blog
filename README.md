# Commonplace

A focused editorial website built with Next.js App Router, TypeScript, Tailwind CSS, local fonts, and MDX. It contains one complete website editing tutorial.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
```

## Content

The tutorial metadata lives in `src/content/articles.ts`. Its body lives in
`src/content/posts/<slug>.mdx`. To replace or extend the guide:

1. Add an entry to the `articles` array.
2. Create the matching MDX file.
3. Place a unique cover image in `public/images/`.
4. Run the typecheck and production build.

Static article and topic routes are generated from the content metadata.

## Project structure

```text
src/
  app/                 App Router pages, metadata routes, and global styles
  components/          Reusable server and client components
  content/             Article metadata and MDX posts
  lib/                 Content loading and site configuration
public/
  images/              Editorial covers and author artwork
  licenses/            Original OFL license files
```

The site deploys automatically to GitHub Pages whenever `main` is pushed:

```text
https://sbrbstudio.github.io/blog/
```

The workflow is `.github/workflows/deploy-pages.yml`. It applies the `/blog`
base path, runs linting and type checks, exports the static site to `out/`, and
deploys that artifact to GitHub Pages.

## Publish local changes

```bash
pnpm lint
pnpm typecheck
pnpm build
git add .
git commit -m "更新网站内容"
git push
```

The website stays unchanged until the commit is pushed. Deployment progress is
visible in the repository's **Actions** tab.

## Fonts

Inter Variable is bundled locally through `next/font/local`. Noto Sans SC
Variable is bundled through `@fontsource-variable/noto-sans-sc`. Both use WOFF2
and retain their original SIL Open Font License files under `public/licenses/`.
