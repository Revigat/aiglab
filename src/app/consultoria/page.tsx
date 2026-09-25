import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/layout/ServicePage";
import { AIPassport } from "@/components/mockups/AIPassport";
import { ControlCenter } from "@/components/mockups/ControlCenter";

export const metadata = pageMetadata({
  title: "Consultoria de Governança de IA e Implementação",
  description:
    "Consultoria de governança de IA que sai do papel: diagnóstico de maturidade, AI Inventory, AI Risk e Impact Assessment, políticas, framework, controles técnicos e organizacionais, human-in-the-loop e implementação.",
  path: "/consultoria",
  keywords: ["Consultoria de Governança de IA", "AI Inventory", "AI Impact Assessment", "Framework de governança de IA"],
});

export default function Page() {
  return (
    <ServicePage
      c={{
        path: "/consultoria",
        crumbs: [
          { name: "Soluções", path: "/solucoes" },
          { name: "Consultoria + Implementação", path: "/consultoria" },
        ],
        eyebrow: "Consultoria + Implementação",
        title: (
          <>
            Governança de IA que vira <span className="text-gradient">processo, controle e arquitetura.</span>
          </>
        ),
        titleText: "Consultoria + Implementação de Governança de IA",
        description:
          "Transformamos requisitos de governança em processos, controles e arquitetura operacional. Do diagnóstico de maturidade à implementação dos controles, com evidência de que funcionam.",
        serviceType: "Consultoria de Governança de IA",
        primary: { label: "Implementar Governança", href: "/contato?tema=consultoria" },
        hero: <AIPassport />,
        scopeDescription:
          "Cada frente resolve um problema concreto: falta de visibilidade, falta de critério de risco, falta de controle, falta de responsável.",
        scope: [
          { title: "Diagnóstico de maturidade", desc: "Onde a empresa está (nível 0–5), onde precisa chegar e o roteiro para isso." },
          { title: "AI Inventory", desc: "Descoberta e catalogação de todos os sistemas de IA: SaaS, APIs, modelos internos, automações, agentes." },
          { title: "AI Risk Assessment", desc: "Classificação de risco por sistema com critérios objetivos: dados, autonomia, impacto, exposição." },
          { title: "AI Impact Assessment", desc: "Avaliação de impacto sobre pessoas, negócio e sociedade, alinhada à ISO/IEC 42005 e LGPD." },
          { title: "Políticas de IA", desc: "Política de uso, desenvolvimento e aquisição de IA, curta, aplicável e conectada a controles reais." },
          { title: "Framework de governança", desc: "Estrutura de decisão, comitês, papéis e fluxos de aprovação proporcionais ao porte da empresa." },
          { title: "Definição de responsabilidades", desc: "Owner, aprovador, operador e auditor por sistema. Ninguém governa o que não tem dono." },
          { title: "Controles técnicos", desc: "Logs, limites de ferramentas, filtros de dados, validações, thresholds de confiança, guardrails." },
          { title: "Controles organizacionais", desc: "Processos de aprovação, revisão periódica, treinamento e gestão de mudanças." },
          { title: "Human-in-the-loop", desc: "Regras claras de quando a IA age, quando pede confirmação e quando escala para um humano." },
          { title: "Avaliação de fornecedores", desc: "Critérios técnicos e contratuais para modelos e serviços de terceiros, com reavaliação periódica." },
          { title: "Implementação e documentação", desc: "Implementamos junto com os times e documentamos de forma que gere evidência, não arquivo morto." },
        ],
        steps: [
          { name: "Diagnóstico", desc: "Entrevistas, coleta técnica e inventário inicial. Resultado: mapa de sistemas, riscos aparentes e nível de maturidade." },
          { name: "Priorização", desc: "Classificação de risco e escolha dos sistemas críticos. Onde uma falha custaria mais, e onde há menos controle." },
          { name: "Desenho", desc: "Framework, políticas, papéis e catálogo de controles proporcionais. Arquitetura de governança integrada à operação." },
          { name: "Implementação", desc: "Controles técnicos e organizacionais implementados com os times de tecnologia, negócio e compliance." },
          { name: "Verificação", desc: "Cada controle é testado e evidenciado. O que não pode ser demonstrado não conta como implementado." },
          { name: "Transição", desc: "Handover para operação, monitoramento e ciclo de melhoria, com ou sem nossa plataforma." },
        ],
        visual: <ControlCenter />,
        visualTitle: "O que a diretoria passa a enxergar",
        visualDescription:
          "Ao final da implementação, a empresa tem uma visão consolidada: quantos sistemas existem, qual o risco de cada um, quais controles estão ativos e onde estão as pendências.",
        deliverables: [
          "AI Inventory completo e classificado",
          "AI Passport por sistema crítico",
          "Relatório de Risk & Impact Assessment",
          "Política de IA aprovada e comunicada",
          "Framework de governança e matriz de responsabilidades",
          "Catálogo de controles implementados e verificados",
          "Regras de human-in-the-loop por sistema",
          "Critérios e registros de avaliação de fornecedores",
          "Plano de monitoramento e melhoria contínua",
          "Pacote de evidências para auditoria",
        ],
        statement: "Não apenas diagnóstico. Implementação.",
        faq: [
          { q: "Quanto tempo leva um projeto de implementação?", a: "Depende do número de sistemas e da criticidade. Um diagnóstico com inventário leva de 3 a 6 semanas. A implementação dos controles nos sistemas críticos costuma ocorrer em ciclos de 8 a 16 semanas." },
          { q: "Precisamos ter um time interno de IA?", a: "Não. Trabalhamos com os times que já existem: tecnologia, segurança, dados, jurídico e negócio. Definimos papéis proporcionais ao porte da empresa." },
          { q: "Vocês implementam os controles técnicos ou apenas recomendam?", a: "Implementamos junto com seus times (configuração de logs, limites de ferramentas, validações, thresholds e guardrails) e verificamos que funcionam. Recomendação sem implementação não é o nosso modelo." },
          { q: "Isso prepara para a ISO/IEC 42001?", a: "Sim, os controles e processos são alinhados à ISO/IEC 42001, NIST AI RMF e LGPD. A certificação em si é emitida por organismos certificadores independentes; nós preparamos a organização e as evidências." },
        ],
        ctaTitle: "Governança de IA precisa sair do papel e entrar na operação.",
        ctaText: "Começamos pelo diagnóstico: inventário, riscos aparentes e nível de maturidade. Em poucas semanas você sabe exatamente onde está e o que fazer primeiro.",
      }}
    />
  );
}
