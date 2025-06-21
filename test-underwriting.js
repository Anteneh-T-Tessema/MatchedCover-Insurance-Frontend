// Quick test of the underwriting engine
const { AIUnderwritingEngine } = require('./src/services/underwriting/AIUnderwritingEngine.ts');

async function testUnderwriting() {
  try {
    console.log('🔍 Testing AI Underwriting Engine...');
    
    const engine = new AIUnderwritingEngine();
    
    const testRiskFactors = {
      age: 30,
      creditScore: 750,
      occupation: 'Software Engineer',
      educationLevel: 'Bachelor',
      maritalStatus: 'married',
      locationRiskScore: 3,
      claimsHistory: [],
      financialStability: 8,
      weatherPatterns: {
        averageRainfall: 35,
        hurricaneRisk: 2,
        floodZone: 'X',
        earthquakeRisk: 1,
        wildFireRisk: 0
      },
      economicFactors: {
        localUnemploymentRate: 3.5,
        medianIncome: 75000,
        propertyValueTrend: 110,
        inflationRate: 2.5
      },
      marketConditions: {
        competitorPricing: [1200, 1350, 1100],
        marketPenetration: 0.6,
        seasonalFactors: 2,
        regulatoryChanges: ['Rate filing approved']
      }
    };
    
    const result = await engine.underwrite(testRiskFactors, 'auto', 100000, 1000);
    
    console.log('✅ Underwriting successful!');
    console.log('📊 Decision:', result.approved ? 'APPROVED' : 'DECLINED');
    console.log('🎯 Risk Score:', result.riskScore);
    console.log('💰 Final Premium:', result.finalPremium);
    console.log('🔍 Confidence:', result.confidence + '%');
    
  } catch (error) {
    console.error('❌ Underwriting test failed:', error.message);
  }
}

testUnderwriting();
