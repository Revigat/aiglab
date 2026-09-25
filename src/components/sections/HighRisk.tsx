import { Scale, Fingerprint, UserX, Users, MessageSquare, Building2 } from "lucide-react";
import { ctas } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const criteria = [
  {
    icon: Scale,
    title: "Decide sobre pessoas",
    desc: "Contratação, crédito, saúde, acesso a um serviço.",
  },
  {
    icon: Fingerprint,
    title: "Usa dados pessoais ou sensíveis",
    desc: "No treinamento, no prompt, nos logs ou na decisão.",
  },
  {
    icon: UserX,
    title: "Age sem revisão humana",
    desc: "O efeito acontece antes de alguém olhar.",
  },
  {
    icon: Users,
    title: "Afeta muita gente ou é difícil de reverter",
    desc: "Escala, frequência e dano que não se desfaz.",
  },
  {
    icon: MessageSquare,
    title: "Fala com pessoas sem se identificar",
    desc: "Chatbots e agentes que parecem humanos.",
  },
];

const duties = ["como usa", "com quais dados", "com qual supervisão", "pelo registro do que aconteceu"];

export function HighRisk() {
  return (
    <Section id="alto-risco">
      <SectionHeading
        eyebrow="Alto risco"
        title="O que torna uma IA de alto risco não é a tecnologia. É o uso."
        description="Cinco perguntas separam uma automação inofensiva de um sistema que precisa de controle e evidência."
        align="center"
      />

      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {criteria.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 5) * 60} className="card card-hover group flex flex-col p-5">
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg-muted transition-colors group-hover:border-warn/40 group-hover:text-warn">
                <c.icon className="size-4" aria-hidden />
              </span>
              <span className="font-mono text-[10px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold leading-snug text-fg">{c.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{c.desc}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={200} className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-warn/25 bg-warn/[0.05] p-6 lg:col-span-5">
          <p className="text-balance text-lg font-semibold leading-snug tracking-tight text-fg sm:text-xl">
            Se a sua IA faz uma dessas coisas, ela precisa de controle e evidência.
          </p>
          <div className="mt-5">
            <Button href={ctas.maturity.href} size="sm" arrow>
              {ctas.maturity.label}
            </Button>
          </div>
        </div>

        <div className="card flex flex-col justify-between gap-5 p-6 lg:col-span-7 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03]">
              <Building2 className="size-[18px] text-brand-300" aria-hidden />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-fg">Não desenvolve IA, só usa? Ainda é responsável.</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                O fornecedor responde pelo modelo. Sua empresa responde:
              </p>
            </div>
          </div>
          <ul className="grid shrink-0 gap-1.5">
            {duties.map((d) => (
              <li key={d} className="flex items-center gap-2 text-[13px] text-fg">
                <span aria-hidden className="size-1.5 rounded-full bg-brand-400" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
