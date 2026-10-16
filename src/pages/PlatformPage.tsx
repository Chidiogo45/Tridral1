import React from 'react';
import { PageId } from '../types.ts';
import { InteractiveGraphSandbox } from '../components/InteractiveGraphSandbox.tsx';
import { Network, Zap, ShieldAlert, Cpu, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface PlatformPageProps {
  onNavigate: (page: PageId) => void;
}

export const PlatformPage: React.FC<PlatformPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Platform Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          A real-time property graph engine built for pre-settlement finality.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Tridral replaces rigid, isolated threshold checks with continuous multi-hop topological graph intelligence. Every incoming transaction updates and traverses a live map of relationships to stop coordinated attacks as they happen.
        </p>
      </div>

      {/* Interactive Graph Engine Sandbox (Hero interactive piece) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 serif-heading">
              Interactive Anomaly Simulator
            </h2>
            <p className="text-sm text-slate-500">
              Select an attack pattern below to see how Tridral traverses entity edges and halts transactions in real time.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Click nodes to inspect attributes
          </div>
        </div>

        <InteractiveGraphSandbox />
      </section>

      {/* Core Mechanism: Graph Modeling vs. Static Rules */}
      <section className="border-t border-slate-200/80 pt-16 space-y-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
            Paradigm Shift
          </span>
          <h2 className="text-3xl font-normal text-slate-900 serif-heading mt-2">
            Static Rules vs. Transaction-Graph Modeling
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
            Rule-based engines evaluate individual rows in a relational database. Graph engines evaluate the multidimensional fabric linking transactions together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy Static Rules Column */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="text-base font-bold text-slate-700">
                Legacy Rule-Based Engines
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
                Point-in-Time Blindness
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Isolated evaluations</span>
                  Transactions evaluated only on immediate attributes: amount, country, merchant category.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Easily skirted thresholds</span>
                  Fraudsters test and split transactions right below $500 or $1,000 alert rules.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">High false-positive rate</span>
                  Legitimate users blocked for unusual holiday spend or business travel transactions.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Fragile rule sprawl</span>
                  Teams accumulate thousands of overlapping, contradictory rules impossible to maintain.
                </div>
              </li>
            </ul>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-500">
              <code>
                IF amount &gt; 5000 AND user.country != tx.country<br />
                THEN flag_transaction() // Evaded by $4,900 domestic mule hops
              </code>
            </div>
          </div>

          {/* Tridral Graph Engine Column */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#2F5FFF]/20 shadow-md space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="text-base font-bold text-[#0B0F1A]">
                Tridral Graph Neural Engine
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                Multi-Hop Topological Vision
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Multi-hop relationship context</span>
                  Evaluates 4 hops of history: sender, device hashes, shared IP blocks, and destination clusters.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Catches sub-threshold dispersal</span>
                  Small split transfers ($400 × 12 accounts) immediately trigger fan-in cluster alerts.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">74% fewer false positives</span>
                  Trusted graph paths allow high-value legitimate payments through instantly without friction.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Self-updating topological models</span>
                  Continuous edge weight adjustment without writing or debugging hundreds of manual rules.
                </div>
              </li>
            </ul>

            <div className="bg-slate-900 p-4 rounded-xl text-xs font-mono text-[#2DD4BF]">
              <code>
                MATCH (u:Account)-[t:TRANSFERRED*1..3]-&gt;(m:MuleCluster)<br />
                WHERE centrality(m) &gt; 0.85 AND velocity_burst &gt; 12x<br />
                INTERCEPT PRE_SETTLEMENT // Stops coordinated ring in 28ms
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Latency & Streaming Spec */}
      <section className="bg-[#0B0F1A] rounded-2xl p-8 sm:p-12 text-white space-y-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2DD4BF]">
            Infrastructure Invariants
          </div>
          <h2 className="text-3xl font-normal serif-heading mt-2">
            The sub-50ms pre-settlement contract
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Payment networks operate on uncompromising time budgets. If a fraud check takes 300 milliseconds, it forces digital banks to approve blind or risk transaction timeouts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          <div className="space-y-2">
            <div className="text-3xl font-bold mono-data text-white">48 ms</div>
            <div className="text-sm font-semibold text-[#2DD4BF]">Bounded p99 Latency</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every stage—ingestion, graph traversal, neural inference, and webhook callback—runs within a strict 48ms maximum ceiling.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold mono-data text-white">0 ms</div>
            <div className="text-sm font-semibold text-[#2DD4BF]">Ledger Finality Delay</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decisions arrive before payment rails finalize clearing. No expensive post-settlement clawbacks or card network arbitration.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold mono-data text-white">100%</div>
            <div className="text-sm font-semibold text-[#2DD4BF]">Stateless Edge Ingestion</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never require direct access to your primary SQL ledger or core database credentials. Ingestion is purely event-driven.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            Want to see how Tridral fits into your payment authorization flow?
          </div>
          <button
            onClick={() => onNavigate('architecture')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2DD4BF] hover:text-[#5eead4] transition-colors cursor-pointer"
          >
            <span>Review Full Architecture Specification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
