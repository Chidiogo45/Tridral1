import React from 'react';
import { PageId } from '../types.ts';
import { CheckCircle2, Activity, ArrowRight, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

interface StatusPageProps {
  onNavigate: (page: PageId) => void;
}

export const StatusPage: React.FC<StatusPageProps> = ({ onNavigate }) => {
  const components = [
    {
      name: 'Edge API Ingestion (US-East / EU-West / AP-East)',
      status: 'Operational',
      uptime: '99.998%',
      latency: '3.8 ms',
    },
    {
      name: 'In-Memory Graph Correlation Cluster',
      status: 'Operational',
      uptime: '99.995%',
      latency: '14.2 ms',
    },
    {
      name: 'TensorRT Graph Neural Inference',
      status: 'Operational',
      uptime: '99.992%',
      latency: '16.5 ms',
    },
    {
      name: 'Pre-Settlement Webhook Dispatcher',
      status: 'Operational',
      uptime: '99.999%',
      latency: '3.4 ms',
    },
    {
      name: 'Developer Sandbox & Replay Simulator',
      status: 'Operational',
      uptime: '99.980%',
      latency: '24.1 ms',
    },
  ];

  const days = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-800 text-xs font-semibold">
          Live Operational Telemetry
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          System Status & Health Benchmarks
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Real-time availability and performance metrics for the Tridral pre-settlement decision pipeline. Updated every 60 seconds.
        </p>
      </div>

      {/* Global Status Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-950">
              All Systems Operational
            </div>
            <div className="text-xs text-emerald-800">
              Zero active incidents reported across all production clusters.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs mono-data text-emerald-900 font-semibold">
          <span>90-Day Uptime: 99.992%</span>
          <span>·</span>
          <span>p99 Latency: 42.0ms</span>
        </div>
      </div>

      {/* 60-Day Visual Uptime Bars */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
          <span>Overall System Availability (Past 60 Days)</span>
          <span className="mono-data text-emerald-600 font-bold">100.0% Recorded Uptime</span>
        </div>
        <div className="grid grid-cols-60 gap-0.5 h-8 w-full bg-slate-50 p-1 rounded-lg">
          {days.map((d) => (
            <div
              key={d}
              className="h-full bg-emerald-500 rounded-2xs hover:bg-emerald-400 transition-colors"
              title={`Day ${60 - d}: 100% Operational`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mono-data">
          <span>60 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Component Status Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="bg-[#0B0F1A] px-6 py-4 text-white flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            Core Component Infrastructure
          </span>
          <span className="mono-data text-[#2DD4BF]">Updated &lt; 1m ago</span>
        </div>

        <div className="divide-y divide-slate-100">
          {components.map((c, idx) => (
            <div
              key={idx}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm hover:bg-slate-50/60 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">{c.name}</div>
                <div className="text-xs text-slate-400 mono-data">
                  p99 Latency: {c.latency}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right text-xs mono-data hidden sm:block">
                  <span className="text-slate-400">90d: </span>
                  <span className="font-semibold text-slate-700">{c.uptime}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident & Maintenance History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 serif-heading">
          Recent Maintenance & Incident History
        </h3>

        <div className="space-y-3">
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-xs sm:text-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                Scheduled In-Memory Cluster Memory Rebalancing (EU-West-1)
              </span>
              <span className="text-xs mono-data text-slate-400">Oct 12, 2026 · Completed</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Planned zero-downtime rolling partition update. Standby node failover executed in 8ms with zero dropped connections or latency degradation.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 text-xs sm:text-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">
                GNN Model weights hot-reload to version 4.2
              </span>
              <span className="text-xs mono-data text-slate-400">Sep 28, 2026 · Completed</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Atomic tensor swap across edge inference clusters. Verification tests confirmed 100% nominal operation.
            </p>
          </div>
        </div>
      </div>

      {/* Support Pilot Callout */}
      <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-slate-200 text-center space-y-3">
        <h3 className="text-lg font-bold text-slate-900 serif-heading">
          Need custom SLA guarantees or private dedicated tenant instances?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          We offer contractually backed 99.995% uptime agreements and private cloud VPC peering for tier-1 institutions.
        </p>
        <button
          onClick={() => onNavigate('quote')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F5FFF] hover:underline cursor-pointer"
        >
          <span>Discuss Dedicated Enterprise SLAs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
