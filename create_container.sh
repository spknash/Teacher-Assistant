az container create \
  --resource-group BuddyGroup \
  --name mycontainer \
  --image buddyregistry.azurecr.io/myimage:v1 \
  --cpu 1 --memory 1 \
  --registry-login-server buddyregistry.azurecr.io \
  #--registry-username AzureUsername \
  #--registry-password AzurePassword \
  #--dns-name-label mycontainer-dns-name-label \
  --ports 80 