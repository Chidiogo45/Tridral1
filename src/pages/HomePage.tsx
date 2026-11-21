import React from 'react';
import { PageId } from '../types.ts';
import { PAGE_PATHS } from '../routes.ts';
import { ComplianceCard } from '../components/ComplianceCard.tsx';
import { ClosingBand } from '../components/ClosingBand.tsx';
import { Reveal } from '../components/Reveal.tsx';
import { ArrowRightIcon, CheckIcon } from '../components/Icons.tsx';

interface HomePageProps {
  onNavigate: (page: PageId, options?: { walkthrough?: boolean }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNav = (
    page: PageId,
    e: React.MouseEvent,
    options?: { walkthrough?: boolean }
  ) => {
    e.preventDefault();
    onNavigate(page, options);
  };

  return (
    <div>
      {/* Block 1: Hero */}
      <section className="relative bg-[var(--blue-deep)] text-white pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 hero-grid-lines pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-[13px] font-medium text-white/80">
                Pre-launch · Product in development
              </div>

              <h1 className="text-[clamp(36px,5vw,60px)] font-extrabold text-white display-heading leading-[1.06]">
                Tridral checks your government proposal against the RFP before you submit.
              </h1>

              <p className="text-[17px] sm:text-lg text-white/85 leading-[1.6] max-w-xl">
                It lists every requirement in the RFP and shows which ones your draft covers, partly covers, or misses, with the page for each.
              </p>

              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={PAGE_PATHS.product}
                  onClick={(e) => handleNav('product', e)}
                  className="group h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-semibold text-[var(--blue-deep)] bg-white hover:bg-[var(--blue-soft)] rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap focus-ring"
                >
                  <span>See how it works</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <a
                  href={`${PAGE_PATHS['early-access']}?intent=walkthrough`}
                  onClick={(e) => handleNav('early-access', e, { walkthrough: true })}
                  className="h-12 inline-flex items-center justify-center gap-2 px-7 text-[15px] font-medium text-white bg-transparent hover:bg-white/10 border border-white/35 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap focus-ring"
                >
                  <span>Request a walkthrough</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="hero-card-perspective relative">
                <div
                  className="hidden lg:block absolute inset-0 translate-x-4 translate-y-4 rotate-[2.5deg] rounded-[28px] bg-white/12 border border-white/25 pointer-events-none"
                  aria-hidden="true"
                />

                <div
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D7F5E5] text-[#0B7A4B] text-xs font-semibold shadow-lg absolute -top-5 right-8 z-20 animate-chip-drift-a pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B7A4B]" />
                  <span>Addressed</span>
                </div>

                <div
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0CC] text-[#8A5A00] text-xs font-semibold shadow-lg absolute top-1/2 -left-6 z-20 animate-chip-drift-b pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A00]" />
                  <span>Partial</span>
                </div>

                <div
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE0DC] text-[#B42318] text-xs font-semibold shadow-lg absolute -bottom-4 right-12 z-20 animate-chip-drift-a pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B42318]" />
                  <span>Missing</span>
                </div>

                <div className="relative z-10 hero-card-tilted">
                  <ComplianceCard onViewFullReport={() => onNavigate('sample-report')} />
                </div>
              </div>
              <p className="text-xs text-white/75 text-right mono-data pt-2">
                Made-up RFP and draft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: The problem */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10">
        <Reveal>
          <div className="bg-white rounded-[28px] border border-[#E2E8F8] p-8 sm:p-10 space-y-6 card-soft-shadow">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold text-[var(--ink)] display-heading">
                A bid can be rejected before anyone reads it.
              </h2>
              <p className="text-[17px] text-[var(--text)] leading-[1.6]">
                Evaluators check a proposal against the RFP's rules first. A page limit that's exceeded, a form that's missing, or a requirement that's skipped can end a bid on a technicality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[var(--lilac)] px-5 py-4 text-[15px] font-semibold text-[var(--ink)]">
                Requirements are scattered across long documents.
              </div>
              <div className="rounded-2xl bg-[var(--sky)] px-5 py-4 text-[15px] font-semibold text-[var(--ink)]">
                Format rules are easy to miss while you finish the writing.
              </div>
              <div className="rounded-2xl bg-[var(--mint-tint)] px-5 py-4 text-[15px] font-semibold text-[var(--ink)]">
                Small teams rarely have a compliance department to catch it.
              </div>
            </div>

            <div>
              <a
                href={PAGE_PATHS['why-it-matters']}
                onClick={(e) => handleNav('why-it-matters', e)}
                className="text-[15px] font-semibold text-[var(--blue)] hover:underline focus-ring rounded-full px-1"
              >
                See real examples →
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Block 3: How it works */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Reveal>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold text-[var(--ink)] display-heading">
                From RFP to gap list in four steps.
              </h2>
              <a
                href={PAGE_PATHS.product}
                onClick={(e) => handleNav('product', e)}
                className="text-[15px] font-semibold text-[var(--blue)] hover:underline focus-ring rounded-full px-1 whitespace-nowrap"
              >
                Full walkthrough →
              </a>
            </div>

            <div className="relative">
              <div
                className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-[#DCE3F8] z-0"
                aria-hidden="true"
              >
                <div className="h-full w-full bg-[var(--blue)] step-connector-line" />
              </div>
              <div
                className="lg:hidden absolute left-6 top-6 bottom-6 w-[2px] bg-[#DCE3F8] z-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 relative z-10">
                {[
                  {
                    num: '01',
                    text: 'Tridral reads the RFP, keeping the text, tables, section headings, and page numbers.',
                    circle: 'bg-[var(--blue)] text-white',
                  },
                  {
                    num: '02',
                    text: 'It extracts the requirements, including page limits, file format, due dates, and required forms.',
                    circle: 'bg-[var(--blue)] text-white',
                  },
                  {
                    num: '03',
                    text: 'It checks the draft and marks each requirement Addressed, Partial, or Missing, with a quote and a page.',
                    circle: 'bg-[var(--blue)] text-white',
                  },
                  {
                    num: '04',
                    text: 'It ranks the gaps by risk and exports the full matrix to CSV.',
                    circle: 'bg-[var(--mint)] text-[var(--ink)]',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex lg:flex-col items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mono-data text-sm shrink-0 ring-4 ring-[var(--bg)] ${step.circle}`}
                    >
                      {step.num}
                    </div>
                    <div className="flex-1 bg-white rounded-[28px] border border-[#E2E8F8] p-6 card-soft-shadow w-full">
                      <p className="text-[15px] text-[var(--ink)] leading-[1.6]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Block 4: See it */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Reveal>
          <div className="bg-[var(--sky)]/65 border border-[#B5DDF5] rounded-[28px] p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-[clamp(26px,3.5vw,38px)] font-extrabold text-[var(--ink)] display-heading">
                See what a check looks like.
              </h2>
              <p className="text-[16px] text-[#1C354D] leading-[1.6]">
                The preview uses made-up data. This website does not accept your files.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={PAGE_PATHS['sample-report']}
                onClick={(e) => handleNav('sample-report', e)}
                className="group h-12 inline-flex items-center justify-center gap-2 px-6 text-sm font-semibold text-white bg-[var(--blue)] hover:bg-[#1447D4] rounded-full transition-colors cursor-pointer whitespace-nowrap focus-ring"
              >
                <span>Open the sample report</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={`${PAGE_PATHS['early-access']}?intent=walkthrough`}
                onClick={(e) => handleNav('early-access', e, { walkthrough: true })}
                className="h-12 inline-flex items-center justify-center px-6 text-sm font-semibold text-[var(--ink)] bg-white hover:bg-[var(--blue-soft)] border border-[#B5DDF5] rounded-full transition-colors cursor-pointer whitespace-nowrap focus-ring"
              >
                <span>Request a walkthrough call</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Block 5: Strengths and limits */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Reveal>
          <div className="space-y-6">
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold text-[var(--ink)] display-heading">
              What it's good at, and what it isn't.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--mint-tint)]/65 border border-[#ACE2C7] rounded-[28px] p-8 space-y-4">
                <h3 className="text-xl font-bold text-[var(--ink)] display-heading">
                  Good at
                </h3>
                <ul className="space-y-3 text-[15px] text-[var(--ink)]">
                  {[
                    'Putting every requirement in one place.',
                    'Showing the page behind every finding.',
                    'Catching format rules and required forms.',
                    'Giving a risk score you can explain.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckIcon className="w-4 h-4 text-[#0B7A4B] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="bg-white border border-[#E2E8F8] rounded-[28px] p-8 space-y-4"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="text-xl font-bold text-[var(--ink)] display-heading">
                  Isn't
                </h3>
                <ul className="space-y-3 text-[15px] text-[var(--text)]">
                  {[
                    "It doesn't write your proposal.",
                    "It isn't legal or compliance advice.",
                    'It can miss or misjudge a requirement, so findings need a human check.',
                    'It starts with federal-style PDF solicitations. Scanned or messy files may reduce accuracy.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] shrink-0 mt-2.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Block 6 & Block 7: Where Tridral is today + Who's building it */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 sm:pb-20">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div
              className="lg:col-span-8 bg-white rounded-[28px] border border-[#E2E8F8] p-8 space-y-5"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] display-heading">
                Where Tridral is today.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
                <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#EAEEFA] space-y-1">
                  <div className="text-xs font-semibold text-[var(--blue)]">Stage</div>
                  <div className="text-[var(--ink)]">Pre-launch. The product is in development.</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#EAEEFA] space-y-1">
                  <div className="text-xs font-semibold text-[var(--blue)]">Available now</div>
                  <div className="text-[var(--ink)]">This website, a sample report, and an early access list.</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#EAEEFA] space-y-1">
                  <div className="text-xs font-semibold text-[var(--blue)]">Next</div>
                  <div className="text-[var(--ink)]">A first working version for early access.</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#EAEEFA] space-y-1">
                  <div className="text-xs font-semibold text-[var(--blue)]">Business model</div>
                  <div className="text-[var(--ink)]">
                    Planned as a monthly subscription based on usage. Plans and prices will be announced before launch.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[var(--lilac)] rounded-[28px] p-8 flex flex-col justify-between gap-6 text-[var(--ink)]">
              <div className="space-y-3">
                <h2 className="text-2xl font-extrabold text-[var(--ink)] display-heading">
                  Who's building it.
                </h2>
                <p className="text-[16px] text-[#283148] leading-[1.6]">
                  Chidiogo Okolo, Founder. Backend developer building SaaS products.
                </p>
              </div>
              <div>
                <a
                  href={PAGE_PATHS.about}
                  onClick={(e) => handleNav('about', e)}
                  className="text-[15px] font-semibold text-[var(--blue)] hover:underline focus-ring rounded-full px-1"
                >
                  About →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Block 8: Closing */}
      <ClosingBand onNavigate={onNavigate} />
    </div>
  );
};
