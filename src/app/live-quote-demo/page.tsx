/**
 * Live Quote Demo - Real carrier integration demonstration
 * Shows how MatchedCover connects with actual insurance carriers
 */

'use client';

import React, { useState } from 'react';
import { carrierIntegrationService, QuoteRequest } from '@/services/carriers/CarrierIntegrationService';

export default function LiveQuoteDemo() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-06-15',
    state: 'OH',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    vehicleYear: 2020,
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleVin: '1HGBH41JXMN109186',
    annualMileage: 12000,
    liabilityBI: 100000,
    liabilityPD: 100000,
    collisionDeductible: 500,
    comprehensiveDeductible: 500
  });

  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getQuotes = async () => {
    setLoading(true);
    setError('');
    setQuotes([]);

    try {
      const quoteRequest: QuoteRequest = {
        customerId: `demo_${Date.now()}`,
        productType: 'auto',
        applicant: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          gender: 'M',
          maritalStatus: 'single',
          address: {
            street: '123 Main St',
            city: 'Columbus',
            state: formData.state,
            zipCode: '43215'
          },
          phone: formData.phone,
          email: formData.email
        },
        vehicle: {
          year: Number(formData.vehicleYear),
          make: formData.vehicleMake,
          model: formData.vehicleModel,
          vin: formData.vehicleVin,
          usage: 'commute',
          annualMileage: Number(formData.annualMileage),
          financing: 'owned'
        },
        coverage: {
          liability: {
            bodilyInjuryPerPerson: Number(formData.liabilityBI),
            bodilyInjuryPerAccident: Number(formData.liabilityBI) * 2,
            propertyDamage: Number(formData.liabilityPD)
          },
          collision: {
            deductible: Number(formData.collisionDeductible)
          },
          comprehensive: {
            deductible: Number(formData.comprehensiveDeductible)
          }
        },
        effectiveDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      const result = await carrierIntegrationService.getMultiCarrierQuotes(quoteRequest);
      setQuotes(result);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get quotes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🚗 Live Quote Demo</h1>
          <p className="text-gray-600">
            Real-time insurance quotes from multiple carriers through MatchedCover's integration platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quote Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Get Your Quote</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="OH">Ohio</option>
                    <option value="FL">Florida</option>
                    <option value="TX">Texas</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Year</label>
                  <input
                    type="number"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                    min="2000"
                    max="2025"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <select
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="BMW">BMW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Mileage</label>
                <select
                  name="annualMileage"
                  value={formData.annualMileage}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5000">Less than 5,000</option>
                  <option value="10000">5,000 - 10,000</option>
                  <option value="12000">10,000 - 15,000</option>
                  <option value="20000">15,000 - 20,000</option>
                  <option value="25000">More than 20,000</option>
                </select>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Coverage Limits</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Liability (Bodily Injury)</label>
                    <select
                      name="liabilityBI"
                      value={formData.liabilityBI}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="50000">$50,000</option>
                      <option value="100000">$100,000</option>
                      <option value="250000">$250,000</option>
                      <option value="500000">$500,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Collision Deductible</label>
                    <select
                      name="collisionDeductible"
                      value={formData.collisionDeductible}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="250">$250</option>
                      <option value="500">$500</option>
                      <option value="1000">$1,000</option>
                      <option value="2000">$2,000</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={getQuotes}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Getting Quotes...' : 'Get Live Quotes'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Quote Results */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Quote Results</h2>
            
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {quotes.length === 0 && !loading && (
              <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                Fill out the form and click "Get Live Quotes" to see results from multiple carriers
              </div>
            )}

            {quotes.length > 0 && (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Found {quotes.length} quotes • Sorted by price
                </div>
                
                {quotes.map((quote, index) => (
                  <div key={quote.quoteId} className="border rounded-lg p-4 relative">
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        BEST PRICE
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{quote.carrierName}</h3>
                        <p className="text-sm text-gray-600">Quote ID: {quote.quoteId}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ${quote.premium.annual.toLocaleString()}/year
                        </div>
                        <div className="text-sm text-gray-600">
                          ${quote.premium.monthly}/month
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Coverage:</span>
                        <div className="mt-1">
                          {Object.entries(quote.coverage).map(([type, details]) => (
                            <div key={type} className="flex justify-between">
                              <span className="capitalize">{type.replace('_', ' ')}:</span>
                              <span>{(details as any).limit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Discounts Applied:</span>
                        <div className="mt-1">
                          {quote.discounts.map((discount: any) => (
                            <div key={discount.code} className="flex justify-between">
                              <span>{discount.name}:</span>
                              <span className="text-green-600">-${discount.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Valid until: {new Date(quote.validUntil).toLocaleDateString()}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                          Select This Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {quotes.length > 1 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-green-800 font-medium">
                      💰 Potential Savings: ${Math.max(...quotes.map(q => q.premium.annual)) - Math.min(...quotes.map(q => q.premium.annual))} annually
                    </div>
                    <div className="text-green-700 text-sm mt-1">
                      You could save by choosing the lowest priced option!
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Integration Status */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🔗 Live Integration Status</h3>
          <p className="text-blue-800 mb-4">
            This demo shows real-time integration with insurance carrier systems. In production, this would connect to actual carrier APIs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ Progressive</div>
              <div className="text-gray-600">Sandbox API</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ GEICO</div>
              <div className="text-gray-600">Sandbox API</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-yellow-600 font-medium">⚠️ State Farm</div>
              <div className="text-gray-600">Test Mode</div>
            </div>
            <div className="bg-white p-3 rounded">
              <div className="text-green-600 font-medium">✅ Allstate</div>
              <div className="text-gray-600">Sandbox API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
