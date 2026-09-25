import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { maturityLevels } from "@/config/services";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AssessmentWizard } from "@/components/forms/AssessmentWizard";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Assessment de Maturidade em Governança de IA: Diagnóstico gratuito",
  description:
    "Avalie em 4 minutos a maturidade da governança de IA da sua empresa: o que sua IA decide, sobre quem, e quais controles existem. Resultado imediato e diagnóstico detalhado por e-mail.",
  path: "/assessment",
  keywords: ["Assessment de governança de IA", "Maturidade em IA", "Diagnóstico de IA"],
});

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden pt-10 sm:pt-14">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="glow-brand absolute inset-x-0 top-0 -z-10 h-[420px]" />
        <Container>
          <Breadcrumbs items={[{ name: "Assessment", path: "/assessment" }]} />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Diagnóstico gratuito</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-fg sm:text-5xl">
                  Qual é o nível de maturidade da sua IA?
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">
                  17 perguntas sobre o que sua IA faz, sobre quem, e quais controles existem. Nível de 0 a 5,
                  lacunas e prioridades na hora.
                </p>
              </Reveal>
              <Reveal delay={240} className="mt-8">
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">Escala</p>
                <ol className="grid gap-1.5">
                  {maturityLevels.map((l) => (
                    <li key={l.level} className="flex items-center gap-3 text-[13.5px]">
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-md border font-mono text-[11px]",
                          l.level === 5 ? "border-brand-500/40 bg-brand-500/15 text-brand-300" : "border-line text-fg-subtle",
                        )}
                      >
                        {l.level}
                      </span>
                      <span className="text-fg-muted">{l.name}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-8">
              <AssessmentWizard />
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="elevated" className="mt-20">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            { t: "Preliminar, não definitivo", d: "O resultado reflete suas respostas. O diagnóstico técnico inclui inventário e verificação." },
            { t: "Sem cadastro para responder", d: "Você só informa seus dados se quiser o diagnóstico detalhado por e-mail." },
            { t: "Dados usados só para isso", d: "Nome, empresa, cargo e e-mail corporativo, exclusivamente para enviar o diagnóstico e o contato solicitado." },
          ].map((it) => (
            <div key={it.t} className="text-center sm:text-left">
              <p className="text-[15px] font-semibold text-fg">{it.t}</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{it.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Assessment", path: "/assessment" }])} />
    </>
  );
}
