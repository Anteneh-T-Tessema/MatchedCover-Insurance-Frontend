/**
 * Community Challenges API - Gamification Features
 * Handles community challenge operations for the gamification system
 */

import { NextRequest, NextResponse } from 'next/server';

interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  reward: string;
  pointValue: number;
  participants: number;
  timeLeft: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'learning' | 'claims' | 'savings' | 'referral';
  progress?: number;
  status: 'available' | 'in-progress' | 'completed';
}

// Mock challenges data - in production this would connect to a real database
const generateMockChallenges = (): CommunityChallenge[] => {
  const currentTime = Date.now();
  const dayOfYear = Math.floor(currentTime / (1000 * 60 * 60 * 24)) % 365;
  
  return [
    {
      id: `challenge_${dayOfYear}_1`,
      title: 'Insurance Knowledge Quiz Master',
      description: 'Complete 5 insurance knowledge quizzes this week to enhance your understanding and earn points.',
      type: 'individual',
      reward: '500 Points + Knowledge Badge',
      pointValue: 500,
      participants: 156 + (dayOfYear % 50),
      timeLeft: '4 days',
      difficulty: 'medium',
      category: 'learning',
      progress: 60,
      status: 'in-progress'
    },
    {
      id: `challenge_${dayOfYear}_2`,
      title: 'Refer a Friend',
      description: 'Invite friends to join MatchedCover and help them save on insurance. Both you and your friend get rewards!',
      type: 'individual',
      reward: '$50 Credit + Referral Badge',
      pointValue: 1000,
      participants: 89 + (dayOfYear % 30),
      timeLeft: '2 weeks',
      difficulty: 'easy',
      category: 'referral',
      status: 'available'
    },
    {
      id: `challenge_${dayOfYear}_3`,
      title: 'Claim-Free Champions',
      description: 'Team up with 4 other members to maintain a collective claim-free streak for 6 months.',
      type: 'team',
      reward: '15% Premium Discount + Team Trophy',
      pointValue: 2000,
      participants: 45 + (dayOfYear % 20),
      timeLeft: '3 months',
      difficulty: 'hard',
      category: 'claims',
      progress: 25,
      status: 'in-progress'
    },
    {
      id: `challenge_${dayOfYear}_4`,
      title: 'Smart Savings Streak',
      description: 'Use our comparison tools to find savings opportunities 3 weeks in a row.',
      type: 'individual',
      reward: '750 Points + Savings Expert Badge',
      pointValue: 750,
      participants: 234 + (dayOfYear % 80),
      timeLeft: '1 week',
      difficulty: 'medium',
      category: 'savings',
      progress: 85,
      status: 'in-progress'
    },
    {
      id: `challenge_${dayOfYear}_5`,
      title: 'Community Helper',
      description: 'Answer 10 community questions and help fellow members with their insurance journey.',
      type: 'individual',
      reward: '300 Points + Helper Badge',
      pointValue: 300,
      participants: 67 + (dayOfYear % 25),
      timeLeft: '5 days',
      difficulty: 'easy',
      category: 'learning',
      status: 'available'
    }
  ];
};

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from a real database with user-specific progress
    const challenges = generateMockChallenges();
    
    return NextResponse.json({
      success: true,
      challenges: challenges,
      total: challenges.length,
      userLevel: 8,
      totalPoints: 3450,
      availableChallenges: challenges.filter(c => c.status === 'available').length,
      inProgress: challenges.filter(c => c.status === 'in-progress').length
    });
  } catch (error) {
    console.error('Error fetching community challenges:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch community challenges' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challengeId, action } = body;
    
    if (!challengeId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing challengeId or action' },
        { status: 400 }
      );
    }
    
    // Handle different challenge actions
    switch (action) {
      case 'join':
        // In production, this would add the user to the challenge
        return NextResponse.json({
          success: true,
          message: 'Successfully joined challenge',
          challengeId: challengeId,
          newStatus: 'in-progress'
        });
        
      case 'complete':
        // In production, this would mark the challenge as completed for the user
        return NextResponse.json({
          success: true,
          message: 'Challenge completed!',
          challengeId: challengeId,
          pointsEarned: 500,
          newBadges: ['Achievement Unlocked']
        });
        
      case 'leave':
        // In production, this would remove the user from the challenge
        return NextResponse.json({
          success: true,
          message: 'Left challenge',
          challengeId: challengeId,
          newStatus: 'available'
        });
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Error processing challenge action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process challenge action' },
      { status: 500 }
    );
  }
}
