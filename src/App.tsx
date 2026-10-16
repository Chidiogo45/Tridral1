import React, { useState, useEffect } from 'react';
import { PageId } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';

// 14 Dedicated Pages
import { HomePage } from './pages/HomePage.tsx';
import { PlatformPage } from './pages/PlatformPage.tsx';
import { HowItWorksPage } from './pages/HowItWorksPage.tsx';
import { ArchitecturePage } from './pages/ArchitecturePage.tsx';
import { CapabilitiesPage } from './pages/CapabilitiesPage.tsx';
import { RoadmapPage } from './pages/RoadmapPage.tsx';
import { PricingPage } from './pages/PricingPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { QuotePage } from './pages/QuotePage.tsx';
import { CompliancePage } from './pages/CompliancePage.tsx';
import { IntegrationsPage } from './pages/IntegrationsPage.tsx';
import { GraphCasePage } from './pages/GraphCasePage.tsx';
import { TrustCenterPage } from './pages/TrustCenterPage.tsx';
import { StatusPage } from './pages/StatusPage.tsx';

export default function App() {
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '').trim();
    const validPages: PageId[] = [
      'home',
      'platform',
      'how-it-works',
      'architecture',
      'capabilities',
      'roadmap',
      'pricing',
      'about',
      'quote',
      'compliance',
      'integrations',
      'case-for-graph',
      'trust-center',
      'status',
    ];
    if (validPages.includes(hash as PageId)) {
      return hash as PageId;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'platform':
        return <PlatformPage onNavigate={handleNavigate} />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case 'architecture':
        return <ArchitecturePage onNavigate={handleNavigate} />;
      case 'capabilities':
        return <CapabilitiesPage onNavigate={handleNavigate} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'quote':
        return <QuotePage onNavigate={handleNavigate} />;
      case 'compliance':
        return <CompliancePage onNavigate={handleNavigate} />;
      case 'integrations':
        return <IntegrationsPage onNavigate={handleNavigate} />;
      case 'case-for-graph':
        return <GraphCasePage onNavigate={handleNavigate} />;
      case 'trust-center':
        return <TrustCenterPage onNavigate={handleNavigate} />;
      case 'status':
        return <StatusPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-white via-[#F7F9FC] to-[#F1F5F9] text-[#0B0F1A]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 w-full">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
