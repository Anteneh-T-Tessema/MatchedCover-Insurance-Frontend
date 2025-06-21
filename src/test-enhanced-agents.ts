#!/usr/bin/env node

// Test script for new enhanced agents only
import TrustCenterAgent from './agents/TrustCenterAgent';
import VendorRiskAgent from './agents/VendorRiskAgent';
import PredictiveThreatAgent from './agents/PredictiveThreatAgent';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.soc2-agents' });

async function testTrustCenter() {
  console.log('🏛️ Testing Trust Center Agent...');
  
  try {
    const trustCenter = new TrustCenterAgent();
    await trustCenter.initializeTrustCenter();
    await trustCenter.updateTrustScore();
    await trustCenter.processSecurityQuestionnaires();
    await trustCenter.manageCustomerCommunications();
    await trustCenter.generateTrustReport();
    
    console.log('✅ Trust Center Agent test completed successfully!');
  } catch (error) {
    console.error('❌ Trust Center Agent test failed:', error);
    throw error;
  }
}

async function testVendorRisk() {
  console.log('🔍 Testing Vendor Risk Agent...');
  
  try {
    const vendorRisk = new VendorRiskAgent();
    await vendorRisk.scanVendorLandscape();
    await vendorRisk.assessVendorRisk();
    await vendorRisk.monitorVendorCompliance();
    await vendorRisk.automateVendorOnboarding();
    await vendorRisk.generateVendorRiskReport();
    
    console.log('✅ Vendor Risk Agent test completed successfully!');
  } catch (error) {
    console.error('❌ Vendor Risk Agent test failed:', error);
    throw error;
  }
}

async function testThreatIntel() {
  console.log('🔮 Testing Predictive Threat Agent...');
  
  try {
    const threatIntel = new PredictiveThreatAgent();
    await threatIntel.analyzeThreatLandscape();
    await threatIntel.detectAnomalies();
    await threatIntel.predictThreats();
    await threatIntel.generateThreatReports();
    await threatIntel.updateSecurityPosture();
    
    console.log('✅ Predictive Threat Agent test completed successfully!');
  } catch (error) {
    console.error('❌ Predictive Threat Agent test failed:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Testing Enhanced SOC 2 AI Agents');
  console.log('='.repeat(50));
  
  const mode = process.argv[2] || 'all';
  
  try {
    switch (mode) {
      case 'trust-center':
        await testTrustCenter();
        break;
      case 'vendor-risk':
        await testVendorRisk();
        break;
      case 'threat-intel':
        await testThreatIntel();
        break;
      case 'all':
      default:
        await testTrustCenter();
        console.log();
        await testVendorRisk();
        console.log();
        await testThreatIntel();
        break;
    }
    
    console.log('\n🎉 All enhanced agent tests completed successfully!');
    console.log('📁 Check the output directories for generated reports and data');
    
  } catch (error) {
    console.error('\n❌ Enhanced agent tests failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
