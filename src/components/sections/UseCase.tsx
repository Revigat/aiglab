import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { UseCaseFlow } from "@/components/mockups/UseCaseFlow";

export function UseCase({ showLink = true }: { showLink?: boolean }) {
  return (
    <Section id="caso">
      <SectionHeading
        eyebrow="Caso demonstrativo"
        title="IA que interpreta documentos e gera uma proposta comercial."
        description="Um cliente envia um documento pelo WhatsApp. A IA extrai os dados, regras calculam a proposta, o CRM é atualizado. Simples, até algo dar errado."
        align="center"
      />
      <Reveal delay={120} className="mt-12">
        <UseCaseFlow />
      </Reveal>
      <Reveal delay={200} className="mx-auto mt-10 max-w-3xl text-center">
        <p className="text-balance text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
          A camada de governança define quando a IA age, quando pede confirmação e quando escala para
          um humano.
        </p>
        {showLink && (
          <div className="mt-7">
            <Button href="/casos" variant="secondary" arrow>
              Ver casos de uso
            </Button>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
