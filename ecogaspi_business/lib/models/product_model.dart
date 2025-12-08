class Product {
  final String id;
  final String businessId;
  final String name;
  final String category;
  final String description;
  final int quantity;
  final double unitPrice;
  final double? bulkPrice;
  final String unit; // piece, kg, litre, carton, etc.
  final DateTime? expirationDate;
  final String condition;
  final List<String> imageUrls;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;
  final int views;
  final String location;
  final bool isFeatured;

  Product({
    required this.id,
    required this.businessId,
    required this.name,
    required this.category,
    required this.description,
    required this.quantity,
    required this.unitPrice,
    this.bulkPrice,
    this.unit = 'pièce',
    this.expirationDate,
    required this.condition,
    this.imageUrls = const [],
    this.isActive = true,
    required this.createdAt,
    required this.updatedAt,
    this.views = 0,
    this.location = '',
    this.isFeatured = false,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'businessId': businessId,
      'name': name,
      'category': category,
      'description': description,
      'quantity': quantity,
      'unitPrice': unitPrice,
      'bulkPrice': bulkPrice,
      'unit': unit,
      'expirationDate': expirationDate?.toIso8601String(),
      'condition': condition,
      'imageUrls': imageUrls,
      'isActive': isActive,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'views': views,
      'location': location,
      'isFeatured': isFeatured,
    };
  }

  factory Product.fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'] ?? '',
      businessId: map['businessId'] ?? '',
      name: map['name'] ?? '',
      category: map['category'] ?? '',
      description: map['description'] ?? '',
      quantity: map['quantity'] ?? 0,
      unitPrice: (map['unitPrice'] ?? 0.0).toDouble(),
      bulkPrice: map['bulkPrice']?.toDouble(),
      unit: map['unit'] ?? 'pièce',
      expirationDate: map['expirationDate'] != null
          ? DateTime.parse(map['expirationDate'])
          : null,
      condition: map['condition'] ?? '',
      imageUrls: List<String>.from(map['imageUrls'] ?? []),
      isActive: map['isActive'] ?? true,
      createdAt: DateTime.parse(map['createdAt']),
      updatedAt: DateTime.parse(map['updatedAt']),
      views: map['views'] ?? 0,
      location: map['location'] ?? '',
      isFeatured: map['isFeatured'] ?? false,
    );
  }

  Product copyWith({
    String? id,
    String? businessId,
    String? name,
    String? category,
    String? description,
    int? quantity,
    double? unitPrice,
    double? bulkPrice,
    String? unit,
    DateTime? expirationDate,
    String? condition,
    List<String>? imageUrls,
    bool? isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
    int? views,
    String? location,
    bool? isFeatured,
  }) {
    return Product(
      id: id ?? this.id,
      businessId: businessId ?? this.businessId,
      name: name ?? this.name,
      category: category ?? this.category,
      description: description ?? this.description,
      quantity: quantity ?? this.quantity,
      unitPrice: unitPrice ?? this.unitPrice,
      bulkPrice: bulkPrice ?? this.bulkPrice,
      unit: unit ?? this.unit,
      expirationDate: expirationDate ?? this.expirationDate,
      condition: condition ?? this.condition,
      imageUrls: imageUrls ?? this.imageUrls,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      views: views ?? this.views,
      location: location ?? this.location,
      isFeatured: isFeatured ?? this.isFeatured,
    );
  }

  bool get isExpiringSoon {
    if (expirationDate == null) return false;
    final daysUntilExpiry = expirationDate!.difference(DateTime.now()).inDays;
    return daysUntilExpiry <= 7;
  }

  bool get isCriticallyExpiring {
    if (expirationDate == null) return false;
    final daysUntilExpiry = expirationDate!.difference(DateTime.now()).inDays;
    return daysUntilExpiry <= 3;
  }

  bool get isExpired {
    if (expirationDate == null) return false;
    return expirationDate!.isBefore(DateTime.now());
  }

  String get formattedPrice {
    return '${unitPrice.toStringAsFixed(0)} F CFA';
  }

  String get formattedBulkPrice {
    if (bulkPrice == null) return '';
    return '${bulkPrice!.toStringAsFixed(0)} F CFA';
  }

  String get primaryImageUrl {
    return imageUrls.isNotEmpty ? imageUrls.first : '';
  }
}