import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Status = "ok" | "warn" | "danger" | "info" | "neutral";

const styles: Record<Status, string> = {
  ok: "bg-ok/10 text-ok border-ok/30",
  warn: "bg-warn/10 text-warn border-warn/30",
  danger: "bg-danger/10 text-danger border-danger/30",
  info: "bg-info/10 text-info border-info/30",
  neutral: "bg-white/[0.05] text-fg-muted border-line-strong",
};

const dots: Record<Status, string> = {
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-fg-subtle",
};

export function Badge({
  status = "neutral",
  children,
  className,
  dot = true,
}: {
  status?: Status;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-wider",
        styles[status],
        className,
      )}
    >
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", dots[status])} />}
      {children}
    </span>
  );
}

export const riskToStatus = (risk: string): Status => {
  const r = risk.toLowerCase();
  if (r.includes("high") || r.includes("alto") || r.includes("crit")) return "danger";
  if (r.includes("med") || r.includes("médio")) return "warn";
  if (r.includes("low") || r.includes("baixo")) return "ok";
  return "neutral";
};
