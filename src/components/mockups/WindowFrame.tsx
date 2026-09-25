import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Moldura de "janela de produto" usada em todos os mockups.
 * Os dados exibidos são demonstrativos.
 */
export function WindowFrame({
  title,
  children,
  className,
  badge,
  demo = true,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  badge?: ReactNode;
  demo?: boolean;
}) {
  return (
    <div className={cn("window @container relative overflow-hidden", className)} aria-label={`${title}: interface demonstrativa`}>
      <div className="flex items-center justify-between border-b border-line bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {demo && (
            <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-fg-subtle">
              demo
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export function Metric({
  label,
  value,
  tone = "neutral",
  sub,
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "ok" | "warn" | "danger" | "brand";
  sub?: string;
}) {
  const color = {
    neutral: "text-fg",
    ok: "text-ok",
    warn: "text-warn",
    danger: "text-danger",
    brand: "text-brand-300",
  }[tone];
  return (
    <div className="rounded-xl border border-line bg-white/[0.02] p-3.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">{label}</p>
      <p className={cn("mt-1.5 font-mono text-2xl font-semibold tabular-nums leading-none", color)}>
        {value}
      </p>
      {sub && <p className="mt-1.5 text-[11px] text-fg-muted">{sub}</p>}
    </div>
  );
}
