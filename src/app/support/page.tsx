'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search, 
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does AI quote generation work?",
      answer: "Our AI agents analyze your profile across 50+ insurance carriers using machine learning algorithms to find personalized quotes that match your specific needs and risk profile. The process takes under 2 minutes and provides real-time pricing."
    },
    {
      question: "What is the gamification system?",
      answer: "Our gamification system rewards you for smart insurance decisions. You earn points for completing your profile, comparing quotes, maintaining good coverage, and referring friends. Points unlock badges, rewards, and exclusive discounts."
    },
    {
      question: "How do I earn points and badges?",
      answer: "You can earn points by: completing your profile (+100 points), getting your first quote (+200 points), purchasing coverage (+500 points), maintaining coverage (+50 points/month), and referring friends (+300 points). Badges are awarded for milestones and achievements."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use bank-level encryption and security measures to protect your data. We're SOC 2 certified and comply with all insurance industry security standards. Your information is never sold to third parties."
    },
    {
      question: "How quickly can I get a quote?",
      answer: "Most customers receive personalized quotes in under 2 minutes. Our AI agents work instantly to compare rates across multiple carriers and present you with the best options for your specific needs."
    },
    {
      question: "What types of insurance do you offer?",
      answer: "We currently offer homeowners, renters, auto, and life insurance. We're continuously expanding our coverage options and carrier partnerships to provide comprehensive protection for all your needs."
    },
    {
      question: "Can I speak with a human agent?",
      answer: "Absolutely! While our AI handles most tasks efficiently, human agents are available 24/7 via chat, phone, or email. You can also request a callback at any time during the quote process."
    },
    {
      question: "How do claims work with MatchedCover?",
      answer: "Our AI Claims Agent helps you file and track claims 24/7. Simply report your claim through our app or website, and our AI will guide you through the process, connecting you with your carrier and providing real-time updates."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Help You?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant support from our AI assistants or connect with human experts. 
            We&apos;re here 24/7 to help with all your insurance needs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Support Your Way
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose how you&apos;d like to get help - our AI and human agents are ready to assist
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Chat */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Chat Support</h3>
              <p className="text-gray-600 mb-6">
                Get instant answers from Maya, our AI assistant. Available 24/7 for quotes, 
                policy questions, and general support.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Response time: Instant</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Available 24/7</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors">
                Start AI Chat
              </button>
            </div>

            {/* Phone Support */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phone Support</h3>
              <p className="text-gray-600 mb-6">
                Speak directly with our insurance experts for complex questions, 
                claims assistance, or personalized guidance.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Response time: &lt; 30 seconds</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Mon-Fri 7AM-10PM, Weekends 9AM-6PM</span>
                </div>
              </div>
              <a 
                href="tel:1-800-MATCHED"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors inline-block"
              >
                Call (800) MATCHED
              </a>
            </div>

            {/* Email Support */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Support</h3>
              <p className="text-gray-600 mb-6">
                Send us detailed questions or documentation. Perfect for complex 
                issues that need thorough explanation.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Response time: &lt; 2 hours</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Available 24/7</span>
                </div>
              </div>
              <a 
                href="mailto:support@matchedcover.com"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors inline-block"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our AI-powered insurance platform
            </p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any FAQs matching &quot;{searchTerm}&quot;
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Status Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              System Status
            </h2>
            <p className="text-lg text-gray-600">
              All systems operational and ready to serve you
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">AI Agents</span>
                </div>
                <p className="text-green-600 text-sm">Operational</p>
                <p className="text-gray-500 text-xs mt-1">99.9% uptime</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Quote Engine</span>
                </div>
                <p className="text-green-600 text-sm">Operational</p>
                <p className="text-gray-500 text-xs mt-1">Average 1.2s response</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Customer Portal</span>
                </div>
                <p className="text-green-600 text-sm">Operational</p>
                <p className="text-gray-500 text-xs mt-1">No known issues</p>
              </div>
            </div>
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
              <Link href="/how-it-works" className="text-gray-400 hover:text-white">How it Works</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
