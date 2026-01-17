import 'dart:convert';

import 'package:ecogaspi_business/models/user_model.dart';

import 'business_model.dart';

class RegisterBusinessOwnerRequest {
  final String firstName;
  final String lastName;
  final String email;
  final String phoneNumber;
  final String password;
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

  RegisterBusinessOwnerRequest({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phoneNumber,
    required this.password,
    required this.businessName,
    required this.description,
    required this.categoryId,
    required this.address,
    required this.city,
    required this.latitude,
    required this.longitude,
    required this.walletNumber,
    this.rccm,
    this.patente,
    this.website,
    this.logoUrl,
    this.merchantCard,
    this.businessImageUrl,
  });

  Map<String, dynamic> toMap() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'phoneNumber': phoneNumber,
      'password': password,
      'businessName': businessName,
      'description': description,
      'categoryId': categoryId,
      'address': address,
      'city': city,
      'latitude': latitude,
      'longitude': longitude,
      'walletNumber': walletNumber,
      'rccm': rccm,
      'patente': patente,
      'website': website,
      'logoUrl': logoUrl,
      'merchantCard': merchantCard,
      'businessImageUrl': businessImageUrl,
    };
  }

  String toJson() => jsonEncode(toMap());

  factory RegisterBusinessOwnerRequest.fromMap(Map<String, dynamic> map) {
    return RegisterBusinessOwnerRequest(
      firstName: map['firstName'] ?? '',
      lastName: map['lastName'] ?? '',
      email: map['email'] ?? '',
      phoneNumber: map['phoneNumber'] ?? '',
      password: map['password'] ?? '',
      businessName: map['businessName'] ?? '',
      description: map['description'] ?? '',
      categoryId: map['categoryId'] ?? 1,
      address: map['address'] ?? '',
      city: map['city'] ?? '',
      latitude: (map['latitude'] ?? 0.0).toDouble(),
      longitude: (map['longitude'] ?? 0.0).toDouble(),
      walletNumber: map['walletNumber'] ?? '',
      rccm: map['rccm'],
      patente: map['patente'],
      website: map['website'],
      logoUrl: map['logoUrl'],
      merchantCard: map['merchantCard'],
      businessImageUrl: map['businessImageUrl'],
    );
  }

  factory RegisterBusinessOwnerRequest.fromJson(String source) =>
      RegisterBusinessOwnerRequest.fromMap(jsonDecode(source));

  RegisterBusinessOwnerRequest copyWith({
    String? firstName,
    String? lastName,
    String? email,
    String? phoneNumber,
    String? password,
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
  }) {
    return RegisterBusinessOwnerRequest(
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      password: password ?? this.password,
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
    );
  }
}

// Réponse du serveur après l'inscription
class RegisterBusinessOwnerResponse {
  final String message;
  final bool success;
  final String? token;
  final User? user;
  final Business? business;

  RegisterBusinessOwnerResponse({
    required this.message,
    required this.success,
    this.token,
    this.user,
    this.business,
  });

  factory RegisterBusinessOwnerResponse.fromMap(Map<String, dynamic> map) {
    return RegisterBusinessOwnerResponse(
      message: map['message'] ?? '',
      success: true, // La réponse contient toujours "success": true dans le cas de succès
      token: map['data']?['token'], // Le token est dans data selon la réponse API
      user: map['data']?['user'] != null ? User.fromMap(map['data']['user']) : null,
      business: map['data']?['business'] != null ? Business.fromMap(map['data']['business']) : null,
    );
  }

  factory RegisterBusinessOwnerResponse.fromJson(String source) =>
      RegisterBusinessOwnerResponse.fromMap(jsonDecode(source));
}

