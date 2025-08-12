pipeline {
    agent any
    
    stages {
        stage('Iniciar o ServeRest') {
            steps {
                bat 'docker run -d --name serverest -p 3000:3000 paulogoncalvesbh/serverest:latest'
            }
        }
        
        stage('Instalar dependências') {
            steps {
                bat 'npm ci' // Ou yarn install, dependendo do gerenciador de pacotes
            }
        }
        
        stage('Executar testes') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx cypress run'
                } // Executa os testes Cypress
            }
        }

        // stage('Gerar relatório Allure') {
        //     steps {
        //         // Comando para gerar relatório Allure (ajuste conforme seu projeto)
        //         bat 'allure generate ./allure-results --clean -o ./allure-report'
        //     }
        // }

        stage('Publicar relatório Allure') {
            steps {
                allure includeProperties: false, results: [[path: 'allure-results']]
            }
        }
    }
    
    post {
        always {
            bat 'docker stop serverest || true'
            bat 'docker rm serverest || true'
        }
    }
}
