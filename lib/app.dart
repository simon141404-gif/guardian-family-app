import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'presentation/router/app_router.dart';

class GuardianFamilyApp extends ConsumerWidget {
  final bool isDemoMode;
  const GuardianFamilyApp({super.key, this.isDemoMode = false});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ProviderScope(
      child: MaterialApp.router(
        title: 'Guardian Family',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        themeMode: ThemeMode.system,
        routerConfig: AppRouter.router(isDemoMode: isDemoMode),
      ),
    );
  }
}
