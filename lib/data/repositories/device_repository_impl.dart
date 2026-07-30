import '../../domain/entities/child_entity.dart';
import '../../domain/repositories/device_repository.dart';
import '../datasources/remote/device_remote_datasource.dart';

class DeviceRepositoryImpl implements DeviceRepository {
  final DeviceRemoteDatasource _deviceRemoteDatasource;
  DeviceRepositoryImpl({required DeviceRemoteDatasource deviceRemoteDatasource}) : _deviceRemoteDatasource = deviceRemoteDatasource;

  @override
  Future<DeviceInfo> getDeviceInfo(String childId) async {
    final data = await _deviceRemoteDatasource.getDeviceInfo(childId);
    return DeviceInfo(deviceModel: data['deviceModel'] ?? '', batteryLevel: data['batteryLevel'], isCharging: data['isCharging'] ?? false);
  }

  @override
  Future<DeviceInfo> getCurrentDeviceInfo() async => DeviceInfo(deviceModel: 'Unknown');

  @override
  Future<int> getBatteryLevel(String childId) async {
    final info = await getDeviceInfo(childId);
    return info.batteryLevel ?? 0;
  }

  @override
  Future<bool> isCharging(String childId) async {
    final info = await getDeviceInfo(childId);
    return info.isCharging;
  }

  @override
  Future<double> getRamUsage(String childId) async => 0;

  @override
  Future<double> getStorageUsage(String childId) async => 0;

  @override
  Future<List<Map<String, dynamic>>> getInstalledApps(String childId) async => [];

  @override
  Future<void> blockApp(String childId, String packageName) => Future.value();

  @override
  Future<void> unblockApp(String childId, String packageName) => Future.value();

  @override
  Future<void> allowApp(String childId, String packageName) => Future.value();

  @override
  Future<void> startScreenShare(String childId) => _deviceRemoteDatasource.startScreenShare(childId);

  @override
  Future<void> stopScreenShare(String childId) => _deviceRemoteDatasource.stopScreenShare(childId);

  @override
  Future<void> startRemoteControl(String childId) => Future.value();

  @override
  Future<void> stopRemoteControl(String childId) => Future.value();

  @override
  Future<void> sendScreenshotRequest(String childId) => Future.value();

  @override
  Stream<Map<String, dynamic>> screenShareStream(String childId) => _deviceRemoteDatasource.screenShareStream(childId);
}
