'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Home, CheckCircle, Star, Phone, ArrowRight, Zap, DollarSign, Clock, Users, Award, TrendingUp } from 'lucide-react';

export default function HomeInsurancePage() {
  const [activeTab, setActiveTab] = useState('coverage');

  const tabs = [
    { id: 'coverage', label: 'Coverage Options', icon: Shield },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'claims', label: 'Claims Process', icon: Clock },
    { id: 'reviews', label: 'Customer Reviews', icon: Star }
  ];

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
    },
    {
      title: 'Water Backup Coverage',
      description: 'Protection against sewer and drain backups',
      included: false,
      details: 'Optional coverage for water damage from backed-up drains'
    }
  ];

  const pricingTiers = [
    {
      name: 'Essential',
      price: '$89',
      description: 'Basic protection for your home',
      features: [
        'Dwelling coverage up to $300K',
        'Personal property coverage',
        'Liability protection $100K',
        'Basic claims support',
        '24/7 customer service'
      ],
      popular: false
    },
    {
      name: 'Preferred',
      price: '$149',
      description: 'Comprehensive coverage with extras',
      features: [
        'Dwelling coverage up to $500K',
        'Enhanced personal property',
        'Liability protection $300K',
        'Priority claims handling',
        'Water backup coverage',
        'Identity theft protection'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '$229',
      description: 'Maximum protection and luxury features',
      features: [
        'Dwelling coverage up to $1M',
        'Replacement cost coverage',
        'Liability protection $500K',
        'Concierge claims service',
        'All optional coverages',
        'Home security monitoring'
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
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Home Insurance</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Protect Your Home with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Smart Coverage</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get comprehensive home insurance that adapts to your needs. AI-powered quotes in under 60 seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/quote/homeowners"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
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
                  <div className="text-2xl font-bold text-blue-600">60s</div>
                  <div className="text-sm text-gray-600">Quote Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
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
                    <label htmlFor="home-value" className="block text-sm font-medium text-gray-700 mb-1">Home Value</label>
                    <select 
                      id="home-value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>$200,000 - $300,000</option>
                      <option>$300,000 - $400,000</option>
                      <option>$400,000 - $500,000</option>
                      <option>$500,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="coverage-level" className="block text-sm font-medium text-gray-700 mb-1">Coverage Level</label>
                    <select 
                      id="coverage-level"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Essential Protection</option>
                      <option>Comprehensive Coverage</option>
                      <option>Premium Protection</option>
                    </select>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-600 font-medium">Estimated Monthly Premium</span>
                      <span className="text-2xl font-bold text-blue-600">$149</span>
                    </div>
                    <p className="text-xs text-blue-500 mt-1">*Based on typical coverage for your area</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
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
                      ? 'border-blue-500 text-blue-600'
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
                <p className="text-xl text-gray-600">Comprehensive protection for your home and belongings</p>
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
                      <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
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
                <p className="text-xl text-gray-600">Flexible pricing options to fit your budget and needs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`relative bg-white border-2 rounded-lg p-8 ${
                      tier.popular
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Claims Process</h2>
                <p className="text-xl text-gray-600">File and track your claims with ease</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: 1, title: 'Report Claim', description: 'Call us or file online 24/7', icon: Phone },
                  { step: 2, title: 'Assessment', description: 'Quick damage assessment by our experts', icon: Users },
                  { step: 3, title: 'Approval', description: 'Fast approval and payment processing', icon: Award },
                  { step: 4, title: 'Resolution', description: 'Get back to normal quickly', icon: TrendingUp }
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.step}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need to File a Claim?</h3>
                <p className="text-gray-600 mb-6">Our claims team is available 24/7 to help you through the process</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/claims"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    File Claim Online
                  </Link>
                  <a
                    href="tel:1-800-555-0123"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50"
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What Customers Say</h2>
                <p className="text-xl text-gray-600">Real reviews from real customers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Sarah Johnson',
                    location: 'Austin, TX',
                    rating: 5,
                    review: 'MatchedCover made getting home insurance so easy. The AI quote was accurate and I saved $200/month compared to my old policy.'
                  },
                  {
                    name: 'Mike Chen',
                    location: 'Seattle, WA',
                    rating: 5,
                    review: 'When my roof was damaged in a storm, their claims process was incredibly fast. I had a check within 3 days!'
                  },
                  {
                    name: 'Emily Davis',
                    location: 'Denver, CO',
                    rating: 5,
                    review: 'The customer service is outstanding. They helped me understand exactly what coverage I needed for my first home.'
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a personalized quote in under 60 seconds
          </p>
          <Link
            href="/quote/homeowners"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
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
