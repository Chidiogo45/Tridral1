import React, { useState } from 'react';
import { PageId, PilotQuoteForm } from '../types.ts';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Calendar, Building, Mail, User, Layers, FileText, Check } from 'lucide-react';

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

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim() || !formData.companyName.trim()) {
      setErrorMsg('Please complete all required contact fields.');
      return;
    }

    if (!formData.workEmail.includes('@') || !formData.workEmail.includes('.')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Pilot Intake & Quote
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Request early access or schedule a technical pilot.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Test Tridral's pre-settlement graph defense on your transaction stream with zero core system overhaul. We offer dark shadow pilot deployments for qualified payment platforms.
        </p>
      </div>

      {!submitted ? (
        /* Form View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-md space-y-6"
          >
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-700">
                {errorMsg}
              </div>
            )}

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
                  placeholder="e.g. Alex Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
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
                  placeholder="alex@fintechcompany.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
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
                  placeholder="e.g. Apex Payments"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
                />
              </div>

              {/* Company Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Size (Dropdown) *</span>
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
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
                  Primary Requirement (Dropdown) *
                </label>
                <select
                  value={formData.primaryRequirement}
                  onChange={(e) => setFormData({ ...formData, primaryRequirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
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
                </select>
              </div>

              {/* Deployment Timeline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Deployment Timeline (Dropdown) *
                </label>
                <select
                  value={formData.deploymentTimeline}
                  onChange={(e) => setFormData({ ...formData, deploymentTimeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
                >
                  <option value="Immediate (< 30 days)">Immediate (&lt; 30 days)</option>
                  <option value="1-3 months">1–3 months</option>
                  <option value="3-6 months">3–6 months</option>
                  <option value="Exploring & Evaluating">Exploring & evaluating</option>
                </select>
              </div>
            </div>

            {/* Free-text Environment field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Tell us about your environment</span>
                <span className="text-slate-400 font-normal">Optional</span>
              </label>
              <textarea
                rows={3}
                placeholder="Mention current transaction volume, payment rails (e.g. RTP, Faster Payments, SEPA, Cards), or primary ledger infrastructure..."
                value={formData.environmentDetails}
                onChange={(e) => setFormData({ ...formData, environmentDetails: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2F5FFF] focus:border-transparent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Submit Pilot Intake Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Enterprise confidentiality guaranteed. Mutual NDA standard prior to technical sandbox provisioning.</span>
            </div>
          </form>

          {/* Right: Pilot Scope Info */}
          <div className="lg:col-span-4 space-y-6">
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
                  <span>Dedicated Slack engineering channel</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Comprehensive ROI and intercept report</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-3">
              <div className="text-xs font-bold text-slate-700">Need immediate answers?</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contact our engineering founders directly for architecture reviews or security compliance inquiries:
              </p>
              <div className="text-xs mono-data font-semibold text-[#2F5FFF]">
                engineering@tridral.com
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation Screen with Pilot Onboarding Timeline (Confirmed in Phase 1) */
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-10 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center space-y-3 pb-8 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 serif-heading">
              Pilot Request Confirmed
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm">
              Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. We've logged your intake for{' '}
              <span className="font-semibold text-slate-900">{formData.companyName}</span> ({formData.primaryRequirement}). An engineering partner will review your environment parameters within 24 business hours.
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
              onClick={() => setSubmitted(false)}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer underline"
            >
              Modify or submit another intake
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
