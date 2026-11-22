import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { Logo } from './Logo.tsx';
import { MailIcon } from './Icons.tsx';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

const FOOTER_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'technology', label: 'Technology' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-[#0B1320] text-[#94A3B8] border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand + Description */}
          <div className="md:col-span-5 space-y-4">
            <a
              href={PAGE_PATHS.home}
              onClick={(e) => handleNav('home', e)}
              className="inline-flex items-center focus-ring rounded-md cursor-pointer"
              aria-label="Tridral Home"
            >
              <Logo size={28} variant="dark" />
            </a>
            <p className="text-[14px] leading-[1.65] text-[#94A3B8] max-w-sm">
              Tridral is a technology company developing intelligent software for complex operational workflows, featuring Arlinex for government RFP compliance review.
            </p>
            <p className="text-[13px] text-[#64748B]">
              Product in development. Information on this site describes planned architecture and illustrative capabilities.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-[13px] font-semibold text-white tracking-wide">
              Company &amp; Platform
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 text-[14px]">
              {FOOTER_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={PAGE_PATHS[item.id]}
                    onClick={(e) => handleNav(item.id, e)}
                    className="hover:text-white transition-colors focus-ring rounded-xs cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-[13px] font-semibold text-white tracking-wide">
              Direct Contact
            </h3>
            <div>
              <a
                href="mailto:info@tridral.com"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-white hover:text-[#3979F6] transition-colors focus-ring rounded-xs"
              >
                <MailIcon className="w-4 h-4 text-[#3979F6]" />
                <span>info@tridral.com</span>
              </a>
            </div>
            <p className="text-[13px] text-[#94A3B8] leading-[1.6]">
              For technology partnerships, investor inquiries, and stakeholder discussions.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#64748B]">
          <p>© {new Date().getFullYear()} Tridral. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href={PAGE_PATHS.privacy}
              onClick={(e) => handleNav('privacy', e)}
              className="hover:text-white transition-colors focus-ring rounded-xs cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href={PAGE_PATHS.terms}
              onClick={(e) => handleNav('terms', e)}
              className="hover:text-white transition-colors focus-ring rounded-xs cursor-pointer"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
