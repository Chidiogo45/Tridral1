import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, ChevronRight, PauseCircle } from 'lucide-react';

interface LiveFlagCardProps {
  className?: string;
  interactive?: boolean;
}

export const LiveFlagCard: React.FC<LiveFlagCardProps> = ({ className = '', interactive = true }) => {
  const [actionState, setActionState] = useState<'hold' | 'blocked' | 'released'>('hold');
  const [selectedNode, setSelectedNode] = useState<string>('node-flagged');
  const [stepVisible, setStepVisible] = useState({
    graph: false,
    alert: false,
    metrics: false,
    confidence: false,
  });

  useEffect(() => {
    // Sequential reveal animation
    const t1 = setTimeout(() => setStepVisible((s) => ({ ...s, graph: true })), 150);
    const t2 = setTimeout(() => setStepVisible((s) => ({ ...s, alert: true })), 400);
    const t3 = setTimeout(() => setStepVisible((s) => ({ ...s, metrics: true })), 650);
    const t4 = setTimeout(() => setStepVisible((s) => ({ ...s, confidence: true })), 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 ${className}`}
    >
      {/* Product Screen Chrome */}
      <div className="bg-[#0B0F1A] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
          </div>
          <span className="ml-2 text-xs font-medium text-slate-300 tracking-tight">
            Tridral Intercept · Live Decision Stream
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] mono-data text-slate-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>p99: 24ms</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Top Header: Decision Bar & Risk Badge */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 transition-opacity duration-500 ${
            stepVisible.alert ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              High Risk — Mule Network Pattern
            </span>
            <span className="text-xs text-slate-400 mono-data hidden sm:inline">
              TX #TRX-94821
            </span>
          </div>

          {/* Action button / State toggle */}
          <div className="flex items-center gap-1.5">
            {interactive ? (
              <button
                onClick={() =>
                  setActionState((curr) =>
                    curr === 'hold' ? 'blocked' : curr === 'blocked' ? 'released' : 'hold'
                  )
                }
                title="Click to toggle decision state"
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  actionState === 'hold'
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : actionState === 'blocked'
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {actionState === 'hold' && (
                  <>
                    <PauseCircle className="w-3 h-3" />
                    <span>Hold for Review</span>
                  </>
                )}
                {actionState === 'blocked' && (
                  <>
                    <ShieldAlert className="w-3 h-3" />
                    <span>Blocked Pre-Settlement</span>
                  </>
                )}
                {actionState === 'released' && (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Released to Settlement</span>
                  </>
                )}
              </button>
            ) : (
              <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                Hold for review
              </span>
            )}
          </div>
        </div>

        {/* Graph & Inspector Split */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#F7F9FC] rounded-xl p-4 border border-slate-200/80">
          {/* Visual Graph View (3-4 connected nodes) */}
          <div className="sm:col-span-7 relative h-48 w-full flex items-center justify-center">
            <svg
              viewBox="0 0 280 180"
              className={`w-full h-full transition-opacity duration-700 ${
                stepVisible.graph ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Connector Lines */}
              <line
                x1="140"
                y1="50"
                x2="60"
                y2="135"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="140"
                y1="50"
                x2="140"
                y2="135"
                stroke="#F59E0B"
                strokeWidth="2.5"
              />
              <line
                x1="140"
                y1="50"
                x2="220"
                y2="135"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="60"
                y1="135"
                x2="140"
                y2="135"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Node 1: Central Shared Device (D-9042) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedNode('node-device')}
              >
                <circle cx="140" cy="50" r="16" fill="#0B0F1A" stroke="#2DD4BF" strokeWidth="2.5" />
                <text
                  x="140"
                  y="54"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="600"
                  className="mono-data select-none"
                >
                  DEV
                </text>
                <text
                  x="140"
                  y="26"
                  textAnchor="middle"
                  fill="#5B6472"
                  fontSize="9.5"
                  fontWeight="500"
                  className="mono-data select-none"
                >
                  iOS 17.5 · ID:9042
                </text>
              </g>

              {/* Node 2: Account A (Primary originator) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedNode('node-acc-a')}
              >
                <circle cx="60" cy="135" r="14" fill="#2F5FFF" stroke="#FFFFFF" strokeWidth="2" />
                <text
                  x="60"
                  y="139"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="9"
                  fontWeight="600"
                  className="mono-data select-none"
                >
                  ACC 1
                </text>
                <text
                  x="60"
                  y="162"
                  textAnchor="middle"
                  fill="#5B6472"
                  fontSize="9"
                  className="mono-data select-none"
                >
                  $800
                </text>
              </g>

              {/* Node 3: Flagged Intercept Node (Account B - Rapid pooling) */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedNode('node-flagged')}
              >
                {/* Radar ring pulsing outward */}
                <circle
                  cx="140"
                  cy="135"
                  r="20"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  className="radar-ring"
                />
                <circle cx="140" cy="135" r="17" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
                <text
                  x="140"
                  y="139"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="9"
                  fontWeight="700"
                  className="mono-data select-none"
                >
                  FLAG
                </text>
                <text
                  x="140"
                  y="164"
                  textAnchor="middle"
                  fill="#DC2626"
                  fontSize="9.5"
                  fontWeight="600"
                  className="mono-data select-none"
                >
                  $2,400 (40s)
                </text>
              </g>

              {/* Node 4: Account C (Linked mule) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedNode('node-acc-c')}
              >
                <circle cx="220" cy="135" r="14" fill="#2F5FFF" stroke="#FFFFFF" strokeWidth="2" />
                <text
                  x="220"
                  y="139"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="9"
                  fontWeight="600"
                  className="mono-data select-none"
                >
                  ACC 3
                </text>
                <text
                  x="220"
                  y="162"
                  textAnchor="middle"
                  fill="#5B6472"
                  fontSize="9"
                  className="mono-data select-none"
                >
                  $800
                </text>
              </g>
            </svg>
          </div>

          {/* Node Inspector Callout */}
          <div className="sm:col-span-5 bg-white rounded-lg p-3.5 border border-slate-200/90 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 font-medium text-[11px] pb-1 border-b border-slate-100">
              <span>Selected Entity</span>
              <span className="mono-data text-slate-600">
                {selectedNode === 'node-flagged'
                  ? 'Target Node'
                  : selectedNode === 'node-device'
                  ? 'Hardware Cluster'
                  : 'Source Account'}
              </span>
            </div>
            {selectedNode === 'node-flagged' ? (
              <div className="space-y-1.5">
                <div className="font-semibold text-rose-700 flex items-center justify-between">
                  <span>Mule Target #A-8991</span>
                  <span className="mono-data text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded-sm">
                    Pre-Settlement Intercept
                  </span>
                </div>
                <p className="text-slate-600 leading-tight">
                  Third account opened within 4 hours, receiving rapid sequential deposits from distinct identities on identical iPhone hardware fingerprint.
                </p>
              </div>
            ) : selectedNode === 'node-device' ? (
              <div className="space-y-1.5">
                <div className="font-semibold text-slate-800">
                  Shared Device Fingerprint
                </div>
                <p className="text-slate-600 leading-tight">
                  Single Secure Enclave hash associated with 3 distinct KYC identities across 2 IP ranges.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="font-semibold text-slate-800">
                  Originating Account
                </div>
                <p className="text-slate-600 leading-tight">
                  Dormant account aged 62 days with zero outbound volume until instant $800 transfer burst.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Human-Readable Status Line & Metrics */}
        <div
          className={`space-y-3 transition-opacity duration-500 ${
            stepVisible.metrics ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>3 accounts linked to 1 device · $2,400 moved in 40 seconds</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
              <div className="text-slate-400 text-[11px]">Intervention Phase</div>
              <div className="font-semibold text-slate-800 mt-0.5">Pre-Settlement</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
              <div className="text-slate-400 text-[11px]">Graph Depth</div>
              <div className="font-semibold text-slate-800 mt-0.5">3 Hops Analyzed</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
              <div className="text-slate-400 text-[11px]">Velocity Ratio</div>
              <div className="font-semibold text-slate-800 mt-0.5 mono-data">14.8x Baseline</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
              <div className="text-slate-400 text-[11px]">Decision Latency</div>
              <div className="font-semibold text-slate-800 mt-0.5 mono-data">31 ms</div>
            </div>
          </div>
        </div>

        {/* Confidence Meter */}
        <div
          className={`pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-opacity duration-500 ${
            stepVisible.confidence ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-xs text-slate-500 shrink-0">Model Confidence:</div>
            <div className="w-full sm:w-44 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#2F5FFF] h-2 rounded-full transition-all duration-1000"
                style={{ width: '98.4%' }}
              />
            </div>
            <span className="text-xs font-bold text-slate-900 mono-data">98.4%</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
            <span>Graph Neural Network v4.2</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
