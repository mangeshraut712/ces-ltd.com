'use client';

import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Sphere, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

type ProjectStatus = 'completed' | 'in-progress' | 'planning';
type ProjectType =
  | 'solar'
  | 'wind'
  | 'hydro'
  | 'construction'
  | 'storage'
  | 'microgrid'
  | 'software';

interface Project {
  id: string;
  name: string;
  type: ProjectType;
  region: string;
  country: string;
  location: string;
  status: ProjectStatus;
  co2Reduction: number;
  energyOutput: number;
  startYear: number;
  summary: string;
  technologies: string[];
  focusAreas: string[];
  isoTags: string[];
}

const projectCatalog: Project[] = [
  {
    id: 'usa-ca-solar-storage',
    name: 'CAISO Solar + Storage Portfolio',
    type: 'solar',
    region: 'United States',
    country: 'USA',
    location: 'Bakersfield, California',
    status: 'in-progress',
    co2Reduction: 82000,
    energyOutput: 420,
    startYear: 2023,
    summary:
      'Hybrid solar and battery systems orchestrated for CAISO day-ahead and real-time markets.',
    technologies: ['Utility-scale PV', 'Battery storage', 'DERMS'],
    focusAreas: ['Renewable integration', 'Market bidding automation'],
    isoTags: ['CAISO'],
  },
  {
    id: 'usa-tx-storage',
    name: 'ERCOT Storage Optimization',
    type: 'storage',
    region: 'United States',
    country: 'USA',
    location: 'Austin, Texas',
    status: 'in-progress',
    co2Reduction: 45000,
    energyOutput: 350,
    startYear: 2022,
    summary:
      'Two and four-hour battery assets dispatched for ancillary services and retail flexibility programs.',
    technologies: ['Battery storage', 'Real-time optimization', 'AI bidding'],
    focusAreas: ['VPP orchestration', 'Retail program management'],
    isoTags: ['ERCOT'],
  },
  {
    id: 'usa-ma-offshore',
    name: 'ISO-NE Offshore Wind Advisory',
    type: 'wind',
    region: 'United States',
    country: 'USA',
    location: 'Boston, Massachusetts',
    status: 'planning',
    co2Reduction: 68000,
    energyOutput: 600,
    startYear: 2024,
    summary: 'Advisory for offshore wind integration, capacity market strategy, and transmission upgrades.',
    technologies: ['Offshore wind', 'Capacity market analytics'],
    focusAreas: ['Transmission planning', 'Bid optimization'],
    isoTags: ['ISO-NE'],
  },
  {
    id: 'canada-on-ops',
    name: 'Ontario Market Operations Desk',
    type: 'software',
    region: 'Canada',
    country: 'Canada',
    location: 'Toronto, Ontario',
    status: 'completed',
    co2Reduction: 38000,
    energyOutput: 290,
    startYear: 2021,
    summary: 'Automated bid optimization and settlements for commercial generators in IESO.',
    technologies: ['Bid automation', 'Settlement engine'],
    focusAreas: ['Wholesale operations', 'Regulatory compliance'],
    isoTags: ['IESO'],
  },
  {
    id: 'india-storage-lab',
    name: 'India Energy Storage Innovation Lab',
    type: 'construction',
    region: 'India',
    country: 'India',
    location: 'Pune, Maharashtra',
    status: 'in-progress',
    co2Reduction: 52000,
    energyOutput: 210,
    startYear: 2023,
    summary: 'R&D lab supporting grid modernization, e-mobility pilots, and energy storage policy.',
    technologies: ['Battery analytics', 'EV infrastructure', 'Microgrid pilots'],
    focusAreas: ['Storage R&D', 'Policy support'],
    isoTags: ['India'],
  },
  {
    id: 'japan-tokyo-microgrid',
    name: 'Tokyo Smart Microgrid Program',
    type: 'microgrid',
    region: 'Japan',
    country: 'Japan',
    location: 'Shibuya-ku, Tokyo',
    status: 'planning',
    co2Reduction: 27000,
    energyOutput: 120,
    startYear: 2025,
    summary: 'District-level microgrids balancing rooftop solar, storage, and EV charging.',
    technologies: ['Microgrid control', 'DER scheduling', 'EV smart charging'],
    focusAreas: ['Urban resilience', 'DER aggregation'],
    isoTags: ['Japan'],
  },
  {
    id: 'mexico-microgrid',
    name: 'Mexico City Resilient Microgrids',
    type: 'microgrid',
    region: 'Mexico',
    country: 'Mexico',
    location: 'Mexico City',
    status: 'in-progress',
    co2Reduction: 33000,
    energyOutput: 140,
    startYear: 2023,
    summary:
      'Commercial and industrial microgrid rollout focused on power quality and grid independence.',
    technologies: ['Microgrids', 'DER planning', 'Power quality'],
    focusAreas: ['Resilience', 'C&I strategy'],
    isoTags: ['Mexico'],
  },
  {
    id: 'vietnam-data-ops',
    name: 'Vietnam Data Operations Center',
    type: 'software',
    region: 'Vietnam',
    country: 'Vietnam',
    location: 'Ho Chi Minh City',
    status: 'completed',
    co2Reduction: 12000,
    energyOutput: 60,
    startYear: 2021,
    summary:
      'Centralized telemetry and analytics support delivering data pipelines for global markets.',
    technologies: ['Telemetry', 'Analytics', 'API integration'],
    focusAreas: ['Data ops', 'Software delivery'],
    isoTags: ['APAC'],
  },
  {
    id: 'guam-island-microgrid',
    name: 'Guam Island Microgrid Operations',
    type: 'microgrid',
    region: 'Guam',
    country: 'Guam',
    location: 'Hagåtña',
    status: 'completed',
    co2Reduction: 21000,
    energyOutput: 95,
    startYear: 2020,
    summary: 'Hybrid solar, storage, and diesel optimization ensuring resilient island power.',
    technologies: ['Hybrid microgrids', 'Diesel optimization', 'Solar + storage'],
    focusAreas: ['Island resiliency', 'Disaster recovery'],
    isoTags: ['Island Grid'],
  },
];

const regionFilters = [
  'All',
  'United States',
  'Canada',
  'India',
  'Japan',
  'Mexico',
  'Vietnam',
  'Guam',
] as const;

const statusColors: Record<ProjectStatus, string> = {
  completed: 'text-green-300',
  'in-progress': 'text-yellow-300',
  planning: 'text-red-300',
};

const typeLabels: Record<ProjectType, string> = {
  solar: 'Solar',
  wind: 'Wind',
  hydro: 'Hydro',
  construction: 'Construction',
  storage: 'Storage',
  microgrid: 'Microgrid',
  software: 'Software & Analytics',
};

const getProjectPosition = (index: number, total: number): [number, number, number] => {
  const columns = Math.ceil(Math.sqrt(total));
  const spacing = 6;
  const x = (index % columns) * spacing - ((columns - 1) * spacing) / 2;
  const z = Math.floor(index / columns) * spacing - (Math.ceil(total / columns) - 1) * spacing / 2;
  return [x, 0, z];
};

function ProjectModel({ project }: { project: Project }) {
  const getModelByType = () => {
    switch (project.type) {
      case 'solar':
        return (
          <group>
            {Array.from({ length: 12 }, (_, i) => (
              <Box
                key={i}
                position={[((i % 4) - 1.5) * 1.8, 0, (Math.floor(i / 4) - 0.5) * 1.8]}
                args={[1.5, 0.08, 1]}
                material-color="#3B82F6"
              />
            ))}
            <Cylinder position={[0, -1, 0]} args={[0.1, 0.1, 2]} material-color="#6B7280" />
          </group>
        );
      case 'wind':
        return (
          <group>
            <Cylinder position={[0, -1.5, 0]} args={[0.25, 0.25, 3]} material-color="#D1D5DB" />
            {Array.from({ length: 3 }, (_, i) => (
              <Box
                key={i}
                rotation={[0, (i * Math.PI * 2) / 3, 0]}
                args={[0.08, 2.5, 0.4]}
                material-color="#F9FAFB"
              />
            ))}
          </group>
        );
      case 'hydro':
        return (
          <group>
            <Box position={[0, -1, 0]} args={[5, 2.5, 1]} material-color="#8B5CF6" />
            <Box position={[0, 0.5, -0.5]} args={[4.5, 1, 0.4]} material-color="#2563EB" />
            <Cylinder position={[-1.5, -2, 0]} args={[0.4, 0.4, 1]} material-color="#E5E7EB" />
            <Cylinder position={[1.5, -2, 0]} args={[0.4, 0.4, 1]} material-color="#E5E7EB" />
          </group>
        );
      case 'construction':
        return (
          <group>
            <Box position={[0, -2, 0]} args={[4, 1, 4]} material-color="#374151" />
            <Box position={[0, 0, 0]} args={[3.2, 3.5, 3.2]} material-color="#9CA3AF" />
            {Array.from({ length: 8 }, (_, i) => (
              <Box
                key={i}
                position={[
                  ((i % 4) - 1.5) * 0.7,
                  Math.floor(i / 4) * 0.8 - 0.6,
                  1.65,
                ]}
                args={[0.4, 0.4, 0.05]}
                material-color="#60A5FA"
              />
            ))}
            <Box position={[0, 2.2, 0]} args={[2.5, 0.12, 1.8]} material-color="#FBBF24" />
          </group>
        );
      case 'storage':
        return (
          <group>
            {Array.from({ length: 6 }, (_, i) => (
              <Box
                key={i}
                position={[((i % 3) - 1) * 1.5, Math.floor(i / 3) * 1.1 - 0.5, 0]}
                args={[1.2, 1, 1.2]}
                material-color="#10B981"
              />
            ))}
            <Box position={[0, 1.5, 0]} args={[3.6, 0.1, 1.3]} material-color="#14B8A6" />
          </group>
        );
      case 'microgrid':
        return (
          <group>
            {Array.from({ length: 4 }, (_, i) => (
              <Box
                key={i}
                position={[((i % 2) - 0.5) * 2.2, -1, Math.floor(i / 2) * 2.2 - 1]}
                args={[1.4, 1.2, 1.4]}
                material-color="#F97316"
              />
            ))}
            <Cylinder position={[0, -0.2, 0]} args={[0.1, 0.1, 2]} material-color="#FCD34D" />
            <Box position={[0, 0.8, 0]} args={[2.8, 0.08, 2.8]} material-color="#FDE68A" />
            <Sphere position={[0, 1.4, 0]} args={[0.4]} material-color="#F59E0B" />
          </group>
        );
      case 'software':
        return (
          <group>
            {Array.from({ length: 3 }, (_, i) => (
              <Box
                key={i}
                position={[0, i * 1.1 - 1, 0]}
                args={[2.2, 1, 1.2]}
                material-color="#6366F1"
              />
            ))}
            <Box position={[0, 0.3, 0.65]} args={[2.1, 0.4, 0.05]} material-color="#1E1E2E" />
            <Box position={[0, 1.4, 0.65]} args={[2.1, 0.4, 0.05]} material-color="#1E1E2E" />
          </group>
        );
      default:
        return <Sphere args={[1]} material-color="#E5E7EB" />;
    }
  };

  const statusColor = () => {
    switch (project.status) {
      case 'completed':
        return '#22C55E';
      case 'in-progress':
        return '#F59E0B';
      case 'planning':
        return '#EF4444';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <group>
      {getModelByType()}
      <Sphere position={[0, 3, 0]} args={[0.2]} material-color={statusColor()} />
      <Text position={[0, 3.5, 0]} fontSize={0.32} color="white" anchorX="center" anchorY="middle">
        {project.name}
      </Text>
    </group>
  );
}

export default function ProjectShowcase() {
  const [selectedRegion, setSelectedRegion] = useState<(typeof regionFilters)[number]>('All');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    projectCatalog[0]?.id ?? null,
  );

  const visibleProjects = useMemo(
    () =>
      selectedRegion === 'All'
        ? projectCatalog
        : projectCatalog.filter(project => project.region === selectedRegion),
    [selectedRegion],
  );

  const selectedProject = useMemo(() => {
    if (visibleProjects.length === 0) {
      return null;
    }
    if (selectedProjectId && visibleProjects.some(project => project.id === selectedProjectId)) {
      return visibleProjects.find(project => project.id === selectedProjectId) ?? visibleProjects[0];
    }
    return visibleProjects[0];
  }, [selectedProjectId, visibleProjects]);

  const totalMW = useMemo(
    () => visibleProjects.reduce((sum, project) => sum + project.energyOutput, 0),
    [visibleProjects],
  );
  const totalCO2 = useMemo(
    () => visibleProjects.reduce((sum, project) => sum + project.co2Reduction, 0),
    [visibleProjects],
  );
  const statusCounts = useMemo(() => {
    return visibleProjects.reduce(
      (acc, project) => {
        acc[project.status] += 1;
        return acc;
      },
      { completed: 0, 'in-progress': 0, planning: 0 } as Record<ProjectStatus, number>,
    );
  }, [visibleProjects]);
  const isoCoverage = useMemo(() => {
    const set = new Set<string>();
    visibleProjects.forEach(project => project.isoTags.forEach(tag => set.add(tag)));
    return Array.from(set);
  }, [visibleProjects]);

  return (
    <div className="w-full bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-800 rounded-lg overflow-hidden">
      <div className="p-6 bg-black/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Global Project Showcase</h3>
            <p className="text-gray-200">
              Interactive 3D models of CES initiatives spanning solar, storage, microgrids, software, and
              construction.
            </p>
            <p className="text-blue-100 text-xs mt-2">
              Filter by region to explore localized technology stacks and project impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {regionFilters.map(region => (
              <motion.button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  selectedRegion === region
                    ? 'border-white/70 bg-white/20 text-white shadow'
                    : 'border-white/20 bg-white/5 text-blue-100 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {region}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-200 text-sm uppercase tracking-[0.3em]">Nameplate Capacity</p>
            <p className="text-white text-2xl font-bold mt-2">{totalMW.toLocaleString()} MW</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-200 text-sm uppercase tracking-[0.3em]">CO₂ Reduction</p>
            <p className="text-white text-2xl font-bold mt-2">
              {totalCO2.toLocaleString()} tons/yr
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-purple-200 text-sm uppercase tracking-[0.3em]">Active Regions</p>
            <p className="text-white text-2xl font-bold mt-2">{visibleProjects.length}</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <p className="text-orange-200 text-sm uppercase tracking-[0.3em]">Project Status</p>
            <p className="text-white text-xs mt-2">
              Completed: {statusCounts.completed} • In progress: {statusCounts['in-progress']} • Planning:{' '}
              {statusCounts.planning}
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {visibleProjects.map(project => (
            <motion.button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`bg-white/10 rounded-lg p-4 text-left transition-colors border ${
                selectedProject?.id === project.id
                  ? 'border-white/60 bg-white/20'
                  : 'border-white/10 hover:bg-white/15'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold text-sm">{project.name}</div>
                <span className="text-xs text-blue-100">{project.region}</span>
              </div>
              <div className="text-gray-300 text-xs mt-1">{project.location}</div>
              <div className={`${statusColors[project.status]} text-xs mt-2 uppercase tracking-[0.3em]`}>
                {project.status.replace('-', ' ')}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-blue-100">
                {project.isoTags.map(tag => (
                  <span key={tag} className="bg-blue-500/20 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* 3D Canvas */}
        <div className="h-96 bg-black/20 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 6, 12], fov: 55 }}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.45} />
            <directionalLight position={[10, 12, 8]} intensity={1.1} />
            <OrbitControls enablePan enableZoom enableRotate />

            {visibleProjects.map((project, index) => {
              const position = getProjectPosition(index, visibleProjects.length);
              const isSelected = selectedProject?.id === project.id;
              return (
                <group
                  key={project.id}
                  position={position}
                  scale={isSelected ? 1.15 : 1}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <ProjectModel project={project} />
                </group>
              );
            })}
          </Canvas>
        </div>

        {/* Selected Project Details */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white/10 rounded-lg p-6 border border-white/20"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold text-white">{selectedProject.name}</h4>
                <p className="text-blue-100 text-sm">{selectedProject.summary}</p>
                <div className="mt-2 text-sm text-gray-200">
                  {selectedProject.location} • {selectedProject.region} • Started {selectedProject.startYear}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white uppercase tracking-[0.3em]">
                  {typeLabels[selectedProject.type]}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white uppercase tracking-[0.3em]">
                  {selectedProject.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm mt-5">
              <div>
                <span className="text-gray-300">Nameplate Capacity:</span>
                <span className="text-white ml-2">{selectedProject.energyOutput.toLocaleString()} MW</span>
              </div>
              <div>
                <span className="text-gray-300">CO₂ Reduction:</span>
                <span className="text-white ml-2">
                  {selectedProject.co2Reduction.toLocaleString()} tons/year
                </span>
              </div>
              <div>
                <span className="text-gray-300">Markets / ISOs:</span>
                <span className="text-white ml-2">{selectedProject.isoTags.join(', ')}</span>
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-100 uppercase tracking-[0.3em] mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2 text-[11px] text-blue-100">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="bg-blue-500/20 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-blue-100 uppercase tracking-[0.3em] mb-2">Focus Areas</p>
                <ul className="text-xs text-gray-200 list-disc list-inside space-y-1">
                  {selectedProject.focusAreas.map(area => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs text-blue-100 uppercase tracking-[0.3em] mb-2">ISO Coverage</p>
              <div className="flex flex-wrap gap-2 text-[11px] text-white">
                {isoCoverage.map(tag => (
                  <span key={tag} className="bg-white/15 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
