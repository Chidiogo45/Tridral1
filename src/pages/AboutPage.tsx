import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { ArrowRightIcon, MailIcon } from '../components/Icons.tsx';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <section className="navy-grid-surface text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            About Tridral
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white display-heading leading-[1.08] max-w-3xl">
            Building intelligent software for complex operational work
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#CBD5E1] leading-[1.65] max-w-2xl">
            Tridral is a technology company developing applied AI solutions for document-intensive business workflows, starting with Arlinex for government RFP compliance analysis.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-3">
              <h2 className="text-[22px] font-bold text-[#101B2C] display-heading">
                Company Mission
              </h2>
              <p className="text-[15.5px] text-[#64748B] leading-[1.7]">
                Our mission is to help organizations interpret complex requirements, eliminate avoidable procedural errors, and make well-supported operational decisions without adding administrative overhead.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F4F6FA] border border-[#E2E8F0] space-y-3">
              <h2 className="text-[22px] font-bold text-[#101B2C] display-heading">
                Company Vision
              </h2>
              <p className="text-[15.5px] text-[#64748B] leading-[1.7]">
                We envision practical software products that bring structured clarity to high-stakes business documents, enabling small and growing teams to operate with enterprise-level rigor.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] space-y-3">
              <h2 className="text-[22px] font-bold text-[#101B2C] display-heading">
                Positioning &amp; Arlinex Focus
              </h2>
              <p className="text-[15.5px] text-[#64748B] leading-[1.7]">
                Arlinex is Tridral&apos;s featured product initiative, focused on helping small government contractors review draft proposals against Request for Proposal (RFP) rules. Over time, Tridral aims to expand into additional intelligent workflow tools built on shared document and compliance foundations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] space-y-3">
              <h2 className="text-[22px] font-bold text-[#101B2C] display-heading">
                Practical Innovation
              </h2>
              <p className="text-[15.5px] text-[#64748B] leading-[1.7]">
                We prioritize transparency, evidence citations, and human-in-the-loop accountability. Tridral avoids inflated performance claims and builds toward measurable reliability as Arlinex moves through development.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#101B2C] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="text-[20px] font-bold display-heading">
                Interested in partnering or learning more?
              </h3>
              <p className="text-[14.5px] text-[#CBD5E1]">
                Reach out to our team directly or submit an inquiry on the Contact page.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="mailto:info@tridral.com"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-white hover:text-[#3979F6] transition-colors focus-ring rounded-xs"
              >
                <MailIcon className="w-4 h-4 text-[#3979F6]" />
                <span>info@tridral.com</span>
              </a>
              <a
                href={PAGE_PATHS.contact}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="group h-11 inline-flex items-center gap-2 px-5 text-[14px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors focus-ring"
              >
                <span>Contact Tridral</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
