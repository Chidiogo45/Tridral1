import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { ArlinexDashboardDemo } from '../components/ArlinexDashboardDemo.tsx';
import { ArrowRightIcon, CheckIcon } from '../components/Icons.tsx';

interface ProductsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Dark Navy Page Header */}
      <section className="navy-grid-surface text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            Featured Product · In Development
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white display-heading leading-[1.08] max-w-3xl">
            Arlinex: AI-powered RFP compliance review by Tridral
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#CBD5E1] leading-[1.65] max-w-2xl">
            Arlinex is Tridral&apos;s featured product initiative, designed to help small government contractors analyze solicitation documents, build structured compliance matrices, and identify requirement gaps before submission.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={PAGE_PATHS.contact}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="group h-11 inline-flex items-center gap-2 px-5 text-[14px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors focus-ring"
            >
              <span>Inquire About Arlinex</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </a>
            <a
              href={PAGE_PATHS.technology}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('technology');
              }}
              className="h-11 inline-flex items-center px-5 text-[14px] font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-colors focus-ring"
            >
              Planned Architecture
            </a>
          </div>
        </div>
      </section>

      {/* Product Purpose & Proposed Capabilities */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#101B2C] display-heading">
              Purpose and proposed capabilities
            </h2>
            <p className="text-[16px] text-[#64748B] leading-[1.65]">
              Arlinex is being developed specifically for proposal verification rather than automated proposal writing. Every output is designed to preserve traceability back to the original RFP text and draft pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Requirement extraction & structuring',
                detail:
                  'Designed to parse multi-section solicitation packages and extract deliverable, technical, formatting, and mandatory form requirements with section and page references.',
              },
              {
                title: 'Draft proposal comparison',
                detail:
                  'Being developed to compare submitted proposal drafts against each requirement and classify coverage as Addressed, Partial, or Missing.',
              },
              {
                title: 'Evidence and page citations',
                detail:
                  'Planned to display supporting quotes and exact proposal page references alongside each status so proposal managers can verify findings directly.',
              },
              {
                title: 'Compliance gap reporting',
                detail:
                  'Intended to summarize requirement coverage across the package and surface missing mandatory forms or page-limit risks prior to final submission.',
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className="p-7 rounded-xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-2.5"
              >
                <div className="flex items-center gap-2.5 text-[#101B2C]">
                  <span className="text-[#18B8A6]">
                    <CheckIcon className="w-4 h-4" />
                  </span>
                  <h3 className="text-[18px] font-bold display-heading">{cap.title}</h3>
                </div>
                <p className="text-[15px] text-[#64748B] leading-[1.65]">{cap.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Product Demonstration */}
      <section className="bg-[#F4F6FA] py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#101B2C] display-heading">
              Interactive Arlinex workspace preview
            </h2>
            <p className="text-[16px] text-[#64748B] leading-[1.65]">
              Explore how Arlinex organizes solicitation documents, requirement coverage metrics, and page-level evidence. All figures below are illustrative sample data for demonstration purposes.
            </p>
          </div>

          <ArlinexDashboardDemo />

          <p className="text-[13px] text-[#64748B]">
            Note: Arlinex is currently in development. It does not provide legal or compliance advice, and final human review before proposal submission remains essential.
          </p>
        </div>
      </section>
    </div>
  );
};
