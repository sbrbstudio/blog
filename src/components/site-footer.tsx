import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "X / Twitter", href: siteConfig.social.x },
  { label: "Email", href: `mailto:${siteConfig.social.email}` },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link href="/" className="brand" aria-label="Commonplace home">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-dot" />
              </span>
              <span>Commonplace</span>
            </Link>
            <p className="footer-intro">
              当前网站的操作与维护手册，包含启动、文章增删、Markdown
              语法、页面修改、检查与发布流程。
            </p>
          </div>

          <div>
            <p className="footer-label">Explore</p>
            <div className="footer-links">
              <Link href="/articles/website-editing-complete-guide">
                Website editing guide
              </Link>
              <Link href="/topics">Topics</Link>
              <Link href="/about">About</Link>
            </div>
          </div>

          <div>
            <p className="footer-label">Elsewhere</p>
            <div className="footer-links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noreferrer noopener"
                  }
                >
                  {link.label}
                  {!link.href.startsWith("mailto:") ? (
                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      style={{ display: "inline", marginLeft: 5 }}
                    />
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Commonplace. All rights reserved.</span>
          <span>Made thoughtfully, between screens and paper.</span>
        </div>
      </div>
    </footer>
  );
}
