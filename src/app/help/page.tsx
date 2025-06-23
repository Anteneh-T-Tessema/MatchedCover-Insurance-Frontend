'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Search, 
  Phone, 
  Mail, 
  MessageCircle, 
  Book, 
  Video, 
  Users, 
  ChevronDown,
  ChevronRight,
  HelpCircle,
  FileText,
  ArrowRight
} from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How does MatchedCover's AI matching work?",
    answer: "Our AI agents analyze your specific needs, risk profile, and preferences to match you with the most suitable insurance policies from our network of carriers. The system learns from millions of data points to provide personalized recommendations.",
    category: "AI & Technology"
  },
  {
    id: 2,
    question: "What types of insurance do you offer?",
    answer: "We offer comprehensive coverage including auto, home, renters, life, business, and specialty insurance products. Our AI agents can help you bundle policies for maximum savings and coverage optimization.",
    category: "Products"
  },
  {
    id: 3,
    question: "How quickly can I get a quote?",
    answer: "With our AI-powered system, you can get instant quotes in under 2 minutes. Our Smart Quote Wizard uses gamification to make the process engaging while gathering the necessary information efficiently.",
    category: "Quotes"
  },
  {
    id: 4,
    question: "Is my personal information secure?",
    answer: "Absolutely. We use bank-level encryption and comply with all industry security standards. Your data is protected with multi-layer security protocols, and we never sell your information to third parties.",
    category: "Security"
  },
  {
    id: 5,
    question: "What are MatchedCover Rewards?",
    answer: "Our gamification system rewards you for various actions like getting quotes, completing your profile, maintaining good driving records, and more. Earn points, unlock badges, and redeem rewards for discounts and benefits.",
    category: "Rewards"
  },
  {
    id: 6,
    question: "How do I file a claim?",
    answer: "Claims can be filed 24/7 through our mobile app, website, or by calling our claims hotline. Our AI claim assistant guides you through the process, and most claims are processed within 24-48 hours.",
    category: "Claims"
  },
  {
    id: 7,
    question: "Can I cancel my policy anytime?",
    answer: "Yes, you can cancel most policies with appropriate notice as outlined in your policy terms. Our customer service team can help you understand any cancellation fees or refund policies that may apply.",
    category: "Policies"
  },
  {
    id: 8,
    question: "Do you offer multi-policy discounts?",
    answer: "Yes! Bundling multiple policies can save you up to 25%. Our AI optimization engine automatically identifies the best bundle combinations for your specific situation and maximum savings.",
    category: "Discounts"
  }
];

const categories = ["All", "AI & Technology", "Products", "Quotes", "Security", "Rewards", "Claims", "Policies", "Discounts"];

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
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
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Help?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to your questions, get support, and learn how to make the most of your MatchedCover experience.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Options */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Call Support</h3>
              <p className="text-gray-600 mb-6">Speak with our expert support team</p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-blue-600">1-800-MATCHED</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-6">Chat with Maya, our AI assistant</p>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Support</h3>
              <p className="text-gray-600 mb-6">Get detailed help via email</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-green-600">help@matchedcover.com</p>
                <p className="text-sm text-gray-500">Response within 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about MatchedCover
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-gray-600">
              Explore more ways to get the help you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Book className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Guides</h3>
              <p className="text-gray-600 mb-4">Step-by-step tutorials and guides</p>
              <Link href="/guides" className="text-blue-600 hover:text-blue-700 font-medium">
                View Guides →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Video className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Watch and learn at your own pace</p>
              <Link href="/videos" className="text-purple-600 hover:text-purple-700 font-medium">
                Watch Videos →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 mb-4">Connect with other users</p>
              <Link href="/community" className="text-green-600 hover:text-green-700 font-medium">
                Join Community →
              </Link>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <FileText className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">Technical documentation</p>
              <Link href="/docs" className="text-orange-600 hover:text-orange-700 font-medium">
                Read Docs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our support team is here 24/7 to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              <span>Access My Account</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-semibold">MatchedCover</span>
            </div>
            <nav className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link href="/support" className="text-gray-400 hover:text-white">Support</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
