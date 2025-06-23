/**
 * English (US) - Primary Language
 * Complete insurance platform translations
 */

export default {
  // Global Navigation
  navigation: {
    home: 'Home',
    products: 'Products', 
    howItWorks: 'How It Works',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    getQuote: 'Get Quote',
    support: 'Support',
    blog: 'Blog',
    careers: 'Careers',
    signIn: 'Sign In',
    enhancedPlatform: 'Enhanced Platform',
    aiExperience: 'AI Experience',
    aboutUs: 'About Us',
    changeLanguage: 'Change Language'
  },

  // Homepage
  homepage: {
    hero: {
      title: 'Smart Insurance, Powered by AI',
      subtitle: 'Get personalized insurance quotes in seconds with our revolutionary AI agents Maya, Alex, and Sam.',
      cta: 'Get Started Now',
      secondaryCta: 'Watch Demo',
      aiPoweredBadge: 'AI-Powered Insurance Platform',
      mainTitle: 'Meet Your AI Insurance Team:',
      agentNames: 'Maya, Alex & Sam',
      description: 'Experience insurance like never before with our AI agents. Get personalized quotes, earn rewards through gamification, and enjoy an interface that\'s actually fun to use.',
      getQuoteButton: 'Get My Quote',
      watchDemoButton: 'Watch Demo',
      phone: 'Call us',
      experienceAIPlatform: 'Get Smart Quote',
      getSmartQuote: 'Get Smart Quote'
    },
    features: {
      title: 'Why Choose MatchedCover?',
      aiPowered: {
        title: 'AI-Powered Agents',
        description: 'Meet Maya, Alex, and Sam - your personal insurance assistants'
      },
      instantQuotes: {
        title: 'Instant Quotes',
        description: 'Get accurate quotes in under 30 seconds'
      },
      bestPrices: {
        title: 'Best Prices Guaranteed',
        description: 'We compare rates from top carriers to save you money'
      }
    }
  },

  // Insurance Products
  products: {
    auto: {
      name: 'Auto Insurance',
      description: 'Comprehensive coverage for your vehicle',
      features: ['Liability Coverage', 'Collision Protection', '24/7 Claims Support']
    },
    home: {
      name: 'Home Insurance', 
      description: 'Protect your most valuable asset',
      features: ['Property Protection', 'Personal Liability', 'Additional Living Expenses']
    },
    life: {
      name: 'Life Insurance',
      description: 'Financial security for your loved ones',
      features: ['Term Life', 'Whole Life', 'No Medical Exam Options']
    },
    renters: {
      name: 'Renters Insurance',
      description: 'Affordable protection for renters',
      features: ['Personal Property', 'Liability Coverage', 'Loss of Use']
    }
  },

  // AI Agents
  agents: {
    maya: {
      name: 'Maya',
      role: 'Sales Specialist',
      personality: 'Enthusiastic & Helpful',
      greeting: 'Hi! I\'m Maya, your enthusiastic insurance specialist. I\'m here to help you find the perfect coverage!',
      specialties: ['Quote Generation', 'Product Recommendations', 'Savings Optimization']
    },
    alex: {
      name: 'Alex', 
      role: 'Risk Assessment Expert',
      personality: 'Professional & Thorough',
      greeting: 'Hello, I\'m Alex. I specialize in risk assessment and ensuring you have comprehensive protection.',
      specialties: ['Risk Analysis', 'Coverage Assessment', 'Policy Optimization']
    },
    sam: {
      name: 'Sam',
      role: 'Customer Care Specialist', 
      personality: 'Empathetic & Supportive',
      greeting: 'Hi there! I\'m Sam, and I\'m here to provide caring support for all your insurance needs.',
      specialties: ['Claims Support', 'Customer Service', 'Policy Management']
    }
  },

  // Forms & Inputs
  forms: {
    personalInfo: {
      title: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code'
    },
    vehicleInfo: {
      title: 'Vehicle Information',
      year: 'Year',
      make: 'Make',
      model: 'Model',
      vin: 'VIN',
      mileage: 'Annual Mileage',
      primaryUse: 'Primary Use'
    },
    coverage: {
      title: 'Coverage Options',
      liability: 'Liability',
      collision: 'Collision',
      comprehensive: 'Comprehensive',
      uninsuredMotorist: 'Uninsured Motorist',
      deductible: 'Deductible'
    }
  },

  // Common Actions
  actions: {
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh'
  },

  // Status Messages
  status: {
    loading: 'Loading...',
    saving: 'Saving...',
    success: 'Success!',
    error: 'Error occurred',
    warning: 'Warning',
    info: 'Information',
    processing: 'Processing...',
    complete: 'Complete',
    pending: 'Pending',
    approved: 'Approved',
    denied: 'Denied'
  },

  // Claims
  claims: {
    title: 'Claims Center',
    fileNew: 'File New Claim',
    trackExisting: 'Track Existing Claim',
    claimNumber: 'Claim Number',
    dateOfLoss: 'Date of Loss',
    description: 'Description',
    status: 'Status',
    adjuster: 'Adjuster',
    estimatedAmount: 'Estimated Amount'
  },

  // Gamification 
  gamification: {
    points: 'Points',
    level: 'Level',
    badges: 'Badges',
    achievements: 'Achievements',
    leaderboard: 'Leaderboard',
    streak: 'Streak',
    challenges: 'Challenges',
    rewards: 'Rewards',
    nextLevel: 'Next Level',
    progress: 'Progress'
  },

  // Voice Commands
  voice: {
    listening: 'Listening...',
    notListening: 'Click to speak',
    noSpeechDetected: 'No speech detected',
    speechNotSupported: 'Speech not supported in this browser',
    sayCommand: 'Say a command or ask a question',
    examples: 'Try saying: "Get auto quote", "Call Maya", "Check my policy"'
  },

  // Error Messages
  errors: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    invalidDate: 'Please enter a valid date',
    invalidZip: 'Please enter a valid ZIP code',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
    networkError: 'Network error. Please try again.',
    sessionExpired: 'Your session has expired. Please login again.',
    unauthorized: 'You are not authorized to access this resource.',
    notFound: 'The requested resource was not found.',
    serverError: 'Server error. Please try again later.'
  },

  // Legal & Compliance
  legal: {
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    disclaimer: 'Disclaimer',
    copyright: '© 2025 MatchedCover. All rights reserved.',
    licensedIn: 'Licensed in all 50 states',
    dataProtection: 'Your data is protected with industry-leading security',
    gdprCompliant: 'GDPR Compliant'
  },

  // Competitive Advantages
  competitive: {
    title: 'Competitive Advantages',
    aiFirst: 'AI-First Platform',
    multiAgent: 'Multi-Agent System',
    voiceEnabled: 'Voice-Enabled Interface',
    realTimeQuotes: 'Real-Time Quotes',
    gamification: 'Gamified Experience',
    globalReach: 'Global Multi-Language Support',
    instantClaims: 'Instant Claims Processing',
    blockchainSecurity: 'Blockchain Security'
  }
} as const;
