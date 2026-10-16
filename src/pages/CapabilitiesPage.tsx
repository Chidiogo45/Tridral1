import React from 'react';
import { PageId } from '../types.ts';
import { ShieldAlert, Users, Network, Gauge, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CapabilitiesPageProps {
  onNavigate: (page: PageId) => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      id: 'mule-networks',
      title: 'Mule-Network & Coordinated Fraud Detection',
      icon: Network,
      color: 'border-amber-400 bg-amber-500/10 text-amber-600',
      tag: 'Coordinated Ring Defense',
      mechanism:
        'Mechanism: Real-time cyclical graph traversal detects multi-account fan-in/fan-out topologies, tracking shared secondary attributes (device hardware entropy, IP subnets, VoIP pools) across dormant accounts rapidly staging stolen capital.',
      breakdown: [
        'Discovers rapid micro-transfer aggregation into unverified cash-out wallets',
        'Identifies multi-hop fund cycling designed to obscure originating account identity',
        'Stops coordinated transfers prior to outbound clearing settlement',
      ],
      metrics: 'Intercepts 91.4% of coordinated mule rings within 35 seconds of activation',
    },
    {
      id: 'synthetic-identity',
      title: 'Synthetic Identity Detection',
      icon: Users,
      color: 'border-blue-400 bg-blue-500/10 text-[#2F5FFF]',
      tag: 'Onboarding & Application Defense',
      mechanism:
        'Mechanism: Graph clustering resolves overlapping entity fragments (recycled VoIP telephone ranges, synthetic SSN/tax ID prefixes, and collided device hardware fingerprints) across seemingly distinct applicant submissions.',
      breakdown: [
        'Identifies fabricated profiles created by combining real and fake identity fragments',
        'Detects credit bust-out preparations before initial overdraft or loan drawdown',
        'Flags repeated application bursts emanating from identical device clusters',
      ],
      metrics: 'Eliminates 88% of synthetic credit bust-out losses prior to funds release',
    },
    {
      id: 'account-takeover',
      title: 'Account Takeover Detection',
      icon: ShieldAlert,
      color: 'border-rose-400 bg-rose-500/10 text-rose-600',
      tag: 'Session & Credential Interception',
      mechanism:
        'Mechanism: Topological anomaly scoring correlates sudden velocity spikes with unfamiliar hardware fingerprints, residential proxy proxy-hops, and rapid payee modifications that break historical user behavioral baselines.',
      breakdown: [
        'Catches infostealer session-cookie hijacking that bypasses traditional 2FA',
        'Flags immediate beneficiary addition paired with high-velocity wire initiation',
        'Differentiates legitimate high-value client purchases from hostile account draining',
      ],
      metrics: 'Halts unauthorized account takeovers in sub-24ms without false alerting',
    },
    {
      id: 'risk-scoring',
      title: 'Real-Time Risk Scoring',
      icon: Gauge,
      color: 'border-teal-400 bg-teal-500/10 text-[#2DD4BF]',
      tag: 'Pre-Settlement Decisioning',
      mechanism:
        'Mechanism: Sub-50ms Graph Neural Network (GNN) embeddings fuse with gradient-boosted decision trees to compute a calibrated 0.00–1.00 risk probability paired with deterministic SHAP explanatory factor ranking.',
      breakdown: [
        'Delivers calibrated confidence score accompanied by plain-language reason strings',
        'Empowers compliance teams with ready-to-file Suspicious Activity Report (SAR) traces',
        'Configurable policy rulesets: trigger step-up auth, manual review hold, or immediate hard block',
      ],
      metrics: 'Delivers deterministic risk scores with &lt; 48ms p99 bounded response latency',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Core Capabilities
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Four focused detection engines. Proven mechanisms, not generic claims.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Pre-settlement fraud cannot be solved by vague AI promises. We focus exclusively on the four specific vectors where transaction graphs fundamentally outperform point-in-time relational checks.
        </p>
      </div>

      {/* 4 Core Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div
              key={cap.id}
              className="bg-white rounded-2xl p-7 sm:p-9 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${cap.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {cap.tag}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 serif-heading leading-snug">
                  {cap.title}
                </h2>

                {/* Explicit Mechanism Callout */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium">
                  {cap.mechanism}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Detection Highlights:
                  </div>
                  <ul className="space-y-2">
                    {cap.breakdown.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{cap.metrics}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sandbox CTA Strip */}
      <div className="bg-[#0B0F1A] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold serif-heading text-white">
            Want to see these four mechanisms in action?
          </h3>
          <p className="text-sm text-slate-400">
            Open our interactive graph sandbox on the Platform page or schedule a shadow pilot run against your synthetic data.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('platform')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-lg transition-colors cursor-pointer"
          >
            Launch Interactive Sandbox
          </button>
          <button
            onClick={() => onNavigate('quote')}
            className="px-5 py-2.5 text-xs font-semibold text-[#0B0F1A] bg-[#2DD4BF] hover:bg-[#5eead4] rounded-lg transition-colors cursor-pointer"
          >
            Request Pilot
          </button>
        </div>
      </div>
    </div>
  );
};
