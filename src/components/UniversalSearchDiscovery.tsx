'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Star, 
  Clock, 
  Eye,
  Bookmark,
  Share2,
  Zap,
  TrendingUp,
  Globe,
  Languages
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'product' | 'article' | 'tool' | 'carrier' | 'agent';
  title: string;
  description: string;
  category: string;
  location?: string;
  rating?: number;
  price?: number;
  currency?: string;
  language: string;
  lastUpdated: Date;
  tags: string[];
  popularity: number;
  thumbnail?: string;
}

interface SearchFilters {
  type: string[];
  category: string[];
  location: string;
  priceRange: [number, number];
  rating: number;
  language: string;
  dateRange: string;
}

export default function UniversalSearchDiscovery() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    type: [],
    category: [],
    location: '',
    priceRange: [0, 1000],
    rating: 0,
    language: 'all',
    dateRange: 'all'
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price' | 'date' | 'popularity'>('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results (globally applicable)
  const mockResults: SearchResult[] = useMemo(() => [
    {
      id: '1',
      type: 'product',
      title: 'Comprehensive Auto Insurance',
      description: 'Full coverage auto insurance with global assistance and local claim support.',
      category: 'Auto Insurance',
      location: 'Global',
      rating: 4.8,
      price: 150,
      currency: 'USD',
      language: 'en',
      lastUpdated: new Date('2024-01-15'),
      tags: ['auto', 'comprehensive', 'global'],
      popularity: 95,
      thumbnail: '🚗'
    },
    {
      id: '2',
      type: 'tool',
      title: 'Universal Premium Calculator',
      description: 'AI-powered premium calculator that works across all countries and currencies.',
      category: 'Tools',
      location: 'Worldwide',
      rating: 4.9,
      language: 'multi',
      lastUpdated: new Date('2024-01-20'),
      tags: ['calculator', 'premium', 'ai', 'universal'],
      popularity: 88,
      thumbnail: '🧮'
    },
    {
      id: '3',
      type: 'article',
      title: 'Global Insurance Trends 2024',
      description: 'Latest trends in insurance technology and customer experience worldwide.',
      category: 'Insights',
      location: 'International',
      rating: 4.6,
      language: 'en',
      lastUpdated: new Date('2024-01-18'),
      tags: ['trends', '2024', 'global', 'insights'],
      popularity: 72,
      thumbnail: '📊'
    },
    {
      id: '4',
      type: 'carrier',
      title: 'TechnoSecure Insurance',
      description: 'Leading digital-first insurance carrier with presence in 50+ countries.',
      category: 'Carriers',
      location: 'Multinational',
      rating: 4.7,
      price: 120,
      currency: 'USD',
      language: 'multi',
      lastUpdated: new Date('2024-01-22'),
      tags: ['digital', 'carrier', 'multinational'],
      popularity: 83,
      thumbnail: '🏢'
    },
    {
      id: '5',
      type: 'agent',
      title: 'Maya AI Assistant',
      description: 'Multilingual AI agent providing 24/7 insurance guidance and support.',
      category: 'AI Agents',
      location: 'Virtual',
      rating: 4.9,
      language: 'multi',
      lastUpdated: new Date('2024-01-25'),
      tags: ['ai', 'multilingual', 'assistant', '24/7'],
      popularity: 92,
      thumbnail: '🤖'
    }
  ], []);

  // Universal search logic
  const filteredResults = useMemo(() => {
    const filtered = mockResults.filter(result => {
      // Text search
      const searchText = query.toLowerCase();
      const matchesText = searchText === '' || 
        result.title.toLowerCase().includes(searchText) ||
        result.description.toLowerCase().includes(searchText) ||
        result.tags.some(tag => tag.toLowerCase().includes(searchText));

      // Type filter
      const matchesType = filters.type.length === 0 || filters.type.includes(result.type);

      // Category filter
      const matchesCategory = filters.category.length === 0 || filters.category.includes(result.category);

      // Rating filter
      const matchesRating = !result.rating || result.rating >= filters.rating;

      // Language filter
      const matchesLanguage = filters.language === 'all' || 
        result.language === filters.language || 
        result.language === 'multi';

      // Price filter
      const matchesPrice = !result.price || 
        (result.price >= filters.priceRange[0] && result.price <= filters.priceRange[1]);

      return matchesText && matchesType && matchesCategory && matchesRating && matchesLanguage && matchesPrice;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'date':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        case 'popularity':
          return b.popularity - a.popularity;
        default: // relevance
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [query, filters, sortBy, mockResults]);

  // Simulate search with loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredResults]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | string[] | number | [number, number]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      category: [],
      location: '',
      priceRange: [0, 1000],
      rating: 0,
      language: 'all',
      dateRange: 'all'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
          <Search className="h-8 w-8 text-purple-600" />
          <span>Universal Search & Discovery</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover insurance products, tools, and insights across all markets and languages
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, tools, articles, carriers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-label="Sort search results"
            >
              <option value="relevance">Most Relevant</option>
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="date">Most Recent</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="space-y-2">
                  {['product', 'tool', 'article', 'carrier', 'agent'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...filters.type, type]
                            : filters.type.filter(t => t !== type);
                          handleFilterChange('type', newTypes);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Languages className="inline h-4 w-4 mr-1" />
                  Language
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  aria-label="Select language filter"
                >
                  <option value="all">All Languages</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                  <option value="multi">Multilingual</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="inline h-4 w-4 mr-1" />
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  aria-label="Select minimum rating filter"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              {/* Quick Actions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Actions</label>
                <div className="space-y-2">
                  <button
                    onClick={clearFilters}
                    className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full px-3 py-2 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {isLoading ? 'Searching...' : `${results.length} Results`}
            </h2>
            <div className="text-sm text-gray-500">
              {query && `for "${query}"`}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {results.map(result => (
                <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{result.thumbnail}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            <span className="capitalize">{result.type}</span>
                            <span>•</span>
                            <span>{result.category}</span>
                            {result.location && (
                              <>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{result.location}</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{result.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        {result.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{result.rating}</span>
                          </div>
                        )}
                        
                        {result.price && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>{result.currency}{result.price}/month</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <Globe className="h-4 w-4 text-blue-500" />
                          <span className="uppercase">{result.language === 'multi' ? 'Multi' : result.language}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{result.lastUpdated.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {result.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Bookmark">
                        <Bookmark className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Share">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Searches */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Trending</span>
            </h3>
            <div className="space-y-2">
              {['Auto Insurance', 'Health Coverage', 'Travel Insurance', 'Premium Calculator', 'Claims Process'].map(trend => (
                <button
                  key={trend}
                  onClick={() => setQuery(trend)}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  {trend}
                </button>
              ))}
            </div>
          </div>

          {/* Global Features */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Universal Features</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span>Multi-language support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-green-500" />
                <span>Real-time search results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-purple-500" />
                <span>Advanced filtering</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4 text-orange-500" />
                <span>Intelligent sorting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
