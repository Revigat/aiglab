import {
  ClipboardCheck,
  FileSearch,
  FlaskConical,
  GitCommitHorizontal,
  ShieldCheck,
  Siren,
  Wrench,
  BadgeCheck,
} from "lucide-react";
import { Badge, type Status } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

type Ev = {
  date: string;
  icon: typeof FileSearch;
  title: string;
  desc: string;
  ref: string;
  status: Status;
  label: string;
};

const events: Ev[] = [
  {
    date: "12/03/2026",
    icon: FileSearch,
    title: "Sistema identificado no inventário",
    desc: "AI SDR registrado. Owner, finalidade, modelo e dados documentados no AI Passport.",
    ref: "EV-0001",
    status: "info",
    label: "inventory",
  },
  {
    date: "19/03/2026",
    icon: ClipboardCheck,
    title: "Risk & Impact Assessment concluído",
    desc: "Risco classificado como Médio. 6 controles obrigatórios definidos.",
    ref: "EV-0014",
    status: "warn",
    label: "assessment",
  },
  {
    date: "02/04/2026",
    icon: ShieldCheck,
    title: "Controles implementados e verificados",
    desc: "Logs, limites de ferramentas, filtro PII e human-in-the-loop ativos.",
    ref: "EV-0027",
    status: "ok",
    label: "control",
  },
  {
    date: "15/06/2026",
    icon: FlaskConical,
    title: "Avaliação de qualidade e segurança",
    desc: "412 casos de teste · 97,3% aprovação · 0 vazamentos de PII · 3 prompt injections bloqueadas.",
    ref: "EV-0063",
    status: "ok",
    label: "evaluation",
  },
  {
    date: "28/08/2026",
    icon: GitCommitHorizontal,
    title: "Mudança de modelo detectada",
    desc: "Fornecedor atualizou versão. Reavaliação automática disparada pelo monitoramento.",
    ref: "EV-0112",
    status: "warn",
    label: "monitoring",
  },
  {
    date: "29/08/2026",
    icon: Siren,
    title: "Incidente registrado",
    desc: "Queda de qualidade de 12 pts após atualização. Impacto: 38 leads reclassificados.",
    ref: "INC-0007",
    status: "danger",
    label: "incident",
  },
  {
    date: "31/08/2026",
    icon: Wrench,
    title: "Correção aplicada",
    desc: "Prompt ajustado, threshold de confiança elevado para 0.88, regressão executada.",
    ref: "EV-0118",
    status: "ok",
    label: "remediation",
  },
  {
    date: "09/09/2026",
    icon: BadgeCheck,
    title: "Reavaliação concluída · status CONTROLLED",
    desc: "Evidências consolidadas e disponíveis para auditoria interna e externa.",
    ref: "EV-0156",
    status: "ok",
    label: "evidence",
  },
];

export function EvidenceTimeline({ className }: { className?: string }) {
  return (
    <WindowFrame title="Evidence Center · AI SDR" className={className}>
      <div className="p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-fg-muted">
            Trilha completa: <span className="text-fg">156 evidências</span> · 8 marcos principais
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge status="ok">export-ready</Badge>
            <Badge status="neutral" dot={false}>
              hash verified
            </Badge>
          </div>
        </div>
        <ol className="relative grid gap-0">
          <span
            aria-hidden
            className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-brand-400/60 via-line-strong to-line"
          />
          {events.map((e, i) => (
            <li key={e.ref} className="relative flex gap-4 pb-5 last:pb-0">
              <div
                className={cn(
                  "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border bg-bg",
                  e.status === "ok" && "border-ok/40 text-ok",
                  e.status === "warn" && "border-warn/40 text-warn",
                  e.status === "danger" && "border-danger/40 text-danger",
                  e.status === "info" && "border-brand-400/40 text-brand-300",
                )}
              >
                <e.icon className="size-3.5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 rounded-xl border border-line/70 bg-white/[0.015] px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p className="text-[13px] font-medium text-fg">{e.title}</p>
                  <span className="font-mono text-[10px] text-fg-subtle">
                    {e.date} · {e.ref}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-fg-muted">{e.desc}</p>
                <div className="mt-2">
                  <Badge status={e.status} dot={false}>
                    {e.label}
                  </Badge>
                  {i === events.length - 1 && (
                    <Badge status="ok" className="ml-1.5">
                      controlled
                    </Badge>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </WindowFrame>
  );
}
