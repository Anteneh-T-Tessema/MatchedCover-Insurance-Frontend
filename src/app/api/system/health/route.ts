/**
 * System Health API Endpoint
 * Returns overall system health metrics
 */

import { NextResponse } from 'next/server';

interface SystemHealthResponse {
  overall_score: number;
  avg_latency_ms: number;
  error_rate_percent: number;
  active_carriers: number;
  total_requests_24h: number;
  uptime_percentage: number;
  last_updated: string;
  services: {
    database: 'healthy' | 'degraded' | 'down';
    redis: 'healthy' | 'degraded' | 'down';
    carriers: 'healthy' | 'degraded' | 'down';
  };
}

export async function GET() {
  try {
    // In production, this would aggregate real system metrics
    const healthData = getSystemHealthData();
    
    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    console.error('Error fetching system health:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system health' },
      { status: 500 }
    );
  }
}

function getSystemHealthData(): SystemHealthResponse {
  const now = Date.now();
  const hourOfDay = new Date().getHours();
  
  // Time-based health variation (better during business hours)
  const businessHoursBonus = (hourOfDay >= 8 && hourOfDay <= 18) ? 5 : 0;
  const timeVariation = Math.sin(now / 300000) * 3; // 5-minute cycles
  
  const overallScore = Math.max(85, Math.min(98, 92 + businessHoursBonus + timeVariation));
  const latency = Math.max(150, Math.min(500, 250 - businessHoursBonus * 10 + timeVariation * 20));
  const errorRate = Math.max(0.5, Math.min(3, 1.5 - businessHoursBonus * 0.1 - timeVariation * 0.3));
  
  return {
    overall_score: Math.round(overallScore * 10) / 10,
    avg_latency_ms: Math.round(latency),
    error_rate_percent: Math.round(errorRate * 10) / 10,
    active_carriers: 4,
    total_requests_24h: Math.round((50000 + timeVariation * 1000) * (1 + businessHoursBonus * 0.1)),
    uptime_percentage: Math.max(99.5, Math.min(99.99, 99.8 + timeVariation * 0.1)),
    last_updated: new Date().toISOString(),
    services: {
      database: overallScore > 90 ? 'healthy' : 'degraded',
      redis: overallScore > 88 ? 'healthy' : 'degraded', 
      carriers: overallScore > 85 ? 'healthy' : 'degraded'
    }
  };
}
