pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: "cypress/integration/**/**", description: "Enter the scripts path that tou want to execute")
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: "Choice the browser where you want to execute your scripts")
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Building') {
            steps {
                echo "Building the application"
            }
        }
        stage('Testing') {
            steps {
                bat "npm i"
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploying') {
            steps {
                echo "Deploy the application"
            }
        }
    }

    post {
        always {
            publishHTML([allowMissing: true, 
                         alwaysLinkToLastBuild: true, 
                         keepAll: true, 
                         reportDir: 'cypress/reports/html', 
                         reportFiles: 'index.html', 
                         reportName: 'Cypress Test Report'
                        ])
        }
    }
}