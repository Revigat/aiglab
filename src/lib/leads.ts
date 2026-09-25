import { isCorporateEmail, isValidEmail } from "./utils";

export type LeadSource = "contato" | "assessment" | "diagnostico" | "agentes";

export type LeadPayload = {
  source: LeadSource;
  name: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
  message?: string;
  topic?: string;
  /** Resultado do assessment, quando aplicável */
  assessment?: {
    score: number;
    level: number;
    levelName: string;
    answers: Record<string, string>;
  };
  consent: boolean;
  /** honeypot anti-spam: deve vir vazio */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

export function validateLead(input: Partial<LeadPayload>): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name || input.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (!input.company || input.company.trim().length < 2) errors.company = "Informe a empresa.";
  if (!input.role || input.role.trim().length < 2) errors.role = "Informe seu cargo.";
  if (!input.email || !isValidEmail(input.email)) {
    errors.email = "Informe um e-mail válido.";
  } else if (!isCorporateEmail(input.email)) {
    errors.email = "Use um e-mail corporativo (domínio da empresa).";
  }
  if (input.message && input.message.length > 2000) errors.message = "Mensagem muito longa.";
  if (!input.consent) errors.consent = "É necessário aceitar o contato para prosseguir.";
  return errors;
}

export const roles = [
  "CIO / CTO",
  "CISO / Segurança",
  "DPO / Privacidade",
  "Jurídico",
  "Compliance / Riscos",
  "Diretoria / C-Level",
  "Conselho",
  "Gestor de Tecnologia / Dados",
  "Produto / Engenharia",
  "Outro",
];
