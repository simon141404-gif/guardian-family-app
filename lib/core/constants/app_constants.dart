class AppConstants {
  static const String appName = 'Guardian Family';
  static const String appTagline = 'Protect • Connect • Manage';
  
  // Firebase Collections
  static const String usersCollection = 'users';
  static const String familiesCollection = 'families';
  static const String childrenCollection = 'children';
  static const String chatsCollection = 'chats';
  static const String messagesCollection = 'messages';
  static const String callsCollection = 'calls';
  static const String alertsCollection = 'alerts';
  static const String reportsCollection = 'reports';
  
  // Realtime Database Paths
  static const String presencePath = 'presence';
  static const String locationPath = 'location';
  static const String screenSharePath = 'screenShare';
  static const String typingPath = 'typing';
  
  // Storage Paths
  static const String avatarsPath = 'avatars';
  static const String chatMediaPath = 'chat_media';
  static const String reportsPath = 'reports';
  
  // WebRTC
  static const String stunServer = 'stun:stun.l.google.com:19302';
  static const String turnServer = '';
  static const String signalingUrl = '';
  
  // API
  static const String apiBaseUrl = 'https://api.guardianfamily.com';
  static const int apiTimeout = 30000;
  
  // Session
  static const int sessionTimeout = 900;
  static const int refreshTokenExpiry = 604800;
  
  // Limits
  static const int maxFamilyMembers = 10;
  static const int maxChildren = 5;
  static const int maxEmergencyContacts = 5;
  static const int maxCallParticipants = 8;
  
  // Animation Durations
  static const int shortAnimation = 200;
  static const int mediumAnimation = 400;
  static const int longAnimation = 600;
  
  // Screen Time Defaults
  static const int defaultDailyLimit = 180;
  static const int defaultWeeklyLimit = 1200;
  static const int studyModeStart = 9;
  static const int studyModeEnd = 17;
  static const int sleepModeStart = 21;
  static const int sleepModeEnd = 7;
}
