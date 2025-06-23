import React from 'react';
import { Home, Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomeownersQuotePage() {
  const steps = [
    'Enter your home details',
    'Choose your coverage options',
    'Compare quotes from top insurers',
    'Purchase your policy online'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Home className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Your Homeowners Insurance Quote
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Compare rates from top insurers and save up to $500 per year
            </p>
          </div>
        </div>
      </div>

      {/* Quote Process */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get your personalized quote in just 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>

        {/* Quote Form Placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Shield className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Start Your Quote
            </h3>
            <p className="text-gray-600">
              Tell us about your home to get started
            </p>
          </div>

          {/* Simplified form for demo */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Address
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Type
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  title="Select home type"
                >
                  <option>Single Family Home</option>
                  <option>Townhouse</option>
                  <option>Condo</option>
                  <option>Mobile Home</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 1990"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Square Footage
                </label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 2000"
                />
              </div>
            </div>

            <div className="text-center">
              <button className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                Get My Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <h4 className="font-semibold text-gray-900">Fast & Easy</h4>
            <p className="text-sm text-gray-600">Get quotes in minutes</p>
          </div>
          <div className="text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <h4 className="font-semibold text-gray-900">Compare Rates</h4>
            <p className="text-sm text-gray-600">See quotes from multiple insurers</p>
          </div>
          <div className="text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <h4 className="font-semibold text-gray-900">Save Money</h4>
            <p className="text-sm text-gray-600">Find the best rate for you</p>
          </div>
        </div>
      </div>
    </div>
  );
}