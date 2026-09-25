import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Presentation } from "lucide-react";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Frameworks } from "@/components/sections/Frameworks";

export const metadata = pageMetadata({
  title: "Conteúdos sobre Governança de IA: Guias, frameworks e checklists",
  description:
    "Guias práticos sobre governança de IA, AI Risk Management, ISO/IEC 42001, NIST AI RMF, LGPD e IA, governança de agentes, monitoramento e evidências. Conteúdo técnico para CIO, CISO, DPO, jurídico e compliance.",
  path: "/conteudos",
});

type Item = {
  type: "Guia" | "Checklist" | "Artigo" | "Template";
  title: string;
  desc: string;
  tags: string[];
  read: string;
  soon?: boolean;
};

const featured: Item = {
  type: "Guia",
  title: "Como montar um AI Inventory em 30 dias sem travar a operação",
  desc: "Descoberta técnica, entrevistas, classificação e AI Passport. O passo a passo que usamos para levar empresas do nível 0 ao nível 2 de maturidade, com templates e critérios.",
  tags: ["AI Inventory", "Maturidade", "Implementação"],
  read: "18 min",
};

const items: Item[] = [
  { type: "Checklist", title: "14 perguntas que um auditor faria sobre a sua IA", desc: "A lista que ninguém quer receber sem estar preparado, e como responder cada item com evidência.", tags: ["Auditoria", "Evidências"], read: "8 min" },
  { type: "Artigo", title: "ISO/IEC 42001 na prática: o que muda em relação à ISO 27001", desc: "O que reaproveitar, o que construir do zero e quais controles do Anexo A exigem engenharia, não documento.", tags: ["ISO 42001", "Compliance"], read: "12 min" },
  { type: "Guia", title: "Governança de agentes: identidade, permissões, limites e HITL", desc: "Por que guardrails no prompt não são controle, e como implementar limites na camada de ferramentas e orquestração.", tags: ["Agentes", "Segurança"], read: "15 min" },
  { type: "Artigo", title: "LGPD art. 20 e decisões automatizadas por IA: o que sua empresa precisa provar", desc: "Revisão humana, transparência, contestação e RIPD em sistemas que decidem sobre pessoas.", tags: ["LGPD", "Privacidade"], read: "10 min" },
  { type: "Template", title: "AI Passport: modelo de ficha técnica de sistema de IA", desc: "Campos, critérios de preenchimento e exemplo completo. Compatível com ISO 42001 e NIST AI RMF.", tags: ["AI Passport", "Template"], read: "download" },
  { type: "Artigo", title: "Seu fornecedor mudou o modelo. Como detectar antes do incidente", desc: "Testes canário, linhas de base e detecção estatística de mudança de comportamento em LLMs de terceiros.", tags: ["Monitoramento", "Fornecedores"], read: "9 min" },
  { type: "Checklist", title: "OWASP Top 10 para LLMs aplicado a agentes corporativos", desc: "Cada risco traduzido em teste, controle e evidência, com foco em excessive agency e prompt injection via ferramentas.", tags: ["OWASP", "Segurança"], read: "11 min" },
  { type: "Guia", title: "Modelo de classificação de risco de IA: fatores, pesos e heatmap", desc: "Como definir critérios defensáveis e proporcionais, alinhados à ISO/IEC 23894 e ao NIST AI RMF.", tags: ["AI Risk", "ISO 23894"], read: "14 min" },
];

const icon = { Guia: BookOpen, Checklist: FileText, Artigo: FileText, Template: Presentation };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title={
          <>
            Governança de IA explicada por quem <span className="text-gradient">implementa, não só recomenda.</span>
          </>
        }
        description="Guias, checklists, templates e artigos técnicos sobre AI Governance, risco, compliance, agentes, monitoramento e evidências. Escritos para quem precisa decidir e executar."
        crumbs={[{ name: "Conteúdos", path: "/conteudos" }]}
        primary={{ label: "Receber novos conteúdos", href: "/contato?tema=conteudos" }}
        secondary={{ label: "Diagnosticar minha IA", href: "/assessment" }}
        align="center"
      />

      <Section className="mt-10">
        <Reveal className="card grid gap-8 p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <Badge status="info">{featured.type}</Badge>
              <Badge status="neutral" dot={false}>destaque</Badge>
            </div>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 leading-relaxed text-fg-muted">{featured.desc}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="/contato?tema=conteudos" arrow>
                Solicitar o guia
              </Button>
              <span className="text-sm text-fg-subtle">Leitura de {featured.read}</span>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-white/[0.02] p-5 lg:col-span-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">Neste guia</p>
            <ol className="mt-3 grid gap-2">
              {["Descoberta técnica: onde a IA se esconde", "Entrevistas com áreas em 5 perguntas", "Critérios de classificação inicial", "AI Passport: o mínimo viável", "Do inventário ao Risk Engine"].map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-fg">
                  <span className="font-mono text-[11px] text-brand-300">{String(i + 1).padStart(2, "0")}</span> {t}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="mt-16">
          <SectionHeading eyebrow="Biblioteca" title="Guias, checklists e templates" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it, i) => {
              const Icon = icon[it.type];
              return (
                <Reveal as="li" key={it.title} delay={(i % 4) * 60} className="card card-hover group flex flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand-300">
                      <Icon className="size-3.5" aria-hidden /> {it.type}
                    </span>
                    <span className="font-mono text-[10px] text-fg-subtle">{it.read}</span>
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold leading-snug tracking-tight text-fg">{it.title}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-fg-muted">{it.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {it.tags.map((t) => (
                      <span key={t} className="rounded border border-line px-1.5 py-0.5 text-[10.5px] text-fg-subtle">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contato?tema=conteudos"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors group-hover:text-brand-300"
                  >
                    Solicitar <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-sm text-fg-subtle">
            Conteúdos em publicação. Solicite para receber a versão atual por e-mail assim que disponível.
          </p>
        </div>
      </Section>

      <Frameworks />
      <FinalCTA
        title="Ler ajuda. Diagnosticar resolve."
        text="Em 4 minutos você sabe o nível de maturidade da sua IA e o que priorizar."
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Conteúdos", path: "/conteudos" }])} />
    </>
  );
}
