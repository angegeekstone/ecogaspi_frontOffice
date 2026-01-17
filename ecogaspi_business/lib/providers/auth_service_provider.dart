import '../services/auth_service.dart';
import '../constants/app_constants.dart';

class AuthServiceProvider {
  static final AuthServiceProvider _instance = AuthServiceProvider._internal();
  factory AuthServiceProvider() => _instance;
  AuthServiceProvider._internal();

  AuthService? _authService;

  AuthService getAuthService() {
    _authService ??= AuthService();
    return _authService!;
  }

  void reset() {
    _authService = null;
  }
}