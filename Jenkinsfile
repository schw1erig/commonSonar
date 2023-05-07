pipeline {
    agent {
            docker {
                image 'maven:3.9.1-eclipse-temurin-17'
                args '-v /root/.m2:/root/.m2'
            }
        }
    stages {
        stage('Test') {
                    steps {
                        sh './mvnw -Dtest=src/test/java/org/common/common/CommonApplicationTests test'
                    }
                }
        stage('Build Image') {
            steps {
                sh 'docker build -t common:latest .'
            }
        }
    }
}
