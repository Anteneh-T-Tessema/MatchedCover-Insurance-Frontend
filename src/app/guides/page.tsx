'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Search, BookOpen, Download, Clock, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const guides = [
    {
      id: 1,
      title: 'Complete Guide to Home Insurance',
      description: 'Everything you need to know about protecting your home and belongings.',
      category: 'home',
      readTime: '15 min',
      downloadUrl: '/guides/home-insurance-guide.pdf',
      topics: ['Coverage Types', 'Pricing Factors', 'Claims Process', 'Tips & Best Practices']
    },
    {
      id: 2,
      title: 'Auto Insurance Explained',
      description: 'Understanding coverage options and finding the right policy for your needs.',
      category: 'auto',
      readTime: '12 min',
      downloadUrl: '/guides/auto-insurance-guide.pdf',
      topics: ['Required Coverage', 'Optional Add-ons', 'Discounts', 'Accident Procedures']
    },
    {
      id: 3,
      title: 'Life Insurance Planning',
      description: 'How to choose the right life insurance coverage for your family.',
      category: 'life',
      readTime: '20 min',
      downloadUrl: '/guides/life-insurance-guide.pdf',
      topics: ['Term vs Whole Life', 'Coverage Amount', 'Beneficiaries', 'Estate Planning']
    },
    {
      id: 4,
      title: 'Renters Insurance Basics',
      description: 'Protecting your personal property as a renter.',
      category: 'renters',
      readTime: '8 min',
      downloadUrl: '/guides/renters-insurance-guide.pdf',
      topics: ['Personal Property', 'Liability Coverage', 'Additional Living Expenses', 'Inventory Tips']
    },
    {
      id: 5,
      title: 'Filing Insurance Claims',
      description: 'Step-by-step guide to filing and managing insurance claims.',
      category: 'claims',
      readTime: '10 min',
      downloadUrl: '/guides/claims-process-guide.pdf',
      topics: ['When to File', 'Documentation', 'Working with Adjusters', 'Settlement Process']
    },
    {
      id: 6,
      title: 'Insurance Savings Tips',
      description: 'How to save money on insurance without sacrificing coverage.',
      category: 'savings',
      readTime: '7 min',
      downloadUrl: '/guides/insurance-savings-guide.pdf',
      topics: ['Bundling Discounts', 'Risk Reduction', 'Policy Reviews', 'Shopping Strategies']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Guides' },
    { id: 'home', name: 'Home Insurance' },
    { id: 'auto', name: 'Auto Insurance' },
    { id: 'life', name: 'Life Insurance' },
    { id: 'renters', name: 'Renters Insurance' },
    { id: 'claims', name: 'Claims' },
    { id: 'savings', name: 'Savings Tips' }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <Link href="/help" className="text-gray-600 hover:text-gray-900">Help</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Insurance Guides
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive guides to help you understand insurance, make informed decisions, and get the most value from your coverage.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{guide.readTime}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      guide.category === 'home' ? 'bg-blue-100 text-blue-800' :
                      guide.category === 'auto' ? 'bg-green-100 text-green-800' :
                      guide.category === 'life' ? 'bg-purple-100 text-purple-800' :
                      guide.category === 'renters' ? 'bg-orange-100 text-orange-800' :
                      guide.category === 'claims' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {categories.find(c => c.id === guide.category)?.name}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">What you&rsquo;ll learn:</h4>
                    <ul className="space-y-1">
                      {guide.topics.map((topic, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link
                      href={`/guides/${guide.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                    >
                      Read Guide
                    </Link>
                    <a
                      href={guide.downloadUrl}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      download
                    >
                      <Download className="h-4 w-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need More Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our insurance experts are here to help you find the perfect coverage for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Contact an Expert
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Visit Help Center
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">MatchedCover</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-white text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
