import { createHash } from 'node:crypto';

export type SafetyResult = {
  allowed: boolean;
  reason?: string;
};

const FENCED_JSON_PATTERN = /^```[a-zA-Z]*\s*([\s\S]*?)\s*```$/;

function collectJsonCandidates(raw: string): string[] {
  const trimmed = raw.trim();
  const candidates = [trimmed];

  const fenced = FENCED_JSON_PATTERN.exec(trimmed);
  if (fenced) {
    candidates.push(fenced[1].trim());
  }

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start !== -1 && end > start) {
    candidates.push(trimmed.slice(start, end + 1));
  }

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
  for (const candidate of collectJsonCandidates(raw)) {
    try {
      const parsed = JSON.parse(candidate) as Partial<SafetyResult> | null;
      if (parsed && typeof parsed.allowed === 'boolean') {
        const result: SafetyResult = { allowed: parsed.allowed };
        if (typeof parsed.reason === 'string' && parsed.reason.trim().length > 0) {
          result.reason = parsed.reason;
        }
        return result;
      }
    } catch {
      // Try the next extraction candidate.
    }
  }

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
