import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ctas } from "@/config/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <Container className="text-center">
        <Eyebrow>Erro 404</Eyebrow>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Página não identificada no inventário.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-fg-muted">
          O endereço não existe ou foi movido. Diferente da sua IA, este caso é fácil de resolver.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" variant="secondary">
            Voltar ao início
          </Button>
          <Button href={ctas.primary.href} size="lg" arrow>
            {ctas.primary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
