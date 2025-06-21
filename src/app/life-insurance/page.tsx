'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Heart, CheckCircle, Star, Phone, ArrowRight, Zap, DollarSign, Clock, Users, Award, TrendingUp } from 'lucide-react';

export default function LifeInsurancePage() {
  const [activeTab, setActiveTab] = useState('coverage');

  const tabs = [
    { id: 'coverage', label: 'Coverage Types', icon: Shield },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'process', label: 'Application Process', icon: Clock },
    { id: 'reviews', label: 'Customer Reviews', icon: Star }
  ];

  const coverageTypes = [
    {
      title: 'Term Life Insurance',
      description: 'Affordable coverage for a specific period',
      features: ['10, 20, or 30-year terms', 'Level premiums', 'Convertible options', 'No medical exam for qualified applicants'],
      bestFor: 'Young families, mortgage protection, temporary needs'
    },
    {
      title: 'Whole Life Insurance',
      description: 'Permanent coverage with cash value',
      features: ['Lifetime coverage', 'Cash value growth', 'Fixed premiums', 'Dividend payments'],
      bestFor: 'Estate planning, long-term financial goals'
    },
    {
      title: 'Universal Life Insurance',
      description: 'Flexible permanent life insurance',
      features: ['Adjustable premiums', 'Investment component', 'Flexible death benefits', 'Tax-deferred growth'],
      bestFor: 'Those wanting flexibility and investment options'
    }
  ];

  const pricingExamples = [
    {
      age: '25-35',
      termAmount: '$500K',
      wholeAmount: '$250K',
      termPrice: '$25',
      wholePrice: '$125',
      popular: false
    },
    {
      age: '35-45',
      termAmount: '$750K',
      wholeAmount: '$500K',
      termPrice: '$45',
      wholePrice: '$245',
      popular: true
    },
    {
      age: '45-55',
      termAmount: '$1M',
      wholeAmount: '$750K',
      termPrice: '$85',
      wholePrice: '$445',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MatchedCover</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">Life Insurance</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Protect Your Family&apos;s
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Future Today</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Secure your loved ones with affordable life insurance. Get coverage in minutes with our simplified application process.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/quote/life"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Get Quote in 2 Minutes
                </Link>
                <a
                  href="tel:1-800-555-0123"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Speak with Expert
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2min</div>
                  <div className="text-sm text-gray-600">Application</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Families Protected</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Life Insurance Calculator</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Instant Estimate
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="age-range" className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                    <select 
                      id="age-range"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option>25-35 years old</option>
                      <option>35-45 years old</option>
                      <option>45-55 years old</option>
                      <option>55+ years old</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="coverage-amount" className="block text-sm font-medium text-gray-700 mb-1">Coverage Amount</label>
                    <select 
                      id="coverage-amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option>$250,000</option>
                      <option>$500,000</option>
                      <option>$750,000</option>
                      <option>$1,000,000+</option>
                    </select>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-600 font-medium">Estimated Monthly Premium</span>
                      <span className="text-2xl font-bold text-purple-600">$45</span>
                    </div>
                    <p className="text-xs text-purple-500 mt-1">*Based on good health and non-smoker</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                    Get Detailed Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'coverage' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Life Insurance</h2>
                <p className="text-xl text-gray-600">Choose the coverage that fits your needs and budget</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {coverageTypes.map((type, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                    <p className="text-gray-600 mb-6">{type.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Best for:</span> {type.bestFor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Sample Pricing</h2>
                <p className="text-xl text-gray-600">Affordable coverage for healthy non-smokers</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Age Range</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Term Life (20-year)</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Whole Life</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pricingExamples.map((example, index) => (
                      <tr key={index} className={example.popular ? 'bg-purple-50' : ''}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{example.age}</div>
                          {example.popular && (
                            <span className="inline-block mt-1 bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                              Most Popular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="text-lg font-bold text-gray-900">{example.termPrice}/month</div>
                          <div className="text-sm text-gray-600">{example.termAmount} coverage</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="text-lg font-bold text-gray-900">{example.wholePrice}/month</div>
                          <div className="text-sm text-gray-600">{example.wholeAmount} coverage</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  *Rates shown are estimates for healthy non-smokers. Actual rates may vary based on health, lifestyle, and other factors.
                </p>
                <Link
                  href="/quote/life"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700"
                >
                  Get Your Personalized Quote
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Application Process</h2>
                <p className="text-xl text-gray-600">Get covered in as little as 5 minutes</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: 1, title: 'Quick Quote', description: 'Answer a few basic questions online', icon: Clock, time: '2 minutes' },
                  { step: 2, title: 'Health Questions', description: 'Simple health questionnaire', icon: Users, time: '3 minutes' },
                  { step: 3, title: 'Review & Apply', description: 'Review your quote and submit application', icon: Award, time: '2 minutes' },
                  { step: 4, title: 'Get Covered', description: 'Instant approval for qualified applicants', icon: TrendingUp, time: 'Instant' }
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-purple-600 mb-2">STEP {step.step}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                        {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 bg-purple-50 rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">No Medical Exam Required*</h3>
                  <p className="text-gray-600 mb-6">
                    For coverage up to $500,000, healthy applicants ages 18-60 may qualify for instant approval without a medical exam.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="font-medium">No Needles</div>
                      <div className="text-gray-600">No blood work required</div>
                    </div>
                    <div>
                      <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="font-medium">No Waiting</div>
                      <div className="text-gray-600">Instant decisions available</div>
                    </div>
                    <div>
                      <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="font-medium">No Hassle</div>
                      <div className="text-gray-600">Simple online process</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                <p className="text-xl text-gray-600">See what our customers say about their experience</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Maria Rodriguez',
                    location: 'Phoenix, AZ',
                    rating: 5,
                    review: 'Got $500K coverage in just 5 minutes with no medical exam. The process was incredibly simple and the rates are great!'
                  },
                  {
                    name: 'James Wilson',
                    location: 'Orlando, FL',
                    rating: 5,
                    review: 'As a new father, I needed life insurance fast. MatchedCover made it so easy and affordable to protect my family.'
                  },
                  {
                    name: 'Lisa Chen',
                    location: 'Portland, OR',
                    rating: 5,
                    review: 'The customer service team was so helpful in explaining the different options. I feel confident I made the right choice.'
                  }
                ].map((review, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">&ldquo;{review.review}&rdquo;</p>
                    <div>
                      <div className="font-semibold text-gray-900">{review.name}</div>
                      <div className="text-sm text-gray-600">{review.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Protect Your Family Today
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get affordable life insurance coverage in just 2 minutes
          </p>
          <Link
            href="/quote/life"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-purple-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Start Your Application
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MatchedCover</span>
              </div>
              <p className="text-gray-400">
                Making insurance simple, transparent, and affordable for everyone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/home-insurance" className="hover:text-white transition-colors">Home Insurance</Link></li>
                <li><Link href="/auto-insurance" className="hover:text-white transition-colors">Auto Insurance</Link></li>
                <li><Link href="/life-insurance" className="hover:text-white transition-colors">Life Insurance</Link></li>
                <li><Link href="/renters-insurance" className="hover:text-white transition-colors">Renters Insurance</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/claims" className="hover:text-white transition-colors">File a Claim</Link></li>
                <li><a href="tel:1-800-555-0123" className="hover:text-white transition-colors">1-800-555-0123</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MatchedCover. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
