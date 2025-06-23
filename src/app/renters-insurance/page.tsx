'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Key, CheckCircle, Star, Phone, ArrowRight, Zap, DollarSign, Clock, Users, Award, TrendingUp } from 'lucide-react';

export default function RentersInsurancePage() {
  const [activeTab, setActiveTab] = useState('coverage');

  const tabs = [
    { id: 'coverage', label: 'Coverage Options', icon: Shield },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'claims', label: 'Claims Process', icon: Clock },
    { id: 'reviews', label: 'Customer Reviews', icon: Star }
  ];

  const coverageOptions = [
    {
      title: 'Personal Property Coverage',
      description: 'Protects your belongings from theft, fire, and other covered perils',
      included: true,
      details: 'Furniture, electronics, clothing, and other personal items'
    },
    {
      title: 'Liability Protection',
      description: 'Covers accidents that happen in your rental',
      included: true,
      details: 'Protection if someone is injured in your rental property'
    },
    {
      title: 'Additional Living Expenses',
      description: 'Temporary housing if your rental becomes uninhabitable',
      included: true,
      details: 'Hotel costs and additional expenses while displaced'
    },
    {
      title: 'Medical Payments',
      description: 'Medical bills for guests injured in your rental',
      included: true,
      details: 'No-fault coverage for minor injuries to visitors'
    },
    {
      title: 'Identity Theft Protection',
      description: 'Help recovering from identity theft',
      included: false,
      details: 'Assistance with credit monitoring and identity restoration'
    },
    {
      title: 'Replacement Cost Coverage',
      description: 'Replace items at today&apos;s prices, not depreciated value',
      included: false,
      details: 'Upgrade to get full replacement value for damaged items'
    }
  ];

  const pricingTiers = [
    {
      name: 'Essential',
      price: '$15',
      description: 'Basic protection for renters',
      features: [
        '$20K personal property',
        '$100K liability coverage',
        '$2K additional living expenses',
        'Basic claims support',
        '24/7 customer service'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: '$25',
      description: 'Comprehensive coverage for most renters',
      features: [
        '$30K personal property',
        '$300K liability coverage',
        '$5K additional living expenses',
        'Replacement cost coverage',
        'Priority claims handling',
        'Identity theft protection'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '$35',
      description: 'Maximum protection for valuable items',
      features: [
        '$50K personal property',
        '$500K liability coverage',
        '$10K additional living expenses',
        'Scheduled personal property',
        'Water backup coverage',
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
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Key className="h-8 w-8 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Renters Insurance</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Protect Your Stuff,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Not Just Your Rent</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Affordable renters insurance starting at just $15/month. Protect your belongings and get liability coverage in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/quote/renters"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transition-all duration-200"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Get Quote in 30 Seconds
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
                  <div className="text-2xl font-bold text-orange-600">30s</div>
                  <div className="text-sm text-gray-600">Quote Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">75K+</div>
                  <div className="text-sm text-gray-600">Renters Protected</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Quote Estimate</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Live Pricing
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="property-value" className="block text-sm font-medium text-gray-700 mb-1">Personal Property Value</label>
                    <select 
                      id="property-value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option>$15,000 - $25,000</option>
                      <option>$25,000 - $40,000</option>
                      <option>$40,000 - $60,000</option>
                      <option>$60,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location-type" className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                    <select 
                      id="location-type"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option>Apartment</option>
                      <option>House</option>
                      <option>Condo</option>
                      <option>Townhouse</option>
                    </select>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-600 font-medium">Estimated Monthly Premium</span>
                      <span className="text-2xl font-bold text-orange-600">$25</span>
                    </div>
                    <p className="text-xs text-orange-500 mt-1">*Based on typical coverage for your area</p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200">
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
                  className={py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Covered</h2>
                <p className="text-xl text-gray-600">Comprehensive protection for renters</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coverageOptions.map((option, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                      <div className={ml-4 ${option.included ? 'text-orange-500' : 'text-gray-400'}`}>
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{option.details}</p>
                    {!option.included && (
                      <span className="inline-block mt-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Optional Add-on
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gray-50 rounded-lg p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Do Renters Need Insurance?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Landlord&apos;s Insurance Doesn&apos;t Cover Your Stuff</h4>
                    <p className="text-gray-600 text-sm">
                      Your landlord&apos;s policy only covers the building structure, not your personal belongings or liability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Accidents Can Be Expensive</h4>
                    <p className="text-gray-600 text-sm">
                      If someone gets hurt in your rental or you accidentally damage the property, you could be liable for thousands.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Coverage Follows You</h4>
                    <p className="text-gray-600 text-sm">
                      Your policy covers you even when you&apos;re traveling or temporarily staying elsewhere.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">It&apos;s More Affordable Than You Think</h4>
                    <p className="text-gray-600 text-sm">
                      Quality renters insurance starts at just $15/month - less than what you probably spend on coffee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Affordable Coverage Options</h2>
                <p className="text-xl text-gray-600">Choose the protection level that fits your budget</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={relative bg-white border-2 rounded-lg p-8 ${
                      tier.popular
                        ? 'border-orange-500 shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        tier.popular
                          ? 'bg-orange-600 text-white hover:bg-orange-700'
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Easy Claims Process</h2>
                <p className="text-xl text-gray-600">Get help when you need it most</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: 1, title: 'Report Claim', description: 'Call us or file online 24/7', icon: Phone },
                  { step: 2, title: 'Document Damage', description: 'Take photos and provide details', icon: Users },
                  { step: 3, title: 'Get Approved', description: 'Quick review and approval', icon: Award },
                  { step: 4, title: 'Receive Payment', description: 'Fast reimbursement or replacement', icon: TrendingUp }
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-orange-600" />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-orange-600 mb-2">STEP {step.step}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 bg-orange-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need to File a Claim?</h3>
                <p className="text-gray-600 mb-6">Our claims team is available 24/7 to help you through the process</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/claims"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700"
                  >
                    File Claim Online
                  </Link>
                  <a
                    href="tel:1-800-555-0123"
                    className="inline-flex items-center justify-center px-6 py-3 border border-orange-600 text-base font-medium rounded-lg text-orange-600 bg-white hover:bg-orange-50"
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What Renters Say</h2>
                <p className="text-xl text-gray-600">Real reviews from real customers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Alex Thompson',
                    location: 'New York, NY',
                    rating: 5,
                    review: 'My laptop was stolen from my apartment and MatchedCover replaced it within a week. The process was so smooth!'
                  },
                  {
                    name: 'Samantha Lee',
                    location: 'San Francisco, CA',
                    rating: 5,
                    review: 'For just $20/month, I have peace of mind knowing all my belongings are protected. Best investment I&apos;ve made as a renter.'
                  },
                  {
                    name: 'Carlos Rodriguez',
                    location: 'Austin, TX',
                    rating: 5,
                    review: 'A pipe burst in my apartment and damaged my furniture. MatchedCover covered everything and even paid for my hotel stay.'
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
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Protect Your Belongings Today
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get affordable renters insurance in just 30 seconds
          </p>
          <Link
            href="/quote/renters"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-orange-600 bg-white hover:bg-gray-50 transition-colors"
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
