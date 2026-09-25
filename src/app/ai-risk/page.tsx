import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/layout/ServicePage";
import { RiskMatrix } from "@/components/mockups/RiskMatrix";
import { AIPassport } from "@/components/mockups/AIPassport";

export const metadata = pageMetadata({
  title: "AI Risk Management: Gestão de Riscos de IA",
  description:
    "AI Risk Management para empresas: identificação, classificação e priorização de riscos de sistemas de IA, modelos e agentes. Risk Assessment, Impact Assessment e tratamento de riscos alinhados à ISO/IEC 23894 e NIST AI RMF.",
  path: "/ai-risk",
  keywords: ["AI Risk Management", "Gestão de riscos de IA", "AI Risk Assessment", "ISO 23894"],
});

export default function Page() {
  return (
    <ServicePage
      c={{
        path: "/ai-risk",
        crumbs: [
          { name: "Soluções", path: "/solucoes" },
          { name: "AI Risk Management", path: "/ai-risk" },
        ],
        eyebrow: "AI Risk Management",
        title: (
          <>
            Nem toda IA tem o mesmo risco. <span className="text-gradient">Você sabe qual é a mais perigosa?</span>
          </>
        ),
        titleText: "AI Risk Management",
        description:
          "Identificamos, classificamos e priorizamos os riscos de cada sistema de IA (dados, autonomia, impacto em pessoas, exposição regulatória, dependência de terceiros) e definimos o tratamento proporcional.",
        serviceType: "Gestão de Riscos de Inteligência Artificial",
        primary: { label: "Mapear meus riscos", href: "/assessment" },
        hero: <RiskMatrix />,
        scopeDescription:
          "Risco de IA não é um número abstrato. É a combinação do que o sistema pode fazer, com quais dados, sobre quem, e com quanta supervisão.",
        scope: [
          { title: "Identificação de riscos", desc: "Por sistema: técnicos, operacionais, legais, éticos, reputacionais e de segurança." },
          { title: "Critérios de classificação", desc: "Modelo de risco configurável: dados, autonomia, impacto, exposição regulatória, terceiros, volume." },
          { title: "AI Risk Assessment", desc: "Avaliação estruturada com registro, versionamento e aprovação, alinhada à ISO/IEC 23894 e NIST AI RMF." },
          { title: "AI Impact Assessment", desc: "Impacto sobre indivíduos, grupos e sociedade, em linha com ISO/IEC 42005 e LGPD (RIPD quando aplicável)." },
          { title: "Riscos de agentes", desc: "Excesso de agência, escalada de permissões, ações irreversíveis, custos descontrolados, cadeia de agentes." },
          { title: "Riscos de terceiros", desc: "Mudança de modelo sem aviso, uso de dados pelo fornecedor, indisponibilidade, subprocessadores." },
          { title: "Priorização", desc: "Heatmap e ranking por criticidade. O que tratar primeiro, o que aceitar, o que monitorar." },
          { title: "Tratamento", desc: "Para cada risco relevante: controle, owner, prazo e forma de verificação." },
          { title: "Reavaliação", desc: "Gatilhos de reavaliação: mudança de modelo, novo uso, novo dado, incidente, nova regulação." },
        ],
        steps: [
          { name: "Inventário", desc: "Sem lista completa não há gestão de risco. Partimos do AI Inventory ou o construímos." },
          { name: "Modelo de risco", desc: "Definimos critérios e pesos com a empresa, proporcionais ao setor, à regulação e ao apetite de risco." },
          { name: "Avaliação", desc: "Cada sistema é avaliado com evidência: entrevistas, configuração, dados, integrações e testes quando necessário." },
          { name: "Priorização", desc: "Heatmap, ranking e decisão: tratar, aceitar, transferir ou descontinuar." },
          { name: "Plano de tratamento", desc: "Controles definidos por risco, com owner e prazo. Integrado ao roteiro de implementação." },
          { name: "Monitoramento do risco", desc: "Gatilhos de reavaliação e indicadores acompanhados continuamente." },
        ],
        visual: <AIPassport />,
        visualTitle: "O risco registrado onde ele pertence: no passaporte do sistema",
        visualDescription:
          "Classificação, fatores, controles compensatórios e data da última avaliação ficam associados ao sistema, não perdidos em uma planilha.",
        deliverables: [
          "Modelo de classificação de risco de IA da empresa",
          "Registro de riscos por sistema",
          "Heatmap e ranking de criticidade",
          "Relatórios de Risk Assessment e Impact Assessment",
          "Plano de tratamento com controles, owners e prazos",
          "Gatilhos e calendário de reavaliação",
          "Integração com AI Passport e Evidence Center",
        ],
        statement: "Não apenas compliance. Controle.",
        faq: [
          { q: "Qual a diferença entre Risk Assessment e Impact Assessment?", a: "O Risk Assessment olha para a empresa: o que pode dar errado e quanto custa. O Impact Assessment olha para as pessoas e a sociedade: quem é afetado e como. Sistemas que decidem sobre pessoas costumam exigir os dois." },
          { q: "Vocês usam algum framework específico?", a: "Usamos ISO/IEC 23894, ISO/IEC 42005 e NIST AI RMF como base, adaptados ao contexto brasileiro (LGPD, regulação setorial). O modelo final é da empresa, configurável e defensável." },
          { q: "Com que frequência os riscos devem ser reavaliados?", a: "Sempre que houver gatilho (mudança de modelo, novo uso, novo dado, incidente, nova norma) e, no mínimo, em ciclos anuais para sistemas críticos. O monitoramento contínuo detecta a maioria dos gatilhos automaticamente." },
        ],
        ctaTitle: "Qual sistema de IA da sua empresa falharia com maior custo?",
        ctaText: "Se a resposta não é imediata, o mapa de riscos é o primeiro passo. Começamos pelo assessment de maturidade.",
      }}
    />
  );
}
