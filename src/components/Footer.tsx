import React from 'react';
import { PageId } from '../types.ts';
import { Logo } from './Logo.tsx';
import { ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B0F1A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-14">
          {/* Brand & positioning column */}
          <div className="col-span-2 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => onNavigate('home')}>
              <Logo
                size={28}
                wordmarkClass="text-xl font-bold tracking-tight text-white"
              />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Real-time AI transaction-graph modeling for digital banks, fintechs, and payment processors. Stopping coordinated fraud before funds settle.
            </p>

            {/* Professional Contact Email */}
            <div className="pt-1">
              <a
                href="mailto:info@tridral.com"
                className="inline-flex items-center gap-2 text-sm text-[#2DD4BF] hover:text-[#5eead4] font-medium transition-colors"
                title="Send email to info@tridral.com"
              >
                <Mail className="w-4 h-4 text-[#2DD4BF]" />
                <span>info@tridral.com</span>
              </a>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2DD4BF]" />
                SOC 2 Type II Aligned
              </span>
              <button
                onClick={() => onNavigate('status')}
                className="hover:text-white transition-colors cursor-pointer text-slate-400 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                API Systems Operational
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('platform')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Platform Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Detection Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Volume Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Tech */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Engineering
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('architecture')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  System Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('case-for-graph')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Case for Graph AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('integrations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  API & Payment Rails
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('status')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  System Status & Latency
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Governance & Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('compliance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Compliance & AML/CFT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trust-center')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trust Center & Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About & Founder Note
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@tridral.com"
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>info@tridral.com</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quote')}
                  className="inline-flex items-center gap-1 text-[#2DD4BF] font-medium hover:text-[#5eead4] transition-colors cursor-pointer"
                >
                  <span>Contact / Request Pilot</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Tridral Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@tridral.com"
              className="text-[#2DD4BF] hover:underline transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>info@tridral.com</span>
            </a>
            <button
              onClick={() => onNavigate('trust-center')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy & Security
            </button>
            <button
              onClick={() => onNavigate('compliance')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Compliance Framework
            </button>
            <button
              onClick={() => onNavigate('quote')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Contact Engineering
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
