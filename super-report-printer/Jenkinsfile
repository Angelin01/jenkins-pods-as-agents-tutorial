pipeline {
    // We should really use some specific agent, we are getting crashes on some agents without Node or Docker!
    agent any

    options {
        buildDiscarder logRotator(numToKeepStr: '10')
        disableConcurrentBuilds()
        timeout(time: 10, unit: 'MINUTES')
    }

    stages {
        stage('Generate Report') {
            steps {
                sh './report_generator.py'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Typescript') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Image') {
            environment {
                DOCKER_BUILDKIT = "1"
            }
            steps {
                // Some of our agents don't have Docker, what do we do?
                // Also, we are always tagging with the same tag! Help!
                sh 'docker build -t super-report-printer:v0.1.0 .'
            }
        }
    }
}
