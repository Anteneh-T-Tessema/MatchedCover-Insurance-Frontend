'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Users, Target, Award, Brain, Zap, Heart, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MatchedCover</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re revolutionizing insurance with AI-powered agents, gamification, 
            and a customer-first approach that makes protecting what matters most both simple and rewarding.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At MatchedCover, we believe insurance should be transparent, accessible, and rewarding. 
                We&apos;re transforming a traditionally complex industry with cutting-edge AI technology 
                and innovative gamification that puts customers first.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our platform combines the expertise of insurance professionals with the power of 
                artificial intelligence to deliver personalized coverage options, competitive pricing, 
                and an engaging experience that actually rewards you for making smart choices.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customer-Centric Innovation</h3>
                  <p className="text-gray-600">Every feature we build puts your needs first</p>
                </div>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why We&apos;re Different</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">AI-Powered Intelligence</h4>
                      <p className="text-gray-600">Smart agents that learn and adapt to your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Gamified Experience</h4>
                      <p className="text-gray-600">Earn rewards for smart insurance decisions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-pink-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Human Touch</h4>
                      <p className="text-gray-600">Real people when you need them most</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust</h3>
              <p className="text-gray-600">
                We build trust through transparency, reliability, and always putting your interests first.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries with AI and technology to make insurance better.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building a community where everyone wins through shared success.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every interaction and continuously improve our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Impact by Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we&apos;re making a difference in the insurance industry
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">$2.5M</div>
              <p className="text-gray-600">Money Saved</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">24/7</div>
              <p className="text-gray-600">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals from insurance, technology, and customer experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">JS</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Jane Smith</h3>
              <p className="text-blue-600 mb-3">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Former VP at Allstate with 15+ years in insurance innovation and customer experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">MJ</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Michael Johnson</h3>
              <p className="text-green-600 mb-3">CTO</p>
              <p className="text-gray-600 text-sm">
                AI expert and former Google engineer specializing in machine learning and automation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">SL</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Lee</h3>
              <p className="text-purple-600 mb-3">Head of Customer Success</p>
              <p className="text-gray-600 text-sm">
                Customer experience leader with a passion for making insurance accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MGA Business Model Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MGA Model</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MatchedCover operates as a Managing General Agent (MGA), combining the agility of technology 
              with the authority to underwrite, price, and issue policies on behalf of our carrier partners.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What is an MGA?</h3>
              <p className="text-gray-600 mb-6">
                A Managing General Agent (MGA) is a specialized insurance intermediary with delegated authority 
                from insurance carriers to perform functions typically handled by the insurer directly. This includes 
                underwriting policies, setting rates, issuing coverage, and managing claims.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Underwriting Authority</h4>
                    <p className="text-gray-600">We can approve or deny policies using our AI-powered risk assessment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dynamic Pricing</h4>
                    <p className="text-gray-600">Real-time rate setting based on AI analysis and market conditions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Policy Issuance</h4>
                    <p className="text-gray-600">Bind coverage immediately upon approval without carrier delays</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">MGA Advantages</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Faster Processing</span>
                  </div>
                  <p className="text-sm text-gray-600">No waiting for carrier approval - decisions in minutes, not days</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">AI-Driven Decisions</span>
                  </div>
                  <p className="text-sm text-gray-600">Advanced algorithms optimize pricing and risk assessment</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Specialized Focus</span>
                  </div>
                  <p className="text-sm text-gray-600">Deep expertise in tech-forward insurance solutions</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="h-5 w-5 text-pink-600" />
                    <span className="font-semibold text-gray-900">Customer-Centric</span>
                  </div>
                  <p className="text-sm text-gray-600">Optimized user experience without carrier constraints</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Carrier Partnerships</h3>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              We work with A-rated insurance carriers to provide comprehensive coverage while maintaining 
              our ability to innovate and deliver exceptional customer experiences.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Financial Strength</h4>
                <p className="text-sm text-gray-600">All partners maintain A.M. Best ratings of A- or higher</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Regulatory Compliance</h4>
                <p className="text-sm text-gray-600">Full compliance with state insurance regulations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation Support</h4>
                <p className="text-sm text-gray-600">Partners who embrace technology and AI advancement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join the Insurance Revolution
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the future of insurance with AI-powered quotes, gamified rewards, and unmatched customer service.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            <span>Get Started Today</span>
            <TrendingUp className="h-5 w-5" />
          </Link>
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
