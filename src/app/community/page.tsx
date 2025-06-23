'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, MessageCircle, Heart, Share2, Eye, TrendingUp, Filter, Search, Award, Star } from 'lucide-react';

interface PostData {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  likes: number;
  comments: number;
  views: number;
  date: string;
  featured: boolean;
  verified: boolean;
}

interface MemberData {
  id: string;
  name: string;
  avatar: string;
  title: string;
  posts: number;
  reputation: number;
  verified: boolean;
}

const postsData: PostData[] = [
  {
    id: '1',
    title: 'How I saved $800 on my home insurance with MatchedCover',
    content: 'After using MatchedCover\'s comparison tool, I discovered I was overpaying by almost $800 annually. Here\'s my step-by-step process...',
    author: 'Sarah Johnson',
    authorAvatar: '/api/placeholder/40/40',
    category: 'Success Stories',
    likes: 127,
    comments: 23,
    views: 1520,
    date: '2024-01-15',
    featured: true,
    verified: true
  },
  {
    id: '2',
    title: 'Understanding deductibles: A beginner\'s guide',
    content: 'Many people are confused about how deductibles work. Let me break it down in simple terms that everyone can understand...',
    author: 'Mike Chen',
    authorAvatar: '/api/placeholder/40/40',
    category: 'Education',
    likes: 89,
    comments: 17,
    views: 890,
    date: '2024-01-12',
    featured: false,
    verified: false
  },
  {
    id: '3',
    title: 'My experience filing a claim after the storm',
    content: 'Last month\'s storm damaged my roof. Here\'s how I navigated the claims process and what I learned along the way...',
    author: 'Jennifer Lee',
    authorAvatar: '/api/placeholder/40/40',
    category: 'Claims Experience',
    likes: 156,
    comments: 34,
    views: 2100,
    date: '2024-01-10',
    featured: true,
    verified: true
  },
  {
    id: '4',
    title: 'Life insurance for young professionals: Is it worth it?',
    content: 'I\'m 28 and debt-free. Do I really need life insurance? Here\'s what I discovered after researching this topic extensively...',
    author: 'Alex Rodriguez',
    authorAvatar: '/api/placeholder/40/40',
    category: 'Life Insurance',
    likes: 67,
    comments: 29,
    views: 1340,
    date: '2024-01-08',
    featured: false,
    verified: false
  },
  {
    id: '5',
    title: 'Renters insurance saved me from financial disaster',
    content: 'When my apartment was burglarized, I thought I\'d lost everything. Thankfully, my renters insurance policy covered it all...',
    author: 'David Kim',
    authorAvatar: '/api/placeholder/40/40',
    category: 'Success Stories',
    likes: 203,
    comments: 41,
    views: 2850,
    date: '2024-01-05',
    featured: false,
    verified: true
  }
];

const topMembers: MemberData[] = [
  {
    id: '1',
    name: 'Insurance Expert',
    avatar: '/api/placeholder/50/50',
    title: 'Community Moderator',
    posts: 245,
    reputation: 4.9,
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/50/50',
    title: 'Helpful Member',
    posts: 89,
    reputation: 4.8,
    verified: true
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: '/api/placeholder/50/50',
    title: 'Rising Star',
    posts: 34,
    reputation: 4.6,
    verified: false
  }
];

const categories = ['All', 'Success Stories', 'Education', 'Claims Experience', 'Life Insurance', 'Home Insurance', 'Auto Insurance'];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPosts = postsData
    .filter(post => 
      (selectedCategory === 'All' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return (b.likes + b.comments) - (a.likes + a.comments);
        default:
          return 0;
      }
    });

  const featuredPosts = postsData.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MatchedCover</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/guides" className="text-gray-600 hover:text-gray-900">Guides</Link>
              <Link href="/videos" className="text-gray-600 hover:text-gray-900">Videos</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with fellow members, share experiences, get expert advice, 
            and learn from real insurance success stories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Join Community
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Discussion
            </button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15,000+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">8,500+</div>
              <div className="text-gray-600">Discussions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Helpful Votes</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2,300+</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Discussions</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{post.author}</span>
                        {post.verified && (
                          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Sort discussions by"
                    >
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{post.author}</span>
                          {post.verified && (
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-gray-600" title="Share post">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Join Discussion →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Top Contributors */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  {topMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 text-sm">{member.name}</span>
                          {member.verified && (
                            <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{member.title}</div>
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <span>{member.posts} posts</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{member.reputation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">#HomeInsurance</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>245</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">#ClaimsHelp</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>189</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">#LifeInsurance</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>156</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">#SaveMoney</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <TrendingUp className="h-3 w-3" />
                      <span>134</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Be respectful and helpful</li>
                  <li>• Share real experiences</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Protect personal information</li>
                </ul>
                <Link href="/community-guidelines" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-3 inline-block">
                  Read full guidelines →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized advice, share your experiences, and help others make informed insurance decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Account
            </button>
            <Link 
              href="/quote"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Get Quote First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
