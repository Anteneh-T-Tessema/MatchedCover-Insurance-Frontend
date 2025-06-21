#!/bin/bash

# Fix template literal issues in TypeScript files

echo "Fixing template literal syntax issues..."

# Find files with template literal issues
files=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -l '`[^`]*\${' | head -10)

for file in $files; do
    echo "Fixing template literals in $file..."
    
    # Fix escaped backticks in template literals
    sed -i.bak \
        -e 's/`\([^`]*\)\${/\1${/g' \
        -e 's/}`\([^`]*\)`/}\1/g' \
        -e 's/\`\*\*/\*\*/g' \
        -e 's/\*\*\`/\*\*/g' \
        "$file"
    
    # Remove backup file
    rm "${file}.bak" 2>/dev/null || true
done

echo "Fixed template literal syntax issues"
