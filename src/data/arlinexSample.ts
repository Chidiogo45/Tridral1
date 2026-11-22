import { ArlinexDocumentItem, ArlinexRequirementItem } from '../types.ts';

export const ARLINEX_SAMPLE_PROJECT = {
  solicitationCode: 'RFP-SOL-2026-041',
  title: 'Illustrative Solicitation · Municipal Cloud Infrastructure Support',
  totalRequirements: 18,
  addressedCount: 11,
  partialCount: 4,
  missingCount: 3,
};

export const ARLINEX_SAMPLE_DOCUMENTS: ArlinexDocumentItem[] = [
  {
    name: 'Solicitation_RFP_SOL_2026_041.pdf',
    role: 'Solicitation (RFP)',
    pages: 48,
    status: 'Parsed (Illustrative)',
  },
  {
    name: 'Technical_Proposal_Draft_v3.docx',
    role: 'Draft Proposal',
    pages: 31,
    status: 'Parsed (Illustrative)',
  },
  {
    name: 'Section_K_Representations_Form.pdf',
    role: 'Attachment',
    pages: 6,
    status: 'Pending Review',
  },
];

export const ARLINEX_SAMPLE_REQUIREMENTS: ArlinexRequirementItem[] = [
  {
    id: 'C.3.1',
    section: 'Section C · Statement of Work',
    title: 'Deliver written monthly progress reports by the 5th business day',
    category: 'Technical',
    mandatory: true,
    rfpReference: 'RFP p. 14',
    proposalReference: 'Proposal p. 7',
    status: 'Addressed',
    evidenceQuote:
      'Section 3.2, Proposal p. 7: "Contractor will deliver written monthly status reports by the 5th business day of each month."',
    assessmentNote: 'Reporting cadence and deliverable format match Section C.3.1.',
  },
  {
    id: 'L.2.4',
    section: 'Section L · Submission Format',
    title: 'Technical volume must not exceed 30 numbered pages',
    category: 'Format',
    mandatory: true,
    rfpReference: 'RFP p. 4',
    proposalReference: 'Proposal p. 31',
    status: 'Partial',
    evidenceQuote:
      'Detected 31 numbered pages in Technical_Proposal_Draft_v3.docx; Section 5 appendix extends onto p. 31.',
    assessmentNote: 'Draft currently exceeds the 30-page ceiling by 1 page and needs trimming before submission.',
  },
  {
    id: 'L.5.1',
    section: 'Section L · Required Forms',
    title: 'Include signed Standard Cover Form SF-1 with authorized signature',
    category: 'Forms',
    mandatory: true,
    rfpReference: 'RFP p. 22',
    proposalReference: 'Not located',
    status: 'Missing',
    evidenceQuote:
      'No signed Standard Cover Form SF-1 or equivalent signature page was identified across uploaded draft files.',
    assessmentNote: 'Mandatory submission form is missing from the proposal package.',
  },
  {
    id: 'M.2.1',
    section: 'Section M · Past Performance',
    title: 'Provide three relevant past performance references from the last 5 years',
    category: 'Compliance',
    mandatory: true,
    rfpReference: 'RFP p. 19',
    proposalReference: 'Proposal p. 21',
    status: 'Addressed',
    evidenceQuote:
      'Section 6.1, Proposal p. 21–24: Three dated project references with contracting officer contacts are documented.',
    assessmentNote: 'All three reference profiles include contract value, period of performance, and contact details.',
  },
  {
    id: 'C.4.2',
    section: 'Section C · Transition Plan',
    title: 'Detail a 30-day transition-in staffing and handoff schedule',
    category: 'Technical',
    mandatory: true,
    rfpReference: 'RFP p. 16',
    proposalReference: 'Proposal p. 12',
    status: 'Partial',
    evidenceQuote:
      'Section 4.1, Proposal p. 12 outlines staffing roles but omits week-by-week handoff milestones for days 1–30.',
    assessmentNote: 'Staffing roles are described, but the required 30-day milestone schedule is incomplete.',
  },
  {
    id: 'H.8.1',
    section: 'Section H · Accessibility',
    title: 'Confirm Section 508 accessibility conformance for deliverables',
    category: 'Compliance',
    mandatory: true,
    rfpReference: 'RFP p. 25',
    proposalReference: 'Proposal p. 18',
    status: 'Addressed',
    evidenceQuote:
      'Section 4.5, Proposal p. 18: "All web-based interfaces and reports will conform to WCAG 2.1 Level AA and Section 508 standards."',
    assessmentNote: 'Explicit Section 508 conformance commitment is present in Section 4.5.',
  },
];
