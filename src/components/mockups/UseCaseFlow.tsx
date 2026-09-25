import {
  User,
  MessageSquare,
  FileImage,
  Sparkles,
  ListTree,
  CheckCircle2,
  Scale,
  Calculator,
  FileText,
  Database,
  UserCheck,
  ScrollText,
  Gauge,
  Lock,
  Ruler,
  Radar,
  FileSearch,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: User, label: "Cliente" },
  { icon: MessageSquare, label: "WhatsApp" },
  { icon: FileImage, label: "Documento / imagem" },
  { icon: Sparkles, label: "IA multimodal", ai: true },
  { icon: ListTree, label: "Extração", ai: true },
  { icon: CheckCircle2, label: "Validação", gate: true },
  { icon: Scale, label: "Regras determinísticas" },
  { icon: Calculator, label: "Cálculo" },
  { icon: FileText, label: "Proposta", ai: true },
  { icon: Database, label: "CRM" },
  { icon: UserCheck, label: "Humano quando necessário", gate: true },
];

const governance = [
  { icon: ScrollText, label: "Logs" },
  { icon: CheckCircle2, label: "Validação" },
  { icon: Gauge, label: "Confidence score" },
  { icon: UserCheck, label: "Human-in-the-loop" },
  { icon: Lock, label: "Segurança" },
  { icon: Ruler, label: "Limites" },
  { icon: Radar, label: "Monitoramento" },
  { icon: FileSearch, label: "Auditoria" },
];

export function UseCaseFlow({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Camada de governança (moldura) */}
      <div className="rounded-3xl border border-brand-500/25 bg-brand-500/[0.03] p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-300">
            <ShieldCheck className="size-4" aria-hidden /> Governance layer
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {governance.map((g) => (
              <li
                key={g.label}
                className="inline-flex items-center gap-1.5 rounded-md border border-brand-500/20 bg-bg/60 px-2 py-1 text-[11px] text-fg-muted"
              >
                <g.icon className="size-3 text-brand-300" aria-hidden />
                {g.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Fluxo */}
        <ol className="window grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:p-4 lg:grid-cols-6 xl:grid-cols-11 xl:gap-1.5">
          {steps.map((s, i) => (
            <li key={s.label} className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex w-full flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center",
                  s.ai
                    ? "border-brand-500/35 bg-brand-500/10"
                    : s.gate
                      ? "border-ok/35 bg-ok/[0.08]"
                      : "border-line bg-white/[0.02]",
                )}
              >
                <s.icon
                  className={cn(
                    "size-4.5",
                    s.ai ? "text-brand-300" : s.gate ? "text-ok" : "text-fg-muted",
                  )}
                  aria-hidden
                />
                <span className="text-[11px] leading-tight text-fg">{s.label}</span>
                {s.ai && (
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-brand-300">
                    AI
                  </span>
                )}
                {s.gate && (
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-ok">
                    gate
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <svg
                  aria-hidden
                  className="absolute -right-2 top-1/2 hidden h-3 w-3 -translate-y-1/2 text-fg-subtle xl:block"
                  viewBox="0 0 12 12"
                >
                  <path d="M2 6h8m0 0L7 3m3 3-3 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-3 grid gap-2 px-1 sm:grid-cols-3">
          {[
            { k: "Age sozinha", v: "confidence ≥ 0,90 · valor ≤ R$ 50k · dados completos", tone: "text-ok" },
            { k: "Pede confirmação", v: "confidence 0,75–0,90 · campos ambíguos", tone: "text-warn" },
            { k: "Escala para humano", v: "confidence < 0,75 · valor > R$ 50k · exceção de regra", tone: "text-danger" },
          ].map((r) => (
            <div key={r.k} className="rounded-lg border border-line bg-bg/60 px-3 py-2">
              <p className={cn("font-mono text-[10px] uppercase tracking-[0.14em]", r.tone)}>{r.k}</p>
              <p className="mt-0.5 text-[11.5px] text-fg-muted">{r.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
