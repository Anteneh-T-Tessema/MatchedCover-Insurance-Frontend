'use client';

import React, { useState } from 'react';

export default function DebugGemini() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiDirectly = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      console.log('API Key available:', !!apiKey);
      console.log('API Key length:', apiKey?.length);
      
      if (!apiKey) {
        setResult('❌ No API key found in environment');
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = "Say hello in a friendly way";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult(✅ Success: ${text}`);
    } catch (error) {
      console.error('Gemini test error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(❌ Error: ${errorMessage}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔧 Gemini API Debug</h1>
      
      <div className="mb-4">
        <p><strong>API Key Status:</strong> {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? '✅ Present' : '❌ Missing'}</p>
        <p><strong>API Key Length:</strong> {process.env.NEXT_PUBLIC_GEMINI_API_KEY?.length || 0}</p>
        <p><strong>Model:</strong> {process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-pro'}</p>
      </div>

      <button
        onClick={testApiDirectly}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test API Directly'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
