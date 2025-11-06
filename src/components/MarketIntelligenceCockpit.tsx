'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useInnovationInsights } from '@/hooks/useInnovationInsights';

const marketSnapshots = [
  { iso: 'PJM', price: '$52.40/MWh', change: '+6.1%', load: '128 GW', note: 'Cold front driving evening peaks' },
  { iso: 'ERCOT', price: '$47.85/MWh', change: '-3.4%', load: '73 GW', note: 'Solar over-performance mid-day' },
  { iso: 'CAISO', price: '$61.12/MWh', change: '+4.9%', load: '32 GW', note: 'Hydro inflows moderating prices' },
  { iso: 'IESO', price: '$48.20/MWh', change: '+2.2%', load: '19 GW', note: 'Industrial demand trending higher' },
  { iso: 'JEPX', price: '¥12.6/kWh', change: '+1.5%', load: '140 GW', note: 'Capacity market signals stable' },
];

const ppaRadar = [
  { region: 'North America', tenor: '12 yrs', volume: '1.2 GW', spread: '$+7.5', status: 'Active bids' },
  { region: 'Europe', tenor: '10 yrs', volume: '860 MW', spread: '€+6.3', status: 'Price firming' },
  { region: 'APAC', tenor: '15 yrs', volume: '540 MW', spread: '$+5.1', status: 'Volatile' },
];

const hedgeSignals = [
  { id: 'storage-arb', title: 'Storage arbitrage window', detail: 'ERCOT HB_SOUTH peak/off-peak spread widened to $28.5 — discharge guidance recommended.' },
  { id: 'capacity-auction', title: 'Capacity auction reminder', detail: 'PJM BRA submission deadline in 9 days. Auto-populated bid scenarios ready.' },
  { id: 'carbon-price', title: 'EU ETS forward alert', detail: 'Dec-25 carbon futures broke €95; lock offsets for Dutch offshore fleet.' },
];

const priceTrendData = marketSnapshots.map(snapshot => ({
  iso: snapshot.iso,
  price: Number(snapshot.price.replace(/[^\d.-]/g, '')),
  change: Number(snapshot.change.replace(/[^\d.-]/g, '')),
}));

export default function MarketIntelligenceCockpit() {
  const {
    data: marketInsights,
    loading: marketInsightsLoading,
    error: marketInsightsError,
    refresh: refreshMarketInsights,
  } = useInnovationInsights('market-intel', {
    iso: marketSnapshots.map(snapshot => snapshot.iso),
    trend: marketSnapshots.map(snapshot => `${snapshot.iso}:${snapshot.change}`).join(', '),
    hedge: hedgeSignals[0]?.title ?? 'Storage arbitrage window',
  });

  return (
    <div className="rounded-3xl border border-blue-500/25 bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/40">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Market Intelligence Cockpit</h3>
          <p className="text-sm text-slate-200">
            Live ISO price radar, PPA benchmarks, and hedge alerts to steer procurement and trading moves in real time.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs text-slate-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Streaming from OpenRouter + market feeds
        </span>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/80">
        <table className="w-full border-collapse text-left text-xs text-slate-100">
          <thead className="bg-slate-900 text-[11px] uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="px-4 py-3">ISO</th>
              <th className="px-4 py-3">Spot Price</th>
              <th className="px-4 py-3">24h Change</th>
              <th className="px-4 py-3">System Load</th>
              <th className="px-4 py-3">AI Signal</th>
            </tr>
          </thead>
          <tbody>
            {marketSnapshots.map((row, index) => (
              <tr key={row.iso} className={index % 2 === 0 ? 'bg-slate-900/90' : 'bg-slate-900/60'}>
                <td className="px-4 py-3 font-semibold text-white">{row.iso}</td>
                <td className="px-4 py-3 text-sm text-emerald-200">{row.price}</td>
                <td className={`px-4 py-3 text-sm ${row.change.includes('-') ? 'text-red-300' : 'text-emerald-300'}`}>
                  {row.change}
                </td>
                <td className="px-4 py-3 text-sm text-slate-100">{row.load}</td>
                <td className="px-4 py-3 text-[11px] text-slate-100">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr,1fr,1fr]">
        <div className="rounded-2xl border border-blue-500/25 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Global PPA Radar</h4>
            <span className="text-xs text-slate-300">Updated hourly</span>
          </div>
          <div className="mt-4 space-y-3">
            {ppaRadar.map((ppa, index) => (
              <motion.div
                key={ppa.region}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="rounded-xl border border-blue-500/30 bg-blue-900/60 p-3 text-xs text-slate-100"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{ppa.region}</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold text-emerald-200">
                    {ppa.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
                  <span>Tenor {ppa.tenor}</span>
                  <span>Volume {ppa.volume}</span>
                  <span>Spread {ppa.spread}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/25 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Hedge Signals</h4>
            <span className="text-xs text-slate-300">Gemini-driven insights</span>
          </div>

          <div className="mt-4 space-y-3">
            {hedgeSignals.map(signal => (
              <div key={signal.id} className="rounded-xl border border-blue-500/30 bg-blue-900/60 p-3 text-xs text-slate-100">
                <p className="text-sm font-semibold text-white">{signal.title}</p>
                <p className="mt-2 text-[11px] leading-relaxed">{signal.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-900/60 p-3 text-xs text-emerald-100">
            <p className="font-semibold text-white">Next move</p>
            <p className="mt-1">
              Dispatch auto-generated hedge ticket templates to commercial team for review before EOD.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/25 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/30">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">ISO Spot Trend</h4>
            <span className="text-xs text-slate-300">MW-weighted view</span>
          </div>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="iso" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5f5',
                    borderRadius: '8px',
                    color: '#0f172a',
                  }}
                  formatter={(value: number, name) =>
                    name === 'price'
                      ? [`$${value.toFixed(2)}/MWh`, 'Spot Price']
                      : [`${value > 0 ? '+' : ''}${value.toFixed(1)}%`, '24h Change']
                  }
                />
                <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={2} />
                <Line type="monotone" dataKey="change" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-slate-200">
            Overlay compares absolute spot price versus percentage change by ISO to spotlight momentum inflection.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-blue-500/25 bg-slate-900/80 p-6 shadow-inner shadow-slate-950/30">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
              AI Trading Desk Guidance
            </p>
            <p className="text-sm text-white flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-2 text-[11px] ${
                  marketInsights?.source === 'openrouter' ? 'text-emerald-200' : 'text-slate-200'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    marketInsights?.source === 'openrouter' ? 'bg-emerald-400' : 'bg-blue-400'
                  }`}
                />
                {marketInsights?.source === 'openrouter' ? 'Live OpenRouter' : 'Fallback cache'}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={refreshMarketInsights}
            disabled={marketInsightsLoading}
            className={`text-[10px] font-semibold rounded-full border px-3 py-1 transition ${
              marketInsightsLoading
                ? 'border-white/20 bg-white/5 text-slate-200 cursor-not-allowed'
                : 'border-blue-400/30 bg-blue-500/10 text-slate-200 hover:bg-blue-500/20'
            }`}
          >
            {marketInsightsLoading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        {marketInsightsError && (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-2 text-[11px] text-red-200">
            {marketInsightsError}
          </p>
        )}

        {marketInsights ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr,0.8fr] text-sm text-slate-200 leading-relaxed">
            <p>{marketInsights.summary}</p>
            <div className="rounded-xl border border-blue-500/30 bg-blue-900/60 p-3 text-xs text-slate-100">
              <p className="font-semibold text-white uppercase tracking-[0.3em] text-[10px]">Actions</p>
              <ul className="mt-2 space-y-1">
                {marketInsights.actions.map(action => (
                  <li key={action} className="rounded-lg border border-blue-500/30 bg-blue-900/50 px-3 py-2">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            {marketInsights.metadata && typeof marketInsights.metadata === 'object' && (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-900/60 p-3 text-xs text-emerald-100">
                <p className="font-semibold text-white uppercase tracking-[0.3em] text-[10px]">Key Signals</p>
                <ul className="mt-2 space-y-1">
                  {Object.entries(marketInsights.metadata)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <li key={key} className="flex items-center justify-between gap-2">
                        <span className="uppercase tracking-[0.2em] text-emerald-200">{key}</span>
                        <span>{typeof value === 'number' ? value.toLocaleString() : String(value)}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {marketInsights.highlights.length > 0 && (
              <div className="lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">Highlights</p>
                <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                  {marketInsights.highlights.map(item => (
                    <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          !marketInsightsLoading && (
            <p className="mt-3 text-xs text-slate-200">
              AI market guidance loads here after connecting to OpenRouter analytics.
            </p>
          )
        )}
      </div>
    </div>
  );
}
