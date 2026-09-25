"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { roles, validateLead, type FieldErrors, type LeadPayload, type LeadSource } from "@/lib/leads";
import { Checkbox, Input, Label, Select, Textarea } from "./Field";

/** Endpoint que recebe os leads (ex.: https://formspree.io/f/xxxx). Definido em build. */
const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

function buildMailto(p: LeadPayload) {
  const subject = `[${site.name}] ${p.topic ?? "contato"}: ${p.company}`;
  const lines = [
    `Nome: ${p.name}`,
    `Empresa: ${p.company}`,
    `Cargo: ${p.role}`,
    `E-mail: ${p.email}`,
    p.phone ? `Telefone: ${p.phone}` : "",
    p.assessment ? `Assessment: nível ${p.assessment.level} (${p.assessment.levelName}), índice ${p.assessment.score}/100` : "",
    "",
    p.message ?? "",
  ].filter((l) => l !== undefined);
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

type Props = {
  source: LeadSource;
  topic?: string;
  submitLabel?: string;
  showMessage?: boolean;
  compact?: boolean;
  assessment?: LeadPayload["assessment"];
  successTitle?: string;
  successText?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const topics = [
  { value: "diagnostico", label: "Diagnóstico de IA" },
  { value: "consultoria", label: "Consultoria + Implementação" },
  { value: "auditoria", label: "Auditoria + Compliance" },
  { value: "monitoramento", label: "Monitoramento contínuo" },
  { value: "agentes", label: "Governança de agentes" },
  { value: "plataforma", label: "Plataforma / early access" },
  { value: "outro", label: "Outro assunto" },
];

export function LeadForm({
  source,
  topic,
  submitLabel = "Solicitar diagnóstico",
  showMessage = true,
  compact = false,
  assessment,
  successTitle = "Recebemos sua solicitação.",
  successText = "Um especialista entrará em contato em até 1 dia útil pelo e-mail informado.",
}: Props) {
  const [values, setValues] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    message: "",
    topic: topic ?? "diagnostico",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof typeof values>(k: K, v: (typeof values)[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as keyof FieldErrors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    const payload: LeadPayload = { source, ...values, assessment };
    const errs = validateLead(payload);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`${source}-${first}`)?.focus();
      return;
    }
    // Honeypot: bots preenchem o campo oculto; fingimos sucesso.
    if (values.website.trim()) {
      setStatus("success");
      return;
    }
    setStatus("submitting");

    // Sem backend (site estático): envia a um endpoint configurado (Formspree, Make, Zapier, CRM)
    // ou, na ausência dele, abre o e-mail do visitante já preenchido.
    if (!LEAD_ENDPOINT) {
      window.location.href = buildMailto(payload);
      setStatus("success");
      return;
    }
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString(), page: window.location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setServerError("Não foi possível enviar agora. Tente novamente ou escreva para " + site.email + ".");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-ok/30 bg-ok/[0.06] p-6 sm:p-8"
      >
        <CheckCircle2 className="size-8 text-ok" aria-hidden />
        <p className="mt-4 text-xl font-semibold tracking-tight text-fg">{successTitle}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{successText}</p>
        <p className="mt-4 text-sm text-fg-subtle">
          Enquanto isso, você pode conhecer nossa{" "}
          <Link href="/metodologia" className="text-brand-300 underline-offset-4 hover:underline">
            metodologia
          </Link>{" "}
          ou a{" "}
          <Link href="/plataforma" className="text-brand-300 underline-offset-4 hover:underline">
            plataforma
          </Link>
          .
        </p>
      </div>
    );
  }

  const id = (k: string) => `${source}-${k}`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      {/* honeypot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor={id("name")}>Nome</Label>
          <Input
            id={id("name")}
            name="name"
            autoComplete="name"
            placeholder="Seu nome"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            error={errors.name}
            required
          />
        </div>
        <div>
          <Label htmlFor={id("company")}>Empresa</Label>
          <Input
            id={id("company")}
            name="company"
            autoComplete="organization"
            placeholder="Nome da empresa"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            error={errors.company}
            required
          />
        </div>
        <div>
          <Label htmlFor={id("role")}>Cargo</Label>
          <Select
            id={id("role")}
            name="role"
            value={values.role}
            onChange={(e) => set("role", e.target.value)}
            error={errors.role}
            required
          >
            <option value="">Selecione</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor={id("email")}>E-mail corporativo</Label>
          <Input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@empresa.com.br"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            error={errors.email}
            required
          />
        </div>
      </div>

      {showMessage && (
        <>
          <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
            <div>
              <Label htmlFor={id("topic")}>Assunto</Label>
              <Select id={id("topic")} name="topic" value={values.topic} onChange={(e) => set("topic", e.target.value)}>
                {topics.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor={id("phone")} optional>
                Telefone / WhatsApp
              </Label>
              <Input
                id={id("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+55 (11) 90000-0000"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor={id("message")} optional>
              Contexto
            </Label>
            <Textarea
              id={id("message")}
              name="message"
              placeholder="Ex.: temos ~15 sistemas com IA, incluindo 2 agentes em produção, e precisamos de inventário, avaliação de risco e evidências para auditoria."
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              error={errors.message}
            />
          </div>
        </>
      )}

      <Checkbox
        id={id("consent")}
        checked={values.consent}
        onChange={(v) => set("consent", v)}
        error={errors.consent}
      >
        Autorizo o contato por e-mail ou telefone sobre esta solicitação. Seus dados são usados apenas para
        atendê-la, conforme a LGPD.
      </Checkbox>

      {serverError && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/[0.06] px-3.5 py-2.5 text-[13px] text-danger">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden /> {serverError}
        </p>
      )}

      <div className={compact ? "flex flex-col gap-3" : "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
        <Button type="submit" size="lg" disabled={status === "submitting"} arrow={status !== "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Enviando…
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <p className="text-xs text-fg-subtle">Sem spam. Sem compromisso. Resposta em até 1 dia útil.</p>
      </div>
    </form>
  );
}
