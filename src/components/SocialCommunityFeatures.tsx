'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Award,
  ThumbsUp,
  Clock,
  Target,
  Trophy,
  Zap,
  Crown,
  UserPlus,
  Camera,
  Flag
} from 'lucide-react';

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

export default function SocialCommunityFeatures() {
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges' | 'leaderboard' | 'groups'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [challenges, setChallenges] = useState<CommunityChallenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<'tip' | 'question' | 'experience'>('tip');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real community data from APIs
  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch posts from community API
        const postsResponse = await fetch('/api/community/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setPosts(postsData.posts || []);
        } else {
          throw new Error('Failed to fetch community posts');
        }

        // Fetch challenges from gamification API
        const challengesResponse = await fetch('/api/community/challenges', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (challengesResponse.ok) {
          const challengesData = await challengesResponse.json();
          setChallenges(challengesData.challenges || []);
        } else {
          throw new Error('Failed to fetch community challenges');
        }

        // Fetch leaderboard from user analytics API
        const leaderboardResponse = await fetch('/api/community/leaderboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (leaderboardResponse.ok) {
          const leaderboardData = await leaderboardResponse.json();
          setLeaderboard(leaderboardData.users || []);
        } else {
          throw new Error('Failed to fetch leaderboard');
        }

      } catch (error) {
        console.error('Failed to fetch community data:', error);
        setError('Failed to load community data. Using offline content.');
        
        // Fallback to deterministic community content
        const fallbackPosts = generateFallbackPosts();
        const fallbackChallenges = generateFallbackChallenges();
        const fallbackLeaderboard = generateFallbackLeaderboard();
        
        setPosts(fallbackPosts);
        setChallenges(fallbackChallenges);
        setLeaderboard(fallbackLeaderboard);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
    
    // Set up real-time updates every 30 seconds for fresh content
    const interval = setInterval(fetchCommunityData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Generate deterministic fallback content for offline mode
  const generateFallbackPosts = (): CommunityPost[] => {
    const currentTime = Date.now();
    const dayOfYear = Math.floor(currentTime / (1000 * 60 * 60 * 24)) % 365;
    
    const baseContent = [
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
        type: 'tip' as const,
        timestamp: new Date(currentTime - 2 * 60 * 60 * 1000),
        likes: 23 + (dayOfYear % 10),
        comments: 8 + (dayOfYear % 5),
        shares: 5 + (dayOfYear % 3),
        tags: ['bundling', 'savings', 'Maya'],
        hasLiked: false,
        helpfulVotes: 18 + (dayOfYear % 7)
      },
      {
        id: '2',
        author: {
          name: 'Mike R.',
          avatar: '👨‍🔧',
          level: 8,
          badges: ['🔧', '🚗'],
          insuranceExpertise: 'Auto Insurance'
        },
        content: "Question: Filed my first claim through the app. How long does processing usually take? Anyone have recent experience?",
        type: 'question',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 12,
        comments: 15,
        shares: 2,
        tags: ['claims', 'processing', 'help'],
        hasLiked: true
      },
      {
        id: '3',
        author: {
          name: 'Lisa K.',
          avatar: '👩‍🎨',
          level: 15,
          badges: ['👑', '⭐', '🏅'],
          insuranceExpertise: 'Claims Expert'
        },
        content: "Achievement unlocked! 🎉 Just completed my 50th peer help session. Love helping fellow community members navigate insurance!",
        type: 'achievement',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 47,
        comments: 12,
        shares: 8,
        tags: ['achievement', 'community', 'helping'],
        hasLiked: true
      }
    ];

    return baseContent;
  };

  // Generate fallback challenges when API is unavailable
  const generateFallbackChallenges = (): CommunityChallenge[] => {
    return [
      {
        id: '1',
        title: 'Insurance Knowledge Quiz',
        description: 'Test your insurance knowledge and earn bonus points!',
        type: 'individual',
        reward: '500 Points + Knowledge Badge',
        pointValue: 500,
        participants: 1247,
        timeLeft: '2 days',
        difficulty: 'medium',
        category: 'learning',
        progress: 60,
        status: 'in-progress'
      },
      {
        id: '2',
        title: 'Refer 3 Friends Challenge',
        description: 'Help friends save money and earn amazing rewards!',
        type: 'individual',
        reward: '$100 Gift Card',
        pointValue: 1000,
        participants: 342,
        timeLeft: '1 week',
        difficulty: 'hard',
        category: 'referral',
        status: 'available'
      },
      {
        id: '3',
        title: 'Team Claims Documentation',
        description: 'Work together to document claims best practices',
        type: 'team',
        reward: 'Team Badge + 250 Points Each',
        pointValue: 250,
        participants: 89,
        timeLeft: '3 days',
        difficulty: 'easy',
        category: 'claims',
        status: 'available'
      }
    ];
  };

  // Generate fallback leaderboard when API is unavailable  
  const generateFallbackLeaderboard = (): LeaderboardEntry[] => {
    return [
      {
        rank: 1,
        user: { name: 'Alex Chen', avatar: '🥇', level: 28 },
        points: 15240,
        achievements: 47,
        streak: 127,
        specialization: 'Insurance Guru'
      },
      {
        rank: 2,
        user: { name: 'Maya Assistant', avatar: '🤖', level: 25 },
        points: 14890,
        achievements: 42,
        streak: 365,
        specialization: 'AI Helper'
      },
      {
        rank: 3,
        user: { name: 'Jennifer W.', avatar: '👩‍💼', level: 22 },
        points: 12350,
        achievements: 38,
        streak: 89,
        specialization: 'Claims Expert'
      },
      {
        rank: 4,
        user: { name: 'David S.', avatar: '👨‍🏫', level: 20 },
        points: 11200,
        achievements: 35,
        streak: 67
      },
      {
        rank: 5,
        user: { name: 'Emma T.', avatar: '👩‍🎓', level: 18 },
        points: 9870,
        achievements: 31,
        streak: 45
      }
    ];
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            hasLiked: !post.hasLiked,
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    // Open comment modal or navigate to post detail
    console.log('Opening comments for post:', postId);
    // TODO: Implement comment functionality
    alert('Comment functionality coming soon! This would open a comment modal or navigate to the full post.');
  };

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // Update share count
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, shares: p.shares + 1 }
          : p
      ));
      
      // Copy to clipboard or open share modal
      const shareText = `Check out this insurance tip: "${post.content.substring(0, 100)}..." - MatchedCover Community`;
      if (navigator.share) {
        navigator.share({
          title: 'MatchedCover Community Post',
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Post link copied to clipboard!');
      }
    }
  };

  const handleHelpful = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            helpfulVotes: (post.helpfulVotes || 0) + 1
          }
        : post
    ));
  };

  const handleAddPhoto = () => {
    // TODO: Implement photo upload functionality
    console.log('Add photo clicked');
    alert('Photo upload coming soon! This would open a file picker to add images to your post.');
  };

  const handleAddTag = () => {
    // TODO: Implement tag selection functionality
    console.log('Add tag clicked');
    alert('Tag selection coming soon! This would open a tag picker to categorize your post.');
  };

  const handleNewPost = () => {
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: '👤',
        level: 5,
        badges: ['🆕']
      },
      content: newPostContent,
      type: newPostType,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      tags: [],
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Post Creation */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">👤</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <select
                value={newPostType}
                onChange={(e) => setNewPostType(e.target.value as 'tip' | 'question' | 'experience')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                aria-label="Post type"
              >
                <option value="tip">💡 Share a Tip</option>
                <option value="question">❓ Ask Question</option>
                <option value="experience">📝 Share Experience</option>
              </select>
            </div>
            
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share your insurance knowledge or ask the community..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleAddPhoto}
                  className="text-gray-500 hover:text-purple-600 transition-colors"
                  aria-label="Add photo"
                >
                  <Camera className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleAddTag}
                  className="text-gray-500 hover:text-purple-600 transition-colors"
                  aria-label="Add tag"
                >
                  <Flag className="h-5 w-5" />
                </button>
              </div>
              
              <button
                onClick={handleNewPost}
                disabled={!newPostContent.trim()}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">{post.author.avatar}</div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold text-gray-900">{post.author.name}</span>
                <span className="text-sm text-purple-600">Level {post.author.level}</span>
                <div className="flex space-x-1">
                  {post.author.badges.map((badge, idx) => (
                    <span key={idx} className="text-sm">{badge}</span>
                  ))}
                </div>
                {post.author.insuranceExpertise && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {post.author.insuranceExpertise}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-500">
                  {post.timestamp.toLocaleTimeString()} • {post.type === 'tip' ? '💡' : post.type === 'question' ? '❓' : '🏆'}
                </span>
                {post.helpfulVotes && (
                  <span className="text-sm text-green-600">
                    {post.helpfulVotes} found helpful
                  </span>
                )}
              </div>
              
              <p className="text-gray-800 mb-4">{post.content}</p>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 hover:text-purple-600 transition-colors ${
                    post.hasLiked ? 'text-purple-600' : ''
                  }`}
                >
                  <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                
                <button 
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </button>
                
                <button 
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>{post.shares}</span>
                </button>
                
                {post.type === 'tip' && (
                  <button 
                    onClick={() => handleHelpful(post.id)}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Community Challenges</h3>
        <p className="opacity-90">Complete challenges to earn points, badges, and exclusive rewards!</p>
      </div>

      {challenges.map((challenge) => (
        <div key={challenge.id} className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">{challenge.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {challenge.difficulty}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  challenge.type === 'individual' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {challenge.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{challenge.participants} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{challenge.timeLeft} left</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>{challenge.pointValue} points</span>
                </div>
              </div>

              {challenge.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-purple-600">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-purple-600 h-2 rounded-full transition-all duration-300 ${
                        challenge.progress === 100 ? 'w-full' :
                        challenge.progress >= 75 ? 'w-3/4' :
                        challenge.progress >= 50 ? 'w-1/2' :
                        challenge.progress >= 25 ? 'w-1/4' : 'w-1/12'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right ml-6">
              <div className="text-lg font-bold text-purple-600 mb-1">{challenge.reward}</div>
              <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                challenge.status === 'available' ? 'bg-purple-600 text-white hover:bg-purple-700' :
                challenge.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {challenge.status === 'available' && 'Join Challenge'}
                {challenge.status === 'in-progress' && 'Continue'}
                {challenge.status === 'completed' && 'Completed ✓'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
          <Trophy className="h-6 w-6" />
          <span>Community Leaderboard</span>
        </h3>
        <p className="opacity-90">Top contributors making insurance easier for everyone!</p>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`bg-white rounded-xl shadow-sm border p-4 ${
              entry.rank <= 3 ? 'ring-2 ring-yellow-200' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                  entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
                  entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  #{entry.rank}
                </div>
                
                <div className="text-2xl">{entry.user.avatar}</div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{entry.user.name}</span>
                    <span className="text-sm text-purple-600">Level {entry.user.level}</span>
                    {entry.rank <= 3 && <Crown className="h-4 w-4 text-yellow-500" />}
                  </div>
                  {entry.specialization && (
                    <span className="text-sm text-gray-600">{entry.specialization}</span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">{entry.points.toLocaleString()}</div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{entry.achievements} achievements</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>{entry.streak} day streak</span>
                </span>
              </div>
              
              <button className="text-purple-600 hover:text-purple-700 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <span>Insurance Communities</span>
        </h3>
        <p className="opacity-90">Join specialized groups based on your interests and expertise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            name: 'New to Insurance',
            members: '2.4k',
            icon: '🆕',
            description: 'Perfect for insurance beginners',
            activity: 'Very Active'
          },
          {
            name: 'Claims Experts',
            members: '1.8k',
            icon: '📋',
            description: 'Share claims experience and tips',
            activity: 'Active'
          },
          {
            name: 'Money Savers',
            members: '3.2k',
            icon: '💰',
            description: 'Find the best deals and discounts',
            activity: 'Very Active'
          },
          {
            name: 'Business Insurance',
            members: '950',
            icon: '🏢',
            description: 'Commercial insurance discussions',
            activity: 'Moderate'
          }
        ].map((group, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-3xl">{group.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900">{group.name}</h4>
                <p className="text-sm text-gray-600">{group.members} members</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{group.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm px-2 py-1 rounded-full ${
                group.activity === 'Very Active' ? 'bg-green-100 text-green-700' :
                group.activity === 'Active' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {group.activity}
              </span>
              
              <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 transition-colors">
                <UserPlus className="h-4 w-4" />
                <span>Join</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center space-x-2">
            <Users className="h-8 w-8 text-purple-600" />
            <span>MatchedCover Community</span>
          </h1>
          <p className="text-xl text-gray-600">Connect, learn, and save together</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-1 flex">
            {[
              { id: 'feed', label: 'Community Feed', icon: MessageCircle },
              { id: 'challenges', label: 'Challenges', icon: Target },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'groups', label: 'Groups', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'feed' | 'challenges' | 'leaderboard' | 'groups')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'challenges' && renderChallenges()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'groups' && renderGroups()}
      </div>
    </div>
  );
}
