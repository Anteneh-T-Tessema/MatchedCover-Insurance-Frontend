import React from 'react';
import Link from 'next/link';
import { Shield, Home, CheckCircle, ArrowRight } from 'lucide-react';

export default function HomeInsurancePage() {
  const coverageOptions = [
    {
      title: 'Dwelling Coverage',
      description: 'Protects the structure of your home',
      included: true,
      details: 'Covers damage from fire, wind, hail, and other covered perils'
    },
    {
      title: 'Personal Property',
      description: 'Covers your belongings inside the home',
      included: true,
      details: 'Furniture, electronics, clothing, and other personal items'
    },
    {
      title: 'Liability Protection',
      description: 'Protects you from lawsuits and claims',
      included: true,
      details: 'Coverage for accidents that occur on your property'
    },
    {
      title: 'Additional Living Expenses',
      description: 'Temporary housing if your home is uninhabitable',
      included: true,
      details: 'Hotel costs, meals, and other temporary living expenses'
    },
    {
      title: 'Medical Payments',
      description: 'Medical bills for guests injured on your property',
      included: true,
      details: 'No-fault coverage for minor injuries to visitors'
    }
  ];

  const benefits = [
    'Comprehensive protection for your home',
    'Fast and easy claims process',
    'Competitive rates and discounts',
    '24/7 customer support',
    'Trusted by millions of homeowners'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Home className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Home Insurance Made Simple
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Protect your home and belongings with comprehensive coverage at competitive rates
            </p>
            <Link 
              href="/quote/homeowners"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Coverage Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What&apos;s Covered?
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive protection for everything that matters to you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coverageOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {option.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <p className="text-sm text-gray-500">{option.details}</p>
              {option.included && (
                <div className="mt-4 flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Included</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Home Insurance?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Home?
          </h2>
          <p className="text-xl mb-8">
            Get a personalized quote in minutes
          </p>
          <Link 
            href="/quote/homeowners"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Start Your Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}