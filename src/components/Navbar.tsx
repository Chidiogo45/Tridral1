import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { Logo } from './Logo.tsx';
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon } from './Icons.tsx';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

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
    const handleOutsideClick = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const primaryNav: { id: PageId; label: string }[] = [
    { id: 'product', label: 'Product' },
    { id: 'sample-report', label: 'Sample report' },
    { id: 'why-it-matters', label: 'Why it matters' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
  ];

  const moreNav: { id: PageId; label: string }[] = [
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'faq', label: 'FAQ' },
    { id: 'trust-center', label: 'Trust Center' },
  ];

  const isMoreActive = moreNav.some((item) => item.id === currentPage);

  const handleNav = (page: PageId, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onNavigate(page);
    setMoreOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-[1200px] mx-auto pointer-events-auto">
        <div
          className="flex items-center justify-between gap-4 lg:gap-6 px-4 sm:px-5 h-16 rounded-full bg-white/92 backdrop-blur-md border border-[#E2E8F8]"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {/* Brand */}
          <a
            href={PAGE_PATHS.home}
            onClick={(e) => handleNav('home', e)}
            className="flex items-center focus-ring rounded-full py-1 px-1 cursor-pointer shrink-0"
            aria-label="Tridral Home"
          >
            <Logo size={30} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {primaryNav.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => handleNav(item.id, e)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 rounded-full text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-ring ${
                    isActive
                      ? 'bg-[var(--blue-soft)] text-[var(--blue)] font-semibold'
                      : 'text-[var(--text)] hover:text-[var(--ink)] hover:bg-[#F4F6FF]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-ring ${
                  isMoreActive || moreOpen
                    ? 'bg-[var(--blue-soft)] text-[var(--blue)] font-semibold'
                    : 'text-[var(--text)] hover:text-[var(--ink)] hover:bg-[#F4F6FF]'
                }`}
              >
                <span>More</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  aria-label="More pages"
                  className="absolute left-0 mt-3 w-48 rounded-2xl bg-white border border-[#E2E8F8] p-2 z-50"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  {moreNav.map((item) => {
                    const active = currentPage === item.id;
                    return (
                      <a
                        key={item.id}
                        role="menuitem"
                        href={PAGE_PATHS[item.id]}
                        onClick={(e) => handleNav(item.id, e)}
                        aria-current={active ? 'page' : undefined}
                        className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors focus-ring ${
                          active
                            ? 'bg-[var(--blue-soft)] text-[var(--blue)] font-semibold'
                            : 'text-[var(--ink)] hover:bg-[#F4F6FF]'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href={PAGE_PATHS['early-access']}
              onClick={(e) => handleNav('early-access', e)}
              className="group inline-flex items-center justify-center gap-2 h-11 px-5 text-sm font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors duration-200 cursor-pointer focus-ring whitespace-nowrap shrink-0"
            >
              <span>Join early access</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <a
              href={PAGE_PATHS['early-access']}
              onClick={(e) => handleNav('early-access', e)}
              className="inline-flex items-center h-9 px-3.5 text-xs font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors whitespace-nowrap shrink-0 focus-ring"
            >
              Join early access
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="w-10 h-10 inline-flex items-center justify-center text-[var(--ink)] hover:bg-[var(--blue-soft)] rounded-full transition-colors focus-ring cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet */}
      <div
        className={`lg:hidden fixed inset-0 top-[88px] z-40 px-4 transition-all duration-250 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="fixed inset-0 top-[88px] bg-[#0B1020]/30 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`relative max-w-[1200px] mx-auto bg-white rounded-[28px] border border-[#E2E8F8] p-6 max-h-[calc(100vh-112px)] overflow-y-auto transition-transform duration-250 ease-out ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="space-y-1.5">
            {primaryNav.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => handleNav(item.id, e)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-base font-medium flex items-center justify-between transition-colors focus-ring ${
                    isActive
                      ? 'bg-[var(--blue-soft)] text-[var(--blue)] font-semibold'
                      : 'text-[var(--ink)] hover:bg-[#F4F6FF]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E8ECF8] space-y-1">
            <div className="px-4 py-1 text-xs font-semibold text-[var(--muted)]">
              More
            </div>
            {moreNav.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => handleNav(item.id, e)}
                  className={`block w-full text-left px-4 py-2.5 rounded-2xl text-sm transition-colors focus-ring ${
                    isActive
                      ? 'text-[var(--blue)] font-semibold bg-[var(--blue-soft)]'
                      : 'text-[var(--text)] hover:bg-[#F4F6FF] hover:text-[var(--ink)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="mt-6">
            <a
              href={PAGE_PATHS['early-access']}
              onClick={(e) => handleNav('early-access', e)}
              className="group w-full h-12 inline-flex items-center justify-center gap-2 px-6 text-sm font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors focus-ring"
            >
              <span>Join early access</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
