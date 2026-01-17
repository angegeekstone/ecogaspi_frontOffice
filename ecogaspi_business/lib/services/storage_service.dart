import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';
import '../models/business_model.dart';

class StorageService {
  static const String _userKey = 'user_data';
  static const String _businessKey = 'business_data';
  static const String _tokenKey = 'auth_token';

  // Sauvegarder les données de l'utilisateur
  static Future<void> saveUserData(User user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, user.toJson());
  }

  // Récupérer les données de l'utilisateur
  static Future<User?> getUserData() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString(_userKey);
    if (userData != null) {
      return User.fromJson(userData);
    }
    return null;
  }

  // Sauvegarder les données du commerce
  static Future<void> saveBusinessData(Business business) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_businessKey, business.toJson());
  }

  // Récupérer les données du commerce
  static Future<Business?> getBusinessData() async {
    final prefs = await SharedPreferences.getInstance();
    final businessData = prefs.getString(_businessKey);
    if (businessData != null) {
      return Business.fromJson(businessData);
    }
    return null;
  }

  // Sauvegarder le token d'authentification
  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  // Récupérer le token d'authentification
  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  // Effacer toutes les données de session
  static Future<void> clearSession() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_userKey);
    await prefs.remove(_businessKey);
    await prefs.remove(_tokenKey);
  }

  // Vérifier si l'utilisateur est connecté
  static Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null && token.isNotEmpty;
  }
}