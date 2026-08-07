import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/network/dio_client.dart';
import '../../../../core/storage/secure_storage_service.dart';
import '../domain/auth_payloads.dart';
import '../domain/user_model.dart';

final secureStorageServiceProvider = Provider<SecureStorageService>((ref) {
  final secureStorage = ref.watch(secureStorageProvider);
  return SecureStorageService(secureStorage);
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  final storageService = ref.watch(secureStorageServiceProvider);
  return AuthRepository(
    dioClient: dioClient,
    storageService: storageService,
  );
});

class AuthRepository {
  final DioClient dioClient;
  final SecureStorageService storageService;

  AuthRepository({
    required this.dioClient,
    required this.storageService,
  });

  /// Authenticates user with Phone + PIN against POST /api/auth/login
  Future<UserModel> login({
    required String phone,
    required String pin,
  }) async {
    final payload = LoginRequest(phone: phone, pin: pin);

    final response = await dioClient.post(
      '/auth/login',
      data: payload.toJson(),
    );

    final authResponse = AuthResponse.fromJson(response.data);

    // Securely vault JWT token & user role in hardware storage
    await storageService.saveToken(authResponse.token);
    await storageService.saveUserRole(authResponse.user.role.name);

    return authResponse.user;
  }

  /// Restores active user session on app startup if JWT is valid
  Future<UserModel?> getSessionUser() async {
    final token = await storageService.getToken();
    if (token == null || token.isEmpty) return null;

    try {
      // Call GET /api/auth/me (or your equivalent profile endpoint)
      final response = await dioClient.get('/auth/me');
      return UserModel.fromJson(response.data);
    } catch (_) {
      // If backend returns 401 Unauthorized or token is invalid, scrub storage
      await storageService.clearAll();
      return null;
    }
  }

  /// Signs out and scrubs the hardware keychain
  Future<void> logout() async {
    await storageService.clearAll();
  }
}