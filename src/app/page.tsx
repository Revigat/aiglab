import type { Metadata } from "next";
import { site } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { BrandStatement, BrandStrip } from "@/components/sections/BrandStrip";
import { Problem } from "@/components/sections/Problem";
import { Problems } from "@/components/sections/Problems";
import { HighRisk } from "@/components/sections/HighRisk";
import { Services } from "@/components/sections/Services";
import { Platform } from "@/components/sections/Platform";
import { UseCase } from "@/components/sections/UseCase";
import { Evidence } from "@/components/sections/Evidence";
import { Methodology } from "@/components/sections/Methodology";
import { Maturity } from "@/components/sections/Maturity";
import { Frameworks } from "@/components/sections/Frameworks";
import { Differential } from "@/components/sections/Differential";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Sectors } from "@/components/sections/Sectors";
import { Trust } from "@/components/sections/Trust";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Governança de IA com evidências técnicas | ${site.name}`,
  description:
    "Governança de Inteligência Artificial para empresas: AI Governance, AI Risk Management, auditoria de IA, compliance, monitoramento contínuo e governança de agentes. Identificamos, avaliamos, controlamos e evidenciamos seus sistemas de IA.",
  alternates: { canonical: "/" },
};

const faq = [
  {
    q: "O que é governança de IA?",
    a: "Processos, controles, responsabilidades e evidências que permitem saber quais sistemas de IA a empresa possui, quais riscos trazem, como são controlados e demonstrar isso a auditores, clientes e reguladores.",
  },
  {
    q: "Vocês emitem certificação ISO/IEC 42001?",
    a: "Não. Implementamos controles alinhados à ISO/IEC 42001, NIST AI RMF e LGPD e preparamos a organização com processos e evidências. A certificação é emitida por organismos certificadores independentes.",
  },
  {
    q: "O que é governança de agentes de IA?",
    a: "Controle sobre agentes autônomos: identidade, propósito, ferramentas, permissões, limites, aprovação humana, logs e resposta a incidentes.",
  },
  {
    q: "Como funciona o diagnóstico inicial?",
    a: "Um assessment gratuito de 17 perguntas dá o nível preliminar. Depois, um diagnóstico técnico com inventário, classificação de risco e plano de ação priorizado.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Problem />
      <HighRisk />
      <Problems />
      <BrandStatement />
      <Services />
      <Platform />
      <UseCase />
      <Evidence />
      <Methodology />
      <Maturity />
      <Frameworks />
      <Differential />
      <Infrastructure />
      <Sectors />
      <Trust />
      <FinalCTA />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
