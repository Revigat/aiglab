export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Prefixo do site quando publicado em subcaminho (ex.: GitHub Pages /aiglab). */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Para `src` de imagens e `href` de arquivos estáticos; `next/link` já aplica o basePath sozinho. */
export function withBasePath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "yahoo.com.br",
  "live.com",
  "icloud.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "proton.me",
  "protonmail.com",
  "aol.com",
  "msn.com",
]);

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function isCorporateEmail(email: string) {
  if (!isValidEmail(email)) return false;
  const domain = email.trim().toLowerCase().split("@")[1];
  return !FREE_EMAIL_DOMAINS.has(domain);
}
