import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[#04140f] hover:bg-[var(--color-accent-strong)] shadow-[0_0_0_1px_rgba(23,201,164,0.4)]",
  secondary:
    "border border-[var(--color-border-strong)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
  ghost: "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  type?: "submit" | "button";
}) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (type) {
    return (
      <button type={type} className={classes}>
        {children}
      </button>
    );
  }

  if (!href) return null;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
