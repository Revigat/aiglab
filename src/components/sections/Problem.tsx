import { HelpCircle } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const tools = [
  "ChatGPT",
  "Gemini",
  "Claude",
  "Copilot",
  "APIs de LLM",
  "Chatbots",
  "RAG",
  "Agentes",
  "Automações",
  "IA multimodal",
  "Modelos internos",
  "Ferramentas de terceiros",
];

const unknowns = [
  "quantas IAs possuem",
  "quais dados são utilizados",
  "quais decisões são automatizadas",
  "quais agentes acessam ferramentas",
  "quem é responsável",
  "quando um modelo mudou",
  "quais controles existem",
  "o que acontece quando a IA falha",
];

export function Problem() {
  return (
    <Section id="problema" tone="elevated">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="O problema"
            title="A IA entrou na sua empresa. A governança acompanhou?"
            description="Times contratando ferramentas, devs integrando APIs, áreas criando automações. O resultado é um parque de IA que ninguém enxerga por inteiro."
          />
          <Reveal delay={120} className="mt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
              Hoje, uma empresa típica opera
            </p>
            <ul className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 text-[13px] text-fg-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="mt-10 rounded-2xl border border-brand-500/25 bg-brand-500/[0.06] p-6">
            <p className="text-balance text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
              O problema não é usar IA. O problema é não saber exatamente o que sua IA está fazendo.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100} className="card p-6 sm:p-8">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
              E muitas empresas não sabem
            </p>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {unknowns.map((u, i) => (
                <li key={u} className="flex items-start gap-3 text-[15px] leading-snug text-fg-muted">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-line bg-white/[0.03]">
                    <HelpCircle className="size-3 text-warn" aria-hidden />
                  </span>
                  <span>
                    <span className="mr-1.5 font-mono text-[10px] text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {u}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5 text-sm text-fg-muted">
              Cada item é uma pergunta que um auditor, um cliente ou o conselho pode fazer. Ajudamos a
              responder todas, com evidência.
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
