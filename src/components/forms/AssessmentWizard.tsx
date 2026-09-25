"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { computeResult, questions } from "@/lib/assessment";
import { maturityLevels } from "@/config/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LeadForm } from "./LeadForm";

type Stage = "intro" | "quiz" | "result";

export function AssessmentWizard() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q = questions[index];
  const total = questions.length;
  const progress = Math.round(((index + (answers[q?.id] ? 1 : 0)) / total) * 100);
  const result = useMemo(() => (stage === "result" ? computeResult(answers) : null), [stage, answers]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [index, stage]);

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    // Avança automaticamente com pequeno atraso para feedback visual
    window.setTimeout(() => {
      if (index < total - 1) setIndex((i) => i + 1);
      else setStage("result");
    }, 220);
  }

  function reset() {
    setAnswers({});
    setIndex(0);
    setStage("intro");
  }

  if (stage === "intro") {
    return (
      <div className="window p-6 sm:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-300">
          Assessment preliminar · 17 perguntas · ~4 minutos
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          Descubra o nível de maturidade da IA na sua empresa.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
          Oito perguntas sobre exposição (o que sua IA faz e sobre quem) e nove sobre controles (o quanto
          você governa e consegue demonstrar). Resultado: nível de 0 a 5, lacunas e prioridades.
        </p>
        <ul className="mt-6 grid gap-2 text-sm text-fg-muted sm:grid-cols-3">
          {["Resultado imediato", "Sem cadastro para responder", "Diagnóstico detalhado por e-mail"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="size-4 text-ok" aria-hidden /> {t}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button size="lg" arrow onClick={() => setStage("quiz")}>
            Começar assessment
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    const selected = answers[q.id];
    return (
      <div className="window p-6 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
            Pergunta {index + 1} de {total} ·{" "}
            <span className={q.kind === "exposure" ? "text-warn" : "text-brand-300"}>
              {q.kind === "exposure" ? "exposição" : "controle"}
            </span>
          </p>
          <span className="font-mono text-[11px] text-fg-subtle">{progress}%</span>
        </div>
        <div className="bar mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Progresso do assessment">
          <span className="bg-brand-400 transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>

        <h2 ref={headingRef} tabIndex={-1} className="mt-8 text-balance text-xl font-semibold tracking-tight text-fg sm:text-2xl">
          {q.title}
        </h2>
        {q.hint && <p className="mt-2 text-sm leading-relaxed text-fg-muted">{q.hint}</p>}

        <div role="radiogroup" aria-label={q.title} className="mt-6 grid gap-2">
          {q.options.map((o) => {
            const active = selected === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => choose(o.value)}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all",
                  active
                    ? "border-brand-400/70 bg-brand-500/15 text-fg"
                    : "border-line bg-white/[0.02] text-fg-muted hover:border-line-strong hover:bg-white/[0.04] hover:text-fg",
                )}
              >
                <span>{o.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border",
                    active ? "border-brand-400 bg-brand-500" : "border-line-strong",
                  )}
                >
                  {active && <Check className="size-3 text-[#04121c]" />}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (index === 0 ? setStage("intro") : setIndex((i) => i - 1))}
          >
            <ArrowLeft className="size-4" aria-hidden /> Voltar
          </Button>
          {selected && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => (index < total - 1 ? setIndex((i) => i + 1) : setStage("result"))}
            >
              {index < total - 1 ? "Próxima" : "Ver resultado"} <ArrowRight className="size-4" aria-hidden />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // result
  const r = result!;
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="window p-6 sm:p-8 lg:col-span-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-300">
          Seu nível preliminar de maturidade em IA
        </p>
        <div className="mt-5 flex flex-wrap items-end gap-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-7xl font-semibold leading-none text-fg">{r.level}</span>
            <span className="font-mono text-2xl text-fg-subtle">/ 5</span>
          </div>
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              {r.levelName}
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Índice de controle {r.score}/100 · Exposição {r.exposure}/100
            </p>
          </div>
        </div>

        <ol className="mt-6 grid grid-cols-6 gap-1.5" aria-label="Escala de maturidade">
          {maturityLevels.map((l) => (
            <li
              key={l.level}
              className={cn(
                "rounded-md border px-1.5 py-2 text-center",
                l.level <= r.level ? "border-brand-500/40 bg-brand-500/15" : "border-line bg-white/[0.02]",
              )}
              aria-current={l.level === r.level ? "step" : undefined}
            >
              <span className={cn("block font-mono text-xs", l.level <= r.level ? "text-brand-300" : "text-fg-subtle")}>
                {l.level}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-6 leading-relaxed text-fg-muted">{r.summary}</p>

        {r.highImpactUses.length > 0 && (
          <div className="mt-6 rounded-xl border border-warn/30 bg-warn/[0.06] p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
              <div>
                <p className="text-[15px] font-semibold text-fg">Você opera IA de alto impacto.</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  Sistemas que decidem sobre pessoas ou interagem com elas sem se identificar exigem avaliação de
                  impacto, revisão humana e registro do que foi decidido.
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {r.highImpactUses.map((u) => (
                    <li key={u}>
                      <Badge status="warn" dot={false}>
                        {u}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">
              Principais lacunas
            </p>
            <ul className="grid gap-1.5">
              {r.gaps.length === 0 && <li className="text-sm text-ok">Nenhuma lacuna crítica identificada.</li>}
              {r.gaps.map((g) => (
                <li key={g} className="flex items-start gap-2 text-[13.5px] text-fg-muted">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">
              O que priorizar
            </p>
            <ol className="grid gap-1.5">
              {r.priorities.length === 0 && <li className="text-sm text-fg-muted">Manter monitoramento e evidências atualizadas.</li>}
              {r.priorities.map((p, i) => (
                <li key={p} className="flex items-start gap-2 text-[13.5px] text-fg">
                  <span className="font-mono text-[11px] text-brand-300">{String(i + 1).padStart(2, "0")}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <Badge status="neutral" dot={false}>
            resultado preliminar
          </Badge>
          <p className="text-xs text-fg-subtle">
            Baseado nas suas respostas. O diagnóstico completo inclui inventário e avaliação técnica.
          </p>
          <button
            type="button"
            onClick={reset}
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Refazer
          </button>
        </div>
      </div>

      <div className="card p-6 sm:p-8 lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-300">Diagnóstico detalhado</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">Receba o diagnóstico completo por e-mail.</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Enviamos a leitura das suas respostas, as lacunas por etapa da metodologia e uma proposta de
          roteiro para elevar o nível de maturidade, sem compromisso.
        </p>
        <div className="mt-6">
          <LeadForm
            source="assessment"
            compact
            showMessage={false}
            submitLabel="Receber meu diagnóstico"
            assessment={{ score: r.score, level: r.level, levelName: r.levelName, answers }}
            successTitle="Diagnóstico a caminho."
            successText="Em até 1 dia útil você recebe o diagnóstico detalhado no e-mail informado. Se quiser acelerar, agende uma conversa com um especialista."
          />
        </div>
      </div>
    </div>
  );
}
