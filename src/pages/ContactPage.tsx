import React from 'react';
import { ContactForm } from '../components/ContactForm.tsx';
import { MailIcon } from '../components/Icons.tsx';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <section className="navy-grid-surface text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            Contact Tridral
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white display-heading leading-[1.08] max-w-3xl">
            Connect with Tridral
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#CBD5E1] leading-[1.65] max-w-2xl">
            Reach out to discuss technology partnerships, investor inquiries, cloud ecosystem collaboration, or the Arlinex product roadmap.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F6FA] py-16 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <aside className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-7 space-y-5">
                <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
                  Company Contact Details
                </h2>
                <p className="text-[14.5px] text-[#64748B] leading-[1.65]">
                  Messages submitted through this form are routed directly to the Tridral business inbox.
                </p>

                <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-[#64748B]">
                      Email
                    </div>
                    <a
                      href="mailto:info@tridral.com"
                      className="mt-1 inline-flex items-center gap-2 text-[15px] font-semibold text-[#3979F6] hover:underline focus-ring rounded-xs"
                    >
                      <MailIcon className="w-4 h-4" />
                      <span>info@tridral.com</span>
                    </a>
                  </div>

                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-wider text-[#64748B]">
                      Website
                    </div>
                    <div className="mt-1 text-[14.5px] font-medium text-[#172337]">
                      https://tridral.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-7 space-y-3">
                <h3 className="text-[16px] font-bold text-[#101B2C] display-heading">
                  Stakeholder &amp; Partner Inquiries
                </h3>
                <ul className="space-y-2 text-[14px] text-[#64748B]">
                  <li>Technology &amp; cloud ecosystem programs</li>
                  <li>Investor and strategic partner introductions</li>
                  <li>Arlinex product development updates</li>
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <ContactForm variant="light-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
