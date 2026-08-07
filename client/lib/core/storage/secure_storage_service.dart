import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../network/api_constants.dart';

class SecureStorageService {
  final FlutterSecureStorage _storage;

  SecureStorageService(this._storage);

  Future<void> saveToken(String token) async {
    await _storage.write(key: ApiConstants.jwtTokenKey, value: token);
  }

  Future<String?> getToken() async {
    return await _storage.read(key: ApiConstants.jwtTokenKey);
  }

  Future<void> deleteToken() async {
    await _storage.delete(key: ApiConstants.jwtTokenKey);
  }

  Future<void> saveUserRole(String role) async {
    await _storage.write(key: ApiConstants.userRoleKey, value: role);
  }

  Future<String?> getUserRole() async {
    return await _storage.read(key: ApiConstants.userRoleKey);
  }

  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}