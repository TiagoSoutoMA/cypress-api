pipeline {
    
    agent any

    tools {
        nodejs "Node"
    }
    
    stages {
        stage('Building') {
            steps {
                echo "Building the application"
                sh "npm install"
            }
        }
        
        stage('Testing') {
            steps {
                echo "Running tests"
                sh "npx cypress run"
            }
        }
    }
