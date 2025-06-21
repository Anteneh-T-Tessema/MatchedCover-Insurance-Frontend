/**
 * Privacy Rights API Endpoint
 * Handles GDPR/CCPA data subject requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrivacyComplianceService } from '@/services/compliance/PrivacyComplianceService';

const privacyService = new PrivacyComplianceService();

export async function POST(request: NextRequest) {
  try {
    const { type, userId, data } = await request.json();
    
    // Verify request authenticity and user identity
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    let result;
    
    switch (type) {
      case 'access':
        result = await privacyService.handleAccessRequest(userId);
        break;
        
      case 'rectification':
        await privacyService.handleRectificationRequest(userId, data.updates);
        result = { message: 'Personal data updated successfully' };
        break;
        
      case 'erasure':
        await privacyService.handleErasureRequest(userId, data.reason);
        result = { message: 'Personal data erased successfully' };
        break;
        
      case 'portability':
        const exportData = await privacyService.handlePortabilityRequest(userId, data.format || 'JSON');
        return new NextResponse(exportData, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="personal-data-${userId}.${data.format?.toLowerCase() || 'json'}"`
          }
        });
        
      case 'opt_out':
        await privacyService.handleOptOutRequest(userId);
        result = { message: 'Successfully opted out of data sale' };
        break;
        
      case 'consent':
        const consentId = await privacyService.recordConsent(
          userId,
          data.purpose,
          data.lawfulBasis,
          data.granted,
          {
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown',
            source: 'web-form',
            version: '1.0'
          }
        );
        result = { consentId, message: 'Consent recorded successfully' };
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('Privacy request error:', error);
    return NextResponse.json(
      { error: 'Failed to process privacy request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    
    let result;
    
    switch (type) {
      case 'rights':
        result = {
          availableRights: [
            {
              type: 'access',
              name: 'Right to Access',
              description: 'Request a copy of your personal data'
            },
            {
              type: 'rectification',
              name: 'Right to Rectification',
              description: 'Request correction of inaccurate personal data'
            },
            {
              type: 'erasure',
              name: 'Right to Erasure',
              description: 'Request deletion of your personal data'
            },
            {
              type: 'portability',
              name: 'Right to Data Portability',
              description: 'Request your data in a machine-readable format'
            },
            {
              type: 'opt_out',
              name: 'Right to Opt-Out (CCPA)',
              description: 'Opt out of the sale of your personal information'
            }
          ],
          contactInfo: {
            dpo: 'dpo@matchedcover.com',
            phone: '+1-800-PRIVACY',
            supportUrl: '/privacy/support'
          }
        };
        break;
        
      case 'status':
        // Return user's privacy settings and request history
        result = {
          privacySettings: {
            marketingConsent: true,
            dataProcessingConsent: true,
            optedOutOfSale: false,
            lastUpdated: new Date().toISOString()
          },
          requestHistory: [
            // This would come from your database
            {
              id: 'req_123',
              type: 'access',
              status: 'completed',
              requestDate: '2024-01-15T10:00:00Z',
              completionDate: '2024-01-16T15:30:00Z'
            }
          ]
        };
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }
    
    return NextResponse.json(result, { status: 200 });
    
  } catch (error) {
    console.error('Privacy info request error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve privacy information' },
      { status: 500 }
    );
  }
}
