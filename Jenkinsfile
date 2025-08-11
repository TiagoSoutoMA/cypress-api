pipeline {
    agent {
        docker {
            image 'cypress/browsers:node-14.16.0-chrome-89.0' // Imagem Docker com Cypress e Node.js
            args '-u root' // Define o usuário para execução
        }
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/TiagoSoutoMA/cypress-api' // Substitua pela URL do seu repositório
            }
        }
        stage('Instalar dependências') {
            steps {
                sh 'npm install' // Ou yarn install, dependendo do gerenciador de pacotes
            }
        }
        stage('Executar testes') {
            steps {
                sh 'npx cypress run' // Executa os testes Cypress
            }
        }
    }
}
