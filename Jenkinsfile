pipeline {
    agent {
            docker {
                image 'maven:3.9.0-eclipse-temurin-17'
                args '-v /root/.m2:/root/.m2'
            }
        }
    stages {
        stage('Build Jar') {
                    steps {
                        sh './mvnw install'
                    }
                }
        stage('Build Image') {
            steps {
                sh 'docker build -t common:latest .'
            }
        }
    }
}
