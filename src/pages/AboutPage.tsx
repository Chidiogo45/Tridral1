import React from 'react';
import { PageId } from '../types.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';
import { MailIcon } from '../components/Icons.tsx';

interface AboutPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <PageHeader
            title="About Tridral."
            subline="Why it exists and who it's for."
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section
              className="bg-white rounded-[28px] border border-[#E2E8F8] p-8 space-y-3"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Why we&apos;re building it.
              </h2>
              <p className="text-[16px] text-[var(--text)] leading-[1.6]">
                A missed requirement, a wrong page limit, or a skipped form can end a bid before it&apos;s scored. Large contractors have compliance departments. Small teams usually don&apos;t. Tridral is a check for that last step.
              </p>
            </section>

            <section className="bg-[var(--sky)] rounded-[28px] p-8 space-y-3 text-[var(--ink)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Who it&apos;s for.
              </h2>
              <p className="text-[16px] text-[#1C354D] leading-[1.6]">
                Teams of 1 to 50 people responding to federal, state, and local RFPs, usually owners and proposal managers juggling delivery work at the same time.
              </p>
              <p className="text-[16px] font-semibold text-[var(--ink)] leading-[1.6]">
                The job: before you submit, see every requirement and what you missed.
              </p>
            </section>

            <section className="bg-[var(--mint-tint)] rounded-[28px] p-8 space-y-3 text-[var(--ink)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                How we work.
              </h2>
              <p className="text-[16px] text-[#184032] leading-[1.6]">
                Every finding shows its evidence, so you can verify it. We will report accuracy only once we have measured it.
              </p>
            </section>

            <section className="bg-[var(--lilac)] rounded-[28px] p-8 space-y-3 text-[var(--ink)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Who&apos;s building it.
              </h2>
              <p className="text-[16px] text-[#283148] leading-[1.6]">
                Chidiogo Okolo, Founder. Backend developer building SaaS products.
              </p>
            </section>
          </div>

          <section
            className="bg-white rounded-[28px] border border-[#E2E8F8] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="text-lg font-bold text-[var(--ink)] display-heading">Contact.</h2>
            <a
              href="mailto:info@tridral.com"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs shrink-0"
            >
              <MailIcon className="w-4 h-4" />
              <span>info@tridral.com</span>
            </a>
          </section>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
