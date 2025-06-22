#!/bin/bash

# Jenkins CLI method to add credentials
# Note: This requires Jenkins CLI to be set up and authenticated

# Check if Jenkins CLI is available
if ! command -v jenkins-cli &> /dev/null; then
    echo "❌ Jenkins CLI not found. Please use the web interface method."
    echo "Download Jenkins CLI from: http://your-jenkins-url/jnlpJars/jenkins-cli.jar"
    exit 1
fi

# Create credentials XML
cat > vercel-credential.xml << 'EOF'
<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>
  <scope>GLOBAL</scope>
  <id>vercel-hook-url</id>
  <description>Vercel Deploy Hook URL for MatchedCover Frontend</description>
  <secret>https://api.vercel.com/v1/integrations/deploy/prj_udp62d7l8EkGjP1LMxRbnIziYP66/uHzlBabBtW</secret>
</org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>
EOF

# Add credential using Jenkins CLI
jenkins-cli create-credentials-by-xml system::system::jenkins _ < vercel-credential.xml

if [ $? -eq 0 ]; then
    echo "✅ Credential added successfully!"
    rm vercel-credential.xml
else
    echo "❌ Failed to add credential. Please use the web interface."
    rm vercel-credential.xml
fi
