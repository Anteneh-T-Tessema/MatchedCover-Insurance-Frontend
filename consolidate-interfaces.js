#!/usr/bin/env node

/**
 * Interface Consolidation Script
 * Consolidates duplicate interfaces and ensures single source of truth
 */

const fs = require('fs');
const path = require('path');

// Interface mappings and consolidations
const INTERFACE_CONSOLIDATIONS = {
  'ValidationResult': {
    canonical: 'src/types/platform-types.ts',
    duplicates: [
      'src/utils/enhanced-input-validation.ts',
      'src/agents/evaluation/ComplianceValidationAgent.ts'
    ],
    consolidatedDefinition: `export interface ValidationResult {
  passed: boolean;
  score: number;
  issues: string[];
  recommendations: string[];
  timestamp: string;
  validator: string;
  details: Record<string, unknown>;
}

export interface InputValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: unknown;
  details?: Record<string, unknown>;
}

export interface ComplianceValidationDetail {
  status: 'pass' | 'fail' | 'warning';
  score: number;
  findings: string[];
  recommendations: string[];
  details: Record<string, unknown>;
}`
  }
};

async function consolidateInterfaces() {
  console.log('🔧 Starting interface consolidation...');
  
  let consolidatedCount = 0;
  
  for (const [interfaceName, config] of Object.entries(INTERFACE_CONSOLIDATIONS)) {
    console.log(`\n📋 Consolidating interface: ${interfaceName}`);
    
    // Update files that had duplicates
    for (const duplicateFile of config.duplicates) {
      const filePath = path.join(process.cwd(), duplicateFile);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }
      
      let content = fs.readFileSync(filePath, 'utf8');
      
      // For enhanced-input-validation.ts, rename ValidationResult to InputValidationResult
      if (duplicateFile.includes('enhanced-input-validation.ts')) {
        content = content.replace(
          /export interface ValidationResult/g,
          'export interface InputValidationResult'
        );
        content = content.replace(
          /ValidationResult/g,
          'InputValidationResult'
        );
        
        // Add import for the canonical ValidationResult
        if (!content.includes("from '../types/platform-types'")) {
          content = `import { ValidationResult } from '../types/platform-types';\n${content}`;
        }
      }
      
      // For ComplianceValidationAgent.ts, rename to ComplianceValidationDetail
      if (duplicateFile.includes('ComplianceValidationAgent.ts')) {
        content = content.replace(
          /export interface ValidationResult/g,
          'export interface ComplianceValidationDetail'
        );
        content = content.replace(
          /ValidationResult/g,
          'ComplianceValidationDetail'
        );
        
        // Add import for the canonical ValidationResult
        if (!content.includes("from '../../types/platform-types'")) {
          content = `import { ValidationResult } from '../../types/platform-types';\n${content}`;
        }
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated: ${duplicateFile}`);
      consolidatedCount++;
    }
  }
  
  // Update platform-types.ts with the consolidated definitions
  const platformTypesPath = path.join(process.cwd(), 'src/types/platform-types.ts');
  let platformContent = fs.readFileSync(platformTypesPath, 'utf8');
  
  // Check if we need to add the additional interfaces
  if (!platformContent.includes('InputValidationResult')) {
    const insertPoint = platformContent.indexOf('export interface ValidationResult');
    if (insertPoint !== -1) {
      const beforeInsert = platformContent.substring(0, insertPoint);
      const afterInsert = platformContent.substring(insertPoint);
      
      platformContent = beforeInsert + 
        INTERFACE_CONSOLIDATIONS.ValidationResult.consolidatedDefinition + '\n\n' +
        afterInsert.replace(/export interface ValidationResult[\s\S]*?^}/m, '');
    }
    
    fs.writeFileSync(platformTypesPath, platformContent);
    console.log(`✅ Updated platform-types.ts with consolidated definitions`);
  }
  
  console.log(`\n📊 Interface consolidation complete!`);
  console.log(`   Updated ${consolidatedCount} files`);
  console.log(`   Eliminated duplicate interfaces`);
  console.log(`   Established single source of truth in platform-types.ts`);
}

// Run the consolidation
consolidateInterfaces().catch(console.error);
