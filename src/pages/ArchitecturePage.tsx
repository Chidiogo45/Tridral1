import React from 'react';
import { PageId } from '../types.ts';
import { ArchitectureFlow } from '../components/ArchitectureFlow.tsx';
import { ShieldCheck, Cpu, HardDrive, Lock, Server, ArrowRight } from 'lucide-react';

interface ArchitecturePageProps {
  onNavigate: (page: PageId) => void;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          System Architecture & Internals
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          A distributed stream processing engine built for microsecond graph resolution.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Traditional graph databases are optimized for disk queries, not sub-50ms financial pipelines. Tridral was engineered from the ground up as an in-memory, append-only property graph paired with specialized TensorRT Graph Neural Net models.
        </p>
      </div>

      {/* Main Animated Pipeline Diagram */}
      <section className="space-y-4">
        <ArchitectureFlow />
      </section>

      {/* Engineering Deep-Dive Grid */}
      <section className="border-t border-slate-200/80 pt-16 space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
            Core Engineering Principles
          </span>
          <h2 className="text-3xl font-normal text-slate-900 serif-heading mt-2">
            Eliminating relational bottlenecks in fraud detection
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Why disk-based SQL joins fail under 20,000 transactions per second, and how Tridral achieves deterministic sub-50ms performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2F5FFF] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">In-Memory Lock-Free Sharding</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Entity graphs are partitioned across clustered memory nodes using consistent hashing on entity identifier tokens. Traversals up to 4 degrees execute with zero lock contention across concurrent workers.
            </p>
            <div className="pt-2 text-xs mono-data text-slate-500 border-t border-slate-100">
              Throughput: &gt; 35,000 tx/sec/shard
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#2DD4BF] flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Dynamic Temporal Edge Decay</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Old connections shouldn't pollute real-time velocity signals. Graph edges age using exponential temporal decay functions, prioritizing bursts in the last 60 seconds while preserving historic trust baselines.
            </p>
            <div className="pt-2 text-xs mono-data text-slate-500 border-t border-slate-100">
              Half-life window: 60s to 30 days
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Blind Cryptographic Hashing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tridral never requires raw names, full national tax IDs, or unmasked credit card numbers. All inputs are hashed with customer-owned HMAC secret salts prior to graph ingestion.
            </p>
            <div className="pt-2 text-xs mono-data text-slate-500 border-t border-slate-100">
              Zero raw PII stored in memory
            </div>
          </div>
        </div>
      </section>

      {/* High-Availability & Redundancy Contract */}
      <section className="bg-[#0B0F1A] rounded-2xl p-8 sm:p-12 text-white space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2DD4BF]">
              Resilience & Redundancy
            </div>
            <h2 className="text-3xl font-normal serif-heading text-white">
              Zero single point of failure. Configurable failover behavior.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Financial services cannot tolerate single-point outages. Tridral maintains active-active multi-region clustering with automatic leader election and upstream fallback modes.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#0B0F1A] bg-[#2DD4BF] hover:bg-[#5eead4] rounded-lg transition-colors cursor-pointer"
              >
                <span>Request Technical Architecture Whitepaper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <Server className="w-6 h-6 text-[#2F5FFF] mb-2" />
              <div className="text-sm font-bold text-white">Active-Active Replication</div>
              <p className="text-xs text-slate-400 mt-1">
                Sub-second state replication across multiple availability zones ensures zero data loss.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-sm font-bold text-white">Configurable Failover</div>
              <p className="text-xs text-slate-400 mt-1">
                Choose fail-open (prioritize checkout conversion) or fail-closed (prioritize risk lock) on network partitions.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold mono-data text-white">99.995%</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Target Ingestion Uptime</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Contractually backed SLA for tier-1 financial deployments.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold mono-data text-[#2DD4BF]">&lt; 10ms</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">Failover Switchover</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Instant standby traffic redirection without TCP connection dropping.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
