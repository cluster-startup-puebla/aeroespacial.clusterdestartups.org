import { Button } from "@/modules/shared/ui/src/components";

interface ClosingCtaProps {
  title: string;
  description: string;
  cta: string;
  href: string;
}

export function ClosingCta({ title, description, cta, href }: ClosingCtaProps) {
  return (
    <section className="container-site py-16 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-8 rounded-lg border border-line bg-surface-subtle p-8 lg:flex-row lg:items-center lg:p-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-ink">{title}</h2>
          <p className="mt-4 text-body-lg text-ink-secondary">{description}</p>
        </div>
        <Button href={href} className="shrink-0">
          {cta}
        </Button>
      </div>
    </section>
  );
}
