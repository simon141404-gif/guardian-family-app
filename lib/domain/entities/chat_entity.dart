enum ChatType { individual, group, family }

class ChatEntity {
  final String id;
  final ChatType type;
  final List<String> participants;
  final List<String> participantNames;
  final String? lastMessage;
  final DateTime? lastMessageTime;
  final int unreadCount;
  final ChatMetadata? metadata;
  final DateTime createdAt;
  final DateTime? updatedAt;

  ChatEntity({
    required this.id,
    required this.type,
    this.participants = const [],
    this.participantNames = const [],
    this.lastMessage,
    this.lastMessageTime,
    this.unreadCount = 0,
    this.metadata,
    required this.createdAt,
    this.updatedAt,
  });

  factory ChatEntity.fromJson(Map<String, dynamic> json) => ChatEntity(
    id: json['id'] ?? '',
    type: ChatType.values.byName(json['type'] ?? 'individual'),
    participants: List<String>.from(json['participants'] ?? []),
    participantNames: List<String>.from(json['participantNames'] ?? []),
    lastMessage: json['lastMessage'],
    lastMessageTime: json['lastMessageTime']?.toDate(),
    unreadCount: json['unreadCount'] ?? 0,
    createdAt: json['createdAt']?.toDate() ?? DateTime.now(),
    updatedAt: json['updatedAt']?.toDate(),
  );
}

class ChatMetadata {
  final String? groupName;
  final String? groupPhoto;
  final String? familyId;

  ChatMetadata({this.groupName, this.groupPhoto, this.familyId});
}

class MessageEntity {
  final String id;
  final String chatId;
  final String senderId;
  final String senderName;
  final String? senderPhoto;
  final String content;
  final String type;
  final String? mediaUrl;
  final String? thumbnailUrl;
  final int? mediaDuration;
  final String? fileName;
  final int? fileSize;
  final bool isRead;
  final List<String> readBy;
  final List<MessageReaction> reactions;
  final DateTime? editedAt;
  final bool? isDeleted;
  final DateTime timestamp;

  MessageEntity({
    required this.id,
    required this.chatId,
    required this.senderId,
    required this.senderName,
    this.senderPhoto,
    required this.content,
    this.type = 'text',
    this.mediaUrl,
    this.thumbnailUrl,
    this.mediaDuration,
    this.fileName,
    this.fileSize,
    this.isRead = false,
    this.readBy = const [],
    this.reactions = const [],
    this.editedAt,
    this.isDeleted,
    required this.timestamp,
  });

  factory MessageEntity.fromJson(Map<String, dynamic> json) => MessageEntity(
    id: json['id'] ?? '',
    chatId: json['chatId'] ?? '',
    senderId: json['senderId'] ?? '',
    senderName: json['senderName'] ?? '',
    senderPhoto: json['senderPhoto'],
    content: json['content'] ?? '',
    type: json['type'] ?? 'text',
    mediaUrl: json['mediaUrl'],
    timestamp: json['timestamp']?.toDate() ?? DateTime.now(),
    isRead: json['isRead'] ?? false,
    readBy: List<String>.from(json['readBy'] ?? []),
  );
}

class MessageReaction {
  final String userId;
  final String emoji;
  final DateTime timestamp;

  MessageReaction({
    required this.userId,
    required this.emoji,
    required this.timestamp,
  });
}
