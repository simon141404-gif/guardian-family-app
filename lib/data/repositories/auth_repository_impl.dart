import 'package:firebase_auth/firebase_auth.dart';
import '../../domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/remote/auth_remote_datasource.dart';
import '../datasources/local/local_storage_datasource.dart';
import '../../core/security/encryption_service.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDatasource _authRemoteDatasource;
  final LocalStorageDatasource _localStorageDatasource;
  final EncryptionService _encryptionService;

  AuthRepositoryImpl({
    required AuthRemoteDatasource authRemoteDatasource,
    required LocalStorageDatasource localStorageDatasource,
    required EncryptionService encryptionService,
  })  : _authRemoteDatasource = authRemoteDatasource,
        _localStorageDatasource = localStorageDatasource,
        _encryptionService = encryptionService;

  @override
  Future<UserEntity?> getCurrentUser() => _authRemoteDatasource.getCurrentUser();

  @override
  Stream<UserEntity?> authStateChanges() => _authRemoteDatasource.authStateChanges();

  @override
  Future<UserEntity?> signInWithEmail(String email, String password) {
    return _authRemoteDatasource.signInWithEmail(email, password);
  }

  @override
  Future<UserEntity?> signUpWithEmail(String email, String password, String displayName) {
    return _authRemoteDatasource.signUpWithEmail(email, password, displayName);
  }

  @override
  Future<UserEntity?> signInWithGoogle() => _authRemoteDatasource.signInWithGoogle();

  @override
  Future<UserEntity?> signInWithMicrosoft() => _authRemoteDatasource.signInWithMicrosoft();

  @override
  Future<UserEntity?> signInWithFacebook() => _authRemoteDatasource.signInWithFacebook();

  @override
  Future<UserEntity?> signInWithPhone(String phoneNumber) {
    return _authRemoteDatasource.signInWithPhone(phoneNumber).then((_) => null);
  }

  @override
  Future<bool> verifyPhoneOtp(String verificationId, String otp) {
    return _authRemoteDatasource.verifyPhoneOtp(verificationId, otp);
  }

  @override
  Future<void> signOut() => _authRemoteDatasource.signOut();

  @override
  Future<void> resetPassword(String email) => _authRemoteDatasource.resetPassword(email);

  @override
  Future<bool> enable2FA() async => false;

  @override
  Future<bool> disable2FA() async => false;

  @override
  Future<bool> verify2FACode(String code) async => false;

  @override
  Future<bool> enableBiometric() async {
    await _localStorageDatasource.setBool('biometric_enabled', true);
    return true;
  }

  @override
  Future<bool> disableBiometric() async {
    await _localStorageDatasource.setBool('biometric_enabled', false);
    return true;
  }

  @override
  Future<bool> isBiometricAvailable() async => false;

  @override
  Future<bool> authenticateWithBiometric() async => false;

  @override
  Future<void> updateUserProfile(UserEntity user) async {}
}
