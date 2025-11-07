'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import { useAppTranslation } from '@/hooks/useAppTranslation';

const AIDashboard = dynamic(() => import('../AIDashboard'), { ssr: false });
const IoTDashboard = dynamic(() => import('../IoTDashboard'), { ssr: false });
const GlobalProjectMap = dynamic(() => import('../GlobalProjectMap'), { ssr: false });
const ProjectShowcase = dynamic(() => import('../ProjectShowcase'), { ssr: false });
const SustainabilityCommandCenter = dynamic(() => import('../SustainabilityCommandCenter'), { ssr: false });
const MarketIntelligenceCockpit = dynamic(() => import('../MarketIntelligenceCockpit'), { ssr: false });
const Web3NFTMinter = dynamic(() => import('../Web3NFTMinter'), { ssr: false });
const AIPersonalization = dynamic(() => import('../AIPersonalization'), { ssr: false });

const capabilities = [
  { id: 'ai-dashboard', name: 'AI Dashboard', component: AIDashboard, icon: '🤖', description: 'Predictive intelligence & analytics' },
  { id: 'iot-dashboard', name: 'IoT Dashboard', component: IoTDashboard, icon: '📊', description: 'Real-time sensor monitoring' },
  { id: 'project-map', name: 'Project Map', component: GlobalProjectMap, icon: '🗺️', description: 'Global project visualization' },
  { id: 'project-showcase', name: 'Project Showcase', component: ProjectShowcase, icon: '🏗️', description: 'Immersive 3D project tours' },
  { id: 'sustainability-command', name: 'Sustainability Command', component: SustainabilityCommandCenter, icon: '🌱', description: 'Carbon & ESG intelligence' },
  { id: 'market-intel', name: 'Market Intelligence', component: MarketIntelligenceCockpit, icon: '📈', description: 'ISO & PPA price radar' },
  { id: 'web3-nft', name: 'Web3 NFTs', component: Web3NFTMinter, icon: '⛓️', description: 'Blockchain certificates' },
  { id: 'ai-personalization', name: 'AI Personalization', component: AIPersonalization, icon: '🎯', description: 'Smart recommendations' },
];

const innovationWhy = [
  {
    title: 'AI copilots for every market operator',
    description: 'Blend OpenRouter intelligence with CES historical datasets to scenario-plan congestion, outages, and hedging moves.',
  },
  {
    title: 'Immersive field visibility',
    description: 'VR and IoT layers provide commissioning teams and executives with the same high-fidelity project status at any time.',
  },
  {
    title: 'Digital trust & ESG proof',
    description: 'Web3 credentials plus sustainability command centers assure counterparties and regulators of asset-level performance.',
  },
];

export default function InnovationSection() {
  const { t } = useAppTranslation();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleComponentChange = (componentId: string) => {
    if (activeComponent === componentId) {
      setActiveComponent(null);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveComponent(componentId);
      setIsTransitioning(false);
    }, 300);
  };

  const ActiveComponent = activeComponent ? capabilities.find(capability => capability.id === activeComponent)?.component : null;

  return (
    <section id="innovation" className="mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {t('innovation.title', 'Innovation Showcase')}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t(
              'innovation.description',
              'Explore the interactive modules that power CES, from AI-driven forecasting to VR project previews and blockchain-secured certifications.',
            )}
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
          {t('innovation.prompt', 'Tap a module to launch a live demo')}
        </p>
      </div>

      <motion.div layout className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 xl:grid-cols-8 xl:gap-6">
        {capabilities.map((capability, index) => (
          <motion.button
            key={capability.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleComponentChange(capability.id)}
            className={`flex h-full min-h-[150px] flex-col items-center justify-center gap-3 rounded-xl border px-5 py-6 text-center transition-all ${
              activeComponent === capability.id
                ? 'border-blue-400 bg-blue-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-3xl leading-none">{capability.icon}</div>
            <div className="text-sm font-semibold text-slate-900">
              {t(`innovation.capabilities.${capability.id}.name`, capability.name)}
            </div>
            <div className="text-xs text-slate-600">
              {t(`innovation.capabilities.${capability.id}.description`, capability.description)}
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeComponent && !isTransitioning && (
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
                {t('innovation.activeModule', 'Active module')}
              </p>
              <span className="text-sm font-semibold text-slate-700">
                {t(
                  `innovation.capabilities.${activeComponent}.name`,
                  capabilities.find(item => item.id === activeComponent)?.name ?? '',
                )}
              </span>
            </div>
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        )}
      </AnimatePresence>

      {!activeComponent && (
        <div className="mt-8 grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:grid-cols-3">
          {innovationWhy.map((item, index) => (
            <div key={item.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
                {t('innovation.whyItMatters', 'Why it matters')}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {t(`innovation.why.${index}.title`, item.title)}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {t(`innovation.why.${index}.description`, item.description)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
