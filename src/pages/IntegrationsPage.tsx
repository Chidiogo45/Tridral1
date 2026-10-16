import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { Cpu, Terminal, ArrowRight, CheckCircle2, Copy, Check, Server, GitFork, ShieldCheck } from 'lucide-react';

interface IntegrationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'curl' | 'node' | 'python'>('curl');
  const [copied, setCopied] = useState<boolean>(false);

  const snippets = {
    curl: `curl -X POST "https://api.tridral.com/v1/intercept/pre-settlement" \\
  -H "Authorization: Bearer sec_live_94821049" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transaction_id": "tx_us_89410294",
    "amount": 2400.00,
    "currency": "USD",
    "origin_account_hash": "e3b0c44298fc1c149afbf4c8996fb924",
    "destination_account_hash": "2c26b46b68ffc68ff99b453c1d304134",
    "device_element_hash": "ba7816bf8f01cfea414140de5dae2223",
    "ip_address": "198.51.100.42",
    "rail": "REAL_TIME_CLEARING"
  }'`,
    node: `import { TridralClient } from '@tridral/node-sdk';

const tridral = new TridralClient({
  apiKey: process.env.TRIDRAL_SECRET_KEY,
  timeoutMs: 45 // Strict sub-50ms SLA ceiling
});

// Inline pre-settlement authorization intercept
const decision = await tridral.intercept.evaluate({
  transactionId: 'tx_us_89410294',
  amount: 2400.00,
  currency: 'USD',
  originAccountHash: hashAccount(senderId),
  destinationAccountHash: hashAccount(receiverId),
  deviceElementHash: deviceFingerprint,
  ipAddress: clientIp,
  rail: 'REAL_TIME_CLEARING'
});

if (decision.action === 'HOLD') {
  await paymentOrchestrator.holdForReview(decision.transactionId, decision.reason);
} else {
  await paymentOrchestrator.commitSettlement(decision.transactionId);
}`,
    python: `from tridral import TridralClient

client = TridralClient(
    api_key="sec_live_94821049",
    timeout_ms=45 # Strict pre-settlement timeout
)

decision = client.intercept.evaluate(
    transaction_id="tx_us_89410294",
    amount=2400.00,
    currency="USD",
    origin_account_hash=origin_hash,
    destination_account_hash=dest_hash,
    device_element_hash=device_fp,
    rail="REAL_TIME_CLEARING"
)

if decision.action == "BLOCK":
    ledger.abort_transfer(decision.transaction_id, reason=decision.reason)
else:
    ledger.execute_clearing(decision.transaction_id)`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Ecosystem & API Connectivity
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          Works with your payment rails, core banking engines, and event streams.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          No proprietary hardware or closed database formats. Tridral connects through open REST, gRPC, and Kafka standards to integrate natively into any high-throughput fintech stack.
        </p>
      </div>

      {/* Code Snippet Workbench */}
      <div className="bg-[#0B0F1A] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#2DD4BF]" />
            <span className="text-xs font-bold text-white mono-data">
              Pre-Settlement Intercept Call (sub-50ms)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
              {(['curl', 'node', 'python'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === lang
                      ? 'bg-[#2F5FFF] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <pre className="text-xs mono-data leading-relaxed text-[#2DD4BF] overflow-x-auto max-h-[380px]">
            <code>{snippets[activeTab]}</code>
          </pre>
        </div>

        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Client SDKs: Node.js, Python, Go, Java</span>
          <span className="mono-data">Timeout Guard: 45ms bounded execution</span>
        </div>
      </div>

      {/* "Works With" Compatibility Categories */}
      <div className="space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F5FFF]">
            Supported Rails & Protocols
          </span>
          <h2 className="text-3xl font-normal text-slate-900 serif-heading mt-2">
            Universal compatibility across global rails
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category 1: Payment Rails */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-4 shadow-2xs">
            <div className="text-xs font-bold text-[#2F5FFF] uppercase tracking-wider">
              01. Payment Rails
            </div>
            <h3 className="text-lg font-bold text-slate-900">Clearing & Settlement Rails</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time interception before ledger settlement across instant and batch protocols.
            </p>
            <ul className="text-xs space-y-2 text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Instant & Real-Time Payment Networks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Visa / Mastercard Dual-Message Authorization</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Faster Payments & SEPA Instant Clearing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Direct ACH / National Bank Transfer Rails</span>
              </li>
            </ul>
          </div>

          {/* Category 2: Core Banking Engines */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-4 shadow-2xs">
            <div className="text-xs font-bold text-[#2F5FFF] uppercase tracking-wider">
              02. Core Systems
            </div>
            <h3 className="text-lg font-bold text-slate-900">Core Banking & Cloud Ledgers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plugs alongside existing digital ledger engines without modifying database tables.
            </p>
            <ul className="text-xs space-y-2 text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Cloud-native core banking platforms (Mambu, Thought Machine)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Enterprise banking architectures (Temenos, Finastra)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>In-house relational & double-entry PostgreSQL/MySQL ledgers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Digital asset & wallet orchestration platforms</span>
              </li>
            </ul>
          </div>

          {/* Category 3: Event Streaming */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 space-y-4 shadow-2xs">
            <div className="text-xs font-bold text-[#2F5FFF] uppercase tracking-wider">
              03. Message Streaming
            </div>
            <h3 className="text-lg font-bold text-slate-900">Event Buses & Orchestrators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stream transactions as JSON, Protobuf, or Avro events directly into our edge.
            </p>
            <ul className="text-xs space-y-2 text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Apache Kafka / Confluent Cloud</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>AWS SQS / Kinesis Data Streams</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>RabbitMQ / Google Cloud Pub/Sub</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span>Direct low-latency synchronous REST & gRPC webhooks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Pilot Action */}
      <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-slate-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 serif-heading">
          Ready to verify SDK performance in your staging cluster?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          We provision dedicated sandbox API keys and provide sample traffic replay scripts in under 24 hours.
        </p>
        <button
          onClick={() => onNavigate('quote')}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2F5FFF] hover:bg-[#254ecc] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <span>Request Sandbox Integration Keys</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
