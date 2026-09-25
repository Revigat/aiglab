/**
 * Configuração central da marca e do site.
 * Altere aqui para refletir em todo o site (nome, domínio, contato, SEO).
 */
export const site = {
  name: "AIG Lab",
  /** Partes do wordmark: "AIG" em peso forte, "Lab" em peso leve. */
  wordmark: { strong: "AIG", light: "Lab" },
  legalName: "AIG Lab · Artificial Intelligence Governance",
  tagline: "Artificial Intelligence Governance",
  description:
    "Governança de Inteligência Artificial para empresas: identificamos, avaliamos, controlamos e monitoramos sistemas de IA, modelos e agentes autônomos, e transformamos governança em evidências técnicas.",
  /** URL pública sem barra final. GitHub Pages: https://revigat.github.io/aiglab. Trocar ao apontar domínio próprio. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://revigat.github.io/aiglab",
  locale: "pt_BR",
  email: "contato@aiglab.ai",
  phone: "+55 11 0000-0000",
  address: "São Paulo, SP, Brasil",
  linkedin: "https://www.linkedin.com/company/aiglab",
  keywords: [
    "Governança de IA",
    "Governança de Inteligência Artificial",
    "AI Governance",
    "AI Risk Management",
    "Auditoria de IA",
    "Compliance de IA",
    "Governança de agentes de IA",
    "Segurança de agentes de IA",
    "Monitoramento de IA",
    "AI Governance Brasil",
    "Consultoria de Governança de IA",
    "ISO 42001",
    "NIST AI RMF",
    "LGPD e IA",
  ],
} as const;

export const nav = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Plataforma", href: "/plataforma" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Casos", href: "/casos" },
  { label: "Conteúdos", href: "/conteudos" },
] as const;

export const solutionsNav = [
  {
    label: "Consultoria + Implementação",
    href: "/consultoria",
    desc: "Governança que vira processo, controle e arquitetura.",
  },
  {
    label: "Auditoria + Compliance",
    href: "/auditoria",
    desc: "Provar adequação com evidências técnicas.",
  },
  {
    label: "AI Risk Management",
    href: "/ai-risk",
    desc: "Risco e impacto por sistema, priorizado.",
  },
  {
    label: "AI Compliance",
    href: "/compliance",
    desc: "Controles alinhados a ISO 42001, NIST AI RMF, LGPD.",
  },
  {
    label: "Monitoramento Contínuo",
    href: "/monitoramento",
    desc: "Modelos, prompts, agentes e fornecedores sob observação.",
  },
  {
    label: "Governança de Agentes",
    href: "/governanca-de-agentes",
    desc: "Identidade, permissões, limites e rastreabilidade.",
  },
] as const;

export const ctas = {
  primary: { label: "Diagnosticar minha IA", href: "/assessment" },
  secondary: { label: "Falar com especialista", href: "/contato" },
  maturity: { label: "Avaliar minha maturidade", href: "/assessment" },
  agents: { label: "Avaliar meus agentes", href: "/contato?tema=agentes" },
  request: { label: "Solicitar diagnóstico", href: "/contato?tema=diagnostico" },
  risks: { label: "Quero descobrir meus riscos", href: "/assessment" },
} as const;
