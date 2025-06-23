import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Server-side environment variables (secure)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, locale = 'en' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response when API key is not available
      return NextResponse.json({
        response: "Hi! I'm Maya, your AI insurance assistant! 🌟 I'd love to help you with your insurance needs. What would you like to know about home, auto, or life insurance?",
        agent: 'Maya'
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || 'gemini-pro' 
    });

    // Enhanced prompt for insurance-specific responses
    const prompt = `You are Maya, a friendly and knowledgeable AI insurance assistant for MatchedCover. 
    
    Guidelines:
    - Be helpful, warm, and professional
    - Focus on insurance topics (home, auto, life, business)
    - Provide actionable advice and insights
    - Use emojis sparingly but appropriately
    - Keep responses concise but informative
    - If asked about quotes, mention that you can help connect them with licensed agents
    
    User message: "${message}"
    
    Respond in ${locale === 'en' ? 'English' : locale === 'es' ? 'Spanish' : locale === 'fr' ? 'French' : 'English'}.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.8'),
        maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '1000'),
      }
    });

    const response = result.response.text();

    return NextResponse.json({
      response: response || "I'm here to help with your insurance questions! What would you like to know?",
      agent: 'Maya'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response on error
    return NextResponse.json({
      response: "I'm experiencing some technical difficulties right now, but I'm still here to help! What insurance questions do you have?",
      agent: 'Maya'
    });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
