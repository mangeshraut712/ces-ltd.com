# CES Ltd. Prototype - CES Nexus 3.0

A cutting-edge Next.js application showcasing CES Ltd.'s innovative energy solutions platform, featuring AI-driven personalization, IoT integration, Web3 capabilities, and immersive VR experiences.

## 🚀 Features

- **AI-Powered Personalization**: Adaptive experiences using OpenAI integration
- **IoT Dashboard**: Real-time sensor monitoring and analytics with Three.js visualizations
- **Web3 Integration**: Ethereum blockchain connectivity with Wagmi and Viem
- **VR/AR Experiences**: Immersive 3D project walkthroughs using React Three Fiber
- **Global Operations**: Multi-region deployment with international office support
- **Modern UI**: Built with Tailwind CSS v4 and Framer Motion animations
- **Type-Safe**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Geist Font** - Modern typography from Vercel

### 3D & Visualization
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Three XR** - WebXR integration for VR/AR

### Blockchain & Web3
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **Ethers.js** - Ethereum wallet utilities

### Maps & Location
- **Leaflet** - Interactive maps
- **React Leaflet** - React components for Leaflet

### AI & APIs
- **OpenAI** - AI-powered features
- **Axios** - HTTP client for API calls

### Development Tools
- **ESLint 9** - Code linting with Next.js config
- **TypeScript** - Type checking and compilation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ces-ltd-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Configure your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ces-ltd-prototype/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── [locale]/       # Internationalization
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── sections/       # Page sections
│   │   ├── layout/         # Layout components
│   │   └── settings/       # Settings components
│   ├── context/            # React context providers
│   └── lib/                # Utility libraries
├── public/                 # Static assets
├── docs/                   # Documentation
└── scripts/                # Build and migration scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Internationalization

The application supports multiple locales through Next.js internationalization features. Locale-specific content is handled in the `[locale]` directory structure.

## 🔒 Security Features

- **Security Headers**: Configured in `next.config.ts`
- **XSS Protection**: Content Security Policy headers
- **Frame Options**: X-Frame-Options set to DENY
- **Type Safety**: Full TypeScript implementation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software owned by CES Ltd.

## 📞 Support

For support or questions, please contact the CES Ltd. development team.

---

**CES Ltd. - Customized Energy Solutions for a Transparent, Efficient Future**
