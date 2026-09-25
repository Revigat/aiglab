import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/layout/ServicePage";
import { ComplianceMap } from "@/components/mockups/ComplianceMap";
import { EvidenceTimeline } from "@/components/mockups/EvidenceTimeline";

export const metadata = pageMetadata({
  title: "Compliance de IA: ISO 42001, NIST AI RMF, LGPD e IA",
  description:
    "AI Compliance com controles alinhados a ISO/IEC 42001, ISO/IEC 23894, ISO/IEC 42005, NIST AI RMF, OWASP, LGPD, Marco Civil e EU AI Act. Mapeamento de requisitos, controles e evidências, sem promessas de conformidade garantida.",
  path: "/compliance",
  keywords: ["Compliance de IA", "ISO 42001", "NIST AI RMF", "LGPD e IA", "EU AI Act Brasil"],
});

export default function Page() {
  return (
    <ServicePage
      c={{
        path: "/compliance",
        crumbs: [
          { name: "Soluções", path: "/solucoes" },
          { name: "AI Compliance", path: "/compliance" },
        ],
        eyebrow: "AI Compliance",
        title: (
          <>
            Requisito, controle, evidência. <span className="text-gradient">Nessa ordem. E conectados.</span>
          </>
        ),
        titleText: "AI Compliance",
        description:
          "Mapeamos as obrigações e referências aplicáveis ao seu uso de IA, implementamos controles alinhados a normas, frameworks e boas práticas reconhecidas internacionalmente, e mantemos evidências rastreáveis a cada requisito.",
        serviceType: "Compliance de Inteligência Artificial",
        primary: { label: "Mapear meus requisitos", href: "/contato?tema=compliance" },
        hero: <ComplianceMap />,
        scopeDescription:
          "Compliance de IA não é um checklist assinado. É a capacidade de mostrar, para cada requisito, qual controle o atende e qual evidência prova que o controle funciona.",
        scope: [
          { title: "ISO/IEC 42001", desc: "Sistema de gestão de IA: contexto, liderança, planejamento, controles do Anexo A e melhoria contínua." },
          { title: "ISO/IEC 23894 e 42005", desc: "Gestão de riscos e avaliação de impacto de sistemas de IA integradas ao ciclo de vida." },
          { title: "NIST AI RMF", desc: "Govern, Map, Measure, Manage, traduzidos em práticas e métricas operacionais." },
          { title: "OWASP para LLMs e agentes", desc: "Top 10 para LLM Applications e riscos agentic aplicados a testes e controles técnicos." },
          { title: "LGPD", desc: "Bases legais, minimização, decisões automatizadas (art. 20), RIPD, direitos dos titulares e transferência internacional." },
          { title: "Marco Civil e legislação brasileira", desc: "Guarda de registros, transparência, responsabilidade e normas setoriais (BACEN, CVM, ANS, ANPD)." },
          { title: "EU AI Act", desc: "Classificação por risco e obrigações para empresas com operação, clientes ou usuários na União Europeia." },
          { title: "Mapeamento requisito → controle → evidência", desc: "Cada requisito aplicável vinculado ao controle que o atende e às evidências que o comprovam." },
          { title: "Preparação para certificação e auditoria", desc: "Organização das evidências e processos para auditorias internas, externas e de clientes Enterprise." },
        ],
        steps: [
          { name: "Aplicabilidade", desc: "Quais normas, leis e frameworks realmente se aplicam ao seu contexto: setor, dados, geografia, tipo de sistema." },
          { name: "Mapeamento", desc: "Requisitos traduzidos em linguagem operacional e vinculados a controles, existentes ou a implementar." },
          { name: "Gap analysis", desc: "Onde há requisito sem controle, controle sem evidência ou evidência desatualizada." },
          { name: "Implementação", desc: "Controles implementados com os times. Compliance que não muda a operação não é compliance." },
          { name: "Evidência", desc: "Evidence Center com trilha por requisito: quem, quando, o quê, resultado." },
          { name: "Manutenção", desc: "Monitoramento de mudanças regulatórias, reavaliação periódica e atualização contínua das evidências." },
        ],
        visual: <EvidenceTimeline />,
        visualTitle: "Evidência por requisito, não por pasta",
        visualDescription:
          "Um auditor pergunta “como vocês atendem o requisito X?”. A resposta é um clique: controle, responsável, última verificação e evidências com hash.",
        deliverables: [
          "Matriz de aplicabilidade regulatória e normativa",
          "Mapeamento requisito → controle → evidência",
          "Relatório de gap analysis priorizado",
          "Controles implementados e verificados",
          "Evidence Center organizado por referência",
          "Pacote de preparação para auditoria ou certificação",
          "Calendário de reavaliação e monitoramento regulatório",
        ],
        statement: "Não apenas documentação. Evidência.",
        faq: [
          { q: "Vocês garantem conformidade com a LGPD ou com o EU AI Act?", a: "Não. E desconfie de quem garante. Implementamos controles alinhados às normas e mantemos evidências de que funcionam. Pareceres legais são emitidos por advogados; certificações, por organismos certificadores. Trabalhamos em conjunto com ambos." },
          { q: "Já temos compliance de privacidade. Por que IA é diferente?", a: "Porque IA adiciona riscos que a privacidade não cobre: comportamento não determinístico, mudança de modelo, decisões automatizadas em escala, agentes com acesso a ferramentas, dependência de fornecedores de modelo. Reaproveitamos o que já existe e cobrimos o que falta." },
          { q: "Quanto da ISO/IEC 42001 já teríamos coberto com a ISO 27001?", a: "Boa parte da estrutura de gestão (contexto, liderança, auditoria interna, melhoria). Os controles específicos de IA (inventário, avaliação de impacto, supervisão humana, dados de treinamento, transparência) precisam ser construídos. Fazemos esse mapeamento no gap analysis." },
        ],
        ctaTitle: "Se um cliente Enterprise pedir suas evidências de governança de IA hoje, o que você envia?",
        ctaText: "Construímos a resposta: requisitos mapeados, controles implementados e evidências organizadas.",
      }}
    />
  );
}
