# Stage 1: Build de l'application React
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache git

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev + production)
RUN npm ci --verbose

# Copier le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Stage 2: Serveur Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers buildés depuis le stage précédent
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx-simple.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]