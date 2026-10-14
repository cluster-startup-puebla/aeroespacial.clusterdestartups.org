"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ADHESION_INBOX } from "@/modules/cores/site/src/config/site";

const ORGANIZATION_TYPES = [
  "research",
  "university",
  "chamber",
  "corporate",
  "private",
  "government",
  "initiative",
] as const;

type OrganizationType = (typeof ORGANIZATION_TYPES)[number];

const FIELD_CLASS =
  "w-full rounded-md border border-line bg-elevated px-4 py-3 text-body text-ink placeholder:text-ink-muted";

type FieldErrors = Partial<
  Record<
    "organization" | "organizationType" | "representative" | "email" | "phone" | "interest" | "value" | "commitments" | "privacy",
    string
  >
>;

export function JoinForm() {
  const t = useTranslations("Join");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentTo, setSentTo] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const organization = String(data.get("organization") ?? "").trim();
    const organizationType = String(data.get("organizationType") ?? "").trim();
    const representative = String(data.get("representative") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    const commitments = String(data.get("commitments") ?? "").trim();
    const privacy = data.get("privacy") === "on";

    const nextErrors: FieldErrors = {};
    if (organization.length < 2) nextErrors.organization = t("required");
    if (!ORGANIZATION_TYPES.includes(organizationType as OrganizationType)) {
      nextErrors.organizationType = t("required");
    }
    if (representative.length < 2) nextErrors.representative = t("required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("emailInvalid");
    if (phone.replace(/\D/g, "").length < 8) nextErrors.phone = t("phoneInvalid");
    if (interest.length < 20) nextErrors.interest = t("short");
    if (value.length < 20) nextErrors.value = t("short");
    if (commitments.length < 20) nextErrors.commitments = t("short");
    if (!privacy) nextErrors.privacy = t("privacyRequired");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const type = organizationType as OrganizationType;
    const typeLabel = t(`types.${type}`);
    const instructions = [
      t("mail.greeting", { name: representative }),
      "",
      t("mail.intro", { organization }),
      "",
      t("mail.deadline"),
      "",
      t("mail.addressed"),
      t("mail.addressee"),
      "",
      t("mail.formatTitle"),
      t("mail.format"),
      "",
      t("mail.draftTitle"),
      `${t("organization")}: ${organization}`,
      `${t("organizationType")}: ${typeLabel}`,
      `${t("representative")}: ${representative}`,
      `${t("interest")}: ${interest}`,
      `${t("value")}: ${value}`,
      `${t("commitments")}: ${commitments}`,
      "",
      t("mail.signoff"),
    ].join("\n");

    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${ADHESION_INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Adhesión al Pacto — ${organization}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
          _autoresponse: instructions,
          email,
          Organización: organization,
          "Tipo de organización": typeLabel,
          Representante: representative,
          Correo: email,
          Teléfono: phone,
          "Por qué se suman": interest,
          "Valor que aportan": value,
          Compromisos: commitments,
          "Aviso de privacidad": "Aceptado",
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      const success = response.ok && (result?.success === true || result?.success === "true");
      if (!success) {
        setStatus("error");
        return;
      }
      setSentTo(email);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="container-site max-w-3xl py-16 lg:py-24">
      <p className="text-micro font-medium uppercase tracking-[0.14em] text-ink-muted">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-h1 text-ink">{status === "sent" ? t("sentTitle") : t("title")}</h1>
      {status === "sent" ? (
        <p className="mt-6 text-body-lg text-ink-secondary">{t("sentBody", { email: sentTo })}</p>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
          <p className="text-body-lg text-ink-secondary">{t("intro")}</p>
          <Field label={t("organization")} error={errors.organization}>
            <input name="organization" autoComplete="organization" className={FIELD_CLASS} />
          </Field>
          <Field label={t("organizationType")} error={errors.organizationType}>
            <select name="organizationType" defaultValue="" className={FIELD_CLASS}>
              <option value="" disabled>
                {t("organizationTypePlaceholder")}
              </option>
              {ORGANIZATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`types.${type}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("representative")} error={errors.representative}>
            <input name="representative" autoComplete="name" className={FIELD_CLASS} />
          </Field>
          <Field label={t("email")} error={errors.email}>
            <input name="email" type="email" autoComplete="email" className={FIELD_CLASS} />
          </Field>
          <Field label={t("phone")} error={errors.phone}>
            <input name="phone" type="tel" autoComplete="tel" className={FIELD_CLASS} />
          </Field>
          <Field label={t("interest")} error={errors.interest}>
            <textarea name="interest" rows={4} className={FIELD_CLASS} />
          </Field>
          <Field label={t("value")} error={errors.value}>
            <textarea name="value" rows={4} className={FIELD_CLASS} />
          </Field>
          <Field label={t("commitments")} error={errors.commitments}>
            <textarea name="commitments" rows={4} className={FIELD_CLASS} />
          </Field>
          <div>
            <label className="flex items-start gap-3 text-small text-ink">
              <input name="privacy" type="checkbox" className="mt-1 size-4 accent-accent" />
              <span>
                {t("privacy")}{" "}
                <Link
                  href="/aviso-de-privacidad"
                  target="_blank"
                  rel="noreferrer"
                  className="text-link underline underline-offset-4"
                >
                  {t("privacyLink")}
                </Link>
              </span>
            </label>
            {errors.privacy ? <p className="mt-2 text-small text-ink">{errors.privacy}</p> : null}
          </div>
          {status === "error" ? <p className="text-small text-ink">{t("error")}</p> : null}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex rounded-full bg-accent px-5 py-3 text-small font-medium text-on-accent hover:bg-accent-hover disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("submit")}
          </button>
        </form>
      )}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-small font-medium text-ink">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-2 block text-small text-ink">{error}</span> : null}
    </label>
  );
}
