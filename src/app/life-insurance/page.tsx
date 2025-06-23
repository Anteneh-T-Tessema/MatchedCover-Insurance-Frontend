import React from 'react';
import Link from 'next/link';
import { Heart, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function LifeInsurancePage() {
  const coverageTypes = [
    {
      title: 'Term Life Insurance',
      description: 'Affordable coverage for a specific period',
      details: 'Perfect for young families and temporary needs'
    },
    {
      title: 'Whole Life Insurance',
      description: 'Permanent coverage with cash value',
      details: 'Builds cash value you can borrow against'
    },
    {
      title: 'Universal Life Insurance',
      description: 'Flexible premiums and death benefits',
      details: 'Adjust coverage as your needs change'
    }
  ];

  const benefits = [
    'Financial security for your family',
    'Tax-free death benefits',
    'Competitive rates and fast approval',
    'No medical exam options available',
    'Coverage amounts from $10,000 to $10M+'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Life Insurance That Protects What Matters Most
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Secure your family&apos;s financial future with affordable life insurance coverage
            </p>
            <Link 
              href="/quote/life"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Coverage Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose the Right Coverage for You
          </h2>
          <p className="text-lg text-gray-600">
            Different types of life insurance for different life stages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {coverageTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {type.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <p className="text-sm text-gray-500">{type.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Life Insurance?
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Protect Your Family&apos;s Future Today
          </h2>
          <p className="text-xl mb-8">
            Get a personalized life insurance quote in minutes
          </p>
          <Link 
            href="/quote/life"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Start Your Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}