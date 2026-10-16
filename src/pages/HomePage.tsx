import React from 'react';
import { PageId } from '../types.ts';
import { LiveFlagCard } from '../components/LiveFlagCard.tsx';
import { ArrowRight, ShieldCheck, Zap, GitFork, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left: Direct, confident proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 border border-[#2F5FFF]/20 text-[#2F5FFF] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5FFF]" />
              <span>Pre-Settlement Transaction Graph Defense</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0B0F1A] serif-heading leading-[1.12]">
              Stop coordinated fraud before transactions settle.
            </h1>

            <p className="text-lg sm:text-xl text-[#5B6472] max-w-2xl leading-relaxed">
              Tridral connects to your transaction pipeline via API. Our multi-hop graph engine correlates accounts, devices, and behavior patterns to halt mule networks, synthetic IDs, and account takeover in under 50 milliseconds.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Request Early Access Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('architecture')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Inspect Technical Architecture</span>
              </button>
            </div>

            {/* Micro verification strip */}
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-900 block mono-data text-sm">&lt; 48ms</span>
                <span className="text-slate-500">p99 Decision Latency</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mono-data text-sm">Zero</span>
                <span className="text-slate-500">Core System Overhaul</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mono-data text-sm">Sub-second</span>
                <span className="text-slate-500">Mule Ring Intercept</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Live Flag Card Mockup */}
          <div className="lg:col-span-5 relative">
            <LiveFlagCard interactive={true} />
            <div className="mt-3 text-center text-xs text-slate-400">
              Interactive console preview · Click flagged nodes and toggle action state
            </div>
          </div>
        </div>
      </section>

      {/* Capability Snapshot Strip: Detect / Correlate / Act */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B0F1A] rounded-2xl p-8 sm:p-10 text-white shadow-xl">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2DD4BF] mb-3">
            Core Mechanism
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal serif-heading mb-8">
            How Tridral intercepts coordinated fraud in real time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 01. Detect */}
            <div className="space-y-3 relative md:border-r border-slate-800 md:pr-6">
              <div className="text-xs font-bold text-[#2DD4BF] mono-data">01 / DETECT</div>
              <h3 className="text-lg font-bold text-white">Sub-50ms Ingestion</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect your card authorization, instant payment rail, or internal ledger stream. We ingest normalized transaction payloads with zero overhead on existing core banking databases.
              </p>
            </div>

            {/* 02. Correlate */}
            <div className="space-y-3 relative md:border-r border-slate-800 md:pr-6">
              <div className="text-xs font-bold text-[#2F5FFF] mono-data">02 / CORRELATE</div>
              <h3 className="text-lg font-bold text-white">Multi-Hop Entity Graphs</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transactions are not judged in isolation. Every event connects to a live graph of accounts, device fingerprints, phone hashes, and IP subnets to reveal rings flying under isolated thresholds.
              </p>
            </div>

            {/* 03. Act */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-emerald-400 mono-data">03 / ACT</div>
              <h3 className="text-lg font-bold text-white">Pre-Settlement Authority</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive deterministic risk scores and plain-language reasoning before funds leave your ledger. Your team decides whether to hold, block, or step up authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem: Why Static Rules Break */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
            The Structural Gap
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 serif-heading mt-2">
            Static rule trees look at single transactions. Fraud rings exploit the space between them.
          </h2>
          <p className="text-slate-600 mt-4 text-base leading-relaxed">
            Organized fraud syndicates know your limits. They split amounts under threshold triggers, circulate stolen funds through dozens of sleeper accounts, and rotate burner devices. Point-in-time checks cannot see this coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Coordinated Mule Networks</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Stolen funds are dispersed into 10–50 accounts simultaneously and immediately forwarded to crypto rails or instant withdrawal points. Static systems treat each transfer as an ordinary low-value transaction.
            </p>
            <div className="pt-2 text-xs text-rose-700 font-medium">
              Result: 100% loss post-settlement once the victim reports unauthorized debits.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Synthetic Identities at Scale</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Combinations of real and fabricated identifiers pass initial KYC checks. When bust-out occurs, traditional scorecards identify no single culprit because identity parameters are fractured across fake profiles.
            </p>
            <div className="pt-2 text-xs text-amber-700 font-medium">
              Result: Uncollectible credit write-offs misclassified as bad debt instead of fraud.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2F5FFF] flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Account Takeover via Session Clones</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Infostealer malware bypasses 2FA by capturing active session cookies. Fraudsters log in from residential proxy nodes, drain balances, and transfer funds through trusted payee links.
            </p>
            <div className="pt-2 text-xs text-blue-700 font-medium">
              Result: Immediate customer trust erosion and steep regulatory remediation penalties.
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delayed Post-Settlement Detection</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Most risk platforms flag fraud 2 to 48 hours after settlement during batch reconciliation. By then, funds are cleared, irreversibly withdrawn, and the recipient accounts abandoned.
            </p>
            <div className="pt-2 text-xs text-slate-700 font-medium">
              Result: Irrecoverable fund losses and severe network dispute assessment fees.
            </div>
          </div>
        </div>
      </section>

      {/* Built For / Audience Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200/80 pt-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF] mb-2">
            Target Infrastructure
          </div>
          <h2 className="text-3xl font-normal serif-heading text-slate-900 mb-8">
            Engineered for high-throughput payment architectures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-xl border border-slate-200/90 space-y-4">
              <div className="text-sm font-semibold text-[#2F5FFF]">Challenger & Digital Banks</div>
              <h3 className="text-lg font-bold text-slate-900">Instant Peer-to-Peer & Faster Clearing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Prevent internal accounts from turning into unwitting mule conduits. Evaluate sender-receiver graph clustering in under 40ms without adding friction to trusted account holders.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Sub-second account freeze automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Pre-clearing wire hold decisions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200/90 space-y-4">
              <div className="text-sm font-semibold text-[#2F5FFF]">Payment Processors & PSPs</div>
              <h3 className="text-lg font-bold text-slate-900">Merchant Gateway Fraud Protection</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Detect card testing syndicates and coordinated chargeback rings operating across thousands of your merchant accounts using shared fingerprint subgraphs.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Cross-merchant collusion interception</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Drastic reduction in Visa/Mastercard dispute ratios</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200/90 space-y-4">
              <div className="text-sm font-semibold text-[#2F5FFF]">Fintech Lenders & Wallets</div>
              <h3 className="text-lg font-bold text-slate-900">Onboarding & Disbursement Defense</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Block synthetic identity clusters before first loan drawdown. Verify that new applicant credentials do not trace back to previous default networks or shared hardware hashes.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Synthetic identity graph mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>Pre-disbursement risk arbitration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Case Evidence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F9FC] border border-slate-200/80 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
                Benchmarked Performance
              </div>
              <h2 className="text-3xl font-normal serif-heading text-slate-900">
                Measured in milliseconds, verified by compliance.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evaluated against real transaction volumes across high-throughput payment corridors. Tridral delivers high detection accuracy without degrading latency SLAs.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('case-for-graph')}
                  className="text-xs font-semibold text-[#2F5FFF] hover:text-[#254ecc] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read technical paper: Graph Modeling vs. Static Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-3xl font-extrabold text-[#0B0F1A] mono-data">91.4%</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Mule Ring Intercept Rate</div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Coordinated multi-account funds transfers stopped before outbound clearing.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-3xl font-extrabold text-[#2F5FFF] mono-data">32 ms</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Average Response Latency</div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Full 4-hop entity resolution and inference executed under standard clearing thresholds.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-3xl font-extrabold text-emerald-600 mono-data">-74%</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">False Positive Reduction</div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Replaces arbitrary rigid amount filters with topological behavioral context.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-3xl font-extrabold text-[#0B0F1A] mono-data">100%</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Explainable Reasoning</div>
                <p className="text-slate-500 text-[11px] mt-1">
                  Every hold or block accompanied by plain-language graph path evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-linear-to-b from-white to-[#F7F9FC] border border-slate-200/90 rounded-2xl p-10 sm:p-16 space-y-6 shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-normal serif-heading text-slate-900 max-w-xl mx-auto">
            Ready to test transaction-graph defense in your sandbox?
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            We run dark shadow pilots against your historical or staging data. No production routing changes required.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('quote')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Schedule Technical Discovery & Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('platform')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-base font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
            >
              <span>Explore Platform Capabilities</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
