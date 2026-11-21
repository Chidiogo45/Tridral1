import React from 'react';
import { PageId } from '../types.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';
import { CheckIcon } from '../components/Icons.tsx';

interface ProductPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

const WALKTHROUGH_STEPS = [
  {
    num: '01',
    title: 'Tridral reads the RFP.',
    body: 'It reads the text, tables, and section headings of the PDF and keeps the page numbers. Tables matter, because evaluation criteria and schedules often live there.',
  },
  {
    num: '02',
    title: 'It extracts the requirements.',
    body: 'It picks out statements that use shall, must, will, or required, plus submission rules such as page limits, font, file format, due dates, and required forms. Each one is saved with its section and page, labeled by type (technical, deliverable, deadline, format, form, evaluation, or other), and marked mandatory or not. Requirements come from the RFP text. Tridral does not invent them.',
  },
  {
    num: '03',
    title: 'It checks the draft.',
    body: 'It reads the proposal (PDF or DOCX), finds the passages most relevant to each requirement, and marks the requirement Addressed, Partial, or Missing, with a short quote and the page.',
  },
  {
    num: '04',
    title: 'It ranks the gaps.',
    body: 'A risk score from 0 to 100 shows the overall exposure. Missing mandatory requirements and deadline or format problems add the most points. The score always lists the gaps behind it, so you can see why.',
  },
  {
    num: '05',
    title: 'It exports the matrix.',
    body: 'The full table, with results, exports to CSV and opens in Excel.',
  },
];

const COMPARISON_ROWS = [
  {
    label: 'Finding requirements',
    byHand: 'Read and highlight the RFP',
    withTridral: 'Pulled into one table with section and page',
  },
  {
    label: 'Checking the draft',
    byHand: 'Re-read the draft against a spreadsheet',
    withTridral: 'Each requirement marked Addressed, Partial, or Missing',
  },
  {
    label: 'Evidence',
    byHand: 'Depends on who checks',
    withTridral: 'A quote and a page for every finding',
  },
  {
    label: 'Final decision',
    byHand: 'You',
    withTridral: 'You',
  },
];

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <PageHeader
            title="How Tridral works."
            subline="A walkthrough of what the product does, step by step."
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          {/* The idea in one paragraph */}
          <section
            className="bg-white rounded-[28px] border border-[#E2E8F8] p-8 sm:p-10 space-y-3"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
              The idea in one paragraph
            </h2>
            <p className="text-[17px] text-[var(--text)] leading-[1.6]">
              Government RFPs list what a proposal must contain and how it must be submitted. Tridral reads that list, reads your draft, and shows where the two don't match.
            </p>
          </section>

          {/* The walkthrough */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] display-heading">
              The walkthrough
            </h2>
            <div className="space-y-4">
              {WALKTHROUGH_STEPS.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-[28px] border border-[#E2E8F8] p-7 sm:p-8 flex items-start gap-5"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--blue)] text-white flex items-center justify-center text-xs font-bold mono-data shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[var(--ink)] display-heading">
                      {step.title}
                    </h3>
                    <p className="text-[16px] text-[var(--text)] leading-[1.6]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How findings are decided + How the AI is used */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-[var(--lilac)] rounded-[28px] p-8 space-y-4 text-[var(--ink)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                How findings are decided
              </h2>
              <ul className="space-y-3 text-[16px] text-[#283148] leading-[1.6]">
                <li>Every finding shows a quote from the draft and a page.</li>
                <li>If Tridral can't find supporting text, the requirement is marked Missing.</li>
                <li>If it's unsure, it marks the requirement Partial and says why.</li>
                <li>You make the final call on every finding.</li>
              </ul>
            </section>

            <section className="bg-[var(--sky)] rounded-[28px] p-8 space-y-4 text-[var(--ink)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                How the AI is used
              </h2>
              <p className="text-[16px] text-[#1C354D] leading-[1.6]">
                Tridral is designed to use two kinds of AI. Document analysis reads the PDF, including its layout, tables, and page numbers. A large language model then extracts the requirements and judges how well the draft covers each one. For each requirement, Tridral first finds the most relevant passages in the draft, then judges them. The model must support every judgment with a quote and a page from the document, and it does not invent requirements.
              </p>
            </section>
          </div>

          {/* Compared with checking by hand */}
          <section
            className="bg-white rounded-[28px] border border-[#E2E8F8] overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="px-7 sm:px-8 py-5 bg-[#F8FAFF] border-b border-[#EAEEFA]">
              <h2 className="text-xl font-bold text-[var(--ink)] display-heading">
                Compared with checking by hand
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#EAEEFA] text-xs font-semibold text-[var(--muted)]">
                    <th className="py-3.5 px-7"></th>
                    <th className="py-3.5 px-7">By hand</th>
                    <th className="py-3.5 px-7 text-[var(--blue)]">With Tridral</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F3FC] text-[15px]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label}>
                      <td className="py-4 px-7 font-semibold text-[var(--ink)]">{row.label}</td>
                      <td className="py-4 px-7 text-[var(--text)]">{row.byHand}</td>
                      <td className="py-4 px-7 text-[var(--ink)] font-medium">{row.withTridral}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Where Tridral fits */}
          <section
            className="bg-white rounded-[28px] border border-[#E2E8F8] p-8 sm:p-10 space-y-3"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
              Where Tridral fits
            </h2>
            <p className="text-[16px] text-[var(--text)] leading-[1.6]">
              Many proposal platforms help teams find opportunities, manage content, and write proposals, and some include compliance features. Tridral is narrower. It is a focused check of a finished draft against the RFP, designed for small teams that want a final check, not another platform to adopt.
            </p>
          </section>

          {/* Strengths and limits */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] display-heading">
              Strengths and limits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--mint-tint)]/65 border border-[#ACE2C7] rounded-[28px] p-8 space-y-4">
                <h3 className="text-xl font-bold text-[var(--ink)] display-heading">
                  Good at
                </h3>
                <ul className="space-y-3 text-[15px] text-[var(--ink)]">
                  {[
                    'Putting every requirement in one place.',
                    'Showing the page behind every finding.',
                    'Catching format rules and required forms.',
                    'Giving a risk score you can explain.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckIcon className="w-4 h-4 text-[#0B7A4B] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="bg-white border border-[#E2E8F8] rounded-[28px] p-8 space-y-4"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="text-xl font-bold text-[var(--ink)] display-heading">
                  Isn't
                </h3>
                <ul className="space-y-3 text-[15px] text-[var(--text)]">
                  {[
                    "It doesn't write your proposal.",
                    "It isn't legal or compliance advice.",
                    'It can miss or misjudge a requirement, so findings need a human check.',
                    'It starts with federal-style PDF solicitations. Scanned or messy files may reduce accuracy.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] shrink-0 mt-2.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <p className="text-sm font-medium text-[var(--muted)]">
            All of this describes the product in development.
          </p>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
