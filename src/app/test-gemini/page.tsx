/**
 * Gemini AI Test Page
 * Test the Gemini AI integration in a Next.js page
 */

'use client';

import React, { useState } from 'react';
import { geminiAIService } from '../../services/ai/GeminiAIService';

export default function GeminiTestPage() {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [chatResult, setChatResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      const isConnected = await geminiAIService.testConnection();
      setConnectionResult(isConnected ? '✅ Connected successfully!' : '❌ Connection failed');
    } catch (error) {
      setConnectionResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testChat = async () => {
    if (!chatInput.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await geminiAIService.simpleChat(chatInput, 'en');
      setChatResult(response);
    } catch (error) {
      setChatResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Gemini AI Test Dashboard
        </h1>

        {/* Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            1️⃣ Connection Test
          </h2>
          <button
            onClick={testConnection}
            disabled={isTestingConnection}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium"
          >
            {isTestingConnection ? 'Testing...' : 'Test Connection'}
          </button>
          {connectionResult && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">{connectionResult}</p>
            </div>
          )}
        </div>

        {/* Simple Chat Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            2️⃣ Simple Chat Test
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter a message:
              </label>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="e.g., I need help with car insurance"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && !isProcessing && testChat()}
              />
            </div>
            <button
              onClick={testChat}
              disabled={isProcessing || !chatInput.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg font-medium"
            >
              {isProcessing ? 'Processing...' : 'Send Message'}
            </button>
            {chatResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">AI Response:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{chatResult}</p>
              </div>
            )}
          </div>
        </div>

        {/* Agent Test Examples */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            3️⃣ Quick Test Examples
          </h2>
          <div className="grid gap-3">
            {[
              'I need a car insurance quote',
              'How do I file a claim?',
              'What is liability coverage?',
              'Necesito seguro de auto',
              'Comment puis-je déposer une réclamation?'
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setChatInput(example);
                  setChatResult('');
                }}
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="font-medium text-yellow-800 mb-2">Environment Check:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>API Key: {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? '✅ Set' : '❌ Missing'}</li>
            <li>Model: {process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-pro'}</li>
            <li>Temperature: {process.env.NEXT_PUBLIC_GEMINI_TEMPERATURE || '0.8'}</li>
            <li>Max Tokens: {process.env.NEXT_PUBLIC_GEMINI_MAX_TOKENS || '1000'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
