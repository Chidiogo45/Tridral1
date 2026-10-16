import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { Plug, Network, FileSearch, ShieldAlert, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'Connect',
      subtitle: 'Plug into your existing pipeline via single API',
      icon: Plug,
      description:
        'Tridral deploys as an inline sidecar or asynchronous webhook stream. There is zero need to rewrite core ledger logic, replace banking engines, or migrate databases. Simply forward transaction authorization payloads over TLS 1.3.',
      codeExample: `{
  "transaction_id": "tx_89410294",
  "timestamp": "2026-10-16T12:00:00Z",
  "amount": 2400.00,
  "currency": "USD",
  "origin_account": "acc_user_4491",
  "destination_account": "acc_mule_8812",
  "device_fingerprint": "dev_fp_9042b781",
  "ip_address": "198.51.100.42",
  "payment_rail": "INSTANT_CLEARING"
}`,
      invariants: [
        'Single REST JSON or Kafka consumer integration',
        'PII tokenized client-side before submission',
        'Zero core banking system modifications required',
      ],
    },
    {
      num: '02',
      title: 'Correlate',
      subtitle: 'Every transaction mapped into a live entity graph',
      icon: Network,
      description:
        'The moment an authorization request hits the gateway, Tridral maps the event into a living property graph. We correlate sender accounts, recipient staging nodes, device hardware element hashes, IP subnets, and transaction velocity across time.',
      codeExample: `// Graph Engine Traversal Result
{
  "graph_depth_hops": 3,
  "nodes_traversed": 18,
  "identified_clusters": [
    {
      "cluster_type": "MULE_FAN_IN_BURST",
      "shared_device_id": "dev_fp_9042b781",
      "associated_accounts_count": 3,
      "aggregate_velocity_window": "40s"
    }
  ],
  "traversal_time_ms": 14.2
}`,
      invariants: [
        'Multi-hop topological resolution up to 4 degrees',
        'Continuous dynamic edge decay and weight recalculation',
        'Detects sleeper accounts activating in synchrony',
      ],
    },
    {
      num: '03',
      title: 'Explain',
      subtitle: 'Plain-language reasons with confidence and evidence',
      icon: FileSearch,
      description:
        'No opaque black boxes. Every flag is outputted with deterministic risk probability and a plain-language explanation detailing the specific anomalous path: pattern typology, confidence level, and affected accounts.',
      codeExample: `// Interception Evidence Package
{
  "decision": "HOLD_FOR_REVIEW",
  "risk_score": 0.984,
  "confidence_percentage": 98.4,
  "reason_plain": "3 newly active accounts routing funds to single recipient via shared iPhone hardware fingerprint within 40 seconds.",
  "typology": "COORDINATED_MULE_NETWORK",
  "recommended_action": "STEP_UP_BIOMETRIC_OR_MANUAL_HOLD",
  "sar_export_ready": true
}`,
      invariants: [
        'Deterministic SHAP feature contribution ranking',
        'Human-readable explanation for compliance and operations',
        'Ready for one-click Suspicious Activity Report (SAR) filing',
      ],
    },
    {
      num: '04',
      title: 'Act',
      subtitle: 'Real-time pre-settlement intervention',
      icon: ShieldAlert,
      description:
        'Before your payment rail commits ledger finality, Tridral returns an actionable webhook instruction. You retain full decision governance: automatically hold suspicious wires, prompt step-up MFA, or block outright.',
      codeExample: `// Webhook Response Dispatch (Total Latency: 31ms)
HTTP/2 200 OK
Content-Type: application/json

{
  "transaction_id": "tx_89410294",
  "action": "HOLD",
  "settlement_permitted": false,
  "release_token": "rel_sec_0912f718",
  "latency_breakdown": {
    "ingestion_ms": 3.8,
    "graph_ms": 14.2,
    "gnn_ms": 11.5,
    "total_ms": 29.5
  }
}`,
      invariants: [
        'Intervention delivered prior to payment clearing',
        'Customer maintains 100% policy autonomy and rule overrides',
        'Zero impact on legitimate consumer pass-through rates',
      ],
    },
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
          Operating Protocol
        </span>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Four stages. Under 50 milliseconds. Total control.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          From the instant a transaction payload is transmitted to the final pre-settlement decision webhook, Tridral handles the correlation burden while leaving ultimate decision authority in your hands.
        </p>
      </div>

      {/* Step Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-slate-200 pb-4">
        {steps.map((st, idx) => {
          const isActive = activeStep === idx + 1;
          const Icon = st.icon;
          return (
            <button
              key={st.num}
              onClick={() => setActiveStep(idx + 1)}
              className={`p-4 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-white border-2 border-[#2F5FFF] shadow-sm'
                  : 'bg-[#F7F9FC] border border-slate-200/80 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold mono-data ${isActive ? 'text-[#2F5FFF]' : 'text-slate-400'}`}>
                  {st.num}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2F5FFF]' : 'text-slate-400'}`} />
              </div>
              <div className="text-sm font-bold text-slate-900">{st.title}</div>
              <div className="text-xs text-slate-500 truncate mt-0.5">{st.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Step Content Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Deep explanation */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2F5FFF] mono-data uppercase">
            <span>Stage {current.num} / {steps.length}</span>
            <span>·</span>
            <span>{current.title}</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 serif-heading leading-snug">
            {current.subtitle}
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            {current.description}
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Guaranteed Invariants:
            </div>
            <ul className="space-y-2.5">
              {current.invariants.map((inv, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => setActiveStep((curr) => (curr < 4 ? curr + 1 : 1))}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0B0F1A] hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <span>{activeStep < 4 ? `Proceed to Step 0${activeStep + 1}` : 'Restart from Step 01'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('quote')}
              className="text-xs font-semibold text-[#2F5FFF] hover:underline cursor-pointer"
            >
              Request Integration Sandbox Access →
            </button>
          </div>
        </div>

        {/* Right: Code / Payload Card */}
        <div className="lg:col-span-6 bg-[#0B0F1A] rounded-2xl p-6 text-slate-200 border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="mono-data text-slate-400">payload_spec_{current.title.toLowerCase()}.json</span>
            </div>
            <button
              onClick={() => handleCopy(current.codeExample)}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="text-xs mono-data leading-relaxed text-[#2DD4BF] overflow-x-auto p-2 bg-slate-950/60 rounded-lg max-h-[360px]">
            <code>{current.codeExample}</code>
          </pre>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Latency SLA: &lt; 48ms p99</span>
            <span className="mono-data text-slate-400">TLS 1.3 / mTLS Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};
