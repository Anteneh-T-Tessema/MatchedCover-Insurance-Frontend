'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpDown, 
  Star, 
  Clock, 
  TrendingDown, 
  TrendingUp,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Zap,
  Award
} from 'lucide-react';

interface InsuranceProvider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  monthlyRate: number;
  annualRate: number;
  features: string[];
  strengths: string[];
  trending: 'up' | 'down' | 'stable';
  priceChange: number; // percentage change from last update
  responseTime: number; // in milliseconds
  availability: 'instant' | 'pending' | 'unavailable';
  specialOffers?: string[];
  mgaPartner?: boolean;
}

interface RateComparisonProps {
  insuranceType: 'auto' | 'home' | 'life' | 'business';
  userProfile?: {
    age?: number;
    location?: string;
    creditScore?: string;
    previousClaims?: number;
  };
}

export default function RealTimeRateComparison({ 
  insuranceType = 'auto' 
}: RateComparisonProps) {
  const [providers, setProviders] = useState<InsuranceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [sortBy, setSortBy] = useState<'rate' | 'rating' | 'features'>('rate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<'all' | 'instant' | 'top-rated'>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock real-time rate data
  const generateMockRates = (): InsuranceProvider[] => {
    const baseProviders = [
      {
        id: 'matchedcover',
        name: 'MatchedCover',
        logo: '🛡️',
        rating: 4.9,
        reviewCount: 12000,
        features: ['AI-Powered Matching', 'Instant Claims', '24/7 Support', 'Gamified Experience'],
        strengths: ['Best AI Technology', 'Fastest Claims', 'Highest Customer Satisfaction'],
        mgaPartner: true,
        specialOffers: ['New Customer: 25% Off', 'Multi-Policy: 15% Off']
      },
      {
        id: 'progressive',
        name: 'Progressive',
        logo: '🏢',
        rating: 4.2,
        reviewCount: 85000,
        features: ['Snapshot Program', 'Name Your Price', 'Pet Insurance'],
        strengths: ['Usage-Based Insurance', 'Flexible Pricing']
      },
      {
        id: 'geico',
        name: 'GEICO',
        logo: '🦎',
        rating: 4.1,
        reviewCount: 120000,
        features: ['Emergency Roadside', 'Military Discounts', 'Mobile App'],
        strengths: ['Military Benefits', 'Roadside Assistance']
      },
      {
        id: 'state-farm',
        name: 'State Farm',
        logo: '🏘️',
        rating: 4.0,
        reviewCount: 95000,
        features: ['Agent Network', 'Drive Safe App', 'Banking Services'],
        strengths: ['Local Agents', 'Banking Integration']
      },
      {
        id: 'allstate',
        name: 'Allstate',
        logo: '👐',
        rating: 3.9,
        reviewCount: 78000,
        features: ['Accident Forgiveness', 'Safe Driving Bonus', 'Digital Tools'],
        strengths: ['Accident Forgiveness', 'Digital Experience']
      },
      {
        id: 'lemonade',
        name: 'Lemonade',
        logo: '🍋',
        rating: 4.3,
        reviewCount: 35000,
        features: ['AI Claims', 'Giveback Program', 'Renters Focus'],
        strengths: ['Fast Claims', 'Social Impact']
      }
    ];

    return baseProviders.map(provider => ({
      ...provider,
      monthlyRate: Math.floor(Math.random() * 200) + 80 + (provider.id === 'matchedcover' ? -30 : 0), // MatchedCover advantage
      annualRate: 0, // Will be calculated
      trending: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      priceChange: (Math.random() - 0.5) * 10, // -5% to +5%
      responseTime: Math.floor(Math.random() * 2000) + 100, // 100-2100ms
      availability: provider.id === 'matchedcover' ? 'instant' : 
                   ['instant', 'pending', 'unavailable'][Math.floor(Math.random() * 3)] as 'instant' | 'pending' | 'unavailable'
    })).map(provider => ({
      ...provider,
      annualRate: provider.monthlyRate * 12 * 0.9 // 10% discount for annual
    }));
  };

  // Simulate real-time updates
  useEffect(() => {
    const updateRates = () => {
      setIsLoading(true);
      setTimeout(() => {
        setProviders(generateMockRates());
        setLastUpdate(new Date());
        setIsLoading(false);
      }, 1000);
    };

    updateRates();

    if (autoRefresh) {
      const interval = setInterval(updateRates, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Sorting logic
  const sortedProviders = [...providers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rate':
        comparison = a.monthlyRate - b.monthlyRate;
        break;
      case 'rating':
        comparison = b.rating - a.rating;
        break;
      case 'features':
        comparison = b.features.length - a.features.length;
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Filtering logic
  const filteredProviders = sortedProviders.filter(provider => {
    switch (filterBy) {
      case 'instant':
        return provider.availability === 'instant';
      case 'top-rated':
        return provider.rating >= 4.2;
      default:
        return true;
    }
  });

  const handleSort = (field: 'rate' | 'rating' | 'features') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ArrowUpDown className="h-6 w-6 text-purple-600" />
            <span>Real-Time Rate Comparison</span>
          </h2>
          <p className="text-gray-600 mt-1">
            Live rates from top {insuranceType} insurance providers
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              autoRefresh 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span>{autoRefresh ? 'Auto' : 'Manual'}</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'instant' | 'top-rated')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              aria-label="Filter providers"
            >
              <option value="all">All Providers</option>
              <option value="instant">Instant Quotes</option>
              <option value="top-rated">Top Rated (4.2+)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <button
            onClick={() => handleSort('rate')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              sortBy === 'rate' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Price {sortBy === 'rate' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('rating')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              sortBy === 'rating' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('features')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              sortBy === 'features' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Features {sortBy === 'features' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-6 w-6 text-purple-600 animate-spin" />
            <span className="text-gray-600">Updating rates...</span>
          </div>
        </div>
      )}

      {/* Rate Comparison Table */}
      {!isLoading && (
        <div className="space-y-4">
          {filteredProviders.map((provider, index) => (
            <div
              key={provider.id}
              className={`border rounded-xl p-6 transition-all hover:shadow-md ${
                provider.mgaPartner 
                  ? 'border-purple-200 bg-purple-50' 
                  : 'border-gray-200'
              } ${index === 0 ? 'ring-2 ring-green-200' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank Badge */}
                  {index === 0 && (
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      #{index + 1}
                    </div>
                  )}
                  
                  {/* Provider Info */}
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{provider.logo}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        {provider.mgaPartner && (
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            MGA Partner
                          </span>
                        )}
                        {index === 0 && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>Best Rate</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {provider.rating} ({provider.reviewCount.toLocaleString()} reviews)
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {provider.responseTime}ms response
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${provider.monthlyRate}/mo
                      </div>
                      <div className="text-sm text-gray-600">
                        ${provider.annualRate}/year (save 10%)
                      </div>
                    </div>
                    
                    {/* Price Trend */}
                    <div className="flex items-center space-x-1">
                      {provider.trending === 'up' && (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      )}
                      {provider.trending === 'down' && (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      )}
                      <span className={`text-xs ${
                        provider.priceChange > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {provider.priceChange > 0 ? '+' : ''}{provider.priceChange.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="mt-2">
                    {provider.availability === 'instant' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm">Instant Quote</span>
                      </div>
                    )}
                    {provider.availability === 'pending' && (
                      <div className="flex items-center space-x-1 text-yellow-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Quote Pending</span>
                      </div>
                    )}
                    {provider.availability === 'unavailable' && (
                      <div className="flex items-center space-x-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Unavailable</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features & Special Offers */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {provider.specialOffers && provider.specialOffers.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Special Offers</h4>
                    <div className="space-y-1">
                      {provider.specialOffers.map((offer, idx) => (
                        <div key={idx} className="text-xs text-purple-600 flex items-center space-x-1">
                          <Zap className="h-3 w-3" />
                          <span>{offer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-4 flex justify-end">
                <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  provider.availability === 'instant'
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : provider.availability === 'pending'
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                  {provider.availability === 'instant' && 'Get Quote Now'}
                  {provider.availability === 'pending' && 'Request Quote'}
                  {provider.availability === 'unavailable' && 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Market Summary */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Market Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-purple-600">
              ${Math.min(...providers.map(p => p.monthlyRate))}
            </div>
            <div className="text-xs text-gray-600">Lowest Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">
              ${Math.round(providers.reduce((sum, p) => sum + p.monthlyRate, 0) / providers.length)}
            </div>
            <div className="text-xs text-gray-600">Average Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {providers.filter(p => p.availability === 'instant').length}
            </div>
            <div className="text-xs text-gray-600">Instant Quotes</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {providers.filter(p => p.rating >= 4.2).length}
            </div>
            <div className="text-xs text-gray-600">Top Rated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
