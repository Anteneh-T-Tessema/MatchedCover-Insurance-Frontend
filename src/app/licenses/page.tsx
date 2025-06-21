'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, FileText, ExternalLink, Award, CheckCircle, Globe, Building } from 'lucide-react';

interface License {
  state: string;
  licenseNumber: string;
  type: string;
  status: string;
  expirationDate: string;
}

interface Certification {
  name: string;
  issuedBy: string;
  certificationNumber: string;
  validUntil: string;
}

const licenses: License[] = [
  { state: 'New York', licenseNumber: 'LA-1234567', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-12-31' },
  { state: 'California', licenseNumber: 'CA-8901234', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-11-30' },
  { state: 'Texas', licenseNumber: 'TX-5678901', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-10-31' },
  { state: 'Florida', licenseNumber: 'FL-2345678', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-09-30' },
  { state: 'Illinois', licenseNumber: 'IL-9012345', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-08-31' },
  { state: 'Pennsylvania', licenseNumber: 'PA-6789012', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-07-31' },
  { state: 'Ohio', licenseNumber: 'OH-3456789', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-06-30' },
  { state: 'Georgia', licenseNumber: 'GA-0123456', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-05-31' },
  { state: 'North Carolina', licenseNumber: 'NC-7890123', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-04-30' },
  { state: 'Michigan', licenseNumber: 'MI-4567890', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-03-31' },
  { state: 'New Jersey', licenseNumber: 'NJ-1234567', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-02-28' },
  { state: 'Virginia', licenseNumber: 'VA-8901234', type: 'Property & Casualty', status: 'Active', expirationDate: '2025-01-31' },
  { state: 'Washington', licenseNumber: 'WA-5678901', type: 'Property & Casualty', status: 'Active', expirationDate: '2024-12-31' },
  { state: 'Arizona', licenseNumber: 'AZ-2345678', type: 'Property & Casualty', status: 'Active', expirationDate: '2024-11-30' },
  { state: 'Massachusetts', licenseNumber: 'MA-9012345', type: 'Property & Casualty', status: 'Active', expirationDate: '2024-10-31' },
];

const certifications: Certification[] = [
  { name: 'A.M. Best Rating', issuedBy: 'A.M. Best Company', certificationNumber: 'AMB-2024-001', validUntil: '2025-12-31' },
  { name: 'NAIC Compliance', issuedBy: 'National Association of Insurance Commissioners', certificationNumber: 'NAIC-2024-002', validUntil: '2025-12-31' },
  { name: 'ISO 27001 Certification', issuedBy: 'International Organization for Standardization', certificationNumber: 'ISO-27001-2024', validUntil: '2027-06-30' },
  { name: 'SOC 2 Type II Compliance', issuedBy: 'AICPA', certificationNumber: 'SOC2-2024-003', validUntil: '2025-06-30' },
];

export default function LicensesPage() {
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
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Certifications</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            MatchedCover is fully licensed and certified to provide insurance services across multiple states. 
            We maintain the highest standards of compliance and regulatory oversight.
          </p>
          
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <span className="font-semibold">Fully Licensed</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Award className="h-6 w-6" />
              <span className="font-semibold">Certified Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Globe className="h-6 w-6" />
              <span className="font-semibold">Multi-State Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Building className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Legal Name</h3>
                <p className="text-gray-600">MatchedCover Insurance Services, LLC</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">NAIC Number</h3>
                <p className="text-gray-600">12345-67890</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Federal Tax ID</h3>
                <p className="text-gray-600">XX-XXXXXXX</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Headquarters</h3>
                <p className="text-gray-600">123 Insurance Plaza, Suite 500<br />New York, NY 10001</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Founded</h3>
                <p className="text-gray-600">2023</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">License Type</h3>
                <p className="text-gray-600">Managing General Agent (MGA)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Licenses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              State Insurance Licenses
            </h2>
            <p className="text-lg text-gray-600">
              We are licensed to sell insurance in the following states
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">State</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">License Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {licenses.map((license, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{license.state}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{license.licenseNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{license.type}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3" />
                          <span>{license.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{license.expirationDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              License verification available through respective state insurance department websites.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Certifications
            </h2>
            <p className="text-lg text-gray-600">
              Our commitment to excellence is validated by industry-leading certifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                    <p className="text-gray-600 mb-3">Issued by: {cert.issuedBy}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Certification Number:</span>
                        <span className="font-mono text-gray-900">{cert.certificationNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Valid Until:</span>
                        <span className="text-gray-900">{cert.validUntil}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Regulatory Compliance
            </h2>
            <p className="text-lg text-gray-600">
              We adhere to all federal and state insurance regulations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">NAIC Compliant</h3>
              <p className="text-gray-600 mb-4">
                Full compliance with National Association of Insurance Commissioners standards and practices.
              </p>
              <a 
                href="https://www.naic.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Visit NAIC</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Reports</h3>
              <p className="text-gray-600 mb-4">
                Annual financial statements filed with state insurance departments and available upon request.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Request Reports</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Protection</h3>
              <p className="text-gray-600 mb-4">
                SOC 2 Type II compliant with industry-leading data security and privacy protection measures.
              </p>
              <Link 
                href="/privacy" 
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <span>Privacy Policy</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Verification */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            License Verification
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Need to verify our licenses or certifications? Contact us directly or check with your state&apos;s insurance department.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Contact Us</span>
              <ExternalLink className="h-5 w-5" />
            </Link>
            <a
              href="https://www.naic.org/producer_licensing.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              <span>State Verification</span>
              <ExternalLink className="h-5 w-5" />
            </a>
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 MatchedCover Insurance Services, LLC. All rights reserved. Licensed insurance professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
