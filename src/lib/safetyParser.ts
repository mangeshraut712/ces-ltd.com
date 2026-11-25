import { createHash } from 'node:crypto';

export type SafetyResult = {
  allowed: boolean;
  reason?: string;
};

const FENCED_JSON_PATTERN = /^```[a-zA-Z]*\s*([\s\S]*?)\s*```$/;

/** Every balanced top-level {...} span, skipping braces inside JSON strings. */
function balancedObjects(text: string): string[] {
  const spans: string[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      if (depth > 0) inString = true;
    } else if (ch === '{') {
      if (depth === 0) start = i;
      depth += 1;
    } else if (ch === '}' && depth > 0) {
      depth -= 1;
      if (depth === 0) spans.push(text.slice(start, i + 1));
    }
  }
  return spans;
}

function collectJsonCandidates(raw: string): string[] {
  const trimmed = raw.trim();
  const candidates = [trimmed];

  const fenced = FENCED_JSON_PATTERN.exec(trimmed);
  if (fenced) {
    candidates.push(fenced[1].trim());
  }

  // Each object separately, so a restated schema or trailing braces around a
  // verdict can't turn the whole span into invalid JSON.
  candidates.push(...balancedObjects(trimmed));

  return candidates;
}

/**
 * Parses the raw safety-classifier completion into a verdict.
 *
 * Language models routinely wrap JSON in markdown fences or add
 * surrounding prose even when a JSON response format is requested.
 * A rejection that fails to parse would otherwise be discarded by the
 * fail-open default, silently disabling the safety check, so lenient
 * extraction runs first.
 */
export function parseSafetyClassifierResponse(raw: string): SafetyResult {
  let allowed: SafetyResult | null = null;
  for (const candidate of collectJsonCandidates(raw)) {
    let parsed: Partial<SafetyResult> | null;
    try {
      parsed = JSON.parse(candidate) as Partial<SafetyResult> | null;
    } catch {
      continue; // Try the next extraction candidate.
    }
    if (!parsed || typeof parsed.allowed !== 'boolean') continue;
    const result: SafetyResult = { allowed: parsed.allowed };
    if (typeof parsed.reason === 'string' && parsed.reason.trim().length > 0) {
      result.reason = parsed.reason;
    }
    // Any explicit rejection wins over an allow found elsewhere in the output.
    if (!result.allowed) return result;
    allowed ??= result;
  }
  if (allowed) return allowed;

  console.warn('Safety classifier returned no usable verdict; failing open.');
  return { allowed: true };
}

/**
 * Cache key for safety verdicts. Hashing the full message prevents two
 * different messages that merely share a 200-character prefix from
 * reusing each other's cached verdict inside the TTL window.
 */
export function buildSafetyCacheKey(message: string): string {
  return `safety:${createHash('sha256').update(message).digest('hex')}`;
}
