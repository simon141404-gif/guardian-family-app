import 'package:flutter/foundation.dart';

class DemoModeService extends ChangeNotifier {
  static final DemoModeService _instance = DemoModeService._internal();
  factory DemoModeService() => _instance;
  DemoModeService._internal();

  bool _isDemoMode = true;
  bool get isDemoMode => _isDemoMode;

  void enableDemoMode() {
    _isDemoMode = true;
    notifyListeners();
  }

  void disableDemoMode() {
    _isDemoMode = false;
    notifyListeners();
  }
}
