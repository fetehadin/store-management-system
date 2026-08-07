import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/security/biometric_service.dart';
import '../../domain/user_model.dart';
import '../../data/auth_repository.dart';

final authStateProvider =
    StateNotifierProvider<AuthNotifier, AsyncValue<UserModel?>>((ref) {
  final authRepo = ref.watch(authRepositoryProvider);
  return AuthNotifier(authRepo, BiometricService());
});

class AuthNotifier extends StateNotifier<AsyncValue<UserModel?>> {
  final AuthRepository _repository;
  final BiometricService _biometricService;

  AuthNotifier(this._repository, this._biometricService)
      : super(const AsyncValue.loading()) {
    checkInitialSession();
  }

  /// Runs on app startup: restores user if JWT is still valid in storage
  Future<void> checkInitialSession() async {
    state = const AsyncValue.loading();
    try {
      final user = await _repository.getSessionUser();
      state = AsyncValue.data(user);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  /// PIN Sign-In Workflow
  Future<void> loginWithPin(String phone, String pin) async {
    state = const AsyncValue.loading();
    try {
      final user = await _repository.login(phone: phone, pin: pin);
      state = AsyncValue.data(user);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  /// Biometric Sign-In Workflow (TouchID / FaceID)
  Future<bool> loginWithBiometrics() async {
    final authenticated = await _biometricService.authenticate(
      promptMessage: 'Scan fingerprint or Face ID to unlock ibnTaju DMS',
    );

    if (authenticated) {
      await checkInitialSession();
      return state.value != null;
    }
    return false;
  }

  /// Sign-Out Workflow
  Future<void> logout() async {
    state = const AsyncValue.loading();
    await _repository.logout();
    state = const AsyncValue.data(null);
  }
}