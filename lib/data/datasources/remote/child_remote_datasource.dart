import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../domain/entities/child_entity.dart';

class ChildRemoteDatasource {
  final FirebaseFirestore _firestore;
  
  ChildRemoteDatasource(this._firestore);
  
  Future<ChildEntity> addChild(ChildEntity child) async {
    final docRef = _firestore.collection('children').doc();
    final updatedChild = ChildEntity(
      id: docRef.id,
      userId: child.userId,
      familyId: child.familyId,
      parentId: child.parentId,
      profile: child.profile,
      deviceInfo: child.deviceInfo,
      screenTime: child.screenTime,
      appSettings: child.appSettings,
      location: child.location,
      status: child.status,
      createdAt: DateTime.now(),
    );
    
    await docRef.set(_childToMap(updatedChild));
    return updatedChild;
  }
  
  Future<ChildEntity?> getChild(String childId) async {
    final doc = await _firestore.collection('children').doc(childId).get();
    if (!doc.exists) return null;
    return _childFromFirestore(doc);
  }
  
  Future<List<ChildEntity>> getFamilyChildren(String familyId) async {
    final snapshot = await _firestore.collection('children')
        .where('familyId', isEqualTo: familyId)
        .get();
    
    return snapshot.docs.map((doc) => _childFromFirestore(doc)).toList();
  }
  
  Future<void> updateChild(ChildEntity child) async {
    await _firestore.collection('children').doc(child.id).update(_childToMap(child));
  }
  
  Future<void> deleteChild(String childId) async {
    await _firestore.collection('children').doc(childId).delete();
  }
  
  Stream<ChildEntity?> childStream(String childId) {
    return _firestore.collection('children').doc(childId).snapshots().map((doc) {
      if (!doc.exists) return null;
      return _childFromFirestore(doc);
    });
  }
  
  Stream<List<ChildEntity>> familyChildrenStream(String familyId) {
    return _firestore.collection('children')
        .where('familyId', isEqualTo: familyId)
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) => _childFromFirestore(doc)).toList());
  }
  
  ChildEntity _childFromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return ChildEntity(
      id: data['id'],
      userId: data['userId'],
      familyId: data['familyId'],
      parentId: data['parentId'],
      status: ChildStatus.values.firstWhere(
        (s) => s.name == data['status'],
        orElse: () => ChildStatus.active,
      ),
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }
  
  Map<String, dynamic> _childToMap(ChildEntity child) {
    return {
      'id': child.id,
      'userId': child.userId,
      'familyId': child.familyId,
      'parentId': child.parentId,
      'status': child.status.name,
      'createdAt': child.createdAt,
    };
  }
}
