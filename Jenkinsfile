pipeline {
    agent {
            docker {
                image 'maven:3.9.1-eclipse-temurin-17'
                args '-v /root/.m2:/root/.m2'
            }
        }
    stages {
        stage('Build Jar') {
                    steps {
                        sh './mvnw clean package -DskipTests'
                    }
                }
        stage('Build Image') {
            steps {
                sh 'docker build -t common:latest .'
            }
        }
    }
}
