import 'package:freezed_annotation/freezed_annotation.dart';
import 'user_model.dart';

part 'auth_payloads.freezed.dart';
part 'auth_payloads.g.dart';

// --- LOGIN REQUEST DTO ---
@freezed
abstract class LoginRequest with _$LoginRequest {
  const factory LoginRequest({
    required String phone,
    required String pin,
  }) = _LoginRequest;

  factory LoginRequest.fromJson(Map<String, dynamic> json) =>
      _$LoginRequestFromJson(json);
}

// --- AUTH RESPONSE DTO ---
@freezed
abstract class AuthResponse with _$AuthResponse {
  const factory AuthResponse({
    required String token,
    required UserModel user,
  }) = _AuthResponse;

  factory AuthResponse.fromJson(Map<String, dynamic> json) =>
      _$AuthResponseFromJson(json);
}