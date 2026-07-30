import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import '../../../domain/entities/user_entity.dart';

class AuthRemoteDatasource {
  final FirebaseAuth _firebaseAuth;
  final FirebaseFirestore _firestore;
  final FirebaseMessaging _messaging;
  
  AuthRemoteDatasource({
    required FirebaseAuth firebaseAuth,
    required FirebaseFirestore firebaseFirestore,
    required FirebaseMessaging firebaseMessaging,
  })  : _firebaseAuth = firebaseAuth,
        _firestore = firebaseFirestore,
        _messaging = firebaseMessaging;
  
  Future<UserEntity?> getCurrentUser() async {
    final firebaseUser = _firebaseAuth.currentUser;
    if (firebaseUser == null) return null;
    
    final doc = await _firestore.collection('users').doc(firebaseUser.uid).get();
    if (!doc.exists) return null;
    
    return _userFromFirestore(doc);
  }
  
  Stream<UserEntity?> authStateChanges() {
    return _firebaseAuth.authStateChanges().asyncMap((firebaseUser) async {
      if (firebaseUser == null) return null;
      final doc = await _firestore.collection('users').doc(firebaseUser.uid).get();
      if (!doc.exists) return null;
      return _userFromFirestore(doc);
    });
  }
  
  Future<UserEntity?> signInWithEmail(String email, String password) async {
    final credential = await _firebaseAuth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    await _updateDeviceToken(credential.user!.uid);
    return getCurrentUser();
  }
  
  Future<UserEntity?> signUpWithEmail(String email, String password, String displayName) async {
    final credential = await _firebaseAuth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
    
    await credential.user!.updateDisplayName(displayName);
    await _createUserDocument(credential.user!);
    await _updateDeviceToken(credential.user!.uid);
    
    return getCurrentUser();
  }
  
  Future<UserEntity?> signInWithGoogle() async {
    // Implementation would use google_sign_in package
    throw UnimplementedError('Google Sign-In not implemented');
  }
  
  Future<UserEntity?> signInWithMicrosoft() async {
    throw UnimplementedError('Microsoft Sign-In not implemented');
  }
  
  Future<UserEntity?> signInWithFacebook() async {
    throw UnimplementedError('Facebook Sign-In not implemented');
  }
  
  Future<String> signInWithPhone(String phoneNumber) async {
    final completion = await _firebaseAuth.verifyPhoneNumber(
      phoneNumber: phoneNumber,
      verificationCompleted: (credential) async {
        await _firebaseAuth.signInWithCredential(credential);
      },
      verificationFailed: (exception) {
        throw exception;
      },
      codeSent: (verificationId, forceResendingToken) {
        // Return verificationId
      },
      codeAutoRetrievalTimeout: (verificationId) {},
    );
    throw UnimplementedError('Phone Sign-In not fully implemented');
  }
  
  Future<bool> verifyPhoneOtp(String verificationId, String otp) async {
    final credential = PhoneAuthProvider.credential(
      verificationId: verificationId,
      smsCode: otp,
    );
    await _firebaseAuth.signInWithCredential(credential);
    return true;
  }
  
  Future<void> signOut() async {
    await _firebaseAuth.signOut();
  }
  
  Future<void> resetPassword(String email) async {
    await _firebaseAuth.sendPasswordResetEmail(email: email);
  }
  
  Future<void> _createUserDocument(User firebaseUser) async {
    await _firestore.collection('users').doc(firebaseUser.uid).set({
      'id': firebaseUser.uid,
      'email': firebaseUser.email,
      'displayName': firebaseUser.displayName ?? '',
      'photoUrl': firebaseUser.photoURL,
      'phoneNumber': firebaseUser.phoneNumber,
      'createdAt': FieldValue.serverTimestamp(),
      'isVerified': firebaseUser.emailVerified,
      'is2FAEnabled': false,
      'biometricEnabled': false,
      'deviceTokens': [],
    });
  }
  
  Future<void> _updateDeviceToken(String userId) async {
    final token = await _messaging.getToken();
    if (token != null) {
      await _firestore.collection('users').doc(userId).update({
        'deviceTokens': FieldValue.arrayUnion([token]),
      });
    }
  }
  
  UserEntity _userFromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return UserEntity(
      id: data['id'],
      email: data['email'],
      displayName: data['displayName'] ?? '',
      photoUrl: data['photoUrl'],
      phoneNumber: data['phoneNumber'],
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      isVerified: data['isVerified'] ?? false,
      is2FAEnabled: data['is2FAEnabled'] ?? false,
      biometricEnabled: data['biometricEnabled'] ?? false,
      deviceTokens: List<String>.from(data['deviceTokens'] ?? []),
      familyRole: data['familyRole'],
      familyId: data['familyId'],
    );
  }
}
