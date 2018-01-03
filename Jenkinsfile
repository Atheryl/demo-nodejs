node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build container') {
        app = docker.build("atheryl/demo-nodejs")
    }

    stage('Test container') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    env.WORKSPACE = pwd()
    def version = readFile "${env.WORKSPACE}/version.txt"
    
    stage('Push container') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push(("v" + version).trim())
        }
    }
    
    stage('Update Pods') {
        def cmd = '/usr/local/bin/kubectl --kubeconfig=/root/.kube/config set image deployments/demo-nodejs demo-nodejs=docker.io/atheryl/demo-nodejs:' + version
        sh cmd
    }
}
