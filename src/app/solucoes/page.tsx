import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { solutionsNav } from "@/config/site";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Problems } from "@/components/sections/Problems";
import { Differential } from "@/components/sections/Differential";
import { Services } from "@/components/sections/Services";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ControlCenter } from "@/components/mockups/ControlCenter";

export const metadata = pageMetadata({
  title: "Soluções de Governança de IA: Consultoria, Auditoria, Risco, Compliance, Monitoramento e Agentes",
  description:
    "Soluções completas de AI Governance: consultoria e implementação, auditoria e compliance, AI Risk Management, monitoramento contínuo e governança de agentes de IA. Governança que sai do papel e entra na operação.",
  path: "/solucoes",
});

const journeys = [
  { who: "CIO / CTO", need: "Visibilidade do parque de IA e arquitetura de controle que não trave a inovação.", start: "/consultoria" },
  { who: "CISO", need: "Superfície de ataque de LLMs e agentes, permissões, logs e resposta a incidentes.", start: "/governanca-de-agentes" },
  { who: "DPO / Jurídico", need: "Dados pessoais em IA, decisões automatizadas, RIPD e evidências para a ANPD.", start: "/compliance" },
  { who: "Compliance / Riscos", need: "Modelo de risco de IA, gap analysis frente a ISO 42001 e NIST, trilha de auditoria.", start: "/ai-risk" },
  { who: "Conselho / Diretoria", need: "Postura de risco em uma página, tendências e garantia de que alguém responde por cada sistema.", start: "/auditoria" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Soluções"
        title={
          <>
            Consultoria, tecnologia e operação. <span className="text-gradient">Uma só frente de governança.</span>
          </>
        }
        description="Seis soluções que se conectam pela mesma metodologia: Identificar → Avaliar → Controlar → Monitorar → Evidenciar → Melhorar. Comece pelo problema mais urgente; o restante se encaixa."
        crumbs={[{ name: "Soluções", path: "/solucoes" }]}
        aside={<ControlCenter />}
      />

      <Section className="mt-16">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutionsNav.map((s, i) => (
            <Reveal as="li" key={s.href} delay={(i % 3) * 70}>
              <Link href={s.href} className="card card-hover group flex h-full flex-col p-6">
                <span className="font-mono text-[10px] text-brand-300">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-fg">{s.label}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-fg-muted">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300">
                  Conhecer <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <SectionHeading
          eyebrow="Por onde começar"
          title="Cada função enxerga um pedaço do problema. Nós conectamos todos."
          description="Falamos a língua de tecnologia, segurança, privacidade, jurídico, riscos e conselho, e traduzimos entre eles."
          align="center"
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {journeys.map((j, i) => (
            <Reveal as="li" key={j.who} delay={i * 60}>
              <Link href={j.start} className="card card-hover flex h-full flex-col p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">{j.who}</p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-fg-muted">{j.need}</p>
                <span className="mt-4 text-sm font-medium text-fg">Ponto de partida →</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Problems />
      <Services />
      <Differential />
      <FinalCTA />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Soluções", path: "/solucoes" }])} />
    </>
  );
}
