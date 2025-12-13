#!/bin/bash

# Script pour construire et pousser l'image Docker vers Docker Hub
# Usage: ./build-and-push.sh [username] [tag]

set -e

# Variables par défaut
DOCKERHUB_USERNAME=${1:-"geestone"}
IMAGE_TAG=${2:-"latest"}
DOCKER_IMAGE="${DOCKERHUB_USERNAME}/ecogaspi-front"

echo "🏗️ Construction et publication de l'image: $DOCKER_IMAGE:$IMAGE_TAG"

# Vérifier que Docker est en cours d'exécution
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker n'est pas en cours d'exécution"
    exit 1
fi

# Vérifier que l'on est connecté à Docker Hub
echo "🔑 Vérification de la connexion Docker Hub..."
if ! docker login --username="$DOCKERHUB_USERNAME" 2>/dev/null; then
    echo "🔑 Connexion à Docker Hub requise..."
    docker login
fi

# Vérifier que Node.js est installé
echo "🟢 Vérification de Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version) trouvé"
else
    echo "❌ Node.js non trouvé, veuillez l'installer"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm ci
fi

# Construire l'image pour x86_64/amd64
echo "🏗️ Construction de l'image Docker pour x86_64/amd64..."
docker buildx build --platform linux/amd64 -t $DOCKER_IMAGE:$IMAGE_TAG -t $DOCKER_IMAGE:latest . --load

# Afficher les informations de l'image
echo "📋 Informations de l'image:"
docker images $DOCKER_IMAGE

# Tester l'image localement (optionnel)
read -p "🧪 Voulez-vous tester l'image localement avant de la publier ? (y/N): " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧪 Test rapide de l'image..."
    CONTAINER_ID=$(docker run -d --rm -p 8080:80 $DOCKER_IMAGE:$IMAGE_TAG)
    sleep 10
    if curl -f http://localhost:8080/health 2>/dev/null; then
        echo "✅ Test réussi!"
    else
        echo "❌ Test échoué ou health check non disponible"
        echo "ℹ️ Vérifiez manuellement: http://localhost:8080"
    fi
    echo "🛑 Appuyez sur Entrée pour arrêter le test et continuer..."
    read
    docker stop $CONTAINER_ID 2>/dev/null || true
fi

# Pousser l'image vers Docker Hub
echo "📤 Publication de l'image vers Docker Hub..."
docker push $DOCKER_IMAGE:$IMAGE_TAG

if [ "$IMAGE_TAG" != "latest" ]; then
    echo "📤 Publication du tag 'latest'..."
    docker push $DOCKER_IMAGE:latest
fi

echo "✅ Image publiée avec succès sur Docker Hub!"
echo "🔗 Image disponible sur: https://hub.docker.com/r/$DOCKERHUB_USERNAME/ecogaspi-front"
echo "📥 Pour l'utiliser: docker pull $DOCKER_IMAGE:$IMAGE_TAG"

# Générer un tag de version basé sur la date si c'est "latest"
if [ "$IMAGE_TAG" = "latest" ]; then
    VERSION_TAG="v$(date +%Y%m%d-%H%M%S)"
    echo "🏷️ Création d'un tag de version: $VERSION_TAG"
    docker tag $DOCKER_IMAGE:latest $DOCKER_IMAGE:$VERSION_TAG
    docker push $DOCKER_IMAGE:$VERSION_TAG
    echo "📝 Tag de version créé: $VERSION_TAG"
fi

# Nettoyer les images locales pour économiser l'espace
read -p "🧹 Voulez-vous nettoyer les images locales ? (y/N): " -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker image prune -f
    echo "✅ Images nettoyées"
fi

echo ""
echo "🎉 Processus terminé avec succès!"
echo "📋 Prochaines étapes:"
echo "   1. Tester localement: ./deploy-local.sh $DOCKERHUB_USERNAME $IMAGE_TAG"
echo "   2. Déployer en production: ./deploy-production.sh $DOCKERHUB_USERNAME $IMAGE_TAG"