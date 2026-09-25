import {
  Lock,
  EyeOff,
  KeyRound,
  ScrollText,
  Route,
  Split,
  Building2,
  Siren,
  UserCheck,
} from "lucide-react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: Lock, title: "Segurança", desc: "Prompt injection, exfiltração e excesso de agência em LLMs e agentes." },
  { icon: EyeOff, title: "Privacidade", desc: "Dados pessoais em treinamento, inferência, logs e decisões, alinhado à LGPD." },
  { icon: KeyRound, title: "Controle de acesso", desc: "Menor privilégio para quem e o quê acessa modelos, dados e ferramentas." },
  { icon: ScrollText, title: "Logs", desc: "Prompts, respostas, ações e decisões, com retenção definida." },
  { icon: Route, title: "Rastreabilidade", desc: "Reconstruir o que aconteceu, quando, por qual versão e sob quais regras." },
  { icon: Split, title: "Segregação de funções", desc: "Quem desenvolve não aprova; quem aprova não audita." },
  { icon: Building2, title: "Fornecedores", desc: "Modelos e serviços de terceiros: dados, versões, SLAs, subprocessadores." },
  { icon: Siren, title: "Incidentes", desc: "Detectar, classificar, responder e aprender com falhas de IA." },
  { icon: UserCheck, title: "Human-in-the-loop", desc: "Decisão humana onde impacto, incerteza ou regulação exigem." },
];

export function Trust() {
  return (
    <Section id="confianca" tone="elevated">
      <SectionHeading
        eyebrow="Segurança e confiança"
        title="Governança de IA com o rigor de segurança da informação."
        description="Os princípios de um programa de cybersecurity maduro, aplicados a modelos, aplicações e agentes."
        align="center"
      />
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal as="li" key={it.title} delay={(i % 3) * 70} className="card card-hover flex gap-4 p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03]">
              <it.icon className="size-[18px] text-brand-300" aria-hidden />
            </span>
            <div>
              <h3 className="text-[15px] font-semibold text-fg">{it.title}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={200} className="mx-auto mt-8 max-w-2xl text-center text-sm text-fg-subtle">
        Não alegamos certificações que não possuímos. Seguimos os controles que recomendamos, e podemos
        demonstrá-los.
      </Reveal>
    </Section>
  );
}
