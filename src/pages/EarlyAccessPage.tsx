import React, { useState, useEffect } from 'react';
import { PageId, EarlyAccessFormData, RfpType, InterestOption } from '../types.ts';
import { ArrowRightIcon, CheckIcon, MailIcon } from '../components/Icons.tsx';

interface EarlyAccessPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
  preselectWalkthrough?: boolean;
}

const RFP_TYPE_OPTIONS: RfpType[] = ['Federal', 'State', 'Local'];
const COMPANY_SIZE_OPTIONS: EarlyAccessFormData['companySize'][] = [
  '1 to 10',
  '11 to 50',
  '51 or more',
];
const PROPOSALS_PER_YEAR_OPTIONS: EarlyAccessFormData['proposalsPerYear'][] = [
  '1 to 5',
  '6 to 15',
  '16 or more',
];
const INTEREST_OPTIONS: InterestOption[] = [
  'Early access',
  'A walkthrough call',
  'Both',
];

export const EarlyAccessPage: React.FC<EarlyAccessPageProps> = ({
  onNavigate,
  preselectWalkthrough = false,
}) => {
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '1 to 10',
    rfpTypes: ['Federal'],
    proposalsPerYear: '6 to 15',
    interest: preselectWalkthrough ? 'A walkthrough call' : 'Early access',
    notes: '',
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interest: preselectWalkthrough ? 'A walkthrough call' : 'Early access',
    }));
  }, [preselectWalkthrough]);

  const [honeypot, setHoneypot] = useState<string>('');
  const [clientTimestamp] = useState<number>(() => Date.now());

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact';

  const toggleRfpType = (type: RfpType) => {
    setFormData((prev) => {
      const exists = prev.rfpTypes.includes(type);
      if (exists) {
        return { ...prev, rfpTypes: prev.rfpTypes.filter((t) => t !== type) };
      }
      return { ...prev, rfpTypes: [...prev.rfpTypes, type] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const fullName = formData.fullName.trim();
    const workEmail = formData.workEmail.trim();
    const companyName = formData.companyName.trim();

    if (fullName.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (companyName.length < 2) {
      setErrorMsg('Please enter your company name.');
      return;
    }

    if (formData.rfpTypes.length === 0) {
      setErrorMsg('Please select at least one type of RFP.');
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
          name: fullName,
          email: workEmail,
          companyName,
          companySize: formData.companySize,
          rfpTypes: formData.rfpTypes,
          proposalsPerYear: formData.proposalsPerYear,
          interest: formData.interest,
          notes: formData.notes.trim(),
          subject: `${formData.interest} — ${companyName}`,
          honeypot,
          clientTimestamp,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setErrorMsg('Something went wrong. Please try again or email info@tridral.com.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMsg('Something went wrong. Please try again or email info@tridral.com.');
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full h-[52px] px-4 text-[15px] rounded-[14px] border border-[#DCE3F8] bg-white text-[var(--ink)] placeholder:text-[var(--muted)] hover:bg-[var(--blue-soft)]/35 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent disabled:bg-[#F4F6FF] transition-colors';

  return (
    <div className="tridral-lavender-backdrop pt-28 sm:pt-32 pb-20 sm:pb-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold text-[var(--ink)] display-heading leading-[1.06]">
            Join the early access list.
          </h1>
          <p className="text-[17px] text-[var(--text)] leading-[1.6]">
            Tell us which RFPs you respond to and how many proposals your team submits each year. We&apos;ll reach out as early access spots open.
          </p>
        </div>

        {!submitted ? (
          <div
            className="bg-white rounded-[28px] border border-[#E2E8F8] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {/* Left Column */}
            <aside className="lg:col-span-5 bg-[#F8FAFF] p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#EAEEFA] flex flex-col justify-between gap-8">
              <div>
                <p className="text-[16px] text-[var(--text)] leading-[1.6]">
                  Tell us which RFPs you respond to and how many proposals your team submits each year. We&apos;ll reach out as early access spots open.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E6ECFA]">
                <a
                  href="mailto:info@tridral.com"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[var(--blue)] hover:underline focus-ring rounded-xs"
                >
                  <MailIcon className="w-4 h-4" />
                  <span>info@tridral.com</span>
                </a>
              </div>
            </aside>

            {/* Right Column: Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-7 p-8 sm:p-10 space-y-6"
            >
              {errorMsg && (
                <div
                  role="alert"
                  className="p-4 rounded-2xl bg-[#FFE0DC] text-[#B42318] text-sm font-medium"
                >
                  {errorMsg}
                </div>
              )}

              {/* Anti-spam honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="tridral_hp_field">Leave blank</label>
                <input
                  id="tridral_hp_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="full-name" className="block text-sm font-semibold text-[var(--ink)]">
                    Full name *
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="work-email" className="block text-sm font-semibold text-[var(--ink)]">
                    Work email *
                  </label>
                  <input
                    id="work-email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="company-name" className="block text-sm font-semibold text-[var(--ink)]">
                    Company name *
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="proposals-year" className="block text-sm font-semibold text-[var(--ink)]">
                    Proposals per year *
                  </label>
                  <select
                    id="proposals-year"
                    disabled={isSubmitting}
                    value={formData.proposalsPerYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        proposalsPerYear: e.target.value as EarlyAccessFormData['proposalsPerYear'],
                      })
                    }
                    className={inputClasses}
                  >
                    {PROPOSALS_PER_YEAR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--ink)]">
                  Company size *
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {COMPANY_SIZE_OPTIONS.map((size) => {
                    const active = formData.companySize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setFormData({ ...formData, companySize: size })}
                        className={`h-11 px-3 text-sm font-semibold rounded-full border transition-colors cursor-pointer focus-ring ${
                          active
                            ? 'bg-[var(--blue)] text-white border-[var(--blue)]'
                            : 'bg-[#F8FAFF] text-[var(--ink)] border-[#DCE3F8] hover:bg-[var(--blue-soft)]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--ink)]">
                  Types of RFPs *
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {RFP_TYPE_OPTIONS.map((type) => {
                    const selected = formData.rfpTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => toggleRfpType(type)}
                        aria-pressed={selected}
                        className={`h-11 px-3 text-sm font-semibold rounded-full border transition-colors cursor-pointer flex items-center justify-center gap-2 focus-ring ${
                          selected
                            ? 'bg-[var(--blue-soft)] text-[var(--blue)] border-[var(--blue)]'
                            : 'bg-white text-[var(--text)] border-[#DCE3F8] hover:bg-[#F8FAFF] hover:text-[var(--ink)]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selected
                              ? 'bg-[var(--blue)] border-[var(--blue)] text-white'
                              : 'border-[#C7D2EF]'
                          }`}
                        >
                          {selected && <CheckIcon className="w-2.5 h-2.5" />}
                        </span>
                        <span>{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--ink)]">
                  I&apos;d like *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {INTEREST_OPTIONS.map((option) => {
                    const active = formData.interest === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setFormData({ ...formData, interest: option })}
                        aria-pressed={active}
                        className={`h-11 px-3 text-sm font-semibold rounded-full border transition-colors cursor-pointer focus-ring whitespace-nowrap ${
                          active
                            ? 'bg-[var(--blue)] text-white border-[var(--blue)]'
                            : 'bg-[#F8FAFF] text-[var(--ink)] border-[#DCE3F8] hover:bg-[var(--blue-soft)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes" className="block text-sm font-semibold text-[var(--ink)]">
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  disabled={isSubmitting}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-4 text-[15px] rounded-[14px] border border-[#DCE3F8] bg-white text-[var(--ink)] placeholder:text-[var(--muted)] hover:bg-[var(--blue-soft)]/35 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[var(--blue)] focus:border-transparent disabled:bg-[#F4F6FF] transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-ring whitespace-nowrap"
                >
                  <span>Join early access</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <a
                  href="mailto:info@tridral.com"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)] hover:text-[var(--blue)] transition-colors focus-ring rounded-xs"
                >
                  <MailIcon className="w-3.5 h-3.5" />
                  <span>info@tridral.com</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div
            className="max-w-2xl mx-auto bg-white rounded-[28px] border border-[#E2E8F8] p-8 sm:p-10 space-y-6"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <p className="text-xl font-bold text-[var(--ink)] display-heading">
              Thanks. We&apos;ll be in touch as early access spots open.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="h-11 px-6 text-sm font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors cursor-pointer focus-ring"
              >
                Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
