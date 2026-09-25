import { methodology } from "@/config/services";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Methodology({ detailed = false, showLink = true }: { detailed?: boolean; showLink?: boolean }) {
  return (
    <Section id="metodologia">
      <SectionHeading
        eyebrow="Metodologia"
        title={
          <>
            Identificar → Avaliar → Controlar → Monitorar → Evidenciar → Melhorar
          </>
        }
        description="Um ciclo, não um projeto com fim. Cada etapa alimenta a próxima."
        align="center"
      />

      <ol className="relative mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent xl:block"
        />
        {methodology.map((m, i) => (
          <Reveal
            as="li"
            key={m.step}
            delay={i * 70}
            className="card card-hover relative flex flex-col p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-brand-300">{m.step}</span>
              <span
                aria-hidden
                className="grid size-6 place-items-center rounded-full border border-brand-500/40 bg-bg"
              >
                <span className="size-2 rounded-full bg-brand-400" />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold uppercase tracking-wide text-fg">{m.name}</h3>
            <p className="mt-1 text-sm text-fg-muted">{m.short}</p>
            {detailed && (
              <>
                <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">{m.desc}</p>
                <ul className="mt-4 grid gap-1 border-t border-line pt-3">
                  {m.outputs.map((o) => (
                    <li key={o} className="font-mono text-[10.5px] uppercase tracking-wider text-fg-subtle">
                      · {o}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        ))}
      </ol>

      {showLink && (
        <Reveal delay={200} className="mt-10 text-center">
          <Button href="/metodologia" variant="secondary" arrow>
            Ver metodologia completa
          </Button>
        </Reveal>
      )}
    </Section>
  );
}
