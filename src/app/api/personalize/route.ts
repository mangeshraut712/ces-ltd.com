import { NextRequest, NextResponse } from 'next/server';

import { callOpenRouterChat, hasOpenRouterKey } from '@/lib/openrouter';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const FALLBACK_WEATHER = {
  description: 'clear sky',
  temperatureC: 22,
  humidity: 50,
  feelsLikeC: 22,
  lastUpdated: null as string | null,
};

const buildFallbackSuggestions = (energyFocus: string, city?: string, weather?: string) => {
  const focus = energyFocus || 'sustainable energy';
  const safeCity = city || 'your region';
  const weatherSummary = weather || FALLBACK_WEATHER.description;

  return [
    `1. Launch a rapid assessment workshop focused on ${focus} initiatives for ${safeCity}, using live IoT feeds to validate current performance.`,
    `2. Deploy a pilot combining VR site reviews with AI-assisted scheduling so teams can react quickly to ${weatherSummary} conditions.`,
    `3. Activate CES Ltd.'s Web3 certification toolkit to secure procurement and carbon reporting across the next quarter.`,
  ].join('\n');
};

export async function POST(req: NextRequest) {
  const { userLocation, energyFocus } = await req.json();

  let weatherData = { ...FALLBACK_WEATHER };

  if (WEATHER_API_KEY && !WEATHER_API_KEY.toLowerCase().includes('demo')) {
    try {
      const query = userLocation?.lat && userLocation?.lon
        ? `${userLocation.lat},${userLocation.lon}`
        : userLocation?.city ?? 'Philadelphia';

      const weatherRes = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}`
      );

      if (weatherRes.ok) {
        const weather = await weatherRes.json();
        weatherData = {
          description: weather?.current?.condition?.text ?? FALLBACK_WEATHER.description,
          temperatureC: weather?.current?.temp_c ?? FALLBACK_WEATHER.temperatureC,
          humidity: weather?.current?.humidity ?? FALLBACK_WEATHER.humidity,
          feelsLikeC: weather?.current?.feelslike_c ?? FALLBACK_WEATHER.feelsLikeC,
          lastUpdated: weather?.current?.last_updated ?? null,
        };
      } else {
        console.warn('Weather API returned non-200 response:', weatherRes.status);
      }
    } catch (error) {
      console.warn('Weather API request failed, using fallback data.', error);
    }
  }

  let suggestions: string | null = null;
  let personaBriefing: string | null = null;
  let summary: string | null = null;
  let responseSource: 'openrouter' | 'fallback' = 'fallback';

  if (await hasOpenRouterKey()) {
    const cacheKey = JSON.stringify({
      type: 'personalize',
      focus: energyFocus ?? 'default',
      city: userLocation?.city ?? '',
      lat: userLocation?.lat ?? null,
      lon: userLocation?.lon ?? null,
      weather: weatherData.description,
    });

    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content:
          'You are an energy markets strategist for CES Ltd. Provide JSON only: {"summary": "...", "suggestions": ["..."], "persona_briefing": "..."} with sharp, executive-ready language.',
      },
      {
        role: 'user',
        content: `Energy focus: ${energyFocus || 'sustainable energy transformation'}.`,
      },
      {
        role: 'user',
        content: `Location: ${userLocation?.city || 'requested region'} (${userLocation?.lat ?? 'n/a'}, ${
          userLocation?.lon ?? 'n/a'
        }).`,
      },
      {
        role: 'user',
        content: `Weather context: ${weatherData.description} with temperature ${weatherData.temperatureC}°C, humidity ${weatherData.humidity}%.`,
      },
      {
        role: 'user',
        content: 'Deliver 3 concrete recommendations tuned for utility or grid leaders, plus a quick persona briefing.',
      },
    ];

    const chatResult = await callOpenRouterChat({
      messages,
      maxTokens: 450,
      temperature: 0.55,
      cacheKey,
      cacheTtlMs: 2 * 60 * 1000,
      responseFormat: 'json_object',
      metadata: {
        module: 'personalization',
      },
    });

    if (chatResult.ok) {
      let parsed: {
        summary?: string;
        suggestions?: string[];
        persona_briefing?: string;
      } | null = null;

      try {
        parsed = JSON.parse(chatResult.message);
      } catch (error) {
        console.warn('Failed to parse OpenRouter personalization payload, falling back to defaults.', error);
      }

      if (parsed) {
        responseSource = 'openrouter';
        const parsedSuggestions = Array.isArray(parsed.suggestions)
          ? parsed.suggestions.map(item => String(item).trim()).filter(Boolean)
          : [];

        if (parsedSuggestions.length > 0) {
          suggestions = parsedSuggestions.join('\n');
        }

        const parsedSummary = typeof parsed.summary === 'string' ? parsed.summary.trim() : null;
        const parsedPersona = typeof parsed.persona_briefing === 'string' ? parsed.persona_briefing.trim() : null;

        if (parsedSummary) {
          summary = parsedSummary;
        }

        if (parsedPersona) {
          personaBriefing = parsedPersona;
        }
      }
    } else {
      console.warn('OpenRouter personalization call failed, using fallback suggestions.', chatResult.error);
    }
  }

  if (!suggestions) {
    suggestions = buildFallbackSuggestions(energyFocus, userLocation?.city, weatherData.description);
  }

  return NextResponse.json({
    suggestions,
    weather: weatherData,
    summary:
      summary ??
      `AI guidance cached for ${energyFocus || 'energy innovation'} in ${userLocation?.city || 'your region'}.`,
    personaBriefing:
      personaBriefing ??
      'Maintain weekly executive touchpoints, highlight ROI milestones, and reinforce regulatory readiness across the portfolio.',
    source: responseSource,
  });
}
