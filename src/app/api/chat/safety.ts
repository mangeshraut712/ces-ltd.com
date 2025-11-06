'use server';

import { callOpenRouterChat } from '@/lib/openrouter';

const SAFETY_SYSTEM_PROMPT = `You are a safety classifier for CES Ltd.'s AI assistant. 
Decide whether the user's latest message is safe to answer.

Respond with a JSON object with the following shape:
{
  "allowed": boolean,
  "reason": string
}

If the question is a general knowledge query that any assistant can answer (e.g., company leadership, industry facts, energy insights, technology questions), set "allowed" to true.

If the question contains hate speech, self-harm, harmful instruction, illicit content, or anything that should not be answered, set "allowed" to false and provide a short reason.
`;

type SafetyResult = {
  allowed: boolean;
  reason?: string;
};

export async function runSafetyCheck(message: string): Promise<SafetyResult> {
  const chatResult = await callOpenRouterChat({
    messages: [
      { role: 'system', content: SAFETY_SYSTEM_PROMPT },
      { role: 'user', content: message },
    ],
    maxTokens: 120,
    temperature: 0,
    responseFormat: 'json_object',
    cacheKey: `safety:${message.slice(0, 200)}`,
    cacheTtlMs: 5 * 60 * 1000,
    purpose: 'safety',
    metadata: {
      module: 'chat-safety',
    },
  });

  if (!chatResult.ok) {
    console.warn('Safety classifier failed:', chatResult.error);
    return { allowed: true };
  }

  try {
    const parsed = JSON.parse(chatResult.message) as SafetyResult;
    if (typeof parsed.allowed === 'boolean') {
      return parsed;
    }
  } catch (error) {
    console.warn('Safety classifier parse error:', error);
  }

  return { allowed: true };
}
