"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/site-config";

export function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] xl:px-3.5 xl:text-sm"
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2 shadow-2xl">
          <div className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--color-surface)]"
              >
                <span className="text-sm font-medium text-[var(--color-text)]">{item.label}</span>
                {item.description ? (
                  <span className="text-xs text-[var(--color-text-faint)]">{item.description}</span>
                ) : null}
              </Link>
            ))}
          </div>
          <Link
            href={href}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl border-t border-[var(--color-border)] px-3 py-2.5 text-sm font-medium text-[var(--color-accent-text)] hover:bg-[var(--color-surface)]"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
