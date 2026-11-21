import React from 'react';
import { PageId } from '../types.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';

interface RoadmapPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

const SECTIONS = [
  {
    stage: 'In development',
    badgeClass: 'bg-[var(--blue-soft)] text-[var(--blue)]',
    dotClass: 'bg-[var(--blue)]',
    cardSurface: 'bg-white border border-[#E2E8F8]',
    items: [
      'Account sign-in.',
      'RFP upload and requirements matrix.',
      'Proposal check with Addressed, Partial, and Missing results.',
      'Risk score.',
      'CSV export.',
    ],
  },
  {
    stage: 'Planned',
    badgeClass: 'bg-[#FFF0CC] text-[#8A5A00]',
    dotClass: 'bg-[#8A5A00]',
    cardSurface: 'bg-[var(--sky)]/65 border border-[#B5DDF5]',
    items: ['Team workspaces and roles.', 'More RFP formats.', 'Online billing.'],
  },
  {
    stage: 'Exploring',
    badgeClass: 'bg-white text-[var(--ink)] border border-[#D4DCF3]',
    dotClass: 'bg-[var(--muted)]',
    cardSurface: 'bg-[var(--lilac)]/70 border border-[#D4C7F4]',
    items: ['Help drafting proposal sections.', 'A mobile app.'],
  },
];

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <PageHeader
            title="Roadmap."
            subline="What we're building. Nothing here is available yet."
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {SECTIONS.map((section) => (
              <section
                key={section.stage}
                className={`rounded-[28px] p-7 sm:p-8 space-y-6 ${section.cardSurface}`}
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${section.badgeClass}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${section.dotClass}`} />
                    {section.stage}
                  </span>
                </div>

                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="p-4 rounded-2xl bg-white border border-[#E2E8F8] text-[15px] font-medium text-[var(--ink)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
