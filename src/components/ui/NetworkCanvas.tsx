"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Fundo animado: malha de nós (sistemas de IA, modelos, agentes, dados)
 * com sinais trafegando entre eles. Periodicamente um nó entra em alerta
 * (âmbar) e, em seguida, volta ao estado controlado (verde): o ciclo
 * identificar → avaliar → controlar em forma visual.
 *
 * - Pausa quando fora da viewport ou aba oculta.
 * - Respeita prefers-reduced-motion (renderiza um único frame estático).
 * - Densidade proporcional à área; custo baixo de CPU.
 */

type Node = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  r: number;
  phase: number;
  kind: 0 | 1 | 2; // 0 = sistema, 1 = agente, 2 = dado
  state: "idle" | "alert" | "controlled";
  stateT: number;
};

type Edge = { a: number; b: number; len: number };

type Packet = {
  edge: number;
  t: number;
  speed: number;
  dir: 1 | -1;
  hue: "brand" | "warn" | "ok";
};

const COLORS = {
  brand: [56, 189, 248] as const,
  warn: [251, 191, 36] as const,
  ok: [52, 211, 153] as const,
  line: [148, 163, 184] as const,
};

const rgba = (c: readonly [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export function NetworkCanvas({
  className,
  density = 1,
  opacity = 0.7,
}: {
  className?: string;
  /** multiplicador de densidade de nós (1 = padrão) */
  density?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let nextEvent = 1800;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Grade com jitter para distribuição uniforme, sem parecer aleatória demais
      const cell = Math.max(90, Math.min(150, Math.sqrt((width * height) / (26 * density))));
      const cols = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;
      nodes = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          if (Math.random() < 0.18) continue; // buracos na malha
          const x = i * cell + rand(-cell * 0.35, cell * 0.35);
          const y = j * cell + rand(-cell * 0.35, cell * 0.35);
          const kindRoll = Math.random();
          nodes.push({
            x,
            y,
            ox: x,
            oy: y,
            r: rand(1.2, 2.4),
            phase: rand(0, Math.PI * 2),
            kind: kindRoll < 0.15 ? 1 : kindRoll < 0.4 ? 2 : 0,
            state: "idle",
            stateT: 0,
          });
        }
      }

      // Arestas: vizinhos próximos (até 3 por nó, dentro do raio)
      edges = [];
      const maxD = cell * 1.55;
      const seen = new Set<string>();
      for (let i = 0; i < nodes.length; i++) {
        const near: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) near.push({ j, d });
        }
        near.sort((a, b) => a.d - b.d);
        for (const n of near.slice(0, 3)) {
          const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`;
          if (seen.has(key)) continue;
          seen.add(key);
          edges.push({ a: i, b: n.j, len: n.d });
        }
      }

      packets = [];
      const count = Math.max(6, Math.floor(edges.length * 0.12));
      for (let k = 0; k < count; k++) spawnPacket();
    }

    function spawnPacket(hue: Packet["hue"] = "brand", edge?: number) {
      if (!edges.length) return;
      packets.push({
        edge: edge ?? Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: rand(0.12, 0.28),
        dir: Math.random() < 0.5 ? 1 : -1,
        hue,
      });
    }

    function triggerEvent() {
      // Um nó entra em alerta; após ~2.2s vira controlado; sinais partem dele
      const idle = nodes.filter((n) => n.state === "idle");
      if (!idle.length) return;
      const n = idle[Math.floor(Math.random() * idle.length)];
      n.state = "alert";
      n.stateT = 0;
      const idx = nodes.indexOf(n);
      edges.forEach((e, ei) => {
        if (e.a === idx || e.b === idx) spawnPacket("warn", ei);
      });
    }

    function step(dt: number, t: number) {
      // Movimento sutil dos nós
      for (const n of nodes) {
        n.x = n.ox + Math.sin(t * 0.00025 + n.phase) * 6;
        n.y = n.oy + Math.cos(t * 0.0002 + n.phase * 1.3) * 6;
        if (n.state !== "idle") {
          n.stateT += dt;
          if (n.state === "alert" && n.stateT > 2200) {
            n.state = "controlled";
            n.stateT = 0;
            const idx = nodes.indexOf(n);
            edges.forEach((e, ei) => {
              if (e.a === idx || e.b === idx) spawnPacket("ok", ei);
            });
          } else if (n.state === "controlled" && n.stateT > 2600) {
            n.state = "idle";
            n.stateT = 0;
          }
        }
      }
      // Pacotes
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += (p.speed * dt) / 1000 * p.dir;
        if (p.t > 1 || p.t < 0) {
          if (p.hue === "brand") {
            // segue para uma aresta vizinha
            const e = edges[p.edge];
            const endNode = p.dir === 1 ? e.b : e.a;
            const nextEdges = edges
              .map((x, k) => ({ x, k }))
              .filter(({ x, k }) => k !== p.edge && (x.a === endNode || x.b === endNode));
            if (nextEdges.length) {
              const nx = nextEdges[Math.floor(Math.random() * nextEdges.length)];
              p.edge = nx.k;
              p.dir = nx.x.a === endNode ? 1 : -1;
              p.t = p.dir === 1 ? 0 : 1;
            } else {
              packets.splice(i, 1);
              spawnPacket();
            }
          } else {
            packets.splice(i, 1);
          }
        }
      }
      nextEvent -= dt;
      if (nextEvent <= 0) {
        triggerEvent();
        nextEvent = rand(2600, 5200);
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);

      // Arestas
      ctx!.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const active = a.state !== "idle" || b.state !== "idle";
        ctx!.strokeStyle = active ? rgba(COLORS.brand, 0.3) : rgba(COLORS.line, 0.15);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      // Pacotes (com rastro)
      for (const p of packets) {
        const e = edges[p.edge];
        const a = nodes[e.a];
        const b = nodes[e.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const c = COLORS[p.hue];
        const tail = 0.08 * p.dir;
        const tx = a.x + (b.x - a.x) * Math.min(1, Math.max(0, p.t - tail));
        const ty = a.y + (b.y - a.y) * Math.min(1, Math.max(0, p.t - tail));
        const grad = ctx!.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, rgba(c, 0));
        grad.addColorStop(1, rgba(c, 0.7));
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.4;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(x, y);
        ctx!.stroke();
        ctx!.fillStyle = rgba(c, 0.95);
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Nós
      for (const n of nodes) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.002 + n.phase);
        if (n.state === "idle") {
          const base = n.kind === 1 ? COLORS.brand : COLORS.line;
          ctx!.fillStyle = rgba(base, n.kind === 1 ? 0.6 + pulse * 0.3 : 0.38 + pulse * 0.22);
          if (n.kind === 2) {
            // dado: quadrado pequeno
            ctx!.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
          } else {
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx!.fill();
          }
          if (n.kind === 1) {
            // agente: anel fino
            ctx!.strokeStyle = rgba(COLORS.brand, 0.35);
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
            ctx!.stroke();
          }
        } else {
          const c = n.state === "alert" ? COLORS.warn : COLORS.ok;
          const prog = n.stateT / (n.state === "alert" ? 2200 : 2600);
          const ringR = n.r + 4 + (n.state === "alert" ? (Math.sin(t * 0.008) * 0.5 + 0.5) * 6 : prog * 14);
          const ringA = n.state === "alert" ? 0.55 : 0.6 * (1 - prog);
          ctx!.strokeStyle = rgba(c, ringA);
          ctx!.lineWidth = 1.2;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, ringR, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.fillStyle = rgba(c, 0.95);
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r + 1, 0, Math.PI * 2);
          ctx!.fill();
          // rótulo técnico discreto
          ctx!.fillStyle = rgba(c, n.state === "alert" ? 0.8 : 0.8 * (1 - prog));
          ctx!.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
          ctx!.fillText(n.state === "alert" ? "ATTENTION" : "CONTROLLED", n.x + 10, n.y + 3);
        }
      }
    }

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min(50, now - last);
      last = now;
      step(dt, now);
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    build();
    if (reduced) {
      // Frame único, estático
      step(0, 0);
      draw(0);
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    />
  );
}
