import React, { useState } from 'react';
import {
  ARLINEX_SAMPLE_DOCUMENTS,
  ARLINEX_SAMPLE_PROJECT,
  ARLINEX_SAMPLE_REQUIREMENTS,
} from '../data/arlinexSample.ts';
import { ComplianceStatus } from '../types.ts';
import { ChecklistIcon, DocumentIcon, GridIcon, ReportIcon } from './Icons.tsx';

type SidebarSection = 'overview' | 'documents' | 'requirements' | 'reports';

const SIDEBAR_ITEMS: {
  id: SidebarSection;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'overview', label: 'Overview', icon: GridIcon },
  { id: 'documents', label: 'RFP documents', icon: DocumentIcon },
  { id: 'requirements', label: 'Requirements', icon: ChecklistIcon },
  { id: 'reports', label: 'Compliance reports', icon: ReportIcon },
];

function getStatusStyle(status: ComplianceStatus): {
  text: string;
  bg: string;
  dot: string;
} {
  switch (status) {
    case 'Addressed':
      return {
        text: 'text-[#0F766E]',
        bg: 'bg-[#CCFBF1]/60',
        dot: 'bg-[#18B8A6]',
      };
    case 'Partial':
      return {
        text: 'text-[#B45309]',
        bg: 'bg-[#FEF3C7]/80',
        dot: 'bg-[#D97706]',
      };
    case 'Missing':
      return {
        text: 'text-[#B91C1C]',
        bg: 'bg-[#FEE2E2]/80',
        dot: 'bg-[#DC2626]',
      };
  }
}

export const ArlinexDashboardDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarSection>('overview');
  const [statusFilter, setStatusFilter] = useState<'All' | ComplianceStatus>('All');
  const [selectedReqId, setSelectedReqId] = useState<string>(
    ARLINEX_SAMPLE_REQUIREMENTS[0].id
  );

  const filteredRequirements =
    statusFilter === 'All'
      ? ARLINEX_SAMPLE_REQUIREMENTS
      : ARLINEX_SAMPLE_REQUIREMENTS.filter((item) => item.status === statusFilter);

  const activeRequirement =
    ARLINEX_SAMPLE_REQUIREMENTS.find((r) => r.id === selectedReqId) ??
    ARLINEX_SAMPLE_REQUIREMENTS[0];

  const total = ARLINEX_SAMPLE_PROJECT.totalRequirements;
  const addressedPct = Math.round((ARLINEX_SAMPLE_PROJECT.addressedCount / total) * 100);
  const partialPct = Math.round((ARLINEX_SAMPLE_PROJECT.partialCount / total) * 100);
  const missingPct = 100 - addressedPct - partialPct;

  return (
    <div
      className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden text-[#172337]"
      style={{ boxShadow: 'var(--shadow-elevated)' }}
      aria-label="Arlinex product interface demonstration"
    >
      {/* Top Application Chrome */}
      <div className="px-5 py-3.5 bg-[#101B2C] text-white flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[13px] font-extrabold tracking-[0.08em] display-heading text-white">
            ARLINEX
          </span>
          <span className="text-white/25" aria-hidden="true">
            |
          </span>
          <span className="text-[13px] text-[#CBD5E1] truncate">
            {ARLINEX_SAMPLE_PROJECT.title}
          </span>
        </div>

        <span className="text-[11px] font-medium text-[#94A3B8] mono-data whitespace-nowrap shrink-0">
          Illustrative sample data · Product in development
        </span>
      </div>

      {/* Main Workspace Split: Sidebar + Content Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Clean Software Sidebar */}
        <aside className="lg:col-span-3 bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-[#E2E8F0] p-4 flex flex-col justify-between gap-6">
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Workspace
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap focus-ring ${
                      isActive
                        ? 'bg-[#EAF1FF] text-[#3979F6] font-semibold'
                        : 'text-[#64748B] hover:text-[#172337] hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block pt-4 border-t border-[#E2E8F0] px-2 space-y-1.5 text-[12px] text-[#64748B]">
            <div className="font-semibold text-[#172337]">Solicitation ID</div>
            <div className="mono-data">{ARLINEX_SAMPLE_PROJECT.solicitationCode}</div>
            <div className="pt-1 text-[11px] leading-relaxed">
              Designed for human-verified compliance review prior to submission.
            </div>
          </div>
        </aside>

        {/* Main Viewport */}
        <div className="lg:col-span-9 p-5 sm:p-6 lg:p-7 space-y-6 bg-white">
          {/* Project Summary Header + KPI Strip */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-[18px] font-bold text-[#101B2C] display-heading">
                  Project summary
                </h3>
                <p className="text-[13px] text-[#64748B]">
                  Compliance assessment across extracted RFP sections and draft proposal pages
                </p>
              </div>

              <div className="text-[12px] text-[#64748B] mono-data">
                3 source documents · 85 total pages
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="text-[12px] text-[#64748B]">Total requirements</div>
                <div className="text-[24px] font-bold text-[#101B2C] tabular-nums mt-1">
                  {ARLINEX_SAMPLE_PROJECT.totalRequirements}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
                <div className="text-[12px] text-[#64748B]">Addressed requirements</div>
                <div className="text-[24px] font-bold text-[#0F766E] tabular-nums mt-1">
                  {ARLINEX_SAMPLE_PROJECT.addressedCount}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
                <div className="text-[12px] text-[#64748B]">Partially addressed</div>
                <div className="text-[24px] font-bold text-[#B45309] tabular-nums mt-1">
                  {ARLINEX_SAMPLE_PROJECT.partialCount}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
                <div className="text-[12px] text-[#64748B]">Missing requirements</div>
                <div className="text-[24px] font-bold text-[#B91C1C] tabular-nums mt-1">
                  {ARLINEX_SAMPLE_PROJECT.missingCount}
                </div>
              </div>
            </div>
          </div>

          {/* Tab-specific View */}
          {activeTab === 'documents' ? (
            <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#101B2C]">
                  RFP &amp; Proposal Documents
                </span>
                <span className="text-[12px] text-[#64748B]">Illustrative package</span>
              </div>
              <div className="divide-y divide-[#E2E8F0]">
                {ARLINEX_SAMPLE_DOCUMENTS.map((doc) => (
                  <div
                    key={doc.name}
                    className="px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <DocumentIcon className="w-4 h-4 text-[#3979F6] shrink-0" />
                      <span className="font-medium text-[#172337] truncate">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-[#64748B] shrink-0">
                      <span>{doc.role}</span>
                      <span className="mono-data tabular-nums">{doc.pages} pages</span>
                      <span className="font-medium text-[#0F766E]">{doc.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Compliance Assessment Bar */}
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
                  <span className="font-semibold text-[#101B2C]">Compliance assessment</span>
                  <div className="flex items-center gap-4 text-[12px] text-[#64748B] tabular-nums">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#18B8A6]" aria-hidden="true" />
                      {addressedPct}% Addressed
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D97706]" aria-hidden="true" />
                      {partialPct}% Partial
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]" aria-hidden="true" />
                      {missingPct}% Missing
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden flex">
                  <div className="h-full bg-[#18B8A6]" style={{ width: `${addressedPct}%` }} />
                  <div className="h-full bg-[#F59E0B]" style={{ width: `${partialPct}%` }} />
                  <div className="h-full bg-[#EF4444]" style={{ width: `${missingPct}%` }} />
                </div>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-[13px] font-semibold text-[#101B2C]">
                  {activeTab === 'reports'
                    ? 'Compliance report breakdown'
                    : 'Extracted requirements & proposal mapping'}
                </div>

                <div
                  className="inline-flex items-center gap-1 p-1 bg-[#F4F6FA] rounded-lg border border-[#E2E8F0]"
                  role="tablist"
                  aria-label="Filter requirements by compliance status"
                >
                  {(['All', 'Addressed', 'Partial', 'Missing'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`px-2.5 py-1 text-[12px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap focus-ring ${
                        statusFilter === status
                          ? 'bg-white text-[#101B2C] shadow-xs font-semibold'
                          : 'text-[#64748B] hover:text-[#172337]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirements Table */}
              <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[560px]">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                        <th className="py-2.5 px-4">ID</th>
                        <th className="py-2.5 px-4">Requirement</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Page References</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[13px]">
                      {filteredRequirements.map((row) => {
                        const isSelected = row.id === activeRequirement.id;
                        const statusStyle = getStatusStyle(row.status);
                        return (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedReqId(row.id)}
                            className={`transition-colors cursor-pointer ${
                              isSelected ? 'bg-[#EAF1FF]/60' : 'bg-white hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <td className="py-3 px-4 mono-data text-[12px] text-[#64748B] whitespace-nowrap">
                              {row.id}
                            </td>
                            <td className="py-3 px-4 font-medium text-[#172337]">
                              {row.title}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[12px] font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                                  aria-hidden="true"
                                />
                                <span>{row.status}</span>
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right mono-data text-[12px] text-[#64748B] whitespace-nowrap">
                              {row.rfpReference} → {row.proposalReference}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Evidence & Proposal-Page Reference Inspector */}
              <div className="p-4 sm:p-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
                  <span className="font-semibold text-[#101B2C]">
                    Evidence and proposal-page references · {activeRequirement.id}
                  </span>
                  <span className="mono-data text-[#64748B]">
                    {activeRequirement.rfpReference} · {activeRequirement.proposalReference}
                  </span>
                </div>
                <p className="text-[13.5px] text-[#172337] leading-relaxed">
                  {activeRequirement.evidenceQuote}
                </p>
                <p className="text-[12.5px] text-[#64748B]">
                  Assessment note: {activeRequirement.assessmentNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
