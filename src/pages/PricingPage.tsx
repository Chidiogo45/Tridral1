import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';
import { ArrowRightIcon } from '../components/Icons.tsx';

interface PricingPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

const PLANS = [
  {
    name: 'Starter',
    description: 'for occasional bids.',
    featured: false,
    tint: 'bg-white border border-[#E2E8F8]',
  },
  {
    name: 'Team',
    description: 'for teams that bid regularly.',
    featured: true,
    tint: 'bg-[var(--blue-deep)] text-white',
  },
  {
    name: 'Custom',
    description: 'for special needs, talk to us.',
    featured: false,
    tint: 'bg-[var(--lilac)]/65 border border-[#D4C7F4]',
  },
];

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <PageHeader
            title="Pricing."
            subline="How Tridral is planned to make money."
            buttonLabel="Join early access"
            onButtonClick={() => onNavigate('early-access')}
          />

          <p className="max-w-3xl text-[17px] text-[var(--text)] leading-[1.6]">
            Tridral is planned as a monthly subscription, with plans based on how much you use it: the number of projects and pages processed. Plans and prices will be announced before launch, and we&apos;ll share them with the early access list first.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[28px] p-8 flex flex-col justify-between gap-8 card-lift ${plan.tint}`}
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="space-y-4">
                  <h2
                    className={`text-2xl font-extrabold display-heading ${
                      plan.featured ? 'text-white' : 'text-[var(--ink)]'
                    }`}
                  >
                    {plan.name}: {plan.description}
                  </h2>

                  <div
                    className={`pt-4 border-t text-base font-medium ${
                      plan.featured
                        ? 'border-white/20 text-white/85'
                        : 'border-[#0B1020]/10 text-[var(--text)]'
                    }`}
                  >
                    Details at launch.
                  </div>
                </div>

                <div>
                  <a
                    href={PAGE_PATHS['early-access']}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('early-access');
                    }}
                    className={`group w-full h-12 inline-flex items-center justify-center gap-2 px-6 text-sm font-semibold rounded-full transition-colors cursor-pointer focus-ring whitespace-nowrap ${
                      plan.featured
                        ? 'bg-white hover:bg-[var(--blue-soft)] text-[var(--blue-deep)]'
                        : 'bg-[var(--blue)] hover:bg-[#1447D4] text-white'
                    }`}
                  >
                    <span>Join early access</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[16px] text-[var(--ink)] font-medium">
            The buyer is the small contractor: the owner or proposal manager.
          </p>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
