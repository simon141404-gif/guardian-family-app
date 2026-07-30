import '../../domain/entities/child_entity.dart';
import '../../domain/repositories/child_repository.dart';
import '../datasources/remote/child_remote_datasource.dart';

class ChildRepositoryImpl implements ChildRepository {
  final ChildRemoteDatasource _childRemoteDatasource;
  ChildRepositoryImpl({required ChildRemoteDatasource childRemoteDatasource}) : _childRemoteDatasource = childRemoteDatasource;

  @override
  Future<ChildEntity> addChild(ChildEntity child) => _childRemoteDatasource.addChild(child);
  @override
  Future<ChildEntity?> getChild(String childId) => _childRemoteDatasource.getChild(childId);
  @override
  Future<List<ChildEntity>> getFamilyChildren(String familyId) => _childRemoteDatasource.getFamilyChildren(familyId);
  @override
  Future<void> updateChild(ChildEntity child) => _childRemoteDatasource.updateChild(child);
  @override
  Future<void> deleteChild(String childId) => _childRemoteDatasource.deleteChild(childId);
  @override
  Future<void> updateChildProfile(String childId, ChildProfile profile) => Future.value();
  @override
  Future<void> updateScreenTime(String childId, ScreenTime screenTime) => Future.value();
  @override
  Future<void> updateAppSettings(String childId, AppSettings appSettings) => Future.value();
  @override
  Future<void> updateChildLocation(String childId, LocationData location) => Future.value();
  @override
  Future<void> pauseChild(String childId) => Future.value();
  @override
  Future<void> resumeChild(String childId) => Future.value();
  @override
  Future<void> updateDeviceInfo(String childId, DeviceInfo deviceInfo) => Future.value();
  @override
  Stream<ChildEntity?> childStream(String childId) => _childRemoteDatasource.childStream(childId);
  @override
  Stream<List<ChildEntity>> familyChildrenStream(String familyId) => _childRemoteDatasource.familyChildrenStream(familyId);
}
