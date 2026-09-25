import { BookOpenCheck } from "lucide-react";
import { frameworks } from "@/config/services";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Frameworks() {
  return (
    <Section id="frameworks">
      <SectionHeading
        eyebrow="Referências técnicas"
        title="Controles alinhados a normas e frameworks reconhecidos."
        description="Referências como base de engenharia, não como checklist. Cada controle é rastreável ao requisito que atende."
        align="center"
      />
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {frameworks.map((f, i) => (
          <Reveal
            as="li"
            key={f.name}
            delay={(i % 5) * 60}
            className="card card-hover flex flex-col p-5"
          >
            <BookOpenCheck className="size-4 text-brand-300" aria-hidden />
            <h3 className="mt-4 font-mono text-[13px] font-semibold tracking-wide text-fg">{f.name}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{f.desc}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={200} className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-fg-subtle">
        Não emitimos certificações nem garantimos conformidade legal. Preparamos a organização com
        controles e evidências e trabalhamos junto a certificadores e jurídico. Não constitui parecer jurídico.
      </Reveal>
    </Section>
  );
}
