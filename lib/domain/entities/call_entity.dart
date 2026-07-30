enum CallType { voice, video }
enum CallStatus { initiated, ringing, active, ended, missed, rejected }

class CallEntity {
  final String id;
  final CallType type;
  final CallStatus status;
  final String initiatorId;
  final String initiatorName;
  final List<CallParticipant> participants;
  final List<String> invitedUsers;
  final DateTime? startTime;
  final DateTime? endTime;
  final int? duration;
  final DateTime createdAt;

  CallEntity({
    required this.id,
    required this.type,
    required this.status,
    required this.initiatorId,
    required this.initiatorName,
    this.participants = const [],
    this.invitedUsers = const [],
    this.startTime,
    this.endTime,
    this.duration,
    required this.createdAt,
  });

  factory CallEntity.fromJson(Map<String, dynamic> json) => CallEntity(
    id: json['id'] ?? '',
    type: CallType.values.byName(json['type'] ?? 'voice'),
    status: CallStatus.values.byName(json['status'] ?? 'initiated'),
    initiatorId: json['initiatorId'] ?? '',
    initiatorName: json['initiatorName'] ?? '',
    createdAt: json['createdAt']?.toDate() ?? DateTime.now(),
  );
}

class CallParticipant {
  final String userId;
  final String displayName;
  final String? photoUrl;
  final bool isMuted;
  final bool isVideoEnabled;
  final bool isScreenSharing;
  final DateTime? joinedAt;
  final DateTime? leftAt;

  CallParticipant({
    required this.userId,
    required this.displayName,
    this.photoUrl,
    this.isMuted = false,
    this.isVideoEnabled = false,
    this.isScreenSharing = false,
    this.joinedAt,
    this.leftAt,
  });
}
