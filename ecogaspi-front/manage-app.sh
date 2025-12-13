#!/bin/bash

# Script de gestion de l'application EcoGaspi Frontend en production
# Usage: ./manage-app.sh [action] [server]

set -e

ACTION=${1}
SERVER_HOST=${2:-"185.98.136.83"}
SERVER_USER=${3:-"root"}
SERVER_PATH="/opt/ecogaspi-front"

if [ -z "$ACTION" ]; then
    echo "📋 Usage: $0 [action] [server] [user]"
    echo ""
    echo "🎯 Actions disponibles:"
    echo "   status    - Afficher le statut des services"
    echo "   logs      - Afficher les logs de l'application"
    echo "   restart   - Redémarrer l'application"
    echo "   stop      - Arrêter l'application"
    echo "   start     - Démarrer l'application"
    echo "   health    - Vérifier la santé de l'application"
    echo "   cleanup   - Nettoyer les ressources Docker"
    echo "   update    - Mettre à jour vers la dernière version"
    echo ""
    echo "📝 Exemples:"
    echo "   $0 status $SERVER_HOST"
    echo "   $0 logs $SERVER_HOST"
    echo "   $0 restart $SERVER_HOST"
    exit 1
fi

echo "🎯 Action: $ACTION sur $SERVER_HOST"

# Vérifier la connexion SSH
if ! ssh -i ~/.ssh/id_rsa_ecogaspi -o BatchMode=yes -o ConnectTimeout=5 $SERVER_USER@$SERVER_HOST 'echo "SSH OK"' >/dev/null 2>&1; then
    echo "❌ Impossible de se connecter à $SERVER_USER@$SERVER_HOST"
    exit 1
fi

case $ACTION in
    status)
        echo "📊 Statut des services..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            cd $SERVER_PATH
            echo '=== Docker Compose Status ==='
            docker-compose -f docker-compose.prod.yml ps
            echo -e '\n=== Docker Stats ==='
            docker stats --no-stream --format 'table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}'
            echo -e '\n=== Disk Usage ==='
            df -h $SERVER_PATH
        "
        ;;

    logs)
        echo "📋 Logs de l'application..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            cd $SERVER_PATH
            docker-compose -f docker-compose.prod.yml logs -f --tail=100 ecogaspi-front
        "
        ;;

    restart)
        echo "🔄 Redémarrage de l'application..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            cd $SERVER_PATH
            docker-compose -f docker-compose.prod.yml restart ecogaspi-front
        "
        echo "✅ Application redémarrée"
        ;;

    stop)
        echo "⏹️ Arrêt de l'application..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            cd $SERVER_PATH
            docker-compose -f docker-compose.prod.yml down
        "
        echo "✅ Application arrêtée"
        ;;

    start)
        echo "▶️ Démarrage de l'application..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            cd $SERVER_PATH
            docker-compose -f docker-compose.prod.yml up -d
        "
        echo "✅ Application démarrée"
        ;;

    health)
        echo "🩺 Vérification de la santé..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            echo '=== Service Health ==='
            if curl -f http://localhost/health 2>/dev/null; then
                echo '✅ Health check: OK'
            elif curl -f http://localhost 2>/dev/null; then
                echo '✅ Frontend: OK (health endpoint non disponible)'
            else
                echo '❌ Frontend: ERREUR'
            fi

            echo -e '\n=== Container Health ==='
            docker ps --filter 'name=ecogaspi-front' --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

            echo -e '\n=== Resource Usage ==='
            docker stats --no-stream --filter 'name=ecogaspi-front'
        "
        ;;

    cleanup)
        echo "🧹 Nettoyage des ressources..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            echo 'Nettoyage des containers arrêtés...'
            docker container prune -f
            echo 'Nettoyage des images inutilisées...'
            docker image prune -f
            echo 'Nettoyage des réseaux inutilisés...'
            docker network prune -f
            echo 'Nettoyage des volumes orphelins...'
            docker volume prune -f
        "
        echo "✅ Nettoyage terminé"
        ;;

    update)
        echo "⬆️ Mise à jour vers la dernière version..."
        ssh -i ~/.ssh/id_rsa_ecogaspi $SERVER_USER@$SERVER_HOST "
            cd $SERVER_PATH
            echo 'Arrêt de l application...'
            docker-compose -f docker-compose.prod.yml down
            echo 'Téléchargement de la dernière image...'
            docker pull geestone/ecogaspi-front:latest
            echo 'Redémarrage avec la nouvelle image...'
            export ECOGASPI_FRONT_IMAGE=geestone/ecogaspi-front:latest
            docker-compose -f docker-compose.prod.yml up -d

            echo 'Attente du démarrage...'
            sleep 10

            if curl -f http://localhost 2>/dev/null; then
                echo '✅ Mise à jour réussie!'
            else
                echo '❌ Problème lors du redémarrage'
                docker-compose -f docker-compose.prod.yml logs ecogaspi-front --tail=20
            fi
        "
        ;;

    *)
        echo "❌ Action inconnue: $ACTION"
        echo "💡 Utilisez '$0' sans argument pour voir les actions disponibles"
        exit 1
        ;;
esac