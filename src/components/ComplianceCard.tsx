import React, { useEffect, useState } from 'react';
import { SAMPLE_MATRIX_ROWS, SAMPLE_TOP_GAPS } from '../data/sampleMatrix.ts';
import { ComplianceStatus, SampleRequirementRow } from '../types.ts';

interface ComplianceCardProps {
  onViewFullReport?: () => void;
}

const TARGET_RISK_SCORE = 38;

function getStatusClasses(status: ComplianceStatus): {
  pill: string;
  dot: string;
} {
  switch (status) {
    case 'Addressed':
      return {
        pill: 'bg-[#D7F5E5] text-[#0B7A4B]',
        dot: 'bg-[#0B7A4B]',
      };
    case 'Partial':
      return {
        pill: 'bg-[#FFF0CC] text-[#8A5A00]',
        dot: 'bg-[#8A5A00]',
      };
    case 'Missing':
      return {
        pill: 'bg-[#FFE0DC] text-[#B42318]',
        dot: 'bg-[#B42318]',
      };
  }
}

export const ComplianceCard: React.FC<ComplianceCardProps> = ({ onViewFullReport }) => {
  const [selectedRow, setSelectedRow] = useState<SampleRequirementRow>(SAMPLE_MATRIX_ROWS[0]);
  const [displayScore, setDisplayScore] = useState<number>(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayScore(TARGET_RISK_SCORE);
      return;
    }

    let rafId: number;
    const duration = 900;
    const delay = 400;
    const startTimeout = window.setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        setDisplayScore(Math.round(eased * TARGET_RISK_SCORE));
        if (elapsed < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div
      className="bg-white rounded-[28px] border border-white/80 overflow-hidden text-[var(--ink)]"
      style={{ boxShadow: 'var(--shadow-hero)' }}
      aria-label="Sample RFP compliance check card"
    >
      {/* Card Header */}
      <div className="px-5 sm:px-6 py-4 bg-white flex items-center justify-between gap-3 border-b border-[#EAEEFA]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-sm font-semibold text-[var(--ink)] truncate">
            Sample RFP · Compliance check
          </span>
        </div>
        <span className="shrink-0 px-3 py-1 rounded-full border border-[#D4DCF3] bg-white text-[12px] font-medium text-[var(--text)] mono-data">
          Sample data
        </span>
      </div>

      {/* Matrix Table + Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-8 divide-y divide-[#F0F3FC] border-b md:border-b-0 md:border-r border-[#EAEEFA]">
          <div className="px-5 py-2.5 bg-[#F8FAFF] grid grid-cols-12 gap-2 text-[12px] font-semibold text-[var(--muted)]">
            <div className="col-span-6">Requirement</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-3 text-right">Reference</div>
          </div>

          {SAMPLE_MATRIX_ROWS.map((row, idx) => {
            const isSelected = selectedRow.id === row.id;
            const styles = getStatusClasses(row.status);

            return (
              <button
                key={row.id}
                type="button"
                onMouseEnter={() => setSelectedRow(row)}
                onFocus={() => setSelectedRow(row)}
                onClick={() => setSelectedRow(row)}
                style={{ animationDelay: `${idx * 65}ms` }}
                className={`w-full text-left px-5 py-3 grid grid-cols-12 gap-2 items-center transition-colors duration-200 cursor-pointer animate-row-slide focus-ring ${
                  isSelected
                    ? 'bg-[var(--blue-soft)]/55'
                    : 'bg-white hover:bg-[#F8FAFF]'
                }`}
              >
                <div className="col-span-6 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] mono-data text-[var(--muted)] shrink-0">
                      {row.id}
                    </span>
                    <span className="text-[13px] font-medium truncate text-[var(--ink)]">
                      {row.requirement}
                    </span>
                  </div>
                </div>

                <div className="col-span-3">
                  <span
                    style={{ animationDelay: `${220 + idx * 65}ms` }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold animate-chip-pop whitespace-nowrap ${styles.pill}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
                    <span>{row.status}</span>
                  </span>
                </div>

                <div className="col-span-3 text-right">
                  <span
                    className={`text-[11px] mono-data block truncate ${
                      row.status === 'Missing'
                        ? 'text-[#B42318] font-medium'
                        : 'text-[var(--text)]'
                    }`}
                  >
                    {row.reference}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-4 bg-[#F8FAFF] p-5 flex flex-col justify-between gap-4">
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  fill="none"
                  stroke="#E1E7F8"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  fill="none"
                  stroke="#1A56F0"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-[stroke-dashoffset] duration-300 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-[var(--ink)] mono-data leading-none">
                  {displayScore}
                </span>
                <span className="text-[10px] text-[var(--muted)] mono-data mt-0.5">/ 100</span>
              </div>
            </div>

            <div className="text-left">
              <div className="text-sm font-semibold text-[var(--ink)]">
                Sample risk score
              </div>
              <p className="text-[12px] text-[var(--text)] leading-snug mt-0.5">
                Illustrative gap exposure based on mandatory items missing.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-[#E6ECFA]">
            <div className="text-[12px] font-semibold text-[var(--ink)]">
              Top gaps
            </div>
            <ul className="space-y-2">
              {SAMPLE_TOP_GAPS.map((gap) => (
                <li
                  key={gap.id}
                  className="text-[12px] leading-snug text-[var(--text)]"
                >
                  <span className="font-semibold text-[var(--ink)] block">{gap.title}</span>
                  <span className="text-[11px] text-[var(--muted)] block">{gap.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row Detail Bar */}
      <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-[#EAEEFA] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="text-[13px] text-[var(--ink)] min-w-0">
          {selectedRow.evidenceDetail ? (
            <span>{selectedRow.evidenceDetail}</span>
          ) : (
            <span className="mono-data text-[var(--text)]">
              {selectedRow.reference}
            </span>
          )}
        </div>

        {onViewFullReport && (
          <a
            href="/sample-report"
            onClick={(e) => {
              e.preventDefault();
              onViewFullReport();
            }}
            className="shrink-0 text-[13px] font-semibold text-[var(--blue)] hover:underline cursor-pointer self-start sm:self-center whitespace-nowrap focus-ring rounded-full px-1"
          >
            Sample report →
          </a>
        )}
      </div>
    </div>
  );
};
