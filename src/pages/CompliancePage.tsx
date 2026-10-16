import React from 'react';
import { PageId } from '../types.ts';
import { ShieldCheck, FileCheck, Scale, Lock, ArrowRight, CheckCircle2, AlertOctagon } from 'lucide-react';

interface CompliancePageProps {
  onNavigate: (page: PageId) => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 text-xs font-semibold">
          Compliance & Regulatory Governance
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Built for Money Laundering Reporting Officers and Compliance Executives.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          In high-velocity banking, compliance failure is an existential business risk. Tridral gives AML/CFT officers the definitive topological proof needed to detect structuring, substantiate Suspicious Activity Reports (SARs), and satisfy regulatory audits without inflating operational headcount.
        </p>
      </div>

      {/* CCO Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Structuring & Smurfing Defense</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Criminal syndicates systematically break large transfers into small transactions right below the statutory $10,000 threshold. Tridral automatically aggregates multi-account smurfing topologies across your entire institution.
          </p>
          <div className="pt-2 text-xs text-emerald-800 font-semibold">
            Automated cluster aggregation in &lt; 40ms
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2F5FFF] flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Audit-Ready SAR Packages</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Eliminate hours of manual investigator data gathering. Every flagged transaction automatically generates a plain-language narrative, node connection map, and cryptographic timestamp ready for regulatory submission.
          </p>
          <div className="pt-2 text-xs text-[#2F5FFF] font-semibold">
            One-click SAR dossier export
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#2DD4BF] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Unmasked PII Ingestion</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Satisfy strict GDPR, CCPA, and banking privacy mandates. Customer records are tokenized with client-held encryption keys before entering our correlation engine, drastically reducing audit perimeter scope.
          </p>
          <div className="pt-2 text-xs text-slate-600 font-semibold">
            No plaintext tax IDs or card PANs stored
          </div>
        </div>
      </div>

      {/* Deep Technical Compliance Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="bg-[#0B0F1A] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white serif-heading">
              Regulatory Mandate Alignment Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How Tridral directly satisfies global financial supervisory requirements.
            </p>
          </div>
          <span className="text-xs mono-data bg-slate-800 text-[#2DD4BF] px-2.5 py-1 rounded-md">
            Audit Checklist 2026
          </span>
        </div>

        <div className="divide-y divide-slate-200 text-xs sm:text-sm">
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-4 font-bold text-slate-900">
              FATF Recommendation 16 (Wire Transfer Rule)
            </div>
            <div className="md:col-span-8 text-slate-600 space-y-2">
              <p>
                Tridral enforces cross-border ordering and beneficiary transparency. When funds traverse intermediary accounts, multi-hop edge tracing retains the ultimate originator and beneficiary relationship chain.
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Compliant with Travel Rule originator/beneficiary attribution</span>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-4 font-bold text-slate-900">
              Suspicious Activity Report (SAR / STR) Filings
            </div>
            <div className="md:col-span-8 text-slate-600 space-y-2">
              <p>
                Regulators reject vague algorithmic flags. Tridral provides deterministic SHAP value breakdowns showing exactly why an alert fired (e.g. "Velocity burst 14x baseline; 3 accounts linked to 1 hardware element; fund aggregation within 40 seconds").
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Plain-language evidentiary narrative included with every decision</span>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-4 font-bold text-slate-900">
              Model Risk Governance (SR 11-7 / OCC 2011-12)
            </div>
            <div className="md:col-span-8 text-slate-600 space-y-2">
              <p>
                Our graph neural architectures undergo rigorous third-party conceptual soundness testing and validation. We avoid black-box generative hallucination in favor of deterministic topological edge inference.
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Exhaustive model validation packages and bias documentation available</span>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-4 font-bold text-slate-900">
              Data Sovereignty & Right to Erasure
            </div>
            <div className="md:col-span-8 text-slate-600 space-y-2">
              <p>
                Under GDPR and global privacy frameworks, customers can request cryptographic deletion. Tridral supports instant revocation of salt keys, rendering all associated graph entity records cryptographically inaccessible.
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cryptographic zero-trace erasure on demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Officer Pilot Invitation */}
      <div className="bg-[#0B0F1A] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold serif-heading text-white">
            Need our compliance whitepaper or SOC 2 documentation?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            We provide full audit artifacts, model cards, and security questionnaires directly under mutual NDA.
          </p>
        </div>
        <button
          onClick={() => onNavigate('quote')}
          className="px-5 py-3 text-xs font-semibold text-[#0B0F1A] bg-[#2DD4BF] hover:bg-[#5eead4] rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Request Compliance Dossier
        </button>
      </div>
    </div>
  );
};
