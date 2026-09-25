import { maturityLevels } from "@/config/services";
import { ctas } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Maturity() {
  return (
    <Section id="maturidade" tone="elevated">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Diagnóstico"
            title="Qual é o nível de maturidade da sua IA?"
            description="A maioria das empresas está entre o nível 0 e o 2: sabe que usa IA, talvez tenha uma lista, raramente tem controle. Levamos cada sistema crítico ao nível 5, com evidências."
          />
          <Reveal delay={120} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={ctas.maturity.href} arrow>
              {ctas.maturity.label}
            </Button>
            <Button href={ctas.secondary.href} variant="secondary">
              {ctas.secondary.label}
            </Button>
          </Reveal>
          <p className="mt-4 text-sm text-fg-subtle">
            17 perguntas · 4 minutos · resultado imediato.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ol className="grid gap-2">
            {maturityLevels.map((l, i) => (
              <Reveal
                as="li"
                key={l.level}
                delay={i * 60}
                className={cn(
                  "group grid grid-cols-[auto_1fr] items-center gap-4 rounded-xl border p-4 transition-colors sm:grid-cols-[auto_1fr_auto]",
                  i === maturityLevels.length - 1
                    ? "border-brand-500/40 bg-brand-500/[0.08]"
                    : "border-line bg-white/[0.02] hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-lg border font-mono text-lg font-semibold",
                    i === maturityLevels.length - 1
                      ? "border-brand-400/50 bg-brand-500/20 text-brand-300"
                      : "border-line bg-bg text-fg-muted",
                  )}
                >
                  {l.level}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-fg">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                      Nível {l.level}
                    </span>
                    {l.name}
                  </p>
                  <p className="mt-0.5 text-sm text-fg-muted">{l.desc}</p>
                </div>
                <div className="col-span-2 sm:col-span-1 sm:w-32">
                  <div className="bar">
                    <span
                      className={cn(
                        i === maturityLevels.length - 1 ? "bg-brand-400" : "bg-fg-subtle/60",
                      )}
                      style={{ width: `${Math.max(6, (l.level / 5) * 100)}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
