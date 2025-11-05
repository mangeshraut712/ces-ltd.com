'use client';

import { useDashboardSettings, type TemperatureUnit } from '@/context/DashboardSettingsContext';

interface DashboardSettingsControlsProps {
  className?: string;
  showAnalysisToggle?: boolean;
  showFeelsLikeToggle?: boolean;
  showHumidityToggle?: boolean;
}

const unitOptions: TemperatureUnit[] = ['celsius', 'fahrenheit'];

export default function DashboardSettingsControls({
  className,
  showAnalysisToggle = true,
  showFeelsLikeToggle = true,
  showHumidityToggle = true,
}: DashboardSettingsControlsProps) {
  const {
    temperatureUnit,
    setTemperatureUnit,
    dashboardSettings,
    toggleSetting,
  } = useDashboardSettings();

  const wrapperClass = ['space-y-4', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      <div>
        <p className="text-xs text-blue-100 uppercase tracking-[0.3em]">Temperature Units</p>
        <div className="mt-2 inline-flex rounded-full border border-white/20 bg-white/10 p-1">
          {unitOptions.map(unit => (
            <button
              key={unit}
              type="button"
              onClick={() => setTemperatureUnit(unit)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                temperatureUnit === unit
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              {unit === 'celsius' ? '°C' : '°F'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-blue-100 uppercase tracking-[0.3em]">Display Settings</p>
        <div className="mt-2 space-y-2 text-xs">
          {showFeelsLikeToggle && (
            <label className="flex items-center gap-2 text-blue-100">
              <input
                type="checkbox"
                className="h-3 w-3 accent-blue-400"
                checked={dashboardSettings.showFeelsLike}
                onChange={() => toggleSetting('showFeelsLike')}
              />
              Show feels-like temperature
            </label>
          )}
          {showHumidityToggle && (
            <label className="flex items-center gap-2 text-blue-100">
              <input
                type="checkbox"
                className="h-3 w-3 accent-blue-400"
                checked={dashboardSettings.showHumidity}
                onChange={() => toggleSetting('showHumidity')}
              />
              Show humidity metrics
            </label>
          )}
          {showAnalysisToggle && (
            <label className="flex items-center gap-2 text-blue-100">
              <input
                type="checkbox"
                className="h-3 w-3 accent-blue-400"
                checked={dashboardSettings.showAnalysisMeta}
                onChange={() => toggleSetting('showAnalysisMeta')}
              />
              Show AI analysis metadata
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
