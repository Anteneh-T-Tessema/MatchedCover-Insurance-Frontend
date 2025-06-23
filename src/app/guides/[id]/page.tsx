'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Clock, Download, Share2, Bookmark } from 'lucide-react';
import { useParams } from 'next/navigation';
import ChatWrapper from '@/components/ChatWrapper';

interface GuideData {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  downloadUrl: string;
  lastUpdated: string;
  content: {
    sections: {
      title: string;
      content: string[];
    }[];
  };
}

const guidesData: Record<string, GuideData> = {
  '1': {
    id: '1',
    title: 'Complete Guide to Home Insurance',
    description: 'Everything you need to know about protecting your home and belongings.',
    category: 'Home Insurance',
    readTime: '15 min',
    downloadUrl: '/guides/home-insurance-guide.pdf',
    lastUpdated: 'Updated June 2024',
    content: {
      sections: [
        {
          title: 'What is Home Insurance?',
          content: [
            'Home insurance is a form of property insurance that covers losses and damages to your house and belongings. It also provides liability coverage for accidents that may happen on your property.',
            'A standard home insurance policy includes dwelling coverage, personal property coverage, liability protection, and additional living expenses coverage.',
            'Home insurance is typically required by mortgage lenders and is one of the most important investments you can make to protect your family&apos;s financial future.'
          ]
        },
        {
          title: 'Types of Coverage',
          content: [
            'Dwelling Coverage: Protects the physical structure of your home including walls, roof, floors, and built-in appliances.',
            'Personal Property Coverage: Covers your belongings such as furniture, clothing, electronics, and other personal items.',
            'Liability Coverage: Protects you if someone is injured on your property or if you accidentally damage someone else&apos;s property.',
            'Additional Living Expenses: Covers temporary housing costs if your home becomes uninhabitable due to a covered loss.'
          ]
        },
        {
          title: 'Factors That Affect Your Premium',
          content: [
            'Location: Homes in areas prone to natural disasters or high crime rates typically have higher premiums.',
            'Home Age and Condition: Newer homes with updated systems often qualify for lower rates.',
            'Coverage Limits: Higher coverage limits result in higher premiums, but provide better protection.',
            'Deductible Amount: Choosing a higher deductible can lower your premium but increases out-of-pocket costs for claims.',
            'Safety Features: Security systems, smoke detectors, and storm shutters can earn you discounts.'
          ]
        },
        {
          title: 'How to File a Claim',
          content: [
            'Contact your insurance company immediately after a loss occurs. Most insurers have 24/7 claim reporting services.',
            'Document the damage with photos and videos before making any repairs.',
            'Make temporary repairs to prevent further damage, but keep receipts for reimbursement.',
            'Meet with the insurance adjuster and provide all requested documentation.',
            'Review the settlement offer carefully and ask questions if anything is unclear.'
          ]
        }
      ]
    }
  },
  '2': {
    id: '2',
    title: 'Auto Insurance Explained',
    description: 'Understanding coverage options and finding the right policy for your needs.',
    category: 'Auto Insurance',
    readTime: '12 min',
    downloadUrl: '/guides/auto-insurance-guide.pdf',
    lastUpdated: 'Updated May 2024',
    content: {
      sections: [
        {
          title: 'Understanding Auto Insurance Basics',
          content: [
            'Auto insurance provides financial protection against physical damage or bodily injury resulting from traffic collisions and liability that could arise from incidents in a vehicle.',
            'Most states require drivers to carry a minimum amount of auto insurance, though requirements vary by state.',
            'Auto insurance premiums are based on factors including your driving record, age, location, type of vehicle, and coverage choices.'
          ]
        },
        {
          title: 'Required Coverage Types',
          content: [
            'Liability Coverage: Pays for bodily injury and property damage you cause to others in an accident.',
            'Personal Injury Protection (PIP): Covers medical expenses for you and your passengers regardless of fault.',
            'Uninsured/Underinsured Motorist: Protects you if you&apos;re hit by a driver with insufficient insurance.',
            'Some states also require comprehensive and collision coverage for financed or leased vehicles.'
          ]
        },
        {
          title: 'Optional Coverage Add-ons',
          content: [
            'Comprehensive Coverage: Protects against theft, vandalism, weather damage, and other non-collision incidents.',
            'Collision Coverage: Pays for damage to your vehicle from accidents with other vehicles or objects.',
            'Gap Insurance: Covers the difference between what you owe on your car loan and the car&apos;s actual value.',
            'Rental Car Coverage: Pays for rental car expenses while your vehicle is being repaired.',
            'Roadside Assistance: Provides help with towing, flat tires, dead batteries, and lockouts.'
          ]
        }
      ]
    }
  },
  '3': {
    id: '3',
    title: 'Life Insurance Fundamentals',
    description: 'Secure your family\'s financial future with the right life insurance policy.',
    category: 'Life Insurance',
    readTime: '18 min',
    downloadUrl: '/guides/life-insurance-guide.pdf',
    lastUpdated: 'Updated June 2024',
    content: {
      sections: [
        {
          title: 'Understanding Life Insurance',
          content: [
            'Life insurance provides financial protection for your beneficiaries in the event of your death. It pays out a death benefit that can help cover final expenses, replace lost income, and provide financial security.',
            'Life insurance is essential for anyone with dependents, debts, or financial obligations that would burden their family.',
            'The earlier you purchase life insurance, the lower your premiums will typically be, as rates are based on age and health at the time of application.'
          ]
        },
        {
          title: 'Types of Life Insurance',
          content: [
            'Term Life Insurance: Provides coverage for a specific period (10, 20, or 30 years). It\'s typically the most affordable option and ideal for temporary needs.',
            'Whole Life Insurance: Permanent coverage that includes a cash value component. Premiums remain level throughout your lifetime.',
            'Universal Life Insurance: Flexible permanent coverage that allows you to adjust premiums and death benefits within certain limits.',
            'Variable Life Insurance: Permanent coverage where you can invest the cash value in various investment options.'
          ]
        },
        {
          title: 'How Much Coverage Do You Need?',
          content: [
            'A common rule of thumb is to purchase 10-12 times your annual income in life insurance coverage.',
            'Consider your debts, including mortgage, credit cards, and loans that would need to be paid off.',
            'Factor in future expenses like children\'s education costs and your spouse\'s retirement needs.',
            'Don\'t forget final expenses such as funeral costs, which can range from $7,000 to $15,000 or more.'
          ]
        },
        {
          title: 'Application Process',
          content: [
            'Complete a detailed application that includes questions about your health, lifestyle, and financial situation.',
            'Schedule a medical exam, which typically includes height/weight measurements, blood and urine tests, and basic health questions.',
            'The insurance company will review your medical records and may order additional tests if needed.',
            'Once approved, you\'ll receive your policy documents and coverage will begin after your first premium payment.'
          ]
        }
      ]
    }
  },
  '4': {
    id: '4',
    title: 'Business Insurance Essentials',
    description: 'Protect your business with comprehensive insurance coverage tailored to your industry.',
    category: 'Business Insurance',
    readTime: '20 min',
    downloadUrl: '/guides/business-insurance-guide.pdf',
    lastUpdated: 'Updated May 2024',
    content: {
      sections: [
        {
          title: 'Why Business Insurance Matters',
          content: [
            'Business insurance protects your company from financial losses due to unexpected events like accidents, lawsuits, property damage, or business interruption.',
            'Many types of business insurance are legally required, while others are essential for protecting your assets and ensuring business continuity.',
            'The right insurance coverage can mean the difference between a minor setback and a business-ending catastrophe.'
          ]
        },
        {
          title: 'Essential Coverage Types',
          content: [
            'General Liability Insurance: Protects against claims of bodily injury, property damage, and personal injury caused by your business operations.',
            'Professional Liability Insurance: Covers claims related to professional mistakes, errors, or omissions in your services.',
            'Commercial Property Insurance: Protects your business property, including buildings, equipment, inventory, and furnishings.',
            'Workers\' Compensation: Required in most states, covers medical expenses and lost wages for employees injured on the job.',
            'Commercial Auto Insurance: Covers vehicles owned, leased, or used by your business.'
          ]
        },
        {
          title: 'Industry-Specific Considerations',
          content: [
            'Restaurants need specialized coverage for food spoilage, liquor liability, and equipment breakdown.',
            'Technology companies should consider cyber liability insurance and errors & omissions coverage.',
            'Healthcare providers need medical malpractice insurance and HIPAA compliance coverage.',
            'Contractors require specialized liability coverage and coverage for tools and equipment.',
            'Retail businesses need product liability insurance and coverage for inventory and customer property.'
          ]
        },
        {
          title: 'Risk Management Strategies',
          content: [
            'Implement safety protocols and employee training programs to reduce the likelihood of accidents and claims.',
            'Maintain detailed records of safety procedures, training, and incident reports.',
            'Regular review and update your coverage as your business grows and changes.',
            'Work with an experienced commercial insurance agent who understands your industry.',
            'Consider umbrella policies for additional liability protection beyond your primary coverage limits.'
          ]
        }
      ]
    }
  },
  '5': {
    id: '5',
    title: 'Renters Insurance Guide',
    description: 'Protect your belongings and liability as a renter with affordable coverage.',
    category: 'Renters Insurance',
    readTime: '10 min',
    downloadUrl: '/guides/renters-insurance-guide.pdf',
    lastUpdated: 'Updated April 2024',
    content: {
      sections: [
        {
          title: 'What Renters Insurance Covers',
          content: [
            'Personal Property: Covers your belongings like furniture, electronics, clothing, and other personal items against theft, fire, and other covered perils.',
            'Liability Protection: Protects you if someone is injured in your rental unit or if you accidentally damage someone else\'s property.',
            'Additional Living Expenses: Pays for temporary housing and living expenses if your rental becomes uninhabitable due to a covered loss.',
            'Medical Payments: Covers medical expenses for guests who are injured in your rental unit, regardless of fault.'
          ]
        },
        {
          title: 'Common Misconceptions',
          content: [
            'Your landlord\'s insurance does not cover your personal belongings - only the building structure.',
            'Renters insurance is much more affordable than most people think, often costing less than $20 per month.',
            'You don\'t need to own expensive items to benefit from renters insurance - liability coverage alone makes it worthwhile.',
            'Renters insurance covers your belongings even when you\'re away from home, such as items stolen from your car.'
          ]
        },
        {
          title: 'How to Determine Coverage Amounts',
          content: [
            'Create a home inventory by listing all your belongings and their estimated values.',
            'Take photos or videos of your possessions for documentation purposes.',
            'Consider replacement cost vs. actual cash value coverage - replacement cost is typically worth the small additional premium.',
            'Most renters need between $20,000 to $50,000 in personal property coverage.',
            'Choose liability limits of at least $100,000, though $300,000 is often recommended.'
          ]
        },
        {
          title: 'Money-Saving Tips',
          content: [
            'Bundle renters insurance with your auto insurance for multi-policy discounts.',
            'Install safety devices like smoke detectors, burglar alarms, and deadbolts for security discounts.',
            'Choose a higher deductible to lower your premium, but make sure you can afford the out-of-pocket cost.',
            'Maintain a good credit score, as many insurers use credit information in their pricing.',
            'Review your policy annually and adjust coverage as needed to avoid paying for more coverage than necessary.'
          ]
        }
      ]
    }
  },
  '6': {
    id: '6',
    title: 'Understanding Health Insurance',
    description: 'Navigate health insurance options and find coverage that meets your medical and financial needs.',
    category: 'Health Insurance',
    readTime: '16 min',
    downloadUrl: '/guides/health-insurance-guide.pdf',
    lastUpdated: 'Updated March 2024',
    content: {
      sections: [
        {
          title: 'Health Insurance Basics',
          content: [
            'Health insurance helps pay for medical expenses including doctor visits, hospital stays, prescription medications, and preventive care.',
            'Under the Affordable Care Act, most Americans are required to have health insurance or pay a penalty (though the federal penalty has been reduced to $0).',
            'Health insurance premiums are just one cost - you\'ll also pay deductibles, copayments, and coinsurance for medical services.'
          ]
        },
        {
          title: 'Types of Health Plans',
          content: [
            'Health Maintenance Organization (HMO): Requires you to choose a primary care physician and get referrals for specialists. Typically has lower premiums.',
            'Preferred Provider Organization (PPO): Offers more flexibility in choosing healthcare providers but typically has higher premiums.',
            'Exclusive Provider Organization (EPO): Combines features of HMOs and PPOs, offering a network of providers without requiring referrals.',
            'Point of Service (POS): Requires a primary care physician but allows out-of-network care at higher cost.',
            'High Deductible Health Plan (HDHP): Features lower premiums but higher deductibles, often paired with Health Savings Accounts.'
          ]
        },
        {
          title: 'Key Terms to Understand',
          content: [
            'Premium: The monthly amount you pay for your health insurance coverage.',
            'Deductible: The amount you must pay out-of-pocket before your insurance begins to pay.',
            'Copayment: A fixed amount you pay for certain services, like $25 for a doctor visit.',
            'Coinsurance: Your share of the cost for services after you\'ve paid your deductible, typically expressed as a percentage.',
            'Out-of-Pocket Maximum: The most you\'ll pay in a year for covered services.'
          ]
        },
        {
          title: 'Choosing the Right Plan',
          content: [
            'Consider your current health status and anticipated medical needs for the coming year.',
            'Review the plan\'s network to ensure your preferred doctors and hospitals are included.',
            'Compare total costs, not just premiums - factor in deductibles, copayments, and coinsurance.',
            'Check if your current medications are covered under the plan\'s formulary.',
            'Consider whether you want the flexibility to see specialists without referrals.'
          ]
        }
      ]
    }
  }
};

export default function IndividualGuidePage() {
  const params = useParams();
  const guideId = params?.id as string;
  const guide = guideId ? guidesData[guideId] : null;

  if (!guide) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-8">The guide you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/guides"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/guides" className="text-gray-600 hover:text-gray-900">All Guides</Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-900">Help</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">Support</Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/guides" className="text-gray-500 hover:text-gray-700 flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Guides
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{guide.category}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Guide Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              {guide.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{guide.description}</p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {guide.readTime}
              </div>
              <span>{guide.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Actions */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href={guide.downloadUrl}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                download
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </a>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Guide
              </button>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Guide Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {guide.content.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Related Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.values(guidesData)
              .filter(g => g.id !== guide.id)
              .slice(0, 2)
              .map((relatedGuide) => (
                <Link 
                  key={relatedGuide.id}
                  href={`/guides/${relatedGuide.id}`}
                  className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {relatedGuide.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {relatedGuide.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{relatedGuide.title}</h3>
                  <p className="text-gray-600">{relatedGuide.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Coverage?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get personalized quotes from top insurance companies in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Get Quote Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Talk to Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Chat */}
      <ChatWrapper />
    </div>
  );
}
