class User {
  final String id;
  final String phoneNumber;
  final String firstName;
  final String lastName;
  final String? email;
  final DateTime createdAt;
  final DateTime updatedAt;
  final bool isVerified;
  final String? profileImageUrl;

  User({
    required this.id,
    required this.phoneNumber,
    required this.firstName,
    required this.lastName,
    this.email,
    required this.createdAt,
    required this.updatedAt,
    this.isVerified = false,
    this.profileImageUrl,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'phoneNumber': phoneNumber,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'isVerified': isVerified,
      'profileImageUrl': profileImageUrl,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] ?? '',
      phoneNumber: map['phoneNumber'] ?? '',
      firstName: map['firstName'] ?? '',
      lastName: map['lastName'] ?? '',
      email: map['email'],
      createdAt: DateTime.parse(map['createdAt']),
      updatedAt: DateTime.parse(map['updatedAt']),
      isVerified: map['isVerified'] ?? false,
      profileImageUrl: map['profileImageUrl'],
    );
  }

  User copyWith({
    String? id,
    String? phoneNumber,
    String? firstName,
    String? lastName,
    String? email,
    DateTime? createdAt,
    DateTime? updatedAt,
    bool? isVerified,
    String? profileImageUrl,
  }) {
    return User(
      id: id ?? this.id,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      isVerified: isVerified ?? this.isVerified,
      profileImageUrl: profileImageUrl ?? this.profileImageUrl,
    );
  }

  String get fullName => '$firstName $lastName';
}