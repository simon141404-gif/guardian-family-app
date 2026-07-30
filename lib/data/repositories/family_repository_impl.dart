import '../../domain/entities/family_entity.dart';
import '../../domain/repositories/family_repository.dart';
import '../datasources/remote/family_remote_datasource.dart';

class FamilyRepositoryImpl implements FamilyRepository {
  final FamilyRemoteDatasource _familyRemoteDatasource;

  FamilyRepositoryImpl({required FamilyRemoteDatasource familyRemoteDatasource})
      : _familyRemoteDatasource = familyRemoteDatasource;

  @override
  Future<FamilyEntity> createFamily(String name, String? photoUrl) {
    throw UnimplementedError();
  }

  @override
  Future<FamilyEntity?> getFamily(String familyId) {
    return _familyRemoteDatasource.getFamily(familyId);
  }

  @override
  Future<List<FamilyEntity>> getUserFamilies() {
    throw UnimplementedError();
  }

  @override
  Future<void> updateFamily(FamilyEntity family) {
    return _familyRemoteDatasource.updateFamily(family);
  }

  @override
  Future<void> deleteFamily(String familyId) {
    return _familyRemoteDatasource.deleteFamily(familyId);
  }

  @override
  Future<String> generateInviteCode(String familyId, FamilyRole role) {
    return _familyRemoteDatasource.generateInviteCode(familyId, role);
  }

  @override
  Future<FamilyEntity> joinFamily(String accessCode) {
    return _familyRemoteDatasource.joinFamily(accessCode);
  }

  @override
  Future<void> leaveFamily(String familyId) {
    throw UnimplementedError();
  }

  @override
  Future<void> transferOwnership(String familyId, String newOwnerId) {
    throw UnimplementedError();
  }

  @override
  Future<void> addMember(String familyId, FamilyMember member) {
    throw UnimplementedError();
  }

  @override
  Future<void> removeMember(String familyId, String userId) {
    throw UnimplementedError();
  }

  @override
  Future<void> updateMemberRole(String familyId, String userId, FamilyRole role) {
    throw UnimplementedError();
  }

  @override
  Future<void> addGeofence(String familyId, Geofence geofence) {
    throw UnimplementedError();
  }

  @override
  Future<void> updateGeofence(String familyId, Geofence geofence) {
    throw UnimplementedError();
  }

  @override
  Future<void> removeGeofence(String familyId, String geofenceId) {
    throw UnimplementedError();
  }

  @override
  Stream<FamilyEntity?> familyStream(String familyId) {
    return _familyRemoteDatasource.familyStream(familyId);
  }
}
