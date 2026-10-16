import React from 'react';
import { PageId } from '../types.ts';
import { ArrowRight, Terminal, Network, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Company Mission
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Built for the reality of modern payment networks.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          When transactions clear in milliseconds, post-settlement fraud detection is just expensive bookkeeping. Tridral was founded to bring graph intelligence to the point of authorization.
        </p>
      </div>

      {/* Founder Note / Genesis Section */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-md space-y-8 max-w-4xl">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-[#0B0F1A] text-white flex items-center justify-center font-bold text-sm">
            T
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Founder's Note</div>
            <div className="text-xs text-slate-500">Why Tridral Exists & Our Engineering Approach</div>
          </div>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Over the past decade, financial infrastructure underwent an irreversible transformation. Real-time settlement rails, digital-first banking apps, and automated onboarding collapsed transaction settlement times from business days into fractions of a second.
          </p>

          <p>
            Yet the systems designed to defend this infrastructure remained frozen in the 2000s. Most risk platforms still rely on static, linear SQL rules: <em>"If amount &gt; $5,000 and IP country != account country, flag for manual review."</em>
          </p>

          <p>
            Fraud rings didn't stop because of those rules; they adapted. They organized distributed networks of mule accounts, minted synthetic identities with matching hardware hashes, and engineered split-second velocity transfers that systematically fly beneath arbitrary limits. When static checks look at one transaction in isolation, they are blind to the coordinated fabric surrounding it.
          </p>

          <p>
            By the time traditional post-settlement batch jobs flag these accounts hours or days later, the stolen capital has been laundered through instant rails, withdrawn, and gone forever. Digital banks and payment processors are left footing staggering chargeback fees, regulatory remediation costs, and lost customer confidence.
          </p>

          <p className="font-semibold text-slate-900">
            We built Tridral on a single, non-negotiable principle: pre-settlement intervention through live transaction-graph modeling.
          </p>

          <p>
            Instead of storing flat rows, Tridral maps every account, device, payment token, and transaction edge into a high-performance in-memory graph. When an authorization payload arrives, our engine traverses multi-hop relationships in milliseconds—identifying coordinated mule clusters, synthetic identity rings, and session takeovers before money ever leaves your ledger.
          </p>

          <p>
            We don't believe in black-box magic, and we don't believe in replacing your entire core banking stack. We provide an enterprise-grade API with sub-50ms deterministic execution, transparent reasoning for compliance officers, and absolute respect for your customer privacy.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Tridral Engineering · Distributed Systems & Graph Intelligence
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F5FFF] hover:text-[#254ecc] cursor-pointer"
          >
            <span>Discuss your transaction architecture with our founders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Core Convictions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#F7F9FC] p-6 rounded-xl border border-slate-200/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2F5FFF] flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Pre-Settlement Is Everything</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Stopping a transaction before funds settle costs fractions of a cent. Recovering funds after settlement costs hundreds of dollars in legal, compliance, and dispute fees.
          </p>
        </div>

        <div className="bg-[#F7F9FC] p-6 rounded-xl border border-slate-200/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#2DD4BF] flex items-center justify-center">
            <Network className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Topology Beats Thresholds</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Smart attackers easily game single-point thresholds. They cannot fake the topological reality that 5 distinct accounts are funneling into 1 device within 40 seconds.
          </p>
        </div>

        <div className="bg-[#F7F9FC] p-6 rounded-xl border border-slate-200/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Explainable by Design</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If a risk officer cannot defend an action to a regulator or customer, the model is useless. Every Tridral flag is backed by a plain-language graph trace.
          </p>
        </div>
      </div>
    </div>
  );
};
