import React, { useState } from 'react';
import { ARLINEX_SAMPLE_PROJECT, ARLINEX_SAMPLE_REQUIREMENTS } from '../data/arlinexSample.ts';
import { ComplianceStatus } from '../types.ts';

const HERO_ROWS = ARLINEX_SAMPLE_REQUIREMENTS.slice(0, 4);

function getStatusColor(status: ComplianceStatus): {
  text: string;
  dot: string;
} {
  switch (status) {
    case 'Addressed':
      return { text: 'text-[#0F766E]', dot: 'bg-[#18B8A6]' };
    case 'Partial':
      return { text: 'text-[#B45309]', dot: 'bg-[#D97706]' };
    case 'Missing':
      return { text: 'text-[#B91C1C]', dot: 'bg-[#DC2626]' };
  }
}

export const ArlinexHeroPreview: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(HERO_ROWS[0].id);
  const activeRow = HERO_ROWS.find((r) => r.id === selectedId) ?? HERO_ROWS[0];

  const addressedPct = Math.round(
    (ARLINEX_SAMPLE_PROJECT.addressedCount / ARLINEX_SAMPLE_PROJECT.totalRequirements) * 100
  );

  return (
    <div
      className="relative rounded-2xl bg-white border border-white/15 overflow-hidden text-[#172337]"
      style={{ boxShadow: 'var(--shadow-dashboard)' }}
      aria-label="Arlinex illustrative compliance report preview"
    >
      {/* Window Header */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] font-bold text-[#101B2C] display-heading tracking-wide">
            ARLINEX
          </span>
          <span className="text-[#CBD5E1]" aria-hidden="true">
            /
          </span>
          <span className="text-[13px] font-medium text-[#64748B] truncate">
            Compliance Report
          </span>
        </div>
        <span className="text-[11px] font-medium text-[#64748B] mono-data whitespace-nowrap shrink-0">
          Illustrative sample
        </span>
      </div>

      {/* Summary Metrics Strip */}
      <div className="grid grid-cols-4 divide-x divide-[#E2E8F0] border-b border-[#E2E8F0] bg-white">
        <div className="px-3.5 py-3">
          <div className="text-[11px] text-[#64748B] truncate">Total</div>
          <div className="text-[18px] font-bold text-[#101B2C] tabular-nums mt-0.5">
            {ARLINEX_SAMPLE_PROJECT.totalRequirements}
          </div>
        </div>
        <div className="px-3.5 py-3">
          <div className="text-[11px] text-[#64748B] truncate">Addressed</div>
          <div className="text-[18px] font-bold text-[#0F766E] tabular-nums mt-0.5">
            {ARLINEX_SAMPLE_PROJECT.addressedCount}
          </div>
        </div>
        <div className="px-3.5 py-3">
          <div className="text-[11px] text-[#64748B] truncate">Partial</div>
          <div className="text-[18px] font-bold text-[#B45309] tabular-nums mt-0.5">
            {ARLINEX_SAMPLE_PROJECT.partialCount}
          </div>
        </div>
        <div className="px-3.5 py-3">
          <div className="text-[11px] text-[#64748B] truncate">Missing</div>
          <div className="text-[18px] font-bold text-[#B91C1C] tabular-nums mt-0.5">
            {ARLINEX_SAMPLE_PROJECT.missingCount}
          </div>
        </div>
      </div>

      {/* Coverage Progress Bar */}
      <div className="px-5 py-3 bg-[#F4F6FA] border-b border-[#E2E8F0] flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B] mb-1.5">
            <span>Coverage Summary ({ARLINEX_SAMPLE_PROJECT.solicitationCode})</span>
            <span className="tabular-nums text-[#101B2C] font-semibold">
              {addressedPct}% addressed
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden flex">
            <div className="h-full bg-[#18B8A6]" style={{ width: '61%' }} />
            <div className="h-full bg-[#F59E0B]" style={{ width: '22%' }} />
            <div className="h-full bg-[#EF4444]" style={{ width: '17%' }} />
          </div>
        </div>
      </div>

      {/* Interactive Rows */}
      <div className="divide-y divide-[#E2E8F0]">
        {HERO_ROWS.map((row) => {
          const active = row.id === activeRow.id;
          const colors = getStatusColor(row.status);

          return (
            <button
              key={row.id}
              type="button"
              onClick={() => setSelectedId(row.id)}
              onMouseEnter={() => setSelectedId(row.id)}
              className={`w-full text-left px-5 py-3 flex items-center justify-between gap-3 transition-colors cursor-pointer focus-ring ${
                active ? 'bg-[#EAF1FF]/70' : 'bg-white hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="min-w-0 flex items-center gap-2.5">
                <span className="text-[11px] mono-data text-[#64748B] shrink-0">
                  {row.id}
                </span>
                <span className="text-[13px] font-medium text-[#172337] truncate">
                  {row.title}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline text-[11px] mono-data text-[#64748B]">
                  {row.proposalReference}
                </span>
                <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${colors.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} aria-hidden="true" />
                  <span>{row.status}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Evidence Detail Bar */}
      <div className="px-5 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-1">
        <div className="flex items-center justify-between text-[11px] text-[#64748B] mono-data">
          <span>
            {activeRow.rfpReference} · {activeRow.proposalReference}
          </span>
          <span>{activeRow.section}</span>
        </div>
        <p className="text-[12.5px] text-[#172337] leading-snug line-clamp-2">
          {activeRow.evidenceQuote}
        </p>
      </div>
    </div>
  );
};
