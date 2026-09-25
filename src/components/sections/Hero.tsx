import { ctas } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ControlCenter } from "@/components/mockups/ControlCenter";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";

const method = ["Identificar", "Avaliar", "Controlar", "Monitorar", "Evidenciar", "Melhorar"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 lg:pt-24">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="network-fade absolute inset-0 -z-10">
        <NetworkCanvas />
      </div>
      <div aria-hidden className="network-dim absolute inset-0 -z-10" />
      <div aria-hidden className="glow-brand absolute inset-x-0 top-0 -z-10 h-[520px]" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow>AI Governance · Risk · Agentes</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-fg sm:text-5xl lg:text-[4.1rem]">
              Sua empresa usa IA.{" "}
              <span className="text-gradient">Mas consegue provar que ela está sob controle?</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">
              Identificamos, avaliamos, controlamos e monitoramos seus sistemas e agentes de IA.
              E transformamos governança em <span className="font-medium text-fg">evidência técnica</span>.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={ctas.primary.href} size="lg" arrow className="w-full sm:w-auto">
              {ctas.primary.label}
            </Button>
            <Button href={ctas.secondary.href} size="lg" variant="secondary" className="w-full sm:w-auto">
              {ctas.secondary.label}
            </Button>
          </Reveal>
          <Reveal delay={320}>
            <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
              {method.map((m, i) => (
                <li key={m} className="flex items-center gap-2">
                  <span className={i === 0 ? "text-brand-300" : ""}>{m}</span>
                  {i < method.length - 1 && (
                    <span aria-hidden className="text-fg-subtle/60">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={380} className="relative mt-14 sm:mt-16 lg:mt-20">
          <div
            aria-hidden
            className="absolute -inset-x-10 top-10 -z-10 h-[70%] rounded-full bg-brand-500/10 blur-3xl"
          />
          <ControlCenter />
          <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-subtle">
            Interface demonstrativa da plataforma em desenvolvimento · dados fictícios
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
