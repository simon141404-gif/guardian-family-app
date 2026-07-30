import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LocalStorageDatasource {
  final FlutterSecureStorage _storage;
  
  LocalStorageDatasource() : _storage = const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );
  
  Future<void> write(String key, String value) => _storage.write(key: key, value: value);
  Future<String?> read(String key) => _storage.read(key: key);
  Future<void> delete(String key) => _storage.delete(key: key);
  Future<void> deleteAll() => _storage.deleteAll();
  
  Future<void> setString(String key, String value) => write(key, value);
  Future<String?> getString(String key) => read(key);
  
  Future<void> setBool(String key, bool value) => write(key, value.toString());
  Future<bool?> getBool(String key) async {
    final value = await read(key);
    return value == 'true';
  }
  
  Future<void> setInt(String key, int value) => write(key, value.toString());
  Future<int?> getInt(String key) async {
    final value = await read(key);
    return value != null ? int.tryParse(value) : null;
  }
}
