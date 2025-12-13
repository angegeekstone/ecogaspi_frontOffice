#!/bin/bash

# Script de déploiement local avec Docker Hub
# Usage: ./deploy-local.sh [username] [image-tag]

set -e

# Variables par défaut
DOCKERHUB_USERNAME=${1:-"geestone"}
IMAGE_TAG=${2:-"latest"}
DOCKER_IMAGE="${DOCKERHUB_USERNAME}/ecogaspi-front:${IMAGE_TAG}"

echo "🚀 Déploiement local de l'image: $DOCKER_IMAGE"

# Vérifier que Docker est en cours d'exécution
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker n'est pas en cours d'exécution"
    exit 1
fi

# Nettoyer les containers existants
echo "🧹 Nettoyage des containers existants..."
docker-compose -f docker-compose.prod.yml down --remove-orphans --volumes 2>/dev/null || true

# Nettoyer les ressources Docker
echo "🧹 Nettoyage des ressources Docker..."
docker container prune -f
docker network prune -f

# Créer les répertoires nécessaires
echo "📁 Création des répertoires nécessaires..."
mkdir -p logs

# Télécharger l'image depuis Docker Hub
echo "📥 Téléchargement de l'image depuis Docker Hub..."
if ! docker pull $DOCKER_IMAGE; then
    echo "❌ Impossible de télécharger l'image $DOCKER_IMAGE"
    echo "🔍 Vérifiez que l'image existe sur Docker Hub"
    echo "🔧 Images disponibles pour $DOCKERHUB_USERNAME/ecogaspi-front :"
    curl -s "https://registry.hub.docker.com/v2/repositories/$DOCKERHUB_USERNAME/ecogaspi-front/tags/" | jq -r '.results[].name' 2>/dev/null || echo "Impossible de lister les tags"
    exit 1
fi

# Démarrer l'application
echo "🎯 Démarrage de l'application..."
export ECOGASPI_FRONT_IMAGE=$DOCKER_IMAGE
docker-compose -f docker-compose.prod.yml up -d

# Attendre que l'application soit prête
echo "⏳ Attente du démarrage de l'application..."
sleep 10

# Vérifier la santé de l'application
echo "🩺 Vérification de la santé de l'application..."
for i in {1..12}; do
    if curl -f http://localhost/health 2>/dev/null; then
        echo "✅ Application démarrée avec succès!"
        echo "🌐 L'application est accessible sur:"
        echo "   - Frontend: http://localhost"
        echo "   - Health: http://localhost/health"
        break
    elif curl -f http://localhost 2>/dev/null; then
        echo "✅ Application démarrée avec succès!"
        echo "🌐 L'application est accessible sur:"
        echo "   - Frontend: http://localhost"
        echo "ℹ️ Health check non disponible mais l'application répond"
        break
    elif [ $i -eq 12 ]; then
        echo "❌ L'application n'a pas démarré correctement"
        echo "📋 Logs des containers:"
        docker-compose -f docker-compose.prod.yml logs ecogaspi-front
        exit 1
    else
        echo "⏳ Attente du démarrage... (tentative $i/12)"
        sleep 5
    fi
done

# Afficher le statut des containers
echo "📊 Statut des containers:"
docker-compose -f docker-compose.prod.yml ps

echo "🎉 Déploiement local terminé avec succès!"
echo "💡 Pour arrêter l'application: docker-compose -f docker-compose.prod.yml down"
echo "📋 Pour voir les logs: docker-compose -f docker-compose.prod.yml logs -f"