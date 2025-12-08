# 🌍 Guide de Configuration des Environnements

## Vue d'ensemble

Le dashboard ECOGASPI Admin est configuré pour supporter plusieurs environnements avec des URLs d'API différentes selon le contexte de déploiement.

## 🔧 Structure de Configuration

### Fichiers d'environnement
```
├── .env.development     # Développement local
├── .env.staging        # Serveur de test
├── .env.production     # Production
└── .env.example       # Template d'exemple
```

### Configuration actuelle

#### 🟢 Development (Local)
```bash
REACT_APP_ENV=development
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_WEBSOCKET_URL=ws://localhost:8080/ws
REACT_APP_UPLOAD_BASE_URL=http://localhost:8080/uploads
REACT_APP_DEBUG=true
```

#### 🟡 Staging (Test)
```bash
REACT_APP_ENV=staging
REACT_APP_API_BASE_URL=https://staging-api.ecogaspi.com/api
REACT_APP_WEBSOCKET_URL=wss://staging-api.ecogaspi.com/ws
REACT_APP_UPLOAD_BASE_URL=https://staging-api.ecogaspi.com/uploads
REACT_APP_DEBUG=true
```

#### 🔴 Production
```bash
REACT_APP_ENV=production
REACT_APP_API_BASE_URL=https://api.ecogaspi.com/api
REACT_APP_WEBSOCKET_URL=wss://api.ecogaspi.com/ws
REACT_APP_UPLOAD_BASE_URL=https://api.ecogaspi.com/uploads
REACT_APP_DEBUG=false
```

## 🚀 Scripts disponibles

```bash
# Développement
npm start              # Utilise .env.development
npm run start:dev      # Force development
npm run start:staging  # Force staging

# Build
npm run build         # Utilise NODE_ENV
npm run build:dev     # Build development
npm run build:staging # Build staging
npm run build:prod    # Build production
```

## 💻 Utilisation dans le code

### 1. Configuration centralisée
```typescript
import { env } from './config';

// Accès aux variables
console.log(env.apiBaseUrl);     // URL API actuelle
console.log(env.isProduction);  // true/false
console.log(env.debug);         // mode debug
```

### 2. Client API automatique
```typescript
import { apiClient } from './utils/apiClient';

// Les URLs sont automatiquement configurées
const response = await apiClient.get('/merchants');
```

### 3. Endpoints API typés
```typescript
import { API_ENDPOINTS } from './config/api';

// URLs automatiquement générées
const merchantsUrl = API_ENDPOINTS.merchants.list;
const uploadUrl = API_ENDPOINTS.upload.image;
```

### 4. Gestion des images
```typescript
import { getImageUrl } from './config/api';

// Génère l'URL complète selon l'environnement
const avatarUrl = getImageUrl('avatar.jpg');
```

## 🔐 Sécurité

### Variables sensibles
❌ **Ne jamais mettre dans les .env :**
- Clés API secrètes
- Mots de passe
- Tokens privés

✅ **Uniquement des URLs et configs publiques**

### Authentication
```typescript
// Le token est géré automatiquement
apiClient.setAuthToken('your_jwt_token');

// Headers automatiques avec Bearer token
const response = await apiClient.get('/merchants');
```

## 📝 Exemples pratiques

### Service avec environnements
```typescript
// services/merchantService.ts
import { apiClient, API_ENDPOINTS } from '../config';

export class MerchantService {
  async getMerchants() {
    // URL adaptée automatiquement selon l'environnement
    return apiClient.get(API_ENDPOINTS.merchants.list);
  }
}
```

### Composant avec debugging
```typescript
import { env } from '../config';

function MyComponent() {
  useEffect(() => {
    if (env.debug) {
      console.log('🔧 Component mounted in debug mode');
    }
  }, []);
}
```

## 🛠️ Configuration pour votre backend

### URLs Backend attendues

#### Development
```
Backend API: http://localhost:8080/api/v1/
WebSocket:   ws://localhost:8080/ws
Uploads:     http://localhost:8080/uploads/
```

#### Staging
```
Backend API: https://staging-api.ecogaspi.com/api/v1/
WebSocket:   wss://staging-api.ecogaspi.com/ws
Uploads:     https://staging-api.ecogaspi.com/uploads/
```

#### Production
```
Backend API: https://api.ecogaspi.com/api/v1/
WebSocket:   wss://api.ecogaspi.com/ws
Uploads:     https://api.ecogaspi.com/uploads/
```

## 📋 Checklist de déploiement

### Avant le déploiement

- [ ] Vérifier les URLs d'API dans .env.production
- [ ] Tester les endpoints en staging
- [ ] Valider les uploads de fichiers
- [ ] Confirmer la connection WebSocket
- [ ] Désactiver le mode debug en production

### Après le déploiement

- [ ] Vérifier les logs de la console
- [ ] Tester les appels API
- [ ] Valider l'authentification
- [ ] Contrôler les uploads d'images

## 🐛 Debugging

### Logs automatiques en mode debug
```typescript
// Console automatique si debug=true
🌍 ECOGASPI Admin - Environment: development
🔗 API Base URL: http://localhost:8080/api
📡 WebSocket URL: ws://localhost:8080/ws
📁 Upload Base URL: http://localhost:8080/uploads
🐛 Debug Mode: true

🚀 API Request [GET]: /api/v1/merchants
✅ API Response [200]: /api/v1/merchants {...}
```

### Inspection manuelle
```typescript
import { env } from './config';

// Afficher la config actuelle
env.logEnvironmentInfo();

// Vérifier l'environnement
if (env.isDevelopment) {
  console.log('Mode développement actif');
}
```

Cette configuration garantit une séparation claire entre les environnements et facilite les déploiements ! 🚀