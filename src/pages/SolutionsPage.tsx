import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { AlertTriangleIcon, ArrowRightIcon, CheckIcon } from '../components/Icons.tsx';

interface SolutionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <section className="navy-grid-surface text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            Solutions · Government Contracting
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white display-heading leading-[1.08] max-w-3xl">
            Addressing RFP compliance challenges for small contractors
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#CBD5E1] leading-[1.65] max-w-2xl">
            Small contractors competing for public-sector awards frequently operate without dedicated compliance teams. Arlinex is being built to bring structured verification to that final pre-submission review.
          </p>
        </div>
      </section>

      {/* Challenges Breakdown */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#101B2C] display-heading">
              Why manual compliance checks break down
            </h2>
            <p className="text-[16px] text-[#64748B] leading-[1.65]">
              Procurement reviews examine procedural conformance before technical scoring begins. Common failure points happen when rules span dozens of solicitation pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Lengthy, multi-part solicitations',
                body: 'Solicitations frequently distribute obligations across statements of work, instructions to offerors, evaluation criteria, and addenda.',
              },
              {
                title: 'Mandatory forms and certifications',
                body: 'Missing a single representation, signature block, or cover form can result in administrative disqualification prior to evaluation.',
              },
              {
                title: 'Strict formatting & page ceilings',
                body: 'Exceeded volume page counts, wrong section ordering, or omitted mandatory headings create avoidable submission risk.',
              },
              {
                title: 'Late-stage draft edits',
                body: 'Final edits made hours before a deadline can accidentally delete required compliance language or shift page counts over limits.',
              },
              {
                title: 'Manual spreadsheet tracking',
                body: 'Cross-referencing requirements by hand across multiple drafts consumes senior delivery and proposal management capacity.',
              },
              {
                title: 'Limited compliance headcount',
                body: 'Unlike large prime contractors, small teams often rely on project leads and principals to double-check compliance alongside daily operations.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-2.5"
              >
                <div className="flex items-center gap-2 text-[#B45309]">
                  <AlertTriangleIcon className="w-4 h-4 shrink-0" />
                  <h3 className="text-[17px] font-bold text-[#101B2C] display-heading">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[14.5px] text-[#64748B] leading-[1.65]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intended Value of Arlinex */}
      <section className="bg-[#F4F6FA] py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#101B2C] display-heading">
                Intended value of Arlinex
              </h2>
              <p className="text-[16px] text-[#64748B] leading-[1.65]">
                Arlinex is designed to give small government contracting teams an organized, repeatable way to audit draft proposals against solicitation text before submitting.
              </p>
              <div className="pt-2">
                <a
                  href={PAGE_PATHS.contact}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="group h-11 inline-flex items-center gap-2 px-5 text-[14px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors focus-ring"
                >
                  <span>Discuss Use Cases</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] p-7 sm:p-8 space-y-5">
              <ul className="space-y-4">
                {[
                  {
                    title: 'Consolidated requirement visibility',
                    desc: 'Designed to bring scattered RFP obligations into one structured matrix.',
                  },
                  {
                    title: 'Proposal-to-RFP evidence mapping',
                    desc: 'Intended to show which requirements appear addressed, partially addressed, or missing, alongside page references.',
                  },
                  {
                    title: 'Faster final pre-submission review',
                    desc: 'Built to help proposal managers focus human attention directly on unresolved gaps and required forms.',
                  },
                  {
                    title: 'Clear scope & human accountability',
                    desc: 'Arlinex does not replace legal or compliance counsel; findings are designed to support human verification.',
                  },
                ].map((val) => (
                  <li key={val.title} className="flex items-start gap-3">
                    <span className="mt-1 text-[#18B8A6] shrink-0">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[15px] font-semibold text-[#101B2C]">{val.title}</div>
                      <div className="text-[14px] text-[#64748B] mt-0.5">{val.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
