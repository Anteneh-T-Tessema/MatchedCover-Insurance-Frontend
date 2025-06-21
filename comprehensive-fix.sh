#!/bin/bash

# More comprehensive TypeScript syntax fixes

echo "Running comprehensive TypeScript syntax fixes..."

# Find all TypeScript files
files=$(find src -name "*.ts" -o -name "*.tsx")

for file in $files; do
    echo "Fixing $file..."
    
    # Fix common syntax issues
    sed -i.bak \
        -e 's/`\*\*\([^*]*\)\*\*\(`\|:\)/\*\*\1\*\*/g' \
        -e 's/`\*\*\([^*]*\)\*\*: \${/\*\*\1:\*\* \${/g' \
        -e 's/`\*\*\([^*]*\)\*\*\(`\|$\)/\*\*\1\*\*/g' \
        -e 's/\\\*\\\*/\*\*/g' \
        "$file"
    
    # Remove backup file
    rm "${file}.bak" 2>/dev/null || true
done

echo "Applied comprehensive syntax fixes"
