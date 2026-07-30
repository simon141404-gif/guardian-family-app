import 'user_entity.dart';

enum FamilyRole { owner, parent, guardian, child }

class FamilyEntity {
  final String id;
  final String name;
  final String? photoUrl;
  final DateTime createdAt;
  final String createdBy;
  final String ownerId;
  final String accessCode;
  final FamilySettings? settings;
  final List<FamilyMember> members;
  final List<Geofence> geofences;
  final List<PendingInvite> pendingInvites;

  FamilyEntity({
    required this.id,
    required this.name,
    this.photoUrl,
    required this.createdAt,
    required this.createdBy,
    required this.ownerId,
    this.accessCode = '',
    this.settings,
    this.members = const [],
    this.geofences = const [],
    this.pendingInvites = const [],
  });

  factory FamilyEntity.fromJson(Map<String, dynamic> json) {
    return FamilyEntity(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      photoUrl: json['photoUrl'],
      createdAt: json['createdAt']?.toDate() ?? DateTime.now(),
      createdBy: json['createdBy'] ?? '',
      ownerId: json['ownerId'] ?? '',
      accessCode: json['accessCode'] ?? '',
      settings: json['settings'] != null ? FamilySettings.fromJson(json['settings']) : null,
      members: (json['members'] as List?)?.map((m) => FamilyMember.fromJson(m)).toList() ?? [],
      geofences: (json['geofences'] as List?)?.map((g) => Geofence.fromJson(g)).toList() ?? [],
    );
  }
}

class FamilyMember {
  final String userId;
  final String displayName;
  final String? photoUrl;
  final FamilyRole role;
  final DateTime joinedAt;
  final List<String> permissions;

  FamilyMember({
    required this.userId,
    required this.displayName,
    this.photoUrl,
    required this.role,
    required this.joinedAt,
    this.permissions = const [],
  });

  factory FamilyMember.fromJson(Map<String, dynamic> json) => FamilyMember(
    userId: json['userId'] ?? '',
    displayName: json['displayName'] ?? '',
    photoUrl: json['photoUrl'],
    role: FamilyRole.values.byName(json['role'] ?? 'child'),
    joinedAt: json['joinedAt']?.toDate() ?? DateTime.now(),
    permissions: List<String>.from(json['permissions'] ?? []),
  );
}

class FamilySettings {
  final bool notificationsEnabled;
  final bool locationSharingEnabled;
  final bool screenTimeAlertsEnabled;
  final bool sosEnabled;
  final int locationUpdateInterval;

  FamilySettings({
    this.notificationsEnabled = true,
    this.locationSharingEnabled = true,
    this.screenTimeAlertsEnabled = true,
    this.sosEnabled = true,
    this.locationUpdateInterval = 30,
  });

  factory FamilySettings.fromJson(Map<String, dynamic> json) => FamilySettings(
    notificationsEnabled: json['notificationsEnabled'] ?? true,
    locationSharingEnabled: json['locationSharingEnabled'] ?? true,
    screenTimeAlertsEnabled: json['screenTimeAlertsEnabled'] ?? true,
    sosEnabled: json['sosEnabled'] ?? true,
    locationUpdateInterval: json['locationUpdateInterval'] ?? 30,
  );
}

class Geofence {
  final String id;
  final String name;
  final double latitude;
  final double longitude;
  final double radius;
  final String type;
  final bool isActive;
  final String? address;

  Geofence({
    required this.id,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.radius,
    this.type = 'home',
    this.isActive = true,
    this.address,
  });

  factory Geofence.fromJson(Map<String, dynamic> json) => Geofence(
    id: json['id'] ?? '',
    name: json['name'] ?? '',
    latitude: (json['latitude'] ?? 0).toDouble(),
    longitude: (json['longitude'] ?? 0).toDouble(),
    radius: (json['radius'] ?? 0).toDouble(),
    type: json['type'] ?? 'home',
    isActive: json['isActive'] ?? true,
    address: json['address'],
  );
}

class PendingInvite {
  final String id;
  final String email;
  final FamilyRole role;
  final DateTime createdAt;
  final DateTime? expiresAt;

  PendingInvite({
    required this.id,
    required this.email,
    required this.role,
    required this.createdAt,
    this.expiresAt,
  });

  factory PendingInvite.fromJson(Map<String, dynamic> json) => PendingInvite(
    id: json['id'] ?? '',
    email: json['email'] ?? '',
    role: FamilyRole.values.byName(json['role'] ?? 'child'),
    createdAt: json['createdAt']?.toDate() ?? DateTime.now(),
    expiresAt: json['expiresAt']?.toDate(),
  );
}
