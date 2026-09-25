"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { ctas, nav, solutionsNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menus ao navegar (ajuste de estado durante o render, sem efeito)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setSolutionsOpen(false);
  }

  // Trava o scroll com o menu mobile aberto
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Fecha dropdown ao clicar fora / ESC
  useEffect(() => {
    if (!solutionsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) setSolutionsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSolutionsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [solutionsOpen]);

  const isActive = (href: string) =>
    href === "/solucoes"
      ? pathname === href || solutionsNav.some((s) => pathname === s.href)
      : pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-bg/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-10">
        <Logo markOnlyOnMobile priority />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.href === "/solucoes" ? (
              <div key={item.href} ref={solutionsRef} className="relative">
                <button
                  type="button"
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className={cn("size-4 transition-transform", solutionsOpen && "rotate-180")}
                  />
                </button>
                {solutionsOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-2 w-[560px] rounded-2xl border border-line-strong bg-bg-elevated/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {solutionsNav.map((s) => (
                        <Link
                          key={s.href}
                          role="menuitem"
                          href={s.href}
                          className="rounded-xl px-3.5 py-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <span className="block text-sm font-medium text-fg">{s.label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">
                            {s.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1 border-t border-line px-3.5 py-2.5">
                      <Link
                        href="/solucoes"
                        role="menuitem"
                        className="text-xs font-medium text-brand-300 hover:text-brand-200"
                      >
                        Ver todas as soluções →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={ctas.secondary.href} variant="ghost" size="sm">
            {ctas.secondary.label}
          </Button>
          <Button href={ctas.primary.href} size="sm">
            {ctas.primary.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href={ctas.primary.href} size="sm" className="px-3 text-[13px]">
            {ctas.primary.label}
          </Button>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md text-fg hover:bg-white/[0.06]"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={cn(
          "lg:hidden",
          open ? "block" : "hidden",
          "max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg",
        )}
      >
        <nav aria-label="Menu mobile" className="px-5 py-4 sm:px-8">
          <p className="px-2 pb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-subtle">
            Soluções
          </p>
          <ul className="grid gap-1">
            {solutionsNav.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block rounded-lg px-3 py-2.5 text-[15px] text-fg hover:bg-white/[0.05]"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-line" />
          <ul className="grid gap-1">
            {nav
              .filter((n) => n.href !== "/solucoes")
              .map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block rounded-lg px-3 py-2.5 text-[15px] text-fg hover:bg-white/[0.05]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <Button href={ctas.primary.href} size="lg">
              {ctas.primary.label}
            </Button>
            <Button href={ctas.secondary.href} variant="secondary" size="lg">
              {ctas.secondary.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
