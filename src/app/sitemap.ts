import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Necessário para o export estático (GitHub Pages)
export const dynamic = "force-static";

const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/solucoes", priority: 0.9, freq: "monthly" },
  { path: "/consultoria", priority: 0.9, freq: "monthly" },
  { path: "/auditoria", priority: 0.9, freq: "monthly" },
  { path: "/ai-risk", priority: 0.8, freq: "monthly" },
  { path: "/compliance", priority: 0.8, freq: "monthly" },
  { path: "/monitoramento", priority: 0.8, freq: "monthly" },
  { path: "/governanca-de-agentes", priority: 0.9, freq: "monthly" },
  { path: "/plataforma", priority: 0.9, freq: "monthly" },
  { path: "/metodologia", priority: 0.8, freq: "monthly" },
  { path: "/casos", priority: 0.7, freq: "monthly" },
  { path: "/assessment", priority: 0.9, freq: "monthly" },
  { path: "/conteudos", priority: 0.7, freq: "weekly" },
  { path: "/contato", priority: 0.8, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
