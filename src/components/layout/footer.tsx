import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { footerNav, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
            {siteConfig.description}
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-[var(--color-text-faint)]">
            {siteConfig.affiliationNote}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {siteConfig.social.linkedin ? (
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                LinkedIn
              </a>
            ) : null}
            {siteConfig.social.facebook ? (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                Facebook
              </a>
            ) : null}
            {siteConfig.social.instagram ? (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                Instagram
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Services</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerNav.services.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Company</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerNav.company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Resources</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerNav.resources.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-[var(--color-text-muted)]">
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[var(--color-text)]">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-[var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--color-text-muted)]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
