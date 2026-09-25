export type ServiceCategory = {
  slug: "consultoria" | "auditoria" | "monitoramento" | "governanca-de-agentes";
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  items: string[];
  message: string;
  cta: { label: string; href: string };
  href: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "consultoria",
    eyebrow: "01 · Consultoria + Implementação",
    title: "Consultoria + Implementação",
    headline: "Governança que vira processo, controle e arquitetura.",
    description:
      "Requisitos de governança viram processos, controles e arquitetura operacional.",
    items: [
      "Diagnóstico de maturidade",
      "AI Inventory",
      "Risk & Impact Assessment",
      "Políticas e responsabilidades",
      "Controles técnicos e organizacionais",
      "Human-in-the-loop",
      "Avaliação de fornecedores",
      "Implementação e documentação",
    ],
    message: "Não apenas diagnóstico. Implementação.",
    cta: { label: "Implementar Governança", href: "/consultoria" },
    href: "/consultoria",
  },
  {
    slug: "auditoria",
    eyebrow: "02 · Auditoria + Compliance",
    title: "Auditoria + Compliance",
    headline: "Não basta dizer que está adequado. É preciso conseguir provar.",
    description:
      "Auditamos sistemas e agentes, medimos o gap frente a normas e frameworks e entregamos um plano de remediação priorizado por risco.",
    items: [
      "Auditoria de sistemas e agentes",
      "Gap analysis",
      "Avaliação de controles e riscos",
      "Segurança e privacidade",
      "Robustez, viés e qualidade",
      "Documentação",
      "Trilhas de auditoria",
      "Plano de remediação",
    ],
    message: "Encontramos o problema, medimos o risco e mostramos como corrigi-lo.",
    cta: { label: "Auditar minha IA", href: "/auditoria" },
    href: "/auditoria",
  },
  {
    slug: "monitoramento",
    eyebrow: "03 · Monitoramento Contínuo",
    title: "Monitoramento Contínuo",
    headline: "Sua IA mudou. Você percebeu?",
    description:
      "Fornecedores atualizam modelos, times alteram prompts, agentes ganham ferramentas. Monitoramos o que muda e o que degrada, antes de virar incidente.",
    items: [
      "Modelos e prompts",
      "Agentes e APIs",
      "Fornecedores",
      "Acessos",
      "Decisões",
      "Performance e custos",
      "Incidentes",
      "Alterações",
    ],
    message: "Não apenas monitoramento. Resposta.",
    cta: { label: "Monitorar minha IA", href: "/monitoramento" },
    href: "/monitoramento",
  },
  {
    slug: "governanca-de-agentes",
    eyebrow: "04 · Governança de Agentes",
    title: "Governança de Agentes",
    headline: "Seus agentes podem agir. Quem controla o que eles podem fazer?",
    description:
      "Agentes acessam APIs, alteram dados, enviam mensagens, tomam decisões e acionam outros agentes. Cada capacidade precisa de limite e rastro.",
    items: [
      "Identidade e objetivo",
      "Ferramentas e permissões",
      "Dados",
      "Autonomia e limites",
      "Aprovação humana",
      "Logs",
      "Custos",
      "Comportamento e incidentes",
    ],
    message: "Cada agente precisa de identidade, propósito, permissões, limites e rastreabilidade.",
    cta: { label: "Avaliar meus agentes", href: "/governanca-de-agentes" },
    href: "/governanca-de-agentes",
  },
];

export const platformModules = [
  {
    code: "INV",
    name: "AI Inventory",
    desc: "Todos os sistemas de IA em um único lugar.",
    detail: "Descoberta, catalogação e classificação de modelos, aplicações, integrações e agentes, internos e de terceiros.",
  },
  {
    code: "PSP",
    name: "AI Passport",
    desc: "Identidade, finalidade, dados, modelo, risco e controles de cada sistema.",
    detail: "A ficha técnica viva de cada sistema de IA: quem responde, o que faz, com quais dados, sob quais controles.",
  },
  {
    code: "RSK",
    name: "Risk Engine",
    desc: "Classificação e priorização automática de riscos.",
    detail: "Critérios configuráveis por criticidade, dados, autonomia, impacto e exposição regulatória.",
  },
  {
    code: "ASM",
    name: "AI Assessment",
    desc: "Avaliações de risco e impacto.",
    detail: "Questionários estruturados, workflows de aprovação e histórico versionado por sistema.",
  },
  {
    code: "EVL",
    name: "AI Evaluation",
    desc: "Testes de qualidade, segurança, robustez e comportamento.",
    detail: "Suítes de teste, red teaming, regressão e comparação entre versões de modelo e prompt.",
  },
  {
    code: "CTL",
    name: "Control Center",
    desc: "Gestão dos controles.",
    detail: "Biblioteca de controles, status de implementação, responsáveis e verificação periódica.",
  },
  {
    code: "INC",
    name: "Incident Management",
    desc: "Registro e tratamento de incidentes.",
    detail: "Registro, triagem, impacto, causa raiz, correção e lições aprendidas, conectados ao sistema afetado.",
  },
  {
    code: "AGT",
    name: "Agent Governance",
    desc: "Governança de agentes autônomos.",
    detail: "Identidade, permissões de ferramentas, limites de autonomia, aprovação humana e trilha de ações.",
  },
  {
    code: "MON",
    name: "Continuous Monitoring",
    desc: "Monitoramento contínuo.",
    detail: "Drift, mudanças de modelo, anomalias de uso, custos e alertas com roteamento para o owner.",
  },
  {
    code: "EVD",
    name: "Evidence Center",
    desc: "Central de evidências para auditorias.",
    detail: "Evidências versionadas, com hash, rastreáveis ao controle e ao requisito que atendem.",
  },
  {
    code: "EXE",
    name: "Executive Dashboard",
    desc: "Visão executiva de toda a governança.",
    detail: "Postura de risco, tendências, pendências e exposição por área, para conselho e diretoria.",
  },
] as const;

export const methodology = [
  {
    step: "01",
    name: "Identificar",
    short: "Inventário e descoberta.",
    desc: "Mapeamos todos os sistemas de IA: modelos, aplicações, integrações, agentes e fornecedores. Cada um recebe um AI Passport.",
    outputs: ["AI Inventory", "AI Passport", "Mapa de dados e integrações"],
  },
  {
    step: "02",
    name: "Avaliar",
    short: "Risco, impacto e qualidade.",
    desc: "Classificamos risco e impacto por sistema, testamos qualidade, segurança e robustez, e priorizamos o que precisa de ação.",
    outputs: ["Risk Assessment", "Impact Assessment", "Relatório de avaliação técnica"],
  },
  {
    step: "03",
    name: "Controlar",
    short: "Implementação dos controles.",
    desc: "Implementamos controles técnicos e organizacionais: limites, permissões, validações, human-in-the-loop, políticas e responsabilidades.",
    outputs: ["Controles implementados", "Políticas e papéis", "Arquitetura de governança"],
  },
  {
    step: "04",
    name: "Monitorar",
    short: "Acompanhamento contínuo.",
    desc: "Acompanhamos mudanças de modelo, drift, incidentes, custos e comportamento de agentes, com alertas para os responsáveis.",
    outputs: ["Monitoramento ativo", "Alertas e rotas de escalonamento", "Métricas de saúde"],
  },
  {
    step: "05",
    name: "Evidenciar",
    short: "Logs, documentação e evidências.",
    desc: "Consolidamos evidências técnicas rastreáveis: o que existe, o que foi testado, quando, por quem e com qual resultado.",
    outputs: ["Evidence Center", "Trilhas de auditoria", "Pacote para auditoria"],
  },
  {
    step: "06",
    name: "Melhorar",
    short: "Correção e evolução contínua.",
    desc: "Quando encontramos problemas, ajudamos a corrigi-los. Cada incidente vira aprendizado, cada correção vira novo controle.",
    outputs: ["Plano de remediação", "Correções aplicadas", "Ciclo de melhoria"],
  },
] as const;

export const maturityLevels = [
  { level: 0, name: "IA desconhecida", desc: "Ninguém sabe quantos sistemas existem nem onde estão." },
  { level: 1, name: "IA identificada", desc: "Existe uma lista de sistemas, ainda sem detalhes ou responsáveis." },
  { level: 2, name: "IA documentada", desc: "Cada sistema tem finalidade, dados, modelo e owner registrados." },
  { level: 3, name: "IA avaliada", desc: "Risco e impacto classificados; testes de qualidade e segurança executados." },
  { level: 4, name: "IA controlada", desc: "Controles implementados, verificados e com responsáveis definidos." },
  { level: 5, name: "IA monitorada e continuamente melhorada", desc: "Monitoramento ativo, resposta a incidentes e evidências sempre atualizadas." },
] as const;

export const frameworks = [
  { name: "ISO/IEC 42001", desc: "Sistema de gestão de IA (AIMS): estrutura organizacional para governar IA." },
  { name: "ISO/IEC 23894", desc: "Gestão de riscos de IA: identificação, análise e tratamento de riscos." },
  { name: "ISO/IEC 42005", desc: "Avaliação de impacto de sistemas de IA sobre indivíduos e sociedade." },
  { name: "NIST AI RMF", desc: "Govern, Map, Measure, Manage: referência para risco de IA." },
  { name: "OWASP", desc: "Top 10 para LLMs e aplicações agentic: prompt injection, excesso de agência, vazamento." },
  { name: "LGPD", desc: "Dados pessoais em treinamento, inferência, logs e decisões automatizadas." },
  { name: "Marco Civil da Internet", desc: "Guarda de registros, responsabilidade e transparência em serviços digitais." },
  { name: "Marco Legal da IA (Brasil)", desc: "Em tramitação. Classificação por risco, avaliação de impacto e supervisão humana. Mais normas setoriais (BACEN, CVM, ANS)." },
  { name: "EU AI Act", desc: "Referência que o Brasil está seguindo. Obrigações para quem opera ou atende clientes na UE." },
  { name: "Boas práticas internacionais", desc: "Model cards, system cards, red teaming, avaliação de fornecedores." },
] as const;

/** Setores: o que muda é o uso sensível. `highImpact` marca decisões diretas sobre pessoas. */
export const sectors = [
  { key: "saude", name: "Saúde", desc: "Apoio a diagnóstico e triagem exigem validação e supervisão médica.", highImpact: true },
  { key: "financeiro", name: "Financeiro", desc: "Crédito, score e fraude decidem o acesso de pessoas a serviços.", highImpact: true },
  { key: "rh", name: "Recursos Humanos", desc: "Triagem, promoção e desligamento pedem revisão humana e rastro.", highImpact: true },
  { key: "educacao", name: "Educação", desc: "Acesso, avaliação e acompanhamento de alunos afetam trajetórias.", highImpact: true },
  { key: "atendimento", name: "Atendimento", desc: "Chatbots e agentes precisam informar que são IA e saber escalar.", highImpact: false },
  { key: "varejo", name: "Varejo", desc: "Precificação e recomendação com dados de clientes, em escala.", highImpact: false },
  { key: "industria", name: "Indústria", desc: "Agentes operacionais e manutenção preditiva em infraestrutura crítica.", highImpact: false },
  { key: "tecnologia", name: "Tecnologia", desc: "Produtos com LLM embarcado respondem pelo que a IA faz no cliente.", highImpact: false },
  { key: "juridico", name: "Jurídico", desc: "Contratos e pesquisa com confidencialidade e rastreabilidade.", highImpact: false },
  { key: "marketing", name: "Marketing", desc: "Segmentação e conteúdo gerado precisam de limites e marcação.", highImpact: false },
] as const;
