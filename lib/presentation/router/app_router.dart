import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../pages/auth/login_page.dart';
import '../pages/auth/register_page.dart';
import '../pages/auth/forgot_password_page.dart';
import '../pages/auth/otp_verification_page.dart';
import '../pages/auth/biometric_setup_page.dart';
import '../pages/dashboard/main_dashboard_page.dart';

import '../pages/family/family_page.dart';
import '../pages/family/create_family_page.dart';
import '../pages/family/invite_family_page.dart';
import '../pages/children/children_page.dart';
import '../pages/children/child_detail_page.dart';
import '../pages/children/add_child_page.dart';
import '../pages/location/location_page.dart';
import '../pages/location/live_tracking_page.dart';
import '../pages/screen_time/screen_time_page.dart';
import '../pages/screen_time/app_usage_page.dart';
import '../pages/apps/app_management_page.dart';
import '../pages/device/device_info_page.dart';
import '../pages/device/remote_control_page.dart';
import '../pages/calls/calls_page.dart';
import '../pages/calls/video_call_page.dart';
import '../pages/chat/chat_page.dart';
import '../pages/chat/chat_detail_page.dart';
import '../pages/emergency/sos_page.dart';
import '../pages/emergency/emergency_contacts_page.dart';
import '../pages/reports/reports_page.dart';
import '../pages/settings/settings_page.dart';
import '../pages/settings/profile_page.dart';
import '../common/pages/splash_page.dart';
import '../common/pages/onboarding_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/splash',
    debugLogDiagnostics: true,
    routes: [
      GoRoute(
        path: '/splash',
        name: 'splash',
        builder: (context, state) => const SplashPage(),
      ),
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        builder: (context, state) => const OnboardingPage(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/register',
        name: 'register',
        builder: (context, state) => const RegisterPage(),
      ),
      GoRoute(
        path: '/forgot-password',
        name: 'forgotPassword',
        builder: (context, state) => const ForgotPasswordPage(),
      ),
      GoRoute(
        path: '/otp-verification',
        name: 'otpVerification',
        builder: (context, state) {
          final args = state.extra as Map<String, dynamic>?;
          return OtpVerificationPage(
            verificationId: args?['verificationId'] ?? '',
            isPasswordReset: args?['isPasswordReset'] ?? false,
          );
        },
      ),
      GoRoute(
        path: '/biometric-setup',
        name: 'biometricSetup',
        builder: (context, state) => const BiometricSetupPage(),
      ),
      GoRoute(
        path: '/dashboard',
        name: 'dashboard',
        builder: (context, state) => const MainDashboardPage(),
        routes: [
          GoRoute(
            path: 'home',
            name: 'home',
            builder: (context, state) => const MainDashboardPage(),
          ),
          GoRoute(
            path: 'family',
            name: 'family',
            builder: (context, state) => const FamilyPage(),
            routes: [
              GoRoute(
                path: 'create',
                name: 'createFamily',
                builder: (context, state) => const CreateFamilyPage(),
              ),
              GoRoute(
                path: 'invite',
                name: 'inviteFamily',
                builder: (context, state) => const InviteFamilyPage(),
              ),
            ],
          ),
          GoRoute(
            path: 'children',
            name: 'children',
            builder: (context, state) => const ChildrenPage(),
            routes: [
              GoRoute(
                path: 'add',
                name: 'addChild',
                builder: (context, state) => const AddChildPage(),
              ),
              GoRoute(
                path: ':childId',
                name: 'childDetail',
                builder: (context, state) => ChildDetailPage(
                  childId: state.pathParameters['childId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: 'location',
            name: 'location',
            builder: (context, state) => const LocationPage(),
            routes: [
              GoRoute(
                path: 'tracking/:childId',
                name: 'liveTracking',
                builder: (context, state) => LiveTrackingPage(
                  childId: state.pathParameters['childId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: 'screen-time',
            name: 'screenTime',
            builder: (context, state) => const ScreenTimePage(),
            routes: [
              GoRoute(
                path: 'usage/:childId',
                name: 'appUsage',
                builder: (context, state) => AppUsagePage(
                  childId: state.pathParameters['childId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: 'apps',
            name: 'appManagement',
            builder: (context, state) => const AppManagementPage(),
          ),
          GoRoute(
            path: 'device/:childId',
            name: 'deviceInfo',
            builder: (context, state) => DeviceInfoPage(
              childId: state.pathParameters['childId']!,
            ),
          ),
          GoRoute(
            path: 'remote-control/:childId',
            name: 'remoteControl',
            builder: (context, state) => RemoteControlPage(
              childId: state.pathParameters['childId']!,
            ),
          ),
          GoRoute(
            path: 'calls',
            name: 'calls',
            builder: (context, state) => const CallsPage(),
            routes: [
              GoRoute(
                path: 'video/:callId',
                name: 'videoCall',
                builder: (context, state) => VideoCallPage(
                  callId: state.pathParameters['callId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: 'chat',
            name: 'chat',
            builder: (context, state) => const ChatPage(),
            routes: [
              GoRoute(
                path: ':chatId',
                name: 'chatDetail',
                builder: (context, state) => ChatDetailPage(
                  chatId: state.pathParameters['chatId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: 'sos',
            name: 'sos',
            builder: (context, state) => const SosPage(),
            routes: [
              GoRoute(
                path: 'contacts',
                name: 'emergencyContacts',
                builder: (context, state) => const EmergencyContactsPage(),
              ),
            ],
          ),
          GoRoute(
            path: 'reports',
            name: 'reports',
            builder: (context, state) => const ReportsPage(),
          ),
          GoRoute(
            path: 'settings',
            name: 'settings',
            builder: (context, state) => const SettingsPage(),
            routes: [
              GoRoute(
                path: 'profile',
                name: 'profile',
                builder: (context, state) => const ProfilePage(),
              ),
            ],
          ),
        ],
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              'Page not found',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(state.uri.toString()),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context.go('/dashboard/home'),
              child: const Text('Go Home'),
            ),
          ],
        ),
      ),
    ),
  );
});
