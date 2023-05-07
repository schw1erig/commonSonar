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
            stages {
                stage('Build') {
                    steps {
                        sh 'mvn spring-boot:run -DskipTests'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'export spring_datasource_url=jdbc:mysql://localhost:3306/common'
                        sh 'mvn test'
                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t common:latest .'
            }
        }
    }
}
