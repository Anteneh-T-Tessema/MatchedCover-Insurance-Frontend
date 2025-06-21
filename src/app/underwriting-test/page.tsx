/**
 * AI Underwriting Test Dashboard
 * Test the complete AI-powered underwriting engine
 */

'use client';

import React, { useState } from 'react';
import { AIUnderwritingEngine, RiskFactors, UnderwritingDecision } from '@/services/underwriting/AIUnderwritingEngine';

interface TestCase {
  name: string;
  description: string;
  riskFactors: RiskFactors;
  expectedOutcome: 'approve' | 'review' | 'decline';
}

export default function UnderwritingTestPage() {
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);
  const [customData, setCustomData] = useState<Partial<RiskFactors>>({
    age: 30,
    creditScore: 750,
    occupation: 'Software Engineer',
    educationLevel: 'Bachelor',
    maritalStatus: 'married',
    locationRiskScore: 3,
    financialStability: 8,
    claimsHistory: []
  });
  const [result, setResult] = useState<UnderwritingDecision | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testCases: TestCase[] = [
    {
      name: 'Low Risk Profile',
      description: 'Young professional, excellent credit, no claims history',
      expectedOutcome: 'approve',
      riskFactors: {
        age: 28,
        creditScore: 800,
        occupation: 'Software Engineer',
        educationLevel: 'Master',
        maritalStatus: 'married',
        propertyValue: 250000,
        propertyAge: 5,
        propertyType: 'single_family',
        constructionType: 'frame',
        locationRiskScore: 2,
        crimeRate: 1,
        naturalDisasterRisk: 2,
        claimsHistory: [],
        drivingRecord: {
          yearsLicensed: 10,
          violations: [],
          accidents: [],
          milesPerYear: 8000,
          vehicleType: 'sedan',
          vehicleAge: 3,
          safetyRating: 5
        },
        socialMediaRiskScore: 2,
        financialStability: 9,
        weatherPatterns: {
          averageRainfall: 35,
          hurricaneRisk: 2,
          floodZone: 'X',
          earthquakeRisk: 1,
          wildFireRisk: 0
        },
        economicFactors: {
          localUnemploymentRate: 3.5,
          medianIncome: 75000,
          propertyValueTrend: 110,
          inflationRate: 2.5
        },
        marketConditions: {
          competitorPricing: [1200, 1350, 1100],
          marketPenetration: 0.6,
          seasonalFactors: 2,
          regulatoryChanges: ['Rate filing approved', 'New safety requirements']
        }
      }
    },
    {
      name: 'High Risk Profile',
      description: 'Multiple claims, poor credit, high-risk location',
      expectedOutcome: 'decline',
      riskFactors: {
        age: 45,
        creditScore: 580,
        occupation: 'Unemployed',
        educationLevel: 'High School',
        maritalStatus: 'divorced',
        propertyValue: 120000,
        propertyAge: 35,
        propertyType: 'mobile_home',
        constructionType: 'mobile',
        locationRiskScore: 9,
        crimeRate: 8,
        naturalDisasterRisk: 9,
        claimsHistory: [
          {
            id: '1',
            type: 'property',
            amount: 25000,
            date: new Date('2023-06-15'),
            cause: 'fire',
            wasAtFault: true,
            fraudRisk: 7
          },
          {
            id: '2',
            type: 'auto',
            amount: 15000,
            date: new Date('2023-03-10'),
            cause: 'collision',
            wasAtFault: true,
            fraudRisk: 5
          }
        ],
        drivingRecord: {
          yearsLicensed: 25,
          violations: [
            { type: 'speeding', date: new Date('2023-08-20'), severity: 'major', points: 4 },
            { type: 'dui', date: new Date('2022-12-05'), severity: 'major', points: 8 }
          ],
          accidents: [
            { date: new Date('2023-03-10'), atFault: true, damageAmount: 15000, injuries: false, type: 'collision' }
          ],
          milesPerYear: 25000,
          vehicleType: 'truck',
          vehicleAge: 10,
          safetyRating: 2
        },
        socialMediaRiskScore: 8,
        financialStability: 2,
        weatherPatterns: {
          averageRainfall: 55,
          hurricaneRisk: 9,
          floodZone: 'AE',
          earthquakeRisk: 8,
          wildFireRisk: 9
        },
        economicFactors: {
          localUnemploymentRate: 8.5,
          medianIncome: 35000,
          propertyValueTrend: 95,
          inflationRate: -1.2
        },
        marketConditions: {
          competitorPricing: [2500, 2800, 3200],
          marketPenetration: 0.9,
          seasonalFactors: 7,
          regulatoryChanges: ['Rate increases approved', 'New strict underwriting', 'Claims investigation enhanced']
        }
      }
    },
    {
      name: 'Medium Risk Profile',
      description: 'Average profile requiring manual review',
      expectedOutcome: 'review',
      riskFactors: {
        age: 35,
        creditScore: 680,
        occupation: 'Teacher',
        educationLevel: 'Bachelor',
        maritalStatus: 'single',
        propertyValue: 180000,
        propertyAge: 15,
        propertyType: 'townhouse',
        constructionType: 'masonry',
        locationRiskScore: 5,
        crimeRate: 4,
        naturalDisasterRisk: 5,
        claimsHistory: [
          {
            id: '1',
            type: 'property',
            amount: 8000,
            date: new Date('2022-11-20'),
            cause: 'water_damage',
            wasAtFault: false,
            fraudRisk: 3
          }
        ],
        drivingRecord: {
          yearsLicensed: 17,
          violations: [
            { type: 'speeding', date: new Date('2023-01-15'), severity: 'minor', points: 2 }
          ],
          accidents: [],
          milesPerYear: 12000,
          vehicleType: 'suv',
          vehicleAge: 7,
          safetyRating: 4
        },
        socialMediaRiskScore: 4,
        financialStability: 6,
        weatherPatterns: {
          averageRainfall: 42,
          hurricaneRisk: 2,
          floodZone: 'X',
          earthquakeRisk: 4,
          wildFireRisk: 2
        },
        economicFactors: {
          localUnemploymentRate: 5.2,
          medianIncome: 55000,
          propertyValueTrend: 105,
          inflationRate: 1.8
        },
        marketConditions: {
          competitorPricing: [1400, 1550, 1300],
          marketPenetration: 0.7,
          seasonalFactors: 4,
          regulatoryChanges: ['Standard rate filing', 'Updated safety requirements']
        }
      }
    }
  ];

  const runUnderwriting = async (riskFactors: RiskFactors) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const engine = new AIUnderwritingEngine();
      const decision = await engine.underwrite(riskFactors, 'auto', 100000, 1000);
      setResult(decision);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Underwriting failed');
    } finally {
      setLoading(false);
    }
  };

  const runTestCase = (testCase: TestCase) => {
    setSelectedTest(testCase);
    runUnderwriting(testCase.riskFactors);
  };

  const runCustomTest = () => {
    if (!customData.age || !customData.creditScore) {
      setError('Please fill in required fields (age, credit score)');
      return;
    }

    const riskFactors: RiskFactors = {
      age: customData.age,
      creditScore: customData.creditScore,
      occupation: customData.occupation || 'Unknown',
      educationLevel: customData.educationLevel || 'Unknown',
      maritalStatus: customData.maritalStatus || 'single',
      locationRiskScore: customData.locationRiskScore || 5,
      claimsHistory: customData.claimsHistory || [],
      financialStability: customData.financialStability || 5,
      weatherPatterns: {
        averageRainfall: 40,
        hurricaneRisk: 2,
        floodZone: 'X',
        earthquakeRisk: 3,
        wildFireRisk: 2
      },
      economicFactors: {
        localUnemploymentRate: 4.5,
        medianIncome: 65000,
        propertyValueTrend: 100,
        inflationRate: 2.0
      },
      marketConditions: {
        competitorPricing: [1300, 1450, 1200],
        marketPenetration: 0.7,
        seasonalFactors: 3,
        regulatoryChanges: ['Standard updates']
      }
    };

    setSelectedTest({
      name: 'Custom Test',
      description: 'User-defined risk profile',
      riskFactors,
      expectedOutcome: 'review'
    });
    
    runUnderwriting(riskFactors);
  };

  const getDecisionColor = (approved: boolean) => {
    if (approved) return 'text-green-600 bg-green-100';
    return 'text-red-600 bg-red-100';
  };

  const getDecisionText = (approved: boolean) => {
    if (approved) return 'APPROVED';
    return 'DECLINED';
  };

  const getTotalAdjustment = (adjustments: Array<{adjustment: number}>) => {
    return adjustments.reduce((total, adj) => total + adj.adjustment, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧠 AI Underwriting Test Dashboard</h1>
          <p className="text-gray-600">
            Test the AI-powered underwriting engine with various risk profiles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Cases */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Predefined Test Cases</h2>
              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTest?.name === testCase.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => runTestCase(testCase)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{testCase.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        testCase.expectedOutcome === 'approve' ? 'bg-green-100 text-green-800' :
                        testCase.expectedOutcome === 'review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Expected: {testCase.expectedOutcome.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{testCase.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      Age: {testCase.riskFactors.age} | Credit: {testCase.riskFactors.creditScore} | Claims: {testCase.riskFactors.claimsHistory.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Test */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Custom Risk Profile</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={customData.age || ''}
                    onChange={(e) => setCustomData({...customData, age: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                    min="18"
                    max="100"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
                  <input
                    type="number"
                    value={customData.creditScore || ''}
                    onChange={(e) => setCustomData({...customData, creditScore: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                    min="300"
                    max="850"
                    placeholder="750"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    value={customData.occupation || ''}
                    onChange={(e) => setCustomData({...customData, occupation: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location Risk (1-10)</label>
                  <input
                    type="number"
                    value={customData.locationRiskScore || ''}
                    onChange={(e) => setCustomData({...customData, locationRiskScore: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="10"
                    placeholder="5"
                  />
                </div>
              </div>
              <button
                onClick={runCustomTest}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Running Underwriting...' : 'Run Custom Test'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Underwriting Results</h2>
            
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${
                    getDecisionColor(result.approved)
                  }`}>
                    {getDecisionText(result.approved)}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Risk Score: {result.riskScore}/10 | Premium Adjustment: {getTotalAdjustment(result.premiumAdjustments)}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium text-gray-900 mb-2">Risk Assessment</h3>
                    <div className="text-sm space-y-1">
                      <div>Score: {result.riskScore}/10</div>
                      <div>Fraud Risk: {result.fraudRisk}/10</div>
                      <div>Confidence: {result.confidence}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium text-gray-900 mb-2">Pricing</h3>
                    <div className="text-sm space-y-1">
                      <div>Base Premium: ${result.premiumBase}</div>
                      <div>Adjustment: {getTotalAdjustment(result.premiumAdjustments) > 0 ? '+' : ''}{getTotalAdjustment(result.premiumAdjustments)}%</div>
                      <div>Final Premium: ${result.finalPremium}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Decision Reasoning</h3>
                  <ul className="text-sm space-y-1">
                    {result.reasoning.map((reason: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {result.conditions.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Conditions</h3>
                    <ul className="text-sm space-y-1">
                      {result.conditions.map((condition: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">→</span>
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTest && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Expected Outcome:</span>
                      <span className={`font-medium ${
                        selectedTest.expectedOutcome === 'approve' ? 'text-green-600' :
                        selectedTest.expectedOutcome === 'review' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedTest.expectedOutcome.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-600">Actual Result:</span>
                      <span className={`font-medium ${
                        result.approved ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {getDecisionText(result.approved)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!result && !loading && !error && (
              <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                Select a test case or create a custom profile to see underwriting results
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🔧 Underwriting Engine Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ AI Engine</div>
              <div className="text-gray-600">Operational</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ Risk Models</div>
              <div className="text-gray-600">Updated</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ Data Sources</div>
              <div className="text-gray-600">Connected</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ Pricing Engine</div>
              <div className="text-gray-600">Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
