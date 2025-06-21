/**
 * Community Posts API - Social Community Features
 * Handles community post operations for the social features
 */

import { NextRequest, NextResponse } from 'next/server';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
    badges: string[];
    insuranceExpertise?: string;
  };
  content: string;
  type: 'tip' | 'question' | 'experience' | 'achievement';
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  hasLiked: boolean;
  helpfulVotes?: number;
  images?: string[];
}

// Mock community posts data for now - in production this would connect to a real database
const generateMockPosts = (): CommunityPost[] => {
  const currentTime = Date.now();
  const dayOfYear = Math.floor(currentTime / (1000 * 60 * 60 * 24)) % 365;
  
  return [
    {
      id: `post_${dayOfYear}_1`,
      author: {
        name: 'Sarah M.',
        avatar: '👩‍💼',
        level: 12,
        badges: ['🏆', '🎓', '💡'],
        insuranceExpertise: 'Home Insurance'
      },
      content: "Just saved $400/year by bundling my home and auto! Maya helped me find the perfect combo. Here's what worked for me...",
      type: 'tip',
      timestamp: new Date(currentTime - 2 * 60 * 60 * 1000),
      likes: 23 + (dayOfYear % 10),
      comments: 8 + (dayOfYear % 5),
      shares: 5 + (dayOfYear % 3),
      tags: ['bundling', 'savings', 'Maya'],
      hasLiked: false,
      helpfulVotes: 18 + (dayOfYear % 7)
    },
    {
      id: `post_${dayOfYear}_2`,
      author: {
        name: 'Mike R.',
        avatar: '👨‍🔧',
        level: 8,
        badges: ['🔧', '🚗'],
        insuranceExpertise: 'Auto Insurance'
      },
      content: "Question: Filed my first claim through the app. How long does processing usually take? Anyone have recent experience?",
      type: 'question',
      timestamp: new Date(currentTime - 4 * 60 * 60 * 1000),
      likes: 12 + (dayOfYear % 6),
      comments: 15 + (dayOfYear % 8),
      shares: 2 + (dayOfYear % 2),
      tags: ['claims', 'processing', 'help'],
      hasLiked: true
    },
    {
      id: `post_${dayOfYear}_3`,
      author: {
        name: 'Lisa K.',
        avatar: '👩‍⚕️',
        level: 15,
        badges: ['🏥', '🌟', '👑'],
        insuranceExpertise: 'Health Insurance'
      },
      content: "Achievement unlocked! 🎉 Just reached my 1-year claim-free milestone and earned a 15% discount. The gamification features really motivate you to drive safely!",
      type: 'achievement',
      timestamp: new Date(currentTime - 6 * 60 * 60 * 1000),
      likes: 34 + (dayOfYear % 15),
      comments: 12 + (dayOfYear % 7),
      shares: 8 + (dayOfYear % 4),
      tags: ['achievement', 'milestone', 'gamification', 'discount'],
      hasLiked: false,
      helpfulVotes: 28 + (dayOfYear % 12)
    }
  ];
};

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from a real database
    // For now, return mock data that changes daily for demo purposes
    const posts = generateMockPosts();
    
    return NextResponse.json({
      success: true,
      posts: posts,
      total: posts.length,
      page: 1,
      totalPages: 1
    });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch community posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, type, tags, author } = body;
    
    // Validate required fields
    if (!content || !type || !author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In production, this would save to a real database
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      author: author,
      content: content,
      type: type,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      tags: tags || [],
      hasLiked: false,
      helpfulVotes: 0
    };
    
    // For now, just return the created post
    return NextResponse.json({
      success: true,
      post: newPost,
      message: 'Post created successfully'
    });
    
  } catch (error) {
    console.error('Error creating community post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
