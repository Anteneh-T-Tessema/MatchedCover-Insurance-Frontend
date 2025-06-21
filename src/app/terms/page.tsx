import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Mail, Phone, AlertTriangle } from 'lucide-react';

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> January 1, 2024<br />
            <strong>Last Updated:</strong> June 19, 2025
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Welcome to MatchedCover</h2>
            <p className="text-blue-800">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the MatchedCover platform and services. 
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. About Our Services</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Platform Overview</h3>
          <p className="text-gray-700 mb-4">
            MatchedCover operates an online insurance comparison and marketplace platform that connects consumers 
            with licensed insurance providers. Our services include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Insurance quote comparisons across multiple providers</li>
            <li>Educational resources and insurance guidance</li>
            <li>Application assistance and enrollment support</li>
            <li>Customer service and claims support coordination</li>
            <li>AI-powered insurance recommendations</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Disclaimer</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-amber-900 mb-2">MatchedCover is Not an Insurance Company</h4>
                <p className="text-amber-800">
                  We are an insurance marketplace and technology platform. We do not underwrite, issue, or provide insurance coverage. 
                  All insurance policies are issued by licensed insurance companies that partner with our platform.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility and Account Requirements</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Age and Capacity</h3>
          <p className="text-gray-700 mb-4">
            To use our services, you must:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Reside in a state where our services are available</li>
            <li>Provide accurate and complete information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Security</h3>
          <p className="text-gray-700 mb-6">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities 
            that occur under your account. You must notify us immediately of any unauthorized use or security breach.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Accurate Information</h3>
          <p className="text-gray-700 mb-4">
            You agree to provide accurate, current, and complete information when:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Requesting insurance quotes</li>
            <li>Creating your account profile</li>
            <li>Applying for insurance coverage</li>
            <li>Communicating with insurance providers</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Prohibited Uses</h3>
          <p className="text-gray-700 mb-4">You agree not to:</p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Provide false, misleading, or fraudulent information</li>
            <li>Use our services for any illegal or unauthorized purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt our services</li>
            <li>Use automated tools to access our platform without permission</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Harass, abuse, or harm other users or our staff</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Insurance Quotes and Applications</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Quote Accuracy</h3>
          <p className="text-gray-700 mb-4">
            Insurance quotes provided through our platform are estimates based on the information you provide. 
            Final pricing and coverage terms are determined by the insurance companies and may differ from initial quotes due to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Additional underwriting requirements</li>
            <li>Credit checks and background verification</li>
            <li>Property inspections or medical examinations</li>
            <li>Changes in risk assessment</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Application Process</h3>
          <p className="text-gray-700 mb-4">
            When you submit an insurance application through our platform:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Your information is transmitted to the selected insurance provider</li>
            <li>The insurance company conducts its own underwriting process</li>
            <li>Coverage is subject to the insurer&apos;s approval and terms</li>
            <li>You will receive policy documents directly from the insurer</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Payment and Fees</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Our Platform Fees</h3>
          <p className="text-gray-700 mb-4">
            MatchedCover&apos;s services are free to consumers. We receive compensation from insurance partners when you purchase 
            a policy through our platform. This compensation does not affect the pricing or availability of insurance products.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Insurance Premiums</h3>
          <p className="text-gray-700 mb-6">
            Insurance premiums and fees are paid directly to the insurance company according to their payment terms. 
            We do not process premium payments on behalf of insurance providers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Our Rights</h3>
          <p className="text-gray-700 mb-4">
            All content, features, and functionality on our platform, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Text, graphics, logos, and images</li>
            <li>Software, algorithms, and technology</li>
            <li>Trademarks and service marks</li>
            <li>Trade secrets and proprietary information</li>
          </ul>
          <p className="text-gray-700 mb-6">
            are owned by MatchedCover or our licensors and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Limited License</h3>
          <p className="text-gray-700 mb-6">
            We grant you a limited, non-exclusive, non-transferable license to access and use our platform for personal, 
            non-commercial purposes in accordance with these Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Privacy and Data Protection</h2>
          
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our 
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>, 
            which is incorporated into these Terms by reference.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Data Sharing</h3>
          <p className="text-gray-700 mb-6">
            By using our services, you consent to the sharing of your information with insurance providers and partners 
            as necessary to provide quotes and facilitate insurance applications. All partners are required to protect 
            your information in accordance with applicable privacy laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Disclaimers and Limitations</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Service Availability</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
            <p className="text-gray-700">
              Our services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not guarantee that our platform will be 
              available at all times or free from errors, interruptions, or security vulnerabilities.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Insurance Coverage Disclaimer</h3>
          <p className="text-gray-700 mb-4">
            We make no representations or warranties regarding:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>The accuracy of insurance quotes or coverage information</li>
            <li>The financial stability or claims-paying ability of insurance providers</li>
            <li>The availability or continuation of specific insurance products</li>
            <li>The outcome of insurance applications or claims</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Limitation of Liability</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
            <p className="text-red-800">
              <strong>IMPORTANT:</strong> To the maximum extent permitted by law, MatchedCover shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, 
              data, or use, arising from your use of our services.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Third-Party Services and Links</h2>
          
          <p className="text-gray-700 mb-4">
            Our platform may contain links to third-party websites, services, or applications. We are not responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>The content, privacy practices, or terms of third-party services</li>
            <li>Any damages or losses resulting from your use of third-party services</li>
            <li>The availability or functionality of linked websites</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Termination</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Termination by You</h3>
          <p className="text-gray-700 mb-4">
            You may terminate your account at any time by contacting us or using the account deletion feature in your profile settings.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Termination by Us</h3>
          <p className="text-gray-700 mb-4">
            We may suspend or terminate your access to our services at any time for:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>Violation of these Terms or our policies</li>
            <li>Fraudulent or illegal activity</li>
            <li>Extended periods of inactivity</li>
            <li>Business or operational reasons</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Dispute Resolution</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Governing Law</h3>
          <p className="text-gray-700 mb-4">
            These Terms are governed by the laws of the State of California, without regard to its conflict of law principles.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Arbitration</h3>
          <p className="text-gray-700 mb-4">
            Any disputes arising from these Terms or your use of our services will be resolved through binding arbitration 
            in accordance with the Commercial Arbitration Rules of the American Arbitration Association.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Class Action Waiver</h3>
          <p className="text-gray-700 mb-6">
            You agree that any arbitration or legal proceeding shall be limited to the dispute between you and MatchedCover individually. 
            You waive any right to participate in class action lawsuits or class-wide arbitrations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to Terms</h2>
          
          <p className="text-gray-700 mb-6">
            We may modify these Terms at any time by posting the updated version on our website. Material changes will be 
            communicated through email or prominent notice on our platform. Your continued use of our services after such 
            changes constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Regulatory Compliance</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Insurance Regulations</h3>
          <p className="text-gray-700 mb-4">
            Our services are subject to state insurance regulations. We maintain appropriate licenses and comply with 
            applicable insurance laws in the states where we operate.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Consumer Protection</h3>
          <p className="text-gray-700 mb-6">
            We are committed to fair and transparent business practices. If you have concerns about our services, 
            you may contact your state insurance department or other applicable regulatory authorities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Contact Information</h2>
          
          <p className="text-gray-700 mb-4">
            If you have questions about these Terms of Service, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">MatchedCover Legal Department</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">legal@matchedcover.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">1-800-MATCHED (1-800-628-2433)</span>
              </div>
              <div className="text-gray-700">
                <strong>Mailing Address:</strong><br />
                MatchedCover, Inc.<br />
                Legal Department<br />
                123 Insurance Way, Suite 100<br />
                San Francisco, CA 94105
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Questions About Insurance?</h3>
            <p className="text-blue-800">
              Our customer service team is available to help you understand insurance options and navigate the application process. 
              Contact us anytime for personalized assistance with your insurance needs.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <p className="text-sm text-gray-500 text-center">
              MatchedCover, Inc. | Licensed Insurance Marketplace | CA License #0M12345<br />
              These Terms of Service were last updated on June 19, 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
