"use client";

import { Link, usePathname } from "@/modules/cores/i18n/src/config/routing";

type PactCtasProps = {
  primary: string;
  secondary?: string;
  size?: "default" | "compact";
};

const SIZE_CLASS = {
  default: "px-5 py-3 text-small",
  compact: "px-4 py-2 text-small",
} as const;

export function PactCtas({ primary, secondary, size = "default" }: PactCtasProps) {
  const sizeClass = SIZE_CLASS[size];
  const pathname = usePathname();
  const onForm = pathname.replace(/\/$/, "") === "/formulario";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {onForm ? null : (
        <Link
          href="/formulario"
          className={`inline-flex rounded-full bg-accent font-medium text-on-accent hover:bg-accent-hover ${sizeClass}`}
        >
          {primary}
        </Link>
      )}
      {secondary ? (
        <Link
          href="/manifiesto"
          className={`inline-flex rounded-full border border-line font-medium text-ink hover:bg-surface-subtle ${sizeClass}`}
        >
          {secondary}
        </Link>
      ) : null}
    </div>
  );
}
