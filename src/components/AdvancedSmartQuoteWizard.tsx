/**
 * Advanced Smart Quote Wizard - Strategic Implementation
 * Progressive forms with instant estimates and AI-powered optimization
 * Features Maya's sales intelligence and conversion psychology
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '@/stores/AppStore';

interface QuoteStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  required: boolean;
  fields: QuoteField[];
}

interface QuoteField {
  id: string;
  type: 'text' | 'select' | 'number' | 'date' | 'radio' | 'checkbox' | 'slider';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string; savings?: number }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  aiOptimization?: {
    savings_impact: number;
    recommendation: string;
    maya_tip: string;
  };
}

interface InstantQuote {
  carrierId: string;
  carrierName: string;
  logo: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageLevel: 'basic' | 'standard' | 'premium';
  discounts: string[];
  rating: number;
  features: string[];
  recommended: boolean;
  savings: number;
  maya_note: string;
}

interface QuoteData {
  [key: string]: string | number | boolean | string[];
}

export const AdvancedSmartQuoteWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>({});
  const [instantQuotes, setInstantQuotes] = useState<InstantQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMayaTips, setShowMayaTips] = useState(true);
  const [estimatedSavings, setEstimatedSavings] = useState(0);
  const [conversionOptimized, setConversionOptimized] = useState(false);

  const { addPoints, gameState } = useAppStore();

  // Progressive Quote Steps with AI Optimization
  const quoteSteps: QuoteStep[] = useMemo(() => [
    {
      id: 'vehicle_info',
      title: 'Tell Maya About Your Vehicle',
      description: 'Help Maya find the perfect coverage for your ride!',
      icon: '🚗',
      completed: false,
      required: true,
      fields: [
        {
          id: 'vehicle_year',
          type: 'select',
          label: 'Vehicle Year',
          options: Array.from({ length: 25 }, (_, i) => ({
            value: (2025 - i).toString(),
            label: (2025 - i).toString()
          })),
          validation: { required: true },
          aiOptimization: {
            savings_impact: 15,
            recommendation: 'Newer vehicles often qualify for safety discounts',
            maya_tip: "Newer cars = more safety features = bigger discounts! I love finding those savings! ✨"
          }
        },
        {
          id: 'vehicle_make',
          type: 'select',
          label: 'Vehicle Make',
          options: [
            { value: 'toyota', label: 'Toyota', savings: 12 },
            { value: 'honda', label: 'Honda', savings: 10 },
            { value: 'ford', label: 'Ford', savings: 8 },
            { value: 'chevrolet', label: 'Chevrolet', savings: 6 },
            { value: 'nissan', label: 'Nissan', savings: 9 },
            { value: 'bmw', label: 'BMW', savings: -5 },
            { value: 'mercedes', label: 'Mercedes-Benz', savings: -8 },
            { value: 'audi', label: 'Audi', savings: -6 }
          ],
          validation: { required: true },
          aiOptimization: {
            savings_impact: 20,
            recommendation: 'Vehicle make significantly impacts your premium',
            maya_tip: "I'm already seeing some great rates for this make! 🎯"
          }
        },
        {
          id: 'annual_mileage',
          type: 'slider',
          label: 'Annual Mileage',
          validation: { min: 1000, max: 50000 },
          aiOptimization: {
            savings_impact: 25,
            recommendation: 'Lower mileage can save you significantly',
            maya_tip: "Less driving = more savings! I'm seeing up to 25% discounts for low-mileage drivers! 🏆"
          }
        }
      ]
    },
    {
      id: 'driver_profile',
      title: 'Your Driver Profile',
      description: 'Maya needs to know about you for the best rates',
      icon: '👨‍💼',
      completed: false,
      required: true,
      fields: [
        {
          id: 'age',
          type: 'number',
          label: 'Age',
          validation: { required: true, min: 16, max: 100 },
          aiOptimization: {
            savings_impact: 30,
            recommendation: 'Age is a major factor in insurance pricing',
            maya_tip: "Great news! Your age group often qualifies for excellent rates! 🎉"
          }
        },
        {
          id: 'driving_experience',
          type: 'select',
          label: 'Years of Driving Experience',
          options: [
            { value: '0-2', label: '0-2 years', savings: -20 },
            { value: '3-5', label: '3-5 years', savings: -10 },
            { value: '6-10', label: '6-10 years', savings: 5 },
            { value: '11-20', label: '11-20 years', savings: 15 },
            { value: '20+', label: '20+ years', savings: 20 }
          ],
          validation: { required: true },
          aiOptimization: {
            savings_impact: 25,
            recommendation: 'Experience drives down your rates',
            maya_tip: "Experience pays off! I'm finding amazing rates for experienced drivers! 💪"
          }
        },
        {
          id: 'violations',
          type: 'radio',
          label: 'Any violations in the last 3 years?',
          options: [
            { value: 'none', label: 'No violations', savings: 20 },
            { value: 'minor', label: '1 minor violation', savings: -5 },
            { value: 'major', label: '1+ major violations', savings: -25 }
          ],
          validation: { required: true },
          aiOptimization: {
            savings_impact: 35,
            recommendation: 'Clean driving record = maximum savings',
            maya_tip: "Clean record = clean savings! I'm so excited about your potential discounts! ✨"
          }
        }
      ]
    },
    {
      id: 'coverage_preferences',
      title: 'Coverage Preferences',
      description: 'Maya will optimize your coverage for the best value',
      icon: '🛡️',
      completed: false,
      required: true,
      fields: [
        {
          id: 'coverage_level',
          type: 'radio',
          label: 'Preferred Coverage Level',
          options: [
            { value: 'basic', label: 'Basic - State Minimum', savings: 40 },
            { value: 'standard', label: 'Standard - Recommended', savings: 0 },
            { value: 'premium', label: 'Premium - Maximum Protection', savings: -20 }
          ],
          validation: { required: true },
          aiOptimization: {
            savings_impact: 40,
            recommendation: 'Standard coverage offers the best value',
            maya_tip: "Standard coverage hits the sweet spot of protection and savings! 🎯"
          }
        },
        {
          id: 'deductible',
          type: 'select',
          label: 'Preferred Deductible',
          options: [
            { value: '250', label: '$250', savings: -15 },
            { value: '500', label: '$500', savings: 0 },
            { value: '1000', label: '$1000', savings: 15 },
            { value: '2500', label: '$2500', savings: 30 }
          ],
          validation: { required: true },
          aiOptimization: {
            savings_impact: 20,
            recommendation: 'Higher deductible = lower premium',
            maya_tip: "Higher deductible = instant savings! I can show you exactly how much! 💰"
          }
        }
      ]
    },
    {
      id: 'optimization',
      title: "Maya's Savings Optimization",
      description: 'Let Maya find every possible discount for you!',
      icon: '🎯',
      completed: false,
      required: false,
      fields: [
        {
          id: 'bundle_opportunity',
          type: 'checkbox',
          label: 'Bundle with other insurance?',
          options: [
            { value: 'home', label: 'Home/Renters Insurance', savings: 15 },
            { value: 'life', label: 'Life Insurance', savings: 10 },
            { value: 'umbrella', label: 'Umbrella Policy', savings: 8 }
          ],
          aiOptimization: {
            savings_impact: 25,
            recommendation: 'Bundling can save 15-25% on total premiums',
            maya_tip: "Bundling is like getting a discount buffet! Let me show you the savings! 🍽️"
          }
        },
        {
          id: 'payment_preference',
          type: 'radio',
          label: 'Payment Preference',
          options: [
            { value: 'annual', label: 'Pay Annually', savings: 8 },
            { value: 'semi', label: 'Pay Semi-Annually', savings: 4 },
            { value: 'monthly', label: 'Pay Monthly', savings: 0 }
          ],
          aiOptimization: {
            savings_impact: 8,
            recommendation: 'Annual payment eliminates fees',
            maya_tip: "Annual payment = no fees = more money in your pocket! 💸"
          }
        }
      ]
    }
  ], []);

  // Maya's AI-Powered Quote Generation
  const generateInstantQuotes = (data: QuoteData): InstantQuote[] => {
    const baseRate = 120;
    const ageFactor = data.age ? Math.max(0.8, 1.5 - (Number(data.age) - 20) * 0.02) : 1;
    const makeFactors: { [key: string]: number } = {
      toyota: 0.9, honda: 0.92, ford: 0.95, chevrolet: 0.96,
      nissan: 0.93, bmw: 1.15, mercedes: 1.2, audi: 1.12
    };
    const makeFactor = makeFactors[data.vehicle_make as string] || 1;

    return [
      {
        carrierId: 'progressive',
        carrierName: 'Progressive',
        logo: '🟦',
        monthlyPremium: Math.round(baseRate * ageFactor * makeFactor * 0.95),
        annualPremium: Math.round(baseRate * ageFactor * makeFactor * 0.95 * 12 * 0.92),
        coverageLevel: 'standard',
        discounts: ['Multi-policy', 'Safe Driver', 'Online Quote'],
        rating: 4.3,
        features: ['24/7 Claims', 'Accident Forgiveness', 'Snapshot Discount'],
        recommended: false,
        savings: 180,
        maya_note: "Great rates and awesome technology! 📱"
      },
      {
        carrierId: 'geico',
        carrierName: 'GEICO',
        logo: '🦎',
        monthlyPremium: Math.round(baseRate * ageFactor * makeFactor * 0.88),
        annualPremium: Math.round(baseRate * ageFactor * makeFactor * 0.88 * 12 * 0.93),
        coverageLevel: 'standard',
        discounts: ['Federal Employee', 'Military', 'Good Student'],
        rating: 4.5,
        features: ['GEICO Mobile', 'Emergency Roadside', 'Mechanical Breakdown'],
        recommended: true,
        savings: 280,
        maya_note: "My top pick for you! Amazing savings and coverage! ⭐"
      },
      {
        carrierId: 'statefarm',
        carrierName: 'State Farm',
        logo: '🏢',
        monthlyPremium: Math.round(baseRate * ageFactor * makeFactor * 1.05),
        annualPremium: Math.round(baseRate * ageFactor * makeFactor * 1.05 * 12 * 0.94),
        coverageLevel: 'standard',
        discounts: ['Good Driver', 'Multi-car', 'Good Student'],
        rating: 4.2,
        features: ['Local Agent', 'Drive Safe & Save', 'Steer Clear'],
        recommended: false,
        savings: 80,
        maya_note: "Solid traditional option with local support! 🤝"
      }
    ];
  };

  // Handle field changes and instant quote updates
  const handleFieldChange = (fieldId: string, value: string | number | boolean | string[]) => {
    const newData = { ...quoteData, [fieldId]: value };
    setQuoteData(newData);

    // Trigger instant quote generation on key fields
    const keyFields = ['vehicle_make', 'age', 'violations', 'coverage_level'];
    if (keyFields.includes(fieldId)) {
      setIsLoading(true);
      setTimeout(() => {
        const quotes = generateInstantQuotes(newData);
        setInstantQuotes(quotes);
        setIsLoading(false);
        
        // Maya's encouragement system
        if (quotes.length > 0) {
          const bestSavings = Math.max(...quotes.map(q => q.savings));
          setEstimatedSavings(bestSavings);
          addPoints(5); // Gamification reward
        }
      }, 800);
    }
  };

  // Progress through steps
  const nextStep = () => {
    if (currentStep < quoteSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      addPoints(25); // Step completion reward
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    const totalFields = quoteSteps.reduce((acc, step) => acc + step.fields.length, 0);
    const completedFields = Object.keys(quoteData).length;
    return Math.round((completedFields / totalFields) * 100);
  }, [quoteData, quoteSteps]);

  // Maya's Tips Component
  const MayaTip: React.FC<{ tip: string; visible: boolean }> = ({ tip, visible }) => {
    if (!visible) return null;
    
    return (
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <div className="text-2xl mr-3">💕</div>
          <div>
            <div className="font-semibold text-pink-800 mb-1">Maya says:</div>
            <div className="text-pink-700 text-sm">{tip}</div>
          </div>
        </div>
      </div>
    );
  };

  const currentStepData = quoteSteps[currentStep];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Smart Quote Wizard</h2>
          <div className="text-right">
            <div className="text-sm opacity-90">Progress</div>
            <div className="text-xl font-bold">{completionPercentage}%</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          {quoteSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded-full ${
                index <= currentStep ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {estimatedSavings > 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="text-center">
              <div className="text-sm opacity-90">Estimated Annual Savings</div>
              <div className="text-2xl font-bold">${estimatedSavings}</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Step Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">{currentStepData.icon}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentStepData.title}</h3>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          {currentStepData.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {field.label}
                {field.validation?.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {/* Maya's AI Tip */}
              {showMayaTips && field.aiOptimization && (
                <MayaTip tip={field.aiOptimization.maya_tip} visible={true} />
              )}

              {/* Field Rendering */}
              {field.type === 'select' && (
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={quoteData[field.id] as string || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                      {option.savings && option.savings > 0 && ` (Save $${option.savings})`}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'radio' && (
                <div className="space-y-3">
                  {field.options?.map((option) => (
                    <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={field.id}
                        value={option.value}
                        checked={quoteData[field.id] === option.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="mr-3"
                      />
                      <span className="flex-1">{option.label}</span>
                      {option.savings && option.savings > 0 && (
                        <span className="text-green-600 font-semibold">Save ${option.savings}</span>
                      )}
                    </label>
                  ))}
                </div>
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={field.placeholder}
                  value={quoteData[field.id] as number || ''}
                  onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value))}
                  min={field.validation?.min}
                  max={field.validation?.max}
                />
              )}

              {field.type === 'slider' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min={field.validation?.min || 0}
                    max={field.validation?.max || 100}
                    value={quoteData[field.id] as number || field.validation?.min || 0}
                    onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{field.validation?.min?.toLocaleString()}</span>
                    <span className="font-semibold">{(quoteData[field.id] as number || 0).toLocaleString()} miles</span>
                    <span>{field.validation?.max?.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {field.type === 'checkbox' && (
                <div className="space-y-3">
                  {field.options?.map((option) => (
                    <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={(quoteData[field.id] as string[] || []).includes(option.value)}
                        onChange={(e) => {
                          const currentValues = quoteData[field.id] as string[] || [];
                          const newValues = e.target.checked
                            ? [...currentValues, option.value]
                            : currentValues.filter(v => v !== option.value);
                          handleFieldChange(field.id, newValues);
                        }}
                        className="mr-3"
                      />
                      <span className="flex-1">{option.label}</span>
                      {option.savings && option.savings > 0 && (
                        <span className="text-green-600 font-semibold">+${option.savings} savings</span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instant Quotes Display */}
        {instantQuotes.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4">🎯 Maya's Live Rate Comparison</h4>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Maya is finding your best rates...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {instantQuotes.map((quote) => (
                  <div
                    key={quote.carrierId}
                    className={`p-4 border rounded-lg ${
                      quote.recommended ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{quote.logo}</span>
                        <div>
                          <div className="font-semibold">{quote.carrierName}</div>
                          <div className="text-sm text-gray-600">{quote.maya_note}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ${quote.monthlyPremium}/mo
                        </div>
                        <div className="text-sm text-gray-600">
                          ${quote.annualPremium}/year
                        </div>
                        {quote.recommended && (
                          <div className="text-sm text-green-600 font-semibold">⭐ Maya's Pick</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
          >
            Previous
          </button>

          <button
            onClick={nextStep}
            disabled={currentStep === quoteSteps.length - 1}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === quoteSteps.length - 1 ? 'Complete Quote' : 'Next Step'}
          </button>
        </div>

        {/* Maya's Encouragement */}
        {completionPercentage > 50 && (
          <div className="mt-6 text-center">
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <div className="text-pink-800">
                <span className="text-2xl mr-2">🎉</span>
                "You're doing amazing! Maya has already found you ${estimatedSavings} in potential savings!"
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
