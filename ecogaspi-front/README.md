# EcoGaspi Front - Marketplace Anti-Gaspi

EcoGaspi est une marketplace dédiée à la lutte contre le gaspillage alimentaire, connectant commerçants et consommateurs pour l'écoulement de produits à prix réduits.

## 🌱 Vision

Créer la première plateforme B2B et B2C en France permettant aux commerçants d'écouler rapidement leurs stocks proches de la DLC/DLV et aux consommateurs d'accéder à des produits de qualité à prix discount.

## ✨ Fonctionnalités

### Pour les Consommateurs
- 🛒 Navigation intuitive des produits anti-gaspi
- 🔍 Recherche avancée par localisation et catégorie
- 💰 Visualisation des économies réalisées
- ⭐ Système de favoris
- 📱 Interface mobile optimisée
- 🕒 Affichage du temps restant avant expiration

### Pour les Commerçants (à venir)
- 📊 Dashboard de gestion des stocks
- 💬 Messagerie B2B intégrée
- 📈 Analytics des ventes
- 🎯 Gestion des alertes d'expiration

## 🛠 Technologies

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Styled Components
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Hooks (Context API à venir)

## 🚀 Installation et Lancement

### Prérequis
- Node.js >= 20.19.0
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd ecogaspi-front

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Linting du code
```

## 🎨 Design System

### Palette de Couleurs
- **Vert Principal**: `#04874E` - Symbolise l'écologie et la durabilité
- **Orange Accent**: `#F77424` - Évoque l'urgence et les promotions
- **Vert Clair**: `#48CC6C` - Pour les accents et succès
- **Gris Neutre**: `#6B7280` - Pour les textes secondaires

### Typography
- **Principale**: Ubuntu (moderne, lisible)
- **Secondaire**: Libre Franklin (pour les titres)

### Breakpoints Responsives
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Wide**: 1280px+

## 📱 Design Mobile-First

L'application est conçue selon une approche mobile-first avec:
- Navigation optimisée tactile
- Menus hamburger sur mobile
- Grilles adaptatives
- Tailles de police ajustées
- Espacement optimisé pour le touch

## 🗂 Structure du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── FeaturedProducts.tsx
│   └── layout/          # Composants de layout
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Layout.tsx
├── pages/               # Pages principales
│   └── Home.tsx
├── styles/              # Styles globaux et thème
│   ├── theme.ts
│   └── GlobalStyles.tsx
├── types/               # Types TypeScript
│   └── product.ts
├── utils/               # Utilitaires
└── App.tsx             # Composant racine
```

## 🔮 Roadmap

### Phase 1 - MVP Consommateur ✅
- [x] Interface homepage avec hero section
- [x] Système de navigation responsive
- [x] Grille de produits avec filtres
- [x] Design system complet

### Phase 2 - Fonctionnalités Avancées 🚧
- [ ] Géolocalisation et recherche par proximité
- [ ] Panier et processus de commande
- [ ] Authentification utilisateur
- [ ] Système de favoris persistant
- [ ] Notifications push

### Phase 3 - Interface Commerçant 📋
- [ ] Dashboard commerçant
- [ ] Gestion des stocks et annonces
- [ ] Messagerie B2B
- [ ] Analytics et rapports

### Phase 4 - Optimisations 🎯
- [ ] PWA (Progressive Web App)
- [ ] Optimisations performances
- [ ] Tests E2E
- [ ] SEO avancé

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committer les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT - voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email**: contact@ecogaspi.com
- **Site Web**: [À venir]

---

**EcoGaspi** - *Ensemble contre le gaspillage alimentaire* 🌱
