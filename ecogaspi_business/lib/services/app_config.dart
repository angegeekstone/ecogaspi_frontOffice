import '../constants/app_constants.dart';

class AppConfig {
  static const String appName = 'EcoGaspi Business';
  
  // Détermine si l'application est en mode développement
  static bool get isDevelopment => AppConstants.baseUrl == AppConstants.developmentBaseUrl;
  
  // Détermine si l'application est en mode production
  static bool get isProduction => AppConstants.baseUrl == AppConstants.productionBaseUrl;
  
  // Obtient l'URL de base de l'API
  static String getApiBaseUrl() => AppConstants.baseUrl;
  
  // Obtient l'URL complète pour un endpoint spécifique
  static String getApiUrl(String endpoint) => '${getApiBaseUrl()}$endpoint';
}