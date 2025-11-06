'use client';

import dynamic from 'next/dynamic';
import { DashboardSettingsProvider } from '@/context/DashboardSettingsContext';
import PrimaryNavigation from '@/components/layout/PrimaryNavigation';
import SiteFooter from '@/components/layout/SiteFooter';
import AboutSection from './sections/AboutSection';
import CareersSection from './sections/CareersSection';
import ContactSection from './sections/ContactSection';
import HeroSection from './sections/HeroSection';
import IndustriesSection from './sections/IndustriesSection';
import InnovationSection from './sections/InnovationSection';
import ExpertsSection from './sections/ExpertsSection';
import NewsSection from './sections/NewsSection';
import SolutionsSection from './sections/SolutionsSection';

const AIChatbot = dynamic(() => import('./AIChatbot'), { ssr: false });

export default function HomePage() {
  return (
    <DashboardSettingsProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <PrimaryNavigation />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <HeroSection />
            <AboutSection />
            <SolutionsSection />
            <IndustriesSection />
            <InnovationSection />
            <ExpertsSection />
            <NewsSection />
            <CareersSection />
            <ContactSection />
            <AIChatbot />
          </div>
        </main>
        <SiteFooter />
      </div>
    </DashboardSettingsProvider>
  );
}
