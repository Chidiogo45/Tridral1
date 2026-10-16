export type PageId =
  | 'home'
  | 'platform'
  | 'how-it-works'
  | 'architecture'
  | 'capabilities'
  | 'roadmap'
  | 'pricing'
  | 'about'
  | 'quote'
  | 'compliance'
  | 'integrations'
  | 'case-for-graph'
  | 'trust-center'
  | 'status';

export interface FraudScenario {
  id: string;
  name: string;
  category: string;
  riskScore: number; // 0 to 100
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Normal';
  action: 'Hold for Review' | 'Block Immediately' | 'Allow with Monitor' | 'Standard Allow';
  summary: string;
  detectionTime: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  attributes: { label: string; value: string }[];
  explanation: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'account' | 'device' | 'ip' | 'card' | 'mule';
  x: number;
  y: number;
  status: 'flagged' | 'linked' | 'normal';
}

export interface GraphEdge {
  from: string;
  to: string;
  amount?: string;
  velocity?: string;
  flagged?: boolean;
}

export interface PilotQuoteForm {
  fullName: string;
  workEmail: string;
  companyName: string;
  companySize: string;
  primaryRequirement: string;
  deploymentTimeline: string;
  environmentDetails: string;
}
