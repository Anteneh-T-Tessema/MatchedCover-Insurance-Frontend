import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                MatchedCover
              </span>
            </Link>
            
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> January 1, 2024<br />
            <strong>Last Updated:</strong> June 19, 2025
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Your Privacy Matters</h2>
            <p className="text-blue-800">
              At MatchedCover, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our insurance comparison platform.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">
            We collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Request insurance quotes or comparisons</li>
            <li>Create an account on our platform</li>
            <li>Contact us for customer support</li>
            <li>Subscribe to our newsletters or communications</li>
            <li>Participate in surveys or promotional activities</li>
          </ul>

          <p className="text-gray-700 mb-4">This information may include:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Name, address, phone number, and email address</li>
            <li>Date of birth and Social Security number</li>
            <li>Driver&apos;s license number and driving history</li>
            <li>Property information (for home insurance)</li>
            <li>Vehicle information (for auto insurance)</li>
            <li>Health information (for life and health insurance)</li>
            <li>Financial information relevant to insurance coverage</li>
            <li>Claims history and credit information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 mb-4">
            When you visit our website or use our services, we automatically collect certain information, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>IP address and geographic location</li>
            <li>Browser type and version</li>
            <li>Operating system and device information</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring website and search terms used</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          
          <p className="text-gray-700 mb-4">We use the information we collect for the following purposes:</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Insurance Services</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Provide accurate insurance quotes and comparisons</li>
            <li>Match you with appropriate insurance providers</li>
            <li>Facilitate the application and enrollment process</li>
            <li>Process payments and manage your policies</li>
            <li>Handle claims and customer service requests</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Platform Operations</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Maintain and improve our website and services</li>
            <li>Personalize your user experience</li>
            <li>Prevent fraud and ensure platform security</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Analyze usage patterns and optimize performance</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Communications</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Send policy updates and renewal notifications</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Share relevant insurance information and tips</li>
            <li>Send promotional offers (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Insurance Partners</h3>
          <p className="text-gray-700 mb-4">
            We share your information with licensed insurance companies and agents to provide you with quotes and coverage options. 
            These partners are bound by their own privacy policies and regulatory requirements.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Service Providers</h3>
          <p className="text-gray-700 mb-4">
            We may share your information with trusted third-party service providers who assist us in:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Payment processing and financial services</li>
            <li>Customer relationship management</li>
            <li>Marketing and analytics services</li>
            <li>Technical support and website hosting</li>
            <li>Identity verification and fraud prevention</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Legal Requirements</h3>
          <p className="text-gray-700 mb-6">
            We may disclose your information when required by law, regulation, or legal process, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Compliance with subpoenas or court orders</li>
            <li>Cooperation with law enforcement investigations</li>
            <li>Protection of our rights and property</li>
            <li>Prevention of fraud or illegal activities</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
          
          <p className="text-gray-700 mb-4">
            We implement comprehensive security measures to protect your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li><strong>Encryption:</strong> All sensitive data is encrypted in transit and at rest using industry-standard protocols</li>
            <li><strong>Access Controls:</strong> Strict access controls ensure only authorized personnel can access your information</li>
            <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
            <li><strong>Secure Infrastructure:</strong> Our systems are hosted on secure, certified cloud platforms</li>
            <li><strong>Employee Training:</strong> All staff receive regular privacy and security training</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Security Notice</h3>
            <p className="text-amber-800">
              While we implement robust security measures, no system is 100% secure. We encourage you to protect your account 
              by using strong passwords and not sharing your login credentials with others.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Privacy Rights</h2>
          
          <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Access and Portability</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Request a copy of the personal information we hold about you</li>
            <li>Receive your data in a structured, machine-readable format</li>
            <li>Transfer your data to another service provider</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Correction and Deletion</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information (subject to legal requirements)</li>
            <li>Withdraw consent for certain data processing activities</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Marketing Preferences</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Opt out of marketing communications at any time</li>
            <li>Manage your communication preferences in your account settings</li>
            <li>Unsubscribe from emails using the links provided</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
          
          <p className="text-gray-700 mb-4">
            We use cookies and similar technologies to enhance your experience and improve our services:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Types of Cookies</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Performance Cookies:</strong> Help us understand how you use our website</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
          </ul>

          <p className="text-gray-700 mb-6">
            You can manage your cookie preferences through your browser settings or our cookie preference center.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. State-Specific Privacy Rights</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">California Residents (CCPA/CPRA)</h3>
          <p className="text-gray-700 mb-4">
            California residents have additional rights under the California Consumer Privacy Act:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Right to know what personal information is collected and how it&apos;s used</li>
            <li>Right to delete personal information (subject to exceptions)</li>
            <li>Right to opt out of the sale of personal information</li>
            <li>Right to non-discrimination for exercising privacy rights</li>
            <li>Right to correct inaccurate personal information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Other State Rights</h3>
          <p className="text-gray-700 mb-6">
            Residents of other states may have additional privacy rights under applicable state laws. 
            Please contact us to learn about rights specific to your state.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. International Data Transfers</h2>
          
          <p className="text-gray-700 mb-6">
            If you are located outside the United States, please note that we may transfer your information to the U.S. 
            and other countries. We ensure appropriate safeguards are in place to protect your information during international transfers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children&apos;s Privacy</h2>
          
          <p className="text-gray-700 mb-6">
            Our services are not intended for children under 18 years of age. We do not knowingly collect personal information 
            from children under 18. If we learn that we have collected information from a child under 18, we will delete it promptly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to This Privacy Policy</h2>
          
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
            We will notify you of material changes by posting the updated policy on our website and updating the &ldquo;Last Updated&rdquo; date. 
            Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
          
          <p className="text-gray-700 mb-4">
            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">MatchedCover Privacy Team</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">privacy@matchedcover.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">1-800-PRIVACY (1-800-774-8229)</span>
              </div>
              <div className="text-gray-700">
                <strong>Mailing Address:</strong><br />
                MatchedCover, Inc.<br />
                Privacy Department<br />
                123 Insurance Way, Suite 100<br />
                San Francisco, CA 94105
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Commitment to Transparency</h3>
            <p className="text-blue-800">
              We are committed to transparency in our data practices. If you have any concerns about how we handle your 
              personal information, please don&apos;t hesitate to reach out to us. We value your trust and will work diligently 
              to address any questions or concerns you may have.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
