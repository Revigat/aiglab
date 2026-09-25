import {
  Boxes,
  ClipboardList,
  KeyRound,
  Route,
  Radar,
  UserX,
  Bot,
  Building2,
  FileQuestion,
} from "lucide-react";
import { ctas } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const problems = [
  {
    icon: Boxes,
    title: "IA sem inventário",
    desc: "A empresa não sabe exatamente quais sistemas de IA existem.",
    fix: "AI Inventory + AI Passport",
  },
  {
    icon: ClipboardList,
    title: "IA sem avaliação",
    desc: "A empresa não sabe qual é o nível de risco de cada sistema.",
    fix: "Risk & Impact Assessment",
  },
  {
    icon: KeyRound,
    title: "IA sem controle",
    desc: "Sistemas podem possuir acesso excessivo a dados ou ferramentas.",
    fix: "Controles técnicos e organizacionais",
  },
  {
    icon: Route,
    title: "IA sem rastreabilidade",
    desc: "A empresa não consegue reconstruir o que aconteceu depois de um incidente.",
    fix: "Logs, trilhas e Evidence Center",
  },
  {
    icon: Radar,
    title: "IA sem monitoramento",
    desc: "O sistema foi avaliado uma vez, mas ninguém acompanha sua evolução.",
    fix: "Monitoramento contínuo",
  },
  {
    icon: UserX,
    title: "IA sem responsabilidade",
    desc: "Não está claro quem responde por determinado sistema.",
    fix: "Ownership e governança",
  },
  {
    icon: Bot,
    title: "Agentes sem governança",
    desc: "Agentes autônomos podem executar tarefas sem limites adequados.",
    fix: "Agent Governance",
  },
  {
    icon: Building2,
    title: "IA de terceiros",
    desc: "Fornecedores e modelos externos podem introduzir riscos desconhecidos.",
    fix: "Avaliação de fornecedores",
  },
  {
    icon: FileQuestion,
    title: "Falta de evidências",
    desc: "A empresa possui controles, mas não consegue demonstrar que eles funcionam.",
    fix: "Evidência técnica verificável",
  },
];

export function Problems() {
  return (
    <Section id="resolvemos">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="O que nós resolvemos"
          title="Problemas reais que encontramos dentro das empresas."
          description="Não começamos pela norma. Começamos pelo problema, e cada um tem um caminho técnico de resolução."
        />
        <Reveal delay={120}>
          <Button href={ctas.risks.href} variant="secondary" arrow>
            {ctas.risks.label}
          </Button>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal as="li" key={p.title} delay={(i % 3) * 80} className="card card-hover group flex flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg-muted transition-colors group-hover:border-brand-500/40 group-hover:text-brand-300">
                <p.icon className="size-[18px]" aria-hidden />
              </span>
              <span className="font-mono text-[10px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">{p.title}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-fg-muted">{p.desc}</p>
            <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand-300">
              <span className="text-fg-subtle">→</span> {p.fix}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
