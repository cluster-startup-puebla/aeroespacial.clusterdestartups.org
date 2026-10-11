import { Link } from "@/modules/cores/i18n/src/config/routing";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:opacity-90",
  secondary: "border border-line bg-transparent text-ink hover:bg-surface-subtle",
  ghost: "bg-transparent text-ink hover:bg-surface-subtle",
};

interface ButtonProps {
  variant?: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = "primary", href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
