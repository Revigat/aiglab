"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bot,
  FileCheck2,
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Boxes,
  Radar,
  Search,
  Wrench,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Badge, riskToStatus, type Status } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { WindowFrame } from "./WindowFrame";

/* ----------------------------------------------------------------------------
 * Cenário demonstrativo em loop (~32s):
 *  1. estado inicial
 *  2. novo sistema descoberto (PRICING ENGINE) -> em avaliação
 *  3. avaliado como HIGH RISK
 *  4. AI HR remediado -> CONTROLLED, evidências geradas
 *  5. incidente em AI FINANCE
 *  6. incidente tratado; PRICING ENGINE controlado
 *  -> volta ao início
 * Todos os dados são fictícios.
 * -------------------------------------------------------------------------- */

type SystemRow = {
  name: string;
  type: string;
  owner: string;
  risk: string;
  status: "CONTROLLED" | "ATTENTION" | "EVALUATING" | "INCIDENT";
};

type Snapshot = {
  systems: number;
  systemsSub: string;
  highRisk: number;
  highRiskSub: string;
  openIssues: number;
  openIssuesSub: string;
  incidents: number;
  incidentsSub: string;
  score: number;
  scoreSub: string;
  agentsActive: number;
  agentsReview: number;
  controlsPct: number;
  evidence: number;
  lastIncident: string;
  rows: SystemRow[];
  event: { icon: typeof Search; tone: Status; text: string } | null;
};

const baseRows: SystemRow[] = [
  { name: "AI SDR", type: "Agente", owner: "Comercial", risk: "MEDIUM", status: "CONTROLLED" },
  { name: "AI HR", type: "Decisão", owner: "RH", risk: "HIGH", status: "ATTENTION" },
  { name: "AI FINANCE", type: "Modelo", owner: "Finanças", risk: "HIGH", status: "ATTENTION" },
  { name: "CUSTOMER BOT", type: "Chatbot", owner: "Atendimento", risk: "LOW", status: "CONTROLLED" },
];

const pricing = (risk: string, status: SystemRow["status"]): SystemRow => ({
  name: "PRICING ENGINE",
  type: "Modelo",
  owner: "Varejo",
  risk,
  status,
});

const withRow = (rows: SystemRow[], name: string, patch: Partial<SystemRow>) =>
  rows.map((r) => (r.name === name ? { ...r, ...patch } : r));

const s0: Snapshot = {
  systems: 47,
  systemsSub: "+3 esta semana",
  highRisk: 5,
  highRiskSub: "2 sem controle",
  openIssues: 8,
  openIssuesSub: "3 vencendo",
  incidents: 2,
  incidentsSub: "último há 2h",
  score: 82,
  scoreSub: "Controles ativos em 42 de 47 sistemas.",
  agentsActive: 12,
  agentsReview: 3,
  controlsPct: 98,
  evidence: 156,
  lastIncident: "2h ago",
  rows: baseRows,
  event: null,
};

const s1: Snapshot = {
  ...s0,
  systems: 48,
  systemsSub: "+4 esta semana · 1 novo",
  openIssues: 9,
  openIssuesSub: "1 avaliação pendente",
  rows: [pricing("—", "EVALUATING"), ...baseRows],
  event: { icon: Search, tone: "info", text: "Novo sistema detectado: PRICING ENGINE (API externa)" },
};

const s2: Snapshot = {
  ...s1,
  highRisk: 6,
  highRiskSub: "3 sem controle",
  score: 79,
  scoreSub: "Controles ativos em 42 de 48 sistemas.",
  rows: [pricing("HIGH", "ATTENTION"), ...baseRows],
  event: { icon: ShieldAlert, tone: "warn", text: "Risk Engine: PRICING ENGINE classificado HIGH (dados pessoais + decisão automática)" },
};

const s3: Snapshot = {
  ...s2,
  openIssues: 7,
  openIssuesSub: "2 vencendo",
  highRiskSub: "2 sem controle",
  score: 84,
  scoreSub: "Controles ativos em 44 de 48 sistemas.",
  agentsReview: 2,
  evidence: 159,
  rows: withRow(s2.rows, "AI HR", { status: "CONTROLLED" }),
  event: { icon: BadgeCheck, tone: "ok", text: "AI HR: revisão humana + log de decisão verificados · 3 evidências geradas" },
};

const s4: Snapshot = {
  ...s3,
  incidents: 3,
  incidentsSub: "último agora",
  controlsPct: 96,
  score: 81,
  lastIncident: "agora",
  rows: withRow(s3.rows, "AI FINANCE", { status: "INCIDENT" }),
  event: { icon: Siren, tone: "danger", text: "Incidente: AI FINANCE decidiu fora do limite aprovado · escalado ao owner" },
};

const s5: Snapshot = {
  ...s4,
  highRisk: 5,
  highRiskSub: "1 sem controle",
  openIssues: 6,
  openIssuesSub: "1 vencendo",
  incidentsSub: "1 em tratamento",
  controlsPct: 98,
  score: 88,
  scoreSub: "Controles ativos em 46 de 48 sistemas.",
  evidence: 163,
  lastIncident: "4m ago",
  rows: withRow(withRow(s4.rows, "AI FINANCE", { status: "ATTENTION" }), "PRICING ENGINE", { status: "CONTROLLED" }),
  event: { icon: Wrench, tone: "ok", text: "PRICING ENGINE: limites e HITL implementados · status CONTROLLED" },
};

const scenario: Snapshot[] = [s0, s1, s2, s3, s4, s5];
const STEP_MS = 5200;

/* ------------------------------ hooks ------------------------------------ */

function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduced || from === target) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* --------------------------- subcomponentes ------------------------------ */

const sidebar = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Boxes, label: "AI Inventory" },
  { icon: ShieldAlert, label: "Risk Engine" },
  { icon: Bot, label: "Agents" },
  { icon: Radar, label: "Monitoring" },
  { icon: Siren, label: "Incidents" },
  { icon: FileCheck2, label: "Evidence" },
];

function ScoreRing({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative grid size-24 place-items-center">
      <svg viewBox="0 0 80 80" className="size-24 -rotate-90" aria-hidden>
        <circle cx="40" cy="40" r={r} className="stroke-white/10" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={r}
          className="stroke-brand-400 transition-[stroke-dashoffset] duration-700 ease-out"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-mono text-2xl font-semibold leading-none text-fg tabular-nums">{value}</p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-fg-subtle">/ 100</p>
        </div>
      </div>
    </div>
  );
}

function LiveMetric({
  label,
  value,
  tone,
  sub,
}: {
  label: string;
  value: number;
  tone: "neutral" | "ok" | "warn" | "danger" | "brand";
  sub: string;
}) {
  const v = useAnimatedNumber(value);
  const color = {
    neutral: "text-fg",
    ok: "text-ok",
    warn: "text-warn",
    danger: "text-danger",
    brand: "text-brand-300",
  }[tone];
  return (
    <div className="rounded-xl border border-line bg-white/[0.02] p-3.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
      <p className={cn("mt-1.5 font-mono text-2xl font-semibold tabular-nums leading-none", color)}>{v}</p>
      <p key={sub} className="mt-1.5 text-[11px] text-fg-muted animate-fade-in">
        {sub}
      </p>
    </div>
  );
}

const statusBadge: Record<SystemRow["status"], { status: Status; label: string; dotCls: string }> = {
  CONTROLLED: { status: "ok", label: "CONTROLLED", dotCls: "bg-ok" },
  ATTENTION: { status: "warn", label: "ATTENTION", dotCls: "bg-warn" },
  EVALUATING: { status: "info", label: "EVALUATING", dotCls: "bg-info animate-pulse-soft" },
  INCIDENT: { status: "danger", label: "INCIDENT", dotCls: "bg-danger animate-pulse-soft" },
};

/* ------------------------------- principal ------------------------------- */

export function ControlCenter({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const snap = scenario[step];

  // Avança o cenário apenas quando visível e com a aba ativa
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting && !document.hidden), {
      threshold: 0.2,
    });
    io.observe(el);
    const onVis = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % scenario.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const score = useAnimatedNumber(snap.score);
  const evidence = useAnimatedNumber(snap.evidence);
  const agentsActive = useAnimatedNumber(snap.agentsActive);
  const agentsReview = useAnimatedNumber(snap.agentsReview);
  const controlsPct = useAnimatedNumber(snap.controlsPct);

  return (
    <div ref={rootRef}>
      <WindowFrame
        title="AI Governance Control Center"
        className={className}
        badge={
          <span className="hidden items-center gap-1.5 rounded border border-ok/30 bg-ok/10 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-ok @2xl:inline-flex">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" aria-hidden />
            live
          </span>
        }
      >
        <div className="grid min-h-[420px] grid-cols-[52px_1fr] @2xl:grid-cols-[168px_1fr]">
          {/* Sidebar */}
          <aside className="flex flex-col border-r border-line bg-white/[0.015] py-3">
            <ul className="grid gap-0.5 px-2">
              {sidebar.map(({ icon: Icon, label, active }) => {
                const hasDot =
                  (label === "Incidents" && snap.incidents > 2) ||
                  (label === "AI Inventory" && snap.systems > 47);
                return (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[12px]",
                      active ? "bg-brand-500/15 text-brand-300" : "text-fg-muted",
                    )}
                  >
                    <Icon className="size-3.5 shrink-0" aria-hidden />
                    <span className="hidden flex-1 truncate @2xl:inline">{label}</span>
                    {hasDot && (
                      <span
                        aria-hidden
                        className={cn(
                          "hidden size-1.5 rounded-full @2xl:block",
                          label === "Incidents" ? "bg-danger" : "bg-brand-400",
                        )}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Feed de eventos (ao vivo) */}
            <div className="mt-auto hidden px-3 pt-4 @2xl:block">
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-subtle">
                <Activity className="size-3" aria-hidden /> Live events
              </p>
              <div className="min-h-[92px]">
                {snap.event ? (
                  <div
                    key={step}
                    className={cn(
                      "rounded-lg border p-2.5 animate-fade-in",
                      snap.event.tone === "ok" && "border-ok/30 bg-ok/[0.06]",
                      snap.event.tone === "warn" && "border-warn/30 bg-warn/[0.06]",
                      snap.event.tone === "danger" && "border-danger/30 bg-danger/[0.06]",
                      snap.event.tone === "info" && "border-brand-500/30 bg-brand-500/[0.08]",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <snap.event.icon
                        className={cn(
                          "mt-px size-3.5 shrink-0",
                          snap.event.tone === "ok" && "text-ok",
                          snap.event.tone === "warn" && "text-warn",
                          snap.event.tone === "danger" && "text-danger",
                          snap.event.tone === "info" && "text-brand-300",
                        )}
                        aria-hidden
                      />
                      <p className="text-[10.5px] leading-snug text-fg-muted">{snap.event.text}</p>
                    </div>
                  </div>
                ) : (
                  <div key="idle" className="rounded-lg border border-line p-2.5 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-px size-3.5 shrink-0 text-fg-subtle" aria-hidden />
                      <p className="text-[10.5px] leading-snug text-fg-subtle">
                        Monitoramento ativo. Nenhum evento novo nos últimos 12 min.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* progresso do ciclo */}
              <ol className="mt-2.5 flex gap-1" aria-hidden>
                {scenario.map((_, i) => (
                  <li
                    key={i}
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-500",
                      i === step ? "bg-brand-400" : i < step ? "bg-brand-400/40" : "bg-white/10",
                    )}
                  />
                ))}
              </ol>
            </div>
          </aside>

          {/* Main */}
          <div className="relative p-4 sm:p-5">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden opacity-40">
              <div className="h-24 w-full animate-scan bg-gradient-to-b from-transparent via-brand-400/10 to-transparent" />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">Organization</p>
                <p className="text-sm font-medium text-fg">Acme Enterprise · Produção</p>
              </div>
              <div className="hidden items-center gap-2 @2xl:flex">
                <Badge status={controlsPct >= 98 ? "ok" : "warn"}>
                  <span className="tabular-nums">{controlsPct}%</span> monitored
                </Badge>
                <Badge status="neutral">
                  <span className="tabular-nums">{evidence}</span> evidence
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <LiveMetric label="AI Systems" value={snap.systems} tone="brand" sub={snap.systemsSub} />
              <LiveMetric label="High Risk" value={snap.highRisk} tone="danger" sub={snap.highRiskSub} />
              <LiveMetric label="Open Issues" value={snap.openIssues} tone="warn" sub={snap.openIssuesSub} />
              <LiveMetric
                label="Incidents"
                value={snap.incidents}
                tone={snap.incidents > 2 ? "danger" : "neutral"}
                sub={snap.incidentsSub}
              />
            </div>

            <div className="mt-3 grid gap-3 @3xl:grid-cols-[1fr_200px]">
              {/* Tabela de sistemas */}
              <div className="rounded-xl border border-line bg-white/[0.02]">
                <div className="grid grid-cols-[1fr_100px] items-center gap-2 border-b border-line px-3.5 py-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-subtle @2xl:grid-cols-[1fr_80px_84px_100px]">
                  <span>System</span>
                  <span className="hidden @2xl:block">Owner</span>
                  <span className="hidden @2xl:block">Risk</span>
                  <span>Status</span>
                </div>
                <ul>
                  {snap.rows.map((s) => {
                    const b = statusBadge[s.status];
                    return (
                      <li
                        key={s.name}
                        className={cn(
                          "grid grid-cols-[1fr_100px] items-center gap-2 border-b border-line/60 px-3.5 py-2.5 text-[12px] transition-colors duration-500 last:border-0 @2xl:grid-cols-[1fr_80px_84px_100px]",
                          s.status === "INCIDENT" && "bg-danger/[0.05]",
                          s.status === "EVALUATING" && "bg-brand-500/[0.05]",
                        )}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", b.dotCls)} />
                          <span className="truncate font-medium text-fg">{s.name}</span>
                          <span className="hidden text-[10px] text-fg-subtle @3xl:inline">{s.type}</span>
                        </span>
                        <span className="hidden truncate text-fg-muted @2xl:block">{s.owner}</span>
                        <span className="hidden @2xl:contents">
                          {s.risk === "—" ? (
                            <Badge status="neutral" dot={false}>
                              <span className="animate-pulse-soft">scanning</span>
                            </Badge>
                          ) : (
                            <Badge status={riskToStatus(s.risk)} dot={false}>
                              {s.risk}
                            </Badge>
                          )}
                        </span>
                        <Badge status={b.status}>{b.label}</Badge>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Score + agentes */}
              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3.5">
                  <ScoreRing value={score} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">AI Risk Score</p>
                    <p key={snap.scoreSub} className="mt-1 text-xs leading-snug text-fg-muted animate-fade-in">
                      {snap.scoreSub}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-line bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Agents</p>
                    <Bot className="size-3.5 text-fg-subtle" aria-hidden />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-xl font-semibold text-fg tabular-nums">{agentsActive}</span>
                    <span className="text-[11px] text-fg-muted">active</span>
                  </div>
                  <div className={cn("mt-1 flex items-center gap-1.5 text-[11px]", agentsReview > 0 ? "text-warn" : "text-ok")}>
                    {agentsReview > 0 ? (
                      <>
                        <ShieldAlert className="size-3" aria-hidden /> <span className="tabular-nums">{agentsReview}</span> need review
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-3" aria-hidden /> all reviewed
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé de indicadores */}
            <div className="mt-3 grid gap-2.5 @xl:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  label: "Controls",
                  value: `${controlsPct}% monitored`,
                  tone: controlsPct >= 98 ? "text-ok" : "text-warn",
                },
                { icon: FileCheck2, label: "Evidence", value: `${evidence} available`, tone: "text-brand-300" },
                {
                  icon: Activity,
                  label: "Last incident",
                  value: snap.lastIncident,
                  tone: snap.lastIncident === "agora" ? "text-danger" : "text-fg",
                },
              ].map(({ icon: Icon, label, value, tone }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-lg border border-line bg-white/[0.02] px-3 py-2">
                  <Icon className={cn("size-3.5 shrink-0 transition-colors duration-500", tone)} aria-hidden />
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
                    <p className={cn("truncate text-[11.5px] font-medium tabular-nums transition-colors duration-500", tone)}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WindowFrame>
    </div>
  );
}
