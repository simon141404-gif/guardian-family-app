import '../entities/child_entity.dart';

abstract class ChildRepository {
  Future<ChildEntity> addChild(ChildEntity child);
  Future<ChildEntity?> getChild(String childId);
  Future<List<ChildEntity>> getFamilyChildren(String familyId);
  Future<void> updateChild(ChildEntity child);
  Future<void> deleteChild(String childId);
  Future<void> updateChildProfile(String childId, ChildProfile profile);
  Future<void> updateScreenTime(String childId, ScreenTime screenTime);
  Future<void> updateAppSettings(String childId, AppSettings appSettings);
  Future<void> updateChildLocation(String childId, LocationData location);
  Future<void> pauseChild(String childId);
  Future<void> resumeChild(String childId);
  Future<void> updateDeviceInfo(String childId, DeviceInfo deviceInfo);
  Stream<ChildEntity?> childStream(String childId);
  Stream<List<ChildEntity>> familyChildrenStream(String familyId);
}
