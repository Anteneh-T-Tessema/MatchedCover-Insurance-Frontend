/**
 * Gemini AI Test Script
 * Quick test to verify Gemini AI integration is working
 */

import { geminiAIService } from '../src/services/ai/GeminiAIService';

async function testGeminiAI() {
  console.log('🧪 Testing Gemini AI Integration...\n');

  try {
    // Test 1: Connection Test
    console.log('1️⃣ Testing connection...');
    const isConnected = await geminiAIService.testConnection();
    console.log(`   Connection: ${isConnected ? '✅ Success' : '❌ Failed'}\n`);

    if (!isConnected) {
      console.error('❌ Cannot connect to Gemini AI. Check your API key in .env.local');
      return;
    }

    // Test 2: Simple Chat
    console.log('2️⃣ Testing simple chat...');
    const simpleResponse = await geminiAIService.simpleChat('Hello, I need help with car insurance', 'en');
    console.log(`   Simple Response: ${simpleResponse}\n`);

    // Test 3: Agent Selection
    console.log('3️⃣ Testing agent selection...');
    
    // Mock conversation context
    const mockContext = {
      agentId: 'maya-quote',
      userProfile: {
        id: 'test-user',
        name: 'John Doe',
        insuranceExperience: 'beginner',
        communicationStyle: 'casual',
        currentNeeds: ['auto insurance'],
        riskProfile: {
          drivingRecord: 'clean',
          claims_history: 0,
          location: 'New York',
          age: 30,
          occupation: 'Software Engineer'
        }
      },
      gameState: {
        level: 1,
        points: 0,
        badges: [],
        achievements: [],
        currentStreak: 0,
        lastActivity: new Date(),
        unlockedFeatures: []
      },
      conversationHistory: [],
      currentGoal: 'get auto insurance quote',
      insuranceContext: {
        activeQuotes: [],
        currentPolicies: [],
        recentClaims: [],
        riskFactors: {
          drivingRecord: 'clean',
          claims_history: 0,
          location: 'New York',
          age: 30,
          occupation: 'Software Engineer'
        },
        preferredCoverage: {
          liability: 100000,
          collision: true,
          comprehensive: true,
          deductible: 500
        }
      }
    };

    const fullResponse = await geminiAIService.generateResponse(
      'I need a car insurance quote for my 2020 Honda Civic',
      mockContext,
      'en'
    );

    console.log(`   Selected Agent: ${fullResponse.selectedAgent.name}`);
    console.log(`   Agent Response: ${fullResponse.agentResponse}`);
    console.log(`   AI Response: ${fullResponse.text}`);
    console.log(`   Confidence: ${fullResponse.confidence}`);
    console.log(`   Suggestions: ${fullResponse.suggestions.join(', ')}`);
    console.log(`   Actions: ${fullResponse.actions.map(a => a.type).join(', ')}`);
    if (fullResponse.gameReward) {
      console.log(`   Game Reward: +${fullResponse.gameReward.value} ${fullResponse.gameReward.type}`);
    }
    console.log(`   Emotional Tone: ${fullResponse.emotionalTone}\n`);

    // Test 4: Multi-language Support
    console.log('4️⃣ Testing multi-language support...');
    const spanishResponse = await geminiAIService.simpleChat('Necesito seguro de auto', 'es');
    console.log(`   Spanish Response: ${spanishResponse}\n`);

    console.log('🎉 All tests completed successfully!');
    console.log('✅ Gemini AI integration is working properly.');

  } catch (error) {
    console.error('❌ Test failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        console.error('💡 Tip: Check your NEXT_PUBLIC_GEMINI_API_KEY in .env.local');
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        console.error('💡 Tip: Your Gemini API quota may be exceeded');
      } else if (error.message.includes('SAFETY')) {
        console.error('💡 Tip: Content may have triggered safety filters');
      }
    }
  }
}

// Run the test
testGeminiAI();
