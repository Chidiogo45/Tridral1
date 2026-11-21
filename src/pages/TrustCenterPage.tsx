import React from 'react';
import { PageId } from '../types.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';

interface TrustCenterPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

export const TrustCenterPage: React.FC<TrustCenterPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <PageHeader
            title="Trust Center."
            subline="Tridral is in development. This page describes how we're designing the product and what this website collects. We'll update it before launch."
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          <section className="p-6 rounded-[28px] bg-[#FFF0CC]/65 border border-[#F2D58C] space-y-1">
            <h2 className="text-base font-bold text-[#5C3D00] display-heading">Status</h2>
            <p className="text-[15px] text-[#5C3D00]">
              Tridral is in development. This page describes how we&apos;re designing the product and what this website collects. We&apos;ll update it before launch.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section
              className="bg-white rounded-[28px] border border-[#E2E8F8] p-7 sm:p-9 space-y-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Data handling
              </h2>
              <ul className="space-y-3 text-[16px] text-[var(--text)] leading-[1.6]">
                <li>Uploaded files are designed to be stored privately, with no public access.</li>
                <li>You can ask us to delete your files.</li>
              </ul>
            </section>

            <section
              className="bg-[var(--sky)]/65 rounded-[28px] border border-[#B5DDF5] p-7 sm:p-9 space-y-4 text-[var(--ink)]"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Responsible AI
              </h2>
              <ul className="space-y-3 text-[16px] text-[#1C354D] leading-[1.6]">
                <li>Findings are suggestions, not decisions.</li>
                <li>Every finding shows evidence: a quote and a page, so you can verify it.</li>
                <li>
                  If Tridral can&apos;t find supporting text, it marks the requirement Missing. If it&apos;s unsure, it marks it Partial and says why.
                </li>
                <li>Requirements come from the RFP text. Tridral does not invent them.</li>
              </ul>
            </section>

            <section
              className="bg-[var(--mint-tint)]/65 rounded-[28px] border border-[#ACE2C7] p-7 sm:p-9 space-y-4 text-[var(--ink)]"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Privacy
              </h2>
              <p className="text-[16px] text-[#184032] leading-[1.6]">
                This website collects what you enter in the early access form: name, work email, company, company size, the types of RFPs you respond to, proposals per year, and optional notes. We use it to contact you about early access.
              </p>
              <p className="text-[15px] text-[#184032]">
                <a
                  href="mailto:info@tridral.com"
                  className="font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
                >
                  info@tridral.com
                </a>
              </p>
            </section>

            <section
              className="bg-white rounded-[28px] border border-[#E2E8F8] p-7 sm:p-9 space-y-4"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl font-bold text-[var(--ink)] display-heading">
                Security
              </h2>
              <p className="text-[16px] text-[var(--text)] leading-[1.6]">
                We&apos;ll publish our security practices here before launch.
              </p>
            </section>
          </div>

          <p className="p-6 rounded-[28px] bg-white border border-[#E2E8F8] text-sm text-[var(--ink)] card-soft-shadow">
            Tridral checks proposals against the text of an RFP. It is not legal or compliance advice. Always verify before you submit.
          </p>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
