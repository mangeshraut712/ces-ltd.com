'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { useInnovationInsights } from '@/hooks/useInnovationInsights';

interface RecommendationStream {
  id: string;
  label: string;
  channel: string;
  focus: string;
  aiScore: number;
  summary: string;
  callToAction: string;
}

interface PersonaPlaybook {
  id: string;
  persona: string;
  insight: string;
  play: string;
  confidence: number;
  tags: string[];
}

interface TrendSignal {
  id: string;
  icon: string;
  title: string;
  detail: string;
  metric: string;
}

interface RegionalInsight {
  id: string;
  country: string;
  hub: string;
  weather: string;
  energySignal: string;
  advisory: string;
  icon: string;
}

const recommendationStreams: RecommendationStream[] = [
  {
    id: 'executive-briefing',
    label: 'Executive Briefing Stream',
    channel: 'Email · Mobile',
    focus: 'North America leadership cohort',
    aiScore: 94,
    summary:
      'Sunrise intelligence briefing highlighting demand curves, contract renewals, and capital deployment opportunities tailored to executive stakeholders.',
    callToAction: 'Preview briefing',
  },
  {
    id: 'innovation-pulse',
    label: 'Innovation Pulse',
    channel: 'VR Hub · Web',
    focus: 'Emerging tech champions',
    aiScore: 91,
    summary:
      'Curated mix of VR showcases, metaverse workshops, and edge-compute pilots prioritized for teams driving innovation within energy infrastructure.',
    callToAction: 'Launch experience',
  },
  {
    id: 'sustainability-navigator',
    label: 'Sustainability Navigator',
    channel: 'AI Chat · Web',
    focus: 'ESG and sustainability directors',
    aiScore: 88,
    summary:
      'Dynamic playbook recommending carbon reduction milestones, regulatory insights, and climate disclosures aligned to ESG objectives.',
    callToAction: 'Open playbook',
  },
  {
    id: 'operations-guardian',
    label: 'Operations Guardian',
    channel: 'IoT Console',
    focus: 'Grid and construction operations',
    aiScore: 86,
    summary:
      'Predictive maintenance, outage mitigation, and workforce safety alerts fused into a single stream for operations supervisors.',
    callToAction: 'Review actions',
  },
];

const personaStreamMapping: Record<string, string> = {
  'energy-executive': 'executive-briefing',
  'sustainability-lead': 'sustainability-navigator',
  'operations-director': 'operations-guardian',
};

const personaPlaybooks: PersonaPlaybook[] = [
  {
    id: 'energy-executive',
    persona: 'Energy Executive',
    insight:
      'Prefers macro trends, portfolio ROI, and board-ready narratives. Responds to concise decision snapshots with supporting analytics.',
    play:
      'Serve a Monday sunrise digest with two strategic moves, one risk flag, and a bookable session with the strategy team.',
    confidence: 92,
    tags: ['Portfolio outlook', 'Board brief', 'Decision support'],
  },
  {
    id: 'sustainability-lead',
    persona: 'Sustainability Lead',
    insight:
      'Seeks granular emissions data, renewable procurement options, and policy watchlists across U.S., EU, and APAC.',
    play:
      'Activate the Sustainability Navigator stream with weekly ESG benchmarking and auto-generated disclosure templates.',
    confidence: 89,
    tags: ['ESG', 'Compliance', 'Carbon roadmap'],
  },
  {
    id: 'operations-director',
    persona: 'Operations Director',
    insight:
      'Needs real-time alerts, equipment health indicators, and crew coordination signals with mobile-first delivery.',
    play:
      'Merge the Operations Guardian stream into the IoT console with voice-enabled acknowledgements and downtime forecasts.',
    confidence: 86,
    tags: ['IoT signals', 'Safety', 'Field coordination'],
  },
];

const aiTrendSignals: TrendSignal[] = [
  {
    id: 'market',
    icon: '📊',
    title: 'Market Momentum',
    detail: 'Utility-scale renewable PPAs jumped 18% across the U.S. Midwest, pulling forward Q2 contract activity.',
    metric: '+18%',
  },
  {
    id: 'innovation',
    icon: '🔧',
    title: 'Innovation Uptick',
    detail: 'Edge analytics pilots in Japan and India are reporting a 22% drop in latency-sensitive alarms.',
    metric: '-22% alerts',
  },
  {
    id: 'engagement',
    icon: '💡',
    title: 'Engagement Signal',
    detail: 'Smart facility personas now convert on 3D showcase tours 1.7x more often when paired with AI follow-ups.',
    metric: '×1.7 conversion',
  },
];

const regionalIntelligence: RegionalInsight[] = [
  {
    id: 'united-states',
    country: 'United States',
    hub: 'Philadelphia, PA · HQ',
    weather: 'Crisp 8°C with clear skies; moderate northeast winds.',
    energySignal: 'PJM evening load projected 6% above seasonal norms as heating demand spikes.',
    advisory: 'Pre-stage demand response resources and verify storage dispatch windows.',
    icon: '🇺🇸',
  },
  {
    id: 'canada',
    country: 'Canada',
    hub: 'Toronto, Ontario',
    weather: 'Light snow flurries at 2°C creating slick peak-hour commutes.',
    energySignal: 'IESO solar output tracking 9% below forecast; hydro flows remain steady.',
    advisory: 'Shift reserve schedules to hydro assets and extend evening peak hedges.',
    icon: '🇨🇦',
  },
  {
    id: 'india',
    country: 'India',
    hub: 'Pune, Maharashtra',
    weather: 'Warm 24°C afternoon with hazy skies and elevated humidity.',
    energySignal: 'EV charging demand up 12% week-over-week across Pune innovation corridor.',
    advisory: 'Align microgrid charging windows with late-night low-tariff periods.',
    icon: '🇮🇳',
  },
  {
    id: 'japan',
    country: 'Japan',
    hub: 'Shibuya-ku, Tokyo',
    weather: 'Overcast 11°C with improving air quality after coastal storms.',
    energySignal: 'Capacity market guidance stable; rooftop solar recovering to 93% of historical output.',
    advisory: 'Deploy DER aggregation mid-day to balance office load ramps.',
    icon: '🇯🇵',
  },
  {
    id: 'mexico',
    country: 'Mexico',
    hub: 'Mexico City, CDMX',
    weather: 'Mild 19°C with scattered clouds and low wind.',
    energySignal: 'C&I microgrids preparing for planned maintenance; grid frequency stable at 60 Hz.',
    advisory: 'Notify industrial clients about redundancy tests and confirm backup fuel inventory.',
    icon: '🇲🇽',
  },
  {
    id: 'vietnam',
    country: 'Vietnam',
    hub: 'Ho Chi Minh City',
    weather: 'Humid 28°C evening with isolated showers.',
    energySignal: 'Data center cooling load up 8% as humidity drives HVAC runtime.',
    advisory: 'Tune IoT cooling optimization scripts to shave 5% from peak draw.',
    icon: '🇻🇳',
  },
  {
    id: 'uae',
    country: 'United Arab Emirates',
    hub: 'Dubai, UAE',
    weather: 'Dry 32°C with light desert winds and high solar irradiance.',
    energySignal: 'Hydrogen blending pilot entering ramp phase; district cooling demand trending upward.',
    advisory: 'Coordinate hydrogen storage telemetry with district cooling SCADA teams.',
    icon: '🇦🇪',
  },
  {
    id: 'netherlands',
    country: 'Netherlands',
    hub: 'The Hague',
    weather: 'Windy 7°C with North Sea gusts topping 35 km/h.',
    energySignal: 'Offshore wind output tracking 14% above plan, supporting EU interconnector exports.',
    advisory: 'Advance cross-border trading nominations to capture favorable Dutch-German spreads.',
    icon: '🇳🇱',
  },
];

export default function AIPersonalization() {
  const [activePersonaId, setActivePersonaId] = useState<string>(personaPlaybooks[0].id);

  const activePersona = useMemo(
    () => personaPlaybooks.find(playbook => playbook.id === activePersonaId) ?? personaPlaybooks[0],
    [activePersonaId],
  );

  const activeStream = useMemo(
    () =>
      recommendationStreams.find(stream => stream.id === personaStreamMapping[activePersona.id]) ??
      recommendationStreams[0],
    [activePersona.id],
  );

  const {
    data: personalizationInsights,
    loading: personalizationLoading,
    error: personalizationError,
    refresh: refreshPersonalizationInsights,
  } = useInnovationInsights('ai-personalization', {
    persona: activePersona.persona,
    channel: activeStream.channel,
    region: activeStream.focus,
  });
  const streamChartData = useMemo(
    () =>
      recommendationStreams.map(stream => ({
        stream: stream.label.replace('Stream', '').trim(),
        score: stream.aiScore,
        active: stream.id === activeStream?.id,
      })),
    [activeStream],
  );

  return (
    <div className="w-full overflow-hidden rounded-lg bg-gradient-to-b from-indigo-900 to-purple-900">
      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-100">
              Personalization Engine
            </span>
            <h3 className="text-3xl font-bold text-white">Adaptive Recommendation Control</h3>
            <p className="max-w-xl text-sm text-blue-100">
              CES personalization AI fuses behavioral, IoT, and market signals to orchestrate tailored journeys for
              energy-sector personas. Streams below are continuously re-ranked based on live engagement and strategic
              priorities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-4 lg:grid-cols-2">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-xs uppercase tracking-[0.3em] text-blue-200">Signal Confidence</div>
              <div className="text-2xl font-bold text-white">94%</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-xs uppercase tracking-[0.3em] text-blue-200">Live Cohorts</div>
              <div className="text-2xl font-bold text-white">12</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-xs uppercase tracking-[0.3em] text-blue-200">Smart Plays</div>
              <div className="text-2xl font-bold text-white">47</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="text-xs uppercase tracking-[0.3em] text-blue-200">Lift vs. Baseline</div>
              <div className="text-2xl font-bold text-white">+31%</div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.8fr,1fr]">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-white font-semibold">Smart Recommendation Streams</h4>
                <p className="text-xs text-blue-200">
                  Ranked every 15 minutes using Gemini-powered sentiment, intent, and asset-performance data.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Live orchestration</span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                Persona Signal Radar
              </p>
              <div className="mt-3 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={streamChartData}>
                    <PolarGrid stroke="#1f2937" />
                    <PolarAngleAxis dataKey="stream" stroke="#9ca3af" fontSize={12} />
                    <PolarRadiusAxis stroke="#9ca3af" angle={30} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #cbd5f5',
                        borderRadius: '8px',
                        color: '#0f172a',
                      }}
                      formatter={(value: number, name) => [`${value}%`, `${name} confidence`]}
                    />
                    <Radar
                      name="AI Confidence"
                      dataKey="score"
                      stroke="#f472b6"
                      fill="#f472b6"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 text-xs text-blue-100">
                Radar compares AI confidence levels across personalization streams, highlighting the currently selected persona.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                    AI Journey Brief
                  </p>
                  <p className="text-sm text-white">{activePersona.persona}</p>
                  <div className="mt-1 text-[11px] text-blue-200 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-2 ${
                        personalizationInsights?.source === 'openrouter' ? 'text-emerald-200' : 'text-blue-200'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          personalizationInsights?.source === 'openrouter' ? 'bg-emerald-400' : 'bg-blue-400'
                        }`}
                      />
                      {personalizationInsights?.source === 'openrouter' ? 'Live OpenRouter' : 'Fallback cache'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={refreshPersonalizationInsights}
                  disabled={personalizationLoading}
                  className={`text-[10px] font-semibold rounded-full border px-3 py-1 transition ${
                    personalizationLoading
                      ? 'border-white/20 bg-white/5 text-blue-200 cursor-not-allowed'
                      : 'border-purple-400/30 bg-purple-500/10 text-purple-100 hover:bg-purple-500/20'
                  }`}
                >
                  {personalizationLoading ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>

              {personalizationError && (
                <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-2 text-[11px] text-red-200">
                  {personalizationError}
                </p>
              )}

              {personalizationInsights ? (
                <div className="mt-3 space-y-2 text-xs text-blue-100 leading-relaxed">
                  <p className="text-white text-sm font-semibold">{personalizationInsights.summary}</p>
                  {personalizationInsights.highlights.length > 0 && (
                    <ul className="space-y-1">
                      {personalizationInsights.highlights.map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {personalizationInsights.actions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                        Plays To Launch
                      </p>
                      <ul className="mt-2 space-y-1">
                        {personalizationInsights.actions.map(action => (
                          <li key={action} className="rounded-lg border border-purple-400/30 bg-purple-500/10 px-3 py-2">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {personalizationInsights.metadata && typeof personalizationInsights.metadata === 'object' && (
                    <div className="mt-3 space-y-1">
                      {Object.entries(personalizationInsights.metadata)
                        .slice(0, 4)
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between gap-2 text-[11px] text-blue-100">
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
                !personalizationLoading && (
                  <p className="mt-3 text-xs text-blue-100">
                    AI journey intelligence will appear here after the first refresh.
                  </p>
                )
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {recommendationStreams.map((stream, index) => {
                const personaEntry = Object.entries(personaStreamMapping).find(([, streamId]) => streamId === stream.id);
                const mappedPersonaId = personaEntry?.[0];
                const isActiveStream = Boolean(mappedPersonaId && mappedPersonaId === activePersonaId);

                return (
                  <motion.div
                    key={stream.id}
                    tabIndex={0}
                    role="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      if (mappedPersonaId) {
                        setActivePersonaId(mappedPersonaId);
                      }
                    }}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        if (mappedPersonaId) {
                          setActivePersonaId(mappedPersonaId);
                        }
                      }
                    }}
                    className={`flex h-full flex-col gap-3 rounded-2xl border p-4 transition ${
                      isActiveStream
                        ? 'border-purple-400/50 bg-purple-500/20 shadow-lg'
                        : 'border-white/15 bg-white/10 hover:border-purple-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-blue-200">
                      <span className="uppercase tracking-[0.3em]">{stream.channel}</span>
                      <span className="font-semibold text-emerald-200">{stream.aiScore}% AI confidence</span>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-white">{stream.label}</h5>
                      <p className="mt-2 text-sm text-blue-100">{stream.summary}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between text-xs text-blue-200">
                      <span>{stream.focus}</span>
                      <motion.button
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          isActiveStream
                            ? 'bg-white text-purple-600'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {stream.callToAction}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
            <h4 className="text-white font-semibold">Persona Playbooks</h4>
            <p className="text-xs text-blue-200">
              Behavioral clusters with recommended engagement plays and confidence scores.
            </p>

            <div className="mt-5 space-y-4">
              {personaPlaybooks.map(playbook => (
                <div
                  key={playbook.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => setActivePersonaId(playbook.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActivePersonaId(playbook.id);
                    }
                  }}
                  className={`rounded-2xl border p-4 transition ${
                    playbook.id === activePersonaId
                      ? 'border-purple-400/50 bg-purple-500/20 shadow-lg'
                      : 'border-white/15 bg-white/10 hover:border-purple-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-semibold text-white">{playbook.persona}</h5>
                    <span className="text-xs font-semibold text-emerald-200">{playbook.confidence}% confidence</span>
                  </div>
                  <p className="mt-2 text-xs text-blue-100">{playbook.insight}</p>
                  <p className="mt-3 text-xs text-white/90">{playbook.play}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {playbook.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-blue-500/20 px-3 py-1 text-[11px] text-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-white font-semibold">AI Trend Signals</h4>
            <span className="text-xs uppercase tracking-[0.3em] text-blue-200">Next best actions</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {aiTrendSignals.map(signal => (
              <div key={signal.id} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-2xl text-white">
                  {signal.icon}
                </div>
                <h5 className="text-sm font-semibold text-white">{signal.title}</h5>
                <div className="mt-2 text-lg font-bold text-emerald-200">{signal.metric}</div>
                <p className="mt-2 text-xs text-blue-100">{signal.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Intelligence */}
        <div className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-white font-semibold">Regional Intelligence Bulletin</h4>
              <p className="text-xs text-blue-100">
                Daily AI brief across CES hubs spanning North America, Asia, Europe, the Middle East, and beyond.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-blue-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Updated moments ago
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {regionalIntelligence.map(region => (
              <div
                key={region.id}
                className="flex h-full flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{region.icon}</span>
                    <h5 className="text-sm font-semibold text-white">{region.country}</h5>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-blue-200">
                    {region.hub}
                  </span>
                </div>
                <div className="space-y-2 text-xs text-blue-100">
                  <p className="font-medium text-blue-50">
                    Weather snapshot:{' '}
                    <span className="font-normal text-blue-100">{region.weather}</span>
                  </p>
                  <p className="font-medium text-blue-50">
                    Energy signal:{' '}
                    <span className="font-normal text-blue-100">{region.energySignal}</span>
                  </p>
                </div>
                <p className="text-xs text-emerald-200">{region.advisory}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
