import { Badge, type Status } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

const findings: {
  id: string;
  sev: Status;
  sevLabel: string;
  title: string;
  system: string;
  ref: string;
  status: string;
}[] = [
  { id: "F-01", sev: "danger", sevLabel: "critical", title: "Agente com permissão de escrita irrestrita no CRM", system: "AI SDR", ref: "OWASP LLM06 · ISO 42001 A.6", status: "open" },
  { id: "F-02", sev: "danger", sevLabel: "high", title: "Decisão automatizada sem revisão humana e sem log", system: "AI HR", ref: "LGPD art. 20 · NIST MG-2", status: "in progress" },
  { id: "F-03", sev: "warn", sevLabel: "medium", title: "Dados pessoais enviados a fornecedor sem cláusula de uso", system: "AI FINANCE", ref: "LGPD art. 7 · ISO 42001 A.10", status: "open" },
  { id: "F-04", sev: "warn", sevLabel: "medium", title: "Sem detecção de mudança de versão do modelo", system: "CUSTOMER BOT", ref: "NIST MS-2 · ISO 23894", status: "open" },
  { id: "F-05", sev: "ok", sevLabel: "low", title: "Documentação técnica incompleta (system card)", system: "AI SDR", ref: "ISO 42001 A.7", status: "resolved" },
];

const summary = [
  { label: "Controles testados", value: "38" },
  { label: "Funcionando", value: "27", tone: "text-ok" },
  { label: "Parciais", value: "6", tone: "text-warn" },
  { label: "Ausentes", value: "5", tone: "text-danger" },
];

export function AuditFindings({ className }: { className?: string }) {
  return (
    <WindowFrame title="Audit · Findings" className={className}>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label} className="rounded-lg border border-line bg-white/[0.02] px-3 py-2.5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle">{s.label}</p>
              <p className={cn("mt-1 font-mono text-xl font-semibold", s.tone ?? "text-fg")}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-line bg-white/[0.02]">
          <div className="grid grid-cols-[52px_1fr_84px] items-center gap-2 border-b border-line px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle @2xl:grid-cols-[52px_1fr_110px_90px]">
            <span>ID</span>
            <span>Finding</span>
            <span className="hidden @2xl:block">System</span>
            <span>Status</span>
          </div>
          <ul>
            {findings.map((f) => (
              <li key={f.id} className="grid grid-cols-[52px_1fr_84px] items-center gap-2 border-b border-line/60 px-3.5 py-2.5 last:border-0 @2xl:grid-cols-[52px_1fr_110px_90px]">
                <span className="font-mono text-[11px] text-fg-subtle">{f.id}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge status={f.sev} dot={false}>{f.sevLabel}</Badge>
                    <p className="truncate text-[12.5px] font-medium text-fg">{f.title}</p>
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-fg-subtle">{f.ref}</p>
                </div>
                <span className="hidden truncate text-[12px] text-fg-muted @2xl:block">{f.system}</span>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider",
                    f.status === "resolved" ? "text-ok" : f.status === "in progress" ? "text-brand-300" : "text-warn",
                  )}
                >
                  {f.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
}
