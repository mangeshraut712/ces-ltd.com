'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface DashboardSettings {
  showHumidity: boolean;
  showFeelsLike: boolean;
  showAnalysisMeta: boolean;
}

interface DashboardSettingsContextValue {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  convertTemperature: (tempCelsius: number) => number;
  formatTemperature: (tempCelsius: number, fractionDigits?: number) => string;
  temperatureSuffix: string;
  dashboardSettings: DashboardSettings;
  toggleSetting: (key: keyof DashboardSettings) => void;
}

const DashboardSettingsContext = createContext<DashboardSettingsContextValue | undefined>(
  undefined,
);

export function DashboardSettingsProvider({ children }: { children: ReactNode }) {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [dashboardSettings, setDashboardSettings] = useState<DashboardSettings>({
    showHumidity: true,
    showFeelsLike: true,
    showAnalysisMeta: true,
  });

  const convertTemperature = useCallback(
    (tempCelsius: number) =>
      temperatureUnit === 'celsius' ? tempCelsius : (tempCelsius * 9) / 5 + 32,
    [temperatureUnit],
  );

  const formatTemperature = useCallback(
    (tempCelsius: number, fractionDigits = 1) => {
      const value = convertTemperature(tempCelsius);
      const rounded =
        Math.round(value * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
      const suffix = temperatureUnit === 'celsius' ? '°C' : '°F';
      return `${rounded}${suffix}`;
    },
    [convertTemperature, temperatureUnit],
  );

  const toggleSetting = useCallback((key: keyof DashboardSettings) => {
    setDashboardSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const temperatureSuffix = useMemo(
    () => (temperatureUnit === 'celsius' ? '°C' : '°F'),
    [temperatureUnit],
  );

  const value = useMemo<DashboardSettingsContextValue>(
    () => ({
      temperatureUnit,
      setTemperatureUnit,
      convertTemperature,
      formatTemperature,
      temperatureSuffix,
      dashboardSettings,
      toggleSetting,
    }),
    [
      temperatureUnit,
      setTemperatureUnit,
      convertTemperature,
      formatTemperature,
      temperatureSuffix,
      dashboardSettings,
      toggleSetting,
    ],
  );

  return (
    <DashboardSettingsContext.Provider value={value}>
      {children}
    </DashboardSettingsContext.Provider>
  );
}

export function useDashboardSettings() {
  const context = useContext(DashboardSettingsContext);
  if (!context) {
    throw new Error('useDashboardSettings must be used within DashboardSettingsProvider');
  }
  return context;
}
