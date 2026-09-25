import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge, type Status } from "@/components/ui/Badge";
import { UseCase } from "@/components/sections/UseCase";
import { Sectors } from "@/components/sections/Sectors";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AIPassport } from "@/components/mockups/AIPassport";

export const metadata = pageMetadata({
  title: "Casos de Uso de Governança de IA: Cenários reais em empresas",
  description:
    "Casos demonstrativos de governança de IA: agentes comerciais, triagem de currículos, análise de crédito, chatbots de atendimento, RAG interno e copilots. Como identificamos problemas, medimos riscos, implementamos controles e geramos evidências.",
  path: "/casos",
});

type Case = {
  sector: string;
  title: string;
  system: string;
  risk: { label: string; status: Status };
  problem: string;
  found: string[];
  did: string[];
  result: string;
};

const cases: Case[] = [
  {
    sector: "Comercial · B2B",
    title: "Agente de vendas que gerava propostas fora da política comercial",
    system: "AI SDR · agente com acesso a CRM e e-mail",
    risk: { label: "Médio → Controlado", status: "ok" },
    problem: "O agente qualificava leads e enviava propostas. Ninguém sabia que ele podia enviar valores acima da alçada, nem havia log do que fora prometido a clientes.",
    found: ["Permissão de escrita irrestrita no CRM", "Envio de e-mail sem aprovação", "Sem registro de prompts e respostas", "Owner indefinido"],
    did: ["AI Passport e owner definido", "Limite de alçada técnico (R$ 50k) com HITL", "Permissões mínimas por ferramenta", "Logs estruturados e monitoramento de custo"],
    result: "Propostas acima da alçada passaram a ser bloqueadas e encaminhadas; 100% das interações rastreáveis; evidências disponíveis para o jurídico.",
  },
  {
    sector: "Recursos Humanos",
    title: "Triagem de currículos com decisão automatizada e sem revisão",
    system: "AI HR · classificação de candidatos",
    risk: { label: "Alto → Em tratamento", status: "warn" },
    problem: "Um modelo classificava candidatos como aptos ou não. A decisão tinha efeito direto, sem revisão humana, sem avaliação de viés e sem forma de o candidato contestar.",
    found: ["Decisão automatizada sem revisão (LGPD art. 20)", "Sem teste de viés por grupo", "Dados sensíveis inferidos indiretamente", "Sem documentação do modelo"],
    did: ["Impact Assessment e RIPD", "Revisão humana obrigatória antes de reprovação", "Suíte de testes de viés recorrente", "Fluxo de contestação e log de decisão"],
    result: "Sistema reclassificado e operando com supervisão; disparidades medidas e reportadas mensalmente; evidências para eventual questionamento da ANPD.",
  },
  {
    sector: "Financeiro",
    title: "Fornecedor mudou o modelo e a análise de crédito degradou em silêncio",
    system: "AI FINANCE · scoring com LLM de terceiro",
    risk: { label: "Alto → Monitorado", status: "ok" },
    problem: "Após uma atualização não anunciada do fornecedor, a taxa de aprovação mudou 9 pontos em duas semanas. Ninguém percebeu até a área de risco questionar os números.",
    found: ["Sem detecção de mudança de versão", "Sem linha de base de comportamento", "Contrato sem cláusula de aviso de mudança", "Sem processo de incidente para IA"],
    did: ["Monitoramento com testes canário", "Linhas de base e alertas de drift", "Reavaliação do fornecedor e aditivo contratual", "Playbook de incidente com kill switch"],
    result: "Mudanças de modelo detectadas em até 24h; incidente registrado com causa e correção; risco do fornecedor reclassificado e monitorado.",
  },
  {
    sector: "Atendimento",
    title: "Chatbot de suporte que vazava dados de outros clientes via RAG",
    system: "CUSTOMER BOT · RAG sobre base de tickets",
    risk: { label: "Alto → Controlado", status: "ok" },
    problem: "O bot respondia com trechos de tickets de outros clientes quando a pergunta era ambígua. A base de conhecimento não tinha segregação por cliente.",
    found: ["Sem controle de acesso por documento no RAG", "Sem filtro de PII na saída", "Prompt injection não testada", "Sem logs de recuperação"],
    did: ["Segregação de acesso na recuperação", "Filtro de PII e testes adversariais", "Threshold de confiança com escalonamento", "Logs de retrieval e resposta"],
    result: "Zero vazamentos em 412 casos de teste; 3 tentativas de injection bloqueadas em produção; evidências consolidadas para o cliente Enterprise que exigiu a auditoria.",
  },
  {
    sector: "Enterprise · Multiárea",
    title: "Grupo com 47 sistemas de IA e nenhum inventário",
    system: "Parque completo · SaaS, APIs, agentes, automações",
    risk: { label: "Desconhecido → Nível 3", status: "info" },
    problem: "Times contratavam ferramentas e integravam APIs por conta própria. A diretoria não sabia responder quantos sistemas existiam, quais usavam dados pessoais nem quem respondia por eles.",
    found: ["47 sistemas descobertos (estimativa inicial: 15)", "12 agentes ativos, 3 sem owner", "7 fornecedores de modelo distintos", "Dados pessoais em 19 sistemas"],
    did: ["AI Inventory com descoberta técnica", "AI Passport para os 47 sistemas", "Risk Engine e priorização", "Política de IA e framework de governança"],
    result: "Do nível 0 ao nível 3 em 14 semanas; 5 sistemas de alto risco em tratamento; dashboard executivo apresentado ao conselho.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Casos de uso"
        title={
          <>
            Onde a IA falhou em silêncio. <span className="text-gradient">E o que fizemos a respeito.</span>
          </>
        }
        description="Cenários demonstrativos baseados em padrões recorrentes que encontramos em empresas. Nomes e números são ilustrativos; os problemas, não."
        crumbs={[{ name: "Casos", path: "/casos" }]}
        aside={<AIPassport />}
      />

      <Section className="mt-16">
        <SectionHeading
          eyebrow="Padrão"
          title="Problema → o que encontramos → o que fizemos → evidência"
          description="Todo caso segue a mesma estrutura, porque o método é o mesmo."
        />
        <div className="mt-12 grid gap-5">
          {cases.map((c, i) => (
            <Reveal as="article" key={c.title} delay={(i % 2) * 60} className="card overflow-hidden">
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">{c.sector}</span>
                    <Badge status={c.risk.status}>{c.risk.label}</Badge>
                  </div>
                  <h2 className="mt-3 text-balance text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
                    {c.title}
                  </h2>
                  <p className="mt-2 font-mono text-[11px] text-fg-subtle">{c.system}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{c.problem}</p>
                </div>
                <div className="lg:col-span-3">
                  <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-warn">O que encontramos</p>
                  <ul className="grid gap-1.5">
                    {c.found.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[14px] text-fg-muted">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-3">
                  <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand-300">O que fizemos</p>
                  <ul className="grid gap-1.5">
                    {c.did.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[14px] text-fg-muted">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-ok/25 bg-ok/[0.06] p-4 lg:col-span-2">
                  <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ok">Evidência</p>
                  <p className="text-[13.5px] leading-relaxed text-fg">{c.result}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <UseCase showLink={false} />
      <Sectors />
      <FinalCTA
        title="Reconheceu algum desses cenários?"
        text="Provavelmente há mais deles na sua empresa do que parece. O diagnóstico descobre quais, e o que fazer primeiro."
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Casos", path: "/casos" }])} />
    </>
  );
}
