'use client';

import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardSettings } from '@/context/DashboardSettingsContext';
import DashboardSettingsControls from '@/components/settings/DashboardSettingsControls';

type SensorType =
  | 'temperature'
  | 'humidity'
  | 'energy'
  | 'vibration'
  | 'air_quality'
  | 'power_quality'
  | 'state_of_charge'
  | 'market_signal';

type SensorStatus = 'normal' | 'warning' | 'critical';

interface SensorTemplate {
  id: string;
  name: string;
  type: SensorType;
  unit: string;
  baseValue: number;
  variance: number;
  status: SensorStatus;
  locationLabel?: string;
  tags?: string[];
}

interface SiteMetrics {
  uptimePct: number;
  activeSensors: number;
  avgLatency: number;
  criticalAlerts: number;
}

interface RegionSite {
  id: string;
  label: string;
  city: string;
  state?: string;
  country: string;
  timezone: string;
  focus: string[];
  summary: string;
  metrics: SiteMetrics;
  sensors: SensorTemplate[];
}

interface RegionDefinition {
  id: string;
  label: string;
  description: string;
  highlight: string;
  tags: string[];
  sites: RegionSite[];
}

interface SensorHistoryPoint {
  time: string;
  value: number;
}

interface SensorData {
  id: string;
  name: string;
  type: SensorType;
  unit: string;
  value: number;
  status: SensorStatus;
  location: string;
  timestamp: Date;
  history: SensorHistoryPoint[];
  template: SensorTemplate;
  regionId: string;
  siteId: string;
}

const regionDefinitions: RegionDefinition[] = [
  {
    id: 'united-states',
    label: 'United States',
    description:
      'Headquarters in Philadelphia with real-time coverage across PJM, CAISO, ERCOT, ISO-NE, MISO, and NYISO territories.',
    highlight: '13,000+ MW of assets orchestrated through demand response, storage, and wholesale bids.',
    tags: ['PJM', 'CAISO', 'ERCOT', 'ISO-NE', 'MISO', 'NYISO'],
    sites: [
      {
        id: 'us-phl-hq',
        label: 'Philadelphia, Pennsylvania (HQ)',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        timezone: 'America/New_York',
        focus: ['PJM dispatch center', 'Demand response portfolio'],
        summary:
          'Command center coordinating wholesale bids, telemetry, and demand response assets across PJM.',
        metrics: { uptimePct: 99.6, activeSensors: 240, avgLatency: 0.55, criticalAlerts: 2 },
        sensors: [
          {
            id: 'us-phl-temp',
            name: 'Control Room Temperature',
            type: 'temperature',
            unit: '°C',
            baseValue: 23.5,
            variance: 2.5,
            status: 'normal',
            locationLabel: 'PJM Dispatch Floor',
          },
          {
            id: 'us-phl-load',
            name: 'PJM Net Load Forecast',
            type: 'energy',
            unit: 'MW',
            baseValue: 5480,
            variance: 420,
            status: 'warning',
            locationLabel: 'ISO Feed',
            tags: ['Forecast'],
          },
          {
            id: 'us-phl-dr',
            name: 'Demand Response Availability',
            type: 'power_quality',
            unit: '%',
            baseValue: 92,
            variance: 6,
            status: 'normal',
            locationLabel: 'Aggregated DR Portfolio',
          },
        ],
      },
      {
        id: 'us-aus-ercot',
        label: 'Austin, Texas',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        timezone: 'America/Chicago',
        focus: ['ERCOT storage optimization', 'Retail program management'],
        summary: 'Manages storage bidding, fast-start resources, and real-time operations across ERCOT.',
        metrics: { uptimePct: 99.2, activeSensors: 198, avgLatency: 0.48, criticalAlerts: 3 },
        sensors: [
          {
            id: 'us-aus-soc',
            name: 'Battery State of Charge',
            type: 'state_of_charge',
            unit: '%',
            baseValue: 87,
            variance: 8,
            status: 'normal',
            locationLabel: '2h Storage Fleet',
          },
          {
            id: 'us-aus-frequency',
            name: 'Frequency Deviation',
            type: 'power_quality',
            unit: 'Hz',
            baseValue: 60.02,
            variance: 0.12,
            status: 'warning',
            locationLabel: 'ERCOT Frequency Monitor',
            tags: ['Frequency'],
          },
          {
            id: 'us-aus-wind',
            name: 'West Texas Wind Output',
            type: 'energy',
            unit: 'MW',
            baseValue: 1120,
            variance: 160,
            status: 'normal',
            locationLabel: 'Panhandle Fleet',
          },
        ],
      },
      {
        id: 'us-sfo-caiso',
        label: 'San Francisco, California',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        timezone: 'America/Los_Angeles',
        focus: ['CAISO solar + storage orchestration', 'DERMS platform'],
        summary: 'Oversees hybrid solar, storage, and community DER participation within CAISO.',
        metrics: { uptimePct: 99.1, activeSensors: 210, avgLatency: 0.62, criticalAlerts: 1 },
        sensors: [
          {
            id: 'us-sfo-panel-temp',
            name: 'PV Backplane Temperature',
            type: 'temperature',
            unit: '°C',
            baseValue: 46,
            variance: 5,
            status: 'warning',
            locationLabel: 'Central Valley Solar Hub',
          },
          {
            id: 'us-sfo-soiling',
            name: 'Soiling Loss Index',
            type: 'air_quality',
            unit: '%',
            baseValue: 8.5,
            variance: 3.5,
            status: 'warning',
            locationLabel: 'Solar Fleet Diagnostics',
            tags: ['O&M'],
          },
          {
            id: 'us-sfo-derms',
            name: 'DERMS Dispatch Success',
            type: 'power_quality',
            unit: '%',
            baseValue: 97,
            variance: 2.5,
            status: 'normal',
            locationLabel: 'DERMS Control Plane',
          },
        ],
      },
    ],
  },
  {
    id: 'canada',
    label: 'Canada',
    description: 'Ontario operations and asset management covering IESO wholesale and DER portfolios.',
    highlight: 'Automated bid optimization and settlements for commercial fleets across Ontario.',
    tags: ['IESO', 'Ontario DER'],
    sites: [
      {
        id: 'ca-tor',
        label: 'Toronto, Ontario',
        city: 'Toronto',
        country: 'Canada',
        timezone: 'America/Toronto',
        focus: ['IESO bid optimization', 'Renewable scheduling', 'Regulatory advisory'],
        summary: 'Wholesale market desk coordinating bids, forecasting, and compliance across Ontario.',
        metrics: { uptimePct: 99.4, activeSensors: 156, avgLatency: 0.58, criticalAlerts: 1 },
        sensors: [
          {
            id: 'ca-tor-hydro',
            name: 'Hydro Dispatch Level',
            type: 'energy',
            unit: 'MW',
            baseValue: 620,
            variance: 95,
            status: 'normal',
            locationLabel: 'Niagara Hydro Fleet',
          },
          {
            id: 'ca-tor-ice',
            name: 'Transmission Ice Build-up',
            type: 'vibration',
            unit: 'mm',
            baseValue: 1.4,
            variance: 1.1,
            status: 'warning',
            locationLabel: 'Northern Transmission Lines',
          },
          {
            id: 'ca-tor-price',
            name: 'IESO Market Price',
            type: 'market_signal',
            unit: '$/MWh',
            baseValue: 74,
            variance: 12,
            status: 'normal',
            locationLabel: 'Day-Ahead Market',
          },
        ],
      },
    ],
  },
  {
    id: 'india',
    label: 'India',
    description: 'Pune innovation lab supporting energy storage, EV infrastructure, and policy advisory.',
    highlight: 'Guides national storage roadmaps, microgrid pilots, and analytics for emerging technologies.',
    tags: ['Energy Storage', 'EV Readiness', 'Open Access'],
    sites: [
      {
        id: 'in-pune',
        label: 'Pune, Maharashtra',
        city: 'Pune',
        state: 'MH',
        country: 'India',
        timezone: 'Asia/Kolkata',
        focus: ['Storage R&D', 'EV analytics', 'Policy support'],
        summary: 'Innovation hub analyzing storage pilots, EV corridors, and microgrid deployments across India.',
        metrics: { uptimePct: 99, activeSensors: 172, avgLatency: 0.72, criticalAlerts: 2 },
        sensors: [
          {
            id: 'in-pune-temp',
            name: 'Battery Lab Temperature',
            type: 'temperature',
            unit: '°C',
            baseValue: 26,
            variance: 3.5,
            status: 'normal',
            locationLabel: 'Storage Innovation Lab',
          },
          {
            id: 'in-pune-ev',
            name: 'EV Charger Throughput',
            type: 'energy',
            unit: 'kW',
            baseValue: 182,
            variance: 40,
            status: 'warning',
            locationLabel: 'Fleet Charging Hub',
            tags: ['EV'],
          },
          {
            id: 'in-pune-soc',
            name: 'Pilot Storage SOC',
            type: 'state_of_charge',
            unit: '%',
            baseValue: 78,
            variance: 10,
            status: 'normal',
            locationLabel: 'Hybrid Microgrid Pilot',
          },
        ],
      },
    ],
  },
  {
    id: 'japan',
    label: 'Japan',
    description: 'Tokyo office guiding capacity markets, microgrids, and bilingual stakeholder engagement.',
    highlight: 'Supports utilities and corporates navigating the Japanese capacity market transition.',
    tags: ['Capacity Market', 'Microgrids'],
    sites: [
      {
        id: 'jp-tokyo',
        label: 'Shibuya-ku, Tokyo',
        city: 'Tokyo',
        country: 'Japan',
        timezone: 'Asia/Tokyo',
        focus: ['Capacity market strategy', 'DER aggregation', 'Bilingual advisory'],
        summary: 'Directs microgrid pilots, rooftop DER integration, and market analytics for Japanese customers.',
        metrics: { uptimePct: 99.3, activeSensors: 134, avgLatency: 0.65, criticalAlerts: 1 },
        sensors: [
          {
            id: 'jp-microgrid-load',
            name: 'Microgrid Load Balance',
            type: 'energy',
            unit: 'kW',
            baseValue: 540,
            variance: 60,
            status: 'normal',
            locationLabel: 'Tokyo Smart District',
          },
          {
            id: 'jp-frequency',
            name: 'Frequency Regulation Signal',
            type: 'power_quality',
            unit: 'Hz',
            baseValue: 50.01,
            variance: 0.08,
            status: 'normal',
            locationLabel: 'TEPCO Grid Interface',
          },
          {
            id: 'jp-solar-forecast',
            name: 'Rooftop Solar Forecast Error',
            type: 'market_signal',
            unit: '%',
            baseValue: 6,
            variance: 3,
            status: 'warning',
            locationLabel: 'Kanto Rooftop Fleet',
            tags: ['Forecast'],
          },
        ],
      },
    ],
  },
  {
    id: 'mexico',
    label: 'Mexico',
    description: 'Mexico City hub focused on resilient microgrids and C&I distributed energy strategies.',
    highlight: 'Deploys microgrid resiliency programs for industrial and commercial clients across Mexico.',
    tags: ['Microgrids', 'C&I Strategy'],
    sites: [
      {
        id: 'mx-cdmx',
        label: 'Mexico City',
        city: 'Mexico City',
        country: 'Mexico',
        timezone: 'America/Mexico_City',
        focus: ['Resilient microgrids', 'DER planning', 'Regulatory navigation'],
        summary: 'Designs resilient microgrid architectures and DER roadmaps for Latin American partners.',
        metrics: { uptimePct: 98.8, activeSensors: 148, avgLatency: 0.68, criticalAlerts: 2 },
        sensors: [
          {
            id: 'mx-resilience',
            name: 'Resilience Score',
            type: 'power_quality',
            unit: '%',
            baseValue: 88,
            variance: 7,
            status: 'normal',
            locationLabel: 'C&I Campus Network',
          },
          {
            id: 'mx-storage-health',
            name: 'Storage Health Index',
            type: 'state_of_charge',
            unit: '%',
            baseValue: 83,
            variance: 9,
            status: 'warning',
            locationLabel: 'Industrial Storage Fleet',
          },
          {
            id: 'mx-grid-offset',
            name: 'Grid Import Offset',
            type: 'energy',
            unit: 'MW',
            baseValue: 52,
            variance: 12,
            status: 'normal',
            locationLabel: 'Microgrid Aggregator',
          },
        ],
      },
    ],
  },
  {
    id: 'vietnam',
    label: 'Vietnam',
    description: 'Ho Chi Minh City data operations center powering telemetry, analytics, and software delivery.',
    highlight: 'Provides round-the-clock telemetry processing and analytics for CES global clients.',
    tags: ['Data Ops', 'Software Engineering'],
    sites: [
      {
        id: 'vn-hcmc',
        label: 'Ho Chi Minh City',
        city: 'Ho Chi Minh City',
        country: 'Vietnam',
        timezone: 'Asia/Ho_Chi_Minh',
        focus: ['Telemetry processing', 'Analytics delivery', 'Software engineering'],
        summary: 'Centralizes global data pipelines, API integrations, and analytics delivery workflows.',
        metrics: { uptimePct: 99.7, activeSensors: 190, avgLatency: 0.42, criticalAlerts: 0 },
        sensors: [
          {
            id: 'vn-api-latency',
            name: 'API Latency',
            type: 'market_signal',
            unit: 's',
            baseValue: 0.48,
            variance: 0.15,
            status: 'normal',
            locationLabel: 'Data Exchange Layer',
          },
          {
            id: 'vn-throughput',
            name: 'Stream Throughput',
            type: 'energy',
            unit: 'MB/s',
            baseValue: 86,
            variance: 12,
            status: 'normal',
            locationLabel: 'Telemetry Pipeline',
          },
          {
            id: 'vn-data-quality',
            name: 'Data Quality Score',
            type: 'power_quality',
            unit: '%',
            baseValue: 98,
            variance: 1.2,
            status: 'normal',
            locationLabel: 'QA Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: 'guam',
    label: 'Guam',
    description: 'Island grid asset management for hybrid solar, storage, and diesel microgrids.',
    highlight: 'Ensures resilient power for island communities with advanced microgrid operations.',
    tags: ['Island Grids', 'Resilience'],
    sites: [
      {
        id: 'gu-hagatna',
        label: 'Hagåtña',
        city: 'Hagåtña',
        country: 'Guam',
        timezone: 'Pacific/Guam',
        focus: ['Island microgrids', 'Disaster recovery', 'Hybrid operations'],
        summary:
          'Remote command center managing solar, storage, and diesel assets for island resiliency and recovery.',
        metrics: { uptimePct: 98.6, activeSensors: 102, avgLatency: 0.74, criticalAlerts: 3 },
        sensors: [
          {
            id: 'gu-solar-output',
            name: 'Solar Array Output',
            type: 'energy',
            unit: 'MW',
            baseValue: 28,
            variance: 6,
            status: 'normal',
            locationLabel: 'Northern Solar Field',
          },
          {
            id: 'gu-diesel-reserve',
            name: 'Diesel Reserve Days',
            type: 'power_quality',
            unit: 'days',
            baseValue: 12,
            variance: 3,
            status: 'warning',
            locationLabel: 'Fuel Storage',
          },
          {
            id: 'gu-grid-frequency',
            name: 'Island Frequency',
            type: 'power_quality',
            unit: 'Hz',
            baseValue: 60.03,
            variance: 0.09,
            status: 'normal',
            locationLabel: 'Island Grid Monitor',
          },
        ],
      },
    ],
  },
];

const createHistory = (base: number, variance: number): SensorHistoryPoint[] =>
  Array.from({ length: 24 }, (_, hour) => {
    const drift = Math.sin(hour / 3) * variance * 0.4 + (Math.random() - 0.5) * variance * 0.4;
    const value = Number((base + drift).toFixed(2));
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      value,
    };
  });

const deriveStatus = (template: SensorTemplate, value: number): SensorStatus => {
  const warningUpper = template.baseValue + template.variance * 0.9;
  const criticalUpper = template.baseValue + template.variance * 1.6;
  const warningLower = template.baseValue - template.variance * 0.9;
  const criticalLower = template.baseValue - template.variance * 1.6;

  if (value >= criticalUpper || value <= criticalLower) {
    return 'critical';
  }
  if (value >= warningUpper || value <= warningLower) {
    return 'warning';
  }

  return template.status !== 'normal' ? template.status : 'normal';
};

const createSensorReading = (template: SensorTemplate, site: RegionSite, regionId: string): SensorData => {
  const history = createHistory(template.baseValue, template.variance);
  const latestValue = history[history.length - 1]?.value ?? template.baseValue;
  const status = deriveStatus(template, latestValue);

  return {
    id: `${site.id}-${template.id}`,
    name: template.name,
    type: template.type,
    unit: template.unit,
    value: latestValue,
    status,
    location: template.locationLabel ?? site.label,
    timestamp: new Date(),
    history,
    template,
    regionId,
    siteId: site.id,
  };
};

const buildSensorsForSite = (site: RegionSite, regionId: string): SensorData[] =>
  site.sensors.map(template => createSensorReading(template, site, regionId));

const updateSensorReading = (sensor: SensorData): SensorData => {
  const drift = (Math.random() - 0.5) * sensor.template.variance * 0.3;
  const nextValue = Number((sensor.value + drift).toFixed(2));
  const status = deriveStatus(sensor.template, nextValue);
  const history = [
    ...sensor.history.slice(1),
    {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: nextValue,
    },
  ];

  return {
    ...sensor,
    value: nextValue,
    status,
    timestamp: new Date(),
    history,
  };
};

export default function IoTDashboard() {
  const {
    formatTemperature,
    convertTemperature,
    temperatureSuffix,
    dashboardSettings,
  } = useDashboardSettings();

  const [selectedRegionId, setSelectedRegionId] = useState<string>(regionDefinitions[0].id);
  const selectedRegion = useMemo(
    () => regionDefinitions.find(region => region.id === selectedRegionId) ?? regionDefinitions[0],
    [selectedRegionId],
  );

  const [selectedSiteId, setSelectedSiteId] = useState<string>(selectedRegion.sites[0].id);

  useEffect(() => {
    setSelectedSiteId(selectedRegion.sites[0].id);
  }, [selectedRegion]);

  const selectedSite = useMemo(
    () =>
      selectedRegion.sites.find(site => site.id === selectedSiteId) ??
      selectedRegion.sites[0],
    [selectedRegion, selectedSiteId],
  );

  const [sensorReadings, setSensorReadings] = useState<SensorData[]>(
    buildSensorsForSite(selectedSite, selectedRegion.id),
  );
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>(
    sensorReadings[0]?.id ?? null,
  );

  const displaySensors = useMemo(() => {
    if (dashboardSettings.showHumidity) {
      return sensorReadings;
    }
    return sensorReadings.filter(sensor => sensor.type !== 'humidity');
  }, [sensorReadings, dashboardSettings.showHumidity]);

  useEffect(() => {
    const sensors = buildSensorsForSite(selectedSite, selectedRegion.id);
    setSensorReadings(sensors);
    setSelectedSensorId(sensors[0]?.id ?? null);
  }, [selectedSite, selectedRegion.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorReadings(prev => prev.map(updateSensorReading));
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedSiteId, selectedRegionId]);

  const selectedSensor = useMemo(() => {
    if (displaySensors.length === 0) return null;
    if (selectedSensorId) {
      const matched = displaySensors.find(sensor => sensor.id === selectedSensorId);
      if (matched) return matched;
    }
    return displaySensors[0];
  }, [displaySensors, selectedSensorId]);

  const warningCount = displaySensors.filter(sensor => sensor.status === 'warning').length;
  const criticalCount = displaySensors.filter(sensor => sensor.status === 'critical').length;
  const uptime = Math.max(
    90,
    Number(
      (
        selectedSite.metrics.uptimePct -
        criticalCount * 0.4 -
        warningCount * 0.15
      ).toFixed(1),
    ),
  );
  const avgLatency = Math.max(
    0.3,
    Number(
      (
        selectedSite.metrics.avgLatency +
        warningCount * 0.05 +
        criticalCount * 0.1
      ).toFixed(2),
    ),
  );
  const activeSensors = displaySensors.length;

  const formatSensorValue = useCallback(
    (sensor: SensorData, value: number) => {
      if (sensor.type === 'temperature') {
        return formatTemperature(value, 1);
      }
      const digits = sensor.unit.includes('%') || sensor.unit === 'mm/s' || sensor.unit === 'days' ? 1 : 2;
      return `${value.toLocaleString(undefined, { maximumFractionDigits: digits })} ${sensor.unit}`;
    },
    [formatTemperature],
  );

  const chartHistory = useMemo(() => {
    if (!selectedSensor) return [];
    if (selectedSensor.type === 'temperature') {
      return selectedSensor.history.map(point => ({
        time: point.time,
        value: Number(convertTemperature(point.value).toFixed(2)),
      }));
    }
    return selectedSensor.history;
  }, [selectedSensor, convertTemperature]);

  const handleRegionChange = (regionId: string) => {
    if (regionId === selectedRegionId) return;
    setSelectedRegionId(regionId);
  };

  const handleSiteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSiteId(event.target.value);
  };

  const handleSensorClick = useCallback((sensorId: string) => {
    setSelectedSensorId(sensorId);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">IoT Sensor Dashboard</h3>
            <p className="text-gray-300">
              Real-time monitoring of global energy and construction assets
            </p>
            <p className="text-xs text-blue-200 mt-2">
              United States, Canada, India, Japan, Mexico, Vietnam, and Guam footprints with live sensor
              feeds.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Live Data</span>
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div>
            <p className="text-sm font-semibold text-blue-200 uppercase tracking-[0.3em] mb-2">
              Choose an operating region
            </p>
            <div className="flex flex-wrap gap-2">
              {regionDefinitions.map(region => (
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
                <label
                  htmlFor="iot-site-selector"
                  className="text-xs uppercase tracking-[0.3em] text-blue-200"
                >
                  Key hubs & states
                </label>
                <select
                  id="iot-site-selector"
                  value={selectedSiteId}
                  onChange={handleSiteChange}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-sm text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {selectedRegion.sites.map(site => (
                    <option key={site.id} value={site.id} className="text-slate-900">
                      {site.label}
                    </option>
                  ))}
                </select>
                <p className="mt-3 text-xs text-blue-100">{selectedRegion.description}</p>
                <p className="mt-2 text-xs text-blue-200">{selectedRegion.highlight}</p>
                <p className="mt-3 text-xs text-blue-100">{selectedSite.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSite.focus.map(item => (
                    <span
                      key={item}
                      className="rounded-full bg-blue-500/20 px-3 py-1 text-[11px] text-blue-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-blue-100">
                <p className="font-semibold text-white">Network Coverage</p>
                <p className="mt-2 text-xs">
                  Sensor analytics, SCADA feeds, and AI diagnostics adjust instantly for the region you
                  select.
                </p>
                <p className="mt-3 text-xs">
                  Compare ISO territories, R&D hubs, and remote microgrids across seven countries.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedRegion.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <DashboardSettingsControls className="mt-4" showFeelsLikeToggle={false} />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-blue-100">
            <p className="font-semibold text-white">Live Site Metrics</p>
            <p className="mt-2 text-xs">
              Uptime, sensor density, and alerting are benchmarked against each region’s operating profile.
            </p>
            <p className="mt-3 text-xs">Timezone: {selectedSite.timezone}</p>
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {displaySensors.map(sensor => {
            const isActive = selectedSensor?.id === sensor.id;
            const formattedValue = formatSensorValue(sensor, sensor.value);
            return (
              <motion.button
                key={sensor.id}
                type="button"
                className={`p-4 rounded-lg border text-left transition-all ${
                  sensor.status === 'critical'
                    ? 'bg-red-500/10 border-red-500/40'
                    : sensor.status === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/40'
                      : 'bg-white/5 border-white/20'
                } ${isActive ? 'ring-2 ring-blue-300 shadow-lg' : ''}`}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleSensorClick(sensor.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold text-sm">{sensor.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      sensor.status === 'critical'
                        ? 'bg-red-500/30 text-red-200'
                        : sensor.status === 'warning'
                          ? 'bg-yellow-500/30 text-yellow-200'
                          : 'bg-green-500/30 text-green-200'
                    }`}
                  >
                    {sensor.status}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{formattedValue}</div>
                <div className="text-gray-300 text-xs">{sensor.location}</div>
                {dashboardSettings.showAnalysisMeta && (
                  <div className="text-gray-500 text-xs mt-1">
                    Updated: {sensor.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Sensor Details */}
        {selectedSensor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-6 border border-white/10"
          >
            <h4 className="text-xl font-bold text-white mb-4">{selectedSensor.name}</h4>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Value Gauge */}
              <div>
                <h5 className="text-white font-semibold mb-2">Current Reading</h5>
                <div className="bg-black/20 rounded-lg p-4 text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {selectedSensor.type === 'temperature'
                      ? convertTemperature(selectedSensor.value).toFixed(1)
                      : selectedSensor.value.toLocaleString(undefined, {
                          maximumFractionDigits: selectedSensor.unit.includes('%') ? 1 : 2,
                        })}
                  </div>
                  <div className="text-gray-300">
                    {selectedSensor.type === 'temperature' ? temperatureSuffix : selectedSensor.unit}
                  </div>
                  <div
                    className={`text-sm mt-2 ${
                      selectedSensor.status === 'critical'
                        ? 'text-red-300'
                        : selectedSensor.status === 'warning'
                          ? 'text-yellow-300'
                          : 'text-green-300'
                    }`}
                  >
                    Status: {selectedSensor.status}
                  </div>
                </div>
              </div>

              {/* Historical Data Chart */}
              <div>
                <h5 className="text-white font-semibold mb-2">24-Hour Trend</h5>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#F3F4F6' }}
                        formatter={(value: number) => {
                          if (!selectedSensor) return [value, ''];
                          if (selectedSensor.type === 'temperature') {
                            return [`${value.toFixed(1)}${temperatureSuffix}`, selectedSensor.name];
                          }
                          const digits = selectedSensor.unit.includes('%') ? 1 : 2;
                          return [
                            `${value.toLocaleString(undefined, { maximumFractionDigits: digits })} ${selectedSensor.unit}`,
                            selectedSensor.name,
                          ];
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="text-white font-semibold mb-2">Sensor Details</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-300">Type:</span>
                  <span className="text-white ml-2 capitalize">{selectedSensor.type.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-gray-300">Location:</span>
                  <span className="text-white ml-2">{selectedSensor.location}</span>
                </div>
                <div>
                  <span className="text-gray-300">Region:</span>
                  <span className="text-white ml-2">{selectedRegion.label}</span>
                </div>
                {dashboardSettings.showAnalysisMeta && (
                  <div>
                    <span className="text-gray-300">Last Update:</span>
                    <span className="text-white ml-2">
                      {selectedSensor.timestamp.toLocaleString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* System Status */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="text-green-300 text-sm uppercase tracking-[0.3em]">System Uptime</div>
            <div className="text-green-200 text-2xl font-bold mt-1">{uptime.toFixed(1)}%</div>
            <p className="text-xs text-green-200 mt-2">
              Adjusted dynamically for current warning and critical alerts.
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="text-blue-300 text-sm uppercase tracking-[0.3em]">Active Sensors</div>
            <div className="text-blue-200 text-2xl font-bold mt-1">{activeSensors}</div>
            <p className="text-xs text-blue-200 mt-2">
              Site baseline: {selectedSite.metrics.activeSensors.toLocaleString()} devices monitored.
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="text-red-300 text-sm uppercase tracking-[0.3em]">Critical Alerts</div>
            <div className="text-red-200 text-2xl font-bold mt-1">{criticalCount}</div>
            <p className="text-xs text-red-200 mt-2">
              Warnings: {warningCount} • Baseline threshold: {selectedSite.metrics.criticalAlerts}
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="text-purple-300 text-sm uppercase tracking-[0.3em]">Avg Response</div>
            <div className="text-purple-200 text-2xl font-bold mt-1">{avgLatency.toFixed(2)}s</div>
            <p className="text-xs text-purple-200 mt-2">Sub-second telemetry processing across regions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
