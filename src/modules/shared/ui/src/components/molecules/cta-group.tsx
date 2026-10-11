import { Button } from "@/modules/shared/ui/src/components";

interface CtaGroupProps {
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  align?: "left" | "center";
}

export function CtaGroup({ primary, secondary, align = "left" }: CtaGroupProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${align === "center" ? "justify-center" : ""}`}>
      <Button href={primary.href}>{primary.label}</Button>
      {secondary && (
        <Button href={secondary.href} variant="secondary">
          {secondary.label}
        </Button>
      )}
    </div>
  );
}
