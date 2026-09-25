import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Platform } from "@/components/sections/Platform";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ControlCenter } from "@/components/mockups/ControlCenter";
import { AIPassport } from "@/components/mockups/AIPassport";
import { MonitoringDashboard } from "@/components/mockups/MonitoringDashboard";
import { AgentGovernance } from "@/components/mockups/AgentGovernance";
import { EvidenceTimeline } from "@/components/mockups/EvidenceTimeline";
import { RiskMatrix } from "@/components/mockups/RiskMatrix";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "AI Governance Platform: Inventário, Passport, Risco, Controles, Agentes, Monitoramento e Evidências",
  description:
    "Plataforma de governança de IA em desenvolvimento: AI Inventory, AI Passport, Risk Engine, AI Assessment, AI Evaluation, Control Center, Incident Management, Agent Governance, Continuous Monitoring, Evidence Center e Executive Dashboard.",
  path: "/plataforma",
  keywords: ["AI Governance Platform", "Plataforma de governança de IA", "AI Inventory", "AI Passport"],
});

const showcase = [
  {
    eyebrow: "Executive Dashboard · Control Center",
    title: "A postura de risco do parque de IA em uma tela.",
    desc: "Quantos sistemas existem, quantos são de alto risco, quais têm pendências, quantos agentes estão ativos, qual o percentual de controles monitorados e quantas evidências estão disponíveis. Para o conselho, o número. Para o owner, a ação.",
    visual: ControlCenter,
  },
  {
    eyebrow: "AI Passport",
    title: "A ficha técnica viva de cada sistema de IA.",
    desc: "Identidade, finalidade, modelo, dados, autonomia, risco, supervisão humana, owner, controles ativos e última avaliação. Tudo o que um auditor, um cliente ou um regulador perguntaria, respondido antes da pergunta.",
    visual: AIPassport,
  },
  {
    eyebrow: "Risk Engine",
    title: "Classificação e priorização com critérios da sua empresa.",
    desc: "Fatores e pesos configuráveis: dados, autonomia, impacto, exposição regulatória, terceiros, volume. Heatmap, ranking e gatilhos de reavaliação automáticos.",
    visual: RiskMatrix,
  },
  {
    eyebrow: "Agent Governance",
    title: "Identidade, permissões, limites e aprovação humana por agente.",
    desc: "Cada agente com identidade própria, catálogo de ferramentas permitidas, orçamento de autonomia e fila de aprovações. Ações bloqueadas e encaminhadas ao owner, com trilha.",
    visual: AgentGovernance,
  },
  {
    eyebrow: "Continuous Monitoring",
    title: "Drift, mudanças de modelo e incidentes, detectados e roteados.",
    desc: "Séries de qualidade, custo e volume por sistema. Detecção de mudança de versão em fornecedores. Alertas para o responsável certo, com contexto.",
    visual: MonitoringDashboard,
  },
  {
    eyebrow: "Evidence Center",
    title: "Evidências versionadas, com hash, rastreáveis ao requisito.",
    desc: "Cada avaliação, teste, controle verificado, incidente e correção vira evidência. Exportável para auditorias internas, externas e due diligence de clientes.",
    visual: EvidenceTimeline,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Produto · em desenvolvimento"
        title={
          <>
            AI Governance Platform. <span className="text-gradient">A operação de governança como software.</span>
          </>
        }
        description="Começamos resolvendo problemas de governança e risco em projetos. Cada processo que funciona vira módulo. A plataforma é a materialização dessa operação, e evolui com os clientes que já a utilizam nos projetos."
        crumbs={[{ name: "Plataforma", path: "/plataforma" }]}
        primary={{ label: "Solicitar early access", href: "/contato?tema=plataforma" }}
        secondary={{ label: "Diagnosticar minha IA", href: "/assessment" }}
        align="center"
      >
        <Reveal delay={300} className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Badge status="info">design partners abertos</Badge>
          <Badge status="neutral" dot={false}>11 módulos</Badge>
          <Badge status="neutral" dot={false}>dados demonstrativos</Badge>
        </Reveal>
      </PageHero>

      <Section className="mt-10">
        <div className="grid gap-24">
          {showcase.map((s, i) => {
            const Visual = s.visual;
            const reverse = i % 2 === 1;
            return (
              <article key={s.eyebrow} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={reverse ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-300">{s.eyebrow}</p>
                  <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-fg-muted">{s.desc}</p>
                </Reveal>
                <Reveal delay={120} className={reverse ? "lg:col-span-7 lg:order-1" : "lg:col-span-7"}>
                  <Visual />
                </Reveal>
              </article>
            );
          })}
        </div>
      </Section>

      <Platform compact />

      <Section tone="elevated">
        <SectionHeading
          eyebrow="Roadmap"
          title="Da operação ao produto, em três estágios."
          description="Transparência sobre onde estamos: a plataforma é usada hoje nos nossos projetos e está aberta a design partners."
          align="center"
        />
        <ol className="mt-12 grid gap-3 md:grid-cols-3">
          {[
            { stage: "Hoje", status: "ok" as const, label: "em uso nos projetos", items: ["AI Inventory", "AI Passport", "Risk Engine", "Evidence Center", "Executive Dashboard"] },
            { stage: "Próximo", status: "info" as const, label: "design partners", items: ["Agent Governance", "Continuous Monitoring", "Incident Management", "Control Center"] },
            { stage: "Depois", status: "neutral" as const, label: "roadmap", items: ["AI Evaluation automatizada", "Integrações com gateways e orquestradores", "Self-service SaaS"] },
          ].map((r, i) => (
            <Reveal as="li" key={r.stage} delay={i * 80} className="card p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-fg">{r.stage}</p>
                <Badge status={r.status}>{r.label}</Badge>
              </div>
              <ul className="mt-4 grid gap-1.5">
                {r.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-[14px] text-fg-muted">
                    <span aria-hidden className="size-1.5 rounded-full bg-brand-400/70" /> {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Infrastructure />

      <FinalCTA
        title="Quer moldar a plataforma com a gente?"
        text="Estamos selecionando empresas para o programa de design partners: uso antecipado, influência no roadmap e condições especiais."
        primary={{ label: "Solicitar early access", href: "/contato?tema=plataforma" }}
      />
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Plataforma", path: "/plataforma" }]),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `${site.name} Platform`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: "Plataforma de governança de IA: inventário, passport, risco, controles, agentes, monitoramento e evidências.",
            offers: { "@type": "Offer", availability: "https://schema.org/PreOrder", price: "0", priceCurrency: "BRL" },
            provider: { "@type": "Organization", name: site.legalName },
          },
        ]}
      />
    </>
  );
}
