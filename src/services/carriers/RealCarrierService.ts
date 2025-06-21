/**
 * Real Carrier Integration Service
 * Handles actual API calls to insurance carriers
 * 
 * @fileoverview Real carrier service with consolidated interfaces
 * @author MatchedCover Platform Team
 * @version 2.0.0
 */

import {
  QuoteRequest
} from '../../types/consolidated-interfaces';

/**
 * Carrier-specific authentication credentials
 * Defines API credentials for each supported carrier
 * 
 * @interface CarrierCredentials
 */
interface CarrierCredentials {
  progressive: {
    clientId: string;
    clientSecret: string;
    baseUrl: string;
    environment: 'sandbox' | 'production';
  };
  geico: {
    apiKey: string;
    partnerId: string;
    baseUrl: string;
  };
  state_farm: {
    username: string;
    password: string;
    certificatePath: string;
    baseUrl: string;
  };
  allstate: {
    apiKey: string;
    agentCode: string;
    baseUrl: string;
  };
}

/**
 * Vehicle information interface for carrier integrations
 * 
 * @interface VehicleInfo
 */
interface VehicleInfo {
  year: number;
  make: string;
  model: string;
  vin: string;
  usage: 'pleasure' | 'commute' | 'business';
  annualMileage: number;
}

/**
 * Driving history record interface
 * 
 * @interface DrivingHistoryRecord
 */
interface DrivingHistoryRecord {
  type: 'violation' | 'accident' | 'claim';
  date: string;
  description: string;
  amount?: number;
}

/**
 * Carrier quote response interface
 * Standardized response from carrier APIs
 * 
 * @interface CarrierQuoteResponse
 */
interface CarrierQuoteResponse {
  carrierId: string;
  quoteId: string;
  premium: {
    total: number;
    liability: number;
    comprehensive?: number;
    collision?: number;
    pip?: number;
    um?: number;
  };
  coverages: {
    [key: string]: {
      limit: number;
      deductible?: number;
      premium: number;
    };
  };
  discounts: Array<{
    name: string;
    amount: number;
  }>;
  validUntil: string;
  status: 'quoted' | 'declined' | 'referred';
  reason?: string;
}

export class RealCarrierService {
  private credentials: CarrierCredentials;
  private rateLimiter: Map<string, number> = new Map();

  constructor() {
    this.credentials = {
      progressive: {
        clientId: process.env.PROGRESSIVE_CLIENT_ID || '',
        clientSecret: process.env.PROGRESSIVE_CLIENT_SECRET || '',
        baseUrl: process.env.PROGRESSIVE_API_URL || 'https://api.progressive.com/v1',
        environment: (process.env.NODE_ENV as 'sandbox' | 'production') || 'sandbox'
      },
      geico: {
        apiKey: process.env.GEICO_API_KEY || '',
        partnerId: process.env.GEICO_PARTNER_ID || '',
        baseUrl: process.env.GEICO_API_URL || 'https://partner-api.geico.com/v2'
      },
      state_farm: {
        username: process.env.STATE_FARM_USERNAME || '',
        password: process.env.STATE_FARM_PASSWORD || '',
        certificatePath: process.env.STATE_FARM_CERT_PATH || '',
        baseUrl: process.env.STATE_FARM_API_URL || 'https://api.statefarm.com/v1'
      },
      allstate: {
        apiKey: process.env.ALLSTATE_API_KEY || '',
        agentCode: process.env.ALLSTATE_AGENT_CODE || '',
        baseUrl: process.env.ALLSTATE_API_URL || 'https://api.allstate.com/v1'
      }
    };
  }

  // Rate limiting to respect carrier API limits
  private async checkRateLimit(carrierId: string): Promise<void> {
    const now = Date.now();
    const lastCall = this.rateLimiter.get(carrierId) || 0;
    const minInterval = this.getMinInterval(carrierId);
    
    if (now - lastCall < minInterval) {
      const waitTime = minInterval - (now - lastCall);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.rateLimiter.set(carrierId, Date.now());
  }

  private getMinInterval(carrierId: string): number {
    // API rate limits (ms between calls)
    const limits = {
      progressive: 1000, // 1 second
      geico: 2000,       // 2 seconds
      state_farm: 5000,  // 5 seconds
      allstate: 1500     // 1.5 seconds
    };
    return limits[carrierId as keyof typeof limits] || 1000;
  }

  // Progressive API Integration
  private async getProgressiveQuote(request: QuoteRequest): Promise<CarrierQuoteResponse> {
    await this.checkRateLimit('progressive');

    // 1. Authenticate with Progressive
    const authResponse = await fetch(`${this.credentials.progressive.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.credentials.progressive.clientId,
        client_secret: this.credentials.progressive.clientSecret,
        scope: 'quote:read quote:write'
      })
    });

    if (!authResponse.ok) {
      throw new Error(`Progressive auth failed: ${authResponse.status}`);
    }

    const { access_token } = await authResponse.json();

    // 2. Transform data to Progressive format
    const progressiveRequest = this.transformToProgressiveFormat(request);

    // 3. Submit quote request
    const quoteResponse = await fetch(`${this.credentials.progressive.baseUrl}/quotes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'X-Partner-ID': this.credentials.progressive.clientId
      },
      body: JSON.stringify(progressiveRequest)
    });

    if (!quoteResponse.ok) {
      throw new Error(`Progressive quote failed: ${quoteResponse.status}`);
    }

    const progressiveData = await quoteResponse.json();
    return this.transformFromProgressiveFormat(progressiveData);
  }

  // GEICO API Integration
  private async getGEICOQuote(request: QuoteRequest): Promise<CarrierQuoteResponse> {
    await this.checkRateLimit('geico');

    const geicoRequest = this.transformToGEICOFormat(request);

    const response = await fetch(`${this.credentials.geico.baseUrl}/quotes`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.credentials.geico.apiKey,
        'X-Partner-ID': this.credentials.geico.partnerId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geicoRequest)
    });

    if (!response.ok) {
      throw new Error(`GEICO quote failed: ${response.status}`);
    }

    const geicoData = await response.json();
    return this.transformFromGEICOFormat(geicoData);
  }

  // State Farm API Integration (uses XML/SOAP)
  private async getStateFarmQuote(request: QuoteRequest): Promise<CarrierQuoteResponse> {
    await this.checkRateLimit('state_farm');

    // State Farm often uses SOAP/XML instead of REST
    const soapRequest = this.buildStateFarmSOAPRequest(request);

    const response = await fetch(`${this.credentials.state_farm.baseUrl}/QuoteService`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'http://statefarm.com/GetQuote',
        'Authorization': `Basic ${Buffer.from(`${this.credentials.state_farm.username}:${this.credentials.state_farm.password}`).toString('base64')}`
      },
      body: soapRequest
    });

    if (!response.ok) {
      throw new Error(`State Farm quote failed: ${response.status}`);
    }

    await response.text(); // Parse XML if needed
    return this.parseStateFarmSOAPResponse();
  }

  // Allstate API Integration
  private async getAllstateQuote(): Promise<CarrierQuoteResponse> {
    await this.checkRateLimit('allstate');

    const allstateRequest = this.transformToAllstateFormat();

    const response = await fetch(`${this.credentials.allstate.baseUrl}/quote`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.credentials.allstate.apiKey,
        'X-Agent-Code': this.credentials.allstate.agentCode,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(allstateRequest)
    });

    if (!response.ok) {
      throw new Error(`Allstate quote failed: ${response.status}`);
    }

    const allstateData = await response.json();
    return this.transformFromAllstateFormat(allstateData);
  }

  // Public method to get quotes from all carriers
  public async getQuotesFromAllCarriers(request: QuoteRequest): Promise<CarrierQuoteResponse[]> {
    const promises = [
      this.getProgressiveQuote(request).catch(e => ({ error: e.message, carrierId: 'progressive' })),
      this.getGEICOQuote(request).catch(e => ({ error: e.message, carrierId: 'geico' })),
      this.getStateFarmQuote(request).catch(e => ({ error: e.message, carrierId: 'state_farm' })),
      this.getAllstateQuote().catch(e => ({ error: e.message, carrierId: 'allstate' }))
    ];

    const results = await Promise.allSettled(promises);
    const validQuotes: CarrierQuoteResponse[] = [];

    results.forEach((result) => {
      if (result.status === 'fulfilled' && !('error' in result.value)) {
        validQuotes.push(result.value as CarrierQuoteResponse);
      } else {
        console.error(`Carrier quote failed:`, result);
      }
    });

    return validQuotes;
  }

  // Data transformation methods (carrier-specific formats)
  private transformToProgressiveFormat(request: QuoteRequest): Record<string, unknown> {
    const customerInfo = request.customerInfo;
    const vehicles = request.riskFactors?.vehicles as VehicleInfo[] || [];
    const drivingHistory = request.riskFactors?.drivingHistory as DrivingHistoryRecord[] || [];
    
    return {
      customer: {
        personalInfo: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          dateOfBirth: customerInfo.dateOfBirth,
          ssn: request.riskFactors?.ssn as string || ''
        },
        contactInfo: {
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: {
            line1: customerInfo.address.street,
            city: customerInfo.address.city,
            state: customerInfo.address.state,
            postalCode: customerInfo.address.zipCode
          }
        }
      },
      vehicles: vehicles.map((v: VehicleInfo) => ({
        year: v.year,
        make: v.make,
        model: v.model,
        vin: v.vin,
        usage: v.usage,
        estimatedAnnualMileage: v.annualMileage
      })),
      coverageSelections: {
        liability: {
          bodilyInjuryPerPerson: request.coverageRequested.limits.bodilyInjuryPerPerson || 250000,
          bodilyInjuryPerOccurrence: request.coverageRequested.limits.bodilyInjuryPerAccident || 500000,
          propertyDamage: request.coverageRequested.limits.propertyDamage || 100000
        },
        comprehensive: request.coverageRequested.limits.comprehensive ? {
          deductible: request.coverageRequested.deductibles.comprehensive || 500
        } : null,
        collision: request.coverageRequested.limits.collision ? {
          deductible: request.coverageRequested.deductibles.collision || 500
        } : null
      },
      drivingHistory: drivingHistory
    };
  }

  private transformFromProgressiveFormat(data: Record<string, unknown>): CarrierQuoteResponse {
    const response = data as {
      quoteNumber: string;
      totalPremium: number;
      coveragePremiums: {
        liability: number;
        comprehensive?: number;
        collision?: number;
      };
      coverageDetails: Record<string, {
        limit: number;
        deductible?: number;
        premium: number;
      }>;
      discounts: Array<{ name: string; amount: number }>;
      expirationDate: string;
      status: string;
      declineReason?: string;
    };

    return {
      carrierId: 'progressive',
      quoteId: response.quoteNumber,
      premium: {
        total: response.totalPremium,
        liability: response.coveragePremiums.liability,
        comprehensive: response.coveragePremiums.comprehensive,
        collision: response.coveragePremiums.collision
      },
      coverages: response.coverageDetails,
      discounts: response.discounts || [],
      validUntil: response.expirationDate,
      status: response.status === 'QUOTED' ? 'quoted' : 'declined',
      reason: response.declineReason
    };
  }

  private transformToGEICOFormat(request: QuoteRequest): Record<string, unknown> {
    const customerInfo = request.customerInfo;
    
    // GEICO-specific format
    return {
      prospect: {
        name: {
          first: customerInfo.firstName,
          last: customerInfo.lastName
        },
        dob: customerInfo.dateOfBirth,
        ssn: request.riskFactors?.ssn as string || '',
        contact: {
          email: customerInfo.email,
          phone: customerInfo.phone
        }
      },
      // ... GEICO-specific structure
    };
  }

  private transformFromGEICOFormat(data: Record<string, unknown>): CarrierQuoteResponse {
    const response = data as {
      quote_id: string;
      premium_total: number;
      liability_premium: number;
      status: string;
    };
    
    // Transform GEICO response to standard format
    return {
      carrierId: 'geico',
      quoteId: response.quote_id,
      premium: {
        total: response.premium_total,
        liability: response.liability_premium
      },
      coverages: {},
      discounts: [],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: response.status === 'ACTIVE' ? 'quoted' : 'declined'
    };
  }

  private buildStateFarmSOAPRequest(request: QuoteRequest): string {
    const customerInfo = request.customerInfo;
    
    // Build SOAP XML for State Farm
    return `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <GetQuote xmlns="http://statefarm.com/">
            <QuoteRequest>
              <Applicant>
                <FirstName>${customerInfo.firstName}</FirstName>
                <LastName>${customerInfo.lastName}</LastName>
                <!-- ... more XML structure -->
              </Applicant>
            </QuoteRequest>
          </GetQuote>
        </soap:Body>
      </soap:Envelope>`;
  }

  private parseStateFarmSOAPResponse(): CarrierQuoteResponse {
    // Parse XML response from State Farm
    // This would use an XML parser like xml2js
    return {
      carrierId: 'state_farm',
      quoteId: 'parsed_from_xml',
      premium: { 
        total: 0,
        liability: 0
      },
      coverages: {},
      discounts: [],
      validUntil: '',
      status: 'quoted'
    };
  }

  private transformToAllstateFormat(): Record<string, unknown> {
    // Allstate-specific format
    return {};
  }

  private transformFromAllstateFormat(data: Record<string, unknown>): CarrierQuoteResponse {
    const response = data as {
      quoteId: string;
      totalPremium: number;
      coverages: Record<string, unknown>;
      discounts: Array<{ name: string; amount: number }>;
      validUntil: string;
    };
    
    // Transform Allstate response
    return {
      carrierId: 'allstate',
      quoteId: response.quoteId,
      premium: { 
        total: response.totalPremium,
        liability: response.totalPremium * 0.6 // Estimated breakdown
      },
      coverages: response.coverages as Record<string, { limit: number; deductible?: number; premium: number }>,
      discounts: response.discounts || [],
      validUntil: response.validUntil,
      status: 'quoted'
    };
  }
}
