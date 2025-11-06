import { createHash } from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

import { callOpenRouterChat, hasOpenRouterKey } from '@/lib/openrouter';
import {
  companyInfo,
  solutions,
  serviceCategories,
  businessLines,
  globalOffices,
} from '@/lib/cesData';
import { hasRedis, redisGet, redisSet } from '@/lib/redisClient';
import { runSafetyCheck } from './safety';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const fallbackReply =
  'Our AI assistant is currently unavailable. Please try again in a moment or reach out via the contact form.';

const knowledgeContext = (() => {
  const solutionsSummary = solutions
    .slice(0, 4)
    .map(solution => `• ${solution.name}: ${solution.description}`)
    .join('\n');

  const serviceSummary = serviceCategories
    .slice(0, 4)
    .map(category => `• ${category.name}: ${category.description}`)
    .join('\n');

  const businessSummary = businessLines
    .slice(0, 3)
    .map(line => `• ${line.category}: ${line.description}`)
    .join('\n');

  const officeSummary = globalOffices
    .slice(0, 5)
    .map(office => `• ${office.country} – ${office.focus?.slice(0, 2).join(', ') ?? 'Energy consulting'}`)
    .join('\n');

  return [
    `Company Snapshot:\n• Name: ${companyInfo.name}\n• Tagline: ${companyInfo.tagline}\n• Mission: ${companyInfo.mission.slice(0, 160)}…`,
    `Flagship Solutions:\n${solutionsSummary}`,
    `Industries & Services:\n${serviceSummary}`,
    `Innovation Pillars:\n${businessSummary}`,
    `Global Presence:\n${officeSummary}`,
  ].join('\n\n');
})();

type CachedChatPayload = {
  reply: string;
  insights: string[];
  suggestions: string[];
  model?: string;
  cachedAt: string;
};

const CHAT_CACHE_TTL_MS = Number(process.env.CHAT_CACHE_TTL_MS ?? 10 * 60 * 1000);
const MAX_CONTEXT_MESSAGES = 12;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const incomingMessages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

  if (incomingMessages.length === 0) {
    return NextResponse.json(
      { reply: fallbackReply, source: 'fallback', error: 'No messages provided' },
      { status: 200 },
    );
  }

  const systemPrelude: ChatMessage = {
    role: 'system',
    content: [
      'You are the CES AI concierge: a concise, professional assistant who can answer any user question—general knowledge or Customized Energy Solutions (CES) topics alike.',
      'Rules:',
      '- Always answer the user question directly using the best information available. Do not deflect if the topic is outside CES; instead, provide the best general answer you can.',
      '- When the question touches on energy, CES products, or related topics, enrich the reply with relevant facts from the CES knowledge base provided at the end.',
      '- Keep responses focused and 2-4 sentences long unless the user asks for more detail.',
      '- Return valid JSON with this structure: {"answer": "...", "insights": ["..."], "suggestions": ["..."]}.',
      '  • answer: the main response (concise, professional tone)\n  • insights: up to 2 optional bullet points that add useful facts (general or CES-related)\n  • suggestions: up to 2 follow-up questions or actions tailored to the user',
      '- If you are uncertain, say so and offer a next step. Never fabricate data.',
      'CES Knowledge Base (use only when relevant):',
      knowledgeContext,
    ].join('\n'),
  };

  const trimmedMessages =
    incomingMessages.length > MAX_CONTEXT_MESSAGES
      ? incomingMessages.slice(incomingMessages.length - MAX_CONTEXT_MESSAGES)
      : incomingMessages;

  const messagePayload = [systemPrelude, ...trimmedMessages].map(message => ({
    role: message.role,
    content: message.content,
  })) as ChatMessage[];

  const latestUserMessage = incomingMessages[incomingMessages.length - 1]?.content ?? '';
  const questionCacheKey =
    hasRedis() && latestUserMessage
      ? `chat:qa:${createHash('sha256').update(latestUserMessage.toLowerCase()).digest('hex')}`
      : null;

  if (questionCacheKey) {
    const cached = await redisGet<CachedChatPayload>(questionCacheKey);
    if (cached) {
      return NextResponse.json(
        {
          reply: cached.reply,
          source: 'cache',
          insights: cached.insights ?? [],
          suggestions: cached.suggestions ?? [],
          model: cached.model ?? 'openrouter/cache',
          cached: true,
        },
        { status: 200 },
      );
    }
  }

  const safetyResult = await runSafetyCheck(latestUserMessage);

  if (!safetyResult.allowed) {
    return NextResponse.json(
      {
        reply:
          safetyResult.reason ??
          'I’m not able to help with that question. Please ask about CES, energy topics, or general knowledge instead.',
        source: 'guardrail',
        declined: true,
      },
      { status: 200 },
    );
  }

  if (!(await hasOpenRouterKey())) {
    if (questionCacheKey) {
      const cached = await redisGet<CachedChatPayload>(questionCacheKey);
      if (cached) {
        return NextResponse.json(
          {
            reply: cached.reply,
            source: 'cache',
            insights: cached.insights ?? [],
            suggestions: cached.suggestions ?? [],
            model: cached.model ?? 'openrouter/cache',
            cached: true,
          },
          { status: 200 },
        );
      }
    }
    return NextResponse.json({ reply: fallbackReply, source: 'fallback' }, { status: 200 });
  }

  const chatResult = await callOpenRouterChat({
    messages: messagePayload,
    maxTokens: 400,
    temperature: 0.6,
    purpose: 'chatbot',
    metadata: {
      module: 'chatbot',
    },
    responseFormat: 'json_object',
  });

  if (!chatResult.ok) {
    console.warn('OpenRouter chat API failed:', chatResult.error);
    if (questionCacheKey) {
      const cached = await redisGet<CachedChatPayload>(questionCacheKey);
      if (cached) {
        return NextResponse.json(
          {
            reply: cached.reply,
            source: 'cache',
            insights: cached.insights ?? [],
            suggestions: cached.suggestions ?? [],
            model: cached.model ?? 'openrouter/cache',
            cached: true,
          },
          { status: 200 },
        );
      }
    }
    return NextResponse.json(
      {
        reply: fallbackReply,
        source: 'fallback',
        error: chatResult.error ?? 'OpenRouter request failed',
      },
      { status: 200 },
    );
  }

  let reply = chatResult.message.trim();
  let insights: string[] = [];
  let suggestions: string[] = [];

  try {
    const parsed = JSON.parse(reply) as {
      answer?: string;
      insights?: unknown;
      suggestions?: unknown;
    };
    if (parsed?.answer && typeof parsed.answer === 'string') {
      reply = parsed.answer.trim();
    }
    if (Array.isArray(parsed?.insights)) {
      insights = parsed.insights
        .map(item => (typeof item === 'string' ? item.trim() : null))
        .filter(Boolean)
        .slice(0, 2) as string[];
    }
    if (Array.isArray(parsed?.suggestions)) {
      suggestions = parsed.suggestions
        .map(item => (typeof item === 'string' ? item.trim() : null))
        .filter(Boolean)
        .slice(0, 2) as string[];
    }
  } catch (error) {
    // If parsing fails, fall back to raw reply.
    console.warn('Failed to parse chatbot JSON payload:', error);
  }

  if (questionCacheKey) {
    await redisSet(
      questionCacheKey,
      {
        reply,
        insights,
        suggestions,
        model: chatResult.model,
        cachedAt: new Date().toISOString(),
      },
      CHAT_CACHE_TTL_MS,
    );
  }

  return NextResponse.json(
    {
      reply: reply || fallbackReply,
      source: reply ? chatResult.source : 'fallback',
      model: chatResult.model,
      insights,
      suggestions,
    },
    { status: 200 },
  );
}
