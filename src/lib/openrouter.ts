import { hasRedis, redisGet, redisSet } from '@/lib/redisClient';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? '';
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL ?? 'http://localhost:3000';
const OPENROUTER_APP_NAME = process.env.OPENROUTER_APP_NAME ?? 'CES Platform';
const OPENROUTER_TIMEOUT_MS = Number(process.env.OPENROUTER_TIMEOUT_MS ?? 20000);

export const DEFAULT_OPENROUTER_MODEL =
  process.env.OPENROUTER_DEFAULT_MODEL ?? process.env.DEFAULT_OPENROUTER_MODEL ?? 'google/gemini-2.0-flash-exp:free';

type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface CallOptions {
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  responseFormat?: 'json_object' | 'json_schema';
  cacheKey?: string;
  cacheTtlMs?: number;
  purpose?: string;
  model?: string;
  metadata?: Record<string, unknown>;
}

interface RetryOptions {
  attempt: number;
  response?: Response;
  error?: unknown;
}

type SuccessfulResult = {
  ok: true;
  message: string;
  source: 'openrouter';
  raw: unknown;
  fromCache?: boolean;
  model: string;
};

type FailedResult = {
  ok: false;
  message: string;
  source: 'fallback';
  error: string;
};

export type OpenRouterChatResult = SuccessfulResult | FailedResult;

interface CacheEntry {
  expiresAt: number;
  result: SuccessfulResult;
}

const inMemoryCache = new Map<string, CacheEntry>();
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 400;

function isUsableKey(key: string) {
  const normalized = key.trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  if (normalized === 'demo' || normalized.includes('placeholder')) {
    return false;
  }
  return true;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shouldRetry({ attempt, response, error }: RetryOptions) {
  if (attempt >= MAX_RETRIES) {
    return false;
  }

  if (response) {
    if (response.status === 429 || response.status >= 500) {
      return true;
    }
  }

  return Boolean(error);
}

function getRetryDelay(response?: Response, attempt?: number) {
  const retryAfterHeader = response?.headers?.get('retry-after');
  if (retryAfterHeader) {
    const retryAfterSeconds = Number(retryAfterHeader);
    if (!Number.isNaN(retryAfterSeconds) && retryAfterSeconds > 0) {
      return retryAfterSeconds * 1000;
    }
  }

  const exponent = typeof attempt === 'number' ? attempt : 1;
  return RETRY_BASE_DELAY_MS * 2 ** exponent;
}

function readCache(cacheKey?: string): SuccessfulResult | null {
  if (!cacheKey) {
    return null;
  }

  const existing = inMemoryCache.get(cacheKey);
  if (!existing) {
    return null;
  }

  if (existing.expiresAt < Date.now()) {
    inMemoryCache.delete(cacheKey);
    return null;
  }

  return { ...existing.result, fromCache: true };
}

function writeCache(cacheKey: string | undefined, cacheTtlMs: number | undefined, result: SuccessfulResult) {
  if (!cacheKey || !cacheTtlMs || cacheTtlMs <= 0) {
    return;
  }

  inMemoryCache.set(cacheKey, { expiresAt: Date.now() + cacheTtlMs, result });
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown OpenRouter error';
  }
}

function buildHeaders() {
  return {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': OPENROUTER_SITE_URL,
    'X-Title': OPENROUTER_APP_NAME,
  };
}

function buildPayload(options: CallOptions) {
  const payload: Record<string, unknown> = {
    model: options.model ?? DEFAULT_OPENROUTER_MODEL,
    messages: options.messages.map(message => ({
      role: message.role,
      content: message.content,
    })),
    stream: false,
  };

  if (typeof options.maxTokens === 'number') {
    payload.max_tokens = options.maxTokens;
  }
  if (typeof options.temperature === 'number') {
    payload.temperature = options.temperature;
  }
  if (options.responseFormat) {
    payload.response_format = { type: options.responseFormat };
  }
  if (options.purpose) {
    payload.metadata = { ...(options.metadata ?? {}), purpose: options.purpose };
  } else if (options.metadata) {
    payload.metadata = options.metadata;
  }

  return payload;
}

export async function hasOpenRouterKey(): Promise<boolean> {
  return isUsableKey(OPENROUTER_API_KEY);
}

export async function callOpenRouterChat(options: CallOptions): Promise<OpenRouterChatResult> {
  const cached = readCache(options.cacheKey);
  if (cached) {
    return cached;
  }

  const redisCacheKey = options.cacheKey ? `openrouter:${options.cacheKey}` : null;

  if (redisCacheKey && hasRedis()) {
    const cachedRedis = await redisGet<SuccessfulResult>(redisCacheKey);
    if (cachedRedis) {
      writeCache(options.cacheKey, options.cacheTtlMs, cachedRedis);
      return { ...cachedRedis, fromCache: true };
    }
  }

  if (!(await hasOpenRouterKey())) {
    return {
      ok: false,
      message: '',
      source: 'fallback',
      error: 'Missing OpenRouter API key',
    };
  }

  let lastError = '';

const fallbackModelsEnv = (process.env.OPENROUTER_FALLBACK_MODELS ?? 'google/gemini-2.5-flash')
  .split(',')
  .map(entry => entry.trim())
  .filter(Boolean);

const candidateModels = Array.from(
  new Set([
    options.model ?? DEFAULT_OPENROUTER_MODEL,
    ...fallbackModelsEnv,
  ]),
).filter(Boolean);

  for (const model of candidateModels) {
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      const payload = buildPayload({ ...options, model });

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), OPENROUTER_TIMEOUT_MS);

        let response: Response;
        try {
          response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: buildHeaders(),
            body: JSON.stringify(payload),
            cache: 'no-store',
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }

        if (response.ok) {
          const data = await response.json();
          const message = String(data?.choices?.[0]?.message?.content ?? '').trim();

          if (!message) {
            return {
              ok: false,
              message: '',
              source: 'fallback',
              error: 'OpenRouter returned an empty response',
            };
          }

          const usedModel =
            typeof data?.model === 'string'
              ? data.model
              : typeof data?.choices?.[0]?.model === 'string'
                ? data.choices[0].model
                : model;

          if (!usedModel.startsWith('google/')) {
            lastError = `Received disallowed model "${usedModel}"`;
            console.warn(lastError);
            break;
          }

          const result: SuccessfulResult = {
            ok: true,
            message,
            source: 'openrouter',
            raw: data,
            model: usedModel,
          };

          writeCache(options.cacheKey, options.cacheTtlMs, result);
          if (redisCacheKey && hasRedis()) {
            await redisSet(redisCacheKey, result, options.cacheTtlMs);
          }
          if (options.cacheKey) {
            return { ...result, fromCache: false };
          }

          return result;
        }

        let errorDetail = '';
        try {
          const body = await response.json();
          errorDetail = body?.error?.message ?? body?.error ?? '';
        } catch {
          errorDetail = await response.text();
        }

        const shouldAttemptRetry = shouldRetry({ attempt, response });
        if (!shouldAttemptRetry) {
          lastError = errorDetail || `OpenRouter request failed with status ${response.status}`;
          console.warn(`OpenRouter request failed for model "${model}": ${lastError}`);
          break;
        }

        attempt += 1;
        await delay(getRetryDelay(response, attempt));
      } catch (error) {
        if ((error as Error)?.name === 'AbortError') {
          lastError = 'OpenRouter request timed out';
        } else {
          lastError = normalizeError(error);
        }
        console.warn(`OpenRouter request error for model "${model}" (attempt ${attempt + 1}): ${lastError}`);
        const shouldAttemptRetry = shouldRetry({ attempt, error });
        if (!shouldAttemptRetry) {
          break;
        }

        attempt += 1;
        await delay(getRetryDelay(undefined, attempt));
      }
    }
  }

  if (redisCacheKey && hasRedis()) {
    const fallbackRedis = await redisGet<SuccessfulResult>(redisCacheKey);
    if (fallbackRedis) {
      return { ...fallbackRedis, fromCache: true };
    }
  }

  return {
    ok: false,
    message: '',
    source: 'fallback',
    error: lastError || 'OpenRouter request failed after retries',
  };
}
