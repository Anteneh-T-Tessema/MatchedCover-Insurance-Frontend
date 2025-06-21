#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Comprehensive Agent Syntax Fixer
 * Fixes issues created by the quick quality enhancement script
 */

function findAgentFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.ts') && fullPath.includes('/agents/')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

function fixFileContent(content, filePath) {
  let fixed = content;
  
  // 1. Remove invalid `: unknown` type annotations
  fixed = fixed.replace(/\)\s*:\s*unknown\s*\{/g, ') {');
  fixed = fixed.replace(/\)\s*:\s*unknown\s*$/gm, ')');
  
  // 2. Fix import paths for utils
  fixed = fixed.replace(
    /from\s+['"]\.\.\/utils\//g, 
    'from \'../../utils/'
  );
  
  // 3. Fix import paths for types
  fixed = fixed.replace(
    /from\s+['"]\.\.\/types\//g, 
    'from \'../../types/'
  );
  
  // 4. Fix shebang placement - move to top if not already there
  const lines = fixed.split('\n');
  const shebangIndex = lines.findIndex(line => line.startsWith('#!'));
  
  if (shebangIndex > 0) {
    const shebang = lines[shebangIndex];
    lines.splice(shebangIndex, 1);
    lines.unshift(shebang);
    lines.unshift(''); // Add empty line after shebang
    fixed = lines.join('\n');
  }
  
  // 5. Fix environment manager usage
  fixed = fixed.replace(
    /environmentManager\.get\(['"]([^'"]+)['"]\)/g,
    'process.env.$1 || process.env.NEXT_PUBLIC_$1'
  );
  
  // 6. Fix singleton pattern usage
  fixed = fixed.replace(
    /new EnhancedInputValidator\(\)/g,
    'EnhancedInputValidator.getInstance()'
  );
  
  // 7. Fix async function return types
  fixed = fixed.replace(
    /async function main\(\)\s*:\s*unknown/g,
    'async function main(): Promise<void>'
  );
  
  // 8. Fix switch statement syntax
  fixed = fixed.replace(
    /switch\s*\([^)]+\)\s*:\s*unknown\s*\{/g,
    (match) => match.replace(/\s*:\s*unknown/, '')
  );
  
  // 9. Fix template literal issues in markdown sections
  fixed = fixed.replace(
    /^(\s*)(#.*|##.*|\*\*.*\*\*.*|\-\s+\*\*.*)/gm,
    (match, indent, content) => {
      // If this looks like markdown inside a template literal, wrap it properly
      if (content.includes('${')) {
        return `${indent}\`${content}\``;
      }
      return match;
    }
  );
  
  // 10. Fix catch block syntax issues
  fixed = fixed.replace(
    /}\s*catch\s*\([^)]*\)\s*:\s*unknown\s*\{/g,
    (match) => match.replace(/\s*:\s*unknown/, '')
  );
  
  return fixed;
}

function main() {
  console.log('🔧 Starting comprehensive agent syntax fix...');
  
  const projectRoot = process.cwd();
  const agentFiles = findAgentFiles(projectRoot);
  
  let fixedCount = 0;
  let errorCount = 0;
  
  for (const filePath of agentFiles) {
    try {
      console.log(`📝 Fixing: ${path.relative(projectRoot, filePath)}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixFileContent(content, filePath);
      
      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        fixedCount++;
        console.log(`  ✅ Fixed`);
      } else {
        console.log(`  ⏭️  No changes needed`);
      }
      
    } catch (error) {
      console.error(`  ❌ Error fixing ${filePath}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`  📁 Files processed: ${agentFiles.length}`);
  console.log(`  ✅ Files fixed: ${fixedCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 All agent files fixed successfully!');
  } else {
    console.log('\n⚠️  Some files had errors. Please review manually.');
  }
}

if (require.main === module) {
  main();
}
