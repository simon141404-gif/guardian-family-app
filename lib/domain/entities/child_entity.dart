import 'user_entity.dart';

enum ChildStatus { active, paused, offline, restricted }

class ChildEntity {
  final String id;
  final String userId;
  final String familyId;
  final String parentId;
  final ChildProfile? profile;
  final DeviceInfo? deviceInfo;
  final ScreenTime? screenTime;
  final AppSettings? appSettings;
  final LocationData? location;
  final ChildStatus status;
  final DateTime createdAt;
  final DateTime? updatedAt;

  ChildEntity({
    required this.id,
    required this.userId,
    required this.familyId,
    required this.parentId,
    this.profile,
    this.deviceInfo,
    this.screenTime,
    this.appSettings,
    this.location,
    this.status = ChildStatus.active,
    required this.createdAt,
    this.updatedAt,
  });

  factory ChildEntity.fromJson(Map<String, dynamic> json) => ChildEntity(
    id: json['id'] ?? '',
    userId: json['userId'] ?? '',
    familyId: json['familyId'] ?? '',
    parentId: json['parentId'] ?? '',
    status: ChildStatus.values.byName(json['status'] ?? 'active'),
    createdAt: json['createdAt']?.toDate() ?? DateTime.now(),
    updatedAt: json['updatedAt']?.toDate(),
  );
}

class ChildProfile {
  final String name;
  final String? photoUrl;
  final DateTime? birthday;
  final SchoolInfo? schoolInfo;
  final MedicalInfo? medicalInfo;
  final List<EmergencyContact> emergencyContacts;

  ChildProfile({
    required this.name,
    this.photoUrl,
    this.birthday,
    this.schoolInfo,
    this.medicalInfo,
    this.emergencyContacts = const [],
  });
}

class SchoolInfo {
  final String name;
  final String address;
  final double? latitude;
  final double? longitude;
  final String contactPhone;
  final String? contactEmail;
  final List<String> schoolDays;
  final String startTime;
  final String endTime;

  SchoolInfo({
    this.name = '',
    this.address = '',
    this.latitude,
    this.longitude,
    this.contactPhone = '',
    this.contactEmail,
    this.schoolDays = const [],
    this.startTime = '08:00',
    this.endTime = '15:00',
  });
}

class DeviceInfo {
  final String deviceId;
  final String deviceModel;
  final String manufacturer;
  final String androidVersion;
  final String securityPatch;
  final int? batteryLevel;
  final bool isCharging;
  final double? ramUsage;
  final double? storageUsage;
  final bool isOnline;
  final DateTime? lastOnline;

  DeviceInfo({
    this.deviceId = '',
    this.deviceModel = '',
    this.manufacturer = '',
    this.androidVersion = '',
    this.securityPatch = '',
    this.batteryLevel,
    this.isCharging = false,
    this.ramUsage,
    this.storageUsage,
    this.isOnline = true,
    this.lastOnline,
  });
}

class ScreenTime {
  final int dailyLimit;
  final int weeklyLimit;
  final int usedToday;
  final int usedThisWeek;
  final Map<String, int> hourlyUsage;
  final ScreenTimeModes? modes;
  final DateTime? lastReset;

  ScreenTime({
    this.dailyLimit = 180,
    this.weeklyLimit = 1200,
    this.usedToday = 0,
    this.usedThisWeek = 0,
    this.hourlyUsage = const {},
    this.modes,
    this.lastReset,
  });
}

class ScreenTimeModes {
  final bool studyModeActive;
  final String? studyModeStart;
  final String? studyModeEnd;
  final bool sleepModeActive;
  final String? sleepModeStart;
  final String? sleepModeEnd;
  final bool gamingModeActive;
  final int? rewardTimeAvailable;

  ScreenTimeModes({
    this.studyModeActive = false,
    this.studyModeStart,
    this.studyModeEnd,
    this.sleepModeActive = false,
    this.sleepModeStart,
    this.sleepModeEnd,
    this.gamingModeActive = false,
    this.rewardTimeAvailable,
  });
}

class AppSettings {
  final List<String> allowedApps;
  final List<String> blockedApps;
  final List<String> whitelist;
  final List<String> blacklist;
  final bool requireInstallApproval;
  final bool requirePurchaseApproval;
  final int ageRestriction;

  AppSettings({
    this.allowedApps = const [],
    this.blockedApps = const [],
    this.whitelist = const [],
    this.blacklist = const [],
    this.requireInstallApproval = true,
    this.requirePurchaseApproval = true,
    this.ageRestriction = 0,
  });
}

class LocationData {
  final double latitude;
  final double longitude;
  final double? accuracy;
  final double? altitude;
  final double? speed;
  final DateTime timestamp;
  final int? battery;
  final bool isCharging;
  final bool isOnline;
  final String? address;

  LocationData({
    required this.latitude,
    required this.longitude,
    this.accuracy,
    this.altitude,
    this.speed,
    required this.timestamp,
    this.battery,
    this.isCharging = false,
    this.isOnline = true,
    this.address,
  });

  factory LocationData.fromJson(Map<String, dynamic> json) => LocationData(
    latitude: (json['latitude'] ?? 0).toDouble(),
    longitude: (json['longitude'] ?? 0).toDouble(),
    accuracy: (json['accuracy'] as num?)?.toDouble(),
    altitude: (json['altitude'] as num?)?.toDouble(),
    speed: (json['speed'] as num?)?.toDouble(),
    timestamp: json['timestamp']?.toDate() ?? DateTime.now(),
    battery: json['battery'] as int?,
    isCharging: json['isCharging'] ?? false,
    isOnline: json['isOnline'] ?? true,
    address: json['address'],
  );
}
