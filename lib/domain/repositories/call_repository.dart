import '../entities/call_entity.dart';

abstract class CallRepository {
  Future<CallEntity> initiateCall(CallType type, List<String> participants);
  Future<CallEntity?> getCall(String callId);
  Future<void> answerCall(String callId);
  Future<void> rejectCall(String callId);
  Future<void> endCall(String callId);
  Future<void> joinCall(String callId);
  Future<void> leaveCall(String callId);
  Future<void> toggleMute(String callId, String userId);
  Future<void> toggleVideo(String callId, String userId);
  Future<void> toggleScreenShare(String callId, String userId);
  Stream<CallEntity?> callStream(String callId);
  Stream<List<CallEntity>> activeCallsStream();
  Future<List<CallEntity>> getCallHistory();
}
