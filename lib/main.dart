import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set preferred orientations
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Try to initialize Firebase, if fails, run in demo mode
  bool firebaseInitialized = false;
  
  try {
    await Firebase.initializeApp();
    firebaseInitialized = true;
    debugPrint('Firebase initialized successfully');
  } catch (e) {
    debugPrint('Firebase initialization failed: $e');
    debugPrint('Running in DEMO MODE - Firebase not configured');
  }

  runApp(
    ProviderScope(
      child: GuardianFamilyApp(isDemoMode: !firebaseInitialized),
    ),
  );
}
