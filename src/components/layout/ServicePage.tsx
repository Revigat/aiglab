import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ctas } from "@/config/site";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { PageHero, type Crumb } from "./PageHero";

export type ServiceContent = {
  path: string;
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  titleText: string;
  description: string;
  serviceType: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  hero?: ReactNode;
  /** Blocos de "o que fazemos" */
  scope: { title: string; desc: string }[];
  scopeTitle?: string;
  scopeDescription?: string;
  /** Como funciona (passos) */
  steps: { name: string; desc: string }[];
  /** Visual intermediário (mockup) */
  visual?: ReactNode;
  visualEyebrow?: string;
  visualTitle?: string;
  visualDescription?: string;
  /** Entregáveis */
  deliverables: string[];
  /** Mensagem de marca */
  statement: string;
  faq: { q: string; a: string }[];
  ctaTitle?: string;
  ctaText?: string;
};

export function ServicePage({ c }: { c: ServiceContent }) {
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
        crumbs={c.crumbs}
        primary={c.primary ?? ctas.primary}
        secondary={c.secondary ?? ctas.secondary}
        aside={c.hero}
      />

      <Section tone="elevated" className="mt-16">
        <SectionHeading
          eyebrow="Escopo"
          title={c.scopeTitle ?? "O que fazemos"}
          description={c.scopeDescription}
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.scope.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 70} className="card card-hover p-5">
              <span className="font-mono text-[10px] text-brand-300">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-fg">{s.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{s.desc}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Como funciona" title="Do problema à evidência, em etapas claras." />
            <Reveal delay={120} className="mt-8 rounded-2xl border border-brand-500/25 bg-brand-500/[0.06] p-6">
              <p className="text-balance text-lg font-semibold leading-snug tracking-tight text-fg">
                {c.statement}
              </p>
            </Reveal>
          </div>
          <ol className="grid gap-3 lg:col-span-7">
            {c.steps.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 60} className="flex gap-4 rounded-xl border border-line bg-white/[0.02] p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-500/30 bg-brand-500/10 font-mono text-sm text-brand-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-fg">{s.name}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-fg-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {c.visual && (
        <Section tone="elevated">
          <SectionHeading
            eyebrow={c.visualEyebrow ?? "Na prática"}
            title={c.visualTitle ?? "Como isso aparece na operação"}
            description={c.visualDescription}
            align="center"
          />
          <Reveal delay={120} className="mt-12">
            {c.visual}
          </Reveal>
        </Section>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Entregáveis"
              title="O que fica na sua operação quando o trabalho termina."
              description="Não é um PDF. São controles funcionando, responsáveis definidos e evidências acessíveis."
            />
            <Reveal delay={120} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={(c.primary ?? ctas.primary).href} arrow>
                {(c.primary ?? ctas.primary).label}
              </Button>
              <Button href={ctas.secondary.href} variant="secondary">
                {ctas.secondary.label}
              </Button>
            </Reveal>
          </div>
          <Reveal delay={100} className="card p-6 sm:p-8 lg:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-2">
              {c.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-[15px] text-fg-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="elevated">
        <SectionHeading eyebrow="Perguntas frequentes" title="O que costumam nos perguntar" align="center" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white/[0.02]">
          {c.faq.map((f) => (
            <details key={f.q} className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-medium text-fg [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-4 shrink-0 text-fg-subtle transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <FinalCTA title={c.ctaTitle} text={c.ctaText} primary={c.primary ?? ctas.primary} />

      <JsonLd
        data={[
          serviceJsonLd({
            name: c.titleText,
            description: c.description,
            path: c.path,
            serviceType: c.serviceType,
          }),
          faqJsonLd(c.faq),
          breadcrumbJsonLd([{ name: "Início", path: "/" }, ...c.crumbs]),
        ]}
      />
    </>
  );
}
