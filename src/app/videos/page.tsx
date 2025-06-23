'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Play, Filter, Search, Star, Eye, Calendar } from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  category: string;
  thumbnail: string;
  rating: number;
  date: string;
  featured: boolean;
}

const videoData: VideoData[] = [
  {
    id: '1',
    title: 'How MatchedCover Works - Complete Overview',
    description: 'Learn how our AI-powered platform matches you with the perfect insurance coverage in minutes.',
    duration: '3:45',
    views: '12.5K',
    category: 'Getting Started',
    thumbnail: '/api/placeholder/400/225',
    rating: 4.9,
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Understanding Home Insurance Coverage',
    description: 'Everything you need to know about protecting your home and belongings.',
    duration: '5:20',
    views: '8.3K',
    category: 'Home Insurance',
    thumbnail: '/api/placeholder/400/225',
    rating: 4.8,
    date: '2024-01-10',
    featured: true
  },
  {
    id: '3',
    title: 'Life Insurance Made Simple',
    description: 'A beginner-friendly guide to choosing the right life insurance policy.',
    duration: '4:15',
    views: '15.2K',
    category: 'Life Insurance',
    thumbnail: '/api/placeholder/400/225',
    rating: 4.9,
    date: '2024-01-05',
    featured: false
  },
  {
    id: '4',
    title: 'Renters Insurance: What You Need to Know',
    description: 'Protect your belongings as a renter with the right insurance coverage.',
    duration: '3:30',
    views: '6.7K',
    category: 'Renters Insurance',
    thumbnail: '/api/placeholder/400/225',
    rating: 4.7,
    date: '2023-12-28',
    featured: false
  },
  {
    id: '5',
    title: 'Filing Claims: Step-by-Step Process',
    description: 'Learn how to file insurance claims efficiently and get the best outcomes.',
    duration: '6:10',
    views: '9.8K',
    category: 'Claims',
    thumbnail: '/api/placeholder/400/225',
    rating: 4.8,
    date: '2023-12-20',
    featured: false
  },
  {
    id: '6',
    title: 'Insurance Myths Debunked',
    description: 'Common misconceptions about insurance that could cost you money.',
    duration: '4:45',
    views: '11.2K',
    category: 'Education',
    thumbnail: '/api/placeholder/400/225',
    rating: 4.6,
    date: '2023-12-15',
    featured: false
  }
];

const categories = ['All', 'Getting Started', 'Home Insurance', 'Life Insurance', 'Renters Insurance', 'Claims', 'Education'];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredVideos = videoData
    .filter(video => 
      (selectedCategory === 'All' || video.category === selectedCategory) &&
      (video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       video.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return parseFloat(b.views.replace('K', '')) - parseFloat(a.views.replace('K', ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const featuredVideos = videoData.filter(video => video.featured);

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
            Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Video Library</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn everything about insurance through our comprehensive video tutorials, 
            guides, and expert insights.
          </p>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Videos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-3">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                  <span className="text-gray-400">{new Date(video.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
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
                  title="Sort videos by"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative rounded-t-xl overflow-hidden bg-gray-900 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    {video.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{video.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(video.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized insurance quotes in minutes with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/quote"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Quote Now
            </Link>
            <Link 
              href="/guides"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
