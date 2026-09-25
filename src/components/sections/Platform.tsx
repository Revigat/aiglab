import { platformModules } from "@/config/services";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Platform({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="plataforma">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Produto"
          title={
            <>
              AI Governance Platform{" "}
              <Badge status="info" className="ml-2 -translate-y-2 align-middle">
                em desenvolvimento
              </Badge>
            </>
          }
          description="Cada processo que funciona na consultoria vira módulo de software. A plataforma evolui com os clientes que já a usam."
        />
        {!compact && (
          <Reveal delay={120} className="flex gap-2">
            <Button href="/plataforma" variant="secondary" arrow>
              Conhecer a plataforma
            </Button>
          </Reveal>
        )}
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {platformModules.map((m, i) => (
          <Reveal
            as="li"
            key={m.code}
            delay={(i % 4) * 60}
            className="card card-hover group relative overflow-hidden p-5"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-brand-500/30 bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-brand-300">
                {m.code}
              </span>
              <span className="font-mono text-[10px] text-fg-subtle">
                {String(i + 1).padStart(2, "0")} / {platformModules.length}
              </span>
            </div>
            <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-fg">{m.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{m.desc}</p>
          </Reveal>
        ))}
        <Reveal
          as="li"
          delay={200}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 to-transparent p-5"
        >
          <Eyebrow>Visão</Eyebrow>
          <div>
            <p className="mt-4 text-lg font-semibold leading-snug tracking-tight text-fg">
              AI Governance Infrastructure
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
              Uma camada de governança entre a empresa e seus sistemas de IA, modelos, agentes, dados e
              ferramentas.
            </p>
          </div>
        </Reveal>
      </ul>
    </Section>
  );
}
