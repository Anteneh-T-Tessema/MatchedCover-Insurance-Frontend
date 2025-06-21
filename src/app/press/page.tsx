'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Calendar, ExternalLink, Download, Mail, Phone, User, Building } from 'lucide-react';

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'funding', name: 'Funding' },
    { id: 'product', name: 'Product Updates' },
    { id: 'partnerships', name: 'Partnerships' },
    { id: 'awards', name: 'Awards' },
    { id: 'company', name: 'Company News' }
  ];

  const pressReleases = [
    {
      id: 1,
      title: 'MatchedCover Raises $50M Series B to Revolutionize AI-Powered Insurance',
      category: 'funding',
      date: '2024-03-15',
      excerpt: 'Leading insurtech startup MatchedCover announces Series B funding led by Andreessen Horowitz to accelerate AI platform development and expand market reach.',
      featured: true,
      link: '#'
    },
    {
      id: 2,
      title: 'MatchedCover Launches Gamified Insurance Experience with AI Agents',
      category: 'product',
      date: '2024-02-28',
      excerpt: 'Revolutionary new platform transforms insurance buying with AI-powered agents, gamification elements, and personalized experiences that make protection engaging.',
      featured: true,
      link: '#'
    },
    {
      id: 3,
      title: 'MatchedCover Partners with Leading MGAs to Expand Coverage Options',
      category: 'partnerships',
      date: '2024-02-14',
      excerpt: 'Strategic partnerships with top Managing General Agents enable broader product offerings and competitive pricing across all insurance categories.',
      featured: false,
      link: '#'
    },
    {
      id: 4,
      title: 'MatchedCover Wins "Best Insurtech Innovation" at InsureTech Awards 2024',
      category: 'awards',
      date: '2024-01-20',
      excerpt: 'Recognition for pioneering AI-driven approach to insurance that makes coverage more accessible, affordable, and user-friendly for modern consumers.',
      featured: false,
      link: '#'
    },
    {
      id: 5,
      title: 'MatchedCover Achieves 1 Million Customer Milestone',
      category: 'company',
      date: '2024-01-10',
      excerpt: 'Insurtech company reaches significant growth milestone with 1 million customers served, demonstrating strong market demand for AI-powered insurance solutions.',
      featured: false,
      link: '#'
    },
    {
      id: 6,
      title: 'MatchedCover Introduces Real-Time Policy Adjustments with AI',
      category: 'product',
      date: '2023-12-05',
      excerpt: 'New feature allows customers to modify coverage instantly based on life changes, powered by advanced AI algorithms that ensure optimal protection.',
      featured: false,
      link: '#'
    }
  ];

  const mediaAssets = [
    {
      type: 'Logo Package',
      description: 'High-resolution logos, brand guidelines, and usage instructions',
      format: 'ZIP (10MB)',
      link: '#'
    },
    {
      type: 'Executive Photos',
      description: 'Professional headshots of leadership team members',
      format: 'ZIP (25MB)',
      link: '#'
    },
    {
      type: 'Product Screenshots',
      description: 'High-quality screenshots of platform and mobile app',
      format: 'ZIP (15MB)',
      link: '#'
    },
    {
      type: 'Company Fact Sheet',
      description: 'Key statistics, milestones, and company information',
      format: 'PDF (2MB)',
      link: '#'
    }
  ];

  const leadershipTeam = [
    {
      name: 'Sarah Chen',
      title: 'CEO & Co-founder',
      bio: 'Former VP of Product at Lemonade, Stanford MBA. 10+ years in insurtech and fintech.',
      email: 'sarah@matchedcover.com',
      linkedin: '#'
    },
    {
      name: 'Michael Rodriguez',
      title: 'CTO & Co-founder',
      bio: 'Ex-Google Senior Engineer, MIT Computer Science. Expert in AI/ML and scalable systems.',
      email: 'michael@matchedcover.com',
      linkedin: '#'
    },
    {
      name: 'Jennifer Kim',
      title: 'Head of Marketing',
      bio: 'Former CMO at Metromile, Northwestern MBA. 8+ years in digital marketing and growth.',
      email: 'jennifer@matchedcover.com',
      linkedin: '#'
    }
  ];

  const filteredReleases = selectedCategory === 'all' 
    ? pressReleases 
    : pressReleases.filter(release => release.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Press &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Media Center</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The latest news, announcements, and media resources from MatchedCover. 
              Stay updated on our mission to revolutionize insurance with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#press-contact"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <Mail className="h-5 w-5 mr-2" />
                Media Inquiries
              </a>
              <a
                href="#media-kit"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Media Kit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-xl text-gray-600">Stay up to date with MatchedCover announcements and milestones</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Press Release List */}
          <div className="space-y-6">
            {filteredReleases.map((release) => (
              <article
                key={release.id}
                className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                  release.featured ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{release.title}</h3>
                      {release.featured && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(release.date)}
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                        {release.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-700">{release.excerpt}</p>
                  </div>
                  
                  <div className="lg:ml-6 mt-4 lg:mt-0">
                    <a
                      href={release.link}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Read More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section id="media-kit" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Resources</h2>
            <p className="text-xl text-gray-600">Download logos, photos, and other media assets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaAssets.map((asset, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{asset.type}</h3>
                <p className="text-gray-600 mb-4">{asset.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{asset.format}</span>
                  <a
                    href={asset.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the executives driving innovation in insurance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{leader.title}</p>
                <p className="text-gray-600 mb-4">{leader.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={`mailto:${leader.email}`}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label={`Email ${leader.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href={leader.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    aria-label={`${leader.name}'s LinkedIn profile`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section id="press-contact" className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Inquiries</h2>
              <p className="text-xl text-gray-600">Get in touch with our press team for interviews, quotes, and story ideas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">General Press Inquiries</h3>
                    <p className="text-gray-600 mb-2">For general media questions and press kit requests</p>
                    <a href="mailto:press@matchedcover.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      press@matchedcover.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone Interviews</h3>
                    <p className="text-gray-600 mb-2">Schedule calls with our leadership team</p>
                    <a href="tel:1-800-555-0199" className="text-blue-600 hover:text-blue-700 font-medium">
                      1-800-555-0199
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Partnership Announcements</h3>
                    <p className="text-gray-600 mb-2">Joint press releases and partnership news</p>
                    <a href="mailto:partnerships@matchedcover.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      partnerships@matchedcover.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">2022</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Headquarters:</span>
                    <span className="font-medium">San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customers:</span>
                    <span className="font-medium">1M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funding:</span>
                    <span className="font-medium">$75M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
