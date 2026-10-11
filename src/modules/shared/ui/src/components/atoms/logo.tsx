interface LogoProps {
  label: string;
  className?: string;
}

export function Logo({ label, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-h4 font-bold text-ink ${className}`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-3 w-3 rotate-45 rounded-[2px] bg-brand"
      />
      {label}
    </span>
  );
}
