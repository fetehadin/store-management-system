class ApiConstants {
  ApiConstants._();

  // Change to your laptop LAN IP when testing on physical devices
  static const String baseUrl = 'http://10.0.2.2:3000/api'; 
  
  static const Duration connectionTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 15);

  static const String jwtTokenKey = 'jwt_token';
  static const String userRoleKey = 'user_role';
  
  static const String contentTypeHeader = 'Content-Type';
  static const String applicationJson = 'application/json';
  static const String authorizationHeader = 'Authorization';
}