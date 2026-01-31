#!/bin/bash

# Script de déploiement en production via SSH
# Usage: ./deploy-production.sh [username] [image-tag] [server]

set -e

# Variables par défaut - MODIFIE CES VALEURS
DOCKERHUB_USERNAME=${1:-"geestone"}
IMAGE_TAG=${2:-"latest"}
SERVER_HOST=${3:-"185.98.136.83"}
SERVER_USER=${4:-"root"}
SERVER_PATH="/opt/ecogaspi-admin"

DOCKER_IMAGE="${DOCKERHUB_USERNAME}/ecogaspi-admin:${IMAGE_TAG}"

echo "🚀 Déploiement de $DOCKER_IMAGE sur $SERVER_HOST"

# Vérifier que SSH fonctionne
echo "🔐 Vérification de la connexion SSH..."
if ! ssh -i ~/.ssh/id_rsa_ecogaspi -o BatchMode=yes -o ConnectTimeout=5 $SERVER_USER@$SERVER_HOST 'echo "SSH OK"' >/dev/null 2>&1; then
    echo "❌ Impossible de se connecter à $SERVER_USER@$SERVER_HOST"
    echo "💡 Assurez-vous que:"
    echo "   1. Le serveur est accessible"
    echo "   2. Votre clé SSH est configurée"
    echo "   3. L'utilisateur $SERVER_USER peut se connecter"
    exit 1
fi

echo "✅ Connexion SSH réussie"

# Créer le script de déploiement sur le serveur
echo "📄 Création du script de déploiement sur le serveur..."

ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "cat > /tmp/deploy-ecogaspi-admin.sh" << 'DEPLOY_SCRIPT'
#!/bin/bash
set -e

DOCKER_IMAGE=$1
SERVER_PATH="/opt/ecogaspi-admin"

echo "🚀 Déploiement de $DOCKER_IMAGE..."

# Créer le répertoire d'application
echo "📁 Création des répertoires..."
mkdir -p $SERVER_PATH/logs
cd $SERVER_PATH

# Arrêter les services existants
echo "⏹️ Arrêt des services existants..."
if [ -f docker-compose.prod.yml ]; then
    docker-compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
fi

# Libérer le port 84 si utilisé par un autre service
echo "🔧 Vérification des ports..."
if docker ps --format "table {{.Names}}\t{{.Ports}}" | grep ":84->" | grep -v ecogaspi-admin; then
    echo "⚠️ Port 84 utilisé par un autre service. Vérifiez votre configuration."
fi

# Nettoyer les anciennes images pour libérer l'espace
echo "🧹 Nettoyage des anciennes images..."
docker container prune -f
docker image prune -f
docker system prune -f

# Télécharger la nouvelle image
echo "📥 Téléchargement de la nouvelle image..."
docker pull $DOCKER_IMAGE

# Démarrer l'application
echo "🎯 Démarrage de l'application..."
export ECOGASPI_ADMIN_IMAGE=$DOCKER_IMAGE
docker-compose -f docker-compose.prod.yml up -d

# Attendre que l'application soit prête
echo "⏳ Attente du démarrage de l'application..."
for i in {1..20}; do
    if curl -f http://localhost:84/health 2>/dev/null; then
        echo "✅ Application démarrée avec succès!"
        echo "🌐 Application accessible sur:"
        echo "   - Admin: http://$(hostname):84"
        echo "   - Health: http://$(hostname):84/health"
        break
    elif curl -f http://localhost:84 2>/dev/null; then
        echo "✅ Application démarrée avec succès!"
        echo "🌐 Application accessible sur:"
        echo "   - Admin: http://$(hostname):84"
        echo "ℹ️ Health check non disponible mais l'application répond"
        break
    elif [ $i -eq 20 ]; then
        echo "❌ L'application n'a pas démarré dans les temps"
        echo "📋 Logs de l'application:"
        docker-compose -f docker-compose.prod.yml logs ecogaspi-admin --tail=50
        exit 1
    else
        echo "⏳ Attente... (tentative $i/20)"
        sleep 10
    fi
done

# Afficher le statut final
echo "📊 Statut des services:"
docker-compose -f docker-compose.prod.yml ps

echo "🎉 Déploiement terminé avec succès!"
DEPLOY_SCRIPT

# Créer le répertoire de destination et copier le fichier docker-compose.prod.yml
echo "📁 Création du répertoire de destination..."
ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH"

echo "📤 Copie du fichier docker-compose.prod.yml..."
scp -i ~/.ssh/id_rsa_ecogaspi docker-compose.prod.yml $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Exécuter le déploiement
echo "🎬 Exécution du déploiement sur le serveur..."
ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
    chmod +x /tmp/deploy-ecogaspi-admin.sh
    /tmp/deploy-ecogaspi-admin.sh $DOCKER_IMAGE
    rm -f /tmp/deploy-ecogaspi-admin.sh
"

echo ""
echo "🎉 Déploiement terminé avec succès!"
echo "🌐 Votre application est maintenant disponible sur:"
echo "   - http://$SERVER_HOST:84"
echo "   - http://$SERVER_HOST:84/health"
echo ""
echo "📋 Commandes utiles:"
echo "   - Logs: ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST 'cd $SERVER_PATH && docker-compose -f docker-compose.prod.yml logs -f'"
echo "   - Status: ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST 'cd $SERVER_PATH && docker-compose -f docker-compose.prod.yml ps'"
echo "   - Restart: ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST 'cd $SERVER_PATH && docker-compose -f docker-compose.prod.yml restart ecogaspi-admin'"