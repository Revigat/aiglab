import { Building2, Cpu, Bot, Database, Wrench, Layers } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const stack = [
  { icon: Building2, label: "Empresa", sub: "áreas, processos, decisões" },
  { icon: Layers, label: "Sistemas de IA", sub: "aplicações, copilots, automações" },
  { icon: Cpu, label: "Modelos", sub: "LLMs, ML, multimodais, internos e externos" },
  { icon: Bot, label: "Agentes", sub: "autônomos, orquestrados, com ferramentas" },
  { icon: Database, label: "Dados", sub: "pessoais, sensíveis, corporativos" },
  { icon: Wrench, label: "Ferramentas", sub: "APIs, CRMs, ERPs, bancos, mensageria" },
];

const transversal = ["Identity", "Risk", "Policy", "Control", "Monitoring", "Evidence"];

export function Infrastructure() {
  return (
    <Section id="infraestrutura" tone="elevated">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Posicionamento"
            title="Não somos apenas consultoria. Construímos a infraestrutura de governança de IA."
            description="Consultoria, auditoria, monitoramento e tecnologia em uma única operação, que evolui para plataforma."
          />
          <Reveal delay={120} className="mt-8 grid gap-3 text-[15px] text-fg-muted">
            <p>
              <span className="font-medium text-fg">Hoje:</span> governança com método, controles e
              evidências, entregue por especialistas.
            </p>
            <p>
              <span className="font-medium text-fg">Em evolução:</span> os mesmos processos como software.
            </p>
            <p>
              <span className="font-medium text-fg">Visão:</span> uma camada de governança entre a empresa
              e tudo o que sua IA toca.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="window relative p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <ol className="grid gap-2">
                {stack.map((s, i) => (
                  <li
                    key={s.label}
                    className="flex items-center gap-3.5 rounded-xl border border-line bg-white/[0.02] px-4 py-3"
                  >
                    <span className="font-mono text-[10px] text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <s.icon className="size-4 shrink-0 text-brand-300" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-fg">{s.label}</p>
                      <p className="truncate text-[12px] text-fg-muted">{s.sub}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex flex-col items-stretch justify-between gap-2 rounded-xl border border-brand-500/35 bg-brand-500/[0.08] p-3 sm:w-[168px]">
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brand-300">
                  Governance layer
                </p>
                <ul className="grid gap-1.5">
                  {transversal.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-brand-500/30 bg-bg/70 px-2 py-1.5 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-fg"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-center text-[10.5px] leading-snug text-fg-muted">
                  atravessa todas as camadas
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
