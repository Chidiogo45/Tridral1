import React, { useState } from 'react';
import { FraudScenario, GraphNode } from '../types.ts';
import { ShieldAlert, ShieldCheck, Info, Play, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

export const scenarios: FraudScenario[] = [
  {
    id: 'mule-network',
    name: 'Coordinated Mule Network',
    category: 'Money Laundering & Pooling',
    riskScore: 97,
    riskLevel: 'High Risk',
    action: 'Hold for Review',
    summary: '4 geographically separated consumer accounts funneling rapid transfers into an unverified staging account within 45 seconds.',
    detectionTime: '26 ms',
    explanation: 'Sub-minute fan-in graph clustering detected. Multi-hop traversal revealed 3 origin accounts share identical subnet routing and secondary authentication recovery tokens.',
    attributes: [
      { label: 'Cluster Velocity', value: '4 transfers / 45s' },
      { label: 'Fan-In Ratio', value: '4:1 Concentration' },
      { label: 'Hop Distance', value: '2 Graph Degrees' },
      { label: 'Estimated Intercept', value: '$8,450 Protected' },
    ],
    nodes: [
      { id: 'm-orig1', label: 'Acct #7182', type: 'account', x: 70, y: 60, status: 'linked' },
      { id: 'm-orig2', label: 'Acct #3901', type: 'account', x: 70, y: 130, status: 'linked' },
      { id: 'm-orig3', label: 'Acct #5540', type: 'account', x: 70, y: 200, status: 'linked' },
      { id: 'm-orig4', label: 'Acct #8812', type: 'account', x: 70, y: 270, status: 'linked' },
      { id: 'm-target', label: 'Mule Staging #9904', type: 'mule', x: 250, y: 165, status: 'flagged' },
      { id: 'm-exit', label: 'Crypto Rail Exit', type: 'account', x: 410, y: 165, status: 'linked' },
    ],
    edges: [
      { from: 'm-orig1', to: 'm-target', amount: '$1,950', flagged: true },
      { from: 'm-orig2', to: 'm-target', amount: '$2,100', flagged: true },
      { from: 'm-orig3', to: 'm-target', amount: '$2,200', flagged: true },
      { from: 'm-orig4', to: 'm-target', amount: '$2,200', flagged: true },
      { from: 'm-target', to: 'm-exit', amount: 'Pending Intercept', flagged: true },
    ],
  },
  {
    id: 'synthetic-identity',
    name: 'Synthetic Identity Cluster',
    category: 'Application & Onboarding Fraud',
    riskScore: 92,
    riskLevel: 'High Risk',
    action: 'Block Immediately',
    summary: '3 separate loan applications presenting distinct identities but linked by shared encrypted hardware entropy and VoIP carrier ranges.',
    detectionTime: '34 ms',
    explanation: 'Synthetic identity fabric detected. While names and tax IDs are distinct, the underlying transaction graph exposes shared device identity and cyclical funding loops.',
    attributes: [
      { label: 'Identity Variance', value: '3 Unique KYC Docs' },
      { label: 'Device Collision', value: 'Single Secure Element' },
      { label: 'Carrier Risk', value: 'Virtual VoIP Gateway' },
      { label: 'Action Taken', value: 'Pre-Disbursement Freeze' },
    ],
    nodes: [
      { id: 's-id1', label: 'Applicant 1 (K. Reed)', type: 'account', x: 90, y: 70, status: 'linked' },
      { id: 's-id2', label: 'Applicant 2 (M. Vance)', type: 'account', x: 90, y: 165, status: 'linked' },
      { id: 's-id3', label: 'Applicant 3 (T. Chen)', type: 'account', x: 90, y: 260, status: 'linked' },
      { id: 's-device', label: 'Device #FP-881', type: 'device', x: 260, y: 165, status: 'flagged' },
      { id: 's-disburse', label: 'Credit Line $15k', type: 'card', x: 420, y: 165, status: 'linked' },
    ],
    edges: [
      { from: 's-id1', to: 's-device', velocity: 'Enclave Match' },
      { from: 's-id2', to: 's-device', velocity: 'Enclave Match' },
      { from: 's-id3', to: 's-device', velocity: 'Enclave Match' },
      { from: 's-device', to: 's-disburse', amount: '$15,000 Requested', flagged: true },
    ],
  },
  {
    id: 'account-takeover',
    name: 'Account Takeover Velocity',
    category: 'Credential Stuffing & Session Hijack',
    riskScore: 95,
    riskLevel: 'High Risk',
    action: 'Hold for Review',
    summary: 'Dormant corporate payroll account suddenly accesses via Tor exit node, adds new beneficiary, and initiates maximum wire in 90 seconds.',
    detectionTime: '19 ms',
    explanation: 'Behavioral topology violation. Graph edge weight between user and unfamiliar foreign IP creates high-centrality anomaly index exceeding threshold.',
    attributes: [
      { label: 'Account Age', value: '4.2 Years Good Standing' },
      { label: 'Velocity Delta', value: '28x Historic Average' },
      { label: 'Network Anomaly', value: 'Unrecognized ASN' },
      { label: 'Intervention', value: 'Step-Up Auth Triggered' },
    ],
    nodes: [
      { id: 'a-user', label: 'Legitimate Corp Acct', type: 'account', x: 90, y: 165, status: 'linked' },
      { id: 'a-ip', label: 'Anomalous ASN #904', type: 'ip', x: 220, y: 80, status: 'flagged' },
      { id: 'a-device', label: 'Unseen Mac M3', type: 'device', x: 220, y: 250, status: 'linked' },
      { id: 'a-beneficiary', label: 'Offshore Payee #102', type: 'account', x: 400, y: 165, status: 'flagged' },
    ],
    edges: [
      { from: 'a-user', to: 'a-ip', velocity: 'Tor Exit Proxy', flagged: true },
      { from: 'a-user', to: 'a-device', velocity: 'First-Time Session' },
      { from: 'a-user', to: 'a-beneficiary', amount: '$49,500 Wire', flagged: true },
    ],
  },
  {
    id: 'legitimate-baseline',
    name: 'Legitimate Baseline Transaction',
    category: 'Normal Commercial Activity',
    riskScore: 4,
    riskLevel: 'Normal',
    action: 'Standard Allow',
    summary: 'Recurring scheduled vendor invoice payment executed from trusted primary workstation through established payment orchestrator.',
    detectionTime: '16 ms',
    explanation: 'High graph familiarity score (>0.99). Prior 18-month edge traversal matches expected monthly seasonality, known beneficiary, and authenticated hardware key.',
    attributes: [
      { label: 'Relationship Age', value: '18 Months Consistent' },
      { label: 'Anomaly Index', value: '0.02 (Nominal)' },
      { label: 'Hardware Key', value: 'FIDO2 WebAuthn Valid' },
      { label: 'Processing Speed', value: '16ms Pass-Through' },
    ],
    nodes: [
      { id: 'l-buyer', label: 'Verified Buyer', type: 'account', x: 90, y: 165, status: 'normal' },
      { id: 'l-key', label: 'FIDO2 Key', type: 'device', x: 250, y: 90, status: 'normal' },
      { id: 'l-rail', label: 'RTP Clearing Rail', type: 'account', x: 250, y: 240, status: 'normal' },
      { id: 'l-vendor', label: 'Known SaaS Vendor', type: 'account', x: 410, y: 165, status: 'normal' },
    ],
    edges: [
      { from: 'l-buyer', to: 'l-key', velocity: 'Signed Assertion' },
      { from: 'l-buyer', to: 'l-rail', amount: '$1,200.00' },
      { from: 'l-rail', to: 'l-vendor', amount: 'Direct Settle' },
    ],
  },
];

export const InteractiveGraphSandbox: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('mule-network');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentScenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#0B0F1A] px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#2F5FFF] text-white mono-data">
              INTERACTIVE GRAPH ENGINE
            </span>
            <span className="text-xs text-slate-400">Live Anomaly Visualizer</span>
          </div>
          <h3 className="text-lg font-bold mt-1 text-white">
            Simulate Pre-Settlement Graph Traversal
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0B0F1A] bg-[#2DD4BF] hover:bg-[#5eead4] rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Graph Analysis...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Re-Analyze Scenario</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selectors (Segmented Buttons) */}
      <div className="border-b border-slate-200 bg-[#F7F9FC] px-4 sm:px-6 py-3 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-medium text-slate-500 mr-2">Vector:</span>
          {scenarios.map((sc) => {
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  setSelectedNode(null);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2F5FFF] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {sc.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Visual Canvas */}
        <div className="lg:col-span-8 bg-[#0B0F1A] rounded-xl p-4 sm:p-6 relative min-h-[380px] flex flex-col justify-between overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#2DD4BF 1px, transparent 1px), radial-gradient(#2F5FFF 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />

          {/* Canvas Status Watermark */}
          <div className="relative z-10 flex items-center justify-between text-xs mono-data text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
              Graph Engine Sub-50ms Stream
            </span>
            <span>Latency: {currentScenario.detectionTime}</span>
          </div>

          {/* Dynamic SVG Topology */}
          <div className="relative z-10 w-full h-[260px] my-auto">
            <svg viewBox="0 0 500 320" className="w-full h-full">
              {/* Edges */}
              {currentScenario.edges.map((edge, idx) => {
                const sourceNode = currentScenario.nodes.find((n) => n.id === edge.from);
                const targetNode = currentScenario.nodes.find((n) => n.id === edge.to);
                if (!sourceNode || !targetNode) return null;

                const isFlagged = edge.flagged;
                return (
                  <g key={`edge-${idx}`}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isFlagged ? '#EF4444' : '#2DD4BF'}
                      strokeWidth={isFlagged ? 2.5 : 1.75}
                      strokeDasharray={isFlagged ? '4 3' : undefined}
                      opacity={0.8}
                    />
                    {edge.amount && (
                      <text
                        x={(sourceNode.x + targetNode.x) / 2}
                        y={(sourceNode.y + targetNode.y) / 2 - 8}
                        textAnchor="middle"
                        fill={isFlagged ? '#FCA5A5' : '#94A3B8'}
                        fontSize="9.5"
                        fontWeight="600"
                        className="mono-data select-none"
                      >
                        {edge.amount}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {currentScenario.nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isFlagged = node.status === 'flagged';
                const isNormal = node.status === 'normal';

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {isFlagged && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="24"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        className="radar-ring"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 19 : 16}
                      fill={isFlagged ? '#EF4444' : isNormal ? '#10B981' : '#2F5FFF'}
                      stroke={isSelected ? '#FFFFFF' : '#0B0F1A'}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="700"
                      className="mono-data select-none"
                    >
                      {node.type.toUpperCase().slice(0, 4)}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 30}
                      textAnchor="middle"
                      fill={isFlagged ? '#F87171' : '#E2E8F0'}
                      fontSize="10"
                      fontWeight="500"
                      className="mono-data select-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Click any node in graph to inspect structural properties</span>
            <span className="mono-data text-[#2DD4BF]">
              Nodes: {currentScenario.nodes.length} · Edges: {currentScenario.edges.length}
            </span>
          </div>
        </div>

        {/* Intelligence & Decision Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          {/* Risk Card */}
          <div className="bg-[#F7F9FC] rounded-xl p-5 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Risk Classification
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  currentScenario.riskScore > 80
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {currentScenario.riskLevel}
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 mono-data">
                {currentScenario.riskScore}
              </span>
              <span className="text-slate-400 text-sm mono-data">/ 100 Risk Score</span>
            </div>

            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentScenario.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-200/80">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                Automated Pre-Settlement Policy
              </div>
              <div className="font-semibold text-sm text-[#2F5FFF] flex items-center gap-1.5">
                {currentScenario.riskScore > 80 ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                )}
                <span>{currentScenario.action}</span>
              </div>
            </div>
          </div>

          {/* Node Inspector Callout */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Entity Deep-Dive</span>
              <span className="mono-data">
                {selectedNode ? selectedNode.label : 'Select a node'}
              </span>
            </div>

            {selectedNode ? (
              <div className="pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Node Type:</span>
                  <span className="font-semibold capitalize text-slate-800">
                    {selectedNode.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Centrality State:</span>
                  <span
                    className={`font-semibold ${
                      selectedNode.status === 'flagged' ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {selectedNode.status === 'flagged' ? 'Critical Hub (Flagged)' : 'Connected Peer'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Traversal Latency:</span>
                  <span className="mono-data text-slate-800">4.2 ms</span>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">
                Click any circle in the graph to inspect entity attributes and connected subgraphs.
              </div>
            )}
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {currentScenario.attributes.map((attr, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-400">{attr.label}</div>
                <div className="font-semibold text-slate-800 mt-0.5">{attr.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
