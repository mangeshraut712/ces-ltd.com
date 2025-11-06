'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useInnovationInsights } from '@/hooks/useInnovationInsights';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface Project {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'hydro' | 'construction' | 'storage' | 'microgrid' | 'software';
  location: string;
  coordinates: [number, number];
  status: 'completed' | 'in-progress' | 'planning';
  co2Reduction: number;
  energyOutput: number;
  description: string;
  startDate: string;
  completionDate?: string;
}

const projects: Project[] = [
  {
    id: 'usa-ca-solar-storage',
    name: 'CAISO Solar + Storage Portfolio',
    type: 'solar',
    location: 'Bakersfield, California, USA',
    coordinates: [35.3733, -119.0187],
    status: 'in-progress',
    co2Reduction: 82000,
    energyOutput: 420,
    description: 'Hybrid solar and battery systems dispatched across CAISO day-ahead and real-time markets.',
    startDate: '2023-04-01',
  },
  {
    id: 'usa-tx-storage',
    name: 'ERCOT Storage Optimization',
    type: 'storage',
    location: 'Austin, Texas, USA',
    coordinates: [30.2672, -97.7431],
    status: 'in-progress',
    co2Reduction: 45000,
    energyOutput: 350,
    description: '2-hour and 4-hour battery assets orchestrated for ancillary services and virtual power plant programs.',
    startDate: '2022-11-15',
  },
  {
    id: 'usa-ma-offshore',
    name: 'ISO-NE Offshore Wind Advisory',
    type: 'wind',
    location: 'Boston, Massachusetts, USA',
    coordinates: [42.3601, -71.0589],
    status: 'planning',
    co2Reduction: 68000,
    energyOutput: 600,
    description: 'Advisory for offshore wind integration, capacity market strategy, and transmission upgrades.',
    startDate: '2024-07-01',
  },
  {
    id: 'canada-on-asset',
    name: 'Ontario Market Operations Desk',
    type: 'software',
    location: 'Toronto, Ontario, Canada',
    coordinates: [43.6532, -79.3832],
    status: 'completed',
    co2Reduction: 38000,
    energyOutput: 290,
    description: 'Automated bid optimization and settlements for commercial generators in IESO.',
    startDate: '2021-06-01',
    completionDate: '2023-09-30',
  },
  {
    id: 'india-pune-innovation',
    name: 'India Energy Storage Innovation Lab',
    type: 'construction',
    location: 'Pune, Maharashtra, India',
    coordinates: [18.5204, 73.8567],
    status: 'in-progress',
    co2Reduction: 52000,
    energyOutput: 210,
    description: 'Grid edge R&D lab supporting electric mobility pilots and behind-the-meter storage.',
    startDate: '2023-02-10',
  },
  {
    id: 'japan-tokyo-microgrid',
    name: 'Tokyo Smart Microgrid Program',
    type: 'microgrid',
    location: 'Shibuya-ku, Tokyo, Japan',
    coordinates: [35.6595, 139.7005],
    status: 'planning',
    co2Reduction: 27000,
    energyOutput: 120,
    description: 'District-level microgrids balancing rooftop solar, storage, and EV charging.',
    startDate: '2025-01-01',
  },
  {
    id: 'mexico-cdmx-resilience',
    name: 'Mexico City Resilient Microgrids',
    type: 'microgrid',
    location: 'Mexico City, Mexico',
    coordinates: [19.4326, -99.1332],
    status: 'in-progress',
    co2Reduction: 33000,
    energyOutput: 140,
    description: 'Commercial and industrial microgrid rollout focused on power quality and resiliency.',
    startDate: '2023-08-20',
  },
  {
    id: 'vietnam-hcmc-data-ops',
    name: 'Vietnam Data Operations Center',
    type: 'software',
    location: 'Ho Chi Minh City, Vietnam',
    coordinates: [10.8231, 106.6297],
    status: 'completed',
    co2Reduction: 12000,
    energyOutput: 60,
    description: 'Centralized telemetry and analytics support for global markets and DER fleets.',
    startDate: '2021-03-15',
    completionDate: '2022-12-01',
  },
  {
    id: 'uae-dubai-hydrogen',
    name: 'Dubai Hydrogen-Ready Grid Program',
    type: 'construction',
    location: 'Dubai, United Arab Emirates',
    coordinates: [25.2048, 55.2708],
    status: 'in-progress',
    co2Reduction: 41000,
    energyOutput: 160,
    description:
      'Hydrogen blending pilots combining district cooling optimization, desalination, and large-scale storage readiness.',
    startDate: '2024-03-01',
  },
  {
    id: 'netherlands-north-sea-offshore',
    name: 'North Sea Offshore Wind Control Center',
    type: 'wind',
    location: 'The Hague, Netherlands',
    coordinates: [52.0705, 4.3007],
    status: 'planning',
    co2Reduction: 56000,
    energyOutput: 380,
    description:
      'Cross-border interconnector scheduling and offshore wind forecasting supporting Dutch and EU market coupling.',
    startDate: '2024-09-01',
  },
];

const projectTypeLabels: Record<Project['type'], string> = {
  solar: 'Solar',
  wind: 'Wind',
  hydro: 'Hydro',
  construction: 'Construction',
  storage: 'Storage',
  microgrid: 'Microgrid',
  software: 'Software & Analytics',
};

const projectTypeColors: Record<Project['type'], string> = {
  solar: '#f59e0b',
  wind: '#22d3ee',
  hydro: '#6366f1',
  construction: '#fb7185',
  storage: '#22c55e',
  microgrid: '#f97316',
  software: '#8b5cf6',
};

interface CountryProfile {
  name: string;
  offices: string[];
  focus: string[];
  highlight: string;
}

const countriesOfOperation: CountryProfile[] = [
  {
    name: 'United States',
    offices: ['Philadelphia, PA (HQ)', 'San Francisco, CA', 'Indianapolis, IN', 'Boston, MA', 'Washington, D.C.', 'Austin, TX'],
    focus: ['Wholesale & retail market operations', 'Energy storage optimization', 'Demand response and DER orchestration'],
    highlight: 'Third-party asset manager for 13,000+ MW across major ISOs (PJM, CAISO, ISO-NE, MISO, NYISO, ERCOT).',
  },
  {
    name: 'Canada',
    offices: ['Toronto, Ontario'],
    focus: ['IESO bid optimization', 'Regulatory advisory', 'Renewable fleet scheduling'],
    highlight: 'Supports commercial portfolios across Ontario with round-the-clock settlements and forecasting.',
  },
  {
    name: 'India',
    offices: ['Pune, Maharashtra'],
    focus: ['Energy storage R&D', 'E-mobility pilots', 'Policy support for emerging technologies'],
    highlight: 'Guides national storage roadmaps and implements open access strategies for industrial clients.',
  },
  {
    name: 'Japan',
    offices: ['Shibuya-ku, Tokyo'],
    focus: ['Capacity market readiness', 'Microgrid development', 'Bilingual regulatory advisory'],
    highlight: 'Advises utilities and corporates on deregulation strategy and DER aggregation.',
  },
  {
    name: 'Mexico',
    offices: ['Mexico City'],
    focus: ['Microgrid resilience', 'DER integration for C&I clients', 'Regulatory navigation'],
    highlight: 'Deploying resilient microgrids and DER roadmaps across Mexico and Latin America.',
  },
  {
    name: 'Vietnam',
    offices: ['Ho Chi Minh City'],
    focus: ['Telemetry processing', 'Software delivery', 'Data science support'],
    highlight: 'Global analytics center powering CES dashboards, reporting, and IoT services.',
  },
  {
    name: 'United Arab Emirates',
    offices: ['Dubai'],
    focus: ['Hydrogen-ready grid pilots', 'District cooling optimization', 'Energy storage integration'],
    highlight: 'Partnering with utilities on hydrogen blending, clean cooling, and dispatch optimization across the UAE.',
  },
  {
    name: 'Netherlands',
    offices: ['The Hague'],
    focus: ['Offshore wind coordination', 'Interconnector scheduling', 'Market coupling analytics'],
    highlight: 'Supports North Sea offshore wind fleets with cross-border balancing and European market insights.',
  },
];

function MapComponent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
  const projectTypes = Array.from(new Set(projects.map(project => project.type)));
  const insightTarget = selectedProject ?? projects[0];
  const energyByTypeData = useMemo(
    () =>
      projectTypes.map(type => {
        const relevant = projects.filter(project => project.type === type);
        const energy = relevant.reduce((sum, project) => sum + project.energyOutput, 0);
        const co2 = relevant.reduce((sum, project) => sum + project.co2Reduction, 0);
        return {
          type,
          label: projectTypeLabels[type],
          energy,
          co2,
          count: relevant.length,
        };
      }),
    [projectTypes],
  );

  const {
    data: projectInsights,
    loading: projectInsightsLoading,
    error: projectInsightsError,
    refresh: refreshProjectInsights,
  } = useInnovationInsights('project-map', {
    projectName: insightTarget?.name ?? 'Global portfolio',
    projectType: insightTarget?.type ?? 'renewable',
    status: insightTarget?.status ?? 'in-progress',
    region: insightTarget?.location ?? 'Global reach',
  });

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const L = await import('leaflet');
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      if (isMounted) {
        setMarkerIcon(icon);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // const getMarkerIcon = (type: string, status: string) => {
  //   let color = '#3B82F6'; // default blue
  //   if (status === 'completed') color = '#10B981'; // green
  //   else if (status === 'in-progress') color = '#F59E0B'; // yellow
  //   else if (status === 'planning') color = '#EF4444'; // red

  //   return `
  //     <div style="
  //       background-color: ${color};
  //       width: 20px;
  //       height: 20px;
  //       border-radius: 50%;
  //       border: 3px solid white;
  //       box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  //       display: flex;
  //       align-items: center;
  //       justify-content: center;
  //       font-size: 10px;
  //       color: white;
  //       font-weight: bold;
  //     ">${type.charAt(0).toUpperCase()}</div>
  //   `;
  // };

  return (
    <div className="w-full bg-gradient-to-b from-green-900 to-blue-900 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Global Project Map</h3>
            <p className="text-gray-300">
              Interactive visualization of CES Ltd. programs across the United States, Canada, India, Japan, Mexico,
              Vietnam, the United Arab Emirates, and the Netherlands.
            </p>
            <p className="text-blue-100 text-xs mt-2">
              Asset management, emerging technology pilots, and market operations spanning wholesale, retail, microgrid, and software services.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300">In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-300">Planning</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="h-96 rounded-lg overflow-hidden border border-white/20">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                className="leaflet-container"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markerIcon && projects.map((project) => (
                  <Marker
                    key={project.id}
                    position={project.coordinates}
                    icon={markerIcon}
                    eventHandlers={{
                      click: () => setSelectedProject(project),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-bold">{project.name}</h4>
                        <p className="text-sm">{project.location}</p>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <p className="text-sm font-semibold text-blue-600">
                          {project.energyOutput} MW | {project.co2Reduction.toLocaleString()} tons CO2/year
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Project Statistics</h4>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-gray-300 text-sm">Completed Projects</div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {projects.reduce((sum, p) => sum + p.energyOutput, 0)}
              </div>
              <div className="text-gray-300 text-sm">Total MW Capacity</div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {projects.reduce((sum, p) => sum + p.co2Reduction, 0).toLocaleString()}
              </div>
              <div className="text-gray-300 text-sm">Tons CO2 Reduced/Year</div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                  Portfolio Mix
                </p>
                <span className="text-[11px] text-blue-100">Energy output by type</span>
              </div>
              <div className="mt-4 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyByTypeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="label" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #cbd5f5',
                      borderRadius: '8px',
                      color: '#0f172a',
                    }}
                    formatter={(value: number, name) => [
                      `${value.toLocaleString()} ${name === 'energy' ? 'MW' : 'tons CO₂e'}`,
                      name === 'energy' ? 'Energy Output' : 'CO₂ Impact',
                    ]}
                    />
                    <Bar dataKey="energy" radius={[6, 6, 0, 0]}>
                      {energyByTypeData.map(item => (
                        <Cell key={item.type} fill={projectTypeColors[item.type]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-xs text-blue-100">
                {energyByTypeData.reduce((sum, item) => sum + item.count, 0)} projects tracked across{' '}
                {energyByTypeData.length} technology classes.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                    AI Delivery Highlights
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <span
                      className={`inline-flex items-center gap-2 text-xs ${
                        projectInsights?.source === 'openrouter' ? 'text-emerald-200' : 'text-blue-200'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          projectInsights?.source === 'openrouter' ? 'bg-emerald-400' : 'bg-blue-400'
                        }`}
                      />
                      {projectInsights?.source === 'openrouter' ? 'Live OpenRouter' : 'Fallback cache'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={refreshProjectInsights}
                  disabled={projectInsightsLoading}
                  className={`text-xs font-semibold rounded-full border px-3 py-1 transition ${
                    projectInsightsLoading
                      ? 'border-white/20 bg-white/5 text-blue-200 cursor-not-allowed'
                      : 'border-blue-400/40 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20'
                  }`}
                >
                  {projectInsightsLoading ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>

              {projectInsightsError && (
                <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-2 text-xs text-red-200">
                  {projectInsightsError}
                </p>
              )}

              {projectInsights ? (
                <div className="mt-3 space-y-3 text-xs text-blue-100 leading-relaxed">
                  <p className="text-sm text-white font-semibold">Summary</p>
                  <p>{projectInsights.summary}</p>
                  {projectInsights.highlights.length > 0 && (
                    <div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                        Highlights
                      </p>
                      <ul className="mt-2 space-y-1">
                        {projectInsights.highlights.map(item => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {projectInsights.actions.length > 0 && (
                    <div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                        Next Actions
                      </p>
                      <ul className="mt-2 space-y-1">
                        {projectInsights.actions.map(action => (
                          <li key={action} className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {projectInsights.metadata && typeof projectInsights.metadata === 'object' && (
                    <div className="mt-3 space-y-1 text-[11px] text-blue-100">
                      {Object.entries(projectInsights.metadata)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between gap-2">
                            <span className="uppercase tracking-[0.2em] text-blue-300">{key}</span>
                            <span className="text-white/80">
                              {typeof value === 'number' ? value.toLocaleString() : String(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                !projectInsightsLoading && (
                  <p className="mt-3 text-xs text-blue-100">
                    AI highlights will appear here once insights are generated.
                  </p>
                )
              )}
            </div>

            {/* Selected Project Details */}
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 rounded-lg p-4 border border-white/20"
              >
                <h5 className="text-white font-semibold mb-2">{selectedProject.name}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Type:</span>
                    <span className="text-white capitalize">{selectedProject.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className={`capitalize ${
                      selectedProject.status === 'completed' ? 'text-green-400' :
                      selectedProject.status === 'in-progress' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {selectedProject.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Energy Output:</span>
                    <span className="text-white">{selectedProject.energyOutput} MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">CO2 Reduction:</span>
                    <span className="text-white">{selectedProject.co2Reduction.toLocaleString()} tons/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Started:</span>
                    <span className="text-white">{new Date(selectedProject.startDate).toLocaleDateString()}</span>
                  </div>
                  {selectedProject.completionDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Completed:</span>
                      <span className="text-white">{new Date(selectedProject.completionDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-xs mt-3">{selectedProject.description}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Project Type Breakdown */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {projectTypes.map((type) => {
            const count = projects.filter(p => p.type === type).length;
            const totalEnergy = projects.filter(p => p.type === type).reduce((sum, p) => sum + p.energyOutput, 0);
            return (
              <div key={type} className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-white capitalize mb-1">{type}</div>
                <div className="text-gray-300 text-sm">{count} projects</div>
                <div className="text-gray-400 text-xs">{totalEnergy} MW total</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <h4 className="text-white font-semibold mb-4">Countries of Operation</h4>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {countriesOfOperation.map(country => (
              <div key={country.name} className="bg-white/10 rounded-xl border border-white/20 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">{country.name}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-blue-100 uppercase tracking-[0.3em]">
                    Active
                  </span>
                </div>
                <p className="text-xs text-blue-100 mt-2">{country.highlight}</p>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-white uppercase tracking-[0.3em]">Offices</p>
                  <ul className="mt-2 space-y-1 text-xs text-gray-200">
                    {country.offices.map(office => (
                      <li key={office}>{office}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-white uppercase tracking-[0.3em]">Focus</p>
                  <ul className="mt-2 space-y-1 text-xs text-gray-200">
                    {country.focus.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlobalProjectMap() {
  return <MapComponent />;
}
