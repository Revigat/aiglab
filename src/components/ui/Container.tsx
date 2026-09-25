import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}

type SectionProps = ComponentProps<"section"> & {
  tone?: "default" | "elevated";
  bleed?: boolean;
};

export function Section({
  className,
  tone = "default",
  bleed = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        tone === "elevated" && "bg-bg-elevated border-y border-line",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
