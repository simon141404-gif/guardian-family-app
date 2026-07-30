import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  final FlutterSecureStorage _storage;
  
  SecureStorageService() : _storage = const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  Future<void> saveAccessToken(String token) => _storage.write(key: 'access_token', value: token);
  Future<String?> getAccessToken() => _storage.read(key: 'access_token');
  Future<void> saveRefreshToken(String token) => _storage.write(key: 'refresh_token', value: token);
  Future<String?> getRefreshToken() => _storage.read(key: 'refresh_token');
  Future<void> saveUserId(String userId) => _storage.write(key: 'user_id', value: userId);
  Future<String?> getUserId() => _storage.read(key: 'user_id');
  Future<void> saveEncryptionKey(String key) => _storage.write(key: 'encryption_key', value: key);
  Future<String?> getEncryptionKey() => _storage.read(key: 'encryption_key');
  Future<void> setBiometricEnabled(bool enabled) => _storage.write(key: 'biometric_enabled', value: enabled.toString());
  Future<bool> isBiometricEnabled() async {
    final value = await _storage.read(key: 'biometric_enabled');
    return value == 'true';
  }
  Future<void> setOnboardingCompleted(bool completed) => _storage.write(key: 'onboarding_completed', value: completed.toString());
  Future<bool> isOnboardingCompleted() async {
    final value = await _storage.read(key: 'onboarding_completed');
    return value == 'true';
  }
  Future<void> clearAll() => _storage.deleteAll();
  Future<void> delete(String key) => _storage.delete(key: key);
}
