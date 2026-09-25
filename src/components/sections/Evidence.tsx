import { Check } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EvidenceTimeline } from "@/components/mockups/EvidenceTimeline";

const proofs = [
  "qual sistema existe e para que serve",
  "quais dados e modelo utiliza",
  "qual risco possui",
  "quais controles existem",
  "quem é responsável",
  "quais testes rodaram, quando e com qual resultado",
  "quais incidentes ocorreram e como foram corrigidos",
  "qual é o status atual",
];

export function Evidence() {
  return (
    <Section id="evidencias" tone="elevated">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Evidências"
            title="Transformamos governança em evidência."
            description="A pergunta não é “vocês têm controles?”. É “conseguem demonstrar que funcionam?”. Cada etapa gera evidência rastreável, versionada e pronta para auditoria."
          />
          <Reveal delay={120} className="mt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
              Para cada sistema de IA, demonstramos
            </p>
            <ul className="grid gap-2">
              {proofs.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] text-fg-muted">
                  <Check className="size-3.5 shrink-0 text-ok" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={100} className="lg:col-span-7">
          <EvidenceTimeline />
        </Reveal>
      </div>
    </Section>
  );
}
