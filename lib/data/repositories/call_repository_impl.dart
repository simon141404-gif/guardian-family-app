import '../../domain/entities/call_entity.dart';
import '../../domain/repositories/call_repository.dart';
import '../datasources/remote/call_remote_datasource.dart';

class CallRepositoryImpl implements CallRepository {
  final CallRemoteDatasource _callRemoteDatasource;
  CallRepositoryImpl({required CallRemoteDatasource callRemoteDatasource}) : _callRemoteDatasource = callRemoteDatasource;

  @override
  Future<CallEntity> initiateCall(CallType type, List<String> participants) async {
    final result = await _callRemoteDatasource.initiateCall(type.name, participants.first, 'User', participants);
    return CallEntity(id: result['id'], type: type, status: CallStatus.initiated, initiatorId: participants.first, initiatorName: 'User', createdAt: DateTime.now());
  }

  @override
  Future<CallEntity?> getCall(String callId) => Future.value(null);

  @override
  Future<void> answerCall(String callId) => _callRemoteDatasource.updateCallStatus(callId, 'active');

  @override
  Future<void> rejectCall(String callId) => _callRemoteDatasource.updateCallStatus(callId, 'rejected');

  @override
  Future<void> endCall(String callId) => _callRemoteDatasource.updateCallStatus(callId, 'ended');

  @override
  Future<void> joinCall(String callId) => Future.value();

  @override
  Future<void> leaveCall(String callId) => Future.value();

  @override
  Future<void> toggleMute(String callId, String userId) => Future.value();

  @override
  Future<void> toggleVideo(String callId, String userId) => Future.value();

  @override
  Future<void> toggleScreenShare(String callId, String userId) => Future.value();

  @override
  Stream<CallEntity?> callStream(String callId) => _callRemoteDatasource.callStream(callId).map((data) {
    if (data == null) return null;
    return CallEntity(id: data['id'], type: CallType.values.byName(data['type'] ?? 'voice'), status: CallStatus.values.byName(data['status'] ?? 'initiated'), initiatorId: data['initiatorId'] ?? '', initiatorName: data['initiatorName'] ?? '', createdAt: DateTime.now());
  });

  @override
  Stream<List<CallEntity>> activeCallsStream() => Stream.value([]);

  @override
  Future<List<CallEntity>> getCallHistory() async {
    final data = await _callRemoteDatasource.getCallHistory();
    return data.map((d) => CallEntity(id: d['id'], type: CallType.values.byName(d['type'] ?? 'voice'), status: CallStatus.values.byName(d['status'] ?? 'ended'), initiatorId: d['initiatorId'] ?? '', initiatorName: d['initiatorName'] ?? '', createdAt: DateTime.now())).toList();
  }
}
