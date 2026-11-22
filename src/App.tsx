import React, { useState, useEffect } from 'react';
import { PageId } from './types.ts';
import { PAGE_PATHS, resolveRouteFromLocation } from './routes.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { ProductsPage } from './pages/ProductsPage.tsx';
import { SolutionsPage } from './pages/SolutionsPage.tsx';
import { TechnologyPage } from './pages/TechnologyPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPolicyPage, TermsOfUsePage } from './pages/LegalPages.tsx';

const PAGE_META: Record<PageId, { title: string; description: string }> = {
  home: {
    title: 'Tridral | Intelligent Technology & Arlinex RFP Compliance',
    description:
      'Tridral is a technology company developing intelligent business solutions, including Arlinex, an AI-powered RFP compliance platform for small government contractors.',
  },
  products: {
    title: 'Products — Arlinex | Tridral',
    description:
      'Explore Arlinex, Tridral’s featured product in development for analyzing government RFP requirements and identifying proposal compliance gaps.',
  },
  solutions: {
    title: 'Solutions | Tridral',
    description:
      'Learn how Tridral addresses manual RFP compliance challenges faced by small government contractors through the intended Arlinex workflow.',
  },
  technology: {
    title: 'Technology | Tridral',
    description:
      'Review Tridral’s planned Microsoft Azure architecture across Document Intelligence, Azure OpenAI, Blob Storage, and cloud infrastructure.',
  },
  about: {
    title: 'About | Tridral',
    description:
      'Tridral’s mission, vision, and long-term direction in building practical intelligent technology for complex business operations.',
  },
  contact: {
    title: 'Contact | Tridral',
    description:
      'Connect with Tridral regarding technology partnerships, investor relations, and Arlinex opportunities.',
  },
  privacy: {
    title: 'Privacy Policy | Tridral',
    description: 'Privacy Policy for the Tridral public company website.',
  },
  terms: {
    title: 'Terms of Use | Tridral',
    description: 'Terms of Use for the Tridral public company website.',
  },
};

export default function App() {
  const initial = resolveRouteFromLocation(window.location.pathname, window.location.hash);
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);

  useEffect(() => {
    if (initial.redirectedFrom) {
      window.history.replaceState({ page: initial.page }, '', PAGE_PATHS[initial.page]);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveRouteFromLocation(window.location.pathname, window.location.hash);
      setCurrentPage(resolved.page);
      if (resolved.redirectedFrom) {
        window.history.replaceState({ page: resolved.page }, '', PAGE_PATHS[resolved.page]);
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

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    const targetUrl = PAGE_PATHS[page] || '/';

    if (window.location.pathname !== targetUrl || window.location.hash || window.location.search) {
      window.history.pushState({ page }, '', targetUrl);
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'solutions':
        return <SolutionsPage onNavigate={handleNavigate} />;
      case 'technology':
        return <TechnologyPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfUsePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172337]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main key={currentPage} className="flex-1 w-full animate-page-enter">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
