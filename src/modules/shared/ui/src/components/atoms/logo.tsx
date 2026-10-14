interface LogoProps {
  label: string;
  className?: string;
  /** Phone wordmark. Desktop stays at the heading size. */
  compact?: boolean;
  /** Mark only. The name stays available to assistive tech. */
  markOnly?: boolean;
}

export function Logo({ label, className = "", compact = false, markOnly = false }: LogoProps) {
  const markClass = markOnly
    ? compact
      ? "h-7 w-7 lg:h-8 lg:w-8"
      : "h-8 w-8"
    : "h-6 w-6";

  return (
    <span
      className={`inline-flex items-center font-display font-bold text-ink ${
        compact
          ? "gap-1.5 text-small leading-none tracking-tight lg:gap-2 lg:text-h4 lg:leading-[1.3] lg:tracking-normal"
          : "gap-2 text-h4"
      } ${className}`}
    >
      <svg
        viewBox="0 0 256 256"
        aria-hidden="true"
        className={`shrink-0 rotate-180 fill-current ${markClass}`}
      >
        <path d="M136,160a40,40,0,1,1-40-40A40,40,0,0,1,136,160Zm74.34-37.66-48,48a8,8,0,0,0,11.32,11.32l48-48a8,8,0,0,0-11.32-11.32Zm-20.68-12.68a8,8,0,0,0-11.32-11.32l-24,24a8,8,0,0,0,11.32,11.32Zm40-51.32a8,8,0,0,0-11.32,0l-16,16a8,8,0,0,0,11.32,11.32l16-16A8,8,0,0,0,229.66,58.34ZM122.34,101.66a8,8,0,0,0,11.32,0l72-72a8,8,0,1,0-11.32-11.32l-72,72A8,8,0,0,0,122.34,101.66ZM135.6,199.6a56,56,0,0,1-79.2-79.2l82.75-82.74a8,8,0,1,0-11.32-11.32L45.09,109.09A72,72,0,1,0,146.91,210.91,8,8,0,0,0,135.6,199.6Z" />
      </svg>
      {markOnly ? <span className="sr-only">{label}</span> : label}
    </span>
  );
}
