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

        stage('Gerar environment.properties') {
            steps {
                bat '''
                    echo url=http://localhost:3000 > allure-results\\environment.properties
                    echo ambiente=docker local >> allure-results\\environment.properties
                    echo versaoServer=paulogoncalvesbh/serverest:latest >> allure-results\\environment.properties
        
                    for /f "delims=" %%v in ('node -v') do echo nodeVersion=%%v >> allure-results\\environment.properties
        
                    for /f "delims=" %%c in ('npx cypress -v ^| findstr /R "^Cypress package version:"') do echo %%c >> allure-results\\environment.properties
        
                    for /f "tokens=1-3 delims=/- " %%a in ('date /t') do set dat=%%c-%%b-%%a
                    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set hor=%%a:%%b
                    echo dataExecucao=%dat% %hor% >> allure-results\\environment.properties
        
                    echo SO=Windows >> allure-results\\environment.properties
                '''
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
