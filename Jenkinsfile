pipeline {
    agent any
    stages {
        stage('Build Jar') {
            agent {
                docker {
                    image 'maven:3.9.0-eclipse-temurin-17'
                    args '-v /root/.m2:/root/.m2'
                }
            }
            steps {
                sh 'mvn spring-boot:run -DskipTests'
            }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t common:latest .'
            }
        }
    }
}
