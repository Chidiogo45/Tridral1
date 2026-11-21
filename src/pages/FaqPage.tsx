import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';
import { ChevronDownIcon } from '../components/Icons.tsx';

interface FaqPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>('try');

  const items: FaqItem[] = [
    {
      id: 'try',
      question: 'Can I try it?',
      answer: (
        <>
          Not yet. You can{' '}
          <a
            href={PAGE_PATHS['sample-report']}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('sample-report');
            }}
            className="font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
          >
            open the sample report
          </a>
          ,{' '}
          <a
            href={`${PAGE_PATHS['early-access']}?intent=walkthrough`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('early-access', { walkthrough: true });
            }}
            className="font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
          >
            request a walkthrough call
          </a>
          , or{' '}
          <a
            href={PAGE_PATHS['early-access']}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('early-access');
            }}
            className="font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
          >
            join the early access list
          </a>
          .
        </>
      ),
    },
    {
      id: 'website-files',
      question: 'Does this website take my files?',
      answer: "No. It doesn't accept RFPs or proposals.",
    },
    {
      id: 'write',
      question: 'Does Tridral write my proposal?',
      answer: 'No. It checks the proposal you wrote against the RFP.',
    },
    {
      id: 'legal',
      question: 'Is this legal or compliance advice?',
      answer: 'No. It compares your draft to the text of the RFP. Always verify before you submit.',
    },
    {
      id: 'formats',
      question: 'Which RFPs does it support?',
      answer: "We're starting with federal-style PDF solicitations. Other formats are planned.",
    },
    {
      id: 'accuracy',
      question: 'How accurate is it?',
      answer:
        "We're measuring it against hand-labeled RFPs and will publish the real results once we have them.",
    },
    {
      id: 'files',
      question: 'What happens to my files?',
      answer: (
        <>
          See the{' '}
          <a
            href={PAGE_PATHS['trust-center']}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('trust-center');
            }}
            className="font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
          >
            Trust Center
          </a>
          .
        </>
      ),
    },
    {
      id: 'available',
      question: 'Is it available now?',
      answer: 'Not yet. The product is in development.',
    },
  ];

  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <PageHeader
            title="FAQ"
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          <div
            className="bg-white rounded-[28px] border border-[#E2E8F8] divide-y divide-[#EAEEFA] overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full text-left px-7 sm:px-9 py-6 flex items-center justify-between gap-4 hover:bg-[#F8FAFF] transition-colors cursor-pointer focus-ring"
                  >
                    <span className="text-lg sm:text-xl font-bold text-[var(--ink)] display-heading">
                      {item.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-[var(--blue)] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-7 sm:px-9 pb-6 text-[16px] text-[var(--text)] leading-[1.6]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
