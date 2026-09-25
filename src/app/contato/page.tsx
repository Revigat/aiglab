import { Suspense } from "react";
import { Mail, MapPin, Clock, Link2 } from "lucide-react";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContatoForm, ContatoHeading } from "./ContatoContent";

export const metadata = pageMetadata({
  title: "Contato: Falar com especialista em Governança de IA",
  description:
    "Fale com um especialista em governança de IA. Solicite diagnóstico, auditoria, avaliação de agentes, monitoramento ou early access da plataforma. Resposta em até 1 dia útil.",
  path: "/contato",
});

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden pt-10 sm:pt-14">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="glow-brand absolute inset-x-0 top-0 -z-10 h-[420px]" />
        <Container>
          <Breadcrumbs items={[{ name: "Contato", path: "/contato" }]} />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Contato</Eyebrow>
              </Reveal>
              <Suspense fallback={<div className="mt-5 h-32" aria-hidden />}>
                <ContatoHeading />
              </Suspense>

              <Reveal delay={240} className="mt-10 grid gap-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">O que acontece depois</p>
                <ol className="grid gap-3">
                  {[
                    "Um especialista analisa o contexto e responde em até 1 dia útil.",
                    "Conversa de 30 minutos para entender sistemas, riscos e objetivos.",
                    "Proposta de diagnóstico ou escopo, com etapas, prazos e entregáveis.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3 text-[14.5px] text-fg-muted">
                      <span className="grid size-6 shrink-0 place-items-center rounded-md border border-brand-500/30 bg-brand-500/10 font-mono text-[11px] text-brand-300">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={300} className="mt-10 grid gap-3 border-t border-line pt-8 text-sm text-fg-muted">
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-fg">
                  <Mail className="size-4 text-fg-subtle" aria-hidden /> {site.email}
                </a>
                <p className="flex items-center gap-3">
                  <MapPin className="size-4 text-fg-subtle" aria-hidden /> {site.address}
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="size-4 text-fg-subtle" aria-hidden /> Seg–Sex, 9h–18h (BRT)
                </p>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-fg">
                  <Link2 className="size-4 text-fg-subtle" aria-hidden /> LinkedIn
                </a>
              </Reveal>
            </div>

            <Reveal delay={200} className="lg:col-span-7">
              <div className="card p-6 sm:p-8">
                <Suspense fallback={<div className="h-96" aria-hidden />}>
                  <ContatoForm />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="elevated" className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-balance text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            Falamos com CIO, CTO, CISO, DPO, jurídico, compliance, conselho e diretoria, e traduzimos entre eles.
          </p>
          <p className="mt-3 text-fg-muted">
            Direto. Técnico. Empresarial. Sem terrorismo regulatório e sem promessas de conformidade garantida.
          </p>
        </div>
      </Section>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contato",
            url: `${site.url}/contato`,
            mainEntity: { "@type": "Organization", name: site.legalName, email: site.email },
          },
        ]}
      />
    </>
  );
}
