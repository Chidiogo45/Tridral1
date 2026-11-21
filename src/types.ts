export type PageId =
  | 'home'
  | 'product'
  | 'sample-report'
  | 'why-it-matters'
  | 'pricing'
  | 'roadmap'
  | 'about'
  | 'faq'
  | 'trust-center'
  | 'early-access';

export type ComplianceStatus = 'Addressed' | 'Partial' | 'Missing';

export interface SampleRequirementRow {
  id: string;
  requirement: string;
  type: 'Deliverable' | 'Format' | 'Form' | 'Evaluation' | 'Technical';
  mandatory: 'Yes' | 'No';
  rfpPage: string;
  status: ComplianceStatus;
  reference: string;
  evidenceDetail?: string;
}

export type RfpType = 'Federal' | 'State' | 'Local';
export type InterestOption = 'Early access' | 'A walkthrough call' | 'Both';

export interface EarlyAccessFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  companySize: '1 to 10' | '11 to 50' | '51 or more';
  rfpTypes: RfpType[];
  proposalsPerYear: '1 to 5' | '6 to 15' | '16 or more';
  interest: InterestOption;
  notes: string;
}
