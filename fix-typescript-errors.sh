#!/bin/bash

# Fix TypeScript syntax errors by removing malformed ": unknown" annotations

echo "Fixing TypeScript syntax errors..."

# Find all TypeScript files with ": unknown" pattern
files=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -l ": unknown")

for file in $files; do
    echo "Fixing $file..."
    
    # Remove ": unknown" from various contexts
    sed -i.bak \
        -e 's/(: unknown)/()/g' \
        -e 's/: unknown,/,/g' \
        -e 's/: unknown)/)/g' \
        -e 's/: unknown;/;/g' \
        -e 's/: unknown}/}/g' \
        -e 's/: unknown]/]/g' \
        -e 's/: unknown$//' \
        -e 's/, : unknown/, /g' \
        -e 's/\.\.\. : unknown/.../g' \
        "$file"
    
    # Remove backup file
    rm "${file}.bak"
done

echo "Fixed TypeScript syntax errors in $(echo "$files" | wc -l) files"
