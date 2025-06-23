'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Book, FileText, Code, Download, Search, Filter, ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  description: string;
  items: DocItem[];
}

interface DocItem {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'api' | 'tutorial' | 'reference';
  category: string;
  downloadUrl?: string;
  externalUrl?: string;
  codeExample?: string;
}

const documentationData: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Everything you need to begin your insurance journey',
    items: [
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        description: 'Get up and running with MatchedCover in 5 minutes',
        type: 'guide',
        category: 'Getting Started'
      },
      {
        id: 'account-setup',
        title: 'Account Setup',
        description: 'Complete guide to setting up your MatchedCover account',
        type: 'tutorial',
        category: 'Getting Started'
      },
      {
        id: 'first-quote',
        title: 'Getting Your First Quote',
        description: 'Step-by-step walkthrough of the quote process',
        type: 'tutorial',
        category: 'Getting Started'
      }
    ]
  },
  {
    id: 'insurance-basics',
    title: 'Insurance Fundamentals',
    description: 'Core concepts and terminology explained',
    items: [
      {
        id: 'coverage-types',
        title: 'Coverage Types Explained',
        description: 'Understanding different insurance coverage options',
        type: 'guide',
        category: 'Education',
        downloadUrl: '/docs/coverage-types.pdf'
      },
      {
        id: 'policy-terms',
        title: 'Policy Terms Glossary',
        description: 'Comprehensive glossary of insurance terminology',
        type: 'reference',
        category: 'Education'
      },
      {
        id: 'claims-process',
        title: 'Claims Process Guide',
        description: 'How to file and manage insurance claims',
        type: 'guide',
        category: 'Claims'
      }
    ]
  },
  {
    id: 'product-docs',
    title: 'Product Documentation',
    description: 'Detailed documentation for each insurance product',
    items: [
      {
        id: 'home-insurance-guide',
        title: 'Home Insurance Guide',
        description: 'Complete guide to home insurance coverage and options',
        type: 'guide',
        category: 'Home Insurance',
        downloadUrl: '/docs/home-insurance-guide.pdf'
      },
      {
        id: 'auto-insurance-guide',
        title: 'Auto Insurance Guide',
        description: 'Everything about auto insurance coverage',
        type: 'guide',
        category: 'Auto Insurance',
        downloadUrl: '/docs/auto-insurance-guide.pdf'
      },
      {
        id: 'life-insurance-guide',
        title: 'Life Insurance Guide',
        description: 'Understanding life insurance types and benefits',
        type: 'guide',
        category: 'Life Insurance',
        downloadUrl: '/docs/life-insurance-guide.pdf'
      }
    ]
  },
  {
    id: 'api-docs',
    title: 'API Documentation',
    description: 'Technical documentation for developers',
    items: [
      {
        id: 'api-overview',
        title: 'API Overview',
        description: 'Introduction to the MatchedCover API',
        type: 'api',
        category: 'API',
        externalUrl: 'https://api.matchedcover.com/docs'
      },
      {
        id: 'authentication',
        title: 'Authentication',
        description: 'How to authenticate with our API',
        type: 'api',
        category: 'API',
        codeExample: `curl -X POST https://api.matchedcover.com/auth \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey": "your-api-key"}'`
      },
      {
        id: 'quote-api',
        title: 'Quote API Reference',
        description: 'Complete reference for the Quote API endpoints',
        type: 'reference',
        category: 'API'
      }
    ]
  }
];

const categories = ['All', 'Getting Started', 'Education', 'Claims', 'Home Insurance', 'Auto Insurance', 'Life Insurance', 'API'];
const types = ['All', 'guide', 'api', 'tutorial', 'reference'];

export default function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredItems = documentationData
    .flatMap(section => section.items)
    .filter(item => 
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (selectedType === 'All' || item.type === selectedType) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'api': return 'bg-green-100 text-green-800';
      case 'tutorial': return 'bg-purple-100 text-purple-800';
      case 'reference': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/guides" className="text-gray-600 hover:text-gray-900">Guides</Link>
              <Link href="/videos" className="text-gray-600 hover:text-gray-900">Videos</Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900">Community</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Documentation</span> Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive guides, API references, and tutorials to help you get the most out of MatchedCover.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Documentation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="#getting-started" className="group">
              <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  Getting Started Guide
                </h3>
                <p className="text-gray-600 mb-3">
                  New to MatchedCover? Start here for a quick overview and setup guide.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Read Guide</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="#api-docs" className="group">
              <div className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">
                  API Documentation
                </h3>
                <p className="text-gray-600 mb-3">
                  Integrate MatchedCover into your applications with our REST API.
                </p>
                <div className="flex items-center text-green-600 font-medium">
                  <span>View API Docs</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link href="#product-docs" className="group">
              <div className="bg-purple-50 rounded-xl p-6 hover:bg-purple-100 transition-colors">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                  Product Guides
                </h3>
                <p className="text-gray-600 mb-3">
                  Detailed guides for each insurance product and coverage type.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Browse Guides</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Filter by category"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Filter by type"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {documentationData.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-20">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
                  <p className="text-xl text-gray-600">{section.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items
                    .filter(item => 
                      (selectedCategory === 'All' || item.category === selectedCategory) &&
                      (selectedType === 'All' || item.type === selectedType) &&
                      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        {item.downloadUrl && (
                          <button 
                            onClick={() => window.open(item.downloadUrl, '_blank')}
                            className="text-gray-400 hover:text-gray-600"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      {item.codeExample && (
                        <div className="mb-4">
                          <div className="bg-gray-900 rounded-lg p-4 relative">
                            <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                              {item.codeExample}
                            </code>
                            <button
                              onClick={() => handleCopyCode(item.codeExample!, item.id)}
                              className="absolute top-2 right-2 text-gray-400 hover:text-white"
                              title="Copy code"
                            >
                              {copiedCode === item.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          {item.externalUrl && (
                            <button 
                              onClick={() => window.open(item.externalUrl, '_blank')}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                            >
                              <span>View</span>
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          )}
                          {!item.externalUrl && (
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Read More →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No documentation found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/support"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/community"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
