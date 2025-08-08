pipeline {
    agent {
        docker {
            image 'cypress/included:14.5.0'
            args '-u root' // para ter permissão de instalar pacotes, se necessário
        }
    }
    
    environment { 
        ALLURE_HOME = "${tool 'allure'}"
        PATH = "$ALLURE_HOME/bin:$PATH"
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
                sh "npx cypress run --browser chrome --headless"
            }
        }

       stage('Deploy Allure') {
            steps {
                allure([
                    includeProperties: false, 
                    jdk: '', 
                    results: [[path: 'cypress/allure-results']]
                ])
            }
        }
    }
}
