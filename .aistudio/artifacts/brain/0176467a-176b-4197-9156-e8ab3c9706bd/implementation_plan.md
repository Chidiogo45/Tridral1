# Tridral — Real-Time Transaction Graph AI Detection Platform

Tridral is a B2B SaaS platform delivering pre-settlement AI fraud and transaction-anomaly detection for digital banks, fintechs, and payment processors. This project builds a multi-page marketing website with an interactive transaction-graph simulation playground, live flag product mockups, animated data-flow architecture, and 14 dedicated pages.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed during Phase 1 clarification:
> - **Interactive Scenario Switcher & Live Graph Inspector**: Included on the Platform and Capabilities views so visitors can toggle realistic fraud patterns (Coordinated Mule Network, Synthetic Identity Cluster, Account Takeover Velocity, and Legitimate Baseline) and inspect node relationships and risk scores in real time.
> - **Quote & Pilot Request Flow**: Submissions transition to a structured confirmation view presenting the 4-phase pilot onboarding timeline (Pipeline Audit → Sandbox API Integration → Shadow Evaluation Run → Pre-Settlement Enforcement).

- **Navigation & Routing Model**: Client-side multi-page routing with URL hash synchronization (`/#platform`, `/#capabilities`, `/#pricing`, etc.) allowing direct link sharing, browser history back/forward navigation, and seamless zero-flash page transitions without server redirects.
- **Logo Mark & Visual Identity**: A geometric network junction mark (three interconnected nodes forming a triangle core) consistently rendered across top bar, favicon SVG, hero card chrome, and footer.

***

## 1. Overview & Core Concept

- **What It Does**: Explains and demonstrates Tridral's core capability: connecting directly to transaction pipelines via low-latency API to model transactions as a living entity graph, detecting coordinated mule networks, synthetic IDs, and account takeovers before funds settle.
- **Target Audience**: Chief Risk Officers, Heads of Fraud, Engineering Leads, and Compliance Officers at global fintechs, challenger banks, and payment orchestration platforms.
- **Key Value**: Replaces brittle static rule trees with sub-50ms multi-hop graph neural reasoning, reducing false positives while catching multi-account collusion invisible to isolated point checks.

***

## 2. User Experience & Visual Design

### Key User Flows
1. **Discovery & First Impression (Home)**:
   - Sticky navigation with brand mark, 4 key section links (`Platform`, `How It Works`, `Capabilities`, `Pricing`), and primary `"Request Pilot"` CTA.
   - Hero split: Left side features confident, direct value proposition with serif headline and zero generic buzzwords. Right side showcases the **Live Flag UI Card** with animated SVG graph nodes, a pulsed alert node, human-readable detection summary, confidence meter, and action status.
   - Capability snapshot strip (`Detect`, `Correlate`, `Act`), Problem Breakdown, 4-step mechanism preview, audience segments, and closing pilot prompt.
2. **Interactive Technical Evaluation (Platform & Capabilities)**:
   - Scenario switcher allowing technical visitors to inspect four fraud vectors. Clicking a scenario updates the graph topology, highlighting suspect device sharing, velocity vectors, and risk attribution.
   - Dedicated pages for each of the 4 core detection pillars with concrete mechanisms (not just benefit bullets).
3. **Architecture & Engineering Proof (Architecture)**:
   - Data-flow diagram with animated SVG packet streams moving through Ingestion API → Graph Correlation Engine → ML Detection Models → Risk Scoring → Pre-Settlement Webhook.
4. **Commercial & Compliance Evaluation (Pricing, Compliance, Trust Center, About)**:
   - Transparent usage-based pricing framework (per transaction volume) with a dynamic volume estimator calculator and direct pilot booking.
   - Compliance & AML/CFT alignment specifically crafted for compliance officers.
   - Complete Trust Center covering security, data sovereignty, and responsible AI.
   - Founder note on the genesis of transaction-graph detection.
5. **Operational Confidence (Integrations & Status Page)**:
   - Real-world integration topology with core banking and payment rails.
   - Real-time status page stub detailing API uptime, p99 latency benchmarks, and component health.
6. **Conversion (Get a Quote / Request Pilot)**:
   - Comprehensive qualification form (company size, primary fraud vector, timeline, architecture notes) with validation and confirmation presenting the pilot rollout timeline.

### Visual Identity & Theme
- **Color Tokens**:
  - `Canvas / Off-White`: `#FFFFFF` and `#F7F9FC`
  - `Electric Blue (Primary)`: `#2F5FFF`
  - `Mint / Teal (Accent & Graph Nodes)`: `#2DD4BF`
  - `Dark Navy / Charcoal`: `#0B0F1A`
  - `Muted Slate`: `#5B6472`
  - `Risk Amber / Red`: `#F59E0B` / `#EF4444`
- **Typography**:
  - Display / Hero Headlines: Classic modern serif (`Fraunces` / `Lora`) for institutional trust and intellectual weight.
  - Body, Navigation, UI & Forms: Crisp neo-grotesque sans-serif (`Inter` / `Plus Jakarta Sans`).
  - Numbers, Code & Metrics: Monospace tabular numerals (`JetBrains Mono` / `font-mono tabular-nums`).
- **Anti-Slop Restraint**:
  - Zero generic floating gradient blobs or stock corporate illustrations.
  - Clean unboxed metadata with typographic dot separators (`·`).
  - Single-elevation card depth with subtle hairline borders (`border border-slate-200/80`).
  - Natural editorial numbering (`01. Ingestion`, `02. Correlation`).

***

## 3. Key Product Decisions & Trade-Offs

- **Single-Page Application with 14 Dedicated Full Pages vs. Infinite Scroll**:
  - *Chosen*: Dedicated page router with top-bar active indicator and instant smooth scroll-to-top on route change.
  - *Why*: The brief explicitly calls for a 14-page multi-page site where each page (e.g. Architecture, Compliance, Case for Graph Detection, Trust Center, Status) has room to deliver complete, authoritative content without cluttering the homepage.
- **Interactive SVG Graph Visualization vs. Canvas/WebGL**:
  - *Chosen*: Responsive SVG network renderer with physics-calculated node positions and Motion transitions.
  - *Why*: Perfectly sharp at all DPIs, lightweight (<15KB overhead), zero external canvas library bloat, accessible DOM elements, and seamless responsive reflow down to 375px mobile.
- **Form State Handling with Local Session Persistence**:
  - *Chosen*: Form inputs validate in real time, store drafts safely in memory, and transition cleanly into the onboarding roadmap upon submission.

***

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Tridral App                               │
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                         Header & Top Bar                           │ │
│ │  [Brand Junction Mark]  ·  [Nav Links (4-5)]  ·  [Request Pilot]   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                  │                                     │
│                                  ▼                                     │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                        Client Route Manager                        │ │
│ │  (Supports 14 Dedicated Pages: Home, Platform, How It Works,       │ │
│ │   Architecture, Capabilities, Roadmap, Pricing, About, Quote,      │ │
│ │   Compliance, Integrations, Graph Case, Trust Center, Status)       │ │
│ └──────────────────────────────────┬─────────────────────────────────┘ │
│                                    │                                   │
│           ┌────────────────────────┼────────────────────────┐          │
│           ▼                        ▼                        ▼          │
│ ┌───────────────────┐    ┌───────────────────┐    ┌──────────────────┐ │
│ │  Live Flag Card   │    │ Interactive Graph │    │  Architecture    │ │
│ │  - 4-node cluster │    │ Simulation Engine │    │  Flow Animator   │ │
│ │  - Radar pulse    │    │ - 4 Fraud Scenarios│   │  - Pipeline flow │ │
│ │  - Meter + status │    │ - Node inspector  │    │  - Moving packets│ │
│ └───────────────────┘    └───────────────────┘    └──────────────────┘ │
│                                    │                                   │
│                                    ▼                                   │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                         Footer Navigation                          │ │
│ │  [All 14 Verified Live Links · Trust · Compliance · Status · API]   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping
- `App.tsx`: Central state holding `currentPage`, navigation drawer state, interactive simulation scenario state, and form submissions.
- `Navbar.tsx`: Sticky navigation following the Top Bar Contract (1-line brand wordmark + junction icon, concise nav items, mobile hamburger drawer with fluid slide/fade, active indicator).
- `LiveFlagCard.tsx`: Reusable component demonstrating pre-settlement alert with animated nodes, radar pulsing effect, confidence gauge, and actionable tag.
- `InteractiveGraphSandbox.tsx`: Live playground allowing users to toggle between Mule Rings, Synthetic IDs, Velocity Hijacks, and Normal Traffic with node inspection cards.
- `ArchitectureFlow.tsx`: Technical visual showing data packets flowing continuously from Ingestion to Decision Webhooks.
- `Footer.tsx`: Comprehensive, zero-dead-link footer connecting all 14 pages with category grouping.

***

## 5. Build & Verification Steps

1. **Environment Configuration**: Create `.npmrc` with `legacy-peer-deps=true`. Verify `metadata.json` has app title & description.
2. **Typography & Styling Setup**: Configure Google Fonts (`Fraunces` and `Inter`) in `index.html` and Tailwind styling in `src/index.css`.
3. **Modular Page Architecture**: Build out all 14 comprehensive page components with real, articulate copy aligned with the brief's tone (plain, confident, direct).
4. **Interactive Component Rigor**: Implement `LiveFlagCard`, `InteractiveGraphSandbox`, `ArchitectureFlow`, dynamic pricing calculator, and the verified pilot intake form.
5. **Responsive Validation**: Test breakpoints at 375px (mobile), 768px (tablet), 1024px (laptop), and 1440px+ (desktop).
6. **Compilation & Build**: Run `compile_applet` and local check to guarantee zero runtime or build errors.
