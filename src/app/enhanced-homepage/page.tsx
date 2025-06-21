'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  Sparkles,
  Brain,
  Zap,
  Users,
  Trophy,
  Gamepad2,
  Bot,
  TrendingUp,
  MessageSquare,
  Volume2,
  Phone,
  Globe
} from 'lucide-react';
import RealTimeRateComparison from '@/components/RealTimeRateComparison';
import SocialCommunityFeatures from '@/components/SocialCommunityFeatures';
import CompetitivePositioning from '@/components/CompetitivePositioning';
import { TrustElementsShowcase } from '@/components/TrustElementsShowcase';
import { AdvancedSmartQuoteWizard } from '@/components/AdvancedSmartQuoteWizard';

export default function EnhancedHomepage() {
  const [activeDemo, setActiveDemo] = React.useState<'ai' | 'rates' | 'community' | 'competitive' | 'quote' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MatchedCover
              </span>
            </div>

            {/* Strategic Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/strategic-showcase" className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center space-x-1">
                <Sparkles className="h-4 w-4" />
                <span>AI Experience</span>
              </Link>
              <Link href="/global-features" className="text-green-600 hover:text-green-700 font-medium transition-colors flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Global Features</span>
              </Link>
              <Link href="/competitive-advantage" className="text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>Competitive Edge</span>
              </Link>
              <button 
                onClick={() => setActiveDemo('rates')}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Live Rates</span>
              </button>
              <button 
                onClick={() => setActiveDemo('community')}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </button>
              <button 
                onClick={() => setActiveDemo('competitive')}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
              >
                <Trophy className="h-4 w-4" />
                <span>Why We Win</span>
              </button>
              <Link 
                href="/next-gen-features"
                className="text-purple-600 hover:text-purple-700 transition-colors flex items-center space-x-1 font-medium"
              >
                <Zap className="h-4 w-4" />
                <span>Next-Gen Features</span>
              </Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign In
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Open mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/strategic-showcase" className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Experience</span>
                </Link>
                <button 
                  onClick={() => setActiveDemo('ai')}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2 text-left"
                >
                  <Bot className="h-4 w-4" />
                  <span>AI Demo</span>
                </button>
                <button 
                  onClick={() => setActiveDemo('rates')}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2 text-left"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Live Rates</span>
                </button>
                <button 
                  onClick={() => setActiveDemo('community')}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2 text-left"
                >
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </button>
                <button 
                  onClick={() => setActiveDemo('competitive')}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2 text-left"
                >
                  <Trophy className="h-4 w-4" />
                  <span>Why We Win</span>
                </button>
                <Link 
                  href="/next-gen-features"
                  className="text-purple-600 hover:text-purple-700 transition-colors flex items-center space-x-2 font-medium"
                >
                  <Zap className="h-4 w-4" />
                  <span>Next-Gen Features</span>
                </Link>
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Sign In
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Revolutionary Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 text-6xl animate-bounce">🤖</div>
            <div className="absolute top-32 right-20 text-6xl animate-pulse">✨</div>
            <div className="absolute bottom-20 left-20 text-6xl animate-bounce">🎮</div>
            <div className="absolute bottom-32 right-10 text-6xl animate-pulse">🏆</div>
            <div className="absolute top-1/2 left-1/4 text-5xl animate-ping">💫</div>
            <div className="absolute top-1/3 right-1/3 text-5xl animate-pulse">🚀</div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {/* Revolutionary Badge */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-6 py-3 rounded-full mb-8 border border-white/30">
                <Brain className="w-5 h-5 mr-2" />
                <span>World&apos;s First AI-Powered Gamified Insurance Platform</span>
                <Sparkles className="w-5 h-5 ml-2" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Insurance
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Revolutionized
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                Meet Maya, Alex & Sam - your AI insurance team that makes coverage fun, 
                fast, and incredibly smart. Experience gamified insurance that actually rewards you.
              </p>

              {/* Revolutionary Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Bot className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">3 AI Specialists</h3>
                  <p className="text-sm text-white/80">Maya (Sales), Alex (Claims), Sam (Support)</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Gamepad2 className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Fully Gamified</h3>
                  <p className="text-sm text-white/80">Earn points, badges, and real rewards</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Volume2 className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Voice-First</h3>
                  <p className="text-sm text-white/80">Complete voice control experience</p>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/strategic-showcase"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-900 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg space-x-3"
                >
                  <Brain className="h-6 w-6" />
                  <span>Experience the Future</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
                
                <button
                  onClick={() => setActiveDemo('quote')}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl hover:bg-white/30 transform hover:scale-105 transition-all duration-200 shadow-lg space-x-3"
                >
                  <Zap className="h-6 w-6" />
                  <span>Get AI Quote</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>

              {/* Quick Demo Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActiveDemo('ai')}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm transition-colors border border-white/20"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Try AI Chat</span>
                </button>
                <button
                  onClick={() => setActiveDemo('rates')}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm transition-colors border border-white/20"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Live Rates</span>
                </button>
                <button
                  onClick={() => setActiveDemo('community')}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm transition-colors border border-white/20"
                >
                  <Users className="h-4 w-4" />
                  <span>Join Community</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Demo Section */}
        {activeDemo && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {activeDemo === 'ai' && 'AI Assistant Demo'}
                  {activeDemo === 'rates' && 'Real-Time Rate Comparison'}
                  {activeDemo === 'community' && 'Community Features'}
                  {activeDemo === 'competitive' && 'Competitive Analysis'}
                  {activeDemo === 'quote' && 'Smart Quote Wizard'}
                </h2>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ✕ Close
                </button>
              </div>
              
              {activeDemo === 'ai' && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <p className="text-center text-gray-600 mb-4">
                    AI Assistant demo would be embedded here. 
                    <Link href="/strategic-showcase" className="text-purple-600 hover:underline ml-1">
                      Visit full demo →
                    </Link>
                  </p>
                </div>
              )}
              
              {activeDemo === 'rates' && <RealTimeRateComparison insuranceType="auto" />}
              {activeDemo === 'community' && <SocialCommunityFeatures />}
              {activeDemo === 'competitive' && <CompetitivePositioning />}
              {activeDemo === 'quote' && <AdvancedSmartQuoteWizard />}
            </div>
          </section>
        )}

        {/* Revolutionary Advantages Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why MatchedCover is Revolutionary
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We&apos;re not just improving insurance - we&apos;re completely reimagining it
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: '3 AI Specialists',
                  description: 'Maya handles sales, Alex manages claims, Sam provides support. Each with unique personalities.',
                  benefit: 'vs. Generic chatbots',
                  color: 'purple'
                },
                {
                  icon: Gamepad2,
                  title: 'Gaming Psychology',
                  description: 'Earn XP, unlock achievements, join challenges. Insurance that\'s actually fun.',
                  benefit: 'vs. Boring interfaces',
                  color: 'pink'
                },
                {
                  icon: Volume2,
                  title: 'Voice-First Platform',
                  description: 'Complete voice control from quotes to claims. The first hands-free insurance.',
                  benefit: 'vs. Text-only systems',
                  color: 'blue'
                },
                {
                  icon: TrendingUp,
                  title: 'Real-Time Optimization',
                  description: 'AI continuously monitors rates and optimizes your policy automatically.',
                  benefit: 'vs. Static pricing',
                  color: 'green'
                },
                {
                  icon: Users,
                  title: 'Community Learning',
                  description: 'Learn from thousands of users in our social insurance community.',
                  benefit: 'vs. Isolated experience',
                  color: 'yellow'
                },
                {
                  icon: Shield,
                  title: 'MGA Model',
                  description: 'Direct carrier relationships mean better rates and faster processing.',
                  benefit: 'vs. Middleman markups',
                  color: 'indigo'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className={`text-sm text-${feature.color}-600 bg-${feature.color}-50 px-3 py-1 rounded-full inline-block`}>
                    ✨ {feature.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Elements */}
        <section className="py-16 bg-gray-50">
          <TrustElementsShowcase />
        </section>

        {/* Market Leadership Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Leading the Insurance Revolution</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-white/80">User Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$547</div>
                <div className="text-white/80">Average Savings</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">30s</div>
                <div className="text-white/80">Quote Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">AI Support</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/strategic-showcase"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-xl hover:bg-gray-100 transition-colors space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Experience the Platform</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setActiveDemo('competitive')}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-colors space-x-2"
              >
                <Trophy className="h-5 w-5" />
                <span>See How We Compare</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands who&apos;ve already discovered what insurance can be when it&apos;s built for the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/strategic-showcase"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 space-x-3"
              >
                <Brain className="h-6 w-6" />
                <span>Try the Full Experience</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
              
              <button
                onClick={() => setActiveDemo('quote')}
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-purple-600 bg-purple-50 border-2 border-purple-200 rounded-xl hover:bg-purple-100 transform hover:scale-105 transition-all duration-200 space-x-3"
              >
                <Zap className="h-6 w-6" />
                <span>Get Smart Quote</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>

            {/* Contact Options */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Have questions? Our team is here to help.</p>
              <div className="flex items-center justify-center space-x-8">
                <a href="tel:1-800-555-0123" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                  <Phone className="h-5 w-5" />
                  <span>1-800-555-0123</span>
                </a>
                <Link href="/contact" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>Live Chat</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MatchedCover</span>
              </div>
              <p className="text-gray-400">
                The world&apos;s first AI-powered, gamified insurance platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/strategic-showcase" className="hover:text-white transition-colors">AI Experience</Link></li>
                <li><button onClick={() => setActiveDemo('rates')} className="hover:text-white transition-colors">Live Rates</button></li>
                <li><button onClick={() => setActiveDemo('community')} className="hover:text-white transition-colors">Community</button></li>
                <li><button onClick={() => setActiveDemo('competitive')} className="hover:text-white transition-colors">Why We Win</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Insurance</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auto" className="hover:text-white transition-colors">Auto Insurance</Link></li>
                <li><Link href="/home" className="hover:text-white transition-colors">Home Insurance</Link></li>
                <li><Link href="/life" className="hover:text-white transition-colors">Life Insurance</Link></li>
                <li><Link href="/business" className="hover:text-white transition-colors">Business Insurance</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/claims" className="hover:text-white transition-colors">File a Claim</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MatchedCover. All rights reserved. | Revolutionizing Insurance with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
