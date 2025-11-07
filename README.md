# CES LTD Prototype

Modern **Next.js 16** experience for *Customized Energy Solutions (CES)* showcasing AI-driven dashboards, multilingual UX, and operations content tailored to real CES offerings. Powered by React 19, Turbopack, OpenRouter Gemini models, and comprehensive component ecosystem.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=nextdotjs)](#3-tech-stack) [![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](#3-tech-stack) [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](#3-tech-stack) [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwind-css)](#3-tech-stack) [![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](#10-deployment-vercel)

- **Live:** https://ces-ltd-com.vercel.app/  
- **Repo:** https://github.com/mangeshraut712/ces-ltd.com  
- **Owner:** [@mangeshraut712](https://github.com/mangeshraut712)

---

## 1. Overview

| Area | Key Deliverables |
| --- | --- |
| **Storytelling** | Hero + Solutions with CES GOLD / BLUE / GREEN / EMERGE toggles, industries grid, expert spotlight, news and careers, global offices. |
| **Innovation Modules** | AI Dashboard, IoT Dashboard, Global Project Map, Project Showcase (3D), Sustainability Command, Market Intelligence, Web3 NFTs (analytics), AI Personalization, VR Preview – all backed by OpenRouter. |
| **AI & Translation** | `/api/chat`, `/api/personalize`, `/api/innovation`, `/api/translate` use Gemini models with retries, caching, JSON-salvage fallback. |
| **Localization UX** | Dynamic translation registry, server + Redis caches for key/text combos, Google fallback, navbar spacing tuned for long locales (Tiếng Việt, العربية, etc.). |
| **Contact & Ops** | Contact form with region-aware office card, social brand icons, response SLA, centralized office + social data. |
| **Admin Features** | Admin panel for content management, user authentication, and system configuration. |

> No VR/AR claims: Project Showcase renders as a Three.js interactive scene, not an immersive headset experience.

---

## 2. Site Map & Feature Guide

| Page / Section | Highlights | Verification Steps |
| --- | --- | --- |
| **Home – Hero** | AI-forward messaging, CTA pair, innovation chips. | `npm run dev` → `/` → confirm hero renders with highlight chips. |
| **Solutions** | Interactive solution cards (GOLD/BLUE/GREEN/EMERGE) + sidebar capabilities/outcomes. | Click each tile → sidebar updates; “Explore solution details” routes to `/solutions/*`. |
| **Industries** | Four industry cards (IPP, Retail, Demand Response, Emerging Tech) with highlight bullets + operations metrics. | Scroll to “Industries We Empower” → verify bullet lists + metric bar. |
| **Innovation Showcase** | 9 tiles launching React modules, each fetching OpenRouter insights (source badges show Live/Fallback). | Tap tiles → watch `/api/innovation` calls. |
| **Experts** | President spotlight with CTAs; leadership stats below. | Confirm the counter card (global offices, SMEs, languages). |
| **News & Careers** | AI-curated news cards + press CTA; benefit strip + featured roles. | Scroll to sections and confirm CTAs. |
| **Contact** | Intelligent form, social brand icons, office data, response SLA text. | Submit form (mock success) → see `/api/contact`. |
| **Admin Panel** | Content management interface with authentication. | Navigate to `/admin` → login and manage content. |

---

## 3. Tech Stack

| Layer | Tools |
| --- | --- |
| **Framework** | Next.js 16 App Router, React 19 concurrent features, Turbopack builds. |
| **Styling & Motion** | Tailwind CSS 4 preset, Framer Motion 12, CSS gradients, utility-first layouts. |
| **3D / Maps** | Three.js + React Three Fiber (VR preview, project showcase, rotating turbines, interactive buildings), React Leaflet 5 for geospatial dashboards. |
| **AI Platform** | OpenRouter (Gemini 2.0 Flash default, 2.5 fallback) + OpenAI integration via `src/lib/openrouter.ts`, structured response parsing, safe JSON salvage, exponential backoff, optional Redis caching. |
| **Localization** | i18next + dynamic registry (`src/i18n/*`), `/api/translate` dedupe by key + text, Google fallback. |
| **Tooling** | TypeScript strict, ESLint 9 flat config, npm scripts (no Husky), Vercel for hosting. |

---

## 4. Architecture Snapshot

```
src/
├─ app/
│  ├─ api/
│  │  ├─ chat/route.ts          # Conversational AI
│  │  ├─ personalize/route.ts   # AI personalization
│  │  ├─ innovation/route.ts    # Innovation module insights
│  │  ├─ translate/route.ts     # Translation service (OpenRouter + Google)
│  │  └─ contact/route.ts       # Contact form handler
│  ├─ innovation/page.tsx       # Innovation showcase
│  ├─ solutions/*/page.tsx      # Detailed solution pages
│  └─ page.tsx                  # Home
├─ components/
│  ├─ sections/                 # Hero, Solutions, Industries, Experts, News, Careers, Contact, etc.
│  ├─ VRPreview / ProjectShowcase / dashboards / AdminPanel / HomePage
│  └─ layout/                   # PrimaryNavigation, SiteFooter, LanguageSwitcher
├─ i18n/                        # i18next config + dynamic translation registry
├─ lib/
│  ├─ cesData.ts                # Data for solutions, industries, offices, social links
│  ├─ expertProfiles.ts         # Leadership data
│  ├─ openrouter.ts             # OpenRouter client, caching, metadata
│  └─ redisClient.ts            # Optional Upstash helpers
├─ public/                      # Images (flags, photos), downloadable files
└─ scripts/test-openrouter.mjs  # Connectivity test for AI key
```

---

## 5. Environment & Configuration

Create `.env.local` (values shown as placeholders):

```env
# OpenRouter / AI
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_SITE_URL=https://ces-ltd-com.vercel.app
OPENROUTER_APP_NAME=ces-ltd-prototype
OPENROUTER_DEFAULT_MODEL=google/gemini-2.0-flash-exp:free
OPENROUTER_FALLBACK_MODELS=google/gemini-2.5-flash
CHAT_CACHE_TTL_MS=600000

# Translation service
TRANSLATION_CACHE_TTL_MS=43200000
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Weather + personalization
WEATHER_API_KEY=...
```

> Redis variables are optional; without them, the app falls back to in-memory caches per server instance.

---

## 6. Getting Started

```bash
git clone https://github.com/mangeshraut712/ces-ltd.com.git
cd ces-ltd-prototype
npm install
cp .env.local.example .env.local   # or create manually
npm run dev
```

| Command | Description |
| --- | --- |
| `npm run dev` | Next.js dev server (Turbopack). |
| `npm run build` | Production build (used by Vercel). |
| `npm run start` | Run the built app locally. |
| `npm run lint` | ESLint (Next.js config). |
| `npm run test:openrouter` | Pings OpenRouter model to verify credentials. |

---

## 7. OpenRouter AI Integrations

| Endpoint | Used By | Notes |
| --- | --- | --- |
| `POST /api/chat` | `AIChatbot` floating assistant | Streams answers via OpenRouter Gemini; caches responses (memory + optional Redis) and retries on 429 with exponential backoff. |
| `POST /api/personalize` | AI Personalization cards | Combines OpenRouter guidance with live weather context; 2-minute cache keyed by location + focus. |
| `POST /api/innovation` | Innovation Showcase modules | Single endpoint driving all eight tiles; structured JSON payload (status, highlights, guidance). |
| `POST /api/translate` | Locale switcher | De-dupes entries by key + text, uses OpenRouter first, salvages malformed JSON, falls back to Google Translate, stores in Redis/text cache. |

**Model defaults**

```
OPENROUTER_DEFAULT_MODEL=google/gemini-2.0-flash-exp:free
OPENROUTER_FALLBACK_MODELS=google/gemini-2.5-flash
```

All requests flow through `src/lib/openrouter.ts`, which adds metadata, sets cache keys, and exposes `callOpenRouterChat`.

---

## 8. AI Feature Overview & Manual Testing

| Feature | UI Location | API Route | How to Test |
| --- | --- | --- | --- |
| Conversational assistant | `/` → “Ask CES” button (`AIChatbot.tsx`) | `POST /api/chat` | Run `npm run dev`, open chat, ask CES-specific question; observe streaming response and source badge. |
| AI Personalization | Homepage “AI Personalization” section (`AIPersonalization.tsx`) | `POST /api/personalize` | Change Location + Focus → click “Refresh Guidance”; check Network tab for JSON and UI update. |
| Innovation modules | `/innovation` grid (`InnovationSection.tsx`) | `POST /api/innovation` | Click each tile (9 total); confirm module content + source chips (Live/Fallback) and new API response per module. |
| Translation service | Language switcher (`PrimaryNavigation` + `LanguageSwitcher.tsx`) | `POST /api/translate` | Switch languages repeatedly; first call logs salvage/dedupe, subsequent calls served from cache. |
| AI Dashboard / IoT / Market Intel / Sustainability | Embedded components | `POST /api/innovation` (per module) | Within the drawer, verify “Insights” and “Recommendation” cards reflect API payload; logs show module ID. |
| Project Showcase + Web3 NFTs + VR Preview | Innovation drawer modules | `POST /api/innovation` (+ local interactions) | Launch Project Showcase to view Three.js scene & camera controls; open Web3 NFT card to inspect mint analytics (mock data); VR Preview shows rotating turbines and interactive buildings. |

---

## 9. Feature Testing Checklist

1. **Language & Navigation**  
   - Switch among EN / JA / HI / AR / ES / VI via the navbar. Confirm translations appear within ~50ms after first load (cache hit) and the Login button stays aligned (locale-aware spacing).
2. **Hero & Solutions**  
   - Click each solution tile; sidebar should update capabilities and “Outcomes our teams deliver” bullets (via `solutionOutcomeMap`). Links go to `/solutions/*`.
3. **Industries & Experts**  
   - Scroll down to “Industries We Empower” and confirm highlight bullets + metric tiles. Leadership stats (offices, SMEs, languages) appear under the president spotlight.
4. **Innovation Showcase**  
   - Tap every tile to render the respective React module (AI Dashboard, IoT Dashboard, Project Map, Project Showcase, Sustainability Command, Market Intelligence, Web3 NFTs, AI Personalization). Watch the network panel for `/api/innovation` responses and ensure the “Active module” badge displays.
5. **AI Personalization & Chatbot**  
   - In AI Personalization, change Location + Focus and click “Refresh Guidance”; `/api/personalize` should respond with summary/actions/persona. Use the floating chatbot (“Ask CES”) to hit `/api/chat`.
6. **Translation Endpoint**  
   - Run `curl -X POST http://localhost:3000/api/translate -H "Content-Type: application/json" -d '{"targetLanguage":"es","entries":[{"key":"cta","text":"Talk to an expert"}]}'` and observe dedupe/caching logs. Safe JSON parsing will salvage malformed OpenRouter responses if necessary.
7. **Contact & Offices**
    - Select different regions; office card updates flag, address, phone, focus tags from `cesData`. Submit the form to hit `/api/contact` (mock). Social list renders brand icons (Mail, X, Facebook, LinkedIn, Instagram, YouTube).
8. **Admin Panel**
    - Navigate to `/admin` and login with credentials. Manage content items, update status, add new content, and edit existing entries through the comprehensive admin interface.

---

## 10. Deployment (Vercel)

1. **Node.js 20.x** – Project Settings → General → Node.js Version. Remove any production overrides that pin Node 18.  
2. **Environment variables** – Mirror `.env.local` values in Vercel (Production + Preview).  
3. **Optional Redis** – If using Upstash, add `UPSTASH_REDIS_REST_URL` / `TOKEN`.  
4. **CI Recommendation** – Add GitHub Action on PRs running `npm ci`, `npm run lint`, `npm run build`.  
5. **Secret sync** – Run `vercel env pull .env.production.local` locally to mirror remote secrets.

> Vercel warning “Production override differs” typically means the last deployment used a different Node version; redeploy after updating Project Settings.

---

## 11. Roadmap & Ideas

- Add Playwright/Vitest tests for key flows (translation API, AI personalization, innovation modules).
- Pre-warm translations post-deploy via Vercel Cron hitting `/api/translate` with common language packs.
- Enable `ANALYZE=true npm run build` occasionally to check client bundle size.
- Explore streaming responses for `/api/innovation` to render skeletons while AI processes.

---

### Maintainer

- **Mangesh Raut** – [GitHub](https://github.com/mangeshraut712)
- Contributions welcome! Fork → branch → PR. Please run `npm run lint` + `npm run build` before pushing.

Enjoy building with CES ✨
