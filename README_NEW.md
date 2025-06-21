# MatchedCover Frontend

A modern, conversion-optimized insurance platform built with Next.js 14, TypeScript, and Tailwind CSS. Designed to provide the best user experience for insurance shopping with progressive forms, instant quotes, and trust-building elements.

## 🚀 Features

### Core Platform Features
- **Progressive Web App (PWA)** - App-like experience with offline capabilities
- **Conversational UI** - User-friendly, step-by-step quote process
- **Instant Quotes** - Real-time quote calculations with transparent pricing
- **Multi-Insurance Support** - Home, Auto, Life, and Business insurance
- **Mobile-First Design** - Optimized for all devices
- **Trust Elements** - Security badges, testimonials, and social proof

### User Experience Optimizations
- **Single Primary CTA** - Reduced cognitive load on homepage
- **Progressive Disclosure** - Information revealed gradually
- **Smart Defaults** - Pre-filled forms based on user behavior
- **Instant Feedback** - Real-time validation and estimates
- **Conversion Tracking** - Optimized funnel with analytics

### Technical Features
- **Next.js 14 App Router** - Latest routing and performance features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Accessible components
- **PWA Support** - Service worker and manifest
- **SEO Optimized** - Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Headless UI, Heroicons
- **Icons**: Lucide React
- **PWA**: Custom service worker
- **Development**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mactedcoverfrontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── quote/           # Quote flow pages
│   │   └── homeowners/  # Homeowners insurance quote
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable components
│   └── QuickQuoteForm.tsx
└── lib/                # Utilities and configurations

public/
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
└── icons/             # App icons
```

## 🎯 User Journey Optimization

### Homepage Strategy
- **Single CTA**: "Get Your Quote" eliminates decision paralysis
- **Trust Indicators**: Ratings, reviews, and security badges
- **Social Proof**: Customer testimonials and provider logos
- **Maya Assistant**: Conversational AI for user guidance

### Quote Flow Optimization
1. **Insurance Type Selection**: Visual cards with benefits
2. **Progressive Forms**: Step-by-step data collection
3. **Instant Estimates**: Real-time quote calculations
4. **Provider Comparison**: Side-by-side rate comparison
5. **Trust Building**: Security and process transparency

### Conversion Optimization Features
- **Form Persistence**: Data saved across sessions
- **Smart Validation**: Real-time error prevention
- **Progress Indicators**: Clear completion status
- **Exit Intent**: Recovery modals for abandonment
- **A/B Testing Ready**: Component-based optimization

## 🔒 Security & Privacy

- **Data Encryption**: Bank-level security for user information
- **Privacy First**: GDPR and CCPA compliant data handling
- **Secure Forms**: Protected data transmission
- **Session Management**: Secure user authentication

## 📱 PWA Features

- **App Installation**: Add to home screen capability
- **Offline Support**: Basic functionality without internet
- **Push Notifications**: Quote reminders and updates
- **App-like Experience**: Native mobile app feel

---

Built with ❤️ by the MatchedCover team
