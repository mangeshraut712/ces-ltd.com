'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  InnovationInsightContext,
  InnovationInsightResponse,
  InnovationModuleId,
} from '@/types/innovation';

interface UseInnovationInsightsOptions {
  auto?: boolean;
}

interface UseInnovationInsightsResult {
  data: InnovationInsightResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useInnovationInsights(
  module: InnovationModuleId,
  context: InnovationInsightContext = {},
  options: UseInnovationInsightsOptions = {},
): UseInnovationInsightsResult {
  const auto = options.auto ?? true;

  const [data, setData] = useState<InnovationInsightResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const serializedContext = useMemo(() => JSON.stringify(context ?? {}), [context]);
  const contextPayload = useMemo(() => {
    try {
      return JSON.parse(serializedContext) as InnovationInsightContext;
    } catch {
      return {};
    }
  }, [serializedContext]);

  const fetchInsights = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/innovation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module, context: contextPayload }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch innovation insights (${response.status})`);
      }

      const payload = (await response.json()) as InnovationInsightResponse;
      setData(payload);

      if (payload.error || payload.parseError) {
        setError(payload.error ?? payload.parseError ?? 'OpenRouter returned a parse error');
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        return;
      }
      const message = err instanceof Error ? err.message : 'Unable to load innovation insights';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [contextPayload, module]);

  useEffect(() => {
    if (!auto) {
      return;
    }

    fetchInsights();

    return () => {
      abortRef.current?.abort();
    };
  }, [auto, module, serializedContext, fetchInsights]);

  const refresh = useCallback(async () => {
    await fetchInsights();
  }, [fetchInsights]);

  return {
    data,
    loading,
    error,
    refresh,
  };
}
