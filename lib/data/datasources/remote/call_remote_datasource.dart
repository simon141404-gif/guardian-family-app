import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_database/firebase_database.dart';

class CallRemoteDatasource {
  final FirebaseFirestore _firestore;
  final FirebaseDatabase _database;
  CallRemoteDatasource(this._firestore, this._database);
  
  Future<Map<String, dynamic>> initiateCall(String type, String initiatorId, String initiatorName, List<String> participants) async {
    final docRef = _firestore.collection('calls').doc();
    final callData = {'id': docRef.id, 'type': type, 'status': 'initiated', 'initiatorId': initiatorId, 'initiatorName': initiatorName, 'participants': participants, 'createdAt': FieldValue.serverTimestamp()};
    await docRef.set(callData);
    await _database.ref('calls/${docRef.id}').set({'initiatorId': initiatorId, 'participants': participants, 'status': 'initiated', 'startedAt': DateTime.now().millisecondsSinceEpoch});
    return {'id': docRef.id, ...callData};
  }
  
  Stream<Map<String, dynamic>?> callStream(String callId) {
    return _firestore.collection('calls').doc(callId).snapshots().map((doc) {
      if (!doc.exists) return null;
      final data = doc.data()!;
      data['id'] = doc.id;
      return data;
    });
  }
  
  Future<void> updateCallStatus(String callId, String status) async {
    await _firestore.collection('calls').doc(callId).update({'status': status});
  }
  
  Future<List<Map<String, dynamic>>> getCallHistory() async {
    final snapshot = await _firestore.collection('calls').orderBy('createdAt', descending: true).limit(50).get();
    return snapshot.docs.map((doc) {
      final data = doc.data();
      data['id'] = doc.id;
      return data;
    }).toList();
  }
}
