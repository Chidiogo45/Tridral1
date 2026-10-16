import React, { useState, useEffect } from 'react';
import { PageId } from '../types.ts';
import { Logo } from './Logo.tsx';
import { Menu, X, ArrowRight, ShieldCheck, Cpu, Layers, GitGraph, FileText, Activity } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  const navItems: { id: PageId; label: string }[] = [
    { id: 'platform', label: 'Platform' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/70 backdrop-blur-sm border-b border-slate-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F5FFF] rounded-sm py-1"
            aria-label="Tridral Home"
          >
            <Logo size={28} />
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F5FFF] rounded-xs ${
                    isActive
                      ? 'text-[#2F5FFF] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2F5FFF] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('quote')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2F5FFF] hover:bg-[#254ecc] active:bg-[#1e3fa8] rounded-lg transition-colors cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F5FFF] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            >
              <span>Request Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2F5FFF] rounded-md"
            >
              Pilot
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F5FFF]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1 mb-6">
              <div className="text-xs font-semibold tracking-wider text-slate-600 uppercase px-3 py-2">
                Core Platform
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-[#2F5FFF] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {currentPage === item.id && <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FFF]" />}
                </button>
              ))}
            </div>

            <div className="space-y-1 pt-4 border-t border-slate-100 mb-6">
              <div className="text-xs font-semibold tracking-wider text-slate-600 uppercase px-3 py-2">
                Deep Dive & Assurance
              </div>
              <button
                onClick={() => handleNavClick('case-for-graph')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                  currentPage === 'case-for-graph' ? 'text-[#2F5FFF] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <GitGraph className="w-4 h-4 text-slate-400" />
                <span>The Case for Graph Detection</span>
              </button>
              <button
                onClick={() => handleNavClick('compliance')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                  currentPage === 'compliance' ? 'text-[#2F5FFF] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Compliance & AML/CFT</span>
              </button>
              <button
                onClick={() => handleNavClick('integrations')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                  currentPage === 'integrations' ? 'text-[#2F5FFF] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Cpu className="w-4 h-4 text-slate-400" />
                <span>Integrations & API</span>
              </button>
              <button
                onClick={() => handleNavClick('roadmap')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                  currentPage === 'roadmap' ? 'text-[#2F5FFF] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Product Roadmap</span>
              </button>
              <button
                onClick={() => handleNavClick('trust-center')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                  currentPage === 'trust-center' ? 'text-[#2F5FFF] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Trust Center & Security</span>
              </button>
              <button
                onClick={() => handleNavClick('status')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                  currentPage === 'status' ? 'text-[#2F5FFF] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-4 h-4 text-slate-400" />
                <span>System Status</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNavClick('quote')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-lg transition-colors shadow-xs"
              >
                <span>Request Pilot Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
