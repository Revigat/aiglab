import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn, withBasePath } from "@/lib/utils";

/**
 * Símbolo AIG Lab (arte oficial em /public/brand, fundo transparente).
 * `priority` só no header, para o LCP.
 */
export function LogoMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={withBasePath("/brand/aig-mark.png")}
      alt=""
      aria-hidden
      width={512}
      height={512}
      priority={priority}
      className={cn("size-9 select-none object-contain", className)}
    />
  );
}

/** Wordmark "AIG Lab": sigla em peso forte, "Lab" em peso leve. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 leading-none text-fg", className)}>
      <span className="font-extrabold tracking-tight">{site.wordmark.strong}</span>
      <span className="font-light tracking-normal">{site.wordmark.light}</span>
    </span>
  );
}

export function Logo({
  className,
  compact = false,
  markOnlyOnMobile = false,
  priority = false,
}: {
  className?: string;
  compact?: boolean;
  /** Esconde o wordmark abaixo de `sm`, deixando só o símbolo. */
  markOnlyOnMobile?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 rounded-md", className)}
      aria-label={`${site.name}: página inicial`}
    >
      <LogoMark className="size-10" priority={priority} />
      <span className={cn("flex-col leading-none", markOnlyOnMobile ? "hidden sm:flex" : "flex")}>
        <Wordmark className="text-[19px]" />
        {!compact && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-subtle">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
