import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

const rows = [
  { ref: "ISO/IEC 42001", req: "A.6.2 · Inventário e ciclo de vida de sistemas de IA", control: "AI Inventory + AI Passport", evidence: 12, status: "met" },
  { ref: "ISO/IEC 42001", req: "A.8.4 · Supervisão humana", control: "Regras HITL por sistema", evidence: 8, status: "met" },
  { ref: "NIST AI RMF", req: "MEASURE 2.7 · Segurança e resiliência", control: "Suíte de testes adversariais", evidence: 5, status: "partial" },
  { ref: "LGPD", req: "Art. 20 · Revisão de decisões automatizadas", control: "Fluxo de contestação + log de decisão", evidence: 3, status: "partial" },
  { ref: "OWASP LLM", req: "LLM06 · Excessive Agency", control: "Permissões mínimas de ferramentas", evidence: 0, status: "gap" },
  { ref: "ISO/IEC 23894", req: "6.4 · Monitoramento e revisão de riscos", control: "Monitoramento contínuo + gatilhos", evidence: 9, status: "met" },
];

const tone = {
  met: { label: "atendido", cls: "text-ok border-ok/30 bg-ok/10" },
  partial: { label: "parcial", cls: "text-warn border-warn/30 bg-warn/10" },
  gap: { label: "gap", cls: "text-danger border-danger/30 bg-danger/10" },
} as const;

export function ComplianceMap({ className }: { className?: string }) {
  return (
    <WindowFrame title="Compliance · Requirement mapping" className={className}>
      <div className="p-4 sm:p-5">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { l: "Requisitos mapeados", v: "84", c: "text-fg" },
            { l: "Atendidos com evidência", v: "61", c: "text-ok" },
            { l: "Gaps abertos", v: "9", c: "text-danger" },
          ].map((m) => (
            <div key={m.l} className="rounded-lg border border-line bg-white/[0.02] px-3 py-2.5">
              <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle">{m.l}</p>
              <p className={cn("mt-1 font-mono text-xl font-semibold", m.c)}>{m.v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-white/[0.02]">
          <div className="grid grid-cols-[1fr_72px] items-center gap-2 border-b border-line px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle @2xl:grid-cols-[110px_1fr_150px_56px_72px]">
            <span className="hidden @2xl:block">Referência</span>
            <span>Requisito</span>
            <span className="hidden @2xl:block">Controle</span>
            <span className="hidden @2xl:block">Evid.</span>
            <span>Status</span>
          </div>
          <ul>
            {rows.map((r) => (
              <li key={r.req} className="grid grid-cols-[1fr_72px] items-center gap-2 border-b border-line/60 px-3.5 py-2.5 text-[12px] last:border-0 @2xl:grid-cols-[110px_1fr_150px_56px_72px]">
                <span className="hidden font-mono text-[10.5px] text-brand-300 @2xl:block">{r.ref}</span>
                <div className="min-w-0">
                  <p className="truncate text-fg">{r.req}</p>
                  <p className="truncate font-mono text-[10px] text-fg-subtle @2xl:hidden">{r.ref} · {r.control}</p>
                </div>
                <span className="hidden truncate text-fg-muted @2xl:block">{r.control}</span>
                <span className="hidden font-mono text-fg-muted @2xl:block">{r.evidence}</span>
                <span className={cn("rounded border px-1.5 py-0.5 text-center font-mono text-[9.5px] uppercase tracking-wider", tone[r.status as keyof typeof tone].cls)}>
                  {tone[r.status as keyof typeof tone].label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
}
