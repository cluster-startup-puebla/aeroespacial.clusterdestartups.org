import { CtaGroup } from "@/modules/shared/ui/src/components";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}

export function Hero({ eyebrow, title, description, primary, secondary }: HeroProps) {
  return (
    <section className="border-b border-line bg-surface-subtle py-20 lg:py-28">
      <div className="container-site">
        <p className="text-micro font-semibold uppercase tracking-wider text-ink-muted">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-display text-ink">{title}</h1>
        <p className="mt-6 max-w-2xl text-body-lg text-ink-secondary">{description}</p>
        <div className="mt-10">
          <CtaGroup primary={primary} secondary={secondary} />
        </div>
      </div>
    </section>
  );
}
