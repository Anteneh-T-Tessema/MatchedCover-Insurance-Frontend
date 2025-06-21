'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Heart, Zap, MapPin, Clock, DollarSign, Briefcase, TrendingUp, Star, Award, Coffee } from 'lucide-react';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Positions' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'operations', name: 'Operations' },
    { id: 'customer-success', name: 'Customer Success' }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      department: 'engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      salary: '$150K - $220K',
      description: 'Build the future of insurance technology with our AI-powered platform. Work with React, Node.js, and cutting-edge AI technologies.',
      requirements: ['5+ years of full-stack development', 'Experience with React and Node.js', 'Knowledge of AI/ML technologies preferred'],
      featured: true
    },
    {
      id: 2,
      title: 'Product Manager - AI Platform',
      department: 'product',
      location: 'Remote / New York',
      type: 'Full-time',
      salary: '$140K - $180K',
      description: 'Lead product strategy for our AI-powered insurance platform. Define roadmaps and work closely with engineering and design teams.',
      requirements: ['3+ years of product management experience', 'Experience with AI/ML products', 'Strong analytical skills'],
      featured: true
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'design',
      location: 'Remote / Austin',
      type: 'Full-time',
      salary: '$110K - $150K',
      description: 'Design intuitive user experiences for our gamified insurance platform. Create delightful interactions that simplify complex processes.',
      requirements: ['4+ years of UX/UI design experience', 'Portfolio showcasing complex product design', 'Experience with design systems'],
      featured: false
    },
    {
      id: 4,
      title: 'Data Scientist - AI/ML',
      department: 'engineering',
      location: 'Remote / Seattle',
      type: 'Full-time',
      salary: '$160K - $200K',
      description: 'Develop machine learning models for risk assessment, pricing optimization, and fraud detection in our insurance platform.',
      requirements: ['PhD or MS in Computer Science/Statistics', 'Experience with Python, TensorFlow/PyTorch', '3+ years in ML/AI roles'],
      featured: true
    },
    {
      id: 5,
      title: 'Sales Development Representative',
      department: 'sales',
      location: 'Remote / Chicago',
      type: 'Full-time',
      salary: '$60K - $80K + Commission',
      description: 'Drive business growth by identifying and qualifying potential enterprise customers for our innovative insurance solutions.',
      requirements: ['1-3 years of sales experience', 'Strong communication skills', 'Experience with CRM tools'],
      featured: false
    },
    {
      id: 6,
      title: 'Content Marketing Manager',
      department: 'marketing',
      location: 'Remote / Los Angeles',
      type: 'Full-time',
      salary: '$90K - $120K',
      description: 'Create compelling content that educates customers about insurance and showcases our innovative AI-powered solutions.',
      requirements: ['3+ years of content marketing experience', 'Strong writing and editing skills', 'Experience in fintech/insurtech preferred'],
      featured: false
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness stipends'
    },
    {
      icon: Clock,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO'
    },
    {
      icon: DollarSign,
      title: 'Equity & Growth',
      description: 'Competitive equity package and clear career development paths'
    },
    {
      icon: Coffee,
      title: 'Great Perks',
      description: 'Home office setup, learning budget, and team retreats'
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Join the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Insurance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We&apos;re building AI-powered insurance solutions that make protection simple, affordable, and accessible. 
            Join our mission to revolutionize how people think about insurance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#openings"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Briefcase className="h-5 w-5 mr-2" />
              View Open Positions
            </a>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Learn About Us
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-600">Open Positions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.8★</div>
              <div className="text-sm text-gray-600">Glassdoor Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">Remote</div>
              <div className="text-sm text-gray-600">First Culture</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MatchedCover?</h2>
            <p className="text-xl text-gray-600">We believe great people do their best work when they&apos;re supported, challenged, and inspired</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Customer First',
                description: 'Every decision we make starts with how it benefits our customers. We obsess over creating experiences that delight and protect.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'We embrace new technologies and bold ideas. AI, gamification, and automation help us solve problems others can&apos;t.'
              },
              {
                icon: TrendingUp,
                title: 'Growth Mindset',
                description: 'We believe in continuous learning and improvement. Failure is a stepping stone to success, not a roadblock.'
              },
              {
                icon: Heart,
                title: 'Empathy',
                description: 'Insurance is about protection during life&apos;s difficult moments. We approach every interaction with compassion and understanding.'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We set high standards and hold ourselves accountable. Good enough isn&apos;t good enough when people depend on us.'
              },
              {
                icon: Star,
                title: 'Transparency',
                description: 'We believe in honest communication, clear processes, and open collaboration. No hidden agendas or office politics.'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your next opportunity with us</p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDepartment === dept.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                  job.featured ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      {job.featured && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No positions available in this department at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon or contact us about future opportunities!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don&apos;t See the Perfect Role?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We&apos;re always looking for talented people. Send us your resume and let&apos;s talk about the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@matchedcover.com"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Send Your Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact HR Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MatchedCover</span>
              </div>
              <p className="text-gray-400">
                Making insurance simple, transparent, and affordable for everyone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/home-insurance" className="hover:text-white transition-colors">Home Insurance</Link></li>
                <li><Link href="/auto-insurance" className="hover:text-white transition-colors">Auto Insurance</Link></li>
                <li><Link href="/life-insurance" className="hover:text-white transition-colors">Life Insurance</Link></li>
                <li><Link href="/renters-insurance" className="hover:text-white transition-colors">Renters Insurance</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/claims" className="hover:text-white transition-colors">File a Claim</Link></li>
                <li><a href="tel:1-800-555-0123" className="hover:text-white transition-colors">1-800-555-0123</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MatchedCover. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
