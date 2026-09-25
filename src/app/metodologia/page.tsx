import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { methodology } from "@/config/services";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Methodology } from "@/components/sections/Methodology";
import { Maturity } from "@/components/sections/Maturity";
import { Differential } from "@/components/sections/Differential";
import { Frameworks } from "@/components/sections/Frameworks";
import { Evidence } from "@/components/sections/Evidence";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMetadata({
  title: "Metodologia de Governança de IA: Identificar, Avaliar, Controlar, Monitorar, Evidenciar, Melhorar",
  description:
    "Nossa metodologia de AI Governance em seis etapas: Identificar → Avaliar → Controlar → Monitorar → Evidenciar → Melhorar. Um ciclo contínuo que transforma governança de IA em controle operacional e evidência técnica.",
  path: "/metodologia",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Metodologia"
        title={
          <>
            Um ciclo, não um projeto. <span className="text-gradient">Seis etapas que se alimentam.</span>
          </>
        }
        description="Identificar → Avaliar → Controlar → Monitorar → Evidenciar → Melhorar. Cada etapa produz um resultado concreto que a próxima consome. Quando algo muda (modelo, uso, regulação, incidente), o ciclo recomeça onde precisa."
        crumbs={[{ name: "Metodologia", path: "/metodologia" }]}
        align="center"
      />

      <Section className="mt-6">
        <ol className="grid gap-4">
          {methodology.map((m, i) => (
            <Reveal as="li" key={m.step} delay={i * 50} className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="font-mono text-sm tracking-[0.16em] text-brand-300">{m.step}</p>
                <h2 className="mt-2 text-2xl font-semibold uppercase tracking-wide text-fg">{m.name}</h2>
                <p className="mt-1 text-sm text-fg-muted">{m.short}</p>
              </div>
              <div className="lg:col-span-5">
                <p className="leading-relaxed text-fg-muted">{m.desc}</p>
              </div>
              <div className="lg:col-span-4">
                <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">Resultados</p>
                <ul className="grid gap-1.5">
                  {m.outputs.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-[14px] text-fg">
                      <span aria-hidden className="size-1.5 rounded-full bg-ok" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="elevated">
        <SectionHeading
          eyebrow="Princípios"
          title="O que guia cada decisão do método"
          align="center"
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Problema antes da norma", d: "Começamos pelo que pode falhar e custar caro. A norma entra como referência de engenharia, não como ponto de partida." },
            { t: "Proporcionalidade", d: "Controles proporcionais ao risco. Um chatbot de FAQ e um agente que aprova crédito não recebem o mesmo tratamento." },
            { t: "Evidência ou não existe", d: "Controle que não pode ser demonstrado não conta como implementado. Toda etapa gera evidência." },
            { t: "Operação, não arquivo", d: "Políticas curtas, papéis claros, controles técnicos. Governança que os times conseguem seguir." },
          ].map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 60} className="card p-6">
              <h3 className="text-[16px] font-semibold text-fg">{p.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{p.d}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Methodology showLink={false} />
      <Evidence />
      <Maturity />
      <Frameworks />
      <Differential />
      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Metodologia", path: "/metodologia" }])} />
    </>
  );
}
