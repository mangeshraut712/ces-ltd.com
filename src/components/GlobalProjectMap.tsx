'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import type { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    id: 'guam-island-microgrid',
    name: 'Guam Island Microgrid Operations',
    type: 'microgrid',
    location: 'Hagåtña, Guam',
    coordinates: [13.4757, 144.7489],
    status: 'completed',
    co2Reduction: 21000,
    energyOutput: 95,
    description: 'Hybrid solar, storage, and diesel optimization for island resiliency.',
    startDate: '2020-10-01',
    completionDate: '2022-05-30',
  },
];

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
    name: 'Guam',
    offices: ['Hagåtña'],
    focus: ['Island grid operations', 'Disaster recovery planning'],
    highlight: 'Operates hybrid microgrids to ensure resilient power for island communities.',
  },
];

function MapComponent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);
  const projectTypes = Array.from(new Set(projects.map(project => project.type)));

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
              Interactive visualization of CES Ltd. programs across the United States, Canada, India, Japan, Mexico, Vietnam, and Guam.
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
