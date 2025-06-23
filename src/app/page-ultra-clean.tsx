'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Phone } from 'lucide-react';
import { useTranslation } from '@/i18n/provider';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* SIMPLIFIED HEADER */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MatchedCover</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/auto-insurance" className="text-gray-600 hover:text-gray-900">Auto</Link>
              <Link href="/home-insurance" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/life-insurance" className="text-gray-600 hover:text-gray-900">Life</Link>
              <a href="tel:1-800-555-0123" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>

            {/* Mobile */}
            <div className="md:hidden">
              <a href="tel:1-800-555-0123" className="text-blue-600" aria-label="Call us">
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Debug marker */}
            <div className="sr-only">ULTRA_CLEAN_HOMEPAGE_JAN_2025</div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Smart Insurance, Powered by AI
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get personalized insurance quotes in seconds with our AI agents Maya, Alex, and Sam.
            </p>

            {/* Single CTA */}
            <div className="mb-12">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors space-x-2"
              >
                <span>Get Smart Quote</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>⭐ 4.9/5 Rating</span>
              <span>✅ Licensed in 50 States</span>
              <span>🔒 Secure & Protected</span>
            </div>
          </div>
        </section>

        {/* Simple Features */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose MatchedCover?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
                <p className="text-gray-600">Meet Maya, Alex, and Sam - your personal insurance assistants</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Quotes</h3>
                <p className="text-gray-600">Get accurate quotes in under 30 seconds</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
                <p className="text-gray-600">We compare rates from top carriers to save you money</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Get your personalized quote in under 2 minutes</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get Quote Now
              </Link>
              
              <a
                href="tel:1-800-555-0123"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-semibold">MatchedCover</span>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <span>© 2025 MatchedCover. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
