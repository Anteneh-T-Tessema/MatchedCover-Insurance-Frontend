/**
 * Gemini API Key Test Script
 * Run this to verify your Gemini API key is working
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGeminiAPIKey() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ No API key found in environment variables');
    console.log('Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file');
    return;
  }

  if (apiKey === 'YOUR_NEW_API_KEY_HERE') {
    console.error('❌ Please replace YOUR_NEW_API_KEY_HERE with your actual Gemini API key');
    return;
  }

  try {
    console.log('🔑 Testing Gemini API key...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = 'Hello! This is a test to verify the API key works. Please respond with "API key is working!"';
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ API Key Test Successful!');
    console.log('🤖 Gemini Response:', text);
    console.log('📊 API Key Status: Active and Working');
    
  } catch (error) {
    console.error('❌ API Key Test Failed:');
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      if (error.message.includes('API_KEY_INVALID')) {
        console.log('💡 Solution: Your API key is invalid. Please generate a new one from Google AI Studio.');
      } else if (error.message.includes('PERMISSION_DENIED')) {
        console.log('💡 Solution: Your API key lacks permissions. Ensure the Gemini API is enabled.');
      } else if (error.message.includes('QUOTA_EXCEEDED')) {
        console.log('💡 Solution: You have exceeded your API quota. Check your usage limits.');
      }
    }
  }
}

// Export for use in other files
export { testGeminiAPIKey };

// Run test if this file is executed directly
if (require.main === module) {
  testGeminiAPIKey();
}
