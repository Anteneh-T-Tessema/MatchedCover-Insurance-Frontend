'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Home, Shield, CheckCircle, Star, TrendingDown } from 'lucide-react';

interface FormData {
  // Property Details
  propertyType: string;
  yearBuilt: string;
  homeValue: string;
  squareFootage: string;
  roofType: string;
  securityFeatures: string[];
  
  // Location
  address: string;
  zipCode: string;
  
  // Coverage Preferences
  coverageAmount: string;
  deductible: string;
  additionalCoverage: string[];
  
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentlyInsured: string;
  currentInsurer: string;
}

const STEPS = [
  { id: 'property', title: 'Property Details', description: 'Tell us about your home' },
  { id: 'location', title: 'Location', description: 'Where is your home located?' },
  { id: 'coverage', title: 'Coverage', description: 'What protection do you need?' },
  { id: 'personal', title: 'Personal Info', description: 'Almost done!' },
  { id: 'quote', title: 'Your Quote', description: 'See your personalized rates' }
];

interface Provider {
  name: string;
  price: string;
  rating: number;
  features: string[];
}

interface Quote {
  monthlyPremium: string;
  annualPremium: string;
  coverageAmount: string;
  deductible: string;
  providers: Provider[];
}

export default function HomeownersQuotePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    yearBuilt: '',
    homeValue: '',
    squareFootage: '',
    roofType: '',
    securityFeatures: [],
    address: '',
    zipCode: '',
    coverageAmount: '',
    deductible: '',
    additionalCoverage: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentlyInsured: '',
    currentInsurer: ''
  });

  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    
    // Generate quote when reaching the final step
    if (currentStep === STEPS.length - 2) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setQuote({
        monthlyPremium: '$127',
        annualPremium: '$1,524',
        coverageAmount: '$350,000',
        deductible: formData.deductible || '$1,000',
        providers: [
          { name: 'Progressive', price: '$127/mo', rating: 4.8, features: ['24/7 Claims', 'Snapshot Discount'] },
          { name: 'State Farm', price: '$134/mo', rating: 4.7, features: ['Good Neighbor Discount', 'Drive Safe & Save'] },
          { name: 'Allstate', price: '$142/mo', rating: 4.6, features: ['Claim RateGuard', 'Good Hands Rescue'] }
        ]
      });
      
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">MatchedCover</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Need help?</span>
              <a href="tel:1-800-555-0123" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                1-800-555-0123
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Home className="h-7 w-7 text-blue-600" />
              <span>Homeowners Insurance Quote</span>
            </h1>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {STEPS.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-2">
            <h2 className="text-lg font-semibold text-gray-900">{STEPS[currentStep].title}</h2>
            <p className="text-gray-600">{STEPS[currentStep].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
          {currentStep === 0 && (
            <PropertyDetailsStep formData={formData} updateFormData={updateFormData} />
          )}
          
          {currentStep === 1 && (
            <LocationStep formData={formData} updateFormData={updateFormData} />
          )}
          
          {currentStep === 2 && (
            <CoverageStep formData={formData} updateFormData={updateFormData} />
          )}
          
          {currentStep === 3 && (
            <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
          )}
          
          {currentStep === 4 && (
            <QuoteResultsStep quote={quote} isLoading={isLoading} />
          )}
        </div>

        {/* Navigation */}
        {currentStep < STEPS.length - 1 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>{currentStep === STEPS.length - 2 ? 'Get My Quote' : 'Continue'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyDetailsStep({ formData, updateFormData }: { 
  formData: FormData; 
  updateFormData: (updates: Partial<FormData>) => void; 
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            id="propertyType"
            value={formData.propertyType}
            onChange={(e) => updateFormData({ propertyType: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select property type</option>
            <option value="single-family">Single Family Home</option>
            <option value="townhouse">Townhouse</option>
            <option value="condo">Condominium</option>
            <option value="duplex">Duplex</option>
            <option value="mobile">Mobile Home</option>
          </select>
        </div>

        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">
            Year Built
          </label>
          <select
            id="yearBuilt"
            value={formData.yearBuilt}
            onChange={(e) => updateFormData({ yearBuilt: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select year</option>
            <option value="2020-2024">2020 - 2024</option>
            <option value="2010-2019">2010 - 2019</option>
            <option value="2000-2009">2000 - 2009</option>
            <option value="1990-1999">1990 - 1999</option>
            <option value="1980-1989">1980 - 1989</option>
            <option value="before-1980">Before 1980</option>
          </select>
        </div>

        <div>
          <label htmlFor="homeValue" className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Home Value
          </label>
          <select
            id="homeValue"
            value={formData.homeValue}
            onChange={(e) => updateFormData({ homeValue: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select home value</option>
            <option value="under-200k">Under $200,000</option>
            <option value="200k-300k">$200,000 - $300,000</option>
            <option value="300k-400k">$300,000 - $400,000</option>
            <option value="400k-500k">$400,000 - $500,000</option>
            <option value="500k-750k">$500,000 - $750,000</option>
            <option value="over-750k">Over $750,000</option>
          </select>
        </div>

        <div>
          <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-2">
            Square Footage
          </label>
          <select
            id="squareFootage"
            value={formData.squareFootage}
            onChange={(e) => updateFormData({ squareFootage: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select square footage</option>
            <option value="under-1000">Under 1,000 sq ft</option>
            <option value="1000-1500">1,000 - 1,500 sq ft</option>
            <option value="1500-2000">1,500 - 2,000 sq ft</option>
            <option value="2000-2500">2,000 - 2,500 sq ft</option>
            <option value="2500-3000">2,500 - 3,000 sq ft</option>
            <option value="over-3000">Over 3,000 sq ft</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Security Features (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Security System',
            'Smoke Detectors',
            'Burglar Alarm',
            'Fire Alarm',
            'Smart Locks',
            'Security Cameras'
          ].map((feature) => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.securityFeatures.includes(feature)}
                onChange={(e) => {
                  const features = e.target.checked
                    ? [...formData.securityFeatures, feature]
                    : formData.securityFeatures.filter(f => f !== feature);
                  updateFormData({ securityFeatures: features });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocationStep({ formData, updateFormData }: { 
  formData: FormData; 
  updateFormData: (updates: Partial<FormData>) => void; 
}) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Home Address
        </label>
        <input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your full address"
          required
        />
      </div>

      <div className="max-w-md">
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
          ZIP Code
        </label>
        <input
          id="zipCode"
          type="text"
          value={formData.zipCode}
          onChange={(e) => updateFormData({ zipCode: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter ZIP code"
          required
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900">Your Information is Secure</h4>
            <p className="text-sm text-blue-800 mt-1">
              We use bank-level encryption to protect your personal information. Your address helps us provide accurate pricing based on local factors like weather patterns and crime rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverageStep({ formData, updateFormData }: { 
  formData: FormData; 
  updateFormData: (updates: Partial<FormData>) => void; 
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Coverage Amount
          </label>
          <select
            id="coverageAmount"
            value={formData.coverageAmount}
            onChange={(e) => updateFormData({ coverageAmount: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select coverage amount</option>
            <option value="250k">$250,000</option>
            <option value="350k">$350,000 (Recommended)</option>
            <option value="500k">$500,000</option>
            <option value="750k">$750,000</option>
            <option value="1m">$1,000,000</option>
          </select>
        </div>

        <div>
          <label htmlFor="deductible" className="block text-sm font-medium text-gray-700 mb-2">
            Deductible
          </label>
          <select
            id="deductible"
            value={formData.deductible}
            onChange={(e) => updateFormData({ deductible: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select deductible</option>
            <option value="500">$500</option>
            <option value="1000">$1,000 (Most Popular)</option>
            <option value="2500">$2,500</option>
            <option value="5000">$5,000</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Additional Coverage Options
        </label>
        <div className="space-y-3">
          {[
            'Personal Property Protection',
            'Liability Coverage',
            'Loss of Use Coverage',
            'Water Backup Coverage',
            'Earthquake Coverage',
            'Flood Insurance'
          ].map((coverage) => (
            <label key={coverage} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={formData.additionalCoverage.includes(coverage)}
                onChange={(e) => {
                  const coverages = e.target.checked
                    ? [...formData.additionalCoverage, coverage]
                    : formData.additionalCoverage.filter(c => c !== coverage);
                  updateFormData({ additionalCoverage: coverages });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-900">{coverage}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function PersonalInfoStep({ formData, updateFormData }: { 
  formData: FormData; 
  updateFormData: (updates: Partial<FormData>) => void; 
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter first name"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter last name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="currentlyInsured" className="block text-sm font-medium text-gray-700 mb-2">
          Are you currently insured?
        </label>
        <select
          id="currentlyInsured"
          value={formData.currentlyInsured}
          onChange={(e) => updateFormData({ currentlyInsured: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes, I have home insurance</option>
          <option value="no">No, I&apos;m not currently insured</option>
          <option value="first-time">This is my first home</option>
        </select>
      </div>

      {formData.currentlyInsured === 'yes' && (
        <div>
          <label htmlFor="currentInsurer" className="block text-sm font-medium text-gray-700 mb-2">
            Current Insurance Company
          </label>
          <input
            id="currentInsurer"
            type="text"
            value={formData.currentInsurer}
            onChange={(e) => updateFormData({ currentInsurer: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter current insurer name"
          />
        </div>
      )}
    </div>
  );
}

function QuoteResultsStep({ quote, isLoading }: { 
  quote: Quote | null; 
  isLoading: boolean; 
}) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Calculating Your Quote</h3>
        <p className="text-gray-600">
          We&apos;re comparing rates from top insurers to find you the best deal...
        </p>
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Quote Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your Best Quote</h3>
            <p className="text-blue-100">Based on your specific needs</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{quote.monthlyPremium}</div>
            <div className="text-sm text-blue-100">per month</div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-100">Coverage Amount:</span>
            <div className="font-semibold">{quote.coverageAmount}</div>
          </div>
          <div>
            <span className="text-blue-100">Deductible:</span>
            <div className="font-semibold">{quote.deductible}</div>
          </div>
        </div>
      </div>

      {/* Provider Comparison */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingDown className="h-5 w-5 text-green-600" />
          <span>Compare Top Providers</span>
        </h4>
        
        <div className="space-y-4">
          {quote.providers.map((provider: Provider, index: number) => (
            <div key={provider.name} className={`border rounded-lg p-4 ${index === 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h5 className="font-semibold text-gray-900">{provider.name}</h5>
                    {index === 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">BEST VALUE</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{provider.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {provider.features.join(' • ')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">{provider.price}</div>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Select Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Review and customize your coverage options</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Speak with a licensed agent (optional)</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Purchase your policy online in minutes</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
