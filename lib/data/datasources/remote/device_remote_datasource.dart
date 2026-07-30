import 'package:cloud_firestore/cloud_firestore.dart';

class DeviceRemoteDatasource {
  final FirebaseFirestore _firestore;
  DeviceRemoteDatasource(this._firestore);
  
  Future<Map<String, dynamic>> getDeviceInfo(String childId) async {
    final doc = await _firestore.collection('children').doc(childId).get();
    if (!doc.exists) throw Exception('Child not found');
    return doc.data()?['deviceInfo'] ?? {};
  }
  
  Future<void> startScreenShare(String childId) async {
    await _firestore.collection('children').doc(childId).update({'screenShare.active': true, 'screenShare.startedAt': DateTime.now().millisecondsSinceEpoch});
  }
  
  Future<void> stopScreenShare(String childId) async {
    await _firestore.collection('children').doc(childId).update({'screenShare.active': false});
  }
  
  Stream<Map<String, dynamic>> screenShareStream(String childId) {
    return _firestore.collection('children').doc(childId).snapshots().map((doc) => doc.data()?['screenShare'] ?? {});
  }
}
