import React, { useState, useEffect } from 'react';
import { PageId } from './types.ts';
import { PAGE_PATHS, resolveRouteFromLocation } from './routes.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { SampleReportPage } from './pages/SampleReportPage.tsx';
import { WhyItMattersPage } from './pages/WhyItMattersPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { RoadmapPage } from './pages/RoadmapPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { FaqPage } from './pages/FaqPage.tsx';
import { TrustCenterPage } from './pages/TrustCenterPage.tsx';
import { EarlyAccessPage } from './pages/EarlyAccessPage.tsx';

const PAGE_META: Record<PageId, { title: string; description: string }> = {
  home: {
    title: 'Tridral | Check your proposal against the RFP',
    description:
      'It lists every requirement in the RFP and shows which ones your draft covers, partly covers, or misses, with the page for each.',
  },
  product: {
    title: 'Product | Tridral',
    description: 'A walkthrough of what the product does, step by step.',
  },
  'sample-report': {
    title: 'Sample report | Tridral',
    description: 'An example of a check, on made-up data.',
  },
  'why-it-matters': {
    title: 'Why it matters | Tridral',
    description: 'Real cases and the size of the market, from public sources.',
  },
  pricing: {
    title: 'Pricing | Tridral',
    description: 'How Tridral is planned to make money.',
  },
  roadmap: {
    title: 'Roadmap | Tridral',
    description: "What we're building. Nothing here is available yet.",
  },
  about: {
    title: 'About | Tridral',
    description: "Why it exists and who it's for.",
  },
  faq: {
    title: 'FAQ | Tridral',
    description: 'Not yet. The product is in development.',
  },
  'trust-center': {
    title: 'Trust Center | Tridral',
    description:
      "Tridral is in development. This page describes how we're designing the product and what this website collects. We'll update it before launch.",
  },
  'early-access': {
    title: 'Join early access | Tridral',
    description:
      "Tell us which RFPs you respond to and how many proposals your team submits each year. We'll reach out as early access spots open.",
  },
};

export default function App() {
  const initial = resolveRouteFromLocation(
    window.location.pathname,
    window.location.hash,
    window.location.search
  );

  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);
  const [walkthroughPreselected, setWalkthroughPreselected] = useState<boolean>(
    initial.walkthroughIntent
  );

  // Clean up redirected legacy URLs (/platform, /how-it-works, /capabilities, etc.)
  useEffect(() => {
    if (initial.redirectedFrom) {
      const targetUrl =
        PAGE_PATHS[initial.page] +
        (initial.walkthroughIntent ? '?intent=walkthrough' : '');
      window.history.replaceState({ page: initial.page }, '', targetUrl);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRouteFromLocation(
        window.location.pathname,
        window.location.hash,
        window.location.search
      );
      setCurrentPage(resolved.page);
      setWalkthroughPreselected(resolved.walkthroughIntent);
      if (resolved.redirectedFrom) {
        const targetUrl =
          PAGE_PATHS[resolved.page] +
          (resolved.walkthroughIntent ? '?intent=walkthrough' : '');
        window.history.replaceState({ page: resolved.page }, '', targetUrl);
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    const meta = PAGE_META[currentPage] || PAGE_META.home;
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, [currentPage]);

  const handleNavigate = (page: PageId, options?: { walkthrough?: boolean }) => {
    const isWalkthrough = Boolean(options?.walkthrough);
    setCurrentPage(page);
    setWalkthroughPreselected(page === 'early-access' && isWalkthrough);

    const basePath = PAGE_PATHS[page] || '/';
    const targetUrl =
      page === 'early-access' && isWalkthrough ? `${basePath}?intent=walkthrough` : basePath;

    if (window.location.pathname + window.location.search !== targetUrl || window.location.hash) {
      window.history.pushState({ page, walkthrough: isWalkthrough }, '', targetUrl);
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'product':
        return <ProductPage onNavigate={handleNavigate} />;
      case 'sample-report':
        return <SampleReportPage onNavigate={handleNavigate} />;
      case 'why-it-matters':
        return <WhyItMattersPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FaqPage onNavigate={handleNavigate} />;
      case 'trust-center':
        return <TrustCenterPage onNavigate={handleNavigate} />;
      case 'early-access':
        return (
          <EarlyAccessPage
            onNavigate={handleNavigate}
            preselectWalkthrough={walkthroughPreselected}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col tridral-canvas-gradient text-[var(--text)]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main key={currentPage} className="flex-1 w-full animate-page-enter">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
