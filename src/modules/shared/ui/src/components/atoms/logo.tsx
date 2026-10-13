interface LogoProps {
  label: string;
  className?: string;
  /** Phone wordmark. Desktop stays at the heading size. */
  compact?: boolean;
  /** Diamond only. The name stays available to assistive tech. */
  markOnly?: boolean;
}

export function Logo({ label, className = "", compact = false, markOnly = false }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center font-display font-bold text-ink ${
        compact
          ? "gap-1.5 text-small leading-none tracking-tight lg:gap-2 lg:text-h4 lg:leading-[1.3] lg:tracking-normal"
          : "gap-2 text-h4"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block rotate-45 rounded-[2px] bg-brand ${
          compact ? "h-2 w-2 lg:h-3 lg:w-3" : "h-3 w-3"
        }`}
      />
      {markOnly ? <span className="sr-only">{label}</span> : label}
    </span>
  );
}
