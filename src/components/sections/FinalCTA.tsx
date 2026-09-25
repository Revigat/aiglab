import { ctas } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";

export function FinalCTA({
  title = "Sua empresa já usa IA. Agora precisa provar que a controla.",
  text = "Mapeamos sistemas, identificamos riscos, implementamos controles e geramos evidências.",
  primary = ctas.primary,
  secondary = ctas.secondary,
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 rotate-180" />
      <div aria-hidden className="network-fade-both absolute inset-0 -z-10">
        <NetworkCanvas density={0.8} opacity={0.7} />
      </div>
      <div aria-hidden className="network-dim absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            {text}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} size="lg" arrow className="w-full sm:w-auto">
              {primary.label}
            </Button>
            <Button href={secondary.href} size="lg" variant="secondary" className="w-full sm:w-auto">
              {secondary.label}
            </Button>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
            Identificamos · Avaliamos · Controlamos · Monitoramos · Evidenciamos · Resolvemos
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
