import React, { useState } from 'react';
import { PageId, SampleRequirementRow } from '../types.ts';
import { SAMPLE_MATRIX_ROWS, SAMPLE_TOP_GAPS } from '../data/sampleMatrix.ts';
import { PageHeader } from '../components/PageHeader.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';
import { DownloadIcon } from '../components/Icons.tsx';

interface SampleReportPageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

type SampleTab = 'Requirements' | 'Proposal check' | 'Risk summary';

export const SampleReportPage: React.FC<SampleReportPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<SampleTab>('Proposal check');
  const [selectedRow, setSelectedRow] = useState<SampleRequirementRow>(SAMPLE_MATRIX_ROWS[0]);

  const handleDownloadSampleCsv = () => {
    const headers = ['ID', 'Requirement', 'Status', 'Reference'];
    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const rows = SAMPLE_MATRIX_ROWS.map((r) => [r.id, r.requirement, r.status, r.reference]);

    const csvString = [headers, ...rows]
      .map((line) => line.map((cell) => escapeCsv(String(cell))).join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tridral-sample-compliance-matrix.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#D4DCF3] bg-white text-[var(--text)] text-xs font-medium mono-data">
              Sample data
            </div>
            <PageHeader
              title="Sample report."
              subline="An example of a check, on made-up data."
              buttonLabel="Download sample CSV"
              buttonHref=""
              onButtonClick={handleDownloadSampleCsv}
              buttonIcon={<DownloadIcon className="w-4 h-4" />}
            />
          </div>

          {/* Three Tabs: Requirements, Proposal check, Risk summary */}
          <div
            className="bg-white rounded-[28px] border border-[#E2E8F8] overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="px-6 py-4 bg-[#F8FAFF] border-b border-[#EAEEFA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Sample report views">
                {(['Requirements', 'Proposal check', 'Risk summary'] as const).map((tab) => {
                  const active = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer focus-ring whitespace-nowrap ${
                        active
                          ? 'bg-[var(--blue)] text-white'
                          : 'bg-white text-[var(--text)] border border-[#DCE3F8] hover:text-[var(--ink)] hover:bg-[var(--blue-soft)]'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <span className="self-start sm:self-center px-3 py-1 rounded-full border border-[#D4DCF3] bg-white text-xs font-medium mono-data text-[var(--text)]">
                Sample data
              </span>
            </div>

            {activeTab === 'Requirements' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#EAEEFA] bg-[#F8FAFF]/60 text-xs font-semibold text-[var(--muted)]">
                      <th className="py-3.5 px-6">ID</th>
                      <th className="py-3.5 px-6">Requirement</th>
                      <th className="py-3.5 px-6">Type</th>
                      <th className="py-3.5 px-6">Mandatory</th>
                      <th className="py-3.5 px-6 text-right">RFP page</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F3FC] text-sm">
                    {SAMPLE_MATRIX_ROWS.map((row) => (
                      <tr key={row.id} className="hover:bg-[#F8FAFF]">
                        <td className="py-3.5 px-6 mono-data text-xs text-[var(--muted)] whitespace-nowrap">
                          {row.id}
                        </td>
                        <td className="py-3.5 px-6 font-medium text-[var(--ink)]">
                          {row.requirement}
                        </td>
                        <td className="py-3.5 px-6 text-xs text-[var(--text)] whitespace-nowrap">
                          {row.type}
                        </td>
                        <td className="py-3.5 px-6 text-xs text-[var(--ink)] whitespace-nowrap">
                          {row.mandatory}
                        </td>
                        <td className="py-3.5 px-6 text-right mono-data text-xs text-[var(--text)] whitespace-nowrap">
                          {row.rfpPage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Proposal check' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#EAEEFA] bg-[#F8FAFF]/60 text-xs font-semibold text-[var(--muted)]">
                        <th className="py-3.5 px-6">ID</th>
                        <th className="py-3.5 px-6">Requirement</th>
                        <th className="py-3.5 px-6">Status</th>
                        <th className="py-3.5 px-6 text-right">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F3FC] text-sm">
                      {SAMPLE_MATRIX_ROWS.map((row) => {
                        const isSelected = selectedRow.id === row.id;
                        return (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedRow(row)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? 'bg-[var(--blue-soft)]/55' : 'hover:bg-[#F8FAFF]'
                            }`}
                          >
                            <td className="py-3.5 px-6 mono-data text-xs text-[var(--muted)] whitespace-nowrap">
                              {row.id}
                            </td>
                            <td className="py-3.5 px-6 font-medium text-[var(--ink)]">
                              {row.requirement}
                            </td>
                            <td className="py-3.5 px-6 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  row.status === 'Addressed'
                                    ? 'bg-[#D7F5E5] text-[#0B7A4B]'
                                    : row.status === 'Partial'
                                    ? 'bg-[#FFF0CC] text-[#8A5A00]'
                                    : 'bg-[#FFE0DC] text-[#B42318]'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    row.status === 'Addressed'
                                      ? 'bg-[#0B7A4B]'
                                      : row.status === 'Partial'
                                      ? 'bg-[#8A5A00]'
                                      : 'bg-[#B42318]'
                                  }`}
                                />
                                {row.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-right mono-data text-xs text-[var(--text)] whitespace-nowrap">
                              {row.reference}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 bg-[#F8FAFF] border-t border-[#EAEEFA] text-sm text-[var(--ink)]">
                  {selectedRow.evidenceDetail ? (
                    <span>{selectedRow.evidenceDetail}</span>
                  ) : (
                    <span className="mono-data text-[var(--text)]">{selectedRow.reference}</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Risk summary' && (
              <div className="p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 flex items-center gap-5">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#E1E7F8" strokeWidth="6" />
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        fill="none"
                        stroke="#1A56F0"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 34}
                        strokeDashoffset={2 * Math.PI * 34 * (1 - 0.38)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-[var(--ink)] mono-data">38</span>
                      <span className="text-[11px] text-[var(--muted)] mono-data">/ 100</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[var(--ink)]">Sample risk score</div>
                    <p className="text-xs text-[var(--text)] leading-snug">
                      Illustrative gap exposure based on mandatory items missing.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-3">
                  <div className="text-sm font-bold text-[var(--ink)]">Top gaps</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {SAMPLE_TOP_GAPS.map((gap) => (
                      <div
                        key={gap.id}
                        className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#EAEEFA] space-y-1.5"
                      >
                        <div className="text-xs font-bold text-[var(--ink)]">{gap.title}</div>
                        <div className="text-xs text-[var(--text)]">{gap.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to read it */}
          <section
            className="bg-[var(--lilac)]/65 border border-[#D4C7F4] rounded-[28px] p-7 sm:p-8 space-y-2 text-[var(--ink)]"
          >
            <h2 className="text-lg font-bold text-[var(--ink)] display-heading">
              How to read it
            </h2>
            <p className="text-[16px] text-[#283148] leading-[1.6]">
              Status says whether the draft covers the requirement. Reference shows where it appears in the RFP and the proposal. The risk score adds up the gaps listed beside it.
            </p>
          </section>
        </div>
      </div>

      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
