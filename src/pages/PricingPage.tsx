import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { ArrowRight, CheckCircle2, Shield, Zap, Calculator } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(2500000); // 2.5M transactions default

  // Format volume label
  const formatVolume = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    return `${(val / 1000).toFixed(0)}K`;
  };

  // Estimate per-transaction cost range
  const getRateEstimate = (vol: number) => {
    if (vol < 500000) return { tier: 'Growth Fintech', rate: '$0.0032', sla: '99.95% Ingestion SLA' };
    if (vol < 5000000) return { tier: 'Scale-Up Banking', rate: '$0.0019', sla: '99.99% Ingestion SLA' };
    if (vol < 20000000) return { tier: 'High-Velocity PSP', rate: '$0.0009', sla: '99.995% Ingestion SLA' };
    return { tier: 'Global Infrastructure', rate: 'Custom Sub-Millicent', sla: 'Dedicated Sharded Cluster' };
  };

  const currentTier = getRateEstimate(monthlyVolume);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Transparent Model
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Priced strictly per transaction volume. Zero seat fees.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Fraud detection infrastructure should align with your business growth, not penalize your investigative team with restrictive user seat licenses or opaque contract minimums.
        </p>
      </div>

      {/* Interactive Volume Estimator */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
              <Calculator className="w-4 h-4" />
              <span>Interactive Volume Calculator</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 serif-heading mt-1">
              Estimate your monthly processing bracket
            </h2>
          </div>
          <div className="bg-[#0B0F1A] text-white px-5 py-2.5 rounded-xl text-center">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Target Profile</div>
            <div className="text-sm font-bold text-[#2DD4BF]">{currentTier.tier}</div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-slate-700">Estimated Monthly Transactions:</span>
            <span className="text-3xl font-extrabold text-[#2F5FFF] mono-data">
              {formatVolume(monthlyVolume)} <span className="text-sm text-slate-500 font-normal">tx/mo</span>
            </span>
          </div>

          <input
            type="range"
            min={100000}
            max={50000000}
            step={200000}
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2F5FFF]"
            aria-label="Monthly transaction volume slider"
          />

          <div className="flex justify-between text-xs text-slate-400 mono-data">
            <span>100K / mo</span>
            <span>10M / mo</span>
            <span>25M / mo</span>
            <span>50M+ / mo</span>
          </div>
        </div>

        {/* Dynamic Tier Specification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200/80 space-y-1">
            <div className="text-xs text-slate-500">Effective Unit Rate</div>
            <div className="text-2xl font-bold text-slate-900 mono-data">{currentTier.rate}</div>
            <div className="text-[11px] text-slate-500">Billed monthly on verified pre-settlement checks</div>
          </div>

          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200/80 space-y-1">
            <div className="text-xs text-slate-500">Service Level Agreement</div>
            <div className="text-2xl font-bold text-emerald-600 mono-data">sub-50ms</div>
            <div className="text-[11px] text-slate-500">{currentTier.sla}</div>
          </div>

          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-slate-200/80 space-y-1">
            <div className="text-xs text-slate-500">Seats & Access</div>
            <div className="text-2xl font-bold text-[#0B0F1A] mono-data">Unlimited</div>
            <div className="text-[11px] text-slate-500">Free analyst seats, SSO, and webhook endpoints</div>
          </div>
        </div>

        {/* Direct Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200">
          <div className="text-xs text-slate-600">
            All pilot contracts include a 30-day dark shadow run with guaranteed zero disruption to existing payment rails.
          </div>
          <button
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <span>Talk to Us / Request Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pricing Invariants & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Zap className="w-4 h-4 text-[#2DD4BF]" />
            <span>No Opaque Enterprise Lock-In</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Contracts scale strictly with your volume. If your volume drops during seasonal shifts, your bill adjusts downward proportionally.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Shield className="w-4 h-4 text-[#2F5FFF]" />
            <span>Zero Overage Penalties</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Spikes during promotional campaigns or flash events will never result in throttle-downs or punitively priced overage tiers.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Comprehensive Support Included</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every deployment tier includes dedicated engineering onboarding, Slack integration channel, and 24/7 incident response SLA.
          </p>
        </div>
      </div>
    </div>
  );
};
