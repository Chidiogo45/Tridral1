import React, { useState } from 'react';
import { Database, Network, Cpu, ShieldCheck, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

interface StageSpec {
  id: string;
  name: string;
  short: string;
  latency: string;
  icon: React.ComponentType<{ className?: string }>;
  techStack: string;
  description: string;
  throughput: string;
  details: string[];
}

const stages: StageSpec[] = [
  {
    id: 'ingestion',
    name: '01. API Ingestion & Normalization',
    short: 'Ingest',
    latency: '3.8 ms',
    icon: Database,
    techStack: 'gRPC / JSON-over-TLS / Kafka Stream',
    description: 'High-throughput stateless gateway ingesting raw transaction streams and converting heterogeneous payment payload schemas into normalized entity tuples.',
    throughput: '35,000 tx/sec per shard',
    details: [
      'Zero credential persistence: PII tokenized immediately at gateway',
      'Dual schema ingestion: REST webhook or asynchronous Kafka bus',
      'Sub-5ms edge TLS termination across 4 worldwide availability zones',
    ],
  },
  {
    id: 'correlation',
    name: '02. In-Memory Graph Correlation Engine',
    short: 'Correlate',
    latency: '14.2 ms',
    icon: Network,
    techStack: 'Distributed In-Memory Property Graph',
    description: 'Constructs dynamic multi-hop subgraphs connecting accounts, device hardware elements, IP subnets, biometric entropy, and historical beneficiary paths.',
    throughput: 'Sub-millisecond 4-hop traversal',
    details: [
      'Instant entity resolution across email hashes, phone ranges, and device hashes',
      'Dynamic edge aging: weights decay over time to prioritize fresh velocity bursts',
      'Cyclic graph ring detection catches funds bouncing through mule accounts',
    ],
  },
  {
    id: 'inference',
    name: '03. Graph Neural Network Inference',
    short: 'Model',
    latency: '16.5 ms',
    icon: Cpu,
    techStack: 'TensorRT Graph Neural Net (GNN) + LightGBM',
    description: 'Combines structural graph embeddings with tabular transaction feature vectors to detect non-obvious topological anomalies.',
    throughput: 'Sub-20ms batch inference',
    details: [
      'GNN inductive embeddings capture unseen fraud ring topologies',
      'Trained exclusively on topological patterns—no demographic or protected biases',
      'Simultaneous scoring for Account Takeover, Synthetic ID, and Mule velocity',
    ],
  },
  {
    id: 'scoring',
    name: '04. Calibrated Risk & Explainability Engine',
    short: 'Score',
    latency: '4.1 ms',
    icon: ShieldCheck,
    techStack: 'SHAP Feature Explainer & Policy Ruleset',
    description: 'Generates a normalized 0.00-1.00 risk probability paired with human-readable explanatory factors for compliance officers and fraud investigators.',
    throughput: 'Deterministic zero-lag evaluation',
    details: [
      'Top 3-5 contributing graph anomalies outputted in plain English',
      'Configurable risk thresholds for soft holds vs. immediate blocking',
      'Audit-ready SAR (Suspicious Activity Report) evidentiary trace export',
    ],
  },
  {
    id: 'decision',
    name: '05. Pre-Settlement Webhook Response',
    short: 'Dispatch',
    latency: '3.4 ms',
    icon: Zap,
    techStack: 'Low-latency HTTP/2 & mTLS Webhooks',
    description: 'Dispatches pre-settlement instruction (ALLOW, HOLD, BLOCK) directly to the customer payment orchestrator before ledger finality.',
    throughput: 'Sub-4ms dispatch',
    details: [
      'Total end-to-end pipeline latency strictly bounded under 48ms (p99)',
      'Configurable fallback fail-open / fail-closed modes during upstream network partitioned events',
      'Bi-directional ledger feedback loops update graph outcome states',
    ],
  },
];

export const ArchitectureFlow: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('correlation');

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[1];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Top Header */}
      <div className="bg-[#0B0F1A] px-6 py-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#2DD4BF] text-[#0B0F1A] mono-data">
              END-TO-END LATENCY &lt; 48ms
            </span>
            <span className="text-xs text-slate-400">Stream Processing Pipeline</span>
          </div>
          <h3 className="text-xl font-bold mt-1 text-white">
            Pre-Settlement Interception Topology
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs mono-data text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ingestion SLA: 99.995%</span>
          </div>
          <div className="hidden sm:block text-slate-600">|</div>
          <div className="hidden sm:block text-slate-400">
            p99: 42.0ms
          </div>
        </div>
      </div>

      {/* Animated Pipeline Stage Strip */}
      <div className="p-6 bg-[#F7F9FC] border-b border-slate-200">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Pipeline Stages (Click any stage to inspect technical internals)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {stages.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="relative">
                <button
                  onClick={() => setActiveStageId(stage.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative z-10 ${
                    isActive
                      ? 'bg-white border-[#2F5FFF] shadow-md ring-2 ring-[#2F5FFF]/15'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive ? 'bg-[#2F5FFF] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] mono-data font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                      {stage.latency}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {stage.short}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    {stage.techStack.split('/')[0]}
                  </div>
                </button>

                {/* Animated connector chevron for desktop */}
                {idx < stages.length - 1 && (
                  <div className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-[#2DD4BF] text-[#0B0F1A] items-center justify-center text-[10px] shadow-2xs">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Animated Moving Packet SVG Ribbon */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 hidden sm:block">
          <div className="flex items-center justify-between text-[11px] mono-data text-slate-400 mb-1.5">
            <span>LIVE TRANSACTION PACKET FLOW</span>
            <span className="text-[#2F5FFF]">Continuous Pre-Settlement Intercept</span>
          </div>
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 800 30">
            <line
              x1="20"
              y1="15"
              x2="780"
              y2="15"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Animated dotted packets */}
            <line
              x1="20"
              y1="15"
              x2="780"
              y2="15"
              stroke="#2F5FFF"
              strokeWidth="2.5"
              className="animated-dash"
            />

            {/* Packets */}
            <circle cx="100" cy="15" r="5" fill="#2DD4BF" className="radar-ring" />
            <circle cx="100" cy="15" r="4" fill="#2DD4BF" />
            <circle cx="280" cy="15" r="4" fill="#2F5FFF" />
            <circle cx="460" cy="15" r="4" fill="#F59E0B" />
            <circle cx="640" cy="15" r="4" fill="#10B981" />
          </svg>
        </div>
      </div>

      {/* Selected Stage Deep-Dive Specification */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-[#2F5FFF] border border-blue-100">
                Active Inspection
              </span>
              <span className="text-xs mono-data text-slate-400">
                Target Budget: {activeStage.latency}
              </span>
            </div>

            <h4 className="text-xl font-bold text-slate-900 serif-heading">
              {activeStage.name}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeStage.description}
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Implementation Invariants:
              </div>
              <ul className="space-y-2">
                {activeStage.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
              Technical Runtime Specs
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Engine & Stack</span>
                <span className="font-semibold text-slate-800 mono-data mt-0.5 block">
                  {activeStage.techStack}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Throughput Benchmark</span>
                <span className="font-semibold text-slate-800 mono-data mt-0.5 block">
                  {activeStage.throughput}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Failover Strategy</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  Zero-downtime hot standby cluster with sub-50ms heartbeat failover
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Security Boundary</span>
              <span className="mono-data font-semibold text-slate-700">AES-256 / TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
