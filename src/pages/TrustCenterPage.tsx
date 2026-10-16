import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { ShieldCheck, Lock, Cpu, Database, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface TrustCenterPageProps {
  onNavigate: (page: PageId) => void;
}

export const TrustCenterPage: React.FC<TrustCenterPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<'security' | 'privacy' | 'ai' | 'retention'>('security');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Security, Privacy & Responsible AI
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Trust Center: Institutional governance and plain-language commitments.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Financial platforms entrust us with their most critical transaction flows. Here is our complete, transparent policy on encryption, data handling, algorithmic fairness, and privacy safeguards.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#F7F9FC] p-1.5 rounded-xl border border-slate-200 overflow-x-auto min-w-max sm:min-w-0">
        <button
          onClick={() => setActiveSection('security')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSection === 'security'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lock className="w-4 h-4 text-[#2F5FFF]" />
          <span>Security Practices</span>
        </button>
        <button
          onClick={() => setActiveSection('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSection === 'privacy'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy Policy</span>
        </button>
        <button
          onClick={() => setActiveSection('ai')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSection === 'ai'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-purple-600" />
          <span>Responsible AI & Bias</span>
        </button>
        <button
          onClick={() => setActiveSection('retention')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSection === 'retention'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4 text-teal-600" />
          <span>Data Handling & Retention</span>
        </button>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-md space-y-10">
        {/* Security Practices */}
        {activeSection === 'security' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 serif-heading">
                Enterprise Security & Infrastructure Practices
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Defense-in-depth protocols protecting your transaction data in flight, in memory, and at rest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-5 rounded-xl bg-[#F7F9FC] border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">Transport Security (TLS 1.3 & mTLS)</div>
                <p className="text-slate-600 leading-relaxed">
                  All API traffic is strictly encrypted with TLS 1.3 using modern ephemeral cipher suites. Mutual TLS (mTLS) is enforced for all pre-settlement decision callbacks to guarantee non-repudiation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F7F9FC] border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">Isolated Tenant Shards</div>
                <p className="text-slate-600 leading-relaxed">
                  Every institution's in-memory property graph runs within a mathematically isolated namespace. Encryption keys are client-managed, preventing any cross-tenant data leakage or commingling.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F7F9FC] border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">SOC 2 Type II & Continuous Audit</div>
                <p className="text-slate-600 leading-relaxed">
                  Our infrastructure undergoes continuous automated vulnerability scanning, quarterly third-party penetration testing, and annual SOC 2 Type II attestation covering Security and Confidentiality criteria.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F7F9FC] border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900">Zero Local Secrets</div>
                <p className="text-slate-600 leading-relaxed">
                  All cluster credentials and authentication keys rotate automatically using ephemeral hardware security modules (HSM) with strict zero-trust role-based access control.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Policy */}
        {activeSection === 'privacy' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 serif-heading">
                Plain-Language Privacy Policy
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                We believe privacy is an engineering invariant, not a legal disclaimer.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>1. Data Minimization:</strong> Tridral only processes the minimal transaction metadata required to detect fraud anomalies. We do not require, collect, or store raw government national IDs, full credit card numbers, or physical mailing addresses.
              </p>
              <p>
                <strong>2. Zero Commercial Monetization:</strong> We do not sell, rent, or monetize your transaction data to advertisers, credit bureaus, or third-party data brokers. Your transaction graphs exist solely to protect your institution from fraud.
              </p>
              <p>
                <strong>3. Regulatory Rights Compliance:</strong> We fully support global data sovereignty, GDPR, and CCPA mandates. Individual customer erasure requests trigger immediate cryptographic revocation of entity salts, ensuring irrecoverable deletion across all memory indices.
              </p>
            </div>
          </div>
        )}

        {/* Responsible AI Approach */}
        {activeSection === 'ai' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 serif-heading">
                Responsible AI & Anti-Bias Framework
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Mathematical fairness, non-discriminatory inputs, and deterministic explainability.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Strict Topological Grounding:</strong> Tridral models evaluate network geometry—graph centrality, cycle presence, device sharing, and velocity bursts. Our models never ingest or train on demographic, ethnic, gender, marital, or protected geographic attributes.
              </p>
              <p>
                <strong>SHAP Factor Traceability:</strong> No decision is an unexplainable "black box." Every probability score is accompanied by quantitative factor weights indicating exactly what topological evidence drove the decision.
              </p>
              <p>
                <strong>Human-in-the-Loop Governance:</strong> Tridral provides recommendations (ALLOW, HOLD, BLOCK), but ultimate enforcement policies, risk thresholds, and override authority remain entirely under your risk team's control.
              </p>
            </div>
          </div>
        )}

        {/* Data Handling & Retention */}
        {activeSection === 'retention' && (
          <div className="space-y-8 animate-fade-in">
            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 serif-heading">
                Data Handling & Retention Lifecycle
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Configurable time-to-live policies and cryptographic hygiene.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Ephemeral Edge Lifecycles:</strong> High-velocity micro-edges (such as sub-minute ping bursts) decay automatically within 60 to 180 seconds. Long-term trust edges retain only normalized statistical weights.
              </p>
              <p>
                <strong>Customer-Configured Retention:</strong> Clients determine audit log retention periods (e.g. 90 days, 1 year, 7 years) to match their regional banking and AML compliance requirements.
              </p>
              <p>
                <strong>Encrypted Cold Backups:</strong> Inactive historical logs are encrypted with AES-256-GCM and stored across air-gapped immutable storage buckets for audit disaster recovery.
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Need a completed vendor security assessment questionnaire (SIG / CAIQ)?
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0B0F1A] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <span>Request Security Assessment Package</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
