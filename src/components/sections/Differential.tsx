import { ArrowDown, X, Check } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const traditional = ["Documento", "Relatório", "Recomendação", "Fim do projeto"];
const ours = [
  "Problema",
  "Diagnóstico",
  "Risco",
  "Controle",
  "Implementação",
  "Monitoramento",
  "Evidência",
  "Melhoria contínua",
];

function Flow({
  title,
  steps,
  tone,
  note,
}: {
  title: string;
  steps: string[];
  tone: "muted" | "brand";
  note: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8",
        tone === "brand" ? "border-brand-500/35 bg-brand-500/[0.06]" : "border-line bg-white/[0.02]",
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.16em]",
            tone === "brand" ? "text-brand-300" : "text-fg-subtle",
          )}
        >
          {title}
        </p>
        {tone === "brand" ? (
          <Check className="size-4 text-ok" aria-hidden />
        ) : (
          <X className="size-4 text-fg-subtle" aria-hidden />
        )}
      </div>
      <ol className="mt-6 grid gap-1.5">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col items-start">
            <span
              className={cn(
                "rounded-lg border px-3.5 py-2 text-sm font-medium",
                tone === "brand"
                  ? "border-brand-500/30 bg-bg/70 text-fg"
                  : "border-line bg-bg/60 text-fg-muted",
              )}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <ArrowDown
                aria-hidden
                className={cn("my-0.5 ml-3 size-3.5", tone === "brand" ? "text-brand-400/70" : "text-fg-subtle/60")}
              />
            )}
          </li>
        ))}
      </ol>
      <p className={cn("mt-6 border-t pt-4 text-sm", tone === "brand" ? "border-brand-500/20 text-fg" : "border-line text-fg-muted")}>
        {note}
      </p>
    </div>
  );
}

export function Differential() {
  return (
    <Section id="diferencial" tone="elevated">
      <SectionHeading
        eyebrow="Diferencial"
        title="Não entregamos documentos. Entregamos controle operacional."
        description="A consultoria tradicional termina no relatório. A nossa termina quando o controle está implementado, monitorado e evidenciado."
        align="center"
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        <Reveal>
          <Flow
            title="Consultoria tradicional"
            steps={traditional}
            tone="muted"
            note="O risco continua lá. Só que agora está documentado."
          />
        </Reveal>
        <Reveal delay={120}>
          <Flow
            title="Nossa abordagem"
            steps={ours}
            tone="brand"
            note="O risco é tratado, o controle é verificado e a evidência fica disponível."
          />
        </Reveal>
      </div>
    </Section>
  );
}
