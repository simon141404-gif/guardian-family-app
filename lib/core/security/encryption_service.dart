import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';
import 'package:encrypt/encrypt.dart';
import 'package:crypto/crypto.dart';
import 'secure_storage_service.dart';

class EncryptionService {
  final SecureStorageService _secureStorage;
  Key? _key;
  IV? _iv;
  
  EncryptionService(this._secureStorage);
  
  Future<void> initialize() async {
    String? storedKey = await _secureStorage.getEncryptionKey();
    if (storedKey == null) {
      storedKey = _generateKey();
      await _secureStorage.saveEncryptionKey(storedKey);
    }
    _key = Key.fromUtf8(storedKey.padRight(32).substring(0, 32));
    _iv = IV.fromLength(16);
  }
  
  String _generateKey() {
    final random = Random.secure();
    final values = List<int>.generate(32, (i) => random.nextInt(256));
    return base64Encode(values);
  }
  
  String encrypt(String plainText) {
    if (_key == null) {
      throw Exception('Encryption service not initialized');
    }
    final encrypter = Encrypter(AES(_key!, mode: AESMode.cbc));
    final encrypted = encrypter.encrypt(plainText, iv: _iv);
    return encrypted.base64;
  }
  
  String decrypt(String encryptedText) {
    if (_key == null) {
      throw Exception('Encryption service not initialized');
    }
    final encrypter = Encrypter(AES(_key!, mode: AESMode.cbc));
    final decrypted = encrypter.decrypt64(encryptedText, iv: _iv);
    return decrypted;
  }
  
  String hashPassword(String password) {
    final bytes = utf8.encode(password);
    final digest = sha256.convert(bytes);
    return digest.toString();
  }
  
  String generateAccessCode() {
    final random = Random.secure();
    final values = List<int>.generate(6, (i) => random.nextInt(10));
    return values.join();
  }
  
  Uint8List deriveKey(String password, String salt) {
    final passwordBytes = utf8.encode(password);
    final saltBytes = utf8.encode(salt);
    final combined = [...passwordBytes, ...saltBytes];
    
    // PBKDF2-like key derivation
    var hash = sha256.convert(combined);
    for (int i = 0; i < 10000; i++) {
      hash = sha256.convert(hash.bytes);
    }
    return Uint8List.fromList(hash.bytes);
  }
}
