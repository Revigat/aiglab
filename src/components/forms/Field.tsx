import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-lg border bg-white/[0.03] px-3.5 py-2.5 text-[15px] text-fg placeholder:text-fg-subtle transition-colors focus:bg-white/[0.05] disabled:opacity-60 aria-[invalid=true]:border-danger/60";

export function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-fg">
      {children}
      {optional && <span className="ml-1.5 text-xs font-normal text-fg-subtle">(opcional)</span>}
    </label>
  );
}

export function ErrorText({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[13px] text-danger">
      {children}
    </p>
  );
}

type InputProps = ComponentProps<"input"> & { error?: string };
export function Input({ error, className, id, ...props }: InputProps) {
  const errId = `${id}-error`;
  return (
    <>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={cn(inputBase, error ? "border-danger/60" : "border-line-strong hover:border-white/30", className)}
        {...props}
      />
      <ErrorText id={errId}>{error}</ErrorText>
    </>
  );
}

type SelectProps = ComponentProps<"select"> & { error?: string };
export function Select({ error, className, id, children, ...props }: SelectProps) {
  const errId = `${id}-error`;
  return (
    <>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={cn(inputBase, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239aa8bd%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_12px_center] bg-no-repeat pr-10", error ? "border-danger/60" : "border-line-strong hover:border-white/30", className)}
        {...props}
      >
        {children}
      </select>
      <ErrorText id={errId}>{error}</ErrorText>
    </>
  );
}

type TextareaProps = ComponentProps<"textarea"> & { error?: string };
export function Textarea({ error, className, id, ...props }: TextareaProps) {
  const errId = `${id}-error`;
  return (
    <>
      <textarea
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={cn(inputBase, "min-h-[120px] resize-y", error ? "border-danger/60" : "border-line-strong hover:border-white/30", className)}
        {...props}
      />
      <ErrorText id={errId}>{error}</ErrorText>
    </>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-fg-muted">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 size-4 shrink-0 cursor-pointer appearance-none rounded border border-line-strong bg-white/[0.03] checked:border-brand-400 checked:bg-brand-500 checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2304121c%22 stroke-width=%223.5%22><path d=%22m5 12 5 5L20 7%22/></svg>')] checked:bg-[length:12px] checked:bg-center checked:bg-no-repeat"
        />
        <span>{children}</span>
      </label>
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  );
}
