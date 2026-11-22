import React, { useState } from 'react';
import { ContactFormData, InquiryType } from '../types.ts';
import { ArrowRightIcon, CheckIcon, MailIcon } from './Icons.tsx';

interface ContactFormProps {
  variant?: 'dark-section' | 'light-page';
}

const INQUIRY_OPTIONS: InquiryType[] = [
  'Partnership & Technology',
  'Investor Relations',
  'Arlinex Product Inquiry',
  'General Inquiry',
];

export const ContactForm: React.FC<ContactFormProps> = ({ variant = 'light-page' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Partnership & Technology',
    message: '',
  });

  const [honeypot, setHoneypot] = useState<string>('');
  const [clientTimestamp] = useState<number>(() => Date.now());

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const name = formData.name.trim();
    const email = formData.email.trim();
    const organization = formData.organization.trim();
    const message = formData.message.trim();

    if (name.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    if (organization.length < 2) {
      setErrorMsg('Please enter your organization name.');
      return;
    }

    if (message.length < 5) {
      setErrorMsg('Please enter a brief message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          organization,
          inquiryType: formData.inquiryType,
          message,
          subject: `${formData.inquiryType} — ${organization}`,
          honeypot,
          clientTimestamp,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setErrorMsg(
          data?.error ||
            'Unable to send your message right now. Please try again or email info@tridral.com.'
        );
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setErrorMsg(
        'Unable to send your message right now. Please try again or email info@tridral.com.'
      );
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full h-11 px-3.5 text-[14px] rounded-lg border border-[#E2E8F0] bg-white text-[#172337] placeholder:text-[#94A3B8] focus:outline-hidden focus:ring-2 focus:ring-[#3979F6] focus:border-transparent disabled:bg-[#F4F6FA] transition-colors';

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-10 space-y-5 text-[#172337] shadow-lg">
        <div className="w-10 h-10 rounded-full bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center">
          <CheckIcon className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h3 className="text-[22px] font-bold text-[#101B2C] display-heading">
            Message received
          </h3>
          <p className="text-[15px] text-[#64748B] leading-relaxed">
            Thank you for reaching out to Tridral. Your inquiry has been sent to{' '}
            <a href="mailto:info@tridral.com" className="text-[#3979F6] font-medium hover:underline">
              info@tridral.com
            </a>{' '}
            and we will respond shortly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              organization: '',
              inquiryType: 'Partnership & Technology',
              message: '',
            });
          }}
          className="h-10 px-4 text-[13px] font-semibold text-[#101B2C] bg-[#F4F6FA] hover:bg-[#E2E8F0] rounded-lg transition-colors cursor-pointer focus-ring"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5 text-[#172337] ${
        variant === 'dark-section' ? 'shadow-2xl' : 'shadow-sm'
      }`}
    >
      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-[#B91C1C] text-[13px] font-medium"
        >
          {errorMsg}
        </div>
      )}

      {/* Anti-spam honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="tridral_website_hp">Leave blank</label>
        <input
          id="tridral_website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-[13px] font-semibold text-[#101B2C]">
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-[13px] font-semibold text-[#101B2C]">
            Business email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            disabled={isSubmitting}
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-organization"
            className="block text-[13px] font-semibold text-[#101B2C]"
          >
            Organization *
          </label>
          <input
            id="contact-organization"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Company or institution"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="contact-inquiry"
            className="block text-[13px] font-semibold text-[#101B2C]"
          >
            Inquiry type *
          </label>
          <select
            id="contact-inquiry"
            disabled={isSubmitting}
            value={formData.inquiryType}
            onChange={(e) =>
              setFormData({ ...formData, inquiryType: e.target.value as InquiryType })
            }
            className={inputClasses}
          >
            {INQUIRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-[13px] font-semibold text-[#101B2C]">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          disabled={isSubmitting}
          placeholder="Tell us about your partnership, technology, or product inquiry."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-3.5 text-[14px] rounded-lg border border-[#E2E8F0] bg-white text-[#172337] placeholder:text-[#94A3B8] focus:outline-hidden focus:ring-2 focus:ring-[#3979F6] focus:border-transparent disabled:bg-[#F4F6FA] transition-colors"
        />
      </div>

      <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group h-11 inline-flex items-center justify-center gap-2 px-6 text-[14px] font-semibold text-white bg-[#3979F6] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-ring whitespace-nowrap"
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>

        <a
          href="mailto:info@tridral.com"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#64748B] hover:text-[#3979F6] transition-colors focus-ring rounded-xs"
        >
          <MailIcon className="w-3.5 h-3.5" />
          <span>info@tridral.com</span>
        </a>
      </div>
    </form>
  );
};
