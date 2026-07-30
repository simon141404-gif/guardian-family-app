import '../entities/child_entity.dart';

abstract class LocationRepository {
  Future<LocationData> getLocation(String childId);
  Future<List<LocationData>> getLocationHistory(String childId, DateTime start, DateTime end);
  Stream<LocationData> locationStream(String childId);
  Future<void> startLocationTracking(String childId);
  Future<void> stopLocationTracking(String childId);
  Future<bool> isWithinGeofence(String childId, double lat, double lng, double radius);
  Future<List<Map<String, dynamic>>> getGeofenceAlerts(String childId);
}
