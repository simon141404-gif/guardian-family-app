abstract class Failure {
  final String message;
  final int? code;
  
  const Failure({required this.message, this.code});
  
  @override
  String toString() => message;
}

class ServerFailure extends Failure {
  const ServerFailure({super.message = 'Server error occurred', super.code});
}

class NetworkFailure extends Failure {
  const NetworkFailure({super.message = 'Network error occurred', super.code});
}

class CacheFailure extends Failure {
  const CacheFailure({super.message = 'Cache error occurred', super.code});
}

class AuthFailure extends Failure {
  const AuthFailure({super.message = 'Authentication error', super.code});
}

class ValidationFailure extends Failure {
  const ValidationFailure({super.message = 'Validation error', super.code});
}

class FirebaseFailure extends Failure {
  const FirebaseFailure({super.message = 'Firebase error', super.code});
}

class PermissionFailure extends Failure {
  const PermissionFailure({super.message = 'Permission denied', super.code});
}

class UnknownFailure extends Failure {
  const UnknownFailure({super.message = 'Unknown error occurred', super.code});
}
