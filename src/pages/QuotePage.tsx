import React, { useState } from 'react';
import { PageId, PilotQuoteForm } from '../types.ts';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building,
  Mail,
  User,
  Layers,
  Check,
  AlertTriangle,
  Loader2,
  Send,
} from 'lucide-react';

interface QuotePageProps {
  onNavigate: (page: PageId) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<PilotQuoteForm>({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '51-200 employees',
    primaryRequirement: 'Mule-network / coordinated fraud detection',
    deploymentTimeline: '1-3 months',
    environmentDetails: '',
  });

  // Anti-spam states
  const [honeypot, setHoneypot] = useState<string>('');
  const [clientTimestamp] = useState<number>(() => Date.now());

  // Submission & network feedback states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.workEmail.trim();
    const trimmedCompany = formData.companyName.trim();
    const trimmedDetails = formData.environmentDetails.trim();

    if (!trimmedName || !trimmedEmail || !trimmedCompany) {
      setErrorMsg('Please complete all required fields (Full Name, Work Email, and Company Name).');
      return;
    }

    if (trimmedName.length < 2) {
      setErrorMsg('Full name must be at least 2 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid work email address (e.g. name@company.com).');
      return;
    }

    if (!trimmedDetails || trimmedDetails.length < 5) {
      setErrorMsg('Please provide a message or brief description of your transaction environment (minimum 5 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: `${formData.primaryRequirement} — ${trimmedCompany}`,
          message: trimmedDetails,
          companyName: trimmedCompany,
          companySize: formData.companySize,
          primaryRequirement: formData.primaryRequirement,
          deploymentTimeline: formData.deploymentTimeline,
          honeypot: honeypot,
          clientTimestamp: clientTimestamp,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        // Do not pretend a message was sent if the API reports an error
        const failureMessage =
          data?.error ||
          `Submission failed (${response.status} ${response.statusText}). Please check your connection or email info@tridral.com directly.`;
        setErrorMsg(failureMessage);
        setIsSubmitting(false);
        return;
      }

      // Successful dispatch verified by API
      setSubmitted(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      // Network or fetch failure
      console.error('Contact form submission error:', err);
      setErrorMsg(
        err?.message ||
          'A network error occurred while communicating with the submission service. Please try again or email info@tridral.com directly.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Contact & Pilot Intake
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Contact Tridral or schedule a technical pilot.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Reach our engineering team directly at{' '}
          <a
            href="mailto:info@tridral.com"
            className="text-[#2F5FFF] font-semibold hover:underline"
            title="Send email to info@tridral.com"
          >
            info@tridral.com
          </a>{' '}
          or submit your payment environment details below. We offer dark shadow pilot deployments with zero production routing risk.
        </p>
      </div>

      {!submitted ? (
        /* Form View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-md space-y-6"
            noValidate
          >
            {/* Error Banner */}
            {errorMsg && (
              <div
                role="alert"
                className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm font-medium text-rose-800 flex items-start gap-3 animate-fade-in"
              >
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-rose-900">Submission Alert</div>
                  <div>{errorMsg}</div>
                </div>
              </div>
            )}

            {/* Anti-spam Honeypot Field (invisible to humans) */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="website_verification_hp">Leave this field blank</label>
              <input
                id="website_verification_hp"
                type="text"
                name="website_verification_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. Alex Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Work Email *</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  placeholder="alex@fintechcompany.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Name *</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. Apex Payments"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              {/* Company Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Size (Dropdown) *</span>
                </label>
                <select
                  disabled={isSubmitting}
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="1-50 employees">1–50 employees</option>
                  <option value="51-200 employees">51–200 employees</option>
                  <option value="201-1,000 employees">201–1,000 employees</option>
                  <option value="1,000+ employees">1,000+ employees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Requirement */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Primary Requirement / Subject *
                </label>
                <select
                  disabled={isSubmitting}
                  value={formData.primaryRequirement}
                  onChange={(e) => setFormData({ ...formData, primaryRequirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="Mule-network / coordinated fraud detection">
                    Mule networks & coordinated fraud
                  </option>
                  <option value="Account takeover detection">
                    Account takeover / credential stuffing
                  </option>
                  <option value="Synthetic identity detection">
                    Synthetic identity / application fraud
                  </option>
                  <option value="General transaction-anomaly detection">
                    General real-time transaction anomaly detection
                  </option>
                  <option value="Enterprise Architecture & Partnership">
                    Enterprise Architecture & Partnership
                  </option>
                </select>
              </div>

              {/* Deployment Timeline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Deployment Timeline (Dropdown) *
                </label>
                <select
                  disabled={isSubmitting}
                  value={formData.deploymentTimeline}
                  onChange={(e) => setFormData({ ...formData, deploymentTimeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="Immediate (< 30 days)">Immediate (&lt; 30 days)</option>
                  <option value="1-3 months">1–3 months</option>
                  <option value="3-6 months">3–6 months</option>
                  <option value="Exploring & Evaluating">Exploring & evaluating</option>
                </select>
              </div>
            </div>

            {/* Message / Environment Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Message & Environment Details *</span>
                <span className="text-slate-400 font-normal">Delivers to info@tridral.com</span>
              </label>
              <textarea
                rows={4}
                required
                disabled={isSubmitting}
                placeholder="Describe your current transaction pipeline, transaction volume, payment rails (e.g. RTP, Faster Payments, SEPA, Cards), or specific inquiry..."
                value={formData.environmentDetails}
                onChange={(e) => setFormData({ ...formData, environmentDetails: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] active:bg-[#1e3fa8] rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to info@tridral.com...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry & Pilot Request</span>
                  </>
                )}
              </button>

              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Inbox routed to info@tridral.com via Resend</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Enterprise confidentiality guaranteed. Reply-to address is set directly to your work email.
              </span>
            </div>
          </form>

          {/* Right: Pilot Scope Info & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Email Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Mail className="w-4 h-4 text-[#2F5FFF]" />
                <span>Direct Contact Inbox</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need immediate answers, security questionnaires, or enterprise discussions? You can reach our team directly at our verified business inbox:
              </p>
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  Primary Business Email
                </div>
                <a
                  href="mailto:info@tridral.com"
                  className="text-base font-bold text-[#2F5FFF] hover:text-[#254ecc] hover:underline flex items-center gap-2 mt-1"
                  title="Click to write to info@tridral.com"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@tridral.com</span>
                </a>
                <div className="text-[11px] text-slate-500 mt-1">
                  Hosted by Namecheap Private Email
                </div>
              </div>
            </div>

            {/* The Pilot Guarantee */}
            <div className="bg-[#0B0F1A] rounded-2xl p-6 text-white space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#2DD4BF] mono-data">
                The Pilot Guarantee
              </div>
              <h3 className="text-lg font-bold serif-heading text-white">
                Zero production routing risk.
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our pilot program runs in dark shadow mode: we receive an asynchronous replica of your transaction stream, generate real-time graph scores, and compare intercepts against your historical chargebacks without touching live funds.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Sub-24h sandbox API credentialing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Dedicated Slack/Teams engineering channel</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Comprehensive ROI and intercept report</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation Screen with Pilot Onboarding Timeline */
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-10 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center space-y-3 pb-8 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Delivered to info@tridral.com</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 serif-heading">
              Inquiry & Pilot Request Confirmed
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Your submission for{' '}
              <span className="font-semibold text-slate-900">{formData.companyName}</span> has been dispatched to{' '}
              <a href="mailto:info@tridral.com" className="font-semibold text-[#2F5FFF] hover:underline">
                info@tridral.com
              </a>
              . An engineering partner will review your environment parameters and reply to{' '}
              <span className="font-semibold text-slate-900">{formData.workEmail}</span> within 24 business hours.
            </p>
          </div>

          {/* 4-Phase Pilot Onboarding Timeline */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
                Structured Pilot Rollout
              </span>
              <h3 className="text-xl font-bold text-slate-900 serif-heading mt-1">
                Your 30-Day Evaluation Timeline
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Phase 1 */}
              <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2F5FFF] mono-data">
                  <span>PHASE 01</span>
                  <span>Days 1–5</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Pipeline Discovery & Audit</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Joint architectural review of your payment rails, schema mapping, and mutual NDA execution.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2F5FFF] mono-data">
                  <span>PHASE 02</span>
                  <span>Days 6–14</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Sandbox API Integration</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Provisioning dedicated tenant credentials and connecting webhook streams in isolated sandbox.
                </p>
              </div>

              {/* Phase 3 */}
              <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2F5FFF] mono-data">
                  <span>PHASE 03</span>
                  <span>Days 15–25</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Dark Shadow Evaluation</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Running sidecar graph inference on live mirrored traffic without altering transaction settlement.
                </p>
              </div>

              {/* Phase 4 */}
              <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2DD4BF] mono-data">
                  <span>PHASE 04</span>
                  <span>Days 26–30</span>
                </div>
                <div className="text-sm font-bold text-slate-900">Enforcement Handoff</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Benchmark report presentation, threshold calibration, and live pre-settlement policy activation.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setErrorMsg('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer underline"
            >
              Send another message or intake
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-lg transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
