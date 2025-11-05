import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL;
const OPENROUTER_APP_NAME = process.env.OPENROUTER_APP_NAME;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const fallbackReply =
  'Our AI assistant is currently unavailable. Please review the dashboards or reach out via the contact form, and we will connect you with a CES strategist.';

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
    content:
      'You are CES Nexus, an AI energy strategist for Customized Energy Solutions. Provide concise, actionable answers grounded in renewable energy, deregulated markets, and emerging tech best practices.',
  };

  const messagePayload = [systemPrelude, ...incomingMessages].map(message => ({
    role: message.role,
    content: message.content,
  }));

  const hasKey = Boolean(OPENROUTER_API_KEY && !OPENROUTER_API_KEY.toLowerCase().includes('your-api'));

  if (!hasKey) {
    return NextResponse.json({ reply: fallbackReply, source: 'fallback' }, { status: 200 });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        ...(OPENROUTER_SITE_URL ? { 'HTTP-Referer': OPENROUTER_SITE_URL } : {}),
        ...(OPENROUTER_APP_NAME ? { 'X-Title': OPENROUTER_APP_NAME } : {}),
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: messagePayload,
        max_tokens: 400,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      console.warn('OpenRouter chat API returned status:', response.status);
      return NextResponse.json({ reply: fallbackReply, source: 'fallback' }, { status: 200 });
    }

    const completion = await response.json();
    const reply = completion?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json(
      {
        reply: reply || fallbackReply,
        source: reply ? 'openrouter' : 'fallback',
      },
      { status: 200 },
    );
  } catch (error) {
    console.warn('OpenRouter chat API failed:', error);
    return NextResponse.json({ reply: fallbackReply, source: 'fallback' }, { status: 200 });
  }
}
