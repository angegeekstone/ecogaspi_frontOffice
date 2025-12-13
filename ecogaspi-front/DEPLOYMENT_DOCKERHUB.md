# Guide de Déploiement Frontend avec Docker Hub

Ce guide explique comment déployer le frontend EcoGaspi en utilisant Docker Hub avec un workflow manuel simple et efficace.

## 🎯 Prérequis

- Docker et Docker Compose installés
- Compte Docker Hub (geestone)
- Accès SSH au serveur de production (185.98.136.83)
- Node.js installé (pour la construction)
- Nginx installé sur le serveur (pour le reverse proxy)

## 🏗️ Construction et Publication

### 1. Construction locale et publication

```bash
# Construction et publication avec les valeurs par défaut (geestone/latest)
./build-and-push.sh

# Construction avec un tag spécifique
./build-and-push.sh geestone v1.0.0

# Construction avec un autre nom d'utilisateur
./build-and-push.sh mon-username v1.0.0

# Directement avec Docker (méthode manuelle)
npm run build
docker build -t geestone/ecogaspi-front:latest .
docker push geestone/ecogaspi-front:latest
```

Le script `build-and-push.sh` :
- ✅ Installe automatiquement les dépendances npm si nécessaire
- ✅ Construit l'image Docker multi-stage (build + nginx)
- ✅ Teste optionnellement l'image avant publication
- ✅ Publie sur Docker Hub
- ✅ Crée automatiquement des tags versionnés
- ✅ Nettoie les ressources locales

## 🚀 Déploiement

### 1. Déploiement local (pour tester)

```bash
# Déployer la dernière version (geestone/latest)
./deploy-local.sh

# Déployer une version spécifique
./deploy-local.sh geestone v1.0.0

# Avec un autre utilisateur
./deploy-local.sh autre-user v1.0.0
```

### 2. Déploiement en production

```bash
# Déploiement simple sur votre serveur
./deploy-production.sh geestone latest 185.98.136.83 root

# Ou avec les valeurs par défaut (configurées dans le script)
./deploy-production.sh

# Le script fait tout automatiquement :
# - Connexion SSH
# - Arrêt des anciens services
# - Téléchargement de la nouvelle image
# - Démarrage et vérification
```

### 3. Gestion de l'application

```bash
# Voir le statut de l'application
./manage-app.sh status 185.98.136.83

# Voir les logs
./manage-app.sh logs 185.98.136.83

# Redémarrer l'application
./manage-app.sh restart 185.98.136.83

# Vérifier la santé
./manage-app.sh health 185.98.136.83

# Mettre à jour vers la dernière version
./manage-app.sh update 185.98.136.83

# Nettoyer les ressources
./manage-app.sh cleanup 185.98.136.83

# Ou avec les valeurs par défaut (configurées dans le script)
./manage-app.sh status
./manage-app.sh logs
./manage-app.sh restart
```

## 📋 Vérification

### URLs de vérification (Production: 185.98.136.83)

- **Frontend**: http://185.98.136.83
- **Health Check**: http://185.98.136.83/health
- **API Proxy**: http://185.98.136.83/api/v1/

### Commandes utiles

```bash
# Voir les logs
docker-compose -f docker-compose.prod.yml logs -f ecogaspi-front

# Statut des containers
docker-compose -f docker-compose.prod.yml ps

# Arrêter l'application
docker-compose -f docker-compose.prod.yml down

# Redémarrer un service
docker-compose -f docker-compose.prod.yml restart ecogaspi-front
```

## 🔧 Configuration

### Architecture de l'application

Le frontend EcoGaspi utilise une architecture multi-stage :

#### 1. Stage Build (Node.js)
- Construction de l'application React avec Vite
- Optimisation des assets (bundling, minification)
- Génération des fichiers statiques dans `/dist`

#### 2. Stage Production (Nginx)
- Serveur web léger Nginx Alpine
- Service des fichiers statiques optimisés
- Proxy vers l'API backend sur `/api/*`
- Support du routage SPA (Single Page Application)

### Configuration Nginx

```nginx
# Servir les fichiers statiques avec cache
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Proxy API calls vers le backend
location /api/ {
    proxy_pass http://ecogaspi-api:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

# Support du routage SPA
location / {
    try_files $uri $uri/ /index.html;
}
```

### Variables d'environnement

Configurez ces variables dans votre `.env` ou docker-compose :

```env
# Image Docker
ECOGASPI_FRONT_IMAGE=geestone/ecogaspi-front:latest

# Configuration de production
NODE_ENV=production
```

## 🔒 Sécurité

### Configuration Nginx sécurisée

- **Compression GZIP** activée pour réduire la taille des transferts
- **Cache headers** optimisés pour les assets statiques
- **Proxy headers** correctement configurés
- **Health endpoint** pour monitoring

### Ports exposés

- **80**: Frontend (interface web principale)
- **443**: HTTPS (si SSL configuré)

## 🐛 Dépannage

### Problèmes courants

1. **Image introuvable**
   ```bash
   # Vérifiez que l'image existe
   docker search geestone/ecogaspi-front
   ```

2. **Port 80 déjà utilisé**
   ```bash
   # Trouver le processus utilisant le port
   lsof -ti:80
   # Arrêter le processus
   kill -9 <PID>
   ```

3. **Erreurs de build**
   ```bash
   # Nettoyer le cache npm
   npm ci --cache /tmp/empty-cache

   # Rebuild complet
   docker build --no-cache -t geestone/ecogaspi-front:latest .
   ```

4. **Problèmes de routage SPA**
   ```bash
   # Vérifier la configuration Nginx
   docker exec ecogaspi-front nginx -t

   # Redémarrer Nginx
   docker exec ecogaspi-front nginx -s reload
   ```

5. **Logs pour diagnostiquer**
   ```bash
   # Logs détaillés du frontend
   docker-compose -f docker-compose.prod.yml logs ecogaspi-front

   # Logs Nginx spécifiques
   docker exec ecogaspi-front tail -f /var/log/nginx/access.log
   docker exec ecogaspi-front tail -f /var/log/nginx/error.log
   ```

## 📈 Monitoring

### Health Checks

L'application inclut des health checks automatiques :

- **Nginx Health**: http://185.98.136.83/health
- **Container Health**: Vérifie automatiquement que Nginx répond
- **Frontend Assets**: Vérification que les fichiers statiques sont servis

### Métriques

```bash
# Stats des containers Docker
docker stats --no-stream --filter 'name=ecogaspi-front'

# Taille des images
docker images geestone/ecogaspi-front

# Usage disque
df -h /opt/ecogaspi-front/
```

### Monitoring en production

```bash
# Vérifier l'état complet via script
./manage-app.sh health 185.98.136.83

# Surveillance continue des logs
./manage-app.sh logs 185.98.136.83

# Stats des containers Docker
./manage-app.sh status 185.98.136.83
```

## 🔄 Mise à jour

Pour mettre à jour vers une nouvelle version :

```bash
# Méthode 1: Redéploiement complet
./deploy-production.sh geestone v1.1.0 185.98.136.83

# Méthode 2: Mise à jour en place
export ECOGASPI_FRONT_IMAGE=geestone/ecogaspi-front:v1.1.0
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Méthode 3: Via le script de gestion
./manage-app.sh update 185.98.136.83
```

## 🌐 Configuration de Production

### Déploiement avec l'API Backend

Pour un déploiement complet frontend + backend :

```bash
# 1. Déployer l'API backend
cd ../ecogaspi-api
./deploy-production.sh geestone latest 185.98.136.83 root

# 2. Déployer le frontend (port 80)
cd ../ecogaspi-front
./deploy-production.sh geestone latest 185.98.136.83 root
```

### Configuration réseau

L'application frontend :
- **Écoute sur le port 80** pour l'interface web
- **Proxie les appels API** vers `ecogaspi-api:8080`
- **Utilise le réseau Docker** `ecogaspi-network` pour communiquer avec l'API

### SSL/HTTPS (optionnel)

Pour activer HTTPS en production, ajoutez ces configurations à votre nginx.conf :

```nginx
server {
    listen 443 ssl;
    server_name votre-domaine.com;

    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;

    # Reste de la configuration...
}
```

## 🎉 Workflow complet

Exemple de déploiement complet depuis zéro :

```bash
# 1. Build et push de la nouvelle version
./build-and-push.sh geestone v2.0.0

# 2. Test en local
./deploy-local.sh geestone v2.0.0

# 3. Déploiement en production
./deploy-production.sh geestone v2.0.0 185.98.136.83 root

# 4. Vérification
./manage-app.sh health 185.98.136.83
```

🚀 **Votre frontend EcoGaspi est maintenant déployé et accessible sur http://185.98.136.83 !**