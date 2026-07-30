import '../entities/family_entity.dart';

abstract class FamilyRepository {
  Future<FamilyEntity> createFamily(String name, String? photoUrl);
  Future<FamilyEntity?> getFamily(String familyId);
  Future<List<FamilyEntity>> getUserFamilies();
  Future<void> updateFamily(FamilyEntity family);
  Future<void> deleteFamily(String familyId);
  Future<String> generateInviteCode(String familyId, FamilyRole role);
  Future<FamilyEntity> joinFamily(String accessCode);
  Future<void> leaveFamily(String familyId);
  Future<void> transferOwnership(String familyId, String newOwnerId);
  Future<void> addMember(String familyId, FamilyMember member);
  Future<void> removeMember(String familyId, String userId);
  Future<void> updateMemberRole(String familyId, String userId, FamilyRole role);
  Future<void> addGeofence(String familyId, Geofence geofence);
  Future<void> updateGeofence(String familyId, Geofence geofence);
  Future<void> removeGeofence(String familyId, String geofenceId);
  Stream<FamilyEntity?> familyStream(String familyId);
}
