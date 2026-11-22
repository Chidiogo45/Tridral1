import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 pb-6 border-b border-[#E2E8F0]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3979F6]">
            Legal
          </div>
          <h1 className="text-[34px] sm:text-[42px] font-extrabold text-[#101B2C] display-heading">
            Privacy Policy
          </h1>
          <p className="text-[14px] text-[#64748B]">
            Applies to the public Tridral website at https://tridral.com.
          </p>
        </div>

        <div className="space-y-6 text-[15.5px] text-[#172337] leading-[1.7]">
          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
              Information Collected
            </h2>
            <p className="text-[#64748B]">
              This public company website collects only the information you voluntarily submit through the contact form: your name, business email address, organization, inquiry type, and message. This website does not accept document uploads or process RFP files.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
              How Information Is Used
            </h2>
            <p className="text-[#64748B]">
              Submitted contact details are used solely to respond to your inquiry, discuss technology or partnership opportunities, or share requested updates regarding Tridral and Arlinex.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
              Privacy Inquiries
            </h2>
            <p className="text-[#64748B]">
              To request deletion of contact correspondence or ask privacy questions, email{' '}
              <a href="mailto:info@tridral.com" className="text-[#3979F6] font-medium hover:underline">
                info@tridral.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 pb-6 border-b border-[#E2E8F0]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3979F6]">
            Legal
          </div>
          <h1 className="text-[34px] sm:text-[42px] font-extrabold text-[#101B2C] display-heading">
            Terms of Use
          </h1>
          <p className="text-[14px] text-[#64748B]">
            Applies to the public Tridral website at https://tridral.com.
          </p>
        </div>

        <div className="space-y-6 text-[15.5px] text-[#172337] leading-[1.7]">
          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
              Informational Purpose
            </h2>
            <p className="text-[#64748B]">
              Content on this website provides general corporate and product overview information about Tridral and Arlinex. Arlinex is currently in development, and interface previews use illustrative sample data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
              No Legal or Compliance Advice
            </h2>
            <p className="text-[#64748B]">
              Nothing on this website constitutes legal, procurement, or regulatory compliance advice. Organizations remain responsible for verifying all solicitation requirements before submitting bids.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-[#101B2C] display-heading">
              Contact
            </h2>
            <p className="text-[#64748B]">
              Questions regarding these terms may be directed to{' '}
              <a href="mailto:info@tridral.com" className="text-[#3979F6] font-medium hover:underline">
                info@tridral.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
