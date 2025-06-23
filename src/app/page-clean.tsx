'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Star, CheckCircle, Phone } from 'lucide-react';
import { useTranslation } from '@/i18n/provider';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MatchedCover</span>
            </div>

            {/* Simple Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/auto-insurance" className="text-gray-600 hover:text-gray-900">Auto</Link>
              <Link href="/home-insurance" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/life-insurance" className="text-gray-600 hover:text-gray-900">Life</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <a href="tel:1-800-555-0123" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>

            {/* Mobile Phone */}
            <div className="md:hidden">
              <a href="tel:1-800-555-0123" className="text-blue-600">
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Clean & Focused */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('homepage.hero.title')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('homepage.hero.subtitle')}
            </p>

            {/* Single Primary CTA */}
            <div className="mb-12">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-12 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 space-x-3"
              >
                <span>{t('homepage.hero.getSmartQuote')}</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Licensed in 50 States</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Secure & Protected</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Simplified */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('homepage.features.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('homepage.features.aiPowered.title')}
                </h3>
                <p className="text-gray-600">
                  {t('homepage.features.aiPowered.description')}
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('homepage.features.instantQuotes.title')}
                </h3>
                <p className="text-gray-600">
                  {t('homepage.features.instantQuotes.description')}
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('homepage.features.bestPrices.title')}
                </h3>
                <p className="text-gray-600">
                  {t('homepage.features.bestPrices.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section - Clean Grid */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Insurance Products</h2>
              <p className="text-xl text-gray-600">Comprehensive coverage for all your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/auto-insurance" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('products.auto.name')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('products.auto.description')}</p>
                <div className="text-blue-600 font-medium text-sm">Learn More →</div>
              </Link>

              <Link href="/home-insurance" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('products.home.name')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('products.home.description')}</p>
                <div className="text-blue-600 font-medium text-sm">Learn More →</div>
              </Link>

              <Link href="/life-insurance" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('products.life.name')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('products.life.description')}</p>
                <div className="text-blue-600 font-medium text-sm">Learn More →</div>
              </Link>

              <Link href="/renters-insurance" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('products.renters.name')}</h3>
                <p className="text-gray-600 text-sm mb-4">{t('products.renters.description')}</p>
                <div className="text-blue-600 font-medium text-sm">Learn More →</div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Get your personalized insurance quote in under 2 minutes</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-colors space-x-2"
              >
                <span>Get Quote Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <a
                href="tel:1-800-555-0123"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">MatchedCover</span>
              </div>
              <p className="text-gray-400">Smart insurance, powered by AI</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auto-insurance" className="hover:text-white">Auto Insurance</Link></li>
                <li><Link href="/home-insurance" className="hover:text-white">Home Insurance</Link></li>
                <li><Link href="/life-insurance" className="hover:text-white">Life Insurance</Link></li>
                <li><Link href="/renters-insurance" className="hover:text-white">Renters Insurance</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/licenses" className="hover:text-white">Licenses</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('legal.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
