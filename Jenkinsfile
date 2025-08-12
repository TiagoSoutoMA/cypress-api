pipeline {
    agent {
        docker {
            image 'cypress/browsers:node-14.16.0-chrome-89.0' // Imagem Docker com Cypress e Node.js
            args '-u root' // Define o usuário para execução
        }
    }
    stages {
        stage('Instalar dependências') {
            steps {
                bat 'npm install' // Ou yarn install, dependendo do gerenciador de pacotes
            }
        }
        stage('Executar testes') {
            steps {
                bat 'npx cypress run' // Executa os testes Cypress
            }
        }
    }
}
