import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/auth_service.dart';
import '../models/register_business_owner_model.dart';
import '../constants/app_constants.dart';
import '../services/storage_service.dart';

// État possible pour l'inscription
enum RegistrationStatus { initial, loading, success, error }

// État du formulaire d'inscription
class RegistrationFormState {
  final String firstName;
  final String lastName;
  final String email;
  final String phoneNumber;
  final String password;
  final String confirmPassword;
  final String businessName;
  final String description;
  final int categoryId;
  final String address;
  final String city;
  final double latitude;
  final double longitude;
  final String walletNumber;
  final String? rccm;
  final String? patente;
  final String? website;
  final String? logoUrl;
  final String? merchantCard;
  final String? businessImageUrl;
  final String errorMessage;
  final RegistrationStatus status;

  RegistrationFormState({
    this.firstName = '',
    this.lastName = '',
    this.email = '',
    this.phoneNumber = '',
    this.password = '',
    this.confirmPassword = '',
    this.businessName = '',
    this.description = '',
    this.categoryId = 1,
    this.address = '',
    this.city = '',
    this.latitude = 0.0,
    this.longitude = 0.0,
    this.walletNumber = '',
    this.rccm,
    this.patente,
    this.website,
    this.logoUrl,
    this.merchantCard,
    this.businessImageUrl,
    this.errorMessage = '',
    this.status = RegistrationStatus.initial,
  });

  RegistrationFormState copyWith({
    String? firstName,
    String? lastName,
    String? email,
    String? phoneNumber,
    String? password,
    String? confirmPassword,
    String? businessName,
    String? description,
    int? categoryId,
    String? address,
    String? city,
    double? latitude,
    double? longitude,
    String? walletNumber,
    String? rccm,
    String? patente,
    String? website,
    String? logoUrl,
    String? merchantCard,
    String? businessImageUrl,
    String? errorMessage,
    RegistrationStatus? status,
  }) {
    return RegistrationFormState(
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      businessName: businessName ?? this.businessName,
      description: description ?? this.description,
      categoryId: categoryId ?? this.categoryId,
      address: address ?? this.address,
      city: city ?? this.city,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      walletNumber: walletNumber ?? this.walletNumber,
      rccm: rccm ?? this.rccm,
      patente: patente ?? this.patente,
      website: website ?? this.website,
      logoUrl: logoUrl ?? this.logoUrl,
      merchantCard: merchantCard ?? this.merchantCard,
      businessImageUrl: businessImageUrl ?? this.businessImageUrl,
      errorMessage: errorMessage ?? this.errorMessage,
      status: status ?? this.status,
    );
  }

  // Valider le formulaire
  bool get isValid {
    return firstName.isNotEmpty &&
        lastName.isNotEmpty &&
        email.isNotEmpty &&
        phoneNumber.isNotEmpty &&
        password.isNotEmpty &&
        confirmPassword.isNotEmpty &&
        businessName.isNotEmpty &&
        description.isNotEmpty &&
        address.isNotEmpty &&
        city.isNotEmpty &&
        walletNumber.isNotEmpty &&
        password == confirmPassword &&
        _isValidEmail(email) &&
        _isValidPhoneNumber(phoneNumber) &&
        _isValidWalletNumber(walletNumber) &&
        _isValidPassword(password);
  }

  // Validation de l'email
  bool _isValidEmail(String email) {
    return RegExp(r'^[a-zA-Z0-9.!#$%&+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$').hasMatch(email);
  }

  // Validation du numéro de téléphone
  bool _isValidPhoneNumber(String phoneNumber) {
    // Le backend accepte des formats variés, donc on fait une validation minimale
    // Doit contenir uniquement des chiffres, +, espaces, parenthèses et tirets
    if (phoneNumber.isEmpty) return false;
    return RegExp(r'^[\d\s\+\-\(\)]+$').hasMatch(phoneNumber);
  }

  // Validation du numéro de wallet
  bool _isValidWalletNumber(String walletNumber) {
    // Le backend accepte des formats variés, donc on fait une validation minimale
    // Doit contenir uniquement des chiffres, +, espaces, parenthèses et tirets
    if (walletNumber.isEmpty) return false;
    return RegExp(r'^[\d\s\+\-\(\)]+$').hasMatch(walletNumber);
  }

  // Validation du mot de passe
  bool _isValidPassword(String password) {
    // Le backend accepte des mots de passe simples, donc on assouplit la validation
    return password.length >= 6;
  }
}

// Provider pour le service d'authentification
final authServiceProvider = Provider<AuthService>((ref) {
  return AuthService();
});

// Controller pour gérer l'état de l'inscription
class RegistrationController extends StateNotifier<RegistrationFormState> {
  final AuthService _authService;

  RegistrationController(this._authService) : super(RegistrationFormState());

  // Mettre à jour le champ prénom
  void updateFirstName(String firstName) {
    state = state.copyWith(firstName: firstName);
  }

  // Mettre à jour le champ nom de famille
  void updateLastName(String lastName) {
    state = state.copyWith(lastName: lastName);
  }

  // Mettre à jour le champ email
  void updateEmail(String email) {
    state = state.copyWith(email: email);
  }

  // Mettre à jour le champ numéro de téléphone
  void updatePhoneNumber(String phoneNumber) {
    state = state.copyWith(phoneNumber: phoneNumber);
  }

  // Mettre à jour le champ mot de passe
  void updatePassword(String password) {
    state = state.copyWith(password: password);
  }

  // Mettre à jour le champ confirmation du mot de passe
  void updateConfirmPassword(String confirmPassword) {
    state = state.copyWith(confirmPassword: confirmPassword);
  }

  // Mettre à jour le champ nom de l'entreprise
  void updateBusinessName(String businessName) {
    state = state.copyWith(businessName: businessName);
  }

  // Mettre à jour le champ description
  void updateDescription(String description) {
    state = state.copyWith(description: description);
  }

  // Mettre à jour le champ catégorie
  void updateCategoryId(int categoryId) {
    state = state.copyWith(categoryId: categoryId);
  }

  // Mettre à jour le champ adresse
  void updateAddress(String address) {
    state = state.copyWith(address: address);
  }

  // Mettre à jour le champ ville
  void updateCity(String city) {
    state = state.copyWith(city: city);
  }

  // Mettre à jour le champ latitude
  void updateLatitude(double latitude) {
    state = state.copyWith(latitude: latitude);
  }

  // Mettre à jour le champ longitude
  void updateLongitude(double longitude) {
    state = state.copyWith(longitude: longitude);
  }

  // Mettre à jour le champ numéro de portefeuille
  void updateWalletNumber(String walletNumber) {
    state = state.copyWith(walletNumber: walletNumber);
  }

  // Mettre à jour le champ RCCM
  void updateRccm(String? rccm) {
    state = state.copyWith(rccm: rccm);
  }

  // Mettre à jour le champ Patente
  void updatePatente(String? patente) {
    state = state.copyWith(patente: patente);
  }

  // Mettre à jour le champ site web
  void updateWebsite(String? website) {
    state = state.copyWith(website: website);
  }

  // Mettre à jour le champ logo URL
  void updateLogoUrl(String? logoUrl) {
    state = state.copyWith(logoUrl: logoUrl);
  }

  // Mettre à jour le champ carte marchand
  void updateMerchantCard(String? merchantCard) {
    state = state.copyWith(merchantCard: merchantCard);
  }

  // Mettre à jour le champ image URL du commerce
  void updateBusinessImageUrl(String? businessImageUrl) {
    state = state.copyWith(businessImageUrl: businessImageUrl);
  }

  // Réinitialiser le formulaire
  void resetForm() {
    state = RegistrationFormState();
  }

  // Inscription d'un propriétaire de commerce
  Future<RegisterBusinessOwnerResponse?> registerBusinessOwner() async {
    if (!state.isValid) {
      state = state.copyWith(
        status: RegistrationStatus.error,
        errorMessage: 'Veuillez remplir tous les champs obligatoires correctement.',
      );
      return null;
    }

    state = state.copyWith(status: RegistrationStatus.loading, errorMessage: '');

    try {
      final request = RegisterBusinessOwnerRequest(
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phoneNumber: state.phoneNumber,
        password: state.password,
        businessName: state.businessName,
        description: state.description,
        categoryId: state.categoryId,
        address: state.address,
        city: state.city,
        latitude: state.latitude,
        longitude: state.longitude,
        walletNumber: state.walletNumber,
        rccm: state.rccm,
        patente: state.patente,
        website: state.website,
        logoUrl: state.logoUrl,
        merchantCard: state.merchantCard,
        businessImageUrl: state.businessImageUrl,
      );

      final response = await _authService.registerBusinessOwner(request);

      if (response.success) {
        // Sauvegarder les données de l'utilisateur et du commerce
        if (response.user != null) {
          await StorageService.saveUserData(response.user!);
        }
        if (response.business != null) {
          await StorageService.saveBusinessData(response.business!);
        }
        if (response.token != null) {
          await StorageService.saveToken(response.token!);
        }

        state = state.copyWith(
          status: RegistrationStatus.success,
          errorMessage: '',
        );
        return response;
      } else {
        state = state.copyWith(
          status: RegistrationStatus.error,
          errorMessage: response.message,
        );
        return null;
      }
    } catch (e) {
      state = state.copyWith(
        status: RegistrationStatus.error,
        errorMessage: e.toString(),
      );
      return null;
    }
  }
}

// Provider pour le controller d'inscription
final registrationControllerProvider =
    StateNotifierProvider<RegistrationController, RegistrationFormState>((ref) {
  final authService = ref.watch(authServiceProvider);
  return RegistrationController(authService);
});