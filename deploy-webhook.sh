#!/bin/bash

# Deploy to Vercel using webhook
# This script triggers a deployment via Vercel's deploy hook

set -e

echo "🚀 Starting deployment to Vercel..."

# Check if VERCEL_HOOK_URL is set
if [ -z "$VERCEL_HOOK_URL" ]; then
    echo "❌ Error: VERCEL_HOOK_URL environment variable is not set"
    echo "Please set your Vercel deploy hook URL:"
    echo "export VERCEL_HOOK_URL='https://api.vercel.com/v1/integrations/deploy/...'"
    exit 1
fi

echo "📡 Triggering deployment via webhook..."

# Trigger the deployment
response=$(curl -s -w "%{http_code}" -X POST "$VERCEL_HOOK_URL")
http_code="${response: -3}"
response_body="${response%???}"

if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
    echo "✅ Deployment triggered successfully!"
    echo "📊 Response: $response_body"
    echo "🔗 Check your Vercel dashboard for deployment status"
else
    echo "❌ Deployment failed with HTTP code: $http_code"
    echo "📊 Response: $response_body"
    exit 1
fi

echo "🎉 Deployment webhook triggered! Check Vercel dashboard for progress."
