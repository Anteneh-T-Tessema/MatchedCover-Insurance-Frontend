'use client';

import React, { useState } from 'react';

export default function DiagnosticPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const runDiagnostic = async () => {
    setLoading(true);
    setResult('Running diagnostics...\n');
    
    try {
      // Test 1: Check environment variables
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      setResult(prev => prev + `✅ API Key: ${apiKey ? 'Present' : 'Missing'}\n`);
      setResult(prev => prev + `   Length: ${apiKey?.length || 0} characters\n`);
      setResult(prev => prev + `   Format: ${apiKey?.startsWith('AIzaSy') ? 'Valid Google API format' : 'Invalid format'}\n\n`);

      if (!apiKey) {
        setResult(prev => prev + '❌ No API key found!\n');
        setLoading(false);
        return;
      }

      // Test 2: Import the library
      setResult(prev => prev + '📦 Importing Google Generative AI...\n');
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      setResult(prev => prev + '✅ Library imported successfully\n\n');

      // Test 3: Initialize the client
      setResult(prev => prev + '🔧 Initializing Gemini client...\n');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      setResult(prev => prev + '✅ Client initialized\n\n');

      // Test 4: Make a simple API call
      setResult(prev => prev + '🚀 Testing API call...\n');
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: 'Say hello and confirm you are working' }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        }
      });

      const response = result.response;
      const text = response.text();
      
      setResult(prev => prev + '✅ API call successful!\n');
      setResult(prev => prev + `📝 Response: "${text}"\n\n`);
      setResult(prev => prev + '🎉 All tests passed! Gemini AI is working correctly.\n');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setResult(prev => prev + `❌ Error: ${errorMessage}\n\n`);
      
      // Common error diagnoses
      if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('invalid')) {
        setResult(prev => prev + '💡 Diagnosis: API key is invalid or expired\n');
        setResult(prev => prev + '🔧 Solution: Get a new API key from https://aistudio.google.com/app/apikey\n');
      } else if (errorMessage.includes('models/gemini-pro') || errorMessage.includes('not found')) {
        setResult(prev => prev + '💡 Diagnosis: Model not found - using correct model now\n');
        setResult(prev => prev + '🔧 Solution: Updated to use gemini-2.0-flash-exp model\n');
      } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
        setResult(prev => prev + '💡 Diagnosis: API quota exceeded\n');
        setResult(prev => prev + '🔧 Solution: Check your Google Cloud billing or wait for quota reset\n');
      } else {
        setResult(prev => prev + '💡 Check the error message above for more details\n');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔧 Gemini AI Diagnostic Tool</h1>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-green-800 mb-2">✅ Ready to Test:</h2>
        <ul className="text-green-700 space-y-1">
          <li>🚀 Using model: gemini-2.0-flash-exp</li>
          <li>🔑 API key configured</li>
          <li>📦 Testing library and connectivity</li>
          <li>🌐 Making real API call</li>
        </ul>
      </div>

      <button
        onClick={runDiagnostic}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium text-lg mb-6"
      >
        {loading ? '🔄 Running Diagnostics...' : '🚀 Run Full Diagnostic'}
      </button>

      {result && (
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto">
          <h3 className="text-white font-semibold mb-3">Diagnostic Results:</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
}
