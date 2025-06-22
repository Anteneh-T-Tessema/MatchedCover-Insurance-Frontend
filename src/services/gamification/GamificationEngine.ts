/**
 * Advanced Gamification Engine - Strategic Implementation
 * Implements psychology-based engagement features for addiction-level user retention
 * Features variable rewards, social comparison, loss aversion, and community building
 */

import { GameState, Badge, Achievement, UserProfile } from '../../stores/AppStore';
import { GameReward, Quest } from '../ai/AIAgentOrchestrator';

export interface GamificationEvent {
  type: 'quote_requested' | 'policy_purchased' | 'claim_filed' | 'education_completed' | 
        'referral_made' | 'profile_completed' | 'goal_achieved' | 'streak_maintained' |
        'social_share' | 'peer_help' | 'challenge_completed' | 'milestone_reached';
  userId: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
  engagement_score: number; // New: Track engagement intensity
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  points: number;
  level: number;
  rank: number;
  badges: number;
  streak: number;
  weekly_points: number; // New: Track weekly performance
  achievement_rate: number; // New: Completion percentage
}

export interface SocialFeature {
  type: 'share_achievement' | 'invite_friend' | 'compare_savings' | 'group_challenge' |
        'peer_mentoring' | 'team_quest' | 'community_goal' | 'knowledge_sharing';
  description: string;
  reward: GameReward;
  social_multiplier: number; // New: Social bonus factor
}

// Advanced Psychology-Based Reward System
export interface VariableRewardSchedule {
  baseReward: number;
  variabilityFactor: number; // 0.0 to 1.0 - Higher = more unpredictable
  bonusChance: number; // 0.0 to 1.0 - Probability of bonus
  bonusMultiplier: number; // 1.0+ - Bonus reward multiplier
  rareBonusChance: number; // Very low chance for big rewards
  rareBonusMultiplier: number; // High multiplier for rare bonuses
  streakBonus: number; // Additional reward for consecutive actions
  surpriseReward: boolean; // Random surprise rewards
  timeBasedMultiplier: {
    peakHours: number[]; // Hours when rewards are higher
    weekendBonus: number; // Weekend activity bonus
    monthlyMultiplier: number; // End-of-month bonus
  };
}

// Social Comparison and Competition Features
export interface SocialComparison {
  userRank: number;
  totalUsers: number;
  percentile: number;
  nextRankUser: {
    username: string;
    pointsAhead: number;
    achievable: boolean; // New: Is this rank realistically achievable?
  };
  similarUsers: LeaderboardEntry[]; // New: Users with similar activity
  improvement_trend: 'rising' | 'stable' | 'declining'; // New: Performance trend
  motivational_message: string; // New: Personalized encouragement
}

// Loss Aversion and Urgency Features
export interface LossAversionTrigger {
  type: 'streak_risk' | 'rank_threat' | 'expiring_bonus' | 'limited_offer' | 'peer_progress';
  urgency_level: 'low' | 'medium' | 'high' | 'critical';
  time_remaining: number; // Minutes until loss occurs
  potential_loss: {
    points: number;
    rank_positions: number;
    badges: string[];
    exclusive_access: string[];
  };
  action_required: string;
  reward_for_action: GameReward;
}

// Time-Based Challenges and Events
export interface TimedChallenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'flash';
  duration: number; // Duration in minutes
  participants: number; // Current participant count
  max_participants?: number; // Limited participation
  requirements: ChallengeRequirement[];
  rewards: {
    completion: GameReward;
    leaderboard_top_10: GameReward;
    leaderboard_top_3: GameReward;
    first_place: GameReward;
  };
  social_features: {
    team_based: boolean;
    peer_visibility: boolean;
    progress_sharing: boolean;
  };
}

export interface ChallengeRequirement {
  action: string;
  count: number;
  time_limit?: number; // Time limit for this specific requirement
  difficulty_multiplier: number;
}

// Advanced Achievement System
export interface AdvancedAchievement extends Achievement {
  secret: boolean; // Hidden until unlocked
  chain_requirement?: string; // Requires previous achievement
  social_requirement?: {
    referrals_needed: number;
    team_participation: boolean;
    community_contribution: boolean;
  };
  behavioral_pattern: {
    consistency_required: boolean; // Must maintain behavior over time
    improvement_required: boolean; // Must show improvement
    expertise_level: 'beginner' | 'intermediate' | 'expert';
  };
  celebration_animation: string; // Special animation for this achievement
  social_announcement: boolean; // Automatically share when earned
}

// Community and Learning Features
export interface PeerLearningProgram {
  id: string;
  mentor_id: string;
  mentee_id: string;
  focus_area: 'insurance_basics' | 'advanced_coverage' | 'claims_process' | 'savings_optimization';
  progress_tracking: {
    lessons_completed: number;
    knowledge_tests_passed: number;
    real_world_application: number;
  };
  mutual_rewards: {
    mentor_benefits: GameReward[];
    mentee_benefits: GameReward[];
    completion_bonus: GameReward;
  };
}

export interface CommunityGoal {
  id: string;
  title: string;
  description: string;
  type: 'knowledge_sharing' | 'collective_savings' | 'referral_drive' | 'education_initiative';
  target_metric: number;
  current_progress: number;
  participants: string[]; // User IDs
  time_limit: Date;
  individual_contribution_rewards: GameReward[];
  completion_rewards: GameReward[];
  failure_consolation: GameReward;
}

export class GamificationEngine {
  private readonly pointsConfig = {
    quote_requested: 10,
    profile_completed: 50,
    policy_purchased: 500,
    education_completed: 25,
    referral_made: 100,
    claim_filed: 20,
    goal_achieved: 75,
    streak_day: 5,
    streak_maintained: 10,
    badge_earned: 100,
    social_share: 15,
    peer_help: 30,
    challenge_completed: 75,
    milestone_reached: 150
  };

  private readonly levelThresholds = [
    0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 17000, 25000
  ];

  private readonly availableBadges: Omit<Badge, 'earnedAt'>[] = [
    {
      id: 'first_quote',
      name: 'Quote Explorer',
      description: 'Requested your first insurance quote',
      icon: '🔍',
      rarity: 'common',
      category: 'milestone'
    },
    {
      id: 'smart_saver',
      name: 'Smart Saver',
      description: 'Saved over $500 on insurance',
      icon: '💰',
      rarity: 'rare',
      category: 'savings'
    },
    {
      id: 'knowledge_seeker',
      name: 'Knowledge Seeker',
      description: 'Completed 10 educational modules',
      icon: '🎓',
      rarity: 'rare',
      category: 'education'
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintained a 30-day engagement streak',
      icon: '🔥',
      rarity: 'epic',
      category: 'engagement'
    },
    {
      id: 'insurance_guru',
      name: 'Insurance Guru',
      description: 'Achieved expert level knowledge',
      icon: '🧙‍♂️',
      rarity: 'legendary',
      category: 'education'
    },
    {
      id: 'policy_collector',
      name: 'Policy Collector',
      description: 'Purchased 3 different types of insurance',
      icon: '📋',
      rarity: 'epic',
      category: 'milestone'
    },
    {
      id: 'referral_champion',
      name: 'Referral Champion',
      description: 'Referred 5 friends to MatchedCover',
      icon: '👥',
      rarity: 'rare',
      category: 'engagement'
    }
  ];

  private readonly availableQuests: Omit<Quest, 'currentStep'>[] = [
    {
      id: 'insurance_basics',
      title: 'Insurance Basics Mastery',
      description: 'Learn the fundamentals of insurance and earn expert status',
      steps: [
        {
          id: 'step1',
          description: 'Complete "Understanding Coverage Types" lesson',
          completed: false,
          requirement: 'education_module_coverage_types',
          hint: 'Start with the basics - what types of insurance exist?'
        },
        {
          id: 'step2',
          description: 'Take the Risk Assessment Quiz',
          completed: false,
          requirement: 'quiz_risk_assessment',
          hint: 'Understanding your risk profile is key to good coverage'
        },
        {
          id: 'step3',
          description: 'Get quotes for 2 different insurance types',
          completed: false,
          requirement: 'quotes_multiple_types',
          hint: 'Compare auto and home insurance quotes'
        }
      ],
      reward: {
        type: 'badge',
        value: 'knowledge_seeker',
        description: 'Knowledge Seeker badge + 100 bonus points'
      }
    },
    {
      id: 'money_saver',
      title: 'The Money Saver Challenge',
      description: 'Find and implement 3 ways to save on your insurance',
      steps: [
        {
          id: 'step1',
          description: 'Compare quotes from 3 different carriers',
          completed: false,
          requirement: 'quotes_comparison_3',
          hint: 'Use our comparison tool to see side-by-side pricing'
        },
        {
          id: 'step2',
          description: 'Identify 2 applicable discounts',
          completed: false,
          requirement: 'discounts_identified_2',
          hint: 'Check for bundling, safe driver, or security system discounts'
        },
        {
          id: 'step3',
          description: 'Optimize your deductible for maximum savings',
          completed: false,
          requirement: 'deductible_optimized',
          hint: 'Higher deductibles can significantly lower premiums'
        }
      ],
      reward: {
        type: 'discount',
        value: '50',
        description: '$50 credit toward your next policy'
      }
    }
  ];

  async processGamificationEvent(event: GamificationEvent, currentGameState: GameState): Promise<{
    newGameState: GameState;
    rewards: GameReward[];
    notifications: string[];
  }> {
    const rewards: GameReward[] = [];
    const notifications: string[] = [];
    let newGameState = { ...currentGameState };

    // Award points for the event
    const pointsEarned = this.pointsConfig[event.type] || 0;
    newGameState.points += pointsEarned;

    if (pointsEarned > 0) {
      rewards.push({
        type: 'points',
        value: pointsEarned,
        description: `+${pointsEarned} points for ${event.type.replace('_', ' ')}`
      });
    }

    // Check for level up
    const newLevel = this.calculateLevel(newGameState.points);
    if (newLevel > newGameState.level) {
      newGameState.level = newLevel;
      const levelReward = this.getLevelUpReward(newLevel);
      rewards.push(levelReward);
      notifications.push(`🎉 Level Up! Welcome to Level ${newLevel}! ${levelReward.description}`);
    }

    // Check for new badges
    const newBadges = await this.checkForNewBadges(event, newGameState);
    for (const badge of newBadges) {
      newGameState.badges.push({ ...badge, earnedAt: new Date() });
      rewards.push({
        type: 'badge',
        value: badge.name,
        description: `Earned: ${badge.name} badge!`
      });
      notifications.push(`🏅 New Badge Earned: ${badge.name}! ${badge.description}`);
    }

    // Update quest progress
    const questUpdates = await this.updateQuestProgress(event, newGameState);
    newGameState = questUpdates.gameState;
    rewards.push(...questUpdates.rewards);
    notifications.push(...questUpdates.notifications);

    // Update achievements
    const achievementUpdates = await this.updateAchievements(event, newGameState);
    newGameState = achievementUpdates.gameState;
    rewards.push(...achievementUpdates.rewards);
    notifications.push(...achievementUpdates.notifications);

    return { newGameState, rewards, notifications };
  }

  private calculateLevel(points: number): number {
    for (let i = this.levelThresholds.length - 1; i >= 0; i--) {
      if (points >= this.levelThresholds[i]) {
        return i + 1;
      }
    }
    return 1;
  }

  private getLevelUpReward(level: number): GameReward {
    const rewardValue = level * 50; // Bonus points increase with level
    return {
      type: 'points',
      value: rewardValue,
      description: `Level ${level} bonus: +${rewardValue} points`
    };
  }

  private async checkForNewBadges(event: GamificationEvent, gameState: GameState): Promise<Badge[]> {
    const newBadges: Badge[] = [];
    const earnedBadgeIds = gameState.badges.map(b => b.id);

    for (const badge of this.availableBadges) {
      if (earnedBadgeIds.includes(badge.id)) continue;

      let shouldEarn = false;

      switch (badge.id) {
        case 'first_quote':
          shouldEarn = event.type === 'quote_requested';
          break;
        case 'smart_saver':
          shouldEarn = event.type === 'policy_purchased' && gameState.points >= 1000;
          break;
        case 'knowledge_seeker':
          const educationCount = gameState.achievements
            .filter(a => a.id.includes('education'))
            .reduce((sum, a) => sum + a.progress, 0);
          shouldEarn = educationCount >= 10;
          break;
        case 'streak_master':
          shouldEarn = gameState.streak >= 30;
          break;
        case 'insurance_guru':
          shouldEarn = gameState.level >= 10;
          break;
        case 'policy_collector':
          const policyCount = gameState.achievements
            .find(a => a.id === 'policies_purchased')?.progress || 0;
          shouldEarn = policyCount >= 3;
          break;
        case 'referral_champion':
          const referralCount = gameState.achievements
            .find(a => a.id === 'referrals_made')?.progress || 0;
          shouldEarn = referralCount >= 5;
          break;
      }

      if (shouldEarn) {
        newBadges.push({ ...badge, earnedAt: new Date() });
      }
    }

    return newBadges;
  }

  private async updateQuestProgress(event: GamificationEvent, gameState: GameState): Promise<{
    gameState: GameState;
    rewards: GameReward[];
    notifications: string[];
  }> {
    const rewards: GameReward[] = [];
    const notifications: string[] = [];
    let newGameState = { ...gameState };

    if (newGameState.currentQuest) {
      const quest = newGameState.currentQuest;
      const currentStep = quest.steps[quest.currentStep];

      // Check if current step is completed by this event
      if (this.checkStepCompletion(currentStep, event)) {
        currentStep.completed = true;
        quest.currentStep++;

        if (quest.currentStep >= quest.steps.length) {
          // Quest completed!
          rewards.push(quest.reward);
          notifications.push(`🎯 Quest Completed: ${quest.title}! ${quest.reward.description}`);
          newGameState.currentQuest = null;
        } else {
          notifications.push(`✅ Step completed: ${currentStep.description}`);
        }
      }
    }

    return { gameState: newGameState, rewards, notifications };
  }

  private checkStepCompletion(step: { requirement: string; completed: boolean; description: string }, event: GamificationEvent): boolean {
    // Simple requirement matching - in production this would be more sophisticated
    return step.requirement === event.type;
  }

  private async updateAchievements(event: GamificationEvent, gameState: GameState): Promise<{
    gameState: GameState;
    rewards: GameReward[];
    notifications: string[];
  }> {
    const rewards: GameReward[] = [];
    const notifications: string[] = [];
    let newGameState = { ...gameState };

    // Initialize achievements if they don't exist
    if (!newGameState.achievements) {
      newGameState.achievements = this.initializeAchievements();
    }

    // Update achievement progress based on event
    for (const achievement of newGameState.achievements) {
      if (achievement.unlocked) continue;

      let progressIncrement = 0;

      switch (achievement.id) {
        case 'quotes_requested':
          if (event.type === 'quote_requested') progressIncrement = 1;
          break;
        case 'policies_purchased':
          if (event.type === 'policy_purchased') progressIncrement = 1;
          break;
        case 'education_modules':
          if (event.type === 'education_completed') progressIncrement = 1;
          break;
        case 'referrals_made':
          if (event.type === 'referral_made') progressIncrement = 1;
          break;
      }

      if (progressIncrement > 0) {
        achievement.progress = Math.min(achievement.progress + progressIncrement, achievement.maxProgress);

        if (achievement.progress >= achievement.maxProgress && !achievement.unlocked) {
          achievement.unlocked = true;
          if (achievement.reward) {
            rewards.push(achievement.reward as GameReward);
          }
          notifications.push(`🏆 Achievement Unlocked: ${achievement.title}!`);
        }
      }
    }

    return { gameState: newGameState, rewards, notifications };
  }

  private initializeAchievements(): Achievement[] {
    return [
      {
        id: 'quotes_requested',
        title: 'Quote Collector',
        description: 'Request 10 insurance quotes',
        progress: 0,
        maxProgress: 10,
        category: 'engagement',
        reward: { type: 'points', value: 100, description: 'Quote Collector: +100 points' },
        unlocked: false
      },
      {
        id: 'policies_purchased',
        title: 'Policy Master',
        description: 'Purchase 5 insurance policies',
        progress: 0,
        maxProgress: 5,
        category: 'purchase',
        reward: { type: 'discount', value: '100', description: '$100 credit for future policies' },
        unlocked: false
      },
      {
        id: 'education_modules',
        title: 'Learning Champion',
        description: 'Complete 20 educational modules',
        progress: 0,
        maxProgress: 20,
        category: 'education',
        reward: { type: 'feature', value: 'expert_mode', description: 'Unlock Expert Mode features' },
        unlocked: false
      },
      {
        id: 'referrals_made',
        title: 'Community Builder',
        description: 'Refer 10 friends to MatchedCover',
        progress: 0,
        maxProgress: 10,
        category: 'social',
        reward: { type: 'points', value: 500, description: 'Community Builder: +500 points' },
        unlocked: false
      }
    ];
  }

  async getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
    // In production, this would fetch from a database
    // For now, return mock data
    return [
      {
        userId: 'user1',
        username: 'InsuranceExplorer',
        avatar: '🚗',
        points: 2500,
        level: 8,
        rank: 1,
        badges: 12,
        streak: 45,
        weekly_points: 300,
        achievement_rate: 0.75
      },
      {
        userId: 'user2',
        username: 'SmartSaver',
        avatar: '🏠',
        points: 2200,
        level: 7,
        rank: 2,
        badges: 10,
        streak: 30,
        weekly_points: 250,
        achievement_rate: 0.70
      },
      {
        userId: 'user3',
        username: 'PolicyPro',
        avatar: '💼',
        points: 1950,
        level: 6,
        rank: 3,
        badges: 8,
        streak: 22,
        weekly_points: 200,
        achievement_rate: 0.65
      }
    ];
  }

  async assignQuest(userId: string, questId: string): Promise<Quest | null> {
    const quest = this.availableQuests.find(q => q.id === questId);
    if (!quest) return null;

    return {
      ...quest,
      currentStep: 0,
      steps: quest.steps.map(step => ({ ...step, completed: false }))
    };
  }

  getSocialFeatures(): SocialFeature[] {
    return [
      {
        type: 'share_achievement',
        description: 'Share your latest achievement on social media',
        reward: { type: 'points', value: 25, description: '+25 points for sharing' },
        social_multiplier: 1.5
      },
      {
        type: 'invite_friend',
        description: 'Invite a friend to join MatchedCover',
        reward: { type: 'points', value: 100, description: '+100 points per successful referral' },
        social_multiplier: 2.0
      },
      {
        type: 'compare_savings',
        description: 'Compare your savings with friends',
        reward: { type: 'points', value: 10, description: '+10 points for comparison' },
        social_multiplier: 1.2
      },
      {
        type: 'group_challenge',
        description: 'Join a group savings challenge',
        reward: { type: 'badge', value: 'team_player', description: 'Team Player badge' },
        social_multiplier: 1.8
      }
    ];
  }

  calculateInsuranceKnowledgeScore(gameState: GameState, userProfile: UserProfile): {
    score: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    recommendations: string[];
  } {
    let score = 0;

    // Base score from game level and points
    score += gameState.level * 10;
    score += Math.min(gameState.points / 100, 50);

    // Bonus for education-related badges
    const educationBadges = gameState.badges.filter(b => b.category === 'education');
    score += educationBadges.length * 15;

    // Bonus for completed achievements
    const completedAchievements = gameState.achievements.filter(a => a.unlocked);
    score += completedAchievements.length * 10;

    // Adjust based on user profile
    if (userProfile.insuranceExperience === 'expert') score += 20;
    if (userProfile.insuranceExperience === 'intermediate') score += 10;

    const level = score < 50 ? 'Beginner' : 
                  score < 100 ? 'Intermediate' : 
                  score < 150 ? 'Advanced' : 'Expert';

    const recommendations = this.getKnowledgeRecommendations(level, gameState);

    return { score: Math.min(score, 200), level, recommendations };
  }

  private getKnowledgeRecommendations(level: string, gameState: GameState): string[] {
    switch (level) {
      case 'Beginner':
        return [
          'Complete the Insurance Basics quest',
          'Learn about different coverage types',
          'Take the risk assessment quiz'
        ];
      case 'Intermediate':
        return [
          'Explore advanced coverage options',
          'Learn about bundling discounts',
          'Compare quotes from multiple carriers'
        ];
      case 'Advanced':
        return [
          'Study specialty insurance products',
          'Learn about investment-linked policies',
          'Explore commercial insurance options'
        ];
      case 'Expert':
        return [
          'Share knowledge with the community',
          'Mentor new users',
          'Participate in expert forums'
        ];
      default:
        return [];
    }
  }
}

export class AdvancedGamificationEngine extends GamificationEngine {
  // Advanced Psychology Implementation
  private variableRewardSchedules: Map<string, VariableRewardSchedule> = new Map();
  private activeChallenges: Map<string, TimedChallenge> = new Map();
  private lossAversionTriggers: Map<string, LossAversionTrigger[]> = new Map();
  private peerLearningPrograms: Map<string, PeerLearningProgram> = new Map();
  private communityGoals: Map<string, CommunityGoal> = new Map();

  constructor() {
    super();
    this.initializeAdvancedFeatures();
  }

  /**
   * Strategic Implementation: Variable Reward Schedules for Addiction-Level Engagement
   */
  async processAdvancedReward(event: GamificationEvent, gameState: GameState, userId: string): Promise<GameReward[]> {
    const rewards: GameReward[] = [];
    const schedule = this.variableRewardSchedules.get(event.type) || this.variableRewardSchedules.get('default') || {
      baseReward: 5,
      variabilityFactor: 0.2,
      bonusChance: 0.1,
      bonusMultiplier: 1.5,
      rareBonusChance: 0.02,
      rareBonusMultiplier: 3.0,
      streakBonus: 1,
      surpriseReward: false,
      timeBasedMultiplier: {
        peakHours: [],
        weekendBonus: 1.0,
        monthlyMultiplier: 1.0
      }
    };
    
    // Base reward with variability
    const baseReward = this.calculateVariableReward(schedule, gameState, userId);
    rewards.push(baseReward);

    // Surprise rewards (deterministic positive reinforcement based on user engagement)
    if (schedule.surpriseReward && this.getPseudoRandom(userId, 1) < 0.05) { // 5% chance per day per user
      const surpriseReward: GameReward = {
        type: 'points',
        value: (typeof baseReward.value === 'number' ? baseReward.value : 0) * 2,
        description: '🎉 Surprise bonus! Your dedication is paying off!'
      };
      rewards.push(surpriseReward);
    }

    // Streak bonuses (behavioral consistency)
    if (gameState.currentStreak > 7) {
      const streakReward: GameReward = {
        type: 'points',
        value: gameState.currentStreak * schedule.streakBonus,
        description: `🔥 ${gameState.currentStreak} day streak bonus!`
      };
      rewards.push(streakReward);
    }

    // Time-based multipliers (urgency and timing)
    const timeBonus = this.calculateTimeBasedBonus(schedule);
    if (timeBonus > 1) {
      const timeBonusReward: GameReward = {
        type: 'points',
        value: Math.floor((typeof baseReward.value === 'number' ? baseReward.value : 0) * (timeBonus - 1)),
        description: `⏰ Perfect timing bonus! ${Math.floor((timeBonus - 1) * 100)}% extra!`
      };
      rewards.push(timeBonusReward);
    }

    return rewards;
  }

  /**
   * Strategic Implementation: Social Comparison for Competitive Motivation
   */
  async generateSocialComparison(userId: string): Promise<SocialComparison> {
    const userStats = await this.getUserStats(userId);
    const leaderboard = await this.getLeaderboard(1000);
    const userRank = leaderboard.findIndex(entry => entry.userId === userId) + 1;
    
    // Find similar users for meaningful comparison
    const similarUsers = leaderboard.filter(entry => 
      Math.abs(entry.points - userStats.totalPoints) < userStats.totalPoints * 0.2 &&
      entry.userId !== userId
    ).slice(0, 5);

    // Determine achievable next rank
    const nextRankUser = leaderboard[userRank - 2]; // One rank higher
    const pointsAhead = nextRankUser ? nextRankUser.points - userStats.totalPoints : 0;
    const achievable = pointsAhead < userStats.totalPoints * 0.1; // Within 10% of current points

    // Generate motivational message based on performance trend
    const trend = this.calculatePerformanceTrend(userId);
    const motivationalMessage = this.generateMotivationalMessage(userRank, trend, achievable, userId);

    return {
      userRank,
      totalUsers: leaderboard.length,
      percentile: Math.round(((leaderboard.length - userRank + 1) / leaderboard.length) * 100),
      nextRankUser: {
        username: nextRankUser?.username || 'Top Rank',
        pointsAhead,
        achievable
      },
      similarUsers,
      improvement_trend: trend,
      motivational_message: motivationalMessage
    };
  }

  /**
   * Strategic Implementation: Loss Aversion Triggers for Urgency
   */
  async checkLossAversionTriggers(userId: string, gameState: GameState): Promise<LossAversionTrigger[]> {
    const triggers: LossAversionTrigger[] = [];

    // Streak at risk
    if (gameState.currentStreak >= 7 && this.isStreakAtRisk(userId)) {
      triggers.push({
        type: 'streak_risk',
        urgency_level: 'high',
        time_remaining: this.getTimeUntilStreakLoss(userId),
        potential_loss: {
          points: gameState.currentStreak * 10,
          rank_positions: 3,
          badges: ['Streak Master'],
          exclusive_access: ['Daily Bonus Multiplier']
        },
        action_required: 'Complete any insurance activity in the next 2 hours',
        reward_for_action: {
          type: 'points',
          value: gameState.currentStreak * 15,
          description: 'Streak saved bonus!'
        }
      });
    }

    // Rank threat from peers
    const rankThreat = await this.checkRankThreat(userId);
    if (rankThreat) {
      triggers.push(rankThreat);
    }

    // Expiring limited-time bonuses
    // const expiringBonuses = this.getExpiringBonuses(userId);
    // triggers.push(...expiringBonuses); // TODO: Transform to LossAversionTrigger format

    return triggers;
  }

  /**
   * Strategic Implementation: Timed Challenges for Urgency and Community
   */
  async createTimedChallenge(type: TimedChallenge['type']): Promise<TimedChallenge> {
    const challengeTemplates: Record<TimedChallenge['type'], {
      name: string;
      description: string;
      duration: number;
      max_participants?: number;
    }> = {
      flash: {
        name: '⚡ Flash Challenge: Quote Lightning',
        description: 'Get 3 quotes in the next hour for massive bonuses!',
        duration: 60, // 1 hour
        max_participants: 100
      },
      daily: {
        name: '📅 Daily Knowledge Quest',
        description: 'Learn 5 new insurance facts today',
        duration: 1440, // 24 hours
        max_participants: undefined
      },
      weekly: {
        name: '🏆 Weekly Savings Challenge',
        description: 'Find the biggest savings compared to current insurance',
        duration: 10080, // 7 days
        max_participants: undefined
      },
      monthly: {
        name: '🌟 Monthly Excellence Challenge',
        description: 'Achieve insurance mastery throughout the month',
        duration: 43200, // 30 days
        max_participants: undefined
      },
      seasonal: {
        name: '🍂 Seasonal Protection Challenge',
        description: 'Adapt your coverage for the changing season',
        duration: 129600, // 90 days
        max_participants: undefined
      }
    };

    const template = challengeTemplates[type];
    const challenge: TimedChallenge = {
      id: `challenge_${Date.now()}`,
      name: template.name,
      description: template.description,
      type,
      duration: template.duration,
      participants: 0,
      max_participants: template.max_participants,
      requirements: this.generateChallengeRequirements(type),
      rewards: this.generateChallengeRewards(type),
      social_features: {
        team_based: type === 'weekly',
        peer_visibility: true,
        progress_sharing: true
      }
    };

    this.activeChallenges.set(challenge.id, challenge);
    return challenge;
  }

  /**
   * Strategic Implementation: Peer Learning for Community Building
   */
  async createPeerLearningProgram(mentorId: string, menteeId: string, focusArea: PeerLearningProgram['focus_area']): Promise<PeerLearningProgram> {
    const program: PeerLearningProgram = {
      id: `peer_learning_${Date.now()}`,
      mentor_id: mentorId,
      mentee_id: menteeId,
      focus_area: focusArea,
      progress_tracking: {
        lessons_completed: 0,
        knowledge_tests_passed: 0,
        real_world_application: 0
      },
      mutual_rewards: {
        mentor_benefits: [
          { type: 'points', value: 50, description: 'Teaching bonus' },
          { type: 'badge', value: 'Mentor', description: 'Community teacher badge' }
        ],
        mentee_benefits: [
          { type: 'points', value: 25, description: 'Learning bonus' },
          { type: 'unlock', value: 'advanced_tips', description: 'Unlock advanced insurance tips' }
        ],
        completion_bonus: {
          type: 'points',
          value: 200,
          description: 'Peer learning completion bonus for both participants'
        }
      }
    };

    this.peerLearningPrograms.set(program.id, program);
    return program;
  }

  // Private helper methods for advanced features
  private initializeAdvancedFeatures(): void {
    // Initialize variable reward schedules
    this.variableRewardSchedules.set('quote_requested', {
      baseReward: 10,
      variabilityFactor: 0.3,
      bonusChance: 0.15,
      bonusMultiplier: 2.0,
      rareBonusChance: 0.05,
      rareBonusMultiplier: 5.0,
      streakBonus: 2,
      surpriseReward: true,
      timeBasedMultiplier: {
        peakHours: [9, 10, 11, 14, 15, 16], // Business hours
        weekendBonus: 1.5,
        monthlyMultiplier: 2.0
      }
    });

    // Initialize other reward schedules...
    this.initializeOtherRewardSchedules();
  }

  private calculateVariableReward(schedule: VariableRewardSchedule, gameState: GameState, userId: string): GameReward {
    let value = schedule.baseReward;
    
    // Add variability (deterministic factor based on user and activity)
    const variability = (this.getPseudoRandom(userId, gameState.points) - 0.5) * 2 * schedule.variabilityFactor;
    value *= (1 + variability);

    // Check for bonus (deterministic based on user engagement pattern)
    if (this.getPseudoRandom(userId, 2) < schedule.bonusChance) {
      value *= schedule.bonusMultiplier;
    }

    // Check for rare bonus (deterministic but rare for each user)
    if (this.getPseudoRandom(userId, 3) < schedule.rareBonusChance) {
      value *= schedule.rareBonusMultiplier;
    }

    return {
      type: 'points',
      value: Math.floor(value),
      description: 'Activity reward'
    };
  }

  private calculateTimeBasedBonus(schedule: VariableRewardSchedule): number {
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const isEndOfMonth = now.getDate() > 25;

    let multiplier = 1.0;

    // Peak hours bonus
    if (schedule.timeBasedMultiplier.peakHours.includes(hour)) {
      multiplier *= 1.2;
    }

    // Weekend bonus
    if (isWeekend) {
      multiplier *= schedule.timeBasedMultiplier.weekendBonus;
    }

    // End of month bonus
    if (isEndOfMonth) {
      multiplier *= schedule.timeBasedMultiplier.monthlyMultiplier;
    }

    return multiplier;
  }

  private generateMotivationalMessage(rank: number, trend: 'rising' | 'stable' | 'declining', achievable: boolean, userId: string): string {
    const messages = {
      rising_achievable: [
        "🚀 You're on fire! Just a little more to reach the next rank!",
        "⭐ Amazing progress! You're so close to leveling up!",
        "🎯 Keep this momentum going - you're almost there!"
      ],
      rising_difficult: [
        "📈 Great improvement! Keep building on this success!",
        "💪 Your hard work is paying off - stay consistent!",
        "🌟 Excellent progress - you're moving in the right direction!"
      ],
      stable_achievable: [
        "🎯 You're so close to the next rank - one good day will get you there!",
        "💎 Steady progress! A little push and you'll advance!",
        "⚡ Ready for a breakthrough? The next rank is within reach!"
      ],
      stable_difficult: [
        "🔥 Consistent performance! Ready to take it to the next level?",
        "💯 Solid foundation! Time to accelerate your progress!",
        "🎪 You've got this! Ready for a new challenge?"
      ],
      declining_achievable: [
        "🔄 Easy comeback! You can reclaim your position quickly!",
        "💪 Just a small effort to get back on track!",
        "🎯 Quick recovery possible - you've got the skills!"
      ],
      declining_difficult: [
        "🔄 Time for a fresh start! Every expert was once a beginner!",
        "💪 New opportunities ahead! Focus on steady improvement!",
        "🌟 Reset and rise! Your best days are still coming!"
      ]
    };

    const key = `${trend}_${achievable ? 'achievable' : 'difficult'}` as keyof typeof messages;
    const messageArray = messages[key];
    return this.getDeterministicChoice(userId, messageArray, rank);
  }

  /**
   * Generate deterministic pseudo-random value based on user and time
   * This ensures consistent but varied behavior for gamification
   */
  private getPseudoRandom(userId: string, factor: number = 1): number {
    const userSeed = userId.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    const timeFactor = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Changes daily
    const combined = Math.abs(userSeed + timeFactor * factor);
    return (combined % 1000) / 1000; // Normalize to 0-1
  }

  /**
   * Get deterministic choice from array based on user
   */
  private getDeterministicChoice<T>(userId: string, choices: T[], factor: number = 1): T {
    const pseudoRandom = this.getPseudoRandom(userId, factor);
    const index = Math.floor(pseudoRandom * choices.length);
    return choices[index];
  }

  // Stub implementations for missing methods
  private async getUserStats(_userId: string): Promise<{
    totalPoints: number;
    level: number;
    currentStreak: number;
    averageEngagement: number;
    completionRate: number;
  }> {
    return {
      totalPoints: 1000,
      level: 5,
      currentStreak: 7,
      averageEngagement: 0.85,
      completionRate: 0.92
    };
  }

  private calculatePerformanceTrend(userId: string): "rising" | "stable" | "declining" {
    const trendValue = this.getPseudoRandom(userId, 4);
    if (trendValue > 0.6) return "rising";
    if (trendValue < 0.4) return "declining";
    return "stable";
  }

  private isStreakAtRisk(userId: string): boolean {
    return this.getPseudoRandom(userId, 5) < 0.3; // 30% chance based on user pattern
  }

  private getTimeUntilStreakLoss(_userId: string): number {
    return 8; // 8 hours
  }

  private async checkRankThreat(userId: string): Promise<unknown> {
    return {
      atRisk: this.getPseudoRandom(userId, 6) < 0.2,
      position: Math.floor(this.getPseudoRandom(userId, 7) * 100) + 1,
      threat: 'Medium'
    };
  }

  private getExpiringBonuses(_userId: string): Array<{
    type: string;
    value: number;
    expiresAt: Date;
  }> {
    return [
      {
        type: 'points',
        value: 100,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    ];
  }

  private generateChallengeRequirements(type: string): ChallengeRequirement[] {
    // Use type parameter for customization, but provide default requirements
    const baseRequirements: ChallengeRequirement[] = [
      { 
        action: 'complete_quotes', 
        count: type === 'flash' ? 3 : type === 'daily' ? 5 : 10,
        difficulty_multiplier: 1.0
      },
      { 
        action: 'maintain_streak', 
        count: type === 'flash' ? 1 : type === 'daily' ? 2 : 7,
        difficulty_multiplier: 1.2
      }
    ];
    return baseRequirements;
  }

  private generateChallengeRewards(type: string): {
    completion: GameReward;
    leaderboard_top_10: GameReward;
    leaderboard_top_3: GameReward;
    first_place: GameReward;
  } {
    const basePoints = type === 'flash' ? 200 : type === 'daily' ? 500 : type === 'weekly' ? 1000 : 2000;
    
    return {
      completion: {
        type: 'points',
        value: basePoints,
        description: `Completed ${type} challenge`
      },
      leaderboard_top_10: {
        type: 'badge',
        value: basePoints * 1.5,
        description: `Top 10 in ${type} challenge`
      },
      leaderboard_top_3: {
        type: 'achievement',
        value: basePoints * 2,
        description: `Top 3 in ${type} challenge`
      },
      first_place: {
        type: 'achievement',
        value: basePoints * 3,
        description: `First place in ${type} challenge`
      }
    };
  }

  private initializeOtherRewardSchedules(): void {
    // Initialize default schedule
    this.variableRewardSchedules.set('default', {
      baseReward: 5,
      variabilityFactor: 0.2,
      bonusChance: 0.1,
      bonusMultiplier: 1.5,
      rareBonusChance: 0.02,
      rareBonusMultiplier: 3.0,
      streakBonus: 1,
      surpriseReward: false,
      timeBasedMultiplier: {
        peakHours: [],
        weekendBonus: 1.0,
        monthlyMultiplier: 1.0
      }
    });
  }
}
