import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/register_business_owner_model.dart';
import '../constants/app_constants.dart';

class AuthService {
  // Endpoint pour l'inscription d'un propriétaire de commerce
  Future<RegisterBusinessOwnerResponse> registerBusinessOwner(
    RegisterBusinessOwnerRequest request,
  ) async {
    final url = Uri.parse('${AppConstants.baseUrl}/api/v1/auth/register-business-owner');

    print('Envoi de la requête à: $url'); // Pour le débogage
    print('Données envoyées: ${request.toMap()}'); // Pour le débogage

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode(request.toMap()),
      );

      print('Réponse du serveur: ${response.statusCode}'); // Pour le débogage
      print('Corps de la réponse: ${response.body}'); // Pour le débogage

      if (response.statusCode == 200 || response.statusCode == 201) {
        final responseData = jsonDecode(response.body);
        return RegisterBusinessOwnerResponse.fromMap(responseData);
      } else {
        final errorData = jsonDecode(response.body);
        String errorMessage = errorData['message'] ?? 'Registration failed';

        // Si le serveur renvoie des erreurs de validation spécifiques
        if (errorData['errors'] != null) {
          errorMessage += ': ${errorData['errors'].toString()}';
        }

        throw Exception(errorMessage);
      }
    } catch (e) {
      print('Erreur lors de l\'inscription: $e'); // Pour le débogage
      if (e is SocketException) {
        throw Exception('Impossible de se connecter au serveur. Vérifiez votre connexion internet et l\'URL du serveur.');
      } else if (e is FormatException) {
        throw Exception('Format de réponse invalide du serveur.');
      } else {
        throw Exception('Erreur réseau: $e');
      }
    }
  }

  // Endpoint pour la connexion d'un utilisateur
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final url = Uri.parse('${AppConstants.baseUrl}/api/v1/auth/login');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        final errorData = jsonDecode(response.body);
        throw Exception(errorData['message'] ?? 'Login failed');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Endpoint pour la vérification du numéro de téléphone
  Future<bool> verifyPhoneNumber({
    required String phoneNumber,
  }) async {
    final url = Uri.parse('${AppConstants.baseUrl}/api/v1/auth/verify-phone');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode({
          'phoneNumber': phoneNumber,
        }),
      );

      return response.statusCode == 200;
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Endpoint pour la vérification de l'email
  Future<bool> verifyEmail({
    required String email,
  }) async {
    final url = Uri.parse('${AppConstants.baseUrl}/api/v1/auth/verify-email');

    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode({
          'email': email,
        }),
      );

      return response.statusCode == 200;
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}