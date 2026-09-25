import {
  HeartPulse,
  Landmark,
  ShoppingBag,
  Factory,
  Code2,
  Megaphone,
  Users,
  Headset,
  Scale,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { sectors } from "@/config/services";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons: Record<(typeof sectors)[number]["key"], LucideIcon> = {
  saude: HeartPulse,
  financeiro: Landmark,
  rh: Users,
  educacao: GraduationCap,
  atendimento: Headset,
  varejo: ShoppingBag,
  industria: Factory,
  tecnologia: Code2,
  juridico: Scale,
  marketing: Megaphone,
};

export function Sectors() {
  return (
    <Section id="setores">
      <SectionHeading
        eyebrow="Setores"
        title="Onde há IA decidindo, há governança a construir."
        description="O método é o mesmo. O que muda é o uso: quanto mais a IA decide sobre pessoas, maior o controle exigido."
        align="center"
      />
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {sectors.map((s, i) => {
          const Icon = icons[s.key];
          return (
            <Reveal
              as="li"
              key={s.key}
              delay={(i % 5) * 50}
              className={cn("card card-hover group p-5", s.highImpact && "border-warn/25")}
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-fg-muted transition-colors group-hover:text-brand-300" aria-hidden />
                {s.highImpact && (
                  <span className="rounded border border-warn/30 bg-warn/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-warn">
                    decide sobre pessoas
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-fg">{s.name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{s.desc}</p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
