import React from 'react';
import { PageId } from '../types.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';

interface WhyItMattersPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

const CASES = [
  {
    title: 'Page limit exceeded.',
    summary:
      'A small business was eliminated after its technical volume ran at least three pages over the 50-page limit.',
    sourceLabel: 'GAO decision B-423202',
    sourceUrl: 'https://www.gao.gov/products/b-423202',
    tint: 'bg-white border border-[#E2E8F8]',
  },
  {
    title: 'Cover page too long.',
    summary:
      "A vendor's cover page ran three pages against a two-page limit, and the quotation was found noncompliant.",
    sourceLabel: 'GAO decision B-423677',
    sourceUrl: 'https://www.gao.gov/products/B-423677',
    tint: 'bg-[var(--lilac)]/65 border border-[#D4C7F4]',
  },
  {
    title: 'Wrong file format.',
    summary:
      'A company was disqualified before award for submitting a required form as an unfillable PDF instead of a fillable one.',
    sourceLabel: 'Morrison Foerster roundup',
    sourceUrl:
      'https://govcon.mofo.com/topics/october-2023-bid-protest-roundup-instructions-jurisdiction-scrutiny',
    tint: 'bg-[var(--sky)]/65 border border-[#B5DDF5]',
  },
  {
    title: 'Page counting (2014).',
    summary:
      "Five companies' proposals on a very large NASA contract were thrown out for exceeding the page limit.",
    sourceLabel: 'Washington Technology',
    sourceUrl:
      'https://www.washingtontechnology.com/2014/08/counting-error-costs-five-companies-shot-at-20b-contract/355732/',
    tint: 'bg-[var(--mint-tint)]/65 border border-[#ACE2C7]',
  },
];

export const WhyItMattersPage: React.FC<WhyItMattersPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <PageHeader
            title="Why this problem matters."
            subline="Real cases and the size of the market, from public sources."
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          {/* The market */}
          <section
            className="bg-white rounded-[28px] border border-[#E2E8F8] p-8 sm:p-10 space-y-4"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
              The market
            </h2>
            <p className="text-[17px] text-[var(--ink)] leading-[1.6]">
              Small businesses won about $179 billion in direct federal prime contracts in fiscal 2025, roughly 28% of prime contract dollars. Including subcontracts, the total was nearly $273 billion.
            </p>
            <div>
              <a
                href="https://www.sba.gov/article/2026/06/25/sba-releases-fy25-scorecard-small-business-contracting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
              >
                U.S. Small Business Administration, FY25 scorecard ↗
              </a>
            </div>
            <p className="text-sm text-[var(--muted)] pt-2 border-t border-[#EAEEFA]">
              This shows how much work small businesses compete for. It is not an estimate of Tridral's revenue.
            </p>
          </section>

          {/* How bids get rejected */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] display-heading">
              How bids get rejected
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASES.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-[28px] p-7 sm:p-9 flex flex-col justify-between gap-5 card-lift ${item.tint}`}
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[var(--ink)] display-heading">
                      {item.title}
                    </h3>
                    <p className="text-[16px] text-[var(--ink)] leading-[1.6]">
                      {item.summary}
                    </p>
                  </div>

                  <div>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
                    >
                      {item.sourceLabel} ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-sm text-[var(--muted)]">
              These cases illustrate the problem. Tridral did not take part in them and does not claim it would have changed the outcome.
            </p>
          </section>

          {/* Why small teams feel it most */}
          <section className="bg-[var(--sky)]/65 border border-[#B5DDF5] rounded-[28px] p-8 sm:p-10 space-y-3 text-[var(--ink)]">
            <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
              Why small teams feel it most
            </h2>
            <p className="text-[16px] text-[#1C354D] leading-[1.6]">
              Large contractors have proposal and compliance staff. Small teams often rely on owners and proposal managers who are also delivering the work.
            </p>
          </section>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
