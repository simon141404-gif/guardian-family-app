import 'package:flutter/material.dart';
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
import '../pages/chat/chat_page.dart';
import '../pages/chat/chat_detail_page.dart';
import '../pages/calls/calls_page.dart';
import '../pages/calls/video_call_page.dart';
import '../pages/emergency/sos_page.dart';
import '../pages/emergency/emergency_contacts_page.dart';
import '../pages/reports/reports_page.dart';
import '../pages/settings/settings_page.dart';
import '../pages/settings/profile_page.dart';
import '../common/pages/splash_page.dart';
import '../common/pages/onboarding_page.dart';

class AppRouter {
  static final _rootNavigatorKey = GlobalKey<NavigatorState>();

  static GoRouter router({bool isDemoMode = false}) {
    return GoRouter(
      navigatorKey: _rootNavigatorKey,
      initialLocation: '/splash',
      routes: [
        GoRoute(path: '/splash', builder: (context, state) => SplashPage(isDemoMode: isDemoMode)),
        GoRoute(path: '/onboarding', builder: (context, state) => const OnboardingPage()),
        GoRoute(path: '/login', builder: (context, state) => LoginPage(isDemoMode: isDemoMode)),
        GoRoute(path: '/register', builder: (context, state) => const RegisterPage()),
        GoRoute(path: '/forgot-password', builder: (context, state) => const ForgotPasswordPage()),
        GoRoute(path: '/otp-verification', builder: (context, state) => const OtpVerificationPage()),
        GoRoute(path: '/biometric-setup', builder: (context, state) => const BiometricSetupPage()),
        GoRoute(path: '/dashboard', builder: (context, state) => const MainDashboardPage()),
        GoRoute(path: '/family', builder: (context, state) => const FamilyPage()),
        GoRoute(path: '/create-family', builder: (context, state) => const CreateFamilyPage()),
        GoRoute(path: '/invite-family', builder: (context, state) => const InviteFamilyPage()),
        GoRoute(path: '/children', builder: (context, state) => const ChildrenPage()),
        GoRoute(path: '/child/:id', builder: (context, state) => ChildDetailPage(childId: state.pathParameters['id']!)),
        GoRoute(path: '/add-child', builder: (context, state) => const AddChildPage()),
        GoRoute(path: '/location', builder: (context, state) => const LocationPage()),
        GoRoute(path: '/live-tracking/:childId', builder: (context, state) => LiveTrackingPage(childId: state.pathParameters['childId']!)),
        GoRoute(path: '/screen-time', builder: (context, state) => const ScreenTimePage()),
        GoRoute(path: '/app-usage', builder: (context, state) => const AppUsagePage()),
        GoRoute(path: '/app-management', builder: (context, state) => const AppManagementPage()),
        GoRoute(path: '/device-info', builder: (context, state) => const DeviceInfoPage()),
        GoRoute(path: '/remote-control', builder: (context, state) => const RemoteControlPage()),
        GoRoute(path: '/chat', builder: (context, state) => const ChatPage()),
        GoRoute(path: '/chat/:id', builder: (context, state) => ChatDetailPage(chatId: state.pathParameters['id']!)),
        GoRoute(path: '/calls', builder: (context, state) => const CallsPage()),
        GoRoute(path: '/video-call', builder: (context, state) => const VideoCallPage()),
        GoRoute(path: '/sos', builder: (context, state) => const SosPage()),
        GoRoute(path: '/emergency-contacts', builder: (context, state) => const EmergencyContactsPage()),
        GoRoute(path: '/reports', builder: (context, state) => const ReportsPage()),
        GoRoute(path: '/settings', builder: (context, state) => const SettingsPage()),
        GoRoute(path: '/profile', builder: (context, state) => const ProfilePage()),
      ],
    );
  }
}
