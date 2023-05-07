pipeline {
    agent none
    stages {
        stage('Build Jar') {
            agent {
                docker 'maven:3.9.0-eclipse-temurin-17 -v /root/.m2:/root/.m2'
            }
            stages {
                stage('Build') {
                    steps {
                        sh 'mvn spring-boot:run -DskipTests'
                    }
                }
            }
        }
    }
}
