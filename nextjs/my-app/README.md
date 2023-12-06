Docker commands:
build:
docker build -t suhaasregistry.azurecr.io/nextapp:0.0 . 
push:
docker push suhaasregistry.azurecr.io/nextapp:0.0
login:
az acr login --name suhaasregistry 
