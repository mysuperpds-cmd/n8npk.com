"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { navCta, resourcesNav, servicesNav } from "@/lib/site-config";

const flatLinks = [
  { label: "Workflow Library", href: "/workflows" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="N8NPK home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavDropdown label="Services" href="/services" items={servicesNav} />
          {flatLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3.5 xl:text-sm ${
                isActive(item.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <NavDropdown label="Resources" href="/blog" items={resourcesNav} />
          <Link
            href="/about"
            className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3.5 xl:text-sm ${
              isActive("/about") ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3.5 xl:text-sm ${
              isActive("/contact") ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link
            href={navCta.href}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[#04140f] transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            {navCta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] lg:hidden"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M1 4H15M1 8H15M1 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`grid overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
            <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-faint)]">Services</p>
            {servicesNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]">
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-[var(--color-border)]" />
            {flatLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]">
                {item.label}
              </Link>
            ))}
            <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-faint)]">Resources</p>
            {resourcesNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]">
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-[var(--color-border)]" />
            <Link href="/about" className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]">
              About
            </Link>
            <Link href="/contact" className="rounded-lg px-3 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]">
              Contact
            </Link>
            <Link
              href={navCta.href}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-[#04140f]"
            >
              {navCta.label}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
