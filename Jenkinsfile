pipeline {
    agent any
    
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
