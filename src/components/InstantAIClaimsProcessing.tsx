'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Brain,
  Eye,
  Mic,
  FileText,
  CreditCard,
  Shield,
  Globe,
  TrendingUp,
  Bot,
  User,
  Star,
  Timer
} from 'lucide-react';

interface ClaimStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  duration: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface ClaimData {
  id: string;
  type: 'auto' | 'home' | 'health' | 'travel' | 'business';
  amount: number;
  confidence: number;
  fraudRisk: number;
  settlement: number;
  timeToProcess: number;
  culturalContext: string;
  language: string;
}

export default function InstantAIClaimsProcessing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [claimType, setClaimType] = useState<ClaimData['type']>('auto');
  const [showResults, setShowResults] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Enhanced claims processing steps (beating Lemonade's 7 seconds)
  const claimSteps: ClaimStep[] = [
    {
      id: 'capture',
      title: 'Evidence Capture',
      description: 'AI-powered photo/video analysis with damage detection',
      status: 'pending',
      duration: 0.5,
      icon: Camera
    },
    {
      id: 'verification',
      title: 'Identity & Policy Verification',
      description: 'Biometric verification and policy status check',
      status: 'pending', 
      duration: 0.8,
      icon: Shield
    },
    {
      id: 'analysis',
      title: 'AI Damage Assessment',
      description: 'Computer vision analysis with cultural context adaptation',
      status: 'pending',
      duration: 1.2,
      icon: Brain
    },
    {
      id: 'fraud',
      title: 'Fraud Detection',
      description: 'Real-time fraud analysis using global pattern recognition',
      status: 'pending',
      duration: 0.3,
      icon: Eye
    },
    {
      id: 'settlement',
      title: 'Settlement Calculation',
      description: 'AI-powered settlement with local market adjustment',
      status: 'pending',
      duration: 0.2,
      icon: CreditCard
    }
  ];

  const [steps, setSteps] = useState(claimSteps);

  // Simulate advanced AI processing (3 seconds total - beats Lemonade)
  const processClaimAI = async () => {
    setIsProcessing(true);
    setShowResults(false);
    setProcessingTime(0);

    // Start timer
    intervalRef.current = setInterval(() => {
      setProcessingTime(prev => prev + 0.1);
    }, 100);

    for (let i = 0; i < steps.length; i++) {
      // Update current step to processing
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'processing' : index < i ? 'completed' : 'pending'
      })));

      setCurrentStep(i);

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, steps[i].duration * 1000));

      // Mark step as completed
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? 'completed' : 'pending'
      })));
    }

    // Generate claim results
    const mockClaimData: ClaimData = {
      id: `CLM-${Date.now()}`,
      type: claimType,
      amount: Math.floor(2000 + Math.random() * 8000),
      confidence: 92 + Math.random() * 7,
      fraudRisk: Math.random() * 15,
      settlement: 0,
      timeToProcess: processingTime,
      culturalContext: 'North American',
      language: 'English'
    };

    mockClaimData.settlement = mockClaimData.amount * (0.85 + Math.random() * 0.1);

    setClaimData(mockClaimData);
    setIsProcessing(false);
    setShowResults(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetDemo = () => {
    setSteps(claimSteps);
    setCurrentStep(0);
    setClaimData(null);
    setIsProcessing(false);
    setProcessingTime(0);
    setShowResults(false);
    setUploadedFiles([]);
    setDescription('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const acceptSettlement = () => {
    // TODO: Implement settlement acceptance workflow
    console.log('Accepting settlement:', claimData?.settlement);
    alert(`Settlement of $${claimData?.settlement.toLocaleString()} accepted! Funds will be processed within 24 hours.`);
    // You could navigate to a payment confirmation page or show a success modal
  };

  const requestReview = () => {
    // TODO: Implement review request workflow
    console.log('Requesting human review for claim:', claimData?.id);
    alert('Review requested! A claims specialist will contact you within 2 business hours.');
    // You could navigate to a case tracking page or show a confirmation modal
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
  };

  const getStepStatusColor = (status: ClaimStep['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStepIcon = (step: ClaimStep) => {
    const Icon = step.icon;
    if (step.status === 'processing') {
      return <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />;
    }
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    return <Icon className="h-5 w-5" />;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-3">
          <Zap className="h-8 w-8 text-yellow-500" />
          <span>3-Second AI Claims Processing</span>
          <Timer className="h-8 w-8 text-blue-500" />
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          World's fastest AI-powered claims processing with cultural adaptation and global fraud detection
        </p>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3 sec</div>
            <div className="text-sm text-blue-700">Processing Time</div>
            <div className="text-xs text-gray-500">vs Lemonade: 7 sec</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">99.2%</div>
            <div className="text-sm text-green-700">Accuracy Rate</div>
            <div className="text-xs text-gray-500">Global benchmark</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-purple-700">Global Availability</div>
            <div className="text-xs text-gray-500">All time zones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">190+</div>
            <div className="text-sm text-orange-700">Languages</div>
            <div className="text-xs text-gray-500">Cultural adaptation</div>
          </div>
        </div>
      </div>

      {/* Claim Input Form */}
      {!isProcessing && !showResults && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">File Your Claim</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Claim Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Type
                </label>
                <select
                  value={claimType}
                  onChange={(e) => setClaimType(e.target.value as ClaimData['type'])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Select claim type"
                >
                  <option value="auto">Auto Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="health">Health Insurance</option>
                  <option value="travel">Travel Insurance</option>
                  <option value="business">Business Insurance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe What Happened
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about the incident in your own words..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Mic className="h-4 w-4" />
                  <span>Voice Recording</span>
                </button>
                <span className="text-sm text-gray-500">or</span>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>Live Chat</span>
                </button>
              </div>
            </div>

            {/* Right Column - File Upload */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Evidence
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Upload photos, videos, or documents</p>
                    <p className="text-sm text-gray-500">AI will analyze damage automatically</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Choose Files</span>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{file.name}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={processClaimAI}
                disabled={!description.trim() && uploadedFiles.length === 0}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <Brain className="h-5 w-5" />
                <span>Process Claim with AI</span>
                <Zap className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {isProcessing && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Processing Your Claim</h2>
            <div className="text-3xl font-bold text-blue-600">
              {processingTime.toFixed(1)}s
            </div>
            <p className="text-gray-600">AI is analyzing your claim...</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-2 transition-all ${getStepStatusColor(step.status)}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStepIcon(step)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm opacity-75">{step.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {step.status === 'completed' ? '✓' : 
                       step.status === 'processing' ? `${step.duration}s` : 
                       `${step.duration}s`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && claimData && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Claim Approved!</h2>
            <p className="text-gray-600">Processed in {claimData.timeToProcess.toFixed(1)} seconds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">${claimData.settlement.toLocaleString()}</div>
              <div className="text-sm text-blue-700">Settlement Amount</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{claimData.confidence.toFixed(1)}%</div>
              <div className="text-sm text-green-700">AI Confidence</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{claimData.fraudRisk.toFixed(1)}%</div>
              <div className="text-sm text-purple-700">Fraud Risk</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">2 min</div>
              <div className="text-sm text-orange-700">Payment ETA</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Claim Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Claim ID</p>
                <p className="font-mono text-gray-900">{claimData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Type</p>
                <p className="capitalize text-gray-900">{claimData.type} Insurance</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Cultural Context</p>
                <p className="text-gray-900">{claimData.culturalContext}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Language</p>
                <p className="text-gray-900">{claimData.language}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={acceptSettlement}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>Accept Settlement</span>
            </button>
            <button 
              onClick={requestReview}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Request Review
            </button>
            <button
              onClick={resetDemo}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Try Another Claim
            </button>
          </div>
        </div>
      )}

      {/* Competitive Advantage */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Competitive Advantage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Speed Leader</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>MatchedCover:</span>
                <span className="font-bold text-green-400">3 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Lemonade:</span>
                <span className="text-gray-300">7 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Traditional:</span>
                <span className="text-gray-300">2-14 days</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center space-x-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span>Global First</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div>✓ 190+ Languages</div>
              <div>✓ Cultural Adaptation</div>
              <div>✓ Global Fraud Detection</div>
              <div>✓ Local Market Pricing</div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center space-x-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span>AI Innovation</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div>✓ Computer Vision Analysis</div>
              <div>✓ Behavioral Economics</div>
              <div>✓ Predictive Fraud Detection</div>
              <div>✓ Dynamic Settlement AI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
