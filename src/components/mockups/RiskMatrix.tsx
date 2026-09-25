import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

/** Matriz 5x5: probabilidade (x) × impacto (y). Sistemas posicionados de forma demonstrativa. */
const systems = [
  { name: "AI HR", p: 4, i: 5 },
  { name: "AI FINANCE", p: 4, i: 4 },
  { name: "AI SDR", p: 3, i: 3 },
  { name: "CUSTOMER BOT", p: 2, i: 2 },
  { name: "RAG INTERNO", p: 2, i: 3 },
  { name: "COPILOT DEV", p: 3, i: 2 },
];

const factors = [
  { label: "Dados pessoais / sensíveis", weight: "alto" },
  { label: "Autonomia (age sem revisão)", weight: "alto" },
  { label: "Impacto em pessoas", weight: "alto" },
  { label: "Exposição regulatória", weight: "médio" },
  { label: "Dependência de terceiro", weight: "médio" },
  { label: "Volume de decisões", weight: "médio" },
];

function cellTone(p: number, i: number) {
  const s = p * i;
  if (s >= 16) return "bg-danger/25";
  if (s >= 9) return "bg-warn/20";
  if (s >= 4) return "bg-brand-500/10";
  return "bg-white/[0.03]";
}

export function RiskMatrix({ className }: { className?: string }) {
  return (
    <WindowFrame title="Risk Engine · Heatmap" className={className}>
      <div className="grid gap-4 p-4 sm:p-5 @2xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-line bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Probabilidade × Impacto</p>
            <p className="font-mono text-[10px] text-fg-subtle">6 sistemas</p>
          </div>
          <div className="mt-3 grid grid-cols-[18px_1fr] gap-2">
            <div className="flex items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-fg-subtle">
                Impacto
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {[5, 4, 3, 2, 1].map((i) =>
                [1, 2, 3, 4, 5].map((p) => {
                  const here = systems.filter((s) => s.p === p && s.i === i);
                  return (
                    <div
                      key={`${p}-${i}`}
                      className={cn("relative aspect-square rounded-md border border-line/50", cellTone(p, i))}
                    >
                      {here.map((s, k) => (
                        <span
                          key={s.name}
                          title={s.name}
                          className="absolute inset-x-1 rounded bg-bg/90 px-1 py-0.5 text-center font-mono text-[8px] leading-tight text-fg"
                          style={{ top: `${6 + k * 42}%` }}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  );
                }),
              )}
            </div>
          </div>
          <p className="mt-2 text-right font-mono text-[9px] uppercase tracking-[0.14em] text-fg-subtle">
            Probabilidade →
          </p>
        </div>
        <div className="grid gap-3">
          <div className="rounded-xl border border-line bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Fatores de classificação</p>
            <ul className="mt-3 grid gap-2">
              {factors.map((f) => (
                <li key={f.label} className="flex items-center justify-between gap-3 text-[12px]">
                  <span className="text-fg">{f.label}</span>
                  <span className={cn("font-mono text-[10px] uppercase tracking-wider", f.weight === "alto" ? "text-danger" : "text-warn")}>
                    peso {f.weight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Distribuição</p>
            <div className="mt-3 grid gap-2">
              {[
                { l: "Alto", n: 2, w: 33, c: "bg-danger" },
                { l: "Médio", n: 3, w: 50, c: "bg-warn" },
                { l: "Baixo", n: 1, w: 17, c: "bg-ok" },
              ].map((r) => (
                <div key={r.l} className="grid grid-cols-[48px_1fr_20px] items-center gap-2 text-[11px]">
                  <span className="text-fg-muted">{r.l}</span>
                  <div className="bar">
                    <span className={r.c} style={{ width: `${r.w}%` }} />
                  </div>
                  <span className="text-right font-mono text-fg">{r.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
