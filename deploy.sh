export DOCKER_USERNAME=SECRET1_PLACEHOLDER 
export DOCKER_PASSWORD=SECRET2_PLACEHOLDER
export APPLICATION_PORT=SECRET3_PLACEHOLDER

podman login docker.io -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker pull $DOCKER_USERNAME/backend-conserta-aqui:latest
docker rm -f backend-conserta-aqui
docker run --network conserta-aqui-net --env-file .env -d -p $APPLICATION_PORT:3000 --name backend-conserta-aqui $DOCKER_USERNAME/backend-conserta-aqui
