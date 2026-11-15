"use client";

import {
  ArrowUpRight,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { articles } from "@/content/articles";
import { SearchDialog } from "@/components/search-dialog";

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/articles/website-editing-complete-guide",
    label: "Guide",
  },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" },
];

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Commonplace home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-dot" />
      </span>
      <span>Commonplace</span>
    </Link>
  );
}

function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;

    try {
      localStorage.setItem("commonplace-theme", nextTheme);
    } catch {
      // Theme changes still work when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className="icon-button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={toggleTheme}
    >
      <Sun
        className="theme-sun"
        size={17}
        strokeWidth={1.7}
        aria-hidden="true"
      />
      <Moon
        className="theme-moon"
        size={16}
        strokeWidth={1.7}
        aria-hidden="true"
      />
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const isTyping =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;

      if (!isTyping && (event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Search guides"
              title="Search guides (⌘K)"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={17} strokeWidth={1.7} aria-hidden="true" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="icon-button mobile-menu-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={18} aria-hidden="true" />
              ) : (
                <Menu size={18} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      ) : null}

      {searchOpen ? (
        <SearchDialog
          articles={articles}
          open
          onClose={() => setSearchOpen(false)}
        />
      ) : null}
    </>
  );
}
