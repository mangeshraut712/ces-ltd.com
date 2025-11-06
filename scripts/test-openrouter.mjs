#!/usr/bin/env node

/**
 * Quick connectivity check against the OpenRouter chat completions API.
 * Usage: npm run test:openrouter
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv() {
  const searchOrder = ['.env', '.env.local'];
  for (const file of searchOrder) {
    const absolute = resolve(process.cwd(), file);
    if (!existsSync(absolute)) continue;
    const contents = readFileSync(absolute, 'utf8');
    contents
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .filter(line => !line.startsWith('#'))
      .forEach(line => {
        const [key, ...rest] = line.split('=');
        if (!key) return;
        if (process.env[key] !== undefined) return;
        process.env[key] = rest.join('=');
      });
  }
}

loadEnv();

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  console.error('❌ OPENROUTER_API_KEY is not set. Please add it to your environment.');
  process.exit(1);
}

const model =
  process.env.OPENROUTER_CHAT_MODEL ??
  process.env.OPENROUTER_DEFAULT_MODEL ??
  process.env.DEFAULT_OPENROUTER_MODEL ??
  'google/gemini-2.0-flash-exp:free';

const basePayload = {
  messages: [
    {
      role: 'system',
      content:
        'You are a diagnostic assistant for the CES innovation platform. Answer in a single short paragraph.',
    },
    {
      role: 'user',
      content: 'Summarize the AI-driven features we highlight on the CES website in 2 sentences.',
    },
  ],
  max_tokens: 150,
  temperature: 0.4,
  stream: false,
};

const headers = {
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': process.env.OPENROUTER_SITE_URL ?? 'http://localhost:3000',
  'X-Title': process.env.OPENROUTER_APP_NAME ?? 'CES Platform',
};

console.log('🔍 Testing OpenRouter connectivity…');
console.log(`   Model: ${model}`);

try {
  const payload = { ...basePayload, model };
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`❌ OpenRouter responded with status ${response.status}`);
    console.error(errorBody);
    process.exit(1);
  }

  const data = await response.json();
  const message = data?.choices?.[0]?.message?.content ?? '(no content)';

  console.log('✅ OpenRouter request succeeded.');
  console.log('---');
  console.log(message.trim());
  console.log('---');
} catch (error) {
  console.error('❌ Failed to reach OpenRouter:', error);
  process.exit(1);
}
