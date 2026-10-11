interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <header className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-micro font-semibold uppercase tracking-wider text-ink-muted">{eyebrow}</p>
      )}
      <Tag className={`mt-3 font-display text-ink ${Tag === "h1" ? "text-h1" : "text-h2"}`}>
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-body-lg text-ink-secondary ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
