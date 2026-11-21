import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { Logo } from './Logo.tsx';
import { MailIcon } from './Icons.tsx';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
  };

  const productLinks: { id: PageId; label: string }[] = [
    { id: 'product', label: 'Product' },
    { id: 'sample-report', label: 'Sample report' },
    { id: 'why-it-matters', label: 'Why it matters' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'roadmap', label: 'Roadmap' },
  ];

  const companyLinks: { id: PageId; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'trust-center', label: 'Trust Center' },
    { id: 'early-access', label: 'Join early access' },
  ];

  return (
    <footer className="bg-white text-[var(--text)] pt-14 pb-10 border-t border-[#E2E8F8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#EAEEFA]">
          <div className="md:col-span-6 space-y-3">
            <a
              href={PAGE_PATHS.home}
              onClick={(e) => handleNav('home', e)}
              className="inline-flex items-center cursor-pointer focus-ring rounded-full p-1 -ml-1"
              aria-label="Tridral Home"
            >
              <Logo size={30} />
            </a>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[var(--ink)]">Product</h3>
            <ul className="space-y-2 text-[15px]">
              {productLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={PAGE_PATHS[item.id]}
                    onClick={(e) => handleNav(item.id, e)}
                    className="hover:text-[var(--blue)] transition-colors cursor-pointer focus-ring rounded-xs"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[var(--ink)]">Company</h3>
            <ul className="space-y-2 text-[15px]">
              {companyLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={PAGE_PATHS[item.id]}
                    onClick={(e) => handleNav(item.id, e)}
                    className="hover:text-[var(--blue)] transition-colors cursor-pointer focus-ring rounded-xs"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[var(--muted)]">
          <p>
            Tridral checks proposals against the text of an RFP. It is not legal or compliance advice. Always verify before you submit.
          </p>
          <a
            href="mailto:info@tridral.com"
            className="inline-flex items-center gap-1.5 text-[var(--blue)] hover:underline transition-colors text-sm font-medium shrink-0 focus-ring rounded-xs"
          >
            <MailIcon className="w-4 h-4" />
            <span>info@tridral.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
