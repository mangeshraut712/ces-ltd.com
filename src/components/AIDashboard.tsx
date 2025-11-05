'use client';

import { useState, useEffect, useCallback, ChangeEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { useDashboardSettings } from '@/context/DashboardSettingsContext';
import DashboardSettingsControls from '@/components/settings/DashboardSettingsControls';

interface PredictionData {
  time: string;
  energyDemand: number;
  carbonEmission: number;
  efficiency: number;
  weatherImpact: number;
}

interface EnergyInsight {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface WeatherSnapshot {
  description: string;
  temperatureC: number;
  humidity: number;
  feelsLikeC: number;
  lastUpdated: string | null;
}

type AnalysisSource = 'openrouter' | 'fallback' | 'unknown';

interface LocationOption {
  id: string;
  label: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  summary: string;
  coverageNotes?: string[];
}

interface RegionOption {
  id: string;
  label: string;
  description: string;
  highlight: string;
  coverageTags: string[];
  locations: LocationOption[];
}

const regionOptions: RegionOption[] = [
  {
    id: 'united-states',
    label: 'United States',
    description:
      'Headquarters in Philadelphia with market operations across PJM, CAISO, ERCOT, ISO-NE, MISO, and NYISO.',
    highlight: '13,000 MW of assets managed across wholesale and retail programs.',
    coverageTags: ['PJM', 'CAISO', 'ERCOT', 'ISO-NE', 'MISO', 'NYISO'],
    locations: [
      {
        id: 'philadelphia-pa',
        label: 'Philadelphia, Pennsylvania (HQ)',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 39.9526,
        lon: -75.1652,
        summary: 'Corporate headquarters and PJM market analytics center.',
        coverageNotes: ['Demand response portfolio', 'Wholesale market advisory'],
      },
      {
        id: 'san-francisco-ca',
        label: 'San Francisco, California',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lon: -122.4194,
        summary: 'CAISO solar + storage commercialization programs.',
        coverageNotes: ['Solar + storage integration', 'Grid modernization pilots'],
      },
      {
        id: 'indianapolis-in',
        label: 'Indianapolis, Indiana',
        city: 'Indianapolis',
        state: 'IN',
        country: 'USA',
        lat: 39.7684,
        lon: -86.1581,
        summary: 'Midcontinent ISO operations and fleet performance monitoring.',
        coverageNotes: ['MISO wholesale operations', 'Thermal fleet optimization'],
      },
      {
        id: 'boston-ma',
        label: 'Boston, Massachusetts',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        lat: 42.3601,
        lon: -71.0589,
        summary: 'ISO-NE strategic advisory and offshore wind collaboration.',
        coverageNotes: ['Offshore wind analytics', 'Capacity market strategy'],
      },
      {
        id: 'washington-dc',
        label: 'Washington, D.C.',
        city: 'Washington',
        state: 'DC',
        country: 'USA',
        lat: 38.9072,
        lon: -77.0369,
        summary: 'Federal policy advocacy and FERC engagement.',
        coverageNotes: ['Policy advisory', 'Regulatory engagement'],
      },
      {
        id: 'austin-tx',
        label: 'Austin, Texas',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        lat: 30.2672,
        lon: -97.7431,
        summary: 'ERCOT storage optimization and retail program management.',
        coverageNotes: ['Storage optimization', 'Retail energy programs'],
      },
    ],
  },
  {
    id: 'canada',
    label: 'Canada',
    description: 'Market operations and asset management for Ontario and Atlantic markets.',
    highlight: 'Co-manages bids and settlements for large commercial portfolios in Ontario.',
    coverageTags: ['IESO', 'Ontario DER'],
    locations: [
      {
        id: 'toronto-on',
        label: 'Toronto, Ontario',
        city: 'Toronto',
        state: 'ON',
        country: 'Canada',
        lat: 43.6532,
        lon: -79.3832,
        summary: 'Wholesale market participation and renewable asset scheduling across IESO.',
        coverageNotes: ['Asset bid optimization', 'Regulatory compliance'],
      },
    ],
  },
  {
    id: 'india',
    label: 'India',
    description: 'Innovation lab and emerging technologies delivery hub serving APAC.',
    highlight: 'Supports grid modernization, e-mobility pilots, and energy storage policy.',
    coverageTags: ['Energy Storage', 'EV Readiness', 'Open Access'],
    locations: [
      {
        id: 'pune-mh',
        label: 'Pune, Maharashtra',
        city: 'Pune',
        state: 'MH',
        country: 'India',
        lat: 18.5204,
        lon: 73.8567,
        summary: 'R&D hub with real-time analytics for India’s renewable and storage assets.',
        coverageNotes: ['Policy support', 'R&D collaborations'],
      },
    ],
  },
  {
    id: 'japan',
    label: 'Japan',
    description: 'Tokyo office guiding deregulation, capacity markets, and microgrid pilots.',
    highlight: 'Advises utilities and C&I clients on the Japanese capacity market transition.',
    coverageTags: ['Capacity Market', 'Microgrids'],
    locations: [
      {
        id: 'tokyo',
        label: 'Shibuya-ku, Tokyo',
        city: 'Tokyo',
        country: 'Japan',
        lat: 35.6595,
        lon: 139.7005,
        summary: 'Supports bilingual stakeholder engagement and DER integration efforts.',
        coverageNotes: ['Bilingual advisory', 'Smart grid pilots'],
      },
    ],
  },
  {
    id: 'mexico',
    label: 'Mexico',
    description: 'Mexico City hub focusing on distributed energy, microgrids, and C&I markets.',
    highlight: 'Deploying microgrid resiliency programs for industrial clients.',
    coverageTags: ['Microgrids', 'C&I Strategy'],
    locations: [
      {
        id: 'mexico-city',
        label: 'Mexico City',
        city: 'Mexico City',
        country: 'Mexico',
        lat: 19.4326,
        lon: -99.1332,
        summary: 'Designing resilient microgrids and DER roadmaps for Latin American partners.',
        coverageNotes: ['Resiliency planning', 'DER interconnection'],
      },
    ],
  },
  {
    id: 'vietnam',
    label: 'Vietnam',
    description: 'Data operations and software delivery center supporting global analytics.',
    highlight: 'Provides round-the-clock telemetry and market intelligence processing.',
    coverageTags: ['Data Ops', 'Software Engineering'],
    locations: [
      {
        id: 'ho-chi-minh',
        label: 'Ho Chi Minh City',
        city: 'Ho Chi Minh City',
        country: 'Vietnam',
        lat: 10.8231,
        lon: 106.6297,
        summary: 'Centralizes global market data pipelines and visualization tooling.',
        coverageNotes: ['Telemetry processing', 'Analytics delivery'],
      },
    ],
  },
  {
    id: 'guam',
    label: 'Guam',
    description: 'Island grid asset management and remote operations.',
    highlight: 'Manages hybrid microgrids for remote resilience and energy independence.',
    coverageTags: ['Island Grids', 'Resilience'],
    locations: [
      {
        id: 'hagatna',
        label: 'Hagåtña, Guam',
        city: 'Hagåtña',
        country: 'Guam',
        lat: 13.4757,
        lon: 144.7489,
        summary: 'Remote monitoring and optimization of island microgrid assets.',
        coverageNotes: ['Microgrid command center', 'Disaster recovery planning'],
      },
    ],
  },
];

const defaultRegion = regionOptions[0];
const defaultLocation = defaultRegion.locations[0];

const mockPredictions: PredictionData[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  energyDemand: 200 + Math.random() * 100 + Math.sin(i / 4) * 50,
  carbonEmission: 80 + Math.random() * 40 - Math.sin(i / 4) * 20,
  efficiency: 85 + Math.random() * 10,
  weatherImpact: Math.random() * 30,
}));

const mockInsights: EnergyInsight[] = [
  {
    title: 'Energy Demand Forecast',
    value: '+15%',
    trend: 'up',
    description: 'Predicted increase in renewable energy demand by Q4 2025',
  },
  {
    title: 'Carbon Reduction',
    value: '-8%',
    trend: 'down',
    description: 'Improved efficiency from AI-optimized grid management',
  },
  {
    title: 'System Reliability',
    value: '99.7%',
    trend: 'stable',
    description: 'Maintains high uptime across global operations',
  },
  {
    title: 'Cost Savings',
    value: '$2.3M',
    trend: 'down',
    description: 'Projected annual savings from predictive maintenance',
  },
];

const sectorData = [
  { name: 'Solar', value: 40, color: '#F59E0B' },
  { name: 'Wind', value: 30, color: '#10B981' },
  { name: 'Hydro', value: 20, color: '#3B82F6' },
  { name: 'Other', value: 10, color: '#8B5CF6' },
];

export default function AIDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<'demand' | 'carbon' | 'efficiency'>('demand');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState<string[]>([]);
  const [analysisSource, setAnalysisSource] = useState<AnalysisSource>('unknown');
  const [analysisTimestamp, setAnalysisTimestamp] = useState<string | null>(null);
  const [weatherSnapshot, setWeatherSnapshot] = useState<WeatherSnapshot | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string>(defaultRegion.id);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(defaultLocation.id);

  const { convertTemperature, temperatureSuffix, dashboardSettings } = useDashboardSettings();

  const selectedRegion = useMemo(() => {
    return regionOptions.find(region => region.id === selectedRegionId) ?? defaultRegion;
  }, [selectedRegionId]);

  const selectedLocation = useMemo(() => {
    return (
      selectedRegion.locations.find(location => location.id === selectedLocationId) ??
      selectedRegion.locations[0] ??
      defaultLocation
    );
  }, [selectedRegion, selectedLocationId]);

  const handleRegionChange = (regionId: string) => {
    if (regionId === selectedRegionId) return;
    const region = regionOptions.find(item => item.id === regionId);
    if (!region) return;
    setSelectedRegionId(regionId);
    setSelectedLocationId(region.locations[0]?.id ?? defaultLocation.id);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocationId(event.target.value);
  };

  // Simulate AI analysis
  const runAIAnalysis = useCallback(async () => {
    if (!selectedLocation) {
      return;
    }

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      setLastError(null);
      setAnalysisSource('unknown');
      setPersonalizedSuggestions([]);

      const response = await fetch('/api/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userLocation: {
            lat: selectedLocation.lat,
            lon: selectedLocation.lon,
            city: `${selectedLocation.city}${selectedLocation.state ? `, ${selectedLocation.state}` : ''}`,
          },
          energyFocus: selectedMetric,
        }),
      });
      const data = await response.json();
      const suggestions = Array.isArray(data.suggestions)
        ? data.suggestions
        : typeof data.suggestions === 'string'
          ? data.suggestions
              .split('\n')
              .map((item: string) => item.replace(/^\d+[\).\s-]*/, '').trim())
              .filter(Boolean)
          : [];

      setPersonalizedSuggestions(
        suggestions.length > 0
          ? suggestions
          : ['AI analysis complete. Check predictive metrics for deeper insights.'],
      );
      setWeatherSnapshot(data.weather || null);
      setAnalysisSource(data.source ?? 'unknown');
      setAnalysisTimestamp(new Date().toISOString());
    } catch (error) {
      console.error('AI analysis failed:', error);
      setPersonalizedSuggestions([
        'AI analysis temporarily unavailable. Using cached predictions.',
      ]);
      setWeatherSnapshot(null);
      setAnalysisSource('fallback');
      setLastError('Unable to reach personalization services. Displaying cached metrics.');
    }

    setIsAnalyzing(false);
  }, [selectedMetric, selectedLocation]);

  useEffect(() => {
    const performAnalysis = async () => {
      await runAIAnalysis();
    };
    performAnalysis();
  }, [runAIAnalysis]);

  const getChartData = () => {
    switch (selectedMetric) {
      case 'demand':
        return mockPredictions.map(p => ({ time: p.time, value: p.energyDemand, label: 'Energy Demand (MW)' }));
      case 'carbon':
        return mockPredictions.map(p => ({ time: p.time, value: p.carbonEmission, label: 'Carbon Emission (tons)' }));
      case 'efficiency':
        return mockPredictions.map(p => ({ time: p.time, value: p.efficiency, label: 'Efficiency (%)' }));
      default:
        return [];
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">AI-Powered Predictive Dashboard</h3>
            <p className="text-gray-300">Real-time energy analytics with machine learning insights</p>
          </div>

          <div className="flex items-center space-x-4">
            {isAnalyzing ? (
              <div className="flex items-center space-x-2 text-blue-400">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                <span className="text-sm">AI Analyzing...</span>
              </div>
            ) : (
              <motion.button
                onClick={runAIAnalysis}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔮 Run AI Analysis
              </motion.button>
            )}
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="text-sm font-semibold text-blue-200 uppercase tracking-[0.3em] mb-2">
              Choose an operating region
            </p>
            <div className="flex flex-wrap gap-2">
              {regionOptions.map(region => (
                <motion.button
                  key={region.id}
                  onClick={() => handleRegionChange(region.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    selectedRegionId === region.id
                      ? 'border-white/70 bg-white/20 text-white shadow'
                      : 'border-white/20 bg-white/5 text-blue-100 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {region.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr,1fr]">
              <div>
                <label htmlFor="location-selector" className="text-xs uppercase tracking-[0.3em] text-blue-200">
                  Key hubs & states
                </label>
                <select
                  id="location-selector"
                  value={selectedLocationId}
                  onChange={handleLocationChange}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {selectedRegion.locations.map(location => (
                    <option key={location.id} value={location.id} className="text-slate-900">
                      {location.label}
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-xs text-blue-100">{selectedRegion.description}</p>
                <p className="mt-2 text-xs text-blue-200">{selectedRegion.highlight}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-xs text-blue-100">
                <p className="font-semibold text-white uppercase tracking-[0.3em]">Regional coverage</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedRegion.coverageTags.map(tag => (
                    <span key={tag} className="rounded-full bg-blue-500/20 px-3 py-1 text-[11px] text-blue-50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-blue-100">
            <p className="font-semibold text-white">Live weather & AI tuning</p>
            <p className="mt-2 text-xs">
              Weather, demand forecasts, and AI recommendations adjust instantly based on the location you select.
            </p>
            <p className="mt-3 text-xs">
              Use this to compare U.S. ISO territories, Canadian provinces, and CES innovation hubs in India, Japan,
              Mexico, Vietnam, and Guam.
            </p>
            <DashboardSettingsControls className="mt-4" />
          </div>
        </div>

        {/* Metric Selector */}
        <div className="flex space-x-4 mb-6">
          {[
            { key: 'demand', label: 'Energy Demand', color: 'from-yellow-500 to-orange-500' },
            { key: 'carbon', label: 'Carbon Tracking', color: 'from-green-500 to-teal-500' },
            { key: 'efficiency', label: 'System Efficiency', color: 'from-blue-500 to-indigo-500' },
          ].map(({ key, label, color }) => (
            <motion.button
              key={key}
              onClick={() => setSelectedMetric(key as typeof selectedMetric)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedMetric === key
                  ? `bg-gradient-to-r ${color} text-white shadow-lg`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <div className="grid gap-6 mb-6 lg:grid-cols-[2fr,1fr]">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-4">
              {selectedMetric === 'demand' && 'Energy Demand Prediction (24h)'}
              {selectedMetric === 'carbon' && 'Carbon Emission Tracking (24h)'}
              {selectedMetric === 'efficiency' && 'System Efficiency Trends (24h)'}
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="url(#colorGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-white">Live Weather Snapshot</h4>
                <span className="text-xs text-blue-100">{selectedLocation.label}</span>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-blue-100 uppercase tracking-[0.3em]">
                {temperatureSuffix}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-white">
                {weatherSnapshot
                  ? `${Math.round(convertTemperature(weatherSnapshot.temperatureC))}${temperatureSuffix}`
                  : '--'}
              </p>
              <p className="text-blue-200 text-sm">
                {weatherSnapshot?.description ?? 'Waiting for live data'}
              </p>
            </div>
            <p className="text-xs text-blue-100">{selectedLocation.summary}</p>
            <div className="grid grid-cols-2 gap-3">
              {dashboardSettings.showFeelsLike && (
                <div className="rounded-lg bg-white/10 p-3 text-sm text-gray-200">
                  <p className="text-xs uppercase tracking-wider text-blue-200">Feels Like</p>
                  <p className="text-lg font-semibold text-white">
                    {weatherSnapshot
                      ? `${Math.round(convertTemperature(weatherSnapshot.feelsLikeC))}${temperatureSuffix}`
                      : '--'}
                  </p>
                </div>
              )}
              {dashboardSettings.showHumidity && (
                <div className="rounded-lg bg-white/10 p-3 text-sm text-gray-200">
                  <p className="text-xs uppercase tracking-wider text-blue-200">Humidity</p>
                  <p className="text-lg font-semibold text-white">
                    {weatherSnapshot ? `${weatherSnapshot.humidity}%` : '--'}
                  </p>
                </div>
              )}
            </div>
            {dashboardSettings.showAnalysisMeta && (
              <div className="rounded-lg bg-black/30 p-3 text-xs text-gray-300">
                <p>
                  AI Source:{' '}
                  <span className="text-blue-200 font-semibold capitalize">{analysisSource}</span>
                </p>
                <p>
                  Last analyzed:{' '}
                  <span className="text-blue-100">
                    {analysisTimestamp ? new Date(analysisTimestamp).toLocaleString() : 'Pending'}
                  </span>
                </p>
                {weatherSnapshot?.lastUpdated && (
                  <p>
                    Weather updated: <span className="text-blue-100">{weatherSnapshot.lastUpdated}</span>
                  </p>
                )}
              </div>
            )}
            {selectedLocation.coverageNotes && selectedLocation.coverageNotes.length > 0 && (
              <div className="rounded-lg border border-white/20 bg-white/5 p-3 text-xs text-blue-100">
                <p className="font-semibold text-white uppercase tracking-[0.3em] mb-2">Operational focus</p>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.coverageNotes.map(note => (
                    <span key={note} className="rounded-full bg-blue-500/20 px-3 py-1 text-[11px] text-blue-50">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {lastError && (
              <p className="text-xs text-red-300 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2">
                {lastError}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* AI Insights */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-4">AI Predictive Insights</h4>
            <div className="space-y-4">
              {mockInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <h5 className="text-white font-semibold">{insight.title}</h5>
                    <p className="text-gray-400 text-sm">{insight.description}</p>
                  </div>
                  <div className={`text-2xl font-bold ${
                    insight.trend === 'up' ? 'text-green-400' :
                    insight.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {insight.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sector Distribution */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-4">Energy Sector Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {sectorData.map((sector) => (
                <div key={sector.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  ></div>
                  <span className="text-gray-300 text-sm">{sector.name}: {sector.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personalized AI Suggestions */}
        <AnimatePresence>
          {personalizedSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-6"
            >
              <h4 className="text-xl font-bold text-white mb-2">🎯 AI-Personalized Recommendations</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm leading-relaxed">
                {personalizedSuggestions.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
