# Guardian Family 🛡️

**Protect • Connect • Manage**

A comprehensive family management Android application for parental control, child monitoring, and family safety.

## ⚠️ IMPORTANT SETUP REQUIRED

This app **REQUIRES Firebase configuration** to function. Without proper setup, the app will crash on launch.

### Prerequisites

1. **Flutter SDK 3.x** or higher
2. **Android SDK** (API 26+)
3. **Firebase Project** with the following services enabled:
   - Authentication
   - Cloud Firestore
   - Realtime Database
   - Cloud Storage
   - Cloud Messaging
   - Analytics
   - Crashlytics

### Firebase Setup Steps

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add Android app with package name: `com.guardianfamily.app`

2. **Download Configuration**
   - Download `google-services.json` from Firebase Console
   - Place it in: `android/app/google-services.json`

3. **Enable Services**
   - Enable Email/Password authentication
   - Enable Firestore Database
   - Enable Realtime Database
   - Enable Storage
   - Configure Cloud Messaging

4. **Build the App**
   ```bash
   flutter pub get
   flutter build apk --debug
   ```

## 📱 Features

### Authentication
- 📧 Email/Password
- 📱 Phone OTP
- 🔵 Google Sign-In
- 🟢 Microsoft
- 📘 Facebook
- 👆 Biometric (Fingerprint/Face)
- 🔐 2FA Support

### Family Management
- 👨‍👩‍👧‍👦 Create Family
- 📩 Invite Members (QR Code, Link)
- 🔄 Transfer Ownership
- 👤 Parent / Child / Guardian Roles

### Child Management
- 📋 Add/Remove Children
- 🏫 School Information
- 🏥 Medical Information
- 📞 Emergency Contacts
- 🎂 Birthday & Photo

### Location & Safety
- 📍 Real-time Location Tracking
- 🗺️ Location History & Timeline
- 🏠 Geofencing (Home, School Zones)
- 🔋 Battery Status Alerts
- 📴 Offline Device Alerts

### Screen Time Control
- ⏰ Daily/Weekly Limits
- 📚 Study Mode
- 😴 Sleep Mode
- 🎮 Gaming Mode
- 📊 Usage Reports

### App Management
- 📲 Installed Apps List
- 🚫 Block/Allow Apps
- ✅ Approve Install Requests
- 🛒 Approve Purchases
- ⏸️ Pause/Resume Device

### Remote Support
- 📱 Remote Screen Share (with approval)
- 🆘 Remote Assistance (with approval)
- 🖥️ Device Info Access

### Communication
- 📞 Voice Calls (WebRTC)
- 📹 Video Calls
- 💬 Real-time Chat (Text, Media, Voice Notes)
- 🔔 Push Notifications
- 🆘 SOS Emergency Alerts

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Flutter 3.x |
| Language | Dart |
| Backend | Firebase |
| State Management | Riverpod |
| Navigation | GoRouter |
| Architecture | Clean Architecture + MVVM |
| Security | AES-256, JWT, Secure Storage |

## 📁 Project Structure

```
lib/
├── core/                    # Core utilities
│   ├── constants/           # App constants
│   ├── theme/              # Material Design 3 theme
│   ├── network/            # API client
│   └── security/           # Encryption, secure storage
├── data/                   # Data layer
│   ├── datasources/        # Remote & local data sources
│   └── repositories/       # Repository implementations
├── domain/                  # Domain layer
│   ├── entities/           # Business entities
│   └── repositories/       # Repository interfaces
└── presentation/           # UI layer
    ├── pages/              # All app pages
    ├── providers/          # Riverpod providers
    └── router/             # GoRouter navigation
```

## 🔧 Build Instructions

### Debug Build
```bash
flutter pub get
flutter build apk --debug
```

### Release Build
```bash
flutter build apk --release
```

## 📋 Troubleshooting

### App Crashes on Launch
- **Cause**: Missing Firebase configuration
- **Solution**: Add `google-services.json` to `android/app/`

### Authentication Not Working
- Enable Email/Password in Firebase Console
- Add SHA-1 fingerprint for Google Sign-In

### Location Not Working
- Grant location permissions
- Enable location services on device

### Push Notifications Not Working
- Configure Cloud Messaging in Firebase
- Check device internet connection

## 📄 License

This project is licensed under the MIT License.

## 👥 Contact

For issues and feature requests, please open an issue on GitHub.
