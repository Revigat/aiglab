import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/layout/ServicePage";
import { AgentGovernance } from "@/components/mockups/AgentGovernance";
import { UseCaseFlow } from "@/components/mockups/UseCaseFlow";

export const metadata = pageMetadata({
  title: "Governança de Agentes de IA: Segurança e Controle de Agentes Autônomos",
  description:
    "Governança e segurança de agentes de IA: identidade, propósito, permissões de ferramentas, limites de autonomia, aprovação humana, logs, custos, comportamento e incidentes. Cada agente precisa de identidade, propósito, permissões, limites e rastreabilidade.",
  path: "/governanca-de-agentes",
  keywords: ["Governança de agentes de IA", "Segurança de agentes de IA", "Agentes autônomos", "Agent Governance"],
});

export default function Page() {
  return (
    <ServicePage
      c={{
        path: "/governanca-de-agentes",
        crumbs: [
          { name: "Soluções", path: "/solucoes" },
          { name: "Governança de Agentes", path: "/governanca-de-agentes" },
        ],
        eyebrow: "Governança de Agentes",
        title: (
          <>
            Seus agentes podem agir. <span className="text-gradient">Quem controla o que eles podem fazer?</span>
          </>
        ),
        titleText: "Governança de Agentes de IA",
        description:
          "Agentes acessam APIs, consultam bancos de dados, enviam mensagens, alteram informações, executam tarefas, tomam decisões, acionam outros agentes e executam workflows. Cada uma dessas capacidades precisa de identidade, limite e rastro.",
        serviceType: "Governança de Agentes de IA",
        primary: { label: "Avaliar meus agentes", href: "/contato?tema=agentes" },
        hero: <AgentGovernance />,
        scopeTitle: "O que controlamos em cada agente",
        scopeDescription:
          "Um agente é um usuário não humano com poder de ação. Tratamos como tal: identidade própria, menor privilégio, limites explícitos e trilha completa.",
        scope: [
          { title: "Identidade", desc: "Cada agente tem identidade única, owner e ciclo de vida, não credenciais compartilhadas de um humano." },
          { title: "Objetivo", desc: "Propósito declarado e verificável. Ações fora do propósito são desvios, não features." },
          { title: "Ferramentas", desc: "Catálogo explícito do que o agente pode acionar. Tudo o que não está na lista é negado." },
          { title: "Permissões", desc: "Menor privilégio por ferramenta: leitura vs. escrita, escopo de dados, ambientes." },
          { title: "Dados", desc: "Quais dados o agente pode ler, transformar e enviar, com filtros de PII e segredos." },
          { title: "Autonomia", desc: "Nível de autonomia por tipo de ação: age, confirma ou escala. Orçamento de autonomia por período." },
          { title: "Limites", desc: "Valores, volumes, frequência, horários, ações irreversíveis. Limites técnicos, não só documentais." },
          { title: "Aprovação humana", desc: "Pontos de decisão humana definidos por impacto e incerteza, com fila, prazo e responsável." },
          { title: "Logs", desc: "Toda ação registrada: intenção, ferramenta, parâmetros, resultado, custo, contexto." },
          { title: "Custos", desc: "Orçamento por agente e alerta de anomalia, loops e abusos aparecem primeiro na conta." },
          { title: "Comportamento", desc: "Testes de comportamento antes do deploy e monitoramento de desvios em produção." },
          { title: "Incidentes", desc: "Kill switch, contenção, análise de trilha e correção, com evidência do que aconteceu." },
        ],
        steps: [
          { name: "Inventário de agentes", desc: "Quais agentes existem, quem os criou, que ferramentas acessam, com quais credenciais. Frequentemente, a resposta surpreende." },
          { name: "Classificação", desc: "Risco por agente: autonomia × ferramentas × dados × impacto. Agentes que escrevem e pagam vêm primeiro." },
          { name: "Desenho de controles", desc: "Identidade, permissões, limites, HITL e logging desenhados por agente, proporcionais ao risco." },
          { name: "Implementação", desc: "Controles aplicados na camada de orquestração, nas ferramentas e no gateway, não apenas no prompt." },
          { name: "Testes", desc: "Red teaming de agentes: injeção via ferramentas, escalada de permissão, loops, ações irreversíveis." },
          { name: "Monitoramento", desc: "Ações, custos, aprovações e desvios acompanhados continuamente, com resposta definida." },
        ],
        visual: <UseCaseFlow />,
        visualTitle: "Quando o agente age, quando confirma, quando escala",
        visualDescription:
          "A camada de governança ao redor do fluxo define os gates. Não é o prompt que decide, são regras verificáveis, logadas e auditáveis.",
        deliverables: [
          "Inventário e classificação de agentes",
          "Agent Passport por agente (identidade, propósito, permissões, limites)",
          "Matriz de permissões de ferramentas e dados",
          "Regras de autonomia e aprovação humana",
          "Controles implementados na orquestração e nas ferramentas",
          "Relatório de red teaming de agentes",
          "Logs estruturados e trilha de ações",
          "Playbook de incidentes com kill switch",
        ],
        statement: "Cada agente precisa de identidade, propósito, permissões, limites e rastreabilidade.",
        faq: [
          { q: "Nossos agentes rodam em plataformas de terceiros (low-code, SaaS). Dá para governar?", a: "Sim. Governança de agentes acontece em três camadas: identidade e credenciais, permissões nas ferramentas acionadas, e observabilidade das ações. Mesmo sem controlar a plataforma, controlamos o que ela pode acessar e registramos o que ela faz." },
          { q: "Guardrails no prompt não são suficientes?", a: "Não. Prompts são instruções, não controles. Um agente instruído a não enviar e-mails ainda consegue, se tiver a ferramenta. Controle real está na permissão da ferramenta, no limite técnico e na aprovação humana." },
          { q: "Como lidar com agentes que acionam outros agentes?", a: "Cada agente da cadeia tem identidade e permissões próprias; a delegação é registrada; o limite de autonomia da cadeia é o do elo mais restrito. Testamos escaladas de permissão via delegação no red teaming." },
        ],
        ctaTitle: "Quantos agentes têm acesso de escrita nos seus sistemas agora?",
        ctaText: "Se a resposta exige perguntar a três times, o inventário de agentes é o primeiro passo. Avaliamos identidade, permissões, limites e rastreabilidade.",
      }}
    />
  );
}
