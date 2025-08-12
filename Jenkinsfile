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
                bat 'npx cypress run' // Executa os testes Cypress
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
