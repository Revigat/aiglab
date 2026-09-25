import { AlertTriangle, ArrowDownRight, ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

/** Série demonstrativa: qualidade de resposta (%) nos últimos 30 dias, com drift no final. */
const series = [
  94, 95, 94, 96, 95, 95, 96, 94, 95, 96, 95, 94, 95, 95, 96, 95, 94, 95, 96, 95, 94, 92, 91, 90, 88,
  87, 86, 84, 83, 82,
];

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 320;
  const h = 80;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  const changeIdx = 21;
  const [cx, cy] = pts[changeIdx];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-24 w-full", className)} aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1="0" x2={w} y1={h * p} y2={h * p} className="stroke-white/[0.06]" strokeDasharray="2 4" />
      ))}
      <path d={area} fill="url(#sparkFill)" />
      <path d={path} fill="none" className="stroke-brand-400" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
      <line x1={cx} x2={cx} y1="0" y2={h} className="stroke-warn/70" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      <circle cx={cx} cy={cy} r="3" className="fill-warn" />
    </svg>
  );
}

const streams = [
  { label: "Modelos", value: "18", delta: "+1", up: true },
  { label: "Prompts", value: "342", delta: "+27", up: true },
  { label: "Agentes", value: "12", delta: "0", up: true },
  { label: "APIs", value: "31", delta: "-2", up: false },
  { label: "Fornecedores", value: "7", delta: "+1", up: true },
  { label: "Acessos", value: "1.2k", delta: "+8%", up: true },
];

const events = [
  {
    t: "há 2h",
    icon: AlertTriangle,
    tone: "text-danger",
    title: "Incidente · AI FINANCE",
    desc: "Decisão automatizada fora do limite aprovado. Escalado para humano.",
    tag: { label: "INCIDENT", status: "danger" as const },
  },
  {
    t: "há 6h",
    icon: GitCommitHorizontal,
    tone: "text-warn",
    title: "Mudança de modelo · AI HR",
    desc: "Fornecedor atualizou versão sem aviso. Reavaliação disparada.",
    tag: { label: "MODEL CHANGE", status: "warn" as const },
  },
  {
    t: "há 1d",
    icon: ArrowDownRight,
    tone: "text-warn",
    title: "Drift de qualidade · CUSTOMER BOT",
    desc: "Taxa de respostas válidas caiu de 95% para 82% em 9 dias.",
    tag: { label: "DRIFT", status: "warn" as const },
  },
];

export function MonitoringDashboard({ className }: { className?: string }) {
  return (
    <WindowFrame title="Continuous Monitoring" className={className}>
      <div className="grid gap-4 p-4 sm:p-5 @3xl:grid-cols-[1.35fr_1fr]">
        <div className="grid gap-3">
          <div className="rounded-xl border border-line bg-white/[0.02] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                  Qualidade de resposta · CUSTOMER BOT · 30d
                </p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-semibold text-fg">82%</span>
                  <span className="flex items-center gap-1 text-xs text-warn">
                    <ArrowDownRight className="size-3.5" aria-hidden /> -13 pts
                  </span>
                </p>
              </div>
              <Badge status="warn">drift detected</Badge>
            </div>
            <Sparkline data={series} className="mt-3" />
            <p className="mt-1 text-[11px] text-fg-subtle">
              Linha tracejada: alteração de versão do modelo pelo fornecedor (dia 22).
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {streams.map((s) => (
              <div key={s.label} className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-2">
                <p className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-fg-subtle">
                  {s.label}
                </p>
                <p className="mt-0.5 flex items-baseline gap-1">
                  <span className="font-mono text-sm font-semibold text-fg">{s.value}</span>
                  <span className={cn("flex items-center text-[10px]", s.up ? "text-ok" : "text-fg-muted")}>
                    {s.up ? <ArrowUpRight className="size-3" aria-hidden /> : <ArrowDownRight className="size-3" aria-hidden />}
                    {s.delta}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
              Eventos recentes
            </p>
            <span className="font-mono text-[10px] text-fg-subtle">3 de 41</span>
          </div>
          <ul className="grid gap-2.5">
            {events.map((e) => (
              <li key={e.title} className="flex gap-3 rounded-lg border border-line/60 p-3">
                <e.icon className={cn("mt-0.5 size-4 shrink-0", e.tone)} aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <p className="text-[12.5px] font-medium text-fg">{e.title}</p>
                    <span className="font-mono text-[10px] text-fg-subtle">{e.t}</span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-fg-muted">{e.desc}</p>
                  <div className="mt-1.5">
                    <Badge status={e.tag.status} dot={false}>
                      {e.tag.label}
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
}
