import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL;
const OPENROUTER_APP_NAME = process.env.OPENROUTER_APP_NAME;
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

  const hasOpenRouterKey = Boolean(OPENROUTER_API_KEY && !OPENROUTER_API_KEY.toLowerCase().includes('your-api'));

  if (hasOpenRouterKey) {
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
          messages: [
            {
              role: 'system',
              content: 'You are an energy markets strategist for CES Ltd. Provide clear, actionable recommendations.',
            },
            {
              role: 'user',
              content: `Suggest CES energy projects for ${energyFocus} in ${userLocation.city || 'the requested region'}, factoring ${weatherData.description} conditions with temperatures around ${weatherData.temperatureC}°C. Provide 3 numbered, actionable recommendations tailored to utility leaders.`,
            },
          ],
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        console.warn('OpenRouter API responded with non-200 status', response.status);
      } else {
        const completion = await response.json();
        suggestions = completion?.choices?.[0]?.message?.content?.trim() || null;
      }
    } catch (error) {
      console.warn('OpenAI request failed, serving fallback suggestions.', error);
    }
  }

  if (!suggestions) {
    suggestions = buildFallbackSuggestions(energyFocus, userLocation?.city, weatherData.description);
  }

  return NextResponse.json({
    suggestions,
    weather: weatherData,
    source: hasOpenRouterKey ? 'openrouter' : 'fallback',
  });
}
