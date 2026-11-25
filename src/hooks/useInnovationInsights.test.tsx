import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useInnovationInsights } from './useInnovationInsights';

type Pending = { resolve: (body: unknown) => void; signal: AbortSignal };

// fetch stub whose responses are released by the test, honouring AbortSignal
// the way the browser does (rejecting with an AbortError).
function controllableFetch() {
  const pending: Pending[] = [];
  const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
    const signal = init?.signal as AbortSignal;
    return new Promise<Response>((resolve, reject) => {
      signal.addEventListener('abort', () =>
        reject(new DOMException('The operation was aborted.', 'AbortError')),
      );
      pending.push({
        signal,
        resolve: (body) =>
          resolve(new Response(JSON.stringify(body), { status: 200 })),
      });
    });
  });
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock, pending };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useInnovationInsights', () => {
  it('keeps loading true while a newer request is in flight after the old one is aborted', async () => {
    const { fetchMock, pending } = controllableFetch();
    const { result, rerender } = renderHook(
      ({ region }) => useInnovationInsights('market-intel', { region }),
      { initialProps: { region: 'north' } },
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(result.current.loading).toBe(true);

    // A context change supersedes the in-flight request.
    rerender({ region: 'south' });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(pending[0].signal.aborted).toBe(true);

    // Let the aborted request's rejection and finally block settle.
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      pending[1].resolve({ insights: ['south'] });
    });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ insights: ['south'] });
    expect(result.current.error).toBeNull();
  });

  it('reports a non-OK response as an error and clears loading', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 502 })),
    );
    const { result } = renderHook(() => useInnovationInsights('market-intel', {}));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Failed to fetch innovation insights (502)');
  });
});
