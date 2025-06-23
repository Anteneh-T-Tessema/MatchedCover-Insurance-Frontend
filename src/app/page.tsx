'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  X,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import QuickQuoteForm from '@/components/QuickQuoteForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ChatWrapper from '@/components/ChatWrapper';
import { useTranslation } from '@/i18n/provider';

// Modal Components
function AccountCheckModal({ isOpen, onCloseAction, onHaveAccount, onNoAccount }: {
  isOpen: boolean;
  onCloseAction: () => void;
  onHaveAccount: () => void;
  onNoAccount: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCloseAction}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                    Let&apos;s Get Started!
                  </Dialog.Title>
                  <button
                    onClick={onCloseAction}
                    className="rounded-md p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  To provide you with the most accurate quotes, do you already have an account with us?
                </p>

                <div className="space-y-3">
                  <button
                    onClick={onHaveAccount}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Yes, I have an account
                  </button>
                  <button
                    onClick={onNoAccount}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    No, I&apos;m new here
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function LoginModal({ isOpen, onCloseAction, onLoginSuccess, onNeedAccount }: {
  isOpen: boolean;
  onCloseAction: () => void;
  onLoginSuccess: () => void;
  onNeedAccount: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCloseAction}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                    Welcome Back!
                  </Dialog.Title>
                  <button
                    onClick={onCloseAction}
                    className="rounded-md p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Close login form"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="loginEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="loginPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={onNeedAccount}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create one
                    </button>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function SignupModal({ isOpen, onCloseAction, onSignupSuccess, onHaveAccount }: {
  isOpen: boolean;
  onCloseAction: () => void;
  onSignupSuccess: () => void;
  onHaveAccount: () => void;
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onSignupSuccess();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCloseAction}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                    Create Your Account
                  </Dialog.Title>
                  <button
                    onClick={onCloseAction}
                    className="rounded-md p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Close signup form"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="signupEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="signupPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="flex items-start space-x-2">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5" 
                        required 
                      />
                      <span className="text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={onHaveAccount}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const [showAccountCheck, setShowAccountCheck] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // PWA Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  const handleGetQuoteClick = () => {
    setShowAccountCheck(true);
  };

  const handleHaveAccount = () => {
    setShowAccountCheck(false);
    setShowLogin(true);
  };

  const handleNoAccount = () => {
    setShowAccountCheck(false);
    setShowSignup(true);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowQuoteForm(true);
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
    setShowQuoteForm(true);
  };

  const handleNeedAccount = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Simplified Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                MatchedCover
              </span>
            </div>

            {/* Enhanced Strategic Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm">
              <Link href="/enhanced-homepage" className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center space-x-1">
                <Sparkles className="h-4 w-4" />
                <span>{t('navigation.enhancedPlatform')}</span>
              </Link>
              <Link href="/strategic-showcase" className="text-purple-600 hover:text-purple-700 font-medium transition-colors flex items-center space-x-1">
                <Brain className="h-4 w-4" />
                <span>{t('navigation.aiExperience')}</span>
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                {t('navigation.howItWorks')}
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                {t('navigation.aboutUs')}
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
                {t('navigation.support')}
              </Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                {t('navigation.signIn')}
              </Link>
              <LanguageSwitcher compact className="ml-2" />
            </nav>

            {/* Mobile Contact */}
            <div className="flex lg:hidden items-center space-x-3">
              <LanguageSwitcher compact />
              <a href="tel:1-800-555-0123" className="text-blue-600" aria-label="Call us">
                <Phone className="h-5 w-5" />
              </a>
              <Link href="/login" className="text-blue-600" aria-label="Sign in">
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Focused on AI & Gamification */}
        <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 sm:py-20 relative overflow-hidden">
          {/* Floating AI Elements */}
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce">🤖</div>
          <div className="absolute top-32 right-20 text-4xl opacity-20 animate-pulse">✨</div>
          <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce">🎮</div>
          <div className="absolute bottom-32 right-10 text-4xl opacity-20 animate-pulse">🏆</div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                {t('homepage.hero.aiPoweredBadge')}
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('homepage.hero.mainTitle')}
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {t('homepage.hero.agentNames')}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('homepage.hero.description')}
            </p>

            {/* Strategic CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/strategic-showcase"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg space-x-3"
              >
                <Brain className="h-5 w-5" />
                <span>{t('homepage.hero.experienceAIPlatform')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button
                onClick={handleGetQuoteClick}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white border-2 border-purple-600 rounded-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg space-x-3"
              >
                <Zap className="h-5 w-5" />
                <span>{t('homepage.hero.getSmartQuote')}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mt-8">
              <span className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI-powered matching</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Gamified experience</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Instant rewards</span>
              </span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">User Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">$500+</div>
                <div className="text-sm text-gray-600">Average Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">3 Min</div>
                <div className="text-sm text-gray-600">Quote Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
                <span className="ml-3 text-lg text-gray-600 font-medium">4.9/5 from 12,000+ reviews</span>
              </div>
            </div>

            {/* Customer Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Saved $800 on my home insurance in just 5 minutes. The process was so simple!&rdquo;
                </p>
                <div className="font-medium text-gray-900">Sarah M.</div>
                <div className="text-sm text-gray-600">Homeowner, Austin TX</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Best car insurance rates I found anywhere. Customer service is excellent!&rdquo;
                </p>
                <div className="font-medium text-gray-900">Mike R.</div>
                <div className="text-sm text-gray-600">Driver, Miami FL</div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Finally found affordable life insurance. The whole family is now covered!&rdquo;
                </p>
                <div className="font-medium text-gray-900">Jennifer L.</div>
                <div className="text-sm text-gray-600">Mother, Denver CO</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Get Covered in 3 Simple Steps
              </h2>
              <p className="text-lg text-gray-600">
                Our streamlined process makes getting insurance fast and easy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tell Us About You</h3>
                <p className="text-gray-600">
                  Answer a few quick questions about what you need to insure
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compare Quotes</h3>
                <p className="text-gray-600">
                  See personalized quotes from top-rated insurance providers
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Covered</h3>
                <p className="text-gray-600">
                  Choose your plan and get instant coverage with just a few clicks
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Save on Insurance?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of smart shoppers who found better coverage at better prices
            </p>
            <button
              onClick={handleGetQuoteClick}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl space-x-3"
            >
              <span>Start Saving Today</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </main>

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
              <Link href="/licenses" className="text-gray-400 hover:text-white text-sm transition-colors">
                Licenses
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Components */}
      <AccountCheckModal
        isOpen={showAccountCheck}
        onCloseAction={() => setShowAccountCheck(false)}
        onHaveAccount={handleHaveAccount}
        onNoAccount={handleNoAccount}
      />

      <LoginModal
        isOpen={showLogin}
        onCloseAction={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
        onNeedAccount={handleNeedAccount}
      />

      <SignupModal
        isOpen={showSignup}
        onCloseAction={() => setShowSignup(false)}
        onSignupSuccess={handleSignupSuccess}
        onHaveAccount={handleBackToLogin}
      />

      {/* Quote Form Modal */}
      <QuickQuoteForm
        isOpen={showQuoteForm}
        onCloseAction={() => setShowQuoteForm(false)}
      />

      {/* Floating Chat */}
      <ChatWrapper />
    </div>
  );
}
