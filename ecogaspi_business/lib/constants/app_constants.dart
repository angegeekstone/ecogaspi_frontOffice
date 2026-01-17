class AppConstants {
  // API Configuration
  static const String productionBaseUrl = 'https://api.ecogaspi.com';
  static const String developmentBaseUrl = 'http://10.0.2.2:8080'; // Pour l'émulateur Android
  static const String localDevelopmentBaseUrl = 'http://localhost:8080'; // Pour les tests locaux
  static String get baseUrl {
    // On peut détecter l'environnement ou utiliser une variable d'environnement
    return String.fromEnvironment('API_BASE_URL', defaultValue: developmentBaseUrl);
  }
  static const String apiVersion = 'v1';
  static const Duration apiTimeout = Duration(seconds: 30);

  // Storage Keys
  static const String userToken = 'user_token';
  static const String userId = 'user_id';
  static const String businessId = 'business_id';
  static const String isFirstLaunch = 'is_first_launch';
  static const String userLocation = 'user_location';

  // Product Validation
  static const int maxProductNameLength = 100;
  static const int maxDescriptionLength = 500;
  static const int minQuantity = 1;
  static const int maxQuantity = 999999;
  static const double minPrice = 0.01;
  static const double maxPrice = 999999.99;

  // Image Configuration
  static const int maxImageSizeKB = 2048; // 2MB
  static const double imageCompressionQuality = 0.8;
  static const int maxImagesPerProduct = 5;

  // Location Settings
  static const double locationAccuracy = 100.0; // meters
  static const Duration locationTimeout = Duration(seconds: 15);

  // Messaging
  static const int maxMessageLength = 1000;
  static const int messagesPerPage = 50;

  // Product Expiry Thresholds (in days)
  static const int criticalExpiryDays = 3;
  static const int warningExpiryDays = 7;
  static const int alertExpiryDays = 14;

  // Business Types
  static const List<String> businessTypes = [
    'Boutique',
    'Dépôt',
    'Grossiste',
    'Industriel'
  ];

  // Product Categories
  static const List<String> productCategories = [
    'Alimentaire',
    'Produits secs',
    'Hygiène',
    'Cosmétiques',
    'Entretien',
    'Consommation courante',
    'Industriel'
  ];

  // Product Conditions
  static const List<String> productConditions = [
    'État parfait',
    'Proche expiration',
    'Rotation lente',
    'Surstock'
  ];

  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 100;

  // Cache Duration
  static const Duration cacheExpiry = Duration(hours: 1);
  static const Duration shortCacheExpiry = Duration(minutes: 15);

  // Animation Durations
  static const Duration shortAnimation = Duration(milliseconds: 200);
  static const Duration mediumAnimation = Duration(milliseconds: 400);
  static const Duration longAnimation = Duration(milliseconds: 600);

  // UI Constants
  static const double defaultPadding = 16.0;
  static const double smallPadding = 8.0;
  static const double largePadding = 24.0;
  static const double borderRadius = 8.0;
  static const double cardElevation = 2.0;

  // Firebase Collections
  static const String usersCollection = 'users';
  static const String businessCollection = 'businesses';
  static const String productsCollection = 'products';
  static const String messagesCollection = 'messages';
  static const String conversationsCollection = 'conversations';

  // Notification Types
  static const String messageNotification = 'message';
  static const String productExpiryNotification = 'product_expiry';
  static const String offerNotification = 'offer';
  static const String generalNotification = 'general';

  // Country Codes (for phone validation)
  static const String defaultCountryCode = 'CI'; // Côte d'Ivoire
  static const String defaultDialCode = '+225';

  // Discount Suggestions
  static const List<double> suggestedDiscounts = [10, 20, 30, 40, 50];

  // Price Formatting
  static const String currency = 'CFA';
  static const String currencySymbol = 'F CFA';
}