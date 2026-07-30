import '../../domain/entities/child_entity.dart';
import '../../domain/repositories/location_repository.dart';
import '../datasources/remote/location_remote_datasource.dart';

class LocationRepositoryImpl implements LocationRepository {
  final LocationRemoteDatasource _locationRemoteDatasource;
  LocationRepositoryImpl({required LocationRemoteDatasource locationRemoteDatasource}) : _locationRemoteDatasource = locationRemoteDatasource;

  @override
  Future<LocationData> getLocation(String childId) => _locationRemoteDatasource.getLocation(childId);
  @override
  Future<List<LocationData>> getLocationHistory(String childId, DateTime start, DateTime end) => Future.value([]);
  @override
  Stream<LocationData> locationStream(String childId) => _locationRemoteDatasource.locationStream(childId);
  @override
  Future<void> startLocationTracking(String childId) => Future.value();
  @override
  Future<void> stopLocationTracking(String childId) => Future.value();
  @override
  Future<bool> isWithinGeofence(String childId, double lat, double lng, double radius) => Future.value(false);
  @override
  Future<List<Map<String, dynamic>>> getGeofenceAlerts(String childId) => Future.value([]);
}
