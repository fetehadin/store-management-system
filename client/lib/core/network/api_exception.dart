import 'package:dio/dio.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final Map<String, dynamic>? rawError;

  ApiException({
    required this.message,
    this.statusCode,
    this.rawError,
  });

  factory ApiException.fromDioException(DioException error) {
    int? status = error.response?.statusCode;
    final data = error.response?.data;

    String errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.type == DioExceptionType.connectionTimeout ||
        error.type == DioExceptionType.receiveTimeout ||
        error.type == DioExceptionType.sendTimeout) {
      errorMessage = 'Connection timed out. Check your network.';
    } else if (error.type == DioExceptionType.connectionError) {
      errorMessage = 'No internet connection or server is offline.';
    } else if (data != null && data is Map<String, dynamic>) {
      if (data.containsKey('message') && data['message'] != null) {
        errorMessage = data['message'].toString();
      } else if (data.containsKey('errors') && data['errors'] is List) {
        final errors = data['errors'] as List;
        if (errors.isNotEmpty && errors.first is Map) {
          final firstError = errors.first as Map;
          if (firstError.containsKey('message')) {
            errorMessage = firstError['message'].toString();
          }
        }
      }
    }

    return ApiException(
      message: errorMessage,
      statusCode: status,
      rawError: data is Map<String, dynamic> ? data : null,
    );
  }

  @override
  String toString() => message;
}