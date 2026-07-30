import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http/io_client.dart';
import '../constants/app_constants.dart';

class ApiClient {
  final http.Client _client;
  
  ApiClient() : _client = IOClient();

  Future<Map<String, String>> _getHeaders({bool requiresAuth = true}) async {
    final headers = <String, String>{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    return headers;
  }
  
  Future<ApiResponse> get(String endpoint, {Map<String, String>? queryParams, bool requiresAuth = true}) async {
    try {
      final uri = Uri.parse('${AppConstants.apiBaseUrl}$endpoint').replace(queryParameters: queryParams);
      final headers = await _getHeaders(requiresAuth: requiresAuth);
      final response = await _client.get(uri, headers: headers).timeout(const Duration(milliseconds: AppConstants.apiTimeout));
      return _handleResponse(response);
    } on SocketException {
      return ApiResponse.error('No internet connection');
    } catch (e) {
      return ApiResponse.error(e.toString());
    }
  }
  
  Future<ApiResponse> post(String endpoint, {Map<String, dynamic>? body, bool requiresAuth = true}) async {
    try {
      final uri = Uri.parse('${AppConstants.apiBaseUrl}$endpoint');
      final headers = await _getHeaders(requiresAuth: requiresAuth);
      final response = await _client.post(uri, headers: headers, body: jsonEncode(body)).timeout(const Duration(milliseconds: AppConstants.apiTimeout));
      return _handleResponse(response);
    } on SocketException {
      return ApiResponse.error('No internet connection');
    } catch (e) {
      return ApiResponse.error(e.toString());
    }
  }
  
  ApiResponse _handleResponse(http.Response response) {
    final body = response.body.isNotEmpty ? jsonDecode(response.body) : null;
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return ApiResponse.success(body);
    } else {
      return ApiResponse.error(body?['message'] ?? 'Unknown error', statusCode: response.statusCode);
    }
  }
  
  void dispose() => _client.close();
}

class ApiResponse {
  final bool isSuccess;
  final dynamic data;
  final String? error;
  final int? statusCode;
  
  ApiResponse._({required this.isSuccess, this.data, this.error, this.statusCode});
  factory ApiResponse.success(dynamic data) => ApiResponse._(isSuccess: true, data: data);
  factory ApiResponse.error(String error, {int? statusCode}) => ApiResponse._(isSuccess: false, error: error, statusCode: statusCode);
}
