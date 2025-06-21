/**
 * Community Leaderboard API - Gamification Ranking System
 * Handles leaderboard data for the community features
 */

import { NextRequest, NextResponse } from 'next/server';

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  points: number;
  achievements: number;
  streak: number;
  specialization?: string;
}

// Mock leaderboard data - in production this would connect to a real database
const generateMockLeaderboard = (): LeaderboardEntry[] => {
  const currentTime = Date.now();
  const dayOfYear = Math.floor(currentTime / (1000 * 60 * 60 * 24)) % 365;
  
  return [
    {
      rank: 1,
      user: {
        name: 'Emma Thompson',
        avatar: '👑',
        level: 25
      },
      points: 15430 + (dayOfYear % 100),
      achievements: 47,
      streak: 128,
      specialization: 'Insurance Expert'
    },
    {
      rank: 2,
      user: {
        name: 'David Chen',
        avatar: '🌟',
        level: 23
      },
      points: 14820 + (dayOfYear % 95),
      achievements: 42,
      streak: 95,
      specialization: 'Claims Specialist'
    },
    {
      rank: 3,
      user: {
        name: 'Sofia Rodriguez',
        avatar: '🏆',
        level: 22
      },
      points: 13950 + (dayOfYear % 90),
      achievements: 38,
      streak: 87,
      specialization: 'Risk Analyst'
    },
    {
      rank: 4,
      user: {
        name: 'James Wilson',
        avatar: '⭐',
        level: 20
      },
      points: 12680 + (dayOfYear % 85),
      achievements: 35,
      streak: 72,
      specialization: 'Auto Insurance'
    },
    {
      rank: 5,
      user: {
        name: 'Maya Patel',
        avatar: '💎',
        level: 19
      },
      points: 11890 + (dayOfYear % 80),
      achievements: 32,
      streak: 68,
      specialization: 'Home Insurance'
    },
    {
      rank: 6,
      user: {
        name: 'Alex Kim',
        avatar: '🚀',
        level: 18
      },
      points: 10950 + (dayOfYear % 75),
      achievements: 29,
      streak: 54,
      specialization: 'Life Insurance'
    },
    {
      rank: 7,
      user: {
        name: 'Rachel Green',
        avatar: '🌈',
        level: 17
      },
      points: 9870 + (dayOfYear % 70),
      achievements: 26,
      streak: 45,
      specialization: 'Health Insurance'
    },
    {
      rank: 8,
      user: {
        name: 'Michael Brown',
        avatar: '🎯',
        level: 16
      },
      points: 8920 + (dayOfYear % 65),
      achievements: 24,
      streak: 38,
      specialization: 'Business Insurance'
    },
    {
      rank: 9,
      user: {
        name: 'Lisa Anderson',
        avatar: '✨',
        level: 15
      },
      points: 7850 + (dayOfYear % 60),
      achievements: 21,
      streak: 31,
      specialization: 'Travel Insurance'
    },
    {
      rank: 10,
      user: {
        name: 'You',
        avatar: '👤',
        level: 8
      },
      points: 3450 + (dayOfYear % 30),
      achievements: 12,
      streak: 15,
      specialization: 'Rising Star'
    }
  ];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'all-time'; // all-time, monthly, weekly
    const category = searchParams.get('category') || 'overall'; // overall, points, streak, achievements
    
    // In production, this would filter by timeframe and category
    const leaderboard = generateMockLeaderboard();
    
    // Add some variation based on timeframe for demo
    const adjustedLeaderboard = timeframe === 'weekly' 
      ? leaderboard.map(entry => ({
          ...entry,
          points: Math.floor(entry.points * 0.1), // Weekly points are lower
          streak: Math.min(entry.streak, 7) // Weekly streak max 7
        }))
      : timeframe === 'monthly'
      ? leaderboard.map(entry => ({
          ...entry,
          points: Math.floor(entry.points * 0.3), // Monthly points
          streak: Math.min(entry.streak, 30) // Monthly streak max 30
        }))
      : leaderboard;
    
    return NextResponse.json({
      success: true,
      users: adjustedLeaderboard,
      total: adjustedLeaderboard.length,
      timeframe: timeframe,
      category: category,
      userRank: 10,
      userProgress: {
        pointsToNextRank: 1250,
        nextRankUser: 'Lisa Anderson'
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, points, achievement } = body;
    
    switch (action) {
      case 'add-points':
        // In production, this would add points to the user's account
        return NextResponse.json({
          success: true,
          message: `Added ${points} points`,
          newTotal: 3450 + points,
          rankChange: points > 100 ? 'up' : 'none'
        });
        
      case 'unlock-achievement':
        // In production, this would unlock an achievement for the user
        return NextResponse.json({
          success: true,
          message: `Achievement unlocked: ${achievement}`,
          pointsEarned: 100,
          newAchievementCount: 13
        });
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Error processing leaderboard action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process leaderboard action' },
      { status: 500 }
    );
  }
}
