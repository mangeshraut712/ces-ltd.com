<a id="top"></a>

<div align="center">

# CES Ltd.

### _Next.js energy intelligence platform redesign concept_

<img src="https://img.shields.io/badge/CES_Ltd.-Platform_Concept-0EA5E9?style=for-the-badge" alt="CES badge" />
<img src="https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js badge" />
<img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=000000" alt="React badge" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript badge" />
<img src="https://img.shields.io/badge/Three.js-3D_Visuals-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js badge" />

[Live Demo](https://ces-ltd-com.vercel.app/) • [Repository](https://github.com/mangeshraut712/ces-ltd.com) • [Issues](https://github.com/mangeshraut712/ces-ltd.com/issues)

**[About](#about) • [Features](#features) • [Tech Stack](#tech-stack) • [Quick Start](#quick-start) • [Project Structure](#project-structure) • [Scripts](#scripts) • [Contact](#contact)**

</div>

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contact](#contact)

---

<a id="about"></a>

## About

This repository is a redesign concept for CES Ltd.'s energy intelligence platform. The app combines global navigation, 3D visuals, AI-assisted dashboards, multilingual content, and a set of business-facing sections that read like a modern company portal rather than a single-purpose landing page.

<a id="features"></a>

## Features

- AI dashboard and personalization flows driven by reusable service modules.
- IoT, market intelligence, and global operations pages built for dense data storytelling.
- 3D and immersive UI sections powered by React Three Fiber and Three.js.
- Internationalized routing with shared translation and registry helpers.
- Contact, careers, experts, and news pages that give the site a fuller product surface.

<a id="tech-stack"></a>

## Tech Stack

**Frontend**

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

**Visualization and Platform**

- Three.js
- React Three Fiber
- D3
- Leaflet
- Recharts

**Data and Integrations**

- `@vercel/postgres`
- `@upstash/redis`
- `wagmi` and `viem`
- `i18next`
- `openai`

<a id="quick-start"></a>

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
git clone https://github.com/mangeshraut712/ces-ltd.com.git
cd ces-ltd.com
npm install
```

### Run

```bash
npm run dev
```

For a production build:

```bash
npm run build
npm run start
```

<a id="project-structure"></a>

## Project Structure

```text
ces-ltd.com/
├── src/app/            # App Router pages and layouts
├── src/components/     # Dashboards, sections, and shared UI
├── src/lib/            # Data sources, flags, openrouter helpers
├── src/context/        # Dashboard settings and translation providers
├── scripts/            # Database and content utilities
├── public/             # Images, icons, maps, and PDFs
└── vercel.json         # Deployment configuration
```

<a id="scripts"></a>

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the site for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |
| `npm run test:openrouter` | Exercise the OpenRouter integration script |

<a id="contact"></a>

## Contact

- Live demo: [ces-ltd-com.vercel.app](https://ces-ltd-com.vercel.app/)
- Repository issues: [mangeshraut712/ces-ltd.com/issues](https://github.com/mangeshraut712/ces-ltd.com/issues)

[↑ Back to Top](#top)
