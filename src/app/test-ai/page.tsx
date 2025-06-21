/**
 * Simple Gemini AI Test - Test real AI responses
 */

'use client';

import { useState } from 'react';
import { geminiAIService } from '@/services/ai/GeminiAIService';

export default function TestGeminiPage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState<'maya' | 'alex' | 'sam'>('maya');

  const testAI = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      let prompt = '';
      if (agent === 'maya') {
        prompt = `You are Maya, an enthusiastic insurance sales expert. Answer this question with excitement and focus on savings and deals: "${question}"`;
      } else if (agent === 'alex') {
        prompt = `You are Alex, a detail-oriented risk analyst. Provide a technical, analytical response to: "${question}"`;
      } else {
        prompt = `You are Sam, an empathetic support advocate. Respond with care and understanding to: "${question}"`;
      }
      
      const aiResponse = await geminiAIService.simpleChat(prompt, 'en');
      setResponse(aiResponse);
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Gemini AI Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Agent:</label>
            <div className="flex gap-4">
              {(['maya', 'alex', 'sam'] as const).map((agentOption) => (
                <button
                  key={agentOption}
                  onClick={() => setAgent(agentOption)}
                  className={`px-4 py-2 rounded ${
                    agent === agentOption
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {agentOption === 'maya' ? '👩‍💼 Maya' : agentOption === 'alex' ? '👨‍💻 Alex' : '👩‍🔧 Sam'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Ask a question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="e.g., What is car insurance?"
              onKeyPress={(e) => e.key === 'Enter' && testAI()}
            />
          </div>
          
          <button
            onClick={testAI}
            disabled={loading || !question.trim()}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            {loading ? 'Testing AI...' : 'Test AI Response'}
          </button>
        </div>
        
        {response && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-3">AI Response:</h3>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
