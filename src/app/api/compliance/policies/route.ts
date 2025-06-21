/**
 * Advanced Policy Management API - Frontend Integration
 * Exposes AdvancedPolicyAgent functionality through REST endpoints
 */

import { NextRequest, NextResponse } from 'next/server';
import { AdvancedPolicyAgent } from '@/agents/AdvancedPolicyAgent';

let policyAgentInstance: AdvancedPolicyAgent | null = null;

function getPolicyAgent(): AdvancedPolicyAgent {
  if (!policyAgentInstance) {
    policyAgentInstance = new AdvancedPolicyAgent();
  }
  return policyAgentInstance;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    const agent = getPolicyAgent();

    switch (action) {
      case 'list-policies':
        // For demo purposes, return mock policy list
        const policies = [
          {
            id: 'SEC-001',
            name: 'Information Security Policy',
            type: 'security',
            version: '1.2',
            status: 'active',
            lastUpdated: new Date().toISOString(),
            stakeholders: ['CISO', 'IT Team', 'Legal'],
            controls: ['CC6.1', 'CC6.2', 'CC7.1']
          },
          {
            id: 'ACC-001',
            name: 'Access Control Policy',
            type: 'access',
            version: '1.1',
            status: 'active',
            lastUpdated: new Date().toISOString(),
            stakeholders: ['CISO', 'HR', 'IT Team'],
            controls: ['CC6.1', 'CC6.3']
          },
          {
            id: 'DRP-001',
            name: 'Disaster Recovery Policy',
            type: 'operational',
            version: '1.0',
            status: 'draft',
            lastUpdated: new Date().toISOString(),
            stakeholders: ['Operations', 'IT Team'],
            controls: ['CC5.1', 'CC5.2']
          }
        ];
        return NextResponse.json({ success: true, data: policies });

      case 'analyze-gaps':
        const gapAnalysis = await agent.analyzePolicyGaps();
        return NextResponse.json({ success: true, data: gapAnalysis });

      case 'compliance-mapping':
        const complianceMapping = await agent.createComplianceMapping();
        return NextResponse.json({ success: true, data: complianceMapping });

      case 'generate-framework':
        const policyFramework = await agent.generatePolicyFramework();
        return NextResponse.json({ success: true, data: policyFramework });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported: list-policies, analyze-gaps, compliance-mapping, generate-framework' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Policy API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { action, data } = await request.json();

  try {
    const agent = getPolicyAgent();

    switch (action) {
      case 'generate-framework':
        const policyFramework = await agent.generatePolicyFramework();
        return NextResponse.json({ success: true, data: policyFramework });

      case 'setup-approval':
        const { policyId } = data;
        await agent.setupApprovalWorkflow(policyId);
        const approvalResult = {
          policyId: policyId,
          status: 'approval-workflow-setup',
          timestamp: new Date().toISOString()
        };
        return NextResponse.json({ success: true, data: approvalResult });

      case 'generate-training':
        await agent.generateTrainingMaterials();
        const trainingResult = {
          status: 'training-materials-generated',
          timestamp: new Date().toISOString()
        };
        return NextResponse.json({ success: true, data: trainingResult });

      case 'update-policy':
        const { policyId: updateId, changes, reason } = data;
        // Mock update for demo
        const updateResult = {
          policyId: updateId,
          version: '1.3',
          changes: changes,
          reason: reason,
          status: 'pending-review',
          timestamp: new Date().toISOString()
        };
        return NextResponse.json({ success: true, data: updateResult });

      case 'archive-policy':
        const { policyId: archiveId, archiveReason } = data;
        // Mock archive for demo
        const archiveResult = {
          policyId: archiveId,
          status: 'archived',
          reason: archiveReason,
          timestamp: new Date().toISOString()
        };
        return NextResponse.json({ success: true, data: archiveResult });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported: generate-framework, setup-approval, generate-training, update-policy, archive-policy' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Policy API POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
