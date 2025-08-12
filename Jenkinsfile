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
                bat 'npm ci'
            }
        }
        
        stage('Preparar histórico Allure') {
            steps {
                script {
                    step([$class: 'CopyArtifact',
                          projectName: env.JOB_NAME,
                          selector: [$class: 'StatusBuildSelector', stable: true],
                          filter: 'allure-report/history/**',
                          target: 'previous-history',
                          flatten: false,
                          optional: true])
                }
                
                bat """
                    if exist previous-history\\history (
                        xcopy /E /I /Y previous-history\\history allure-results\\history
                    )
                """
            }
        }

        stage('Capturar versões para Environment') {
            steps {
                script {
                    // Captura a versão do node instalado no agente Jenkins
                    def nodeVersion = bat(script: 'node -v', returnStdout: true).trim()

                    // Captura a versão do cypress instalada no projeto
                    def cypressVersion = bat(script: 'npx cypress -v', returnStdout: true).trim()

                    // Captura data e hora da execução (usando shell do Windows)
                    def date = bat(script: 'echo %DATE% %TIME%', returnStdout: true).trim()

                    // Salva no arquivo environment.properties dentro da pasta allure-results
                    bat """
                    echo url=http://localhost:3000 > allure-results/environment.properties
                    echo ambiente=docker local >> allure-results/environment.properties
                    echo versaoServer=paulogoncalvesbh/serverest:latest >> allure-results/environment.properties
                    echo nodeVersion=${nodeVersion} >> allure-results/environment.properties
                    echo cypressVersion=${cypressVersion} >> allure-results/environment.properties
                    echo dataExecucao=${date} >> allure-results/environment.properties
                    echo SO=Windows >> allure-results/environment.properties
                    """
                }
            }
        }
        
        stage('Executar testes') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npx cypress run'
                }
            }
        }
        
        stage('Gerar relatório Allure') {
            steps {
                bat 'allure generate ./allure-results --clean -o ./allure-report'
            }
        }
        
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
            
            // Salva o histórico da build atual para a próxima execução
            archiveArtifacts artifacts: 'allure-report/history/**', allowEmptyArchive: true
        }
    }
}
