# ECOGASPI Admin Dashboard

Dashboard d'administration pour la plateforme ECOGASPI - Marketplace des stocks à écouler.

## 🎯 Objectif

Ce dashboard permet aux administrateurs de gérer et superviser la plateforme ECOGASPI qui met en relation les commerçants (B2B) pour l'écoulement de produits à forte décote ou en fin de vie.

## 🚀 Fonctionnalités

### ✅ Implémentées

- **Dashboard principal** : Vue d'ensemble avec statistiques clés et activités récentes
- **Gestion des commerçants** : Liste, filtrage, vérification et modération des commerçants inscrits
- **Gestion des produits** : Supervision des produits mis en vente, alertes d'expiration
- **Statistiques avancées** : Graphiques et analyses de performance avec Recharts
- **Interface responsive** : Design adaptatif avec Tailwind CSS
- **Navigation intuitive** : Sidebar avec icônes Heroicons

### 🔄 En développement

- **Transactions** : Gestion des ventes et commissions
- **Messages** : Modération de la messagerie B2B
- **Signalements** : Traitement des signalements et litiges
- **Gestion de contenu** : Administration des catégories et politiques
- **Paramètres** : Configuration de la plateforme

## 🛠️ Technologies utilisées

- **React 18** avec TypeScript
- **React Router Dom** pour la navigation
- **Tailwind CSS** pour le styling
- **Heroicons** pour les icônes
- **Recharts** pour les graphiques
- **Axios** pour les requêtes API

## 📁 Structure du projet

```
src/
├── components/
│   └── Layout/           # Composants de mise en page
├── pages/               # Pages de l'application
├── types/               # Types TypeScript
├── hooks/               # Hooks personnalisés (à venir)
├── utils/               # Utilitaires (à venir)
└── styles/              # Styles globaux
```

## 🚦 Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm start

# Build de production
npm run build
```

## 📊 Données gérées

### Commerçants
- Informations personnelles et professionnelles
- Statut de vérification (RCCM, Patente, Carte commerçant)
- Type d'activité (Boutique, Dépôt, Grossiste, Industriel)
- Localisation et wallet Mobile Money

### Produits
- Informations produit et pricing
- Dates d'expiration (DLV/DLC)
- État et condition (parfait, presque expiré, rotation lente)
- Système d'alertes automatiques

### Transactions
- Suivi des ventes B2B
- Gestion des commissions
- Historique des paiements

## 🎨 Design System

Le dashboard utilise un système de design cohérent avec :
- **Couleurs primaires** : Vert (thème écologique)
- **Composants réutilisables** : Cards, boutons, formulaires
- **Responsive design** : Mobile-first approach
- **Dark sidebar** : Navigation moderne et professionnelle

## 📈 Metrics et KPIs

Le dashboard affiche les indicateurs clés :
- Nombre de commerçants actifs
- Produits en vente et écoulés
- Chiffre d'affaires et commissions
- Taux de satisfaction
- Répartition géographique

## 🔐 Sécurité

- Types TypeScript stricts pour la validation des données
- Composants sécurisés pour éviter les injections
- Structure préparée pour l'authentification et les rôles

## 🌍 Contexte ECOGASPI

Ce dashboard s'inscrit dans l'écosystème ECOGASPI qui vise à :
- Réduire le gaspillage alimentaire et commercial
- Faciliter l'écoulement des stocks dormants
- Créer une marketplace B2B efficace au Sénégal
- Offrir une visibilité nationale aux commerçants

---

**Version** : 0.1.0
**Status** : En développement actif
**Contact** : Équipe ECOGASPI