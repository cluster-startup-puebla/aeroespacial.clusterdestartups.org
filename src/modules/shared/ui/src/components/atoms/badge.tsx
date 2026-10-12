export function Badge({
  children,
  className = "",
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  const toneClass =
    tone === "inverse"
      ? "border-transparent bg-ink text-on-brand"
      : "border-line bg-surface-subtle text-ink-secondary";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-micro font-semibold ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
