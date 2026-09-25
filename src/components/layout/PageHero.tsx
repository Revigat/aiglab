import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { ctas } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { NetworkCanvas } from "@/components/ui/NetworkCanvas";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-[12.5px] text-fg-subtle">
        <li>
          <Link href="/" className="hover:text-fg">
            Início
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            <ChevronRight className="size-3.5" aria-hidden />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-fg-muted">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="hover:text-fg">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  primary = ctas.primary,
  secondary = ctas.secondary,
  aside,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  crumbs: Crumb[];
  primary?: { label: string; href: string } | null;
  secondary?: { label: string; href: string } | null;
  aside?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="network-fade absolute inset-0 -z-10">
        <NetworkCanvas density={0.8} opacity={0.75} />
      </div>
      <div aria-hidden className={cn("absolute inset-0 -z-10", align === "center" ? "network-dim" : "network-dim-wide")} />
      <div aria-hidden className="glow-brand absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className={cn("grid gap-10", aside ? "lg:grid-cols-12 lg:items-center" : "")}>
          <div className={cn(aside ? "lg:col-span-6" : "max-w-3xl", align === "center" && "mx-auto text-center")}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{description}</p>
            </Reveal>
            {(primary || secondary) && (
              <Reveal delay={240} className={cn("mt-8 flex flex-col gap-3 sm:flex-row", align === "center" && "justify-center")}>
                {primary && (
                  <Button href={primary.href} size="lg" arrow>
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button href={secondary.href} size="lg" variant="secondary">
                    {secondary.label}
                  </Button>
                )}
              </Reveal>
            )}
            {children}
          </div>
          {aside && (
            <Reveal delay={200} className="lg:col-span-6">
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
