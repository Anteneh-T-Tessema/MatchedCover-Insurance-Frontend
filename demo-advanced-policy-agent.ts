import { AdvancedPolicyAgent, PolicyTemplate, ApprovalStep } from './src/agents/AdvancedPolicyAgent';

async function demonstrateAdvancedPolicyAgent() {
  console.log('🏗️ AdvancedPolicyAgent Comprehensive Demonstration');
  console.log('=====================================');
  
  const agent = new AdvancedPolicyAgent();
  
  // 1. Show policy categories and features
  console.log('\n📋 Supported Policy Categories:');
  const categories = ['security', 'privacy', 'operational', 'hr', 'compliance', 'business_continuity'];
  categories.forEach(cat => console.log(`  - ${cat}`));
  
  console.log('\n⚙️ Key Features:');
  console.log('  ✅ AI-powered policy generation using Google Gemini');
  console.log('  ✅ Compliance gap analysis across multiple frameworks');
  console.log('  ✅ Framework mapping (SOC2, ISO27001, GDPR, CCPA, HIPAA, PCI_DSS)');
  console.log('  ✅ Multi-stage approval workflow management');
  console.log('  ✅ Training material generation');
  console.log('  ✅ Automated policy review scheduling');
  console.log('  ✅ Policy versioning and change management');
  
  // 2. Demonstrate approval workflow
  console.log('\n🔄 Security Policy Approval Workflow:');
  const securityWorkflow = (agent as any).createApprovalWorkflow('security');
  securityWorkflow.forEach((step: ApprovalStep) => {
    console.log(`  Step ${step.step_number}: ${step.approver_role} (${step.status})`);
  });
  
  console.log('\n🔄 Privacy Policy Approval Workflow:');
  const privacyWorkflow = (agent as any).createApprovalWorkflow('privacy');
  privacyWorkflow.forEach((step: ApprovalStep) => {
    console.log(`  Step ${step.step_number}: ${step.approver_role} (${step.status})`);
  });
  
  // 3. Show stakeholder mapping
  console.log('\n👥 Stakeholder Mapping:');
  categories.forEach(category => {
    const stakeholders = (agent as any).getStakeholders(category);
    console.log(`  ${category}: ${stakeholders.join(', ')}`);
  });
  
  // 4. Show control mapping
  console.log('\n🎯 SOC 2 Control Mapping:');
  categories.forEach(category => {
    const controls = (agent as any).getRelatedControls(category);
    if (controls.length > 0) {
      console.log(`  ${category}: ${controls.join(', ')}`);
    }
  });
  
  // 5. Show review cycles
  console.log('\n📅 Policy Review Cycles:');
  categories.forEach(category => {
    const months = (agent as any).getReviewCycle(category);
    console.log(`  ${category}: ${months} months`);
  });
  
  console.log('\n🎯 Use Cases:');
  console.log('  • Generate comprehensive policy frameworks for SOC 2 compliance');
  console.log('  • Identify compliance gaps across multiple regulatory frameworks');  
  console.log('  • Create structured approval workflows with role-based authorization');
  console.log('  • Generate training materials for policy awareness programs');
  console.log('  • Maintain policy lifecycle with automated review scheduling');
  console.log('  • Map policies to specific compliance controls and frameworks');
  
  console.log('\n✅ AdvancedPolicyAgent demonstration complete!');
  console.log('💡 This agent is ready for enterprise-grade policy management.');
}

demonstrateAdvancedPolicyAgent().catch(console.error);
