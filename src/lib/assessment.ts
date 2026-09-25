export type Option = { value: string; label: string; points: number };
export type Question = {
  id: string;
  kind: "exposure" | "control";
  title: string;
  hint?: string;
  options: Option[];
  /** Rótulo curto do uso de alto impacto que a pergunta detecta (opções com 3 pontos). */
  highImpactUse?: string;
};

/** 17 perguntas: 8 de exposição (contexto e uso) + 9 de controle (maturidade). */
export const questions: Question[] = [
  {
    id: "q1",
    kind: "exposure",
    title: "Quantos sistemas de IA sua empresa utiliza?",
    hint: "Considere ferramentas SaaS (ChatGPT, Copilot), APIs, chatbots, automações, modelos internos e agentes.",
    options: [
      { value: "unknown", label: "Não sabemos ao certo", points: 3 },
      { value: "1-5", label: "1 a 5", points: 1 },
      { value: "6-20", label: "6 a 20", points: 2 },
      { value: "20+", label: "Mais de 20", points: 3 },
    ],
  },
  {
    id: "q2",
    kind: "exposure",
    title: "Utiliza agentes autônomos?",
    hint: "Agentes que executam ações: acessam APIs, alteram dados, enviam mensagens, acionam workflows.",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "pilot", label: "Em piloto ou testes", points: 1 },
      { value: "prod", label: "Sim, em produção", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q3",
    kind: "exposure",
    title: "Utiliza IA com dados pessoais?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "some", label: "Sim, dados pessoais comuns", points: 2 },
      { value: "sensitive", label: "Sim, incluindo dados sensíveis", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q4",
    kind: "exposure",
    title: "A IA toma decisões automaticamente?",
    hint: "Sem revisão humana antes do efeito: aprovação, classificação, precificação, bloqueio, resposta ao cliente.",
    options: [
      { value: "no", label: "Não, sempre há revisão humana", points: 0 },
      { value: "low", label: "Sim, em decisões de baixo impacto", points: 1 },
      { value: "high", label: "Sim, em decisões relevantes", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q4a",
    kind: "exposure",
    title: "A IA decide ou influencia contratação, promoção ou desligamento?",
    highImpactUse: "Decisões sobre pessoas no trabalho",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "assist", label: "Apoia, mas a decisão é humana", points: 1 },
      { value: "yes", label: "Sim, filtra ou decide automaticamente", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q4b",
    kind: "exposure",
    title: "A IA decide ou influencia crédito, preço, seguro ou acesso a um serviço para pessoas?",
    highImpactUse: "Acesso a crédito, preço ou serviço",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "assist", label: "Apoia, mas a decisão é humana", points: 1 },
      { value: "yes", label: "Sim, decide automaticamente", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q4c",
    kind: "exposure",
    title: "A IA conversa com clientes ou público sem informar que é IA?",
    highImpactUse: "Interação com pessoas sem identificação",
    options: [
      { value: "no", label: "Não, sempre informa", points: 0 },
      { value: "partial", label: "Em alguns canais", points: 1 },
      { value: "yes", label: "Sim", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q5",
    kind: "exposure",
    title: "Existem sistemas de IA críticos para o negócio ou regulados?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "some", label: "Alguns", points: 2 },
      { value: "yes", label: "Sim, vários", points: 3 },
      { value: "unknown", label: "Não sabemos", points: 3 },
    ],
  },
  {
    id: "q6",
    kind: "control",
    title: "Existe um inventário dos sistemas de IA?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "partial", label: "Parcial ou informal", points: 1 },
      { value: "yes", label: "Sim, atualizado e com responsáveis", points: 3 },
    ],
  },
  {
    id: "q7",
    kind: "control",
    title: "Existe uma política de uso e governança de IA?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "draft", label: "Em elaboração ou pouco aplicada", points: 1 },
      { value: "yes", label: "Sim, aprovada e comunicada", points: 3 },
    ],
  },
  {
    id: "q8",
    kind: "control",
    title: "Os sistemas de IA passam por avaliação de risco e impacto?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "some", label: "Apenas alguns, sem método definido", points: 1 },
      { value: "yes", label: "Sim, com critérios e registro", points: 3 },
    ],
  },
  {
    id: "q9",
    kind: "control",
    title: "Existem logs de prompts, respostas, ações e decisões?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "partial", label: "Parcial, sem padrão", points: 1 },
      { value: "yes", label: "Sim, estruturados e com retenção definida", points: 3 },
    ],
  },
  {
    id: "q10",
    kind: "control",
    title: "Existe supervisão humana definida (human-in-the-loop)?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "informal", label: "Informal, depende do time", points: 1 },
      { value: "yes", label: "Sim, com regras claras de quando escalar", points: 3 },
    ],
  },
  {
    id: "q11",
    kind: "control",
    title: "Os modelos e sistemas são monitorados após a implantação?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "manual", label: "Eventualmente, de forma manual", points: 1 },
      { value: "yes", label: "Sim, com alertas de mudança, drift e incidentes", points: 3 },
    ],
  },
  {
    id: "q12",
    kind: "control",
    title: "Existe processo para incidentes envolvendo IA?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "generic", label: "Usamos o processo geral de TI", points: 1 },
      { value: "yes", label: "Sim, específico para IA e testado", points: 3 },
    ],
  },
  {
    id: "q13",
    kind: "control",
    title: "Fornecedores e modelos de terceiros são avaliados?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "contract", label: "Apenas contratualmente", points: 1 },
      { value: "yes", label: "Sim, técnica e contratualmente, com reavaliação", points: 3 },
    ],
  },
  {
    id: "q14",
    kind: "control",
    title: "É possível demonstrar hoje quais controles estão ativos, com evidências?",
    options: [
      { value: "no", label: "Não", points: 0 },
      { value: "partial", label: "Parcialmente, com esforço manual", points: 1 },
      { value: "yes", label: "Sim, com evidências rastreáveis", points: 3 },
    ],
  },
];

export type Result = {
  score: number; // 0–100 maturidade (controles)
  exposure: number; // 0–100 exposição
  level: number; // 0–5
  levelName: string;
  summary: string;
  gaps: string[];
  priorities: string[];
  /** Usos de alto impacto detectados nas perguntas de exposição. */
  highImpactUses: string[];
};

const levelNames = [
  "IA desconhecida",
  "IA identificada",
  "IA documentada",
  "IA avaliada",
  "IA controlada",
  "IA monitorada e continuamente melhorada",
];

export function computeResult(answers: Record<string, string>): Result {
  const controls = questions.filter((q) => q.kind === "control");
  const exposures = questions.filter((q) => q.kind === "exposure");

  const sum = (qs: Question[]) =>
    qs.reduce((acc, q) => {
      const opt = q.options.find((o) => o.value === answers[q.id]);
      return acc + (opt?.points ?? 0);
    }, 0);

  const cMax = controls.length * 3;
  const eMax = exposures.length * 3;
  const score = Math.round((sum(controls) / cMax) * 100);
  const exposure = Math.round((sum(exposures) / eMax) * 100);

  // Nível pela combinação de score e marcos específicos
  const has = (id: string, v: string) => answers[id] === v;
  let level = 0;
  if (has("q6", "partial") || has("q6", "yes")) level = 1;
  if (has("q6", "yes") && (has("q7", "yes") || has("q7", "draft"))) level = 2;
  if (level >= 2 && has("q8", "yes")) level = 3;
  if (level >= 3 && has("q10", "yes") && has("q9", "yes")) level = 4;
  if (level >= 4 && has("q11", "yes") && has("q12", "yes") && has("q14", "yes")) level = 5;
  // Ajuste por score quando marcos não capturam
  if (score >= 90) level = Math.max(level, 5);
  else if (score >= 70) level = Math.max(level, 4);
  else if (score >= 50) level = Math.max(level, 3);

  const gaps: string[] = [];
  const priorities: string[] = [];
  const weak = (id: string) => {
    const q = questions.find((x) => x.id === id)!;
    const opt = q.options.find((o) => o.value === answers[id]);
    return (opt?.points ?? 0) < 3;
  };
  if (weak("q6")) {
    gaps.push("Inventário de IA incompleto ou inexistente");
    priorities.push("AI Inventory + AI Passport dos sistemas críticos");
  }
  if (weak("q8")) {
    gaps.push("Risco e impacto não avaliados com método");
    priorities.push("Risk & Impact Assessment priorizado por criticidade");
  }
  if (weak("q9") || weak("q10")) {
    gaps.push("Controles de rastreabilidade e supervisão humana insuficientes");
    priorities.push("Logs estruturados e regras de human-in-the-loop");
  }
  if (weak("q11") || weak("q12")) {
    gaps.push("Sem monitoramento contínuo ou resposta a incidentes específica para IA");
    priorities.push("Monitoramento de drift, mudanças de modelo e incidentes");
  }
  if (weak("q13")) {
    gaps.push("Fornecedores e modelos externos sem avaliação técnica");
    priorities.push("Avaliação de fornecedores de IA");
  }
  if (weak("q14")) {
    gaps.push("Controles não demonstráveis por evidência");
    priorities.push("Evidence Center com trilha de auditoria");
  }
  if (answers["q2"] === "prod" || answers["q2"] === "unknown") {
    gaps.push("Agentes autônomos em operação sem governança específica");
    priorities.unshift("Governança de agentes: identidade, permissões, limites e aprovação humana");
  }
  if (answers["q7"] === "no") {
    gaps.push("Ausência de política de IA");
  }

  // Usos de alto impacto: perguntas de exposição com rótulo e resposta de 3 pontos
  const highImpactUses = exposures
    .filter((q) => q.highImpactUse)
    .filter((q) => (q.options.find((o) => o.value === answers[q.id])?.points ?? 0) >= 3)
    .map((q) => q.highImpactUse!);

  if (highImpactUses.length > 0) {
    priorities.unshift("Avaliação de impacto e supervisão humana nos sistemas que decidem sobre pessoas");
    if (weak("q8") || weak("q10")) {
      gaps.unshift("IA de alto impacto sem avaliação de impacto ou revisão humana definida");
    }
  }

  const summary =
    exposure >= 60 && score < 50
      ? "Alta exposição com baixo controle. Os riscos existem hoje e não há evidências para demonstrá-los sob controle. Priorize inventário, avaliação e controles nos sistemas críticos."
      : exposure >= 60
        ? "Alta exposição com controles em evolução. Próximo passo: fechar lacunas e transformar controles em evidências e monitoramento contínuo."
        : score < 50
          ? "Exposição moderada, base de governança frágil. Inventário e avaliação inicial dão visibilidade rápida com baixo esforço."
          : "Boa base de governança. O foco agora é monitoramento, resposta a incidentes e evidências sempre atualizadas.";

  return {
    score,
    exposure,
    level,
    levelName: levelNames[level],
    summary,
    gaps: gaps.slice(0, 6),
    priorities: priorities.slice(0, 5),
    highImpactUses,
  };
}
