import '../services/storage_service.dart';

class AuthService {
  // Vérifier si l'utilisateur est connecté
  static Future<bool> isLoggedIn() async {
    return await StorageService.isLoggedIn();
  }

  // Déconnexion de l'utilisateur
  static Future<void> logout() async {
    await StorageService.clearSession();
  }
}