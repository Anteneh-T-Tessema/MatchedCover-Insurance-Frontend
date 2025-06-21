/**
 * Quote Management API
 * Handles quote requests, comparisons, and policy binding for MatchedCover
 */

import { NextRequest, NextResponse } from 'next/server';
import { carrierIntegrationService, QuoteRequest, QuoteResponse } from '@/services/carriers/CarrierIntegrationService';

export async function POST(request: NextRequest) {
  try {
    const quoteRequest: QuoteRequest = await request.json();

    // Validate required fields
    if (!quoteRequest.customerId || !quoteRequest.productType || !quoteRequest.applicant) {
      return NextResponse.json(
        { error: 'Missing required fields: customerId, productType, applicant' },
        { status: 400 }
      );
    }

    // Get quotes from multiple carriers
    const quotes = await carrierIntegrationService.getMultiCarrierQuotes(quoteRequest);

    // Calculate savings and best options
    const analysis = analyzeQuotes(quotes);

    return NextResponse.json({
      success: true,
      requestId: quoteRequest.customerId,
      quotes,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get quotes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quoteId = searchParams.get('quoteId');
  const carrierId = searchParams.get('carrierId');

  if (!quoteId || !carrierId) {
    return NextResponse.json(
      { error: 'Missing required parameters: quoteId, carrierId' },
      { status: 400 }
    );
  }

  try {
    // In a real implementation, this would fetch from database
    return NextResponse.json({
      success: true,
      quote: {
        quoteId,
        carrierId,
        status: 'active',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    });

  } catch (error) {
    console.error('Get Quote Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve quote' },
      { status: 500 }
    );
  }
}

interface QuoteAnalysis {
  lowestPremium: {
    carrierId: string;
    carrierName: string;
    annualPremium: number;
  };
  highestPremium: {
    carrierId: string;
    carrierName: string;
    annualPremium: number;
  };
  averagePremium: number;
  potentialSavings: number;
  recommendedQuote: QuoteResponse;
  bestValue: QuoteResponse;
  coverageComparison: CoverageComparison[];
}

interface CoverageComparison {
  coverageType: string;
  carriers: {
    carrierId: string;
    limit: string | number;
    premium: number;
  }[];
}

function analyzeQuotes(quotes: QuoteResponse[]): QuoteAnalysis {
  if (quotes.length === 0) {
    throw new Error('No quotes available for analysis');
  }

  const premiums = quotes.map(q => q.premium.annual);
  const lowestPremium = Math.min(...premiums);
  const highestPremium = Math.max(...premiums);
  const averagePremium = premiums.reduce((a, b) => a + b, 0) / premiums.length;

  const lowestQuote = quotes.find(q => q.premium.annual === lowestPremium)!;
  const highestQuote = quotes.find(q => q.premium.annual === highestPremium)!;

  // Calculate best value (considering coverage and price)
  const bestValueQuote = quotes.reduce((best, current) => {
    const bestScore = calculateValueScore(best);
    const currentScore = calculateValueScore(current);
    return currentScore > bestScore ? current : best;
  });

  // Generate coverage comparison
  const coverageComparison = generateCoverageComparison(quotes);

  return {
    lowestPremium: {
      carrierId: lowestQuote.carrierId,
      carrierName: lowestQuote.carrierName,
      annualPremium: lowestPremium
    },
    highestPremium: {
      carrierId: highestQuote.carrierId,
      carrierName: highestQuote.carrierName,
      annualPremium: highestPremium
    },
    averagePremium: Math.round(averagePremium),
    potentialSavings: Math.round(highestPremium - lowestPremium),
    recommendedQuote: bestValueQuote,
    bestValue: bestValueQuote,
    coverageComparison
  };
}

function calculateValueScore(quote: QuoteResponse): number {
  // Simple value scoring algorithm
  // In production, this would be more sophisticated
  let score = 0;
  
  // Price factor (lower is better)
  const priceScore = Math.max(0, 100 - (quote.premium.annual / 1000) * 10);
  score += priceScore * 0.4;
  
  // Coverage factor
  const coverageCount = Object.keys(quote.coverage).length;
  score += coverageCount * 10;
  
  // Discount factor
  const discountValue = quote.discounts.reduce((sum, discount) => sum + discount.amount, 0);
  score += discountValue * 0.1;
  
  return score;
}

function generateCoverageComparison(quotes: QuoteResponse[]): CoverageComparison[] {
  const coverageTypes = new Set<string>();
  
  // Collect all coverage types
  quotes.forEach(quote => {
    Object.keys(quote.coverage).forEach(type => coverageTypes.add(type));
  });
  
  return Array.from(coverageTypes).map(coverageType => ({
    coverageType,
    carriers: quotes.map(quote => ({
      carrierId: quote.carrierId,
      limit: quote.coverage[coverageType]?.limit || 'Not Available',
      premium: quote.coverage[coverageType]?.premium || 0
    }))
  }));
}
