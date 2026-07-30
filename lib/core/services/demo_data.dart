import '../../domain/entities/user_entity.dart';
import '../../domain/entities/family_entity.dart';
import '../../domain/entities/child_entity.dart';

class DemoData {
  static final UserEntity demoUser = UserEntity(
    id: 'demo_user_001',
    email: 'demo@guardianfamily.app',
    displayName: 'Demo User',
    role: UserRole.parent,
    createdAt: DateTime.now(),
    photoUrl: null,
    phoneNumber: '+1234567890',
    emailVerified: true,
  );

  static final FamilyEntity demoFamily = FamilyEntity(
    id: 'demo_family_001',
    name: 'Demo Family',
    ownerId: 'demo_user_001',
    members: ['demo_user_001', 'demo_child_001'],
    createdAt: DateTime.now(),
    inviteCode: 'DEMO1234',
    settings: FamilySettings(),
  );

  static final ChildEntity demoChild = ChildEntity(
    id: 'demo_child_001',
    userId: 'demo_child_user',
    familyId: 'demo_family_001',
    parentId: 'demo_user_001',
    name: 'John (Demo)',
    age: 10,
    profile: ChildProfile(
      birthday: DateTime(2014, 5, 15),
      school: 'Demo Elementary School',
      medicalInfo: 'No known allergies',
      emergencyContacts: ['+1234567890'],
      photoUrl: null,
    ),
    screenTime: ScreenTime(dailyLimit: const Duration(hours: 2), weeklyLimit: const Duration(hours: 14)),
    appSettings: AppSettings(blockedApps: [], allowedApps: []),
    location: LocationData(latitude: 37.7749, longitude: -122.4194, timestamp: DateTime.now(), accuracy: 10, speed: 0, altitude: 0, heading: 0),
    deviceInfo: DeviceInfo(deviceModel: 'Realme Note 13', batteryLevel: 85, isCharging: false),
    isOnline: true,
    lastSeen: DateTime.now(),
  );

  static final List<ChildEntity> demoChildren = [
    demoChild,
    ChildEntity(
      id: 'demo_child_002',
      userId: 'demo_child_user_2',
      familyId: 'demo_family_001',
      parentId: 'demo_user_001',
      name: 'Sarah (Demo)',
      age: 14,
      profile: ChildProfile(birthday: DateTime(2010, 8, 22), school: 'Demo High School', medicalInfo: 'Asthma', emergencyContacts: ['+1234567890'], photoUrl: null),
      screenTime: ScreenTime(dailyLimit: const Duration(hours: 3), weeklyLimit: const Duration(hours: 20)),
      appSettings: AppSettings(blockedApps: [], allowedApps: []),
      location: LocationData(latitude: 37.7849, longitude: -122.4094, timestamp: DateTime.now(), accuracy: 10, speed: 0, altitude: 0, heading: 0),
      deviceInfo: DeviceInfo(deviceModel: 'Realme Note 13', batteryLevel: 42, isCharging: true),
      isOnline: false,
      lastSeen: DateTime.now().subtract(const Duration(hours: 2)),
    ),
  ];
}
