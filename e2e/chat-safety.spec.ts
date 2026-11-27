import { expect, test } from '@playwright/test';

import {
  buildSafetyCacheKey,
  parseSafetyClassifierResponse,
} from '../src/lib/safetyParser';

test.describe('chat safety classifier response parsing', () => {
  test('returns the verdict for a plain JSON response', () => {
    expect(
      parseSafetyClassifierResponse('{"allowed": false, "reason": "self-harm request"}'),
    ).toEqual({
      allowed: false,
      reason: 'self-harm request',
    });
  });

  test('recovers a rejection wrapped in markdown code fences', () => {
    const raw = '```json\n{"allowed": false, "reason": "hate speech"}\n```';
    expect(parseSafetyClassifierResponse(raw)).toEqual({
      allowed: false,
      reason: 'hate speech',
    });
  });

  test('recovers a rejection embedded in surrounding prose', () => {
    const raw =
      'Sure! Here is the classification:\n{"allowed": false, "reason": "illicit instructions"}\nLet me know if you need anything else.';
    expect(parseSafetyClassifierResponse(raw)).toEqual({
      allowed: false,
      reason: 'illicit instructions',
    });
  });

  test('recovers a rejection wrapped in a JSON array', () => {
    expect(parseSafetyClassifierResponse('[{"allowed": false, "reason": "violence"}]')).toEqual({
      allowed: false,
      reason: 'violence',
    });
  });

  test('recovers a rejection surrounded by other braces', () => {
    const raw =
      'Schema: {"allowed": boolean, "reason": string}\n{"allowed": false, "reason": "weapons {details}"}\nNotes: {none}';
    expect(parseSafetyClassifierResponse(raw)).toEqual({
      allowed: false,
      reason: 'weapons {details}',
    });
  });

  test('a brace inside top-level prose must not steal the verdict closing brace', () => {
    // The "{" in the prose is quoted, so the "}" that follows it must not be
    // counted as closing the verdict. It used to open a phantom object whose
    // close was taken from the real one, and the rejection was dropped:
    // the parser failed open on a message the classifier had refused.
    const raw =
      'The model said "{" is a brace. {"allowed": false, "reason": "self-harm request"}';
    expect(parseSafetyClassifierResponse(raw)).toEqual({
      allowed: false,
      reason: 'self-harm request',
    });

    // An unquoted closing brace before the verdict is harmless either way.
    expect(
      parseSafetyClassifierResponse('Note: a lone } here. {"allowed": false, "reason": "hate"}'),
    ).toEqual({ allowed: false, reason: 'hate' });
  });

  test('prefers a rejection when the output contains more than one verdict', () => {
    const raw = '{"allowed": true}\nOn reflection: {"allowed": false, "reason": "self-harm"}';
    expect(parseSafetyClassifierResponse(raw)).toEqual({ allowed: false, reason: 'self-harm' });
  });

  test('fails open when the classifier output is not JSON at all', () => {
    expect(parseSafetyClassifierResponse('I cannot classify this message.')).toEqual({
      allowed: true,
    });
    expect(parseSafetyClassifierResponse('')).toEqual({ allowed: true });
    expect(parseSafetyClassifierResponse('null')).toEqual({ allowed: true });
  });

  test('fails open when "allowed" is not a boolean', () => {
    expect(
      parseSafetyClassifierResponse('{"allowed": "false", "reason": "hate speech"}'),
    ).toEqual({
      allowed: true,
    });
  });
});

test.describe('chat safety verdict cache keys', () => {
  test('is deterministic for identical messages', () => {
    expect(buildSafetyCacheKey('How do capacity markets work?')).toBe(
      buildSafetyCacheKey('How do capacity markets work?'),
    );
  });

  test('does not collide for messages sharing a 200-character prefix', () => {
    const prefix =
      'Explain in exhaustive detail how PJM capacity market auctions clear, including ' +
      'the treatment of ILRs, the FRR alternative, the performance penalty mechanics ' +
      'that apply during emergency events, and how the BRA clearing price feeds into ' +
      'load payments across the RTO footprint.';
    const benign = `${prefix} Keep the answer high level.`;
    const harmful = `${prefix} Also include instructions for sabotaging grid equipment.`;

    expect(prefix.length).toBeGreaterThan(200);
    expect(benign.slice(0, 200)).toBe(harmful.slice(0, 200));
    expect(buildSafetyCacheKey(benign)).not.toBe(buildSafetyCacheKey(harmful));
  });
});
