pipeline {
    agent none
    stages {
        stage('Build Jar') {
            agent docker {
                image 'maven:3.9.0-eclipse-temurin-17'
                args '-v /root/.m2:/root/.m2'
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
