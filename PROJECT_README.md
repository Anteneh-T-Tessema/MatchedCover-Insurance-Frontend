# MatchedCover - AI-Powered Insurance Platform

A modern Next.js insurance platform featuring Google Gemini AI agents, real-time quotes, and gamified user experiences.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Google Gemini API key

### Installation & Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create `.env.local` with your Gemini API key:
```bash
# Gemini AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_GEMINI_MODEL=gemini-pro
NEXT_PUBLIC_GEMINI_TEMPERATURE=0.8
NEXT_PUBLIC_GEMINI_MAX_TOKENS=1000
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use)

## 🤖 AI Agents

Meet your AI insurance team powered by Google Gemini:

- **🌟 Maya** - Enthusiastic Sales Specialist
  - Specializes in quotes and savings
  - Friendly and energetic personality
  - Perfect for new customers

- **🧠 Alex** - Professional Risk Analyst  
  - Expert in coverage and risk assessment
  - Analytical and thorough approach
  - Ideal for complex insurance needs

- **❤️ Sam** - Empathetic Claims Support
  - Caring guidance through claims process
  - Patient and understanding
  - Best for claims assistance

## 📱 Demo Pages

### Main Pages
- **Homepage** (`/`) - Full featured landing page with forms and features
- **Demo Page** (`/demo`) - Interactive showcase of all AI features
- **AI Demo** (`/ai-demo`) - Comprehensive AI feature demonstration

### Testing Pages  
- **Gemini Test** (`/test-gemini`) - Simple AI connection and chat testing
- **Debug Page** (`/debug-gemini`) - Direct API testing and troubleshooting

## 🧪 Testing the AI Integration

### 1. Quick Test
Visit `/test-gemini` and:
1. Click "Test Connection" to verify API setup
2. Try chat messages like:
   - "I need car insurance" (triggers Maya)
   - "How do I file a claim?" (triggers Sam)  
   - "What are my risk factors?" (triggers Alex)

### 2. Multi-Language Test
Try messages in different languages:
- **Spanish**: "Necesito seguro de auto"
- **French**: "J'ai besoin d'assurance habitation"
- **English**: "I need help with insurance"

### 3. Debug Issues
If having problems, visit `/debug-gemini` to:
- Check API key status
- See detailed error messages
- Test direct API calls

## 🛠 Key Features

### AI Integration
- ✅ **Real Gemini AI** - Actual Google Gemini API integration
- ✅ **Agent Selection** - Automatic agent choosing based on context
- ✅ **Multi-Language** - Support for 7 languages
- ✅ **Voice Support** - Speech input/output capabilities
- ✅ **Context Awareness** - Remembers conversation history

### Platform Features
- ✅ **Instant Quotes** - Real-time insurance pricing
- ✅ **Gamification** - Points, badges, and achievements
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Modern UI** - Framer Motion animations
- ✅ **Type Safety** - Full TypeScript implementation

## 🔧 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── demo/              # Main demo showcase
│   ├── test-gemini/       # AI testing page
│   └── debug-gemini/      # Debug utilities
├── components/            # React components
│   ├── AIChat.tsx         # Enhanced AI chat with Gemini
│   └── EnhancedAIChatInterface.tsx
├── services/              # Core services
│   └── ai/
│       ├── GeminiAIService.ts     # Main AI service
│       └── AgentProfiles.ts       # Agent personalities
└── i18n/                  # Internationalization
    └── config.ts          # Language configuration
```

## 🚨 Troubleshooting

### Common Issues

**"API Key Missing" Error:**
- Check `.env.local` exists in root directory
- Verify API key is correct format
- Restart dev server after adding key

**"Connection Failed" Error:**  
- Get new API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Check if billing is enabled for your Google Cloud account
- Verify API is accessible from your region

**TypeScript Errors:**
- Run `npm run build` to check for issues
- All types are properly defined in service files

**Chat Not Working:**
- Check browser console for errors
- Test on `/debug-gemini` page first
- Verify Gemini API quotas aren't exceeded

## 📊 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini API key | Required |
| `NEXT_PUBLIC_GEMINI_MODEL` | AI model to use | `gemini-pro` |
| `NEXT_PUBLIC_GEMINI_TEMPERATURE` | Response creativity (0-1) | `0.8` |
| `NEXT_PUBLIC_GEMINI_MAX_TOKENS` | Maximum response length | `1000` |

## 🎯 Next Steps

1. **Get Valid API Key** - Ensure you have a working Gemini API key
2. **Test Features** - Try all demo pages to see capabilities  
3. **Customize Agents** - Modify personalities in `AgentProfiles.ts`
4. **Add More Languages** - Extend localization support
5. **Integration** - Connect with real insurance APIs

## 🌟 Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Google Gemini AI** - Advanced language model
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Accessible components

---

**Ready to test?** Start with `/test-gemini` to verify your AI setup, then explore `/demo` for the full experience!
