#!/bin/bash

# Configuration
IMAGE_NAME="geestone/ecogaspi-admin"
CONTAINER_NAME="ecogaspi-admin"
VERSION="latest"
FULL_IMAGE="${IMAGE_NAME}:${VERSION}"

echo "=== Déploiement de ecogaspi-admin ==="
echo "Image: ${FULL_IMAGE}"
echo ""

# Arrêter et supprimer l'ancien conteneur s'il existe
echo "1. Arrêt et suppression de l'ancien conteneur..."
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

# Télécharger la dernière version de l'image
echo "2. Téléchargement de la dernière image..."
docker pull ${FULL_IMAGE}

# Démarrer le nouveau conteneur
echo "3. Démarrage du nouveau conteneur..."
docker run -d \
  --name ${CONTAINER_NAME} \
  --restart always \
  -p 84:80 \
  -v "$(pwd)/logs:/var/log/nginx" \
  ${FULL_IMAGE}

# Vérifier que le conteneur fonctionne
echo "4. Vérification du statut..."
sleep 5

if docker ps | grep -q ${CONTAINER_NAME}; then
    echo "✅ Conteneur ${CONTAINER_NAME} démarré avec succès"
    echo "🌐 Application accessible sur: http://localhost:84"
    echo ""

    # Afficher les logs récents
    echo "Logs récents:"
    docker logs --tail 10 ${CONTAINER_NAME}
else
    echo "❌ Erreur: Le conteneur n'a pas pu démarrer"
    echo "Logs d'erreur:"
    docker logs ${CONTAINER_NAME}
    exit 1
fi

echo ""
echo "=== Déploiement terminé ==="