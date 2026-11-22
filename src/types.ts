export type PageId =
  | 'home'
  | 'products'
  | 'solutions'
  | 'technology'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export type ComplianceStatus = 'Addressed' | 'Partial' | 'Missing';

export interface ArlinexRequirementItem {
  id: string;
  section: string;
  title: string;
  category: 'Technical' | 'Compliance' | 'Format' | 'Forms';
  mandatory: boolean;
  rfpReference: string;
  proposalReference: string;
  status: ComplianceStatus;
  evidenceQuote: string;
  assessmentNote: string;
}

export interface ArlinexDocumentItem {
  name: string;
  role: 'Solicitation (RFP)' | 'Draft Proposal' | 'Attachment';
  pages: number;
  status: 'Parsed (Illustrative)' | 'Pending Review';
}

export type InquiryType =
  | 'Partnership & Technology'
  | 'Investor Relations'
  | 'Arlinex Product Inquiry'
  | 'General Inquiry';

export interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  inquiryType: InquiryType;
  message: string;
}
