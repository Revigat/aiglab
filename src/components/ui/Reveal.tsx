"use client";

import { useEffect, useRef, type ComponentProps, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div"> & {
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "ul";
};

/**
 * Revela o conteúdo com um fade/slide suave ao entrar na viewport.
 * Respeita prefers-reduced-motion via CSS.
 */
export function Reveal({
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
  ...props
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Conteúdo já dentro do viewport aparece imediatamente (sem depender do observer)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal
      className={cn(className)}
      style={{ ...(style ?? {}), "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}
