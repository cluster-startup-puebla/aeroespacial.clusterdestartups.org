export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-surface-subtle px-2.5 py-0.5 text-micro font-semibold text-ink-secondary ${className}`}
    >
      {children}
    </span>
  );
}
