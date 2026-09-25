import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-[#04121c] hover:bg-brand-400 shadow-[0_0_0_1px_rgba(56,189,248,0.4),0_8px_30px_-10px_rgba(56,189,248,0.6)] hover:shadow-[0_0_0_1px_rgba(56,189,248,0.6),0_12px_36px_-10px_rgba(56,189,248,0.75)]",
  secondary:
    "bg-white/[0.04] text-fg border border-line-strong hover:bg-white/[0.08] hover:border-white/30",
  ghost: "text-fg-muted hover:text-fg hover:bg-white/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type ButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export function Button(props: LinkProps | ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <Link href={href} className={cn("group", classes)} {...linkRest}>
        {content}
      </Link>
    );
  }
  const buttonRest = rest as ButtonProps;
  return (
    <button className={cn("group", classes)} {...buttonRest}>
      {content}
    </button>
  );
}
