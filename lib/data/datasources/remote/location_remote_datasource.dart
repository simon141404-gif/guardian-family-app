import 'package:firebase_database/firebase_database.dart';
import '../../../domain/entities/child_entity.dart';

class LocationRemoteDatasource {
  final FirebaseDatabase _database;
  
  LocationRemoteDatasource(this._database);
  
  Future<LocationData> getLocation(String childId) async {
    final snapshot = await _database.ref('location/$childId').get();
    if (!snapshot.exists) {
      throw Exception('Location not found');
    }
    
    final data = snapshot.value as Map<dynamic, dynamic>;
    return LocationData(
      latitude: (data['lat'] as num).toDouble(),
      longitude: (data['lng'] as num).toDouble(),
      accuracy: (data['accuracy'] as num?)?.toDouble(),
      altitude: (data['altitude'] as num?)?.toDouble(),
      speed: (data['speed'] as num?)?.toDouble(),
      timestamp: DateTime.fromMillisecondsSinceEpoch(data['timestamp']),
      battery: data['battery'] as int?,
      isCharging: data['isCharging'] as bool? ?? false,
    );
  }
  
  Stream<LocationData> locationStream(String childId) {
    return _database.ref('location/$childId').onValue.map((event) {
      if (!event.snapshot.exists) {
        throw Exception('Location not found');
      }
      
      final data = event.snapshot.value as Map<dynamic, dynamic>;
      return LocationData(
        latitude: (data['lat'] as num).toDouble(),
        longitude: (data['lng'] as num).toDouble(),
        accuracy: (data['accuracy'] as num?)?.toDouble(),
        altitude: (data['altitude'] as num?)?.toDouble(),
        speed: (data['speed'] as num?)?.toDouble(),
        timestamp: DateTime.fromMillisecondsSinceEpoch(data['timestamp']),
        battery: data['battery'] as int?,
        isCharging: data['isCharging'] as bool? ?? false,
      );
    });
  }
  
  Future<void> updateLocation(String childId, LocationData location) async {
    await _database.ref('location/$childId').set({
      'lat': location.latitude,
      'lng': location.longitude,
      'accuracy': location.accuracy,
      'altitude': location.altitude,
      'speed': location.speed,
      'timestamp': location.timestamp.millisecondsSinceEpoch,
      'battery': location.battery,
      'isCharging': location.isCharging,
    });
  }
}
