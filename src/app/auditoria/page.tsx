import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/layout/ServicePage";
import { EvidenceTimeline } from "@/components/mockups/EvidenceTimeline";
import { AuditFindings } from "@/components/mockups/AuditFindings";

export const metadata = pageMetadata({
  title: "Auditoria de IA e Compliance de IA",
  description:
    "Auditoria de sistemas e agentes de IA: gap analysis, avaliação de controles e riscos, segurança, privacidade, robustez, viés, qualidade, trilhas de auditoria e plano de remediação. Não basta dizer que está adequado, é preciso provar.",
  path: "/auditoria",
  keywords: ["Auditoria de IA", "Auditoria de agentes de IA", "Gap analysis IA", "Compliance de IA"],
});

export default function Page() {
  return (
    <ServicePage
      c={{
        path: "/auditoria",
        crumbs: [
          { name: "Soluções", path: "/solucoes" },
          { name: "Auditoria + Compliance", path: "/auditoria" },
        ],
        eyebrow: "Auditoria + Compliance",
        title: (
          <>
            Não basta dizer que está adequado. <span className="text-gradient">É preciso conseguir provar.</span>
          </>
        ),
        titleText: "Auditoria de IA e Compliance",
        description:
          "Auditamos sistemas e agentes de IA com método técnico: identificamos o problema, medimos o risco, verificamos os controles e entregamos um plano de remediação priorizado, com evidências.",
        serviceType: "Auditoria de Inteligência Artificial",
        primary: { label: "Auditar minha IA", href: "/contato?tema=auditoria" },
        hero: <AuditFindings />,
        scopeDescription:
          "Auditoria de IA não é revisão documental. É verificação técnica de como o sistema se comporta, quais dados toca, quais controles existem e se eles funcionam.",
        scope: [
          { title: "Auditoria de sistemas de IA", desc: "Verificação ponta a ponta: finalidade, dados, modelo, integrações, controles, logs e responsáveis." },
          { title: "Auditoria de agentes", desc: "Identidade, permissões de ferramentas, limites de autonomia, aprovação humana e trilha de ações." },
          { title: "Gap analysis", desc: "Distância entre o estado atual e ISO/IEC 42001, NIST AI RMF, LGPD, OWASP e requisitos setoriais." },
          { title: "AI compliance", desc: "Mapeamento de obrigações aplicáveis e verificação de atendimento, com evidências por requisito." },
          { title: "Avaliação de controles", desc: "Os controles declarados existem? Funcionam? Podem ser demonstrados? Testamos cada um." },
          { title: "Avaliação de riscos", desc: "Riscos técnicos, operacionais, legais e reputacionais por sistema, com criticidade e prioridade." },
          { title: "Segurança", desc: "Prompt injection, exfiltração de dados, excesso de agência, abuso de ferramentas, supply chain de modelos." },
          { title: "Privacidade", desc: "Dados pessoais em treinamento, inferência, logs e decisões automatizadas, sob a ótica da LGPD." },
          { title: "Robustez", desc: "Comportamento sob entradas adversariais, ambíguas ou fora da distribuição esperada." },
          { title: "Viés", desc: "Disparidades de resultado entre grupos em sistemas que afetam pessoas: crédito, RH, atendimento, saúde." },
          { title: "Qualidade e documentação", desc: "Acurácia, consistência e aderência ao propósito; completude da documentação técnica." },
          { title: "Trilhas de auditoria e remediação", desc: "Rastreabilidade do que aconteceu e plano de correção priorizado por risco, com owner e prazo." },
        ],
        steps: [
          { name: "Escopo e critérios", desc: "Definimos os sistemas auditados, as referências aplicáveis e os critérios de avaliação. Sem surpresas no final." },
          { name: "Coleta técnica", desc: "Acesso a documentação, configurações, logs, prompts, integrações e permissões. Entrevistas com owners e operadores." },
          { name: "Testes", desc: "Execução de testes de segurança, robustez, qualidade e viés. Verificação prática de cada controle declarado." },
          { name: "Achados e risco", desc: "Cada achado recebe criticidade, evidência e impacto potencial. Nada de listas genéricas." },
          { name: "Plano de remediação", desc: "Correções priorizadas por risco, com owner, prazo e forma de verificação." },
          { name: "Acompanhamento", desc: "Ajudamos a corrigir e verificamos a remediação. O ciclo fecha quando a evidência existe." },
        ],
        visual: <EvidenceTimeline />,
        visualTitle: "A trilha que um auditor quer ver",
        visualDescription:
          "Cada evidência é rastreável ao controle e ao requisito que atende, com data, responsável e resultado. É isso que transforma uma auditoria em prova.",
        deliverables: [
          "Relatório de auditoria com achados classificados por criticidade",
          "Evidências técnicas por achado e por controle",
          "Gap analysis frente às referências aplicáveis",
          "Matriz de riscos por sistema",
          "Resultados de testes de segurança, robustez, qualidade e viés",
          "Plano de remediação priorizado com owners e prazos",
          "Trilha de auditoria consolidada",
          "Reunião executiva de apresentação dos resultados",
        ],
        statement: "Encontramos o problema, medimos o risco e mostramos como corrigi-lo.",
        faq: [
          { q: "Vocês emitem um certificado ao final da auditoria?", a: "Não. Entregamos um relatório técnico independente com achados, evidências e plano de remediação. Certificações são emitidas por organismos certificadores; nossa auditoria prepara a organização para esse processo." },
          { q: "A auditoria interfere na operação?", a: "Minimamente. Trabalhamos com acesso somente-leitura sempre que possível e agendamos testes em ambientes controlados ou janelas definidas com o time." },
          { q: "É possível auditar IA de fornecedores, como um copilot SaaS?", a: "Sim. Auditamos a forma como a empresa usa, integra e controla a ferramenta: dados enviados, permissões, configurações, logs e cláusulas contratuais, além de avaliar a documentação do fornecedor." },
          { q: "Qual a diferença entre auditoria e diagnóstico?", a: "O diagnóstico dá visibilidade rápida (inventário, riscos aparentes, maturidade). A auditoria verifica em profundidade sistemas específicos, com testes e evidências, frente a critérios definidos." },
        ],
        ctaTitle: "Sua IA passaria em uma auditoria hoje?",
        ctaText: "Descubra antes que alguém pergunte. Auditoria técnica com achados, evidências e plano de remediação priorizado.",
      }}
    />
  );
}
