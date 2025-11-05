'use client';

import AIChatbot from './AIChatbot';
import { DashboardSettingsProvider } from '@/context/DashboardSettingsContext';
import AboutSection from './sections/AboutSection';
import CareersSection from './sections/CareersSection';
import ContactSection from './sections/ContactSection';
import ExpertsSection from './sections/ExpertsSection';
import HeroSection from './sections/HeroSection';
import IndustriesSection from './sections/IndustriesSection';
import InnovationSection from './sections/InnovationSection';
import NewsSection from './sections/NewsSection';
import SolutionsSection from './sections/SolutionsSection';

interface HomePageProps {
  locale: string;
}

export default function HomePage({ locale }: HomePageProps) {
  return (
    <DashboardSettingsProvider>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <HeroSection locale={locale} />
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
    </DashboardSettingsProvider>
  );
}
