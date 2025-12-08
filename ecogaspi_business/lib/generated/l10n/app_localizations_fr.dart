// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for French (`fr`).
class AppLocalizationsFr extends AppLocalizations {
  AppLocalizationsFr([String locale = 'fr']) : super(locale);

  @override
  String get appName => 'EcoGaspi Business';

  @override
  String get appTagline => 'Marketplace professionnel pour l\'écoulement';

  @override
  String get welcome => 'Bienvenue !';

  @override
  String get welcomeBack => 'Bon retour !';

  @override
  String get connectToBusinessAccount => 'Connectez-vous à votre compte business';

  @override
  String get joinEcoGaspiBusiness => 'Rejoignez EcoGaspi Business';

  @override
  String get sellStocksProfessionals => 'Vendez vos stocks facilement entre professionnels';

  @override
  String get alreadyHaveAccount => 'Vous avez déjà un compte ?';

  @override
  String get signIn => 'Se connecter';

  @override
  String get signUp => 'S\'inscrire';

  @override
  String get createBusinessAccount => 'Créer un compte business';

  @override
  String get needHelp => 'Besoin d\'aide ?';

  @override
  String get contactEcoGaspiSupport => 'Contacter le support EcoGaspi';

  @override
  String get phoneNumber => 'Numéro de téléphone';

  @override
  String get password => 'Mot de passe';

  @override
  String get firstName => 'Prénom';

  @override
  String get lastName => 'Nom';

  @override
  String get businessName => 'Nom du commerce';

  @override
  String get businessAddress => 'Adresse de la boutique';

  @override
  String get walletNumber => 'Numéro Wallet (Mobile Money)';

  @override
  String get enterPassword => 'Entrez votre mot de passe';

  @override
  String get rememberMe => 'Se souvenir de moi';

  @override
  String get forgotPassword => 'Mot de passe oublié ?';

  @override
  String get signInButton => 'Se connecter';

  @override
  String get continueButton => 'Continuer';

  @override
  String get fastMode => 'Mode Rapide';

  @override
  String get completeMode => 'Mode Complet';

  @override
  String get additionalInfo => 'Informations complémentaires';

  @override
  String get rccmOptional => 'RCCM (optionnel)';

  @override
  String get patenteOptional => 'Patente (optionnel)';

  @override
  String get phoneNumberRequired => 'Le numéro de téléphone est requis';

  @override
  String get passwordRequired => 'Le mot de passe est requis';

  @override
  String get firstNameRequired => 'Le prénom est requis';

  @override
  String get lastNameRequired => 'Le nom est requis';

  @override
  String get businessNameRequired => 'Le nom du commerce est requis';

  @override
  String get addressRequired => 'L\'adresse est requise';

  @override
  String get walletNumberRequired => 'Le numéro wallet est requis';

  @override
  String get dashboard => 'Tableau de bord';

  @override
  String get products => 'Produits';

  @override
  String get messages => 'Messages';

  @override
  String get notifications => 'Notifications';

  @override
  String get profile => 'Profil';

  @override
  String hello(String name) {
    return 'Bonjour, $name';
  }

  @override
  String urgentProductsExpiring(int count) {
    return '$count produits expirent dans 2 jours';
  }

  @override
  String get yourPerformance => 'Vos performances';

  @override
  String get activeProducts => 'Produits actifs';

  @override
  String get totalSales => 'Ventes totales';

  @override
  String get averageRating => 'Note moyenne';

  @override
  String get verifiedMerchant => 'Commerçant vérifié';

  @override
  String get viewYourPerformance => 'Voir vos performances';

  @override
  String get manageYourTransactions => 'Gérer vos transactions';

  @override
  String get viewCustomerReviews => 'Voir les avis clients';

  @override
  String get personalInformation => 'Informations personnelles';

  @override
  String get editYourProfile => 'Modifier votre profil';

  @override
  String get businessInformation => 'Informations commerce';

  @override
  String get businessDetails => 'RCCM, patente, adresse...';

  @override
  String get manageYourAlerts => 'Gérer vos alertes';

  @override
  String get securitySettings => 'Mot de passe, 2FA...';

  @override
  String get faqAndGuides => 'FAQ et guides';

  @override
  String get weHelpYou => 'Une question ? Nous vous aidons';

  @override
  String get improveTogether => 'Améliorons EcoGaspi ensemble';

  @override
  String get termsAndPrivacy => 'Nos CGU et politique de confidentialité';

  @override
  String get confirmSignOut => 'Êtes-vous sûr de vouloir vous déconnecter ?';

  @override
  String get salesThisMonth => 'Ventes ce mois';

  @override
  String get unreadMessages => 'Messages non lus';

  @override
  String get monthlyRevenue => 'CA ce mois';

  @override
  String get quickActions => 'Actions rapides';

  @override
  String get publishProduct => 'Publier un produit';

  @override
  String get inLessThan20Seconds => 'En moins de 20 secondes';

  @override
  String get marketplace => 'Marketplace';

  @override
  String get seeOffers => 'Voir les offres';

  @override
  String get recentActivity => 'Activité récente';

  @override
  String get myProducts => 'Mes Produits';

  @override
  String active(int count) {
    return 'Actifs ($count)';
  }

  @override
  String archived(int count) {
    return 'Archivés ($count)';
  }

  @override
  String drafts(int count) {
    return 'Brouillons ($count)';
  }

  @override
  String get addProduct => 'Ajouter';

  @override
  String get publishProductTitle => 'Publier un produit';

  @override
  String get ultraFastPublication => 'Publication ultra-rapide';

  @override
  String estimatedTime(int seconds) {
    return 'Temps estimé: $seconds secondes restantes';
  }

  @override
  String get addPhoto => 'Ajouter photo\n(optionnel)';

  @override
  String get productName => 'Nom du produit *';

  @override
  String get category => 'Catégorie *';

  @override
  String get quantity => 'Quantité *';

  @override
  String get unit => 'Unité';

  @override
  String get totalPrice => 'Prix total *';

  @override
  String get expirationDate => 'Date d\'expiration *';

  @override
  String get selectDate => 'Sélectionner la date';

  @override
  String get automaticSuggestions => 'Suggestions automatiques';

  @override
  String get preview => 'Aperçu';

  @override
  String get publishNow => 'Publier maintenant';

  @override
  String get nationalMarketplace => 'Marketplace Nationale';

  @override
  String get allCities => 'Toutes les villes';

  @override
  String get allCategories => 'Toutes catégories';

  @override
  String get expiring3Days => 'Expiration < 3j';

  @override
  String get priceDescending => 'Prix décroissant';

  @override
  String get wholesalers => 'Grossistes';

  @override
  String get lotsPackages => 'Lots/Palettes';

  @override
  String get urgent => 'Urgent';

  @override
  String get soon => 'Bientôt';

  @override
  String get normal => 'Normal';

  @override
  String get negotiate => 'Négocier';

  @override
  String activeConversations(int count) {
    return '$count conversations actives';
  }

  @override
  String negotiationsInProgress(int count) {
    return '$count négociations en cours';
  }

  @override
  String get typing => 'En train d\'écrire...';

  @override
  String get offer => 'Offre';

  @override
  String get negotiation => 'Négoc.';

  @override
  String get agreement => 'Accord';

  @override
  String alerts(int count) {
    return 'Alertes ($count)';
  }

  @override
  String messagesTab(int count) {
    return 'Messages ($count)';
  }

  @override
  String activity(int count) {
    return 'Activité ($count)';
  }

  @override
  String get markAllAsRead => 'Tout lire';

  @override
  String get productsSoonExpiring => 'Produits bientôt expirés';

  @override
  String productsExpireInDays(int count, int days) {
    return '$count produits expirent dans moins de $days jours';
  }

  @override
  String get slowRotationDetected => 'Rotation lente détectée';

  @override
  String get boostSuggestion => 'Suggestion de boost';

  @override
  String get apply => 'Appliquer';

  @override
  String get myBusiness => 'Mon Business';

  @override
  String get salesStatistics => 'Statistiques de vente';

  @override
  String get seeYourPerformance => 'Voir vos performances';

  @override
  String get walletPayments => 'Portefeuille & Paiements';

  @override
  String get manageTransactions => 'Gérer vos transactions';

  @override
  String get reviewsRatings => 'Avis & Évaluations';

  @override
  String get seeCustomerReviews => 'Voir les avis clients';

  @override
  String get settings => 'Paramètres';

  @override
  String get personalInfo => 'Informations personnelles';

  @override
  String get editProfile => 'Modifier votre profil';

  @override
  String get businessInfo => 'Informations commerce';

  @override
  String get notificationSettings => 'Notifications';

  @override
  String get manageAlerts => 'Gérer vos alertes';

  @override
  String get security => 'Sécurité';

  @override
  String get passwordSecurity => 'Mot de passe, 2FA...';

  @override
  String get support => 'Support';

  @override
  String get helpCenter => 'Centre d\'aide';

  @override
  String get faqGuides => 'FAQ et guides';

  @override
  String get contactSupport => 'Contacter le support';

  @override
  String get questionWeHelp => 'Une question ? Nous vous aidons';

  @override
  String get giveFeedback => 'Donner votre avis';

  @override
  String get improveEcoGaspi => 'Améliorons EcoGaspi ensemble';

  @override
  String get application => 'Application';

  @override
  String get about => 'À propos';

  @override
  String get version => 'Version 1.0.0';

  @override
  String get termsOfService => 'Conditions d\'utilisation';

  @override
  String get signOut => 'Se déconnecter';

  @override
  String get signOutConfirm => 'Êtes-vous sûr de vouloir vous déconnecter ?';

  @override
  String get cancel => 'Annuler';

  @override
  String get language => 'Langue';

  @override
  String get chooseLanguage => 'Choisir la langue';

  @override
  String get french => 'Français';

  @override
  String get arabic => 'العربية';

  @override
  String get languageChanged => 'Langue changée avec succès';

  @override
  String get clearanceStocks => 'Écoulez vos stocks';

  @override
  String get shortDLCProducts => 'Produits à DLC courte ou rotation lente';

  @override
  String get nationalVisibility => 'Visibilité nationale';

  @override
  String get sellEverywhereInCameroon => 'Vendez partout au Cameroun';

  @override
  String get directNegotiation => 'Négociation directe';

  @override
  String get integratedB2BMessaging => 'Messagerie B2B intégrée';

  @override
  String get published => 'Produit publié !';

  @override
  String get productPublishedSuccess => 'Votre produit est maintenant visible sur la marketplace. Vous recevrez une notification dès qu\'un acheteur sera intéressé.';

  @override
  String get perfect => 'Parfait !';

  @override
  String get codeSent => 'Code envoyé !';

  @override
  String get resetCodeSentMessage => 'Un code de réinitialisation a été envoyé à votre numéro de téléphone. Vérifiez vos SMS.';

  @override
  String get understood => 'Compris';

  @override
  String get fastBiometricLogin => 'Connexion rapide avec empreinte';

  @override
  String get or => 'OU';

  @override
  String views(int count) {
    return '$count vues';
  }

  @override
  String expiresInDays(int count) {
    return 'Expire dans $count jour(s)';
  }

  @override
  String get fruitsVegetables => 'Fruits et Légumes';

  @override
  String get dairy => 'Produits Laitiers';

  @override
  String get meatFish => 'Viande et Poisson';

  @override
  String get bakery => 'Boulangerie';

  @override
  String get beverages => 'Boissons';

  @override
  String get processedFoods => 'Produits Transformés';

  @override
  String get spicesCondiments => 'Épices et Condiments';

  @override
  String get frozenFoods => 'Produits Surgelés';

  @override
  String get statusPending => 'En attente';

  @override
  String get statusConfirmed => 'Confirmé';

  @override
  String get statusShipped => 'Expédié';

  @override
  String get statusDelivered => 'Livré';

  @override
  String get statusCancelled => 'Annulé';

  @override
  String get unitKg => 'kg';

  @override
  String get unitG => 'g';

  @override
  String get unitL => 'L';

  @override
  String get unitMl => 'mL';

  @override
  String get unitPiece => 'pièce';

  @override
  String get unitBox => 'boîte';

  @override
  String get unitPack => 'paquet';
}
