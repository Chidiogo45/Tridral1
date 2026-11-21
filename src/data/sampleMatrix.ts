import { SampleRequirementRow } from '../types.ts';

export const SAMPLE_MATRIX_ROWS: SampleRequirementRow[] = [
  {
    id: 'C.3.1',
    requirement: 'Provide monthly status reports',
    type: 'Deliverable',
    mandatory: 'Yes',
    rfpPage: 'p.14',
    status: 'Addressed',
    reference: 'RFP p.14 → Proposal p.7',
    evidenceDetail:
      'Found in Section 3.2, page 7: "Contractor will deliver written monthly status reports by the 5th business day."',
  },
  {
    id: 'L.2.4',
    requirement: 'Proposal must not exceed 30 pages',
    type: 'Format',
    mandatory: 'Yes',
    rfpPage: 'p.4',
    status: 'Partial',
    reference: 'RFP p.4 → Proposal p.31',
  },
  {
    id: 'L.5.1',
    requirement: 'Submit signed Form SF-1',
    type: 'Form',
    mandatory: 'Yes',
    rfpPage: 'p.22',
    status: 'Missing',
    reference: 'RFP p.22 → Not found',
  },
  {
    id: 'L.4.3',
    requirement: 'Include three past performance references',
    type: 'Evaluation',
    mandatory: 'Yes',
    rfpPage: 'p.19',
    status: 'Addressed',
    reference: 'RFP p.19 → Proposal p.21',
  },
  {
    id: 'C.4.2',
    requirement: 'Describe 30-day transition-in staffing plan',
    type: 'Technical',
    mandatory: 'Yes',
    rfpPage: 'p.16',
    status: 'Partial',
    reference: 'RFP p.16 → Proposal p.12',
  },
  {
    id: 'H.8.1',
    requirement: 'Confirm Section 508 accessibility compliance',
    type: 'Technical',
    mandatory: 'Yes',
    rfpPage: 'p.25',
    status: 'Addressed',
    reference: 'RFP p.25 → Proposal p.18',
  },
];

export const SAMPLE_TOP_GAPS = [
  {
    id: 'L.5.1',
    title: 'Signed Form SF-1 missing.',
    detail: 'Mandatory cover form required on RFP p.22.',
  },
  {
    id: 'K',
    title: 'Small-business certificate missing.',
    detail: 'Section K representation omitted (RFP p.28).',
  },
  {
    id: 'L.2.4',
    title: 'Draft exceeds 30-page ceiling.',
    detail: 'Proposal runs to p.31 (RFP p.4).',
  },
];
