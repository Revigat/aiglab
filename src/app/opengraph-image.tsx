import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

// Necessário para o export estático (GitHub Pages)
export const dynamic = "force-static";

export const alt = `${site.name}: Governança de IA com evidências técnicas`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const mark = await readFile(join(process.cwd(), "public", "brand", "aig-mark-512.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(180deg, #070c16 0%, #05080f 100%)",
          color: "#e6ecf5",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 300,
            width: 600,
            height: 500,
            background: "radial-gradient(circle, rgba(56,189,248,0.25), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={64} height={64} alt="" style={{ width: 64, height: 64 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 32 }}>
              <span style={{ fontWeight: 800, letterSpacing: -0.5 }}>{site.wordmark.strong}</span>
              <span style={{ fontWeight: 300 }}>{site.wordmark.light}</span>
            </span>
            <span style={{ fontSize: 13, letterSpacing: 3, color: "#6b7891", textTransform: "uppercase" }}>
              {site.tagline}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            Sua empresa usa IA. Mas consegue provar que ela está sob controle?
          </div>
          <div style={{ fontSize: 26, color: "#9aa8bd", maxWidth: 900, lineHeight: 1.35 }}>
            Identificamos, avaliamos, controlamos e monitoramos sistemas de IA, e transformamos governança em
            evidências técnicas.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 15,
            letterSpacing: 3,
            color: "#7dd3fc",
            textTransform: "uppercase",
          }}
        >
          <span>Identificar</span>
          <span style={{ color: "#6b7891" }}>→</span>
          <span>Avaliar</span>
          <span style={{ color: "#6b7891" }}>→</span>
          <span>Controlar</span>
          <span style={{ color: "#6b7891" }}>→</span>
          <span>Monitorar</span>
          <span style={{ color: "#6b7891" }}>→</span>
          <span>Evidenciar</span>
          <span style={{ color: "#6b7891" }}>→</span>
          <span>Melhorar</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
