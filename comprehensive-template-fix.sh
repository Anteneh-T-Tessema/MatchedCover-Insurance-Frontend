#!/bin/bash

# Comprehensive fix for specific TypeScript template literal issues

echo "Running comprehensive template literal fixes..."

# Fix the specific patterns causing issues
for file in $(find src -name "*.ts" -o -name "*.tsx"); do
    if grep -q '`[^`]*\*\*[^`]*\*\*[^`]*`' "$file" 2>/dev/null; then
        echo "Fixing $file..."
        
        # Fix template literals with escaped backticks and markdown
        sed -i.bak \
            -e 's/`\*\*\([^*]*\)\*\*\(`\|:\)/\*\*\1\*\*/g' \
            -e 's/`\*\*\([^*]*\)\*\*: \${/\*\*\1:\*\* \${/g' \
            -e 's/`\*\*\([^*]*\)\*\*\(`\|$\)/\*\*\1\*\*/g' \
            -e 's/`\([^`]*\)##\([^`]*\)`/\1##\2/g' \
            -e 's/`\([^`]*\)###\([^`]*\)`/\1###\2/g' \
            -e 's/`\([^`]*\)-\([^`]*\)`/\1-\2/g' \
            "$file"
        
        # Remove backup file
        rm "${file}.bak" 2>/dev/null || true
    fi
done

echo "Applied comprehensive template literal fixes"
