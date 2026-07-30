import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../domain/entities/family_entity.dart';
import '../../../domain/entities/user_entity.dart';

class FamilyRemoteDatasource {
  final FirebaseFirestore _firestore;
  
  FamilyRemoteDatasource(this._firestore);
  
  Future<FamilyEntity> createFamily(String name, String? photoUrl, String ownerId, String ownerName) async {
    final docRef = _firestore.collection('families').doc();
    final accessCode = _generateAccessCode();
    
    final family = FamilyEntity(
      id: docRef.id,
      name: name,
      photoUrl: photoUrl,
      createdAt: DateTime.now(),
      createdBy: ownerId,
      ownerId: ownerId,
      accessCode: accessCode,
      members: [
        FamilyMember(
          userId: ownerId,
          displayName: ownerName,
          role: FamilyRole.owner,
          joinedAt: DateTime.now(),
        ),
      ],
    );
    
    await docRef.set(_familyToMap(family));
    return family;
  }
  
  Future<FamilyEntity?> getFamily(String familyId) async {
    final doc = await _firestore.collection('families').doc(familyId).get();
    if (!doc.exists) return null;
    return _familyFromFirestore(doc);
  }
  
  Future<List<FamilyEntity>> getUserFamilies(String userId) async {
    final snapshot = await _firestore.collection('families')
        .where('members', arrayContains: {'userId': userId})
        .get();
    
    return snapshot.docs.map((doc) => _familyFromFirestore(doc)).toList();
  }
  
  Future<void> updateFamily(FamilyEntity family) async {
    await _firestore.collection('families').doc(family.id).update(_familyToMap(family));
  }
  
  Future<void> deleteFamily(String familyId) async {
    await _firestore.collection('families').doc(familyId).delete();
  }
  
  Future<String> generateInviteCode(String familyId, FamilyRole role) async {
    final code = _generateAccessCode();
    await _firestore.collection('families').doc(familyId).update({
      'pendingInvites': FieldValue.arrayUnion([{
        'id': code,
        'email': '',
        'role': role.name,
        'createdAt': DateTime.now().toIso8601String(),
        'expiresAt': DateTime.now().add(const Duration(days: 7)).toIso8601String(),
      }]),
    });
    return code;
  }
  
  Future<FamilyEntity> joinFamily(String accessCode) async {
    final snapshot = await _firestore.collection('families')
        .where('accessCode', isEqualTo: accessCode)
        .limit(1)
        .get();
    
    if (snapshot.docs.isEmpty) {
      throw Exception('Invalid access code');
    }
    
    // Implementation to add member would go here
    return _familyFromFirestore(snapshot.docs.first);
  }
  
  Future<void> leaveFamily(String familyId, String userId) async {
    await _firestore.collection('families').doc(familyId).update({
      'members': FieldValue.arrayRemove([
        {'userId': userId}
      ]),
    });
  }
  
  Stream<FamilyEntity?> familyStream(String familyId) {
    return _firestore.collection('families').doc(familyId).snapshots().map((doc) {
      if (!doc.exists) return null;
      return _familyFromFirestore(doc);
    });
  }
  
  String _generateAccessCode() {
    final random = DateTime.now().millisecondsSinceEpoch % 900000 + 100000;
    return random.toString();
  }
  
  FamilyEntity _familyFromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return FamilyEntity(
      id: data['id'],
      name: data['name'],
      photoUrl: data['photoUrl'],
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      createdBy: data['createdBy'],
      ownerId: data['ownerId'],
      accessCode: data['accessCode'] ?? '',
      settings: data['settings'] != null 
          ? FamilySettings(
              notificationsEnabled: data['settings']['notificationsEnabled'] ?? true,
              locationSharingEnabled: data['settings']['locationSharingEnabled'] ?? true,
              screenTimeAlertsEnabled: data['settings']['screenTimeAlertsEnabled'] ?? true,
              sosEnabled: data['settings']['sosEnabled'] ?? true,
              locationUpdateInterval: data['settings']['locationUpdateInterval'] ?? 30,
            )
          : null,
      members: (data['members'] as List?)?.map((m) => FamilyMember(
        userId: m['userId'],
        displayName: m['displayName'] ?? '',
        photoUrl: m['photoUrl'],
        role: FamilyRole.values.firstWhere(
          (r) => r.name == m['role'],
          orElse: () => FamilyRole.child,
        ),
        joinedAt: DateTime.tryParse(m['joinedAt'] ?? '') ?? DateTime.now(),
      )).toList() ?? [],
      geofences: (data['geofences'] as List?)?.map((g) => Geofence(
        id: g['id'],
        name: g['name'],
        latitude: g['latitude'].toDouble(),
        longitude: g['longitude'].toDouble(),
        radius: g['radius'].toDouble(),
        type: g['type'] ?? 'home',
        isActive: g['isActive'] ?? true,
        address: g['address'],
      )).toList() ?? [],
    );
  }
  
  Map<String, dynamic> _familyToMap(FamilyEntity family) {
    return {
      'id': family.id,
      'name': family.name,
      'photoUrl': family.photoUrl,
      'createdAt': family.createdAt,
      'createdBy': family.createdBy,
      'ownerId': family.ownerId,
      'accessCode': family.accessCode,
      'settings': family.settings != null ? {
        'notificationsEnabled': family.settings!.notificationsEnabled,
        'locationSharingEnabled': family.settings!.locationSharingEnabled,
        'screenTimeAlertsEnabled': family.settings!.screenTimeAlertsEnabled,
        'sosEnabled': family.settings!.sosEnabled,
        'locationUpdateInterval': family.settings!.locationUpdateInterval,
      } : null,
      'members': family.members.map((m) => {
        'userId': m.userId,
        'displayName': m.displayName,
        'photoUrl': m.photoUrl,
        'role': m.role.name,
        'joinedAt': m.joinedAt.toIso8601String(),
      }).toList(),
      'geofences': family.geofences.map((g) => {
        'id': g.id,
        'name': g.name,
        'latitude': g.latitude,
        'longitude': g.longitude,
        'radius': g.radius,
        'type': g.type,
        'isActive': g.isActive,
        'address': g.address,
      }).toList(),
    };
  }
}
