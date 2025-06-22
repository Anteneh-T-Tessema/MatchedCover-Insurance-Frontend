#!/usr/bin/env node

import { ControlMapping, ControlMappingEngine, ComplianceFramework } from '../interfaces/ComplianceFramework';
import { frameworkRegistry } from '../registry/FrameworkRegistry';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Control details interface for type safety
 */
interface ControlDetails {
  id: string;
  name: string;
  description: string;
  category?: string;
  domain?: string;
  severity?: string;
  requirements?: string[];
  references?: string[];
}

/**
 * Mapping report interface
 */
interface MappingReport {
  generated: string;
  totalMappings: number;
  mappingsByType: Record<string, number>;
  mappingsByFramework: Record<string, number>;
  confidenceDistribution: Record<string, number>;
  recommendations: string[];
}

/**
 * Control Mapping Engine Implementation
 * Maps controls between different compliance frameworks
 */
export class ControlMappingEngineImpl implements ControlMappingEngine {
  private mappings: Map<string, ControlMapping[]> = new Map();
  private mappingCache: Map<string, ControlMapping[]> = new Map();

  constructor() {
    this.loadMappings();
  }

  private loadMappings(): void {
    try {
      const mappingDir = path.join(process.cwd(), 'data', 'mappings');
      if (!fs.existsSync(mappingDir)) {
        fs.mkdirSync(mappingDir, { recursive: true });
        return;
      }

      const mappingFiles = fs.readdirSync(mappingDir)
        .filter(file => file.endsWith('.json'));

      for (const file of mappingFiles) {
        const filePath = path.join(mappingDir, file);
        const mappingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const key = this.getMappingKey(mappingData.sourceFramework, mappingData.targetFramework);
        this.mappings.set(key, mappingData.mappings || []);
      }

      console.log(`🔗 Loaded ${this.mappings.size} control mapping sets`);
    } catch {
      console.log(`⚠️ No existing control mappings found, starting with empty mappings`);
    }
  }

  private getMappingKey(sourceFramework: string, targetFramework: string): string {
    return ${sourceFramework}->${targetFramework};
  }

  async mapControls(sourceFramework: string, targetFramework: string): Promise<ControlMapping[]> {
    const cacheKey = this.getMappingKey(sourceFramework, targetFramework);
    
    // Check cache first
    if (this.mappingCache.has(cacheKey)) {
      return this.mappingCache.get(cacheKey)!;
    }

    // Check pre-existing mappings
    if (this.mappings.has(cacheKey)) {
      const mappings = this.mappings.get(cacheKey)!;
      this.mappingCache.set(cacheKey, mappings);
      return mappings;
    }

    // Generate new mappings
    const mappings = await this.generateMappings(sourceFramework, targetFramework);
    this.mappings.set(cacheKey, mappings);
    this.mappingCache.set(cacheKey, mappings);
    
    // Save to disk
    await this.saveMappings(sourceFramework, targetFramework, mappings);
    
    return mappings;
  }

  private async generateMappings(sourceFramework: string, targetFramework: string): Promise<ControlMapping[]> {
    const sourceFrameworkData = await frameworkRegistry.getFramework(sourceFramework);
    const targetFrameworkData = await frameworkRegistry.getFramework(targetFramework);
    
    const mappings: ControlMapping[] = [];

    for (const sourceControl of sourceFrameworkData.controls) {
      const potentialMappings = await this.findPotentialMappings(
        sourceControl,
        sourceFrameworkData,
        targetFrameworkData
      );
      
      mappings.push(...potentialMappings);
    }

    console.log(`🔄 Generated ${mappings.length} control mappings from ${sourceFramework} to ${targetFramework}`);
    return mappings;
  }

  private async findPotentialMappings(
    sourceControl: ControlDetails,
    sourceFramework: ComplianceFramework,
    targetFramework: ComplianceFramework
  ): Promise<ControlMapping[]> {
    const mappings: ControlMapping[] = [];

    for (const targetControl of targetFramework.controls) {
      const similarity = this.calculateControlSimilarity(sourceControl, targetControl);
      
      if (similarity.score >= 0.7) {
        mappings.push({
          sourceFramework: sourceFramework.id,
          sourceControlId: sourceControl.id,
          targetFramework: targetFramework.id,
          targetControlId: targetControl.id,
          mappingType: similarity.score >= 0.9 ? 'exact' : 
                      similarity.score >= 0.8 ? 'equivalent' : 'partial',
          confidence: Math.round(similarity.score * 100),
          notes: similarity.reasoning
        });
      }
    }

    return mappings;
  }

  private calculateControlSimilarity(control1: ControlDetails, control2: ControlDetails): { score: number; reasoning: string } {
    let score = 0;
    const reasons: string[] = [];

    // Compare names (30% weight)
    const nameScore = this.textSimilarity(control1.name, control2.name);
    score += nameScore * 0.3;
    if (nameScore > 0.5) reasons.push(`Similar names (${Math.round(nameScore * 100)}%)`);

    // Compare descriptions (40% weight)
    const descScore = this.textSimilarity(control1.description, control2.description);
    score += descScore * 0.4;
    if (descScore > 0.5) reasons.push(`Similar descriptions (${Math.round(descScore * 100)}%)`);

    // Compare domains (20% weight)
    const domainScore = control1.domain === control2.domain ? 1 : 0;
    score += domainScore * 0.2;
    if (domainScore > 0) reasons.push('Same domain');

    // Compare severity (10% weight)
    const severityScore = control1.severity === control2.severity ? 1 : 0;
    score += severityScore * 0.1;
    if (severityScore > 0) reasons.push('Same severity level');

    return {
      score,
      reasoning: reasons.length > 0 ? reasons.join(', ') : 'Low similarity'
    };
  }

  private textSimilarity(text1: string, text2: string): number {
    if (!text1 || !text2) return 0;
    
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size; // Jaccard similarity
  }

  async findEquivalentControls(controlId: string, frameworkId: string): Promise<ControlMapping[]> {
    const allFrameworks = await frameworkRegistry.getAllFrameworks();
    const equivalentMappings: ControlMapping[] = [];

    for (const framework of allFrameworks) {
      if (framework.id === frameworkId) continue;

      const mappings = await this.mapControls(frameworkId, framework.id);
      const equivalents = mappings.filter(m => 
        m.sourceControlId === controlId && 
        (m.mappingType === 'exact' || m.mappingType === 'equivalent')
      );
      
      equivalentMappings.push(...equivalents);
    }

    return equivalentMappings;
  }

  async generateMappingReport(mappings: ControlMapping[]): Promise<string> {
    const report = {
      generated: new Date().toISOString(),
      totalMappings: mappings.length,
      mappingsByType: this.groupMappingsByType(mappings),
      mappingsByFramework: this.groupMappingsByFramework(mappings),
      confidenceDistribution: this.getConfidenceDistribution(mappings),
      recommendations: this.generateRecommendations(mappings)
    };

    // Generate markdown report
    const markdown = this.formatMappingReportAsMarkdown(report);
    
    // Save to file
    const reportDir = path.join(process.cwd(), 'mapping-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const filename = mapping-report-${Date.now()}.md;
    const filepath = path.join(reportDir, filename);
    fs.writeFileSync(filepath, markdown);
    
    console.log(`📊 Mapping report generated: ${filepath}`);
    return filepath;
  }

  private groupMappingsByType(mappings: ControlMapping[]): Record<string, number> {
    const groups: Record<string, number> = {};
    for (const mapping of mappings) {
      groups[mapping.mappingType] = (groups[mapping.mappingType] || 0) + 1;
    }
    return groups;
  }

  private groupMappingsByFramework(mappings: ControlMapping[]): Record<string, number> {
    const groups: Record<string, number> = {};
    for (const mapping of mappings) {
      const key = `${mapping.sourceFramework} → ${mapping.targetFramework}`;
      groups[key] = (groups[key] || 0) + 1;
    }
    return groups;
  }

  private getConfidenceDistribution(mappings: ControlMapping[]): Record<string, number> {
    const buckets = { 'High (80-100%)': 0, 'Medium (60-79%)': 0, 'Low (0-59%)': 0 };
    
    for (const mapping of mappings) {
      if (mapping.confidence >= 80) buckets['High (80-100%)']++;
      else if (mapping.confidence >= 60) buckets['Medium (60-79%)']++;
      else buckets['Low (0-59%)']++;
    }
    
    return buckets;
  }

  private generateRecommendations(mappings: ControlMapping[]): string[] {
    const recommendations: string[] = [];
    
    const lowConfidence = mappings.filter(m => m.confidence < 60).length;
    if (lowConfidence > 0) {
      recommendations.push(Review ${lowConfidence} low-confidence mappings for accuracy);
    }
    
    const partialMappings = mappings.filter(m => m.mappingType === 'partial').length;
    if (partialMappings > 0) {
      recommendations.push(`Consider strengthening ${partialMappings} partial control mappings`);
    }
    
    const missingMappings = mappings.filter(m => m.mappingType === 'related').length;
    if (missingMappings > 10) {
      recommendations.push('High number of related-only mappings suggests gaps in framework alignment');
    }
    
    return recommendations;
  }

  private formatMappingReportAsMarkdown(report: MappingReport): string {
    return `# Control Mapping Analysis Report

**Generated:** ${report.generated}
**Total Mappings:** ${report.totalMappings}

## Mapping Distribution

### By Type
${Object.entries(report.mappingsByType)
  .map(([type, count]) => - **${type}:** ${count})
  .join('\n')}

### By Framework Pair
${Object.entries(report.mappingsByFramework)
  .map(([pair, count]) => - **${pair}:** ${count})
  .join('\n')}

## Confidence Analysis
${Object.entries(report.confidenceDistribution)
  .map(([range, count]) => - **${range}:** ${count})
  .join('\n')}

## Recommendations
${report.recommendations.map((rec: string) => - ${rec}).join('\n')}

---
*Generated by Control Mapping Engine*
`;
  }

  async validateMapping(mapping: ControlMapping): Promise<boolean> {
    try {
      // Validate source framework and control exist
      const sourceFramework = await frameworkRegistry.getFramework(mapping.sourceFramework);
      const sourceControlExists = sourceFramework.controls.some((c: ControlDetails) => c.id === mapping.sourceControlId);
      
      if (!sourceControlExists) return false;

      // Validate target framework and control exist
      const targetFramework = await frameworkRegistry.getFramework(mapping.targetFramework);
      const targetControlExists = targetFramework.controls.some((c: ControlDetails) => c.id === mapping.targetControlId);
      
      if (!targetControlExists) return false;

      // Validate mapping properties
      const validTypes = ['exact', 'partial', 'related', 'equivalent'];
      if (!validTypes.includes(mapping.mappingType)) return false;

      if (mapping.confidence < 0 || mapping.confidence > 100) return false;

      return true;
    } catch {
      return false;
    }
  }

  private async saveMappings(sourceFramework: string, targetFramework: string, mappings: ControlMapping[]): Promise<void> {
    const mappingDir = path.join(process.cwd(), 'data', 'mappings');
    if (!fs.existsSync(mappingDir)) {
      fs.mkdirSync(mappingDir, { recursive: true });
    }

    const filename = ${sourceFramework}-to-${targetFramework}.json;
    const filepath = path.join(mappingDir, filename);
    
    const data = {
      sourceFramework,
      targetFramework,
      generated: new Date().toISOString(),
      mappings
    };

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`💾 Saved ${mappings.length} mappings to ${filepath}`);
  }
}

// Export singleton instance
export const controlMappingEngine = new ControlMappingEngineImpl();
