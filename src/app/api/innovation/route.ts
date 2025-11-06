import { NextRequest, NextResponse } from 'next/server';

import { callOpenRouterChat, hasOpenRouterKey } from '@/lib/openrouter';
import type { InnovationInsightContext, InnovationInsightResponse, InnovationModuleId } from '@/types/innovation';

interface ModuleResponsePayload {
  summary: string;
  highlights: string[];
  actions: string[];
  metadata?: Record<string, unknown>;
}

interface ModuleConfig {
  systemPrompt: string;
  buildUserPrompt: (context: InnovationInsightContext) => string;
  fallback: (context: InnovationInsightContext) => ModuleResponsePayload;
}

const moduleConfigs: Record<InnovationModuleId, ModuleConfig> = {
  'ai-dashboard': {
    systemPrompt:
      'You are the AI analytics narrator for CES Ltd. You turn grid demand, carbon outcomes, and weather context into concise executive-ready narratives. Always reply in compact JSON with keys summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const metric = String(context.metric ?? 'demand forecasting');
      const location = String(context.location ?? 'Philadelphia, PA');
      const weather = typeof context.weather === 'string' ? context.weather : 'seasonal conditions';
      return [
        `Focus metric: ${metric}.`,
        `Location context: ${location}.`,
        `Weather snapshot: ${weather}.`,
        'Provide two highlight bullet points and three action recommendations tailored to energy market strategists.',
      ].join(' ');
    },
    fallback: context => {
      const metric = String(context.metric ?? 'demand forecasting');
      const location = String(context.location ?? 'Philadelphia, PA');
      return {
        summary: `Using cached analytics for ${metric} in ${location}.`,
        highlights: [
          'Energy demand tracks within ±5% of the rolling 30-day baseline.',
          'Carbon intensity remains aligned with quarterly reduction targets.',
        ],
        actions: [
          'Review dispatch plan updates in the predictive dashboard.',
          'Confirm storage assets are aligned with the updated demand curve.',
          'Share the summary briefing with regional operations leads.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'iot-dashboard': {
    systemPrompt:
      'You are an IoT operations co-pilot for CES Ltd. Transform telemetry anomalies and sensor summaries into quick-read operational guidance. Respond in JSON keys summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const region = String(context.region ?? 'United States');
      const site = String(context.site ?? 'Philadelphia HQ dispatch center');
      const sensors = Array.isArray(context.sensors) ? context.sensors.join(', ') : 'temperature, state of charge, vibration';
      return [
        `Region: ${region}`,
        `Site: ${site}`,
        `Sensor focus: ${sensors}`,
        'Call out bottlenecks, resiliency notes, and immediate actions for field teams.',
      ].join('. ');
    },
    fallback: context => {
      const site = String(context.site ?? 'the selected site');
      return {
        summary: `IoT analytics fallback for ${site}.`,
        highlights: [
          'Telemetry latency remains within acceptable thresholds.',
          'Battery state-of-charge window is healthy with minimal degradation risk.',
        ],
        actions: [
          'Verify local SCADA feeds and confirm data sync overnight.',
          'Run the predictive maintenance routine on critical assets.',
          'Notify field crews if vibration alerts persist for 2 cycles.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'project-map': {
    systemPrompt:
      'You are the global delivery narrator for CES Ltd. Summarize project clusters, risks, and opportunities across the energy portfolio. Reply with JSON keys summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const projectName = String(context.projectName ?? 'Global portfolio');
      const projectType = String(context.projectType ?? 'renewable energy');
      const status = String(context.status ?? 'in-progress');
      const region = String(context.region ?? 'North America, Europe, and APAC');
      return [
        `Project selection: ${projectName}`,
        `Type: ${projectType}`,
        `Status: ${status}`,
        `Region coverage: ${region}`,
        'Share key milestones, risk considerations, and next-step actions for stakeholders.',
      ].join('. ');
    },
    fallback: context => {
      const projectName = String(context.projectName ?? 'portfolio projects');
      return {
        summary: `Showing curated insights for ${projectName}.`,
        highlights: [
          'Delivery remains on track with contingency buffers intact.',
          'Stakeholder engagement continues across utilities and regulators.',
        ],
        actions: [
          'Confirm permitting updates with regional leads.',
          'Review interconnection milestones and update Gantt trackers.',
          'Align client communications for upcoming showcase demos.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'project-showcase': {
    systemPrompt:
      'You are the immersive storyteller for CES Ltd. Provide vibrant summaries for project showcases and immersive tours. Reply with JSON keys summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const name = String(context.projectName ?? 'CES flagship project');
      const technologies = Array.isArray(context.technologies) ? context.technologies.join(', ') : 'VR, DERMS, storage';
      const iso = String(context.iso ?? 'PJM');
      return [
        `Project: ${name}`,
        `Technologies: ${technologies}`,
        `ISO/market: ${iso}`,
        'Craft a narrative that invites clients to explore the 3D showcase and lists follow-up actions.',
      ].join('. ');
    },
    fallback: context => {
      const projectName = String(context.projectName ?? 'the selected project');
      return {
        summary: `${projectName} remains a flagship example of CES immersive delivery.`,
        highlights: [
          'Interactive 3D layers illustrate grid controls and sustainability impact.',
          'Client walkthroughs highlight measurable ROI and field performance.',
        ],
        actions: [
          'Schedule a guided VR tour with the client innovation team.',
          'Share interactive dashboards alongside the showcase replay.',
          'Gather feedback to personalize the next demo segment.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'sustainability-command': {
    systemPrompt:
      'You provide carbon, ESG, and compliance command-center intelligence for CES Ltd. Output structured JSON with summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const focus = String(context.focus ?? 'global net-zero program');
      const riskFlag = String(context.riskFlag ?? 'Scope 3 data gaps');
      const offset = String(context.offset ?? 'battery storage VPP and North Sea wind credits');
      return [
        `Program focus: ${focus}`,
        `Key risk: ${riskFlag}`,
        `Offset mix: ${offset}`,
        'Spotlight progress, compliance alerts, and actions for sustainability leaders.',
      ].join('. ');
    },
    fallback: context => {
      const focus = String(context.focus ?? 'net-zero strategy');
      return {
        summary: `Continuing sustainability oversight for ${focus}.`,
        highlights: [
          'Scope 1 and 2 trajectories remain on the glidepath for 2032 targets.',
          'Priority offsets are validated with third-party registries.',
        ],
        actions: [
          'Reconcile Scope 3 supplier data before quarterly reporting.',
          'Sync renewable procurement schedules with finance and legal.',
          'Publish the ESG pulse update to executive leadership.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'market-intel': {
    systemPrompt:
      'You are the market intelligence companion for CES Ltd. Translate ISO price moves and hedge opportunities into clear, concise guidance. Reply with JSON keys summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const iso = String(context.iso ?? 'PJM, ERCOT, CAISO, IESO, JEPX');
      const trend = String(context.trend ?? 'mixed pricing across major hubs');
      const hedge = String(context.hedge ?? 'storage arbitrage and PPA spreads');
      return [
        `Focus ISOs: ${iso}`,
        `Trend snapshot: ${trend}`,
        `Hedge angle: ${hedge}`,
        'Deliver price context, risk watch items, and trading desk actions.',
      ].join('. ');
    },
    fallback: context => {
      const iso = String(context.iso ?? 'core ISO markets');
      return {
        summary: `Monitoring ${iso} with cached market analytics.`,
        highlights: [
          'Spot prices stay within the 30-day band amid variable load.',
          'PPA spreads show early strength with active developer interest.',
        ],
        actions: [
          'Push hedge ticket drafts to the commercial desk.',
          'Align risk appetite with treasury for next-week positions.',
          'Refresh ISO dashboard before the afternoon pricing window.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'web3-nft': {
    systemPrompt:
      'You are the Web3 certification guide for CES Ltd. Produce JSON with summary, highlights, actions, metadata describing sustainability NFT certificates.',
    buildUserPrompt: context => {
      const certificate = String(context.certificate ?? 'carbon reduction certificate');
      const chain = String(context.chain ?? 'Polygon');
      const benefit = String(context.benefit ?? 'transparent provenance for ESG claims');
      return [
        `Certificate type: ${certificate}`,
        `Blockchain: ${chain}`,
        `Key benefit: ${benefit}`,
        'Describe why the certificate matters and what steps a client should take next.',
      ].join('. ');
    },
    fallback: context => {
      const certificate = String(context.certificate ?? 'the selected certificate');
      return {
        summary: `${certificate} is prepared for digital issuance with cached metadata.`,
        highlights: [
          'Immutable proof supports ESG disclosures and investor reporting.',
          'Smart-contract logic enables automated attestations and transfers.',
        ],
        actions: [
          'Connect a verified wallet before initiating the mint.',
          'Review certificate metadata for compliance requirements.',
          'Notify stakeholders when the tokenized proof is live.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
  'ai-personalization': {
    systemPrompt:
      'You are the personalization strategist for CES Ltd. Convert persona inputs and engagement streams into concise guidance. Respond with JSON keys summary, highlights, actions, metadata.',
    buildUserPrompt: context => {
      const persona = String(context.persona ?? 'Energy executive');
      const channel = String(context.channel ?? 'Email and web personalization');
      const region = String(context.region ?? 'North America');
      return [
        `Persona: ${persona}`,
        `Delivery channels: ${channel}`,
        `Region focus: ${region}`,
        'Share two highlights and three actions that make the experience feel bespoke.',
      ].join('. ');
    },
    fallback: context => {
      const persona = String(context.persona ?? 'the selected persona');
      return {
        summary: `Continuing personalized stream configuration for ${persona}.`,
        highlights: [
          'Engagement scores remain above the quarterly benchmark.',
          'AI routing keeps recommendations aligned with journey milestones.',
        ],
        actions: [
          'Review the persona playbook before activating new campaigns.',
          'Sync AI touchpoints with sales and customer success cadences.',
          'Monitor conversion signals and adjust the content cadence weekly.',
        ],
        metadata: { source: 'fallback-cache' },
      };
    },
  },
};

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

function normalizeModule(moduleRaw: unknown): InnovationModuleId | null {
  if (typeof moduleRaw !== 'string') {
    return null;
  }

  const lower = moduleRaw.toLowerCase() as InnovationModuleId;
  return lower in moduleConfigs ? (lower as InnovationModuleId) : null;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    module?: string;
    context?: InnovationInsightContext;
  };

  const moduleId = normalizeModule(body.module);

  if (!moduleId) {
    return NextResponse.json({ error: 'Invalid or missing module parameter' }, { status: 400 });
  }

  const context: InnovationInsightContext =
    typeof body.context === 'object' && body.context !== null ? body.context : {};
  const config = moduleConfigs[moduleId];

  const fallbackPayload = config.fallback(context);

  if (!(await hasOpenRouterKey())) {
    const response: InnovationInsightResponse = {
      module: moduleId,
      source: 'fallback',
      summary: fallbackPayload.summary,
      highlights: fallbackPayload.highlights,
      actions: fallbackPayload.actions,
      metadata: fallbackPayload.metadata,
    };

    return NextResponse.json(response, { status: 200 });
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `${config.systemPrompt} Respond in JSON like {"summary": "...", "highlights": ["..."], "actions": ["..."], "metadata": {...}}. No markdown or extra text.`,
    },
    {
      role: 'user',
      content: config.buildUserPrompt(context),
    },
  ];

  const cacheKey = JSON.stringify({
    module: moduleId,
    context,
  });

  const chatResult = await callOpenRouterChat({
    messages,
    maxTokens: 500,
    temperature: 0.6,
    cacheKey,
    cacheTtlMs: 2 * 60 * 1000,
    responseFormat: 'json_object',
    metadata: {
      module: moduleId,
    },
  });

  if (!chatResult.ok) {
    const response: InnovationInsightResponse = {
      module: moduleId,
      source: 'fallback',
      summary: fallbackPayload.summary,
      highlights: fallbackPayload.highlights,
      actions: fallbackPayload.actions,
      metadata: fallbackPayload.metadata,
      error: chatResult.error,
    };

    return NextResponse.json(response, { status: 200 });
  }

  let parsed: ModuleResponsePayload | null = null;

  try {
    parsed = JSON.parse(chatResult.message) as ModuleResponsePayload;
  } catch (error) {
    console.warn('Failed to parse OpenRouter response', error);
  }

  if (!parsed) {
    const response: InnovationInsightResponse = {
      module: moduleId,
      source: 'fallback',
      summary: fallbackPayload.summary,
      highlights: fallbackPayload.highlights,
      actions: fallbackPayload.actions,
      metadata: fallbackPayload.metadata,
      parseError: 'Failed to parse OpenRouter response',
    };

    return NextResponse.json(response, { status: 200 });
  }

  const summary = typeof parsed.summary === 'string' && parsed.summary.trim().length > 0 ? parsed.summary.trim() : fallbackPayload.summary;
  const highlights = Array.isArray(parsed.highlights) && parsed.highlights.length > 0
    ? parsed.highlights.map(item => String(item).trim()).filter(Boolean)
    : fallbackPayload.highlights;
  const actions = Array.isArray(parsed.actions) && parsed.actions.length > 0
    ? parsed.actions.map(item => String(item).trim()).filter(Boolean)
    : fallbackPayload.actions;
  const metadata = parsed.metadata && typeof parsed.metadata === 'object'
    ? parsed.metadata
    : fallbackPayload.metadata ?? {};

  const response: InnovationInsightResponse = {
    module: moduleId,
    source: chatResult.source,
    summary,
    highlights,
    actions,
    metadata,
  };

  return NextResponse.json(response, { status: 200 });
}
