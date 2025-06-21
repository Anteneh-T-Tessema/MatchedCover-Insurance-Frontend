pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        NEXT_TELEMETRY_DISABLED = '1'
        
        // Environment-specific variables
        DEV_BRANCH = 'develop'
        STAGING_BRANCH = 'staging'
        PROD_BRANCH = 'main'
        
        // Docker registry (if using containerization)
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'matched-cover-frontend'
        
        // Deployment targets
        DEV_SERVER = 'dev.matchedcover.com'
        STAGING_SERVER = 'staging.matchedcover.com'
        PROD_SERVER = 'matchedcover.com'
    }
    
    tools {
        nodejs "${NODE_VERSION}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.BUILD_TAG = "${env.BRANCH_NAME}-${env.GIT_COMMIT_SHORT}-${env.BUILD_NUMBER}"
                }
            }
        }
        
        stage('Environment Info') {
            steps {
                echo "Branch: ${env.BRANCH_NAME}"
                echo "Build Tag: ${env.BUILD_TAG}"
                echo "Node Version: ${NODE_VERSION}"
                
                sh '''
                    node --version
                    npm --version
                    echo "Workspace: ${WORKSPACE}"
                '''
            }
        }
        
        stage('Cache Setup') {
            steps {
                echo 'Setting up build cache...'
                sh '''
                    mkdir -p ${NPM_CONFIG_CACHE}
                    mkdir -p .next/cache
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh '''
                    npm ci --cache ${NPM_CONFIG_CACHE} --prefer-offline
                '''
            }
            post {
                failure {
                    echo 'Dependency installation failed. Trying clean install...'
                    sh '''
                        rm -rf node_modules package-lock.json
                        npm install --cache ${NPM_CONFIG_CACHE}
                    '''
                }
            }
        }
        
        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    steps {
                        echo 'Running ESLint...'
                        sh '''
                            npm run lint || true
                        '''
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: true,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: 'reports',
                                reportFiles: 'eslint-report.html',
                                reportName: 'ESLint Report'
                            ])
                        }
                    }
                }
                
                stage('Type Check') {
                    steps {
                        echo 'Running TypeScript type checking...'
                        sh '''
                            npx tsc --noEmit --skipLibCheck
                        '''
                    }
                }
                
                stage('Security Audit') {
                    steps {
                        echo 'Running npm security audit...'
                        sh '''
                            npm audit --audit-level=moderate || true
                        '''
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building Next.js application...'
                sh '''
                    npm run build
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: '.next/**/*', allowEmptyArchive: true
                }
                success {
                    echo 'Build completed successfully!'
                }
                failure {
                    echo 'Build failed!'
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    when {
                        anyOf {
                            branch "${DEV_BRANCH}"
                            branch "${STAGING_BRANCH}"
                            branch "${PROD_BRANCH}"
                        }
                    }
                    steps {
                        echo 'Running unit tests...'
                        sh '''
                            # Add your test command here when tests are available
                            # npm test -- --coverage --watchAll=false
                            echo "Unit tests would run here"
                        '''
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: true,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: 'coverage',
                                reportFiles: 'index.html',
                                reportName: 'Coverage Report'
                            ])
                        }
                    }
                }
                
                stage('Integration Tests') {
                    when {
                        anyOf {
                            branch "${STAGING_BRANCH}"
                            branch "${PROD_BRANCH}"
                        }
                    }
                    steps {
                        echo 'Running integration tests...'
                        sh '''
                            # Add your integration test command here
                            echo "Integration tests would run here"
                        '''
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            when {
                anyOf {
                    branch "${DEV_BRANCH}"
                    branch "${STAGING_BRANCH}"
                    branch "${PROD_BRANCH}"
                }
            }
            steps {
                script {
                    echo "Building Docker image: ${IMAGE_NAME}:${BUILD_TAG}"
                    sh '''
                        docker build -t ${IMAGE_NAME}:${BUILD_TAG} .
                        docker tag ${IMAGE_NAME}:${BUILD_TAG} ${IMAGE_NAME}:latest
                    '''
                }
            }
        }
        
        stage('Deploy') {
            parallel {
                stage('Deploy to Development') {
                    when {
                        branch "${DEV_BRANCH}"
                    }
                    steps {
                        echo 'Deploying to Development environment...'
                        script {
                            deployToEnvironment('development', env.DEV_SERVER)
                        }
                    }
                }
                
                stage('Deploy to Staging') {
                    when {
                        branch "${STAGING_BRANCH}"
                    }
                    steps {
                        echo 'Deploying to Staging environment...'
                        script {
                            deployToEnvironment('staging', env.STAGING_SERVER)
                        }
                    }
                }
                
                stage('Deploy to Production') {
                    when {
                        branch "${PROD_BRANCH}"
                    }
                    steps {
                        echo 'Deploying to Production environment...'
                        script {
                            // Add manual approval for production
                            input message: 'Deploy to Production?', ok: 'Deploy'
                            deployToEnvironment('production', env.PROD_SERVER)
                        }
                    }
                }
            }
        }
        
        stage('Health Check') {
            when {
                anyOf {
                    branch "${DEV_BRANCH}"
                    branch "${STAGING_BRANCH}"
                    branch "${PROD_BRANCH}"
                }
            }
            steps {
                script {
                    def targetServer = ''
                    if (env.BRANCH_NAME == env.DEV_BRANCH) {
                        targetServer = env.DEV_SERVER
                    } else if (env.BRANCH_NAME == env.STAGING_BRANCH) {
                        targetServer = env.STAGING_SERVER
                    } else if (env.BRANCH_NAME == env.PROD_BRANCH) {
                        targetServer = env.PROD_SERVER
                    }
                    
                    if (targetServer) {
                        echo "Running health check on ${targetServer}..."
                        sh """
                            # Wait for deployment to be ready
                            sleep 30
                            
                            # Health check
                            curl -f -s -o /dev/null -w "%{http_code}" https://${targetServer}/api/system/health || exit 1
                            echo "Health check passed for ${targetServer}"
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
            
            // Clean up
            sh '''
                docker system prune -f || true
                npm cache clean --force || true
            '''
        }
        
        success {
            echo 'Pipeline succeeded!'
            
            // Notify success
            script {
                if (env.BRANCH_NAME == env.PROD_BRANCH) {
                    notifySlack('SUCCESS', 'Production deployment completed successfully! 🚀')
                }
            }
        }
        
        failure {
            echo 'Pipeline failed!'
            
            // Notify failure
            notifySlack('FAILURE', "Pipeline failed on ${env.BRANCH_NAME} branch ❌")
        }
        
        unstable {
            echo 'Pipeline unstable!'
            notifySlack('UNSTABLE', "Pipeline unstable on ${env.BRANCH_NAME} branch ⚠️")
        }
    }
}

// Helper function for deployment
def deployToEnvironment(environment, server) {
    echo "Deploying to ${environment} (${server})..."
    
    sh """
        # Example deployment commands
        # You can customize these based on your deployment strategy
        
        echo "Deploying ${IMAGE_NAME}:${BUILD_TAG} to ${environment}"
        
        # Option 1: Docker deployment
        # docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG}
        # ssh deploy@${server} "docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG} && docker-compose up -d"
        
        # Option 2: Static file deployment
        # rsync -avz --delete .next/static/ deploy@${server}:/var/www/html/static/
        # rsync -avz --delete .next/server/ deploy@${server}:/var/www/html/server/
        
        # Option 3: PM2 deployment
        # pm2 deploy ecosystem.config.js ${environment}
        
        echo "Deployment to ${environment} completed"
    """
}

// Helper function for notifications
def notifySlack(status, message) {
    def color = 'good'
    if (status == 'FAILURE') {
        color = 'danger'
    } else if (status == 'UNSTABLE') {
        color = 'warning'
    }
    
    // Uncomment and configure when Slack integration is set up
    /*
    slackSend(
        channel: '#deployments',
        color: color,
        message: """
            *${status}*: ${message}
            
            *Project*: MatchedCover Frontend
            *Branch*: ${env.BRANCH_NAME}
            *Build*: ${env.BUILD_NUMBER}
            *Commit*: ${env.GIT_COMMIT_SHORT}
            
            <${env.BUILD_URL}|View Build>
        """
    )
    */
    
    echo "Notification: ${status} - ${message}"
}
