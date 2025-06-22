/**
 * Policy Binding API
 * Handles policy binding and issuance through carrier integrations
 */

import { NextRequest, NextResponse } from 'next/server';
import { carrierIntegrationService, PolicyBindRequest, PolicyBindResponse } from '@/services/carriers/CarrierIntegrationService';

export async function POST(request: NextRequest) {
  try {
    const bindRequest: PolicyBindRequest = await request.json();

    // Validate required fields
    if (!bindRequest.quoteId || !bindRequest.paymentInfo || !bindRequest.effectiveDate) {
      return NextResponse.json(
        { error: 'Missing required fields: quoteId, paymentInfo, effectiveDate' },
        { status: 400 }
      );
    }

    // Extract carrier ID from quote ID (assuming format: carrierId_timestamp_random)
    const carrierId = bindRequest.quoteId.split('_')[0];

    // Bind policy with carrier
    const bindResult = await carrierIntegrationService.bindPolicy(carrierId, bindRequest);

    if (bindResult.success) {
      // In a real implementation, save policy to database
      await savePolicyToDatabase(bindResult);

      return NextResponse.json({
        success: true,
        policyNumber: bindResult.policyNumber,
        effectiveDate: bindResult.effectiveDate,
        confirmationNumber: bindResult.confirmationNumber,
        documents: bindResult.documents,
        message: 'Policy bound successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Policy binding failed', details: bindResult.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Policy Binding Error:', error);
    return NextResponse.json(
      { error: 'Failed to bind policy', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const policyNumber = searchParams.get('policyNumber');

  if (!policyNumber) {
    return NextResponse.json(
      { error: 'Missing required parameter: policyNumber' },
      { status: 400 }
    );
  }

  try {
    // In a real implementation, fetch from database
    const policy = await getPolicyFromDatabase(policyNumber);

    return NextResponse.json({
      success: true,
      policy
    });

  } catch (error) {
    console.error('Get Policy Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve policy' },
      { status: 500 }
    );
  }
}

async function savePolicyToDatabase(bindResult: PolicyBindResponse): Promise<void> {
  // Production implementation with actual database save
  console.log('Saving policy to database:', bindResult);
  
  try {
    // In production, replace with your actual database save operation
    
    // Example PostgreSQL implementation:
    /*
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    await pool.query(`
      INSERT INTO policies (
        policy_number, confirmation_number, effective_date, 
        expiration_date, status, documents, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    `, [
      bindResult.policyNumber,
      bindResult.confirmationNumber,
      bindResult.effectiveDate,
      bindResult.expirationDate,
      'active',
      JSON.stringify(bindResult.documents)
    ]);
    */
    
    // Example MongoDB implementation:
    /*
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URL);
    
    await client.connect();
    const db = client.db('matchedcover');
    
    await db.collection('policies').insertOne({
      ...bindResult,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await client.close();
    */
    
    // Log for audit trail (in production, save to audit log table)
    console.log('Policy saved successfully:', {
      policyNumber: bindResult.policyNumber,
      confirmationNumber: bindResult.confirmationNumber,
      effectiveDate: bindResult.effectiveDate,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database error saving policy:', error);
    throw new Error('Failed to save policy to database');
  }
}

async function getPolicyFromDatabase(policyNumber: string): Promise<any> {
  // Production implementation with actual database query
  console.log('Fetching policy from database:', policyNumber);
  
  try {
    // In production, replace with your actual database connection
    // Examples: PostgreSQL, MongoDB, MySQL, etc.
    
    // Example PostgreSQL implementation:
    /*
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    const result = await pool.query(`
      SELECT 
        p.*,
        c.customer_name,
        c.email,
        c.phone
      FROM policies p
      JOIN customers c ON p.customer_id = c.id
      WHERE p.policy_number = $1 AND p.status = 'active'
    `, [policyNumber]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
    */
    
    // Example MongoDB implementation:
    /*
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URL);
    
    await client.connect();
    const db = client.db('matchedcover');
    
    const policy = await db.collection('policies').findOne({
      policyNumber: policyNumber,
      status: 'active'
    });
    
    await client.close();
    return policy;
    */
    
    // For now, return a realistic example policy structure
    // This should be replaced with actual database call
    if (policyNumber.includes('_')) {
      return {
        id: policyNumber,
        policyNumber: policyNumber,
        customerId: `customer_${policyNumber.split('_')[1]}`,
        carrierName: policyNumber.split('_')[0].toUpperCase(),
        productType: 'auto',
        status: 'active',
        effectiveDate: new Date().toISOString(),
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        premium: {
          annual: 1200,
          monthly: 100
        },
        coverage: {
          liability: {
            bodilyInjury: 100000,
            propertyDamage: 50000
          },
          collision: {
            deductible: 500
          },
          comprehensive: {
            deductible: 500
          }
        },
        customer: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567'
        },
        documents: [
          {
            type: 'policy_document',
            url: `/api/documents/${policyNumber}/policy.pdf`,
            uploadedAt: new Date().toISOString()
          },
          {
            type: 'id_card',
            url: `/api/documents/${policyNumber}/id_card.pdf`,
            uploadedAt: new Date().toISOString()
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    // Default mock response if no data found
    return {
      policyNumber,
      status: 'active',
      effectiveDate: new Date().toISOString(),
      coverages: [
        { type: 'liability', limit: '100/300/100' },
        { type: 'collision', deductible: 500 },
        { type: 'comprehensive', deductible: 500 }
      ],
      premium: {
        annual: 1200,
        monthly: 100
      }
    };
    
  } catch (error) {
    console.error('Database error fetching policy:', error);
    throw new Error('Failed to fetch policy from database');
  }
}
