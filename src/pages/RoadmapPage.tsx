import React from 'react';
import { PageId } from '../types.ts';
import { CheckCircle2, Clock, Compass, ArrowRight } from 'lucide-react';

interface RoadmapPageProps {
  onNavigate: (page: PageId) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Product Evolution
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Engineering Roadmap: Transparent milestones for technical teams.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          We build openly and communicate release stages with rigorous engineering specificity. Here is where the Tridral transaction-graph platform stands today and where it is going next.
        </p>
      </div>

      {/* Three Horizons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Horizon 1: Current Platform (Functional Today) */}
        <div className="bg-white rounded-2xl p-7 border-2 border-emerald-500/30 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Functional Today
              </span>
              <span className="text-xs mono-data text-slate-400">v1.4 Core</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 serif-heading">
              Current Platform
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Production-ready infrastructure available in our active client pilot environments.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Sub-50ms REST & Kafka Ingestion</span>
                  Stateless edge gateway supporting up to 35,000 transactions per second per node.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">4-Hop In-Memory Graph Traversal</span>
                  Real-time entity resolution connecting accounts, device elements, and proxy subnets.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Mule Fan-In & Account Takeover Intercept</span>
                  Automated pre-settlement decision callbacks (ALLOW, HOLD, BLOCK).
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Deterministic SHAP Explanations</span>
                  Human-readable anomaly reasoning generated alongside every risk score.
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Deployed across multi-region active clusters.
          </div>
        </div>

        {/* Horizon 2: Ongoing Improvements (Near-Term) */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#2F5FFF] text-xs font-bold border border-blue-200">
                <Clock className="w-3.5 h-3.5 text-[#2F5FFF]" />
                Near-Term Work
              </span>
              <span className="text-xs mono-data text-slate-400">Q3–Q4 2026</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 serif-heading">
              Ongoing Improvements
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Features currently in sandbox benchmarking and scheduled for upcoming client releases.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FFF] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Cross-Institution Consortium Hashing</span>
                  Privacy-preserving zero-knowledge set intersection for cross-bank mule ring tracking.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FFF] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Automated SAR Dispute Compaction</span>
                  One-click generation of audit-ready compliance dossiers with visual graph traces.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FFF] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Adaptive Threshold Simulation UI</span>
                  Allow risk officers to backtest policy threshold modifications against 90 days of logs.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FFF] mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Custom Behavioral Edge Weighting</span>
                  Domain-specific weighting knobs for non-standard payment corridors.
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Available to pilot participants on canary branches.
          </div>
        </div>

        {/* Horizon 3: Product Direction (Where It's Headed) */}
        <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                Product Direction
              </span>
              <span className="text-xs mono-data text-slate-400">2027 Horizon</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 serif-heading">
              Long-Term Direction
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Research initiatives shaping the next generation of global pre-settlement defense.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Self-Supervised Zero-Day Typology Learning</span>
                  Unsupervised temporal graph contrastive models flagging entirely novel laundering patterns.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Native ISO 20022 Cross-Border Connectors</span>
                  Direct hooks for Swift and real-time payment corridors with enriched remittance data.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 block">Decentralized Clearing Intercept</span>
                  Native multi-chain graph inspection for crypto on-ramp and off-ramp settlement rails.
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Guided by direct design partner advisory council.
          </div>
        </div>
      </div>

      {/* Advisory Callout */}
      <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-slate-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 serif-heading">
          Shape our engineering roadmap as an early pilot partner
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Pilot participants receive direct Slack/Teams engineering channels, bi-weekly roadmap syncs with our core systems team, and early access to consortium graph models.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>Apply for Pilot Partnership</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
