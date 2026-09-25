const phrases = [
  "Não apenas compliance. Controle.",
  "Não apenas documentação. Evidência.",
  "Não apenas diagnóstico. Implementação.",
  "Não apenas monitoramento. Resposta.",
  "Governança de IA que sai do papel e entra na operação.",
  "Identificamos. Avaliamos. Controlamos. Monitoramos. Evidenciamos. Resolvemos.",
];

export function BrandStrip() {
  const items = [...phrases, ...phrases];
  return (
    <div className="marquee-mask overflow-hidden border-y border-line bg-bg-elevated py-4" aria-hidden>
      <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((p, i) => (
          <li key={i} className="flex items-center gap-10 text-sm text-fg-muted">
            <span>{p}</span>
            <span className="size-1 rounded-full bg-brand-400/70" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BrandStatement() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div aria-hidden className="dots-bg absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-300">
          Nossa proposta
        </p>
        <p className="mt-5 text-balance text-2xl font-semibold leading-snug tracking-tight text-fg sm:text-3xl lg:text-4xl">
          Demonstramos, com evidências técnicas, que seus sistemas de IA estão identificados,
          avaliados, controlados e monitorados.
        </p>
        <p className="mt-5 text-lg text-fg-muted">Não entregamos documentos. Resolvemos problemas de IA.</p>
      </div>
    </section>
  );
}
