import React, { useState, useEffect } from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { Logo } from './Logo.tsx';
import { CloseIcon, MenuIcon } from './Icons.tsx';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'technology', label: 'Technology' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNav = (page: PageId, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark + geometric T */}
          <a
            href={PAGE_PATHS.home}
            onClick={(e) => handleNav('home', e)}
            className="inline-flex items-center py-1 focus-ring rounded-md whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Tridral Home"
          >
            <Logo size={28} variant="light" />
          </a>

          {/* Zone 2: Horizontal Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => handleNav(item.id, e)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-ring rounded-sm ${
                    isActive
                      ? 'text-[#101B2C] font-semibold'
                      : 'text-[#64748B] hover:text-[#101B2C]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#3979F6] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Prominent Contact Us action + Mobile toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PAGE_PATHS.contact}
              onClick={(e) => handleNav('contact', e)}
              className="hidden sm:inline-flex items-center justify-center h-10 px-5 text-[14px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-ring cursor-pointer"
            >
              Contact Us
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-11 h-11 inline-flex items-center justify-center text-[#101B2C] hover:bg-[#F4F6FA] rounded-lg border border-[#E2E8F0] transition-colors focus-ring cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-16 z-40 transition-opacity duration-200 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="fixed inset-0 top-16 bg-[#101B2C]/40 backdrop-blur-[2px]"
          onClick={() => setMobileMenuOpen(false)}
        />

        <nav
          aria-label="Mobile navigation"
          className={`relative bg-white border-b border-[#E2E8F0] px-4 py-5 shadow-xl transition-transform duration-200 ease-out max-h-[calc(100vh-4rem)] overflow-y-auto ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => handleNav(item.id, e)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors focus-ring ${
                    isActive
                      ? 'bg-[#EAF1FF] text-[#3979F6] font-semibold'
                      : 'text-[#172337] hover:bg-[#F4F6FA]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
            <a
              href={PAGE_PATHS.contact}
              onClick={(e) => handleNav('contact', e)}
              className="w-full min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 text-[15px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors focus-ring"
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
