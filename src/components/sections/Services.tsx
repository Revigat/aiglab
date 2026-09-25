import { Check } from "lucide-react";
import { serviceCategories } from "@/config/services";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MonitoringDashboard } from "@/components/mockups/MonitoringDashboard";
import { AgentGovernance } from "@/components/mockups/AgentGovernance";
import { AIPassport } from "@/components/mockups/AIPassport";
import { EvidenceTimeline } from "@/components/mockups/EvidenceTimeline";
import { cn } from "@/lib/utils";

const visuals = {
  consultoria: AIPassport,
  auditoria: EvidenceTimeline,
  monitoramento: MonitoringDashboard,
  "governanca-de-agentes": AgentGovernance,
} as const;

export function Services() {
  return (
    <Section id="servicos" tone="elevated">
      <SectionHeading
        eyebrow="Serviços"
        title="Consultoria, auditoria, monitoramento e governança de agentes. Em uma única operação."
        description="O que descobrimos vira controle, o que auditamos vira evidência, o que monitoramos vira resposta."
        align="center"
      />

      <div className="mt-16 grid gap-20 lg:gap-28">
        {serviceCategories.map((s, i) => {
          const Visual = visuals[s.slug];
          const reverse = i % 2 === 1;
          return (
            <article
              key={s.slug}
              id={s.slug}
              className={cn(
                "grid items-center gap-10 lg:grid-cols-12 lg:gap-14",
              )}
            >
              <Reveal className={cn("lg:col-span-5", reverse && "lg:order-2")}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-300">
                  {s.eyebrow}
                </p>
                <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl lg:text-[2.1rem]">
                  {s.headline}
                </h3>
                <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{s.description}</p>
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-[13.5px] text-fg-muted">
                      <Check className="size-3.5 shrink-0 text-brand-400" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-l-2 border-brand-500/60 pl-4 text-[15px] font-medium text-fg">
                  {s.message}
                </p>
                <div className="mt-7">
                  <Button href={s.cta.href} arrow>
                    {s.cta.label}
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={120} className={cn("lg:col-span-7", reverse && "lg:order-1")}>
                <Visual />
              </Reveal>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
