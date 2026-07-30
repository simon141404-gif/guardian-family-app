enum UserRole { parent, child, guardian, admin }

class UserEntity {
  final String id;
  final String email;
  final String displayName;
  final String? photoUrl;
  final String? phoneNumber;
  final DateTime createdAt;
  final DateTime? updatedAt;
  final bool isVerified;
  final bool is2FAEnabled;
  final bool biometricEnabled;
  final DateTime? lastLogin;
  final List<String> deviceTokens;
  final UserProfile? profile;
  final UserRole? familyRole;
  final String? familyId;

  UserEntity({
    required this.id,
    required this.email,
    this.displayName = '',
    this.photoUrl,
    this.phoneNumber,
    required this.createdAt,
    this.updatedAt,
    this.isVerified = false,
    this.is2FAEnabled = false,
    this.biometricEnabled = false,
    this.lastLogin,
    this.deviceTokens = const [],
    this.profile,
    this.familyRole,
    this.familyId,
  });

  factory UserEntity.fromJson(Map<String, dynamic> json) {
    return UserEntity(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      displayName: json['displayName'] ?? '',
      photoUrl: json['photoUrl'],
      phoneNumber: json['phoneNumber'],
      createdAt: json['createdAt']?.toDate() ?? DateTime.now(),
      updatedAt: json['updatedAt']?.toDate(),
      isVerified: json['isVerified'] ?? false,
      is2FAEnabled: json['is2FAEnabled'] ?? false,
      biometricEnabled: json['biometricEnabled'] ?? false,
      lastLogin: json['lastLogin']?.toDate(),
      deviceTokens: List<String>.from(json['deviceTokens'] ?? []),
      familyRole: json['familyRole'] != null ? UserRole.values.byName(json['familyRole']) : null,
      familyId: json['familyId'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'email': email, 'displayName': displayName, 'photoUrl': photoUrl,
    'phoneNumber': phoneNumber, 'createdAt': createdAt, 'updatedAt': updatedAt,
    'isVerified': isVerified, 'is2FAEnabled': is2FAEnabled, 'biometricEnabled': biometricEnabled,
    'lastLogin': lastLogin, 'deviceTokens': deviceTokens, 'familyRole': familyRole?.name, 'familyId': familyId,
  };
}

class UserProfile {
  final String firstName;
  final String lastName;
  final DateTime? birthday;
  final String gender;
  final MedicalInfo? medicalInfo;
  final List<EmergencyContact> emergencyContacts;

  UserProfile({
    this.firstName = '',
    this.lastName = '',
    this.birthday,
    this.gender = '',
    this.medicalInfo,
    this.emergencyContacts = const [],
  });
}

class MedicalInfo {
  final String bloodType;
  final List<String> allergies;
  final List<String> medications;
  final String? conditions;
  final String? doctorName;
  final String? doctorPhone;

  MedicalInfo({
    this.bloodType = '',
    this.allergies = const [],
    this.medications = const [],
    this.conditions,
    this.doctorName,
    this.doctorPhone,
  });
}

class EmergencyContact {
  final String name;
  final String phone;
  final String? relationship;
  final bool isPrimary;

  EmergencyContact({
    required this.name,
    required this.phone,
    this.relationship,
    this.isPrimary = false,
  });
}
