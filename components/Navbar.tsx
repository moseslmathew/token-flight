"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  LayoutGrid,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  {
    href: "/",
    label: "Products",
    description: "Useful AI, reviewed",
    icon: LayoutGrid,
    match: (pathname: string) => pathname === "/",
  },
  {
    href: "/news",
    label: "News",
    description: "The essential briefing",
    icon: Newspaper,
    match: (pathname: string) => pathname.startsWith("/news"),
  },
  {
    href: "/learn",
    label: "Learn",
    description: "Ideas made clear",
    icon: BookOpen,
    match: (pathname: string) =>
      pathname.startsWith("/learn") || pathname.startsWith("/blog"),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="TokenFlight home">
          <span className={styles.brandMark} aria-hidden="true">
            <span>TF</span>
            <i />
          </span>
          <span className={styles.wordmark}>
            Token<span>Flight</span>
          </span>
          <span className={styles.brandNote}>
            AI intelligence,
            <br />
            made useful
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
                data-active={active}
                aria-current={active ? "page" : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  <link.icon size={16} strokeWidth={1.8} />
                </span>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.description}</small>
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          ref={menuButton}
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            className={styles.backdrop}
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="mobile-navigation"
            className={styles.mobileNav}
            aria-label="Mobile navigation"
          >
            <span className={styles.mobileLabel}>Explore TokenFlight</span>
            {NAV_LINKS.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileLink}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.mobileIcon} aria-hidden="true">
                    <link.icon size={19} strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong>{link.label}</strong>
                    <small>{link.description}</small>
                  </span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              );
            })}
            <p>Products first. Technology in context.</p>
          </nav>
        </>
      )}
    </header>
  );
}
