import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/layout/ServicePage";
import { MonitoringDashboard } from "@/components/mockups/MonitoringDashboard";
import { ControlCenter } from "@/components/mockups/ControlCenter";

export const metadata = pageMetadata({
  title: "Monitoramento de IA: Monitoramento Contínuo de Modelos e Agentes",
  description:
    "Monitoramento contínuo de sistemas de IA: modelos, prompts, agentes, APIs, fornecedores, acessos, decisões, performance, custos, incidentes e qualidade. Detecte drift e mudanças de modelo antes que virem incidente.",
  path: "/monitoramento",
  keywords: ["Monitoramento de IA", "Monitoramento de modelos", "Drift de modelo", "AI Monitoring"],
});

export default function Page() {
  return (
    <ServicePage
      c={{
        path: "/monitoramento",
        crumbs: [
          { name: "Soluções", path: "/solucoes" },
          { name: "Monitoramento Contínuo", path: "/monitoramento" },
        ],
        eyebrow: "Monitoramento Contínuo",
        title: (
          <>
            Sua IA mudou. <span className="text-gradient">Você percebeu?</span>
          </>
        ),
        titleText: "Monitoramento Contínuo de IA",
        description:
          "Fornecedores atualizam modelos sem aviso. Times alteram prompts. Agentes ganham ferramentas. Dados mudam. Monitoramos o que muda e o que degrada, e roteamos para quem precisa agir.",
        serviceType: "Monitoramento de Sistemas de IA",
        primary: { label: "Monitorar minha IA", href: "/contato?tema=monitoramento" },
        hero: <MonitoringDashboard />,
        scopeDescription:
          "Uma avaliação feita uma vez descreve o passado. Monitoramento descreve o presente. Acompanhamos treze dimensões por sistema.",
        scope: [
          { title: "Modelos", desc: "Versão, fornecedor, mudanças não anunciadas, comportamento antes e depois." },
          { title: "Prompts", desc: "Alterações em prompts de sistema e templates, com versionamento e impacto medido." },
          { title: "Agentes", desc: "Ações executadas, ferramentas acionadas, limites atingidos, aprovações pendentes." },
          { title: "APIs e integrações", desc: "Disponibilidade, latência, erros, novas integrações não catalogadas." },
          { title: "Fornecedores", desc: "Mudanças de termos, de modelo, de subprocessadores e de política de dados." },
          { title: "Acessos", desc: "Quem acessa o quê; permissões novas; uso fora do padrão." },
          { title: "Decisões", desc: "Volume, distribuição e outliers de decisões automatizadas; taxa de escalonamento humano." },
          { title: "Performance e qualidade", desc: "Acurácia, taxa de respostas válidas, drift semântico, degradação gradual." },
          { title: "Custos", desc: "Tokens, chamadas e gasto por sistema e por agente, com limites e alertas." },
          { title: "Incidentes e alterações", desc: "Registro automático de eventos relevantes e correlação com mudanças." },
          { title: "Riscos", desc: "Gatilhos de reavaliação disparados quando indicadores cruzam limites." },
        ],
        steps: [
          { name: "Instrumentação", desc: "Definimos o que observar em cada sistema e conectamos logs, métricas e eventos, sem reescrever a aplicação." },
          { name: "Linhas de base", desc: "Estabelecemos o comportamento normal: qualidade, volume, custo, distribuição de decisões." },
          { name: "Detecção", desc: "Regras e modelos detectam drift, mudanças de versão, anomalias de uso e violações de limite." },
          { name: "Roteamento", desc: "Alertas chegam ao owner certo, com contexto e severidade, não a uma caixa de e-mail genérica." },
          { name: "Resposta", desc: "Playbooks de resposta: reavaliar, ajustar, bloquear, escalar. Incidente registrado com causa e correção." },
          { name: "Evidência", desc: "Todo evento monitorado vira evidência de que o controle de monitoramento existe e funciona." },
        ],
        visual: <ControlCenter />,
        visualTitle: "Monitoramento que alimenta a visão executiva",
        visualDescription:
          "Cada alerta atualiza a postura de risco do sistema e do portfólio. A diretoria vê tendências; o owner vê o que precisa fazer agora.",
        deliverables: [
          "Plano de monitoramento por sistema (o quê, como, limites)",
          "Instrumentação de logs, métricas e eventos",
          "Linhas de base e thresholds documentados",
          "Alertas roteados por owner e severidade",
          "Playbooks de resposta a eventos e incidentes",
          "Relatórios periódicos de saúde e postura de risco",
          "Evidências contínuas para auditoria",
        ],
        statement: "Não apenas monitoramento. Resposta.",
        faq: [
          { q: "Precisamos usar a plataforma de vocês para monitorar?", a: "Não. Podemos instrumentar com as ferramentas de observabilidade que você já usa e integrar à nossa plataforma quando fizer sentido. O importante é que os sinais certos cheguem às pessoas certas." },
          { q: "Como detectam mudança de modelo em fornecedores SaaS?", a: "Combinando sinais: metadados de versão quando disponíveis, testes canário periódicos com respostas de referência, e detecção estatística de mudança de comportamento. Uma queda abrupta de qualidade sem mudança interna costuma indicar atualização externa." },
          { q: "Monitoramento inclui custos?", a: "Sim. Custos de tokens e chamadas por sistema e por agente são um indicador de saúde e de risco, um agente em loop ou sob abuso costuma aparecer primeiro na conta." },
        ],
        ctaTitle: "Quando foi a última vez que um modelo mudou na sua empresa? Você saberia responder?",
        ctaText: "Monitoramento contínuo transforma essa pergunta em um dado: data, sistema, impacto e resposta.",
      }}
    />
  );
}
