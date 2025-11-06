'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, Line, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useInnovationInsights } from '@/hooks/useInnovationInsights';

const sustainabilityMetrics = [
  { label: 'Scope 1 Emissions', value: '18,200 tCO₂e', delta: '-12%', status: 'decreasing' },
  { label: 'Scope 2 Emissions', value: '9,450 tCO₂e', delta: '-8%', status: 'decreasing' },
  { label: 'Scope 3 Emissions', value: '42,300 tCO₂e', delta: '+3%', status: 'increasing' },
  { label: 'Renewable Mix', value: '67%', delta: '+11 pts', status: 'improving' },
];

const offsetPortfolio = [
  { id: 'na-storage', region: 'North America', asset: 'Battery storage VPP', impact: '24,000 MWh displaced', status: 'Active' },
  { id: 'eu-wind', region: 'Europe', asset: 'North Sea offshore wind', impact: '310,000 tCO₂e avoided', status: 'Verified' },
  { id: 'apac-solar', region: 'APAC', asset: 'Floating solar (VN)', impact: '82,000 tCO₂e avoided', status: 'In review' },
];

const complianceFlags = [
  { id: 'csrd', title: 'EU CSRD draft disclosure', note: 'Awaiting validation on supply-chain emissions factors', severity: 'medium' },
  { id: 'se-bureau', title: 'India SEB storage rule update', note: 'New reporting cadence for hybrid assets takes effect next quarter', severity: 'low' },
];

const statusColor: Record<string, string> = {
  decreasing: 'text-emerald-300',
  improving: 'text-emerald-300',
  increasing: 'text-amber-300',
};

const severityStyles: Record<'low' | 'medium' | 'high', string> = {
  low: 'border-emerald-400/30 bg-emerald-800/50 text-emerald-100',
  medium: 'border-amber-400/40 bg-amber-500/15 text-amber-200',
  high: 'border-red-400/40 bg-red-500/15 text-red-200',
};

const emissionsTrend = [
  { quarter: 'Q1', scope1: 20500, scope2: 11200, renewableMix: 58 },
  { quarter: 'Q2', scope1: 19600, scope2: 10800, renewableMix: 61 },
  { quarter: 'Q3', scope1: 18750, scope2: 10150, renewableMix: 64 },
  { quarter: 'Q4', scope1: 18200, scope2: 9450, renewableMix: 67 },
];

export default function SustainabilityCommandCenter() {
  const {
    data: sustainabilityInsights,
    loading: sustainabilityLoading,
    error: sustainabilityError,
    refresh: refreshSustainabilityInsights,
  } = useInnovationInsights('sustainability-command', {
    focus: 'Net-zero trajectory 2032',
    riskFlag: complianceFlags[0]?.title ?? 'Scope 3 data gaps',
    offset: offsetPortfolio.map(asset => asset.asset),
  });
  const sustainabilitySource = sustainabilityInsights?.source ?? (sustainabilityError ? 'fallback' : 'pending');

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950 p-6 text-emerald-50 shadow-xl shadow-emerald-950/30">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Sustainability Command Center</h3>
          <p className="text-sm text-emerald-100">
            Real-time carbon accounting, renewable procurement, and compliance watchlists across CES global portfolios.
          </p>
          <p className="mt-1 text-xs text-emerald-200 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 ${
                sustainabilitySource === 'openrouter' ? 'text-emerald-200' : sustainabilitySource === 'pending' ? 'text-amber-200' : 'text-slate-200'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  sustainabilitySource === 'openrouter' ? 'bg-emerald-400' : sustainabilitySource === 'pending' ? 'bg-amber-300' : 'bg-blue-400'
                }`}
              />
              {sustainabilitySource === 'openrouter' ? 'Live OpenRouter intelligence' : sustainabilitySource === 'pending' ? 'Analyzing' : 'Fallback cache'}
            </span>
          </p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs text-emerald-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Net-zero trajectory: 2032
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sustainabilityMetrics.map(metric => (
          <div
            key={metric.label}
            className="rounded-2xl border border-emerald-500/40 bg-emerald-900/70 p-4 shadow-inner shadow-emerald-950/30"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
            <p className={`mt-1 text-xs font-semibold ${statusColor[metric.status]}`}>{metric.delta} vs. LY</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-500/35 bg-emerald-900/70 p-4 shadow-inner shadow-emerald-950/30">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
          Emission & Renewable Trajectory
        </p>
        <div className="mt-4 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emissionsTrend}>
              <defs>
                <linearGradient id="scope1Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="scope2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="quarter" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="emissions" stroke="#9ca3af" fontSize={12} />
              <YAxis
                yAxisId="mix"
                orientation="right"
                stroke="#bbf7d0"
                fontSize={12}
                axisLine={false}
                tickFormatter={value => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5f5',
                  borderRadius: '8px',
                  color: '#0f172a',
                }}
                formatter={(value: number, name) =>
                  name === 'renewableMix'
                    ? [`${value}%`, 'Renewable Mix']
                    : [`${value.toLocaleString()} tCO₂e`, name === 'scope1' ? 'Scope 1' : 'Scope 2']
                }
              />
              <Area
                yAxisId="emissions"
                type="monotone"
                dataKey="scope1"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#scope1Gradient)"
              />
              <Area
                yAxisId="emissions"
                type="monotone"
                dataKey="scope2"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="url(#scope2Gradient)"
              />
              <Line
                yAxisId="mix"
                type="monotone"
                dataKey="renewableMix"
                stroke="#bbf7d0"
                strokeWidth={2}
                dot={{ strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-slate-200">
          Renewable mix climbed to {emissionsTrend.at(-1)?.renewableMix ?? 0}% while scope emissions trend downward across the year.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-2xl border border-emerald-500/35 bg-emerald-900/70 p-4 shadow-inner shadow-emerald-950/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.3em]">Carbon Offset Portfolio</h4>
            <span className="text-xs text-emerald-200">Verified by CES Climate Analytics</span>
          </div>

          <div className="mt-4 space-y-3">
            {offsetPortfolio.map(asset => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-emerald-500/30 bg-emerald-800/60 p-3"
              >
                <div className="flex items-center justify-between text-xs text-emerald-200">
                  <span className="uppercase tracking-[0.25em]">{asset.region}</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold text-emerald-200">
                    {asset.status}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-white">{asset.asset}</p>
                <p className="text-xs text-slate-200">{asset.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/35 bg-emerald-900/70 p-4 shadow-inner shadow-emerald-950/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.3em]">Compliance Signals</h4>
            <span className="text-xs text-emerald-200">Automated via Gemini policy monitor</span>
          </div>

          <div className="mt-4 space-y-3">
            {complianceFlags.map(flag => (
              <div
                key={flag.id}
                className={`rounded-xl border px-3 py-2 text-xs ${severityStyles[flag.severity as 'low' | 'medium' | 'high']}`}
              >
                <p className="font-semibold uppercase tracking-[0.2em]">{flag.title}</p>
                <p className="mt-2 text-[11px] leading-relaxed">{flag.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-800/60 p-3 text-xs text-slate-200">
            <p className="font-semibold text-white">Next action</p>
            <p className="mt-1">
              Sync carbon ledger with partner supply-chain data feeds to unlock Scope 3 reconciliation before quarter close.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-500/35 bg-emerald-900/70 p-6 shadow-inner shadow-emerald-950/30">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            AI Sustainability Brief
          </p>
          <button
            type="button"
            onClick={refreshSustainabilityInsights}
            disabled={sustainabilityLoading}
              className={`text-[10px] font-semibold rounded-full border px-3 py-1 transition ${
                sustainabilityLoading
                  ? 'border-white/20 bg-white/5 text-slate-200 cursor-not-allowed'
                  : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/20'
              }`}
          >
            {sustainabilityLoading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {sustainabilityError && (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-2 text-[11px] text-red-200">
            {sustainabilityError}
          </p>
        )}

        {sustainabilityInsights ? (
          <div className="mt-3 space-y-3 text-sm text-slate-200 leading-relaxed">
            <p className="text-white font-semibold">Source: {sustainabilityInsights.source}</p>
            <p>{sustainabilityInsights.summary}</p>
            {sustainabilityInsights.highlights.length > 0 && (
              <ul className="space-y-1 text-xs">
                {sustainabilityInsights.highlights.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {sustainabilityInsights.actions.length > 0 && (
              <div>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                  Immediate Actions
                </p>
                <ul className="mt-2 space-y-1 text-xs">
                  {sustainabilityInsights.actions.map(action => (
                    <li key={action} className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sustainabilityInsights.metadata && typeof sustainabilityInsights.metadata === 'object' && (
              <div className="mt-3 space-y-1 text-xs text-slate-200">
                {Object.entries(sustainabilityInsights.metadata)
                  .slice(0, 4)
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between gap-2">
                      <span className="uppercase tracking-[0.2em] text-emerald-200">{key}</span>
                      <span className="text-white/80">
                        {typeof value === 'number' ? value.toLocaleString() : String(value)}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : (
          !sustainabilityLoading && (
            <p className="mt-3 text-xs text-slate-200">
              AI sustainability guidance appears here after the first refresh.
            </p>
          )
        )}
      </div>
    </div>
  );
}
