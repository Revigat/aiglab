import { Fingerprint, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { WindowFrame } from "./WindowFrame";

const fields: { label: string; value: string; tone?: "ok" | "warn" }[] = [
  { label: "Purpose", value: "Commercial lead qualification" },
  { label: "Model", value: "Multimodal LLM (fornecedor externo)" },
  { label: "Data", value: "Customer messages, contact data and documents" },
  { label: "Autonomy", value: "Moderate: executa ações com limites", tone: "warn" },
  { label: "Risk", value: "Medium", tone: "warn" },
  { label: "Human Oversight", value: "Enabled: aprovação acima de R$ 50k", tone: "ok" },
  { label: "Owner", value: "Head de Vendas · Backup: RevOps" },
  { label: "Last Evaluation", value: "09/09/2026" },
];

const controls = [
  "Logs de prompt e resposta",
  "Confidence score mínimo 0.85",
  "Limite de ferramentas: CRM, Calendário",
  "Bloqueio de dados sensíveis (PII)",
  "Revisão humana em propostas",
  "Alerta de mudança de modelo",
];

export function AIPassport({ className }: { className?: string }) {
  return (
    <WindowFrame title="AI Passport" className={className}>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-3.5">
            <div className="grid size-11 place-items-center rounded-xl border border-brand-500/30 bg-brand-500/10">
              <Fingerprint className="size-5 text-brand-300" aria-hidden />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                System ID · AIS-0042
              </p>
              <p className="text-lg font-semibold tracking-tight text-fg">AI SDR</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge status="ok" className="px-2.5 py-1 text-[11px]">
              CONTROLLED
            </Badge>
            <span className="font-mono text-[10px] text-fg-subtle">v3.2 · Produção</span>
          </div>
        </div>

        <dl className="grid gap-x-6 gap-y-3.5 py-5 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                {f.label}
              </dt>
              <dd
                className={
                  f.tone === "ok"
                    ? "mt-0.5 text-[13px] text-ok"
                    : f.tone === "warn"
                      ? "mt-0.5 text-[13px] text-warn"
                      : "mt-0.5 text-[13px] text-fg"
                }
              >
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="rounded-xl border border-line bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
              <ShieldCheck className="size-3.5 text-ok" aria-hidden /> Active controls
            </p>
            <span className="font-mono text-[10px] text-ok">6 / 6 verified</span>
          </div>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {controls.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[12px] text-fg-muted">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-ok" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
}
