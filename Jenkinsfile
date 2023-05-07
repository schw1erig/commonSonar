pipeline {
    agent any
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
        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}'
            sh 'docker tag common:latest darkress/common:latest'
            sh 'docker push darkress/common:latest'
                }
            }
        }
    }
}
