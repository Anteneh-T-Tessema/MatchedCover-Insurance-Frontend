'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, ArrowRight, Home, Car, Heart, Briefcase, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickQuoteFormProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

type InsuranceType = 'homeowners' | 'auto' | 'life' | 'business';

interface HomeDetails {
  homeValue: string;
  zipCode: string;
  yearBuilt: string;
}

interface AutoDetails {
  year: string;
  make: string;
  model: string;
  zipCode: string;
}

interface LifeDetails {
  age: string;
  gender: string;
  coverage: string;
  health: string;
}

interface BusinessDetails {
  businessType: string;
  employees: string;
  revenue: string;
  zipCode: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormData {
  insuranceType: InsuranceType | null;
  homeDetails?: HomeDetails;
  autoDetails?: AutoDetails;
  lifeDetails?: LifeDetails;
  businessDetails?: BusinessDetails;
  personalInfo?: PersonalInfo;
}

const insuranceOptions = [
  {
    type: 'homeowners' as InsuranceType,
    icon: Home,
    title: 'Home Insurance',
    description: 'Protect your home and belongings',
    avgSavings: '$312/year'
  },
  {
    type: 'auto' as InsuranceType,
    icon: Car,
    title: 'Auto Insurance',
    description: 'Get covered on the road',
    avgSavings: '$428/year'
  },
  {
    type: 'life' as InsuranceType,
    icon: Heart,
    title: 'Life Insurance',
    description: 'Secure your family\'s future',
    avgSavings: '$156/year'
  },
  {
    type: 'business' as InsuranceType,
    icon: Briefcase,
    title: 'Business Insurance',
    description: 'Protect your business assets',
    avgSavings: '$892/year'
  }
];

export default function QuickQuoteForm({ isOpen, onCloseAction }: QuickQuoteFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    insuranceType: null,
  });
  const [estimate, setEstimate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const focusRef = useRef<HTMLButtonElement>(null);

  const steps = [
    'Insurance Type',
    'Basic Details',
    'Personal Info',
    'Your Quote'
  ];

  useEffect(() => {
    if (isOpen && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isOpen]);

  const handleTypeSelect = (type: InsuranceType) => {
    setFormData({ ...formData, insuranceType: type });
    setStep(1);
  };

  const handleBasicDetails = (details: HomeDetails | AutoDetails | LifeDetails | BusinessDetails) => {
    const updatedData = { ...formData };
    if (formData.insuranceType === 'homeowners') {
      updatedData.homeDetails = details as HomeDetails;
    } else if (formData.insuranceType === 'auto') {
      updatedData.autoDetails = details as AutoDetails;
    } else if (formData.insuranceType === 'life') {
      updatedData.lifeDetails = details as LifeDetails;
    } else if (formData.insuranceType === 'business') {
      updatedData.businessDetails = details as BusinessDetails;
    }
    setFormData(updatedData);
    setStep(2);
  };

  const handlePersonalInfo = async (info: PersonalInfo) => {
    setFormData({ ...formData, personalInfo: info });
    setIsLoading(true);
    
    // Simulate quote calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic estimate based on insurance type
    const estimates = {
      homeowners: '$89/month',
      auto: '$142/month',
      life: '$45/month',
      business: '$234/month'
    };
    
    setEstimate(estimates[formData.insuranceType!]);
    setIsLoading(false);
    setStep(3);
  };

  const handleContinueToFullQuote = () => {
    onCloseAction();
    router.push(`/quote/${formData.insuranceType}`);
  };

  const resetForm = () => {
    setStep(0);
    setFormData({ insuranceType: null });
    setEstimate(null);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onCloseAction();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step === 3 ? 'Your Instant Quote' : 'Quick Quote'}
                    </h3>
                  </div>
                  <button
                    ref={focusRef}
                    onClick={handleClose}
                    className="rounded-md p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Close quick quote form"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    {steps.map((stepName, index) => (
                      <div key={stepName} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            index <= step
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-12 h-1 mx-2 ${
                              index < step ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{steps[step]}</p>
                </div>

                {/* Step Content */}
                <div className="min-h-[400px] flex flex-col">
                  {step === 0 && <InsuranceTypeStep onSelect={handleTypeSelect} />}
                  {step === 1 && (
                    <BasicDetailsStep
                      insuranceType={formData.insuranceType!}
                      onNext={handleBasicDetails}
                      onBack={() => setStep(0)}
                    />
                  )}
                  {step === 2 && (
                    <PersonalInfoStep
                      onNext={handlePersonalInfo}
                      onBack={() => setStep(1)}
                      isLoading={isLoading}
                    />
                  )}
                  {step === 3 && (
                    <QuoteResultStep
                      estimate={estimate!}
                      insuranceType={formData.insuranceType!}
                      onContinue={handleContinueToFullQuote}
                      onStartOver={resetForm}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function InsuranceTypeStep({ onSelect }: { onSelect: (type: InsuranceType) => void }) {
  return (
    <div className="flex-1">
      <div className="text-center mb-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          What type of insurance are you looking for?
        </h4>
        <p className="text-gray-600">
          Choose the insurance type to get your personalized quote
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {insuranceOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.type}
              onClick={() => onSelect(option.type)}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
            >
              <Icon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 mb-4" />
              <h5 className="font-semibold text-gray-900 mb-1">{option.title}</h5>
              <p className="text-sm text-gray-600 mb-2">{option.description}</p>
              <p className="text-sm font-medium text-green-600">
                Avg. savings: {option.avgSavings}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BasicDetailsStep({
  insuranceType,
  onNext,
  onBack
}: {
  insuranceType: InsuranceType;
  onNext: (details: HomeDetails | AutoDetails | LifeDetails | BusinessDetails) => void;
  onBack: () => void;
}) {
  const [details, setDetails] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(details as unknown as HomeDetails | AutoDetails | LifeDetails | BusinessDetails);
  };

  const renderFields = () => {
    switch (insuranceType) {
      case 'homeowners':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Home Value
              </label>
              <select
                value={details.homeValue || ''}
                onChange={(e) => setDetails({ ...details, homeValue: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                aria-label="Estimated Home Value"
              >
                <option value="">Select home value</option>
                <option value="under-200k">Under $200,000</option>
                <option value="200k-400k">$200,000 - $400,000</option>
                <option value="400k-600k">$400,000 - $600,000</option>
                <option value="600k-800k">$600,000 - $800,000</option>
                <option value="over-800k">Over $800,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={details.zipCode || ''}
                onChange={(e) => setDetails({ ...details, zipCode: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter ZIP code"
                required
              />
            </div>
          </>
        );
      case 'auto':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Year
              </label>
              <select
                value={details.year || ''}
                onChange={(e) => setDetails({ ...details, year: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select year</option>
                {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Make & Model
              </label>
              <input
                type="text"
                value={details.make || ''}
                onChange={(e) => setDetails({ ...details, make: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Toyota Camry"
                required
              />
            </div>
          </>
        );
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              value={details.zipCode || ''}
              onChange={(e) => setDetails({ ...details, zipCode: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter ZIP code"
              required
            />
          </div>
        );
    }
  };

  return (
    <div className="flex-1">
      <div className="text-center mb-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Tell us a bit about your {insuranceType.replace('homeowners', 'home')}
        </h4>
        <p className="text-gray-600">
          Just a few quick details to calculate your estimate
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFields()}

        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function PersonalInfoStep({
  onNext,
  onBack,
  isLoading
}: {
  onNext: (info: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
  onBack: () => void;
  isLoading: boolean;
}) {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(info);
  };

  return (
    <div className="flex-1">
      <div className="text-center mb-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Almost there! Just a few personal details
        </h4>
        <p className="text-gray-600">
          This helps us provide the most accurate quote for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={info.firstName}
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={info.lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <span>Get My Quote</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function QuoteResultStep({
  estimate,
  insuranceType,
  onContinue,
  onStartOver
}: {
  estimate: string;
  insuranceType: InsuranceType;
  onContinue: () => void;
  onStartOver: () => void;
}) {
  return (
    <div className="flex-1 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-green-600" />
        </div>
        <h4 className="text-2xl font-bold text-gray-900 mb-2">
          Your Instant Quote
        </h4>
        <p className="text-gray-600 mb-6">
          Based on the information provided, here&apos;s your estimated monthly premium
        </p>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">{estimate}</div>
          <p className="text-sm text-gray-600">
            Estimated monthly premium for {insuranceType.replace('homeowners', 'home')} insurance
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="font-semibold text-gray-900 mb-2">What&apos;s included:</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Comprehensive coverage</li>
            <li>✓ 24/7 customer support</li>
            <li>✓ Claims assistance</li>
            <li>✓ No hidden fees</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onContinue}
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
        >
          <span>Continue to Full Quote</span>
          <ArrowRight className="h-5 w-5" />
        </button>
        
        <button
          onClick={onStartOver}
          className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Start Over with Different Insurance
        </button>
      </div>
    </div>
  );
}
