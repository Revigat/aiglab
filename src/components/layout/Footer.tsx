import Link from "next/link";
import { ctas, site, solutionsNav } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Soluções",
    links: solutionsNav.map((s) => ({ label: s.label, href: s.href })),
  },
  {
    title: "Empresa",
    links: [
      { label: "Plataforma", href: "/plataforma" },
      { label: "Metodologia", href: "/metodologia" },
      { label: "Casos de uso", href: "/casos" },
      { label: "Conteúdos", href: "/conteudos" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Começar",
    links: [
      { label: "Diagnosticar minha IA", href: "/assessment" },
      { label: "Avaliar minha maturidade", href: "/assessment" },
      { label: "Avaliar meus agentes", href: "/contato?tema=agentes" },
      { label: "Falar com especialista", href: "/contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-elevated">
      <Container className="py-14 lg:py-16">
        <div className="mb-12 flex flex-col gap-6 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">
              Comece pelo diagnóstico
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              Descubra em minutos onde a sua IA está sem controle.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button href={ctas.primary.href} arrow>
              {ctas.primary.label}
            </Button>
            <Button href={ctas.secondary.href} variant="secondary">
              {ctas.secondary.label}
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              Encontramos problemas em sistemas de IA, avaliamos os riscos, implementamos controles e
              criamos evidências técnicas de que esses sistemas estão sob controle.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
              Identificar · Avaliar · Controlar · Monitorar · Evidenciar · Melhorar
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2 lg:first:col-span-3">
              <p className="mb-3 text-sm font-semibold text-fg">{col.title}</p>
              <ul className="grid gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-2">
            <p className="mb-3 text-sm font-semibold text-fg">Contato</p>
            <ul className="grid gap-2 text-sm text-fg-muted">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li>{site.address}</li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.
          </p>
          <p className="max-w-xl leading-relaxed">
            Implementamos controles alinhados a normas, frameworks e boas práticas reconhecidas
            internacionalmente. Não emitimos certificações e não garantimos conformidade legal.
          </p>
        </div>
      </Container>
    </footer>
  );
}
