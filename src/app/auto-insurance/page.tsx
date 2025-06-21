'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Car, CheckCircle, Star, Phone, ArrowRight, Zap, DollarSign, Clock, Users, Award, TrendingUp } from 'lucide-react';

export default function AutoInsurancePage() {
  const [activeTab, setActiveTab] = useState('coverage');

  const tabs = [
    { id: 'coverage', label: 'Coverage Options', icon: Shield },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'claims', label: 'Claims Process', icon: Clock },
    { id: 'reviews', label: 'Customer Reviews', icon: Star }
  ];

  const coverageOptions = [
    {
      title: 'Liability Coverage',
      description: 'Required coverage for bodily injury and property damage',
      included: true,
      details: 'Covers damage you cause to other people and their property'
    },
    {
      title: 'Collision Coverage',
      description: 'Covers damage to your car from accidents',
      included: true,
      details: 'Protection against collision with another vehicle or object'
    },
    {
      title: 'Comprehensive Coverage',
      description: 'Covers non-collision damage to your vehicle',
      included: true,
      details: 'Protection against theft, vandalism, weather, and animals'
    },
    {
      title: 'Personal Injury Protection',
      description: 'Medical coverage for you and your passengers',
      included: true,
      details: 'Covers medical expenses regardless of who is at fault'
    },
    {
      title: 'Uninsured Motorist',
      description: 'Protection against uninsured or underinsured drivers',
      included: true,
      details: 'Coverage when the other driver has no insurance'
    },
    {
      title: 'Roadside Assistance',
      description: 'Emergency roadside help 24/7',
      included: false,
      details: 'Towing, battery jump, flat tire assistance, and lockout service'
    }
  ];

  const pricingTiers = [
    {
      name: 'Basic',
      price: '$89',
      description: 'State-required minimum coverage',
      features: [
        'State minimum liability',
        'Basic collision coverage',
        'Comprehensive coverage',
        'Standard claims support',
        '24/7 customer service'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: '$149',
      description: 'Recommended coverage for most drivers',
      features: [
        'Enhanced liability limits',
        'Full collision coverage',
        'Comprehensive coverage',
        'Personal injury protection',
        'Uninsured motorist coverage',
        'Priority claims handling'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '$229',
      description: 'Maximum protection and benefits',
      features: [
        'High liability limits',
        'Low deductible options',
        'Rental car coverage',
        'Roadside assistance',
        'Gap coverage',
        'Concierge claims service'
      ],
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
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-green-600" />
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Auto Insurance</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Drive with Confidence,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Save with AI</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized auto insurance that fits your driving habits. Smart pricing based on real data.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/quote/auto"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Get Instant Quote
                </Link>
                <a
                  href="tel:1-800-555-0123"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call for Help
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">30s</div>
                  <div className="text-sm text-gray-600">Quote Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.8★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">250K+</div>
                  <div className="text-sm text-gray-600">Insured Vehicles</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Quote Estimate</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Live Pricing
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="vehicle-year" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Year</label>
                    <select 
                      id="vehicle-year"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>2020 - 2024</option>
                      <option>2015 - 2019</option>
                      <option>2010 - 2014</option>
                      <option>2005 - 2009</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="coverage-type" className="block text-sm font-medium text-gray-700 mb-1">Coverage Type</label>
                    <select 
                      id="coverage-type"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>Full Coverage</option>
                      <option>Liability Only</option>
                      <option>Comprehensive Only</option>
                    </select>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600 font-medium">Estimated Monthly Premium</span>
                      <span className="text-2xl font-bold text-green-600">$149</span>
                    </div>
                    <p className="text-xs text-green-500 mt-1">*Based on good driver record and location</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200">
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
                      ? 'border-green-500 text-green-600'
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Coverage Options</h2>
                <p className="text-xl text-gray-600">Comprehensive protection for you and your vehicle</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coverageOptions.map((option, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                      <div className={`ml-4 ${option.included ? 'text-green-500' : 'text-gray-400'}`}>
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{option.details}</p>
                    {!option.included && (
                      <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Optional Add-on
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Coverage Level</h2>
                <p className="text-xl text-gray-600">Flexible pricing options for every driver</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`relative bg-white border-2 rounded-lg p-8 ${
                      tier.popular
                        ? 'border-green-500 shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                      <p className="text-gray-600 mt-2">{tier.description}</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        tier.popular
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Get Quote
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'claims' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Fast Claims Process</h2>
                <p className="text-xl text-gray-600">Get back on the road quickly after an accident</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: 1, title: 'Report Accident', description: 'Call or use our mobile app instantly', icon: Phone },
                  { step: 2, title: 'Quick Assessment', description: 'Upload photos or schedule inspection', icon: Users },
                  { step: 3, title: 'Repair Authorization', description: 'Choose from our network of trusted shops', icon: Award },
                  { step: 4, title: 'Get Back Driving', description: 'Fast repairs and direct payments', icon: TrendingUp }
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-green-600 mb-2">STEP {step.step}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need to File a Claim?</h3>
                <p className="text-gray-600 mb-6">Our claims team is standing by to help you 24/7</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/claims"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700"
                  >
                    File Claim Online
                  </Link>
                  <a
                    href="tel:1-800-555-0123"
                    className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-base font-medium rounded-lg text-green-600 bg-white hover:bg-green-50"
                  >
                    Call Claims Hotline
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drivers Say</h2>
                <p className="text-xl text-gray-600">Real reviews from real customers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'David Martinez',
                    location: 'Los Angeles, CA',
                    rating: 5,
                    review: 'Switched to MatchedCover and saved $150/month! The AI pricing is spot-on for safe drivers like me.'
                  },
                  {
                    name: 'Jennifer Kim',
                    location: 'Chicago, IL',
                    rating: 5,
                    review: 'Had an accident and their claims process was incredibly smooth. Got my car fixed in 2 days!'
                  },
                  {
                    name: 'Robert Johnson',
                    location: 'Miami, FL',
                    rating: 5,
                    review: 'The mobile app makes everything so easy. I can manage my policy and even file claims right from my phone.'
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
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Save on Auto Insurance?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get a personalized quote in under 30 seconds
          </p>
          <Link
            href="/quote/auto"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-green-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Get Your Quote Now
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
