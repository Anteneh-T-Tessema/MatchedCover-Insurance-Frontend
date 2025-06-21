'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Calendar, User, ArrowRight, Search, Tag, TrendingUp, Lightbulb, Shield as ShieldIcon, Brain } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', icon: null },
    { id: 'insurance-101', name: 'Insurance 101', icon: ShieldIcon },
    { id: 'ai-tech', name: 'AI & Technology', icon: Brain },
    { id: 'industry-insights', name: 'Industry Insights', icon: TrendingUp },
    { id: 'company-updates', name: 'Company Updates', icon: Lightbulb }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Insurance: A Deep Dive into Machine Learning Applications',
      category: 'ai-tech',
      author: 'Michael Rodriguez',
      authorRole: 'CTO',
      date: '2024-03-20',
      readTime: '8 min read',
      excerpt: 'Explore how artificial intelligence and machine learning are transforming the insurance industry, from risk assessment to claims processing.',
      featured: true,
      image: null,
      tags: ['AI', 'Machine Learning', 'Innovation', 'Technology']
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Choosing the Right Home Insurance Coverage',
      category: 'insurance-101',
      author: 'Sarah Johnson',
      authorRole: 'Insurance Expert',
      date: '2024-03-18',
      readTime: '12 min read',
      excerpt: 'Everything you need to know about home insurance coverage options, from dwelling protection to personal property coverage.',
      featured: true,
      image: null,
      tags: ['Home Insurance', 'Coverage', 'Guide', 'Protection']
    },
    {
      id: 3,
      title: 'Why Gamification is the Future of Insurance Customer Experience',
      category: 'industry-insights',
      author: 'Jennifer Kim',
      authorRole: 'Head of Marketing',
      date: '2024-03-15',
      readTime: '6 min read',
      excerpt: 'Discover how gamification elements are making insurance more engaging and helping customers better understand their coverage.',
      featured: false,
      image: null,
      tags: ['Gamification', 'Customer Experience', 'UX', 'Engagement']
    },
    {
      id: 4,
      title: 'MatchedCover Announces Series B Funding: What This Means for Our Customers',
      category: 'company-updates',
      author: 'Sarah Chen',
      authorRole: 'CEO',
      date: '2024-03-10',
      readTime: '4 min read',
      excerpt: 'Our CEO shares insights about our recent $50M Series B funding round and how we plan to use these resources to better serve customers.',
      featured: false,
      image: null,
      tags: ['Funding', 'Growth', 'Company News', 'Investment']
    },
    {
      id: 5,
      title: 'Understanding Auto Insurance: Beyond the Basics',
      category: 'insurance-101',
      author: 'David Martinez',
      authorRole: 'Product Manager',
      date: '2024-03-08',
      readTime: '10 min read',
      excerpt: 'A comprehensive guide to auto insurance coverage types, state requirements, and how to choose the right policy for your needs.',
      featured: false,
      image: null,
      tags: ['Auto Insurance', 'Education', 'Coverage Types', 'State Requirements']
    },
    {
      id: 6,
      title: 'The Rise of Insurtech: How Technology is Democratizing Insurance',
      category: 'industry-insights',
      author: 'Lisa Wang',
      authorRole: 'Research Analyst',
      date: '2024-03-05',
      readTime: '7 min read',
      excerpt: 'An analysis of how technology startups are making insurance more accessible, affordable, and transparent for consumers.',
      featured: false,
      image: null,
      tags: ['Insurtech', 'Technology', 'Market Analysis', 'Innovation']
    },
    {
      id: 7,
      title: 'Building Trust in AI: How We Ensure Transparent and Fair Insurance Decisions',
      category: 'ai-tech',
      author: 'Michael Rodriguez',
      authorRole: 'CTO',
      date: '2024-03-01',
      readTime: '9 min read',
      excerpt: 'Learn about our commitment to ethical AI and how we build transparency and fairness into our automated decision-making systems.',
      featured: false,
      image: null,
      tags: ['AI Ethics', 'Transparency', 'Fairness', 'Trust']
    },
    {
      id: 8,
      title: 'Life Insurance 101: Protecting Your Family&apos;s Financial Future',
      category: 'insurance-101',
      author: 'Amanda Foster',
      authorRole: 'Life Insurance Specialist',
      date: '2024-02-28',
      readTime: '11 min read',
      excerpt: 'A beginner-friendly guide to life insurance types, coverage amounts, and how to determine what&apos;s right for your family.',
      featured: false,
      image: null,
      tags: ['Life Insurance', 'Family Protection', 'Financial Planning', 'Guide']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
              MatchedCover
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Blog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Insights, guides, and updates from the future of insurance. Learn about AI, industry trends, 
              and how to protect what matters most.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4 mr-2" />}
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">{filteredPosts.length} articles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.authorRole}</p>
                          </div>
                        </div>
                        
                        <Link 
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Read
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Insurance Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest articles, industry news, and insurance tips delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Subscribe
            </button>
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
