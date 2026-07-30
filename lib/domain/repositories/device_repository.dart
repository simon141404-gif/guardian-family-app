import '../entities/child_entity.dart';

abstract class DeviceRepository {
  Future<DeviceInfo> getDeviceInfo(String childId);
  Future<DeviceInfo> getCurrentDeviceInfo();
  Future<int> getBatteryLevel(String childId);
  Future<bool> isCharging(String childId);
  Future<double> getRamUsage(String childId);
  Future<double> getStorageUsage(String childId);
  Future<List<Map<String, dynamic>>> getInstalledApps(String childId);
  Future<void> blockApp(String childId, String packageName);
  Future<void> unblockApp(String childId, String packageName);
  Future<void> allowApp(String childId, String packageName);
  Future<void> startScreenShare(String childId);
  Future<void> stopScreenShare(String childId);
  Future<void> startRemoteControl(String childId);
  Future<void> stopRemoteControl(String childId);
  Future<void> sendScreenshotRequest(String childId);
  Stream<Map<String, dynamic>> screenShareStream(String childId);
}
