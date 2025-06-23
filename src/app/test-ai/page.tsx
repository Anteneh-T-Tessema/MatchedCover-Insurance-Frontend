import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Brain } from 'lucide-react';

export default function TestAIPage() {
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
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/ai-demo" className="text-gray-600 hover:text-gray-900">AI Demo</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            AI Testing Environment
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test and validate AI-powered insurance features.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Development Mode
            </h2>
            <p className="text-gray-600 mb-6">
              This page is used for internal testing of AI features.
            </p>
            <div className="space-y-4">
              <Link
                href="/ai-demo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 w-full justify-center"
              >
                Try AI Demo
                <Brain className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
              >
                Return Home
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
