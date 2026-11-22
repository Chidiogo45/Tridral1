import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { ArlinexHeroPreview } from '../components/ArlinexHeroPreview.tsx';
import { ArlinexDashboardDemo } from '../components/ArlinexDashboardDemo.tsx';
import { AzureArchitectureDiagram } from '../components/AzureArchitectureDiagram.tsx';
import { ContactForm } from '../components/ContactForm.tsx';
import { Reveal } from '../components/Reveal.tsx';
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckIcon,
  ConfidenceIcon,
  EfficiencyIcon,
  IntelligenceIcon,
  MailIcon,
} from '../components/Icons.tsx';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <div>
      {/* Section 1 — Hero (Midnight Navy) */}
      <section className="navy-grid-surface text-white py-16 sm:py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Side */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
                INTELLIGENT TECHNOLOGY
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[58px] font-extrabold text-white display-heading leading-[1.06]">
                AI-powered RFP compliance checking
              </h1>

              <p className="text-[16px] sm:text-[18px] text-[#CBD5E1] leading-[1.65] max-w-xl">
                Tridral is a platform that helps small government contractors analyze Request for Proposals (RFPs), identify every requirement, and check whether their proposal addresses them.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={PAGE_PATHS.products}
                  onClick={(e) => handleNav('products', e)}
                  className="group h-12 inline-flex items-center justify-center gap-2 px-6 text-[15px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap focus-ring"
                >
                  <span>Explore Our Products</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>

                <a
                  href={PAGE_PATHS.about}
                  onClick={(e) => handleNav('about', e)}
                  className="h-12 inline-flex items-center justify-center px-6 text-[15px] font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap focus-ring"
                >
                  About Tridral
                </a>
              </div>

              <div className="pt-2 text-[13px] text-[#94A3B8]">
                Featured product in development: <span className="text-white font-semibold">Arlinex</span>
              </div>
            </div>

            {/* Right Side — Arlinex Compliance Report Preview */}
            <div className="lg:col-span-6 relative">
              <div
                className="absolute -inset-4 rounded-3xl bg-radial from-[#3979F6]/25 via-[#3979F6]/5 to-transparent blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative">
                <ArlinexHeroPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Company introduction (White) */}
      <section className="bg-white py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101B2C] display-heading leading-[1.12]">
                Technology built around real-world business challenges.
              </h2>
              <p className="text-[16px] sm:text-[18px] text-[#64748B] leading-[1.65]">
                Tridral develops intelligent technology that helps organizations navigate complex information, simplify workflows, and make more informed decisions.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Intelligence',
                description: 'Applying AI to complex information and business workflows.',
                icon: IntelligenceIcon,
              },
              {
                title: 'Efficiency',
                description: 'Reducing repetitive work and simplifying processes.',
                icon: EfficiencyIcon,
              },
              {
                title: 'Confidence',
                description: 'Helping people make informed decisions with better information.',
                icon: ConfidenceIcon,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delayMs={idx * 60}>
                  <div className="h-full p-7 rounded-xl bg-white border border-[#E2E8F0] enterprise-card space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] text-[#3979F6] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#101B2C] display-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-[15px] text-[#64748B] leading-[1.65]">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 — Featured product: Arlinex (Cloud White) */}
      <section className="bg-[#F4F6FA] py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3979F6]">
                  Featured Product · Arlinex
                </div>
                <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101B2C] display-heading leading-[1.12]">
                  Introducing Arlinex. A smarter approach to RFP compliance.
                </h2>
                <p className="text-[16px] sm:text-[18px] text-[#64748B] leading-[1.65]">
                  Arlinex is being developed to help government contractors analyze RFP requirements, evaluate proposal completeness, and identify potential compliance gaps before submission.
                </p>
              </div>

              <a
                href={PAGE_PATHS.products}
                onClick={(e) => handleNav('products', e)}
                className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#3979F6] hover:text-[#2563EB] whitespace-nowrap shrink-0 focus-ring rounded-sm"
              >
                <span>View Arlinex Overview</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <ArlinexDashboardDemo />
          </Reveal>
        </div>
      </section>

      {/* Section 4 — The business problem (White) */}
      <section className="bg-white py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101B2C] display-heading leading-[1.12]">
                A missed requirement can cost more than a missed opportunity.
              </h2>
              <p className="text-[16px] sm:text-[18px] text-[#64748B] leading-[1.65]">
                Government solicitations enforce strict structural and administrative criteria. When small teams review dense RFP packages manually under tight deadlines, critical details are easy to overlook.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Manual Review Challenges */}
            <div className="lg:col-span-6 p-7 sm:p-8 rounded-2xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-6">
              <div className="space-y-1.5 pb-4 border-b border-[#E2E8F0]">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Traditional Manual Process
                </div>
                <h3 className="text-[22px] font-bold text-[#101B2C] display-heading">
                  High-friction manual verification
                </h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Complex and lengthy procurement documents.',
                  'Requirements scattered across multiple sections.',
                  'Missed mandatory forms or certifications.',
                  'Submission-format and page-limit mistakes.',
                  'Time-consuming manual verification.',
                ].map((problem) => (
                  <li key={problem} className="flex items-start gap-3 text-[15px] text-[#172337]">
                    <span className="mt-1 text-[#B45309] shrink-0">
                      <AlertTriangleIcon className="w-4 h-4" />
                    </span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intended Arlinex Workflow */}
            <div className="lg:col-span-6 p-7 sm:p-8 rounded-2xl bg-[#101B2C] text-white border border-[#1E293B] space-y-6">
              <div className="space-y-1.5 pb-4 border-b border-white/10">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-[#18B8A6]">
                  Intended Arlinex Workflow
                </div>
                <h3 className="text-[22px] font-bold text-white display-heading">
                  Structured compliance visibility
                </h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Extracts solicitation requirements into one consolidated checklist.',
                  'Groups obligations across Sections C, H, K, L, and M for clearer tracking.',
                  'Highlights required forms, certifications, and formatting constraints.',
                  'Maps draft proposal sections against each requirement with page references.',
                  'Surfaces missing or partially addressed items for human verification before submission.',
                ].map((solution) => (
                  <li key={solution} className="flex items-start gap-3 text-[15px] text-[#E2E8F0]">
                    <span className="mt-1 text-[#18B8A6] shrink-0">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — How Arlinex works (Light Grey / Cloud White) */}
      <section className="bg-[#F4F6FA] py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101B2C] display-heading leading-[1.12]">
                From complex solicitation documents to clearer compliance visibility.
              </h2>
              <p className="text-[16px] sm:text-[18px] text-[#64748B] leading-[1.65]">
                Arlinex is designed around a transparent three-stage review flow where every finding links back to source document pages.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Upload the RFP.',
                description:
                  'Extract its structure and identify the relevant requirements.',
                diagram: (
                  <svg viewBox="0 0 220 72" className="w-full h-16" fill="none" aria-hidden="true">
                    <rect x="8" y="10" width="52" height="52" rx="6" fill="#EAF1FF" stroke="#3979F6" strokeWidth="1.2" />
                    <path d="M20 26H48M20 35H44M20 44H38" stroke="#3979F6" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M74 36H104" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M100 32L106 36L100 40" stroke="#3979F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="116" y="12" width="94" height="48" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                    <path d="M128 26H194M128 36H186M128 46H172" stroke="#101B2C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Analyze the proposal.',
                description:
                  'Compare the proposal against the identified requirements and supporting evidence.',
                diagram: (
                  <svg viewBox="0 0 220 72" className="w-full h-16" fill="none" aria-hidden="true">
                    <rect x="8" y="14" width="64" height="44" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                    <path d="M20 28H58M20 38H52" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M82 36H136" stroke="#3979F6" strokeWidth="1.5" />
                    <circle cx="109" cy="36" r="10" fill="#EAF1FF" stroke="#3979F6" strokeWidth="1.2" />
                    <path d="M105 36L108 39L114 33" stroke="#3979F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="146" y="14" width="64" height="44" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                    <path d="M158 28H196M158 38H188" stroke="#101B2C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Identify compliance gaps.',
                description:
                  'Highlight missing or incomplete requirements and produce a compliance report.',
                diagram: (
                  <svg viewBox="0 0 220 72" className="w-full h-16" fill="none" aria-hidden="true">
                    <rect x="12" y="10" width="196" height="52" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                    <circle cx="28" cy="24" r="4" fill="#18B8A6" />
                    <path d="M40 24H154" stroke="#101B2C" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="28" cy="37" r="4" fill="#D97706" />
                    <path d="M40 37H140" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="28" cy="50" r="4" fill="#DC2626" />
                    <path d="M40 50H126" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="166" y="20" width="28" height="8" rx="3" fill="#CCFBF1" />
                    <rect x="166" y="33" width="28" height="8" rx="3" fill="#FEF3C7" />
                    <rect x="166" y="46" width="28" height="8" rx="3" fill="#FEE2E2" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <Reveal key={item.step} delayMs={idx * 70}>
                <div className="h-full p-7 rounded-2xl bg-white border border-[#E2E8F0] enterprise-card flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="text-[12px] font-semibold text-[#3979F6] mono-data">
                      Step {item.step}
                    </div>
                    <div className="p-3 rounded-xl bg-[#F4F6FA] border border-[#E2E8F0]">
                      {item.diagram}
                    </div>
                    <h3 className="text-[20px] font-bold text-[#101B2C] display-heading">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-[#64748B] leading-[1.65]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Technology (Midnight Navy) */}
      <section className="navy-grid-surface text-white py-20 sm:py-24 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#93C5FD]">
                Planned Technology Architecture
              </div>
              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-white display-heading leading-[1.12]">
                Built with a foundation for intelligent, scalable systems.
              </h2>
              <p className="text-[16px] text-[#CBD5E1] leading-[1.65]">
                Arlinex is being designed on Microsoft Azure services to support structured document parsing, controlled data storage, and traceable compliance analysis. These services represent Tridral&apos;s planned product architecture as development progresses.
              </p>

              <ul className="space-y-3 pt-2 text-[14px] text-[#E2E8F0]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3979F6] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Azure AI Document Intelligence:</strong> planned for layout-aware document parsing and page-indexed text extraction.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3979F6] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Azure OpenAI:</strong> planned for requirement extraction and evidence-grounded proposal comparison.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18B8A6] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Azure Blob Storage:</strong> planned for private, access-controlled document storage.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18B8A6] mt-2 shrink-0" />
                  <span>
                    <strong className="text-white">Azure Cloud Infrastructure:</strong> planned for scalable web hosting, APIs, and application services.
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href={PAGE_PATHS.technology}
                  onClick={(e) => handleNav('technology', e)}
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#93C5FD] hover:text-white transition-colors focus-ring rounded-sm"
                >
                  <span>Explore Planned Architecture</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AzureArchitectureDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Company vision (White) */}
      <section className="bg-white py-20 sm:py-24 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3979F6]">
                Company Direction
              </div>
              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-bold text-[#101B2C] display-heading leading-[1.12]">
                Building technology for the next generation of business operations.
              </h2>
              <p className="text-[16px] sm:text-[18px] text-[#64748B] leading-[1.65]">
                Arlinex is Tridral&apos;s featured product initiative, establishing the foundation for a broader suite of practical software systems built for high-stakes operational workflows.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Company Mission',
                text: 'Develop intelligent software that helps organizations interpret complex operational documents, minimize avoidable errors, and execute critical workflows with clarity.',
              },
              {
                label: 'Company Vision',
                text: 'Create dependable business software where small and mid-sized teams gain the operational precision traditionally reserved for large enterprises.',
              },
              {
                label: 'Long-Term Direction',
                text: 'Launch Arlinex for government RFP compliance while expanding Tridral’s capabilities into adjacent document-intensive and compliance-driven business domains.',
              },
              {
                label: 'Commitment to Practical Innovation',
                text: 'Prioritize verifiable evidence, human review, and clear system architecture over opaque automation or unsubstantiated claims.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-7 rounded-xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-2.5"
              >
                <h3 className="text-[18px] font-bold text-[#101B2C] display-heading">
                  {item.label}
                </h3>
                <p className="text-[15px] text-[#64748B] leading-[1.65]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — Contact and partnerships (Dark Navy Gradient) */}
      <section className="navy-cta-surface text-white py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#93C5FD]">
                Contact &amp; Partnerships
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-bold text-white display-heading leading-[1.1]">
                Let&apos;s build smarter ways to work.
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#CBD5E1] leading-[1.65]">
                Connect with Tridral to discuss technology, partnerships, and opportunities.
              </p>

              <div className="pt-2 space-y-3 border-t border-white/10">
                <div className="text-[13px] text-[#94A3B8]">Direct email</div>
                <a
                  href="mailto:info@tridral.com"
                  className="inline-flex items-center gap-2 text-[16px] font-semibold text-white hover:text-[#3979F6] transition-colors focus-ring rounded-xs"
                >
                  <MailIcon className="w-4 h-4 text-[#3979F6]" />
                  <span>info@tridral.com</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm variant="dark-section" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
