import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
};

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-300",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand-400" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
  children,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "text-balance font-semibold tracking-tight text-fg",
          Tag === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
            : "text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1]",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </Reveal>
  );
}
