import 'dart:convert';

class Business {
  final String id;
  final String userId;
  final String businessName;
  final String businessType;
  final String address;
  final double latitude;
  final double longitude;
  final String walletNumber;
  final String? rccm;
  final String? patente;
  final String? merchantCard;
  final String? businessImageUrl;
  final String? description;
  final String? city;
  final String? country;
  final bool isVerified;
  final DateTime createdAt;
  final DateTime updatedAt;

  Business({
    required this.id,
    required this.userId,
    required this.businessName,
    required this.businessType,
    required this.address,
    required this.latitude,
    required this.longitude,
    required this.walletNumber,
    this.rccm,
    this.patente,
    this.merchantCard,
    this.businessImageUrl,
    this.description,
    this.city,
    this.country,
    this.isVerified = false,
    required this.createdAt,
    required this.updatedAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'businessName': businessName,
      'businessType': businessType,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
      'walletNumber': walletNumber,
      'rccm': rccm,
      'patente': patente,
      'merchantCard': merchantCard,
      'businessImageUrl': businessImageUrl,
      'description': description,
      'city': city,
      'country': country,
      'isVerified': isVerified,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  factory Business.fromMap(Map<String, dynamic> map) {
    return Business(
      id: map['id'] ?? '',
      userId: map['userId'] ?? '',
      businessName: map['businessName'] ?? '',
      businessType: map['businessType'] ?? '',
      address: map['address'] ?? '',
      latitude: (map['latitude'] ?? 0.0).toDouble(),
      longitude: (map['longitude'] ?? 0.0).toDouble(),
      walletNumber: map['walletNumber'] ?? '',
      rccm: map['rccm'],
      patente: map['patente'],
      merchantCard: map['merchantCard'],
      businessImageUrl: map['businessImageUrl'],
      description: map['description'],
      city: map['city'],
      country: map['country'],
      isVerified: map['isVerified'] ?? false,
      createdAt: DateTime.parse(map['createdAt']),
      updatedAt: DateTime.parse(map['updatedAt']),
    );
  }

  Business copyWith({
    String? id,
    String? userId,
    String? businessName,
    String? businessType,
    String? address,
    double? latitude,
    double? longitude,
    String? walletNumber,
    String? rccm,
    String? patente,
    String? merchantCard,
    String? businessImageUrl,
    String? description,
    String? city,
    String? country,
    bool? isVerified,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Business(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      businessName: businessName ?? this.businessName,
      businessType: businessType ?? this.businessType,
      address: address ?? this.address,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      walletNumber: walletNumber ?? this.walletNumber,
      rccm: rccm ?? this.rccm,
      patente: patente ?? this.patente,
      merchantCard: merchantCard ?? this.merchantCard,
      businessImageUrl: businessImageUrl ?? this.businessImageUrl,
      description: description ?? this.description,
      city: city ?? this.city,
      country: country ?? this.country,
      isVerified: isVerified ?? this.isVerified,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  bool get hasCompleteDocuments =>
      rccm != null && patente != null && merchantCard != null;

  String toJson() => jsonEncode(toMap());

  factory Business.fromJson(String source) => Business.fromMap(jsonDecode(source));
}