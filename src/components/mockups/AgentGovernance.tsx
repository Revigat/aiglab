import {
  Bot,
  Database,
  Globe,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
  Workflow,
  Wallet,
  ScrollText,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

const tools = [
  { icon: Database, name: "CRM · leitura/escrita", allowed: true },
  { icon: Mail, name: "E-mail · envio", allowed: true, note: "aprovação humana" },
  { icon: Globe, name: "APIs externas", allowed: false },
  { icon: Workflow, name: "Acionar outros agentes", allowed: false },
];

const policy = [
  { icon: UserCheck, label: "Identidade", value: "agent://sdr-01 · owner: Vendas" },
  { icon: ScrollText, label: "Propósito", value: "Qualificar leads e agendar reuniões" },
  { icon: Lock, label: "Dados", value: "Sem PII sensível · sem dados financeiros" },
  { icon: Wallet, label: "Custo", value: "Limite R$ 400/dia · atual R$ 112" },
];

export function AgentGovernance({ className }: { className?: string }) {
  return (
    <WindowFrame title="Agent Governance" className={className}>
      <div className="grid gap-4 p-4 sm:p-5 @3xl:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-line bg-white/[0.02] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg border border-brand-500/30 bg-brand-500/10">
                <Bot className="size-5 text-brand-300" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-fg">SDR Agent</p>
                <p className="font-mono text-[10px] text-fg-subtle">autonomy: moderate · v2.4</p>
              </div>
            </div>
            <Badge status="ok">governed</Badge>
          </div>

          <ul className="mt-4 grid gap-2.5">
            {policy.map((p) => (
              <li key={p.label} className="flex gap-2.5">
                <p.icon className="mt-0.5 size-3.5 shrink-0 text-fg-subtle" aria-hidden />
                <div className="min-w-0">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle">
                    {p.label}
                  </p>
                  <p className="truncate text-[12px] text-fg">{p.value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
              <span>Autonomy budget</span>
              <span className="text-fg-muted">28% usado</span>
            </div>
            <div className="bar">
              <span className="w-[28%] bg-brand-400" />
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-line bg-white/[0.02] p-4">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
              Permissões de ferramentas
            </p>
            <ul className="grid gap-1.5">
              {tools.map((t) => (
                <li
                  key={t.name}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line/60 px-3 py-2"
                >
                  <span className="flex items-center gap-2.5 text-[12px] text-fg">
                    <t.icon className="size-3.5 text-fg-subtle" aria-hidden />
                    {t.name}
                    {t.note && (
                      <span className="hidden whitespace-nowrap rounded border border-warn/30 bg-warn/10 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-warn @4xl:inline">
                        {t.note}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-wider",
                      t.allowed ? "text-ok" : "text-danger",
                    )}
                  >
                    {t.allowed ? "allowed" : "denied"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-warn/30 bg-warn/[0.06] p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium text-fg">Aprovação humana pendente</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-fg-muted">
                  O agente tentou enviar proposta de R$ 84.000 para cliente novo. Limite de autonomia:
                  R$ 50.000. Ação bloqueada e encaminhada ao owner.
                </p>
                <div className="mt-2.5 flex gap-2">
                  <span className="rounded-md bg-ok/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ok">
                    aprovar
                  </span>
                  <span className="rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                    revisar
                  </span>
                  <span className="rounded-md bg-danger/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-danger">
                    negar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
