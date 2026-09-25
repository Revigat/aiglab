"use client";

import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";

const topicMap: Record<string, { title: string; text: string }> = {
  diagnostico: {
    title: "Solicitar diagnóstico de IA",
    text: "Inventário inicial, riscos aparentes e nível de maturidade. Em poucas semanas você sabe onde está e o que fazer primeiro.",
  },
  consultoria: {
    title: "Implementar governança de IA",
    text: "Do diagnóstico à implementação de controles, com evidência de que funcionam.",
  },
  auditoria: {
    title: "Auditar sistemas e agentes de IA",
    text: "Achados classificados, evidências técnicas e plano de remediação priorizado.",
  },
  compliance: {
    title: "Mapear requisitos de compliance de IA",
    text: "ISO 42001, NIST AI RMF, LGPD, OWASP e EU AI Act traduzidos em controles e evidências.",
  },
  monitoramento: {
    title: "Monitorar sistemas de IA",
    text: "Drift, mudanças de modelo, custos e incidentes detectados e roteados a quem precisa agir.",
  },
  agentes: {
    title: "Avaliar meus agentes",
    text: "Inventário de agentes, permissões, limites de autonomia, aprovação humana e rastreabilidade.",
  },
  plataforma: {
    title: "Early access à plataforma",
    text: "Programa de design partners: uso antecipado, influência no roadmap e condições especiais.",
  },
  conteudos: {
    title: "Receber conteúdos",
    text: "Guias, checklists e templates sobre governança de IA, direto no seu e-mail corporativo.",
  },
};

const defaultTopic = {
  title: "Falar com especialista",
  text: "Conte o contexto da sua IA. Um especialista responde em até 1 dia útil com os próximos passos.",
};

/** Lê `?tema=` no cliente (o site é estático, sem searchParams no servidor). */
export function useTema() {
  const params = useSearchParams();
  const raw = params.get("tema") ?? undefined;
  return raw && raw in topicMap ? raw : undefined;
}

export function ContatoHeading() {
  const tema = useTema();
  const t = tema ? topicMap[tema] : defaultTopic;
  return (
    <>
      <Reveal delay={80}>
        <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-fg sm:text-5xl">
          {t.title}
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{t.text}</p>
      </Reveal>
    </>
  );
}

export function ContatoForm() {
  const tema = useTema();
  return (
    <LeadForm
      source={tema === "agentes" ? "agentes" : tema === "diagnostico" ? "diagnostico" : "contato"}
      topic={tema ?? "diagnostico"}
      submitLabel={tema === "agentes" ? "Avaliar meus agentes" : "Solicitar diagnóstico"}
    />
  );
}
