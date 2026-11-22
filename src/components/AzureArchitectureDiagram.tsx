import React from 'react';

export const AzureArchitectureDiagram: React.FC = () => {
  return (
    <div
      className="rounded-2xl bg-[#16243A] border border-white/12 p-6 sm:p-8 space-y-6"
      aria-label="Planned Azure system architecture diagram"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
        <span className="text-[13px] font-semibold text-white display-heading">
          Planned Azure Pipeline Architecture
        </span>
        <span className="text-[11px] font-medium text-[#94A3B8] mono-data">
          Intended system design · In development
        </span>
      </div>

      {/* 4-Stage Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#101B2C] border border-white/10 space-y-2">
          <div className="text-[11px] font-semibold text-[#3979F6] mono-data">
            01 · Storage Layer
          </div>
          <div className="text-[15px] font-semibold text-white">Azure Blob Storage</div>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed">
            Isolated object storage designed to hold uploaded solicitation PDFs and proposal drafts securely.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#101B2C] border border-white/10 space-y-2">
          <div className="text-[11px] font-semibold text-[#3979F6] mono-data">
            02 · Document Parsing
          </div>
          <div className="text-[15px] font-semibold text-white">
            Azure AI Document Intelligence
          </div>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed">
            Layout-aware text, table, heading, and page-index extraction across multi-section solicitations.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#101B2C] border border-white/10 space-y-2">
          <div className="text-[11px] font-semibold text-[#18B8A6] mono-data">
            03 · Reasoning Engine
          </div>
          <div className="text-[15px] font-semibold text-white">Azure OpenAI</div>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed">
            Structured requirement extraction and proposal-to-RFP evidence mapping with page citations.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#101B2C] border border-white/10 space-y-2">
          <div className="text-[11px] font-semibold text-[#18B8A6] mono-data">
            04 · Application Hosting
          </div>
          <div className="text-[15px] font-semibold text-white">
            Azure Cloud Infrastructure
          </div>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed">
            Managed compute, API services, and network isolation planned to deliver compliance workspaces.
          </p>
        </div>
      </div>

      {/* Architectural Data Flow Summary */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#CBD5E1] mono-data">
        <span>Document Intake</span>
        <span className="text-[#3979F6]" aria-hidden="true">→</span>
        <span>Layout &amp; Text Extraction</span>
        <span className="text-[#3979F6]" aria-hidden="true">→</span>
        <span>Requirement Comparison</span>
        <span className="text-[#18B8A6]" aria-hidden="true">→</span>
        <span>Evidence Report</span>
      </div>
    </div>
  );
};
