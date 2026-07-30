import '../entities/user_entity.dart';

abstract class AuthRepository {
  Future<UserEntity?> getCurrentUser();
  Future<UserEntity?> signInWithEmail(String email, String password);
  Future<UserEntity?> signUpWithEmail(String email, String password, String displayName);
  Future<UserEntity?> signInWithGoogle();
  Future<UserEntity?> signInWithMicrosoft();
  Future<UserEntity?> signInWithFacebook();
  Future<UserEntity?> signInWithPhone(String phoneNumber);
  Future<bool> verifyPhoneOtp(String verificationId, String otp);
  Future<void> signOut();
  Future<void> resetPassword(String email);
  Future<bool> enable2FA();
  Future<bool> disable2FA();
  Future<bool> verify2FACode(String code);
  Future<bool> enableBiometric();
  Future<bool> disableBiometric();
  Future<bool> isBiometricAvailable();
  Future<bool> authenticateWithBiometric();
  Future<void> updateUserProfile(UserEntity user);
  Stream<UserEntity?> authStateChanges();
}
