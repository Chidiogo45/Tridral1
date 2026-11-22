import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { AzureArchitectureDiagram } from '../components/AzureArchitectureDiagram.tsx';
import { ArrowRightIcon, CheckIcon } from '../components/Icons.tsx';

interface TechnologyPageProps {
  onNavigate: (page: PageId) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <section className="navy-grid-surface text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            Technology &amp; Planned Azure Architecture
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white display-heading leading-[1.08] max-w-3xl">
            Engineered on planned Microsoft Azure cloud and AI foundations
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#CBD5E1] leading-[1.65] max-w-2xl">
            Tridral is designing the Arlinex platform around modular Microsoft Azure services for structured document parsing, controlled data handling, and evidence-grounded compliance evaluation.
          </p>
        </div>
      </section>

      {/* Planned Architecture Overview */}
      <section className="bg-[#101B2C] text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <AzureArchitectureDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Azure AI Document Intelligence',
                role: 'Planned Document Extraction Pipeline',
                detail:
                  'Intended to extract raw text, multi-column tables, section headings, and accurate page coordinates from complex solicitation PDFs and attachments.',
              },
              {
                name: 'Azure OpenAI',
                role: 'Planned Analysis & Mapping Layer',
                detail:
                  'Intended to structure extracted solicitation clauses into requirement rows and compare proposal sections against each requirement with supporting citations.',
              },
              {
                name: 'Azure Blob Storage',
                role: 'Planned Document Storage Layer',
                detail:
                  'Designed to store uploaded RFP packages and proposal drafts privately with access isolation and user-requested deletion controls.',
              },
              {
                name: 'Azure Cloud Infrastructure',
                role: 'Planned Hosting & Service Runtime',
                detail:
                  'Designed to host core web services, background processing queues, and tenant-scoped workspaces reliably as the platform scales.',
              },
            ].map((service) => (
              <div
                key={service.name}
                className="p-6 rounded-xl bg-[#16243A] border border-white/10 space-y-2"
              >
                <div className="text-[11px] font-semibold text-[#18B8A6] mono-data">
                  {service.role}
                </div>
                <h2 className="text-[20px] font-bold text-white display-heading">
                  {service.name}
                </h2>
                <p className="text-[14.5px] text-[#CBD5E1] leading-[1.65]">{service.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Handling & Verification Principles */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#101B2C] display-heading">
              Technical direction &amp; responsible AI principles
            </h2>
            <p className="text-[16px] text-[#64748B] leading-[1.65]">
              Every part of Arlinex&apos;s planned pipeline prioritizes auditability and restrained scope over black-box scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Evidence-first outputs',
                text: 'Findings are designed to show exact RFP references, proposal page numbers, and quoted source text so reviewers can verify every claim.',
              },
              {
                title: 'No fabricated requirements',
                text: 'Requirements are extracted strictly from uploaded solicitation documents. Where supporting proposal text is absent, items are flagged Missing.',
              },
              {
                title: 'Transparent development status',
                text: 'Tridral clearly separates planned Azure integrations and features in development from verified, operational capabilities.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 rounded-xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-2.5"
              >
                <div className="flex items-center gap-2 text-[#101B2C]">
                  <span className="text-[#3979F6]">
                    <CheckIcon className="w-4 h-4" />
                  </span>
                  <h3 className="text-[17px] font-bold display-heading">{card.title}</h3>
                </div>
                <p className="text-[14.5px] text-[#64748B] leading-[1.65]">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-[#EAF1FF] border border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[14.5px] text-[#172337]">
              This public website does not accept document uploads. Interested in our technical roadmap or cloud partnerships?
            </p>
            <a
              href={PAGE_PATHS.contact}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="group h-10 inline-flex items-center gap-2 px-4 text-[13px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-ring"
            >
              <span>Connect With Tridral</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
