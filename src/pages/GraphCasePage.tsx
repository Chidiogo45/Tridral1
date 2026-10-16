import React from 'react';
import { PageId } from '../types.ts';
import { GitGraph, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Network } from 'lucide-react';

interface GraphCasePageProps {
  onNavigate: (page: PageId) => void;
}

export const GraphCasePage: React.FC<GraphCasePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-200 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2F5FFF]/10 text-[#2F5FFF] text-xs font-semibold">
          Technical Whitepaper
        </div>
        <h1 className="text-4xl sm:text-5xl font-normal text-slate-900 serif-heading tracking-tight leading-[1.15]">
          The Case for Graph-Based Detection: Why Linear SQL Rules Cannot Stop Coordinated Fraud.
        </h1>
        <div className="flex items-center gap-4 text-xs text-slate-500 mono-data pt-2">
          <span>By Tridral Systems Engineering</span>
          <span>·</span>
          <span>Published 2026</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
      </div>

      {/* Article Body */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8 text-base">
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/90 text-sm italic text-slate-800 leading-relaxed">
          "Relational databases were engineered to record ledger balance states. They were never architected to traverse topological relationship networks under 50-millisecond financial settlement deadlines."
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 serif-heading">
            1. The Relational Blind Spot: The Limits of Tabular Checks
          </h2>
          <p>
            For decades, financial fraud detection has relied almost entirely on relational SQL queries and static decision trees:
          </p>
          <div className="bg-[#0B0F1A] p-4 rounded-xl text-xs mono-data text-slate-200">
            <code>
              SELECT * FROM transactions<br />
              WHERE amount &gt; 5000 AND velocity_1h &gt; 3 AND ip_country != user_country;
            </code>
          </div>
          <p>
            This model makes a fatal assumption: that fraudulent activity manifests within the attributes of a single transaction row. In 2026, sophisticated fraud syndicates do not commit single transactions that exceed arbitrary thresholds. They deploy <strong>coordinated topologies</strong>.
          </p>
          <p>
            When a criminal syndicate steals funds from an compromised institution, they distribute the capital across 20 to 50 seemingly unrelated consumer accounts ("mules"). Each individual transfer is intentionally sized between $400 and $800—well below standard threshold triggers. To an isolated SQL query, each transaction appears normal. But when represented as a graph, the topology reveals an unmistakable signature: a coordinated <strong>fan-in / fan-out cluster</strong> executing within a 45-second temporal window.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 serif-heading">
            2. Computational Complexity: O(N^k) Joins vs. Graph Traversal
          </h2>
          <p>
            Why can't digital banks simply query relational databases for multi-hop connections? The answer lies in algorithmic complexity.
          </p>
          <p>
            In a relational SQL architecture, discovering whether Account A and Account C are connected through an intermediary requires an inner join:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl text-xs mono-data text-slate-800">
            <code>
              SELECT * FROM transfers t1<br />
              JOIN transfers t2 ON t1.dest = t2.orig<br />
              JOIN transfers t3 ON t2.dest = t3.orig<br />
              WHERE t1.sender = 'acc_user_4491';
            </code>
          </div>
          <p>
            As relationship depth (k) increases, relational join complexity explodes exponentially as O(N^k), where N is the table size. Traversing 3 or 4 degrees of separation across a database of 100 million transactions requires scanning hundreds of millions of index pages—taking seconds or minutes. Under a pre-settlement SLA of 50 milliseconds, relational joins are physically impossible.
          </p>
          <p>
            By contrast, an <strong>in-memory property graph</strong> indexes edges directly alongside vertices. Traversing an edge requires dereferencing an in-memory pointer (O(1) complexity per hop). An in-memory graph engine can traverse 4 hops across millions of entities in under 15 milliseconds, evaluating full community topologies before payment clearing commits.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 serif-heading">
            3. Multi-Hop Entity Resolution & Blind Hashing
          </h2>
          <p>
            Attackers frequently fabricate distinct customer profiles (names, emails, physical addresses). However, they face extreme physical friction in fabricating independent hardware and routing infrastructure.
          </p>
          <p>
            Tridral applies multi-hop entity resolution across secondary attributes:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-1" />
              <span><strong>Hardware Enclave Tokens:</strong> Linking accounts that access banking sessions from the same device cryptographic element.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-1" />
              <span><strong>Subnet & Autonomous System Clustering:</strong> Correlating rapid sequential sign-ins originating from identical residential proxy ranges.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0 mt-1" />
              <span><strong>Cyclical Ring Paths:</strong> Identifying funds routed through multiple hops that loop back to the same beneficiary controller.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 serif-heading">
            4. The Regulatory Imperative: Explainability over Black Boxes
          </h2>
          <p>
            Unsupervised machine learning models (such as opaque neural networks) frequently fail regulatory audits because they cannot explain why a legitimate payment was held. Under FATF and consumer protection rules, compliance teams must provide plain-language justification for adverse actions.
          </p>
          <p>
            Graphs provide innate mathematical explainability. Because decisions are derived from concrete topological subgraphs, every flag is backed by a deterministic path: <em>"3 accounts opened within 4 hours, connected by device hash #FP-9042, transferring $2,400 to an unverified wallet in 40 seconds."</em>
          </p>
          <p>
            This eliminates guesswork for compliance officers, reduces customer support friction, and transforms fraud operations from reactive firefighting into deterministic pre-settlement defense.
          </p>
        </section>
      </article>

      {/* Closing Callout */}
      <div className="bg-[#0B0F1A] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold serif-heading text-white">
            Evaluate graph anomaly detection on your transaction data
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            We provide sample benchmark datasets and run dark shadow pilots with zero production impact.
          </p>
        </div>
        <button
          onClick={() => onNavigate('quote')}
          className="px-5 py-3 text-xs font-semibold text-[#0B0F1A] bg-[#2DD4BF] hover:bg-[#5eead4] rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Schedule Technical Pilot
        </button>
      </div>
    </div>
  );
};
