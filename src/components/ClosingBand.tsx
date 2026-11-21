import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { ArrowRightIcon } from './Icons.tsx';

interface ClosingBandProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

export const ClosingBand: React.FC<ClosingBandProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-[var(--blue-deep)] text-white py-20 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0 hero-grid-lines pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-[clamp(30px,4vw,48px)] font-extrabold text-white display-heading">
            Want to follow along?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={PAGE_PATHS['early-access']}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('early-access');
              }}
              className="group h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-semibold text-[var(--blue-deep)] bg-white hover:bg-[var(--blue-soft)] rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap focus-ring"
            >
              <span>Join early access</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={`${PAGE_PATHS['early-access']}?intent=walkthrough`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('early-access', { walkthrough: true });
              }}
              className="h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-medium text-white bg-transparent hover:bg-white/10 border border-white/35 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap focus-ring"
            >
              <span>Request a walkthrough</span>
            </a>
          </div>
          <p className="text-[14px] text-white/80">
            Investors and partners:{' '}
            <a
              href="mailto:info@tridral.com"
              className="underline hover:text-white focus-ring rounded-xs"
            >
              info@tridral.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
