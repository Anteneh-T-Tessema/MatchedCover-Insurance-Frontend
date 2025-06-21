'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  FileText, 
  Camera, 
  Upload, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Car,
  Home,
  Heart,
  Building,
  User,
  Send,
  MessageCircle,
  Zap
} from 'lucide-react';

interface ClaimFormData {
  policyNumber: string;
  claimType: string;
  dateOfIncident: string;
  timeOfIncident: string;
  location: string;
  description: string;
  estimatedDamage: string;
  policeReport: boolean;
  injuriesInvolved: boolean;
  witnesses: string;
  contactPhone: string;
  contactEmail: string;
}

const claimTypes = [
  { id: 'auto', label: 'Auto Insurance', icon: Car, description: 'Vehicle accidents, theft, damage' },
  { id: 'home', label: 'Home Insurance', icon: Home, description: 'Property damage, theft, liability' },
  { id: 'life', label: 'Life Insurance', icon: Heart, description: 'Life insurance claims' },
  { id: 'business', label: 'Business Insurance', icon: Building, description: 'Commercial property, liability' },
];

export default function ClaimsPage() {
  const [activeTab, setActiveTab] = useState<'file' | 'track' | 'emergency'>('file');
  const [selectedClaimType, setSelectedClaimType] = useState('');
  const [formData, setFormData] = useState<ClaimFormData>({
    policyNumber: '',
    claimType: '',
    dateOfIncident: '',
    timeOfIncident: '',
    location: '',
    description: '',
    estimatedDamage: '',
    policeReport: false,
    injuriesInvolved: false,
    witnesses: '',
    contactPhone: '',
    contactEmail: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    // Handle success (could redirect or show success message)
  };

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
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-900">Help</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            File a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Claim</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re here to help you through every step of the claims process. 
            File your claim online, track its progress, or get emergency assistance.
          </p>

          {/* Emergency Banner */}
          <div className="bg-red-600 text-white px-6 py-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <AlertCircle className="h-6 w-6" />
              <div>
                <p className="font-semibold">Emergency Claims Hotline</p>
                <p className="text-red-100">Call 1-800-EMERGENCY (24/7)</p>
              </div>
              <a 
                href="tel:1-800-362-7436" 
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('file')}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'file'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>File New Claim</span>
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'track'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Clock className="h-5 w-5" />
                <span>Track Existing Claim</span>
              </button>
              <button
                onClick={() => setActiveTab('emergency')}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'emergency'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <AlertCircle className="h-5 w-5" />
                <span>Emergency Support</span>
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* File New Claim Tab */}
            {activeTab === 'file' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">File a New Claim</h2>
                
                {/* Claim Type Selection */}
                {!selectedClaimType && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Claim Type</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {claimTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedClaimType(type.id)}
                          className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                        >
                          <type.icon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mb-4" />
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.label}</h4>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Claim Form */}
                {selectedClaimType && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {claimTypes.find(t => t.id === selectedClaimType)?.label} Claim
                      </h3>
                      <button
                        onClick={() => setSelectedClaimType('')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Change Type
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Policy Information */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Policy Information</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-2">
                              Policy Number *
                            </label>
                            <input
                              type="text"
                              id="policyNumber"
                              name="policyNumber"
                              value={formData.policyNumber}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your policy number"
                            />
                          </div>
                          <div>
                            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                              Contact Phone *
                            </label>
                            <input
                              type="tel"
                              id="contactPhone"
                              name="contactPhone"
                              value={formData.contactPhone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Incident Details */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h4>
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="dateOfIncident" className="block text-sm font-medium text-gray-700 mb-2">
                                Date of Incident *
                              </label>
                              <input
                                type="date"
                                id="dateOfIncident"
                                name="dateOfIncident"
                                value={formData.dateOfIncident}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label htmlFor="timeOfIncident" className="block text-sm font-medium text-gray-700 mb-2">
                                Time of Incident
                              </label>
                              <input
                                type="time"
                                id="timeOfIncident"
                                name="timeOfIncident"
                                value={formData.timeOfIncident}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                              Location of Incident *
                            </label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Street address, city, state"
                            />
                          </div>

                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                              Description of Incident *
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              required
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                              placeholder="Please provide a detailed description of what happened..."
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="estimatedDamage" className="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Damage Amount
                              </label>
                              <select
                                id="estimatedDamage"
                                name="estimatedDamage"
                                value={formData.estimatedDamage}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select amount range</option>
                                <option value="under-1000">Under $1,000</option>
                                <option value="1000-5000">$1,000 - $5,000</option>
                                <option value="5000-10000">$5,000 - $10,000</option>
                                <option value="10000-25000">$10,000 - $25,000</option>
                                <option value="over-25000">Over $25,000</option>
                                <option value="unknown">Unknown</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="witnesses" className="block text-sm font-medium text-gray-700 mb-2">
                                Witnesses
                              </label>
                              <input
                                type="text"
                                id="witnesses"
                                name="witnesses"
                                value={formData.witnesses}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Names and contact information"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-6">
                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                name="policeReport"
                                checked={formData.policeReport}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">Police report filed</span>
                            </label>
                            
                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                name="injuriesInvolved"
                                checked={formData.injuriesInvolved}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">Injuries involved</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Upload Supporting Documents</h4>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-900 mb-2">Upload Photos and Documents</p>
                          <p className="text-sm text-gray-600 mb-4">
                            Upload photos of damage, police reports, medical records, etc.
                          </p>
                          <input
                            type="file"
                            multiple
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-colors"
                          >
                            <Camera className="h-5 w-5" />
                            <span>Choose Files</span>
                          </label>
                        </div>
                        
                        {uploadedFiles.length > 0 && (
                          <div className="mt-6">
                            <h5 className="font-medium text-gray-900 mb-3">Uploaded Files:</h5>
                            <div className="space-y-2">
                              {uploadedFiles.map((file, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                                  <FileText className="h-5 w-5 text-blue-600" />
                                  <span className="text-sm text-gray-900">{file.name}</span>
                                  <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Submitting Claim...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>Submit Claim</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Track Existing Claim Tab */}
            {activeTab === 'track' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Claim</h2>
                <div className="max-w-2xl">
                  <div className="mb-6">
                    <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Number
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        id="trackingNumber"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your claim number"
                      />
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Track
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Need Your Claim Number?</h3>
                    <p className="text-blue-800 text-sm mb-4">
                      Check your email confirmation or call our support team at 1-800-MATCHED.
                    </p>
                    <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                      Contact Support →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Support Tab */}
            {activeTab === 'emergency' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Support</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                        <h3 className="text-lg font-semibold text-red-900">24/7 Emergency Hotline</h3>
                      </div>
                      <p className="text-red-800 mb-4">
                        For immediate assistance with urgent claims or emergencies.
                      </p>
                      <a
                        href="tel:1-800-362-7436"
                        className="block bg-red-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Call 1-800-EMERGENCY
                      </a>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <MessageCircle className="h-8 w-8 text-blue-600" />
                        <h3 className="text-lg font-semibold text-blue-900">Live Chat Support</h3>
                      </div>
                      <p className="text-blue-800 mb-4">
                        Chat with our AI assistant Maya for immediate help.
                      </p>
                      <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Start Live Chat
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Emergency Situations</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Car className="h-6 w-6 text-gray-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Auto Accidents</h4>
                          <p className="text-sm text-gray-600">Immediate roadside assistance and towing</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Home className="h-6 w-6 text-gray-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Property Damage</h4>
                          <p className="text-sm text-gray-600">Fire, flood, storm damage response</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <Heart className="h-6 w-6 text-gray-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Medical Emergencies</h4>
                          <p className="text-sm text-gray-600">Health insurance claim assistance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claims Process Info */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Claims Process
            </h2>
            <p className="text-lg text-gray-600">
              We make filing and processing claims as simple and fast as possible
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. File Your Claim</h3>
              <p className="text-gray-600">Submit your claim online or call our hotline</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Assignment</h3>
              <p className="text-gray-600">A dedicated adjuster is assigned to your case</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Investigation</h3>
              <p className="text-gray-600">Quick review and assessment of your claim</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Resolution</h3>
              <p className="text-gray-600">Fast approval and payment processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6" />
              <span className="text-lg font-semibold">MatchedCover</span>
            </div>
            <nav className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
