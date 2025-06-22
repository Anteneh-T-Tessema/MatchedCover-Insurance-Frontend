'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Zap, 
  Trophy, 
  Gift,
  Target,
  Sparkles,
  Shield,
  DollarSign,
  TrendingDown,
  Award,
  ChevronRight
} from 'lucide-react';

interface QuoteProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  pointsEarned: number;
  milestones: Milestone[];
}

interface Milestone {
  step: number;
  title: string;
  description: string;
  points: number;
  badge?: string;
  unlocked: boolean;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  vin?: string;
  currentValue: number;
  annualMileage: number;
  usage: string;
}

interface CoveragePreferences {
  liability: boolean;
  collision: boolean;
  comprehensive: boolean;
  uninsuredMotorist: boolean;
  deductible: number;
  coverageLimits: {
    bodilyInjury: string;
    propertyDamage: string;
  };
}

interface RiskFactors {
  drivingHistory: {
    violations: number;
    accidents: number;
    yearsLicensed: number;
  };
  creditScore: number;
  parkingLocation: string;
  antiTheftDevices: boolean;
}

interface QuoteData {
  coverageType: string;
  personalInfo: PersonalInfo;
  vehicleInfo: VehicleInfo;
  coveragePreferences: CoveragePreferences;
  riskFactors: RiskFactors;
}

const SmartQuoteWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    coverageType: '',
    personalInfo: {},
    vehicleInfo: {},
    coveragePreferences: {},
    riskFactors: {}
  });
  
  const [progress, setProgress] = useState<QuoteProgress>({
    currentStep: 0,
    totalSteps: 6,
    completedSteps: [],
    pointsEarned: 0,
    milestones: [
      {
        step: 0,
        title: 'Getting Started',
        description: 'Choose your coverage type',
        points: 10,
        badge: '🚀',
        unlocked: false
      },
      {
        step: 1,
        title: 'Personal Touch',
        description: 'Share basic information',
        points: 15,
        badge: '👤',
        unlocked: false
      },
      {
        step: 2,
        title: 'Vehicle Details',
        description: 'Tell us about your ride',
        points: 20,
        badge: '🚗',
        unlocked: false
      },
      {
        step: 3,
        title: 'Smart Protection',
        description: 'Customize your coverage',
        points: 25,
        badge: '🛡️',
        unlocked: false
      },
      {
        step: 4,
        title: 'Risk Assessment',
        description: 'AI analyzes your profile',
        points: 30,
        badge: '🧠',
        unlocked: false
      },
      {
        step: 5,
        title: 'Quote Complete',
        description: 'Get your personalized rates',
        points: 50,
        badge: '🏆',
        unlocked: false
      }
    ]
  });

  const [showReward, setShowReward] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (currentStep > progress.currentStep) {
      // Update progress and show rewards
      const newProgress = { ...progress };
      newProgress.currentStep = currentStep;
      newProgress.completedSteps.push(`step_${currentStep - 1}`);
      
      const milestone = newProgress.milestones[currentStep - 1];
      if (milestone && !milestone.unlocked) {
        milestone.unlocked = true;
        newProgress.pointsEarned += milestone.points;
        
        setShowReward({
          type: 'milestone',
          milestone,
          totalPoints: newProgress.pointsEarned
        });
        
        setTimeout(() => setShowReward(null), 3000);
      }
      
      setProgress(newProgress);
    }
  }, [currentStep, progress]);

  const handleNext = () => {
    if (currentStep < progress.totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateQuotes();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateQuotes = async () => {
    setIsGenerating(true);
    
    // Simulate AI quote generation
    setTimeout(() => {
      const mockQuotes = [
        {
          carrier: 'Premier Insurance',
          logo: '🏆',
          premium: 847,
          originalPremium: 1200,
          savings: 353,
          rating: 4.8,
          features: ['24/7 Claims', 'Accident Forgiveness', 'Roadside Assistance'],
          aiScore: 95,
          recommended: true
        },
        {
          carrier: 'SecureAuto Plus',
          logo: '🛡️',
          premium: 923,
          originalPremium: 1150,
          savings: 227,
          rating: 4.6,
          features: ['Safe Driver Discount', 'Multi-Policy Savings', 'Glass Coverage'],
          aiScore: 88,
          recommended: false
        },
        {
          carrier: 'Guardian Auto',
          logo: '⭐',
          premium: 1045,
          originalPremium: 1300,
          savings: 255,
          rating: 4.4,
          features: ['New Car Replacement', 'Rental Coverage', 'Pet Injury'],
          aiScore: 82,
          recommended: false
        }
      ];
      
      setQuotes(mockQuotes);
      setIsGenerating(false);
      
      // Award completion bonus
      setShowReward({
        type: 'completion',
        points: 100,
        totalPoints: progress.pointsEarned + 100,
        savings: mockQuotes[0].savings
      });
      setTimeout(() => setShowReward(null), 4000);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CoverageTypeStep quoteData={quoteData} setQuoteData={setQuoteData} />;
      case 1:
        return <PersonalInfoStep quoteData={quoteData} setQuoteData={setQuoteData} />;
      case 2:
        return <VehicleInfoStep quoteData={quoteData} setQuoteData={setQuoteData} />;
      case 3:
        return <CoveragePreferencesStep quoteData={quoteData} setQuoteData={setQuoteData} />;
      case 4:
        return <RiskAssessmentStep quoteData={quoteData} setQuoteData={setQuoteData} />;
      case 5:
        return <QuoteResultsStep quotes={quotes} isGenerating={isGenerating} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart Quote Wizard
              </h1>
              <p className="text-gray-600">Get personalized quotes in minutes, earn rewards!</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-4 py-2 flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">{progress.pointsEarned} points</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {progress.totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / progress.totalSteps) * 100)}% Complete
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / progress.totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full relative"
              >
                <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-md"></div>
              </motion.div>
            </div>

            {/* Milestones */}
            <div className="flex justify-between mt-4">
              {progress.milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col items-center ${
                    milestone.unlocked ? 'text-green-600' : 
                    index === currentStep ? 'text-purple-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    milestone.unlocked ? 'bg-green-100' : 
                    index === currentStep ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    {milestone.unlocked ? <CheckCircle className="w-4 h-4" /> : milestone.badge}
                  </div>
                  <span className="text-xs mt-1 text-center">{milestone.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8"
        >
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg"
            >
              <span>{currentStep === progress.totalSteps - 1 ? 'Get Quotes' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Reward Notifications */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm">
              {showReward.type === 'milestone' ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">{showReward.milestone.badge}</div>
                  <h3 className="text-lg font-bold mb-1">Milestone Unlocked!</h3>
                  <p className="text-sm opacity-90 mb-2">{showReward.milestone.title}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">+{showReward.milestone.points} points</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-lg font-bold mb-1">Quote Complete!</h3>
                  <p className="text-sm opacity-90 mb-2">You could save ${showReward.savings}!</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Gift className="w-4 h-4" />
                    <span className="font-medium">+{showReward.points} bonus points</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Step Components
const CoverageTypeStep: React.FC<{ quoteData: QuoteData; setQuoteData: (data: QuoteData) => void }> = ({ quoteData, setQuoteData }) => {
  const coverageTypes = [
    { id: 'auto', name: 'Auto Insurance', icon: '🚗', description: 'Protect your vehicle and driving record', popular: true },
    { id: 'home', name: 'Home Insurance', icon: '🏠', description: 'Safeguard your home and belongings', popular: true },
    { id: 'life', name: 'Life Insurance', icon: '❤️', description: 'Secure your family\'s future' },
    { id: 'umbrella', name: 'Umbrella Policy', icon: '☂️', description: 'Extra liability protection' }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">What coverage do you need?</h2>
        <p className="text-gray-600">Choose the type of insurance you're looking for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coverageTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setQuoteData({ ...quoteData, coverageType: type.id })}
            className={`p-6 rounded-xl border-2 transition-all ${
              quoteData.coverageType === type.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{type.icon}</div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">{type.name}</h3>
                  {type.popular && <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">Popular</span>}
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const PersonalInfoStep: React.FC<{ quoteData: QuoteData; setQuoteData: (data: QuoteData) => void }> = ({ quoteData, setQuoteData }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h2>
        <p className="text-gray-600">We use this information to find you the best rates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="12345"
          />
        </div>
      </div>
    </div>
  );
};

const VehicleInfoStep: React.FC<{ quoteData: QuoteData; setQuoteData: (data: QuoteData) => void }> = ({ quoteData, setQuoteData }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Information</h2>
        <p className="text-gray-600">Help us understand what we're protecting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Toyota</option>
            <option>Honda</option>
            <option>Ford</option>
            <option>BMW</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Camry"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Mileage</label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Less than 7,500</option>
            <option>7,500 - 15,000</option>
            <option>15,000 - 20,000</option>
            <option>More than 20,000</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const CoveragePreferencesStep: React.FC<{ quoteData: QuoteData; setQuoteData: (data: QuoteData) => void }> = ({ quoteData, setQuoteData }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coverage Preferences</h2>
        <p className="text-gray-600">Customize your protection level</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-4">Liability Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Basic', 'Standard', 'Premium'].map((level, index) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 ${
                  index === 1 ? 'border-purple-500 bg-white' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">{level}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {index === 0 && 'State minimum'}
                    {index === 1 && 'Recommended'}
                    {index === 2 && 'Maximum protection'}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-4">Deductible</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['$250', '$500', '$1,000', '$2,500'].map((amount, index) => (
              <motion.button
                key={amount}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 ${
                  index === 1 ? 'border-green-500 bg-white' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center font-medium">{amount}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RiskAssessmentStep: React.FC<{ quoteData: QuoteData; setQuoteData: (data: QuoteData) => void }> = ({ quoteData, setQuoteData }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAnalyzing(false), 3000);
  }, []);

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Risk Analysis in Progress</h2>
        <p className="text-gray-600">Our AI is analyzing your profile to find the best rates...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Risk Assessment Complete</h2>
        <p className="text-gray-600">Here's what our AI discovered about your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-800">Risk Score: Low</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Great news! Your profile indicates you're a low-risk driver, which means better rates.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Clean driving record</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Safe neighborhood</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Moderate annual mileage</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingDown className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Savings Opportunities</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            We found several ways to save on your premium!
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Multi-policy discount</span>
              <span className="text-green-600 font-medium">-15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Safe driver bonus</span>
              <span className="text-green-600 font-medium">-10%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Low mileage discount</span>
              <span className="text-green-600 font-medium">-8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuoteResultsStep: React.FC<{ quotes: any[]; isGenerating: boolean }> = ({ quotes, isGenerating }) => {
  if (isGenerating) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
        >
          <DollarSign className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating Your Quotes</h2>
        <p className="text-gray-600">Finding the best rates from top carriers...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Personalized Quotes</h2>
        <p className="text-gray-600">AI-powered recommendations based on your profile</p>
      </div>

      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border-2 ${
              quote.recommended 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{quote.logo}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-800">{quote.carrier}</h3>
                    {quote.recommended && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        AI Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < Math.floor(quote.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{quote.rating}/5</span>
                    <span className="text-xs text-purple-600">AI Score: {quote.aiScore}%</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-800">${quote.premium}</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <div className="text-sm text-green-600">
                  Save ${quote.savings} vs. average
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {quote.features.map((feature: string, featureIndex: number) => (
                  <span 
                    key={featureIndex}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="text-purple-600 font-medium text-sm hover:text-purple-700"
              >
                View Details
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 ${
                  quote.recommended
                    ? 'bg-green-600 text-white'
                    : 'bg-purple-600 text-white'
                }`}
              >
                <span>Select Quote</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartQuoteWizard;
