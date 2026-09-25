import type { NextConfig } from "next";

/**
 * Deploy estático (GitHub Pages):
 *  STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/aiglab npm run build  -> gera ./out
 * Em desenvolvimento (npm run dev) nada disso é aplicado.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : undefined,
  basePath: basePath || undefined,
  trailingSlash: isStatic,
  images: { unoptimized: true },
  // Permite abrir o dev server pelo IP da rede local (celular, outro PC) sem bloqueio de HMR/JS.
  allowedDevOrigins: ["192.168.1.*", "localhost", "127.0.0.1"],
};

export default nextConfig;
