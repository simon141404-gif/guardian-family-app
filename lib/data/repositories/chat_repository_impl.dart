import '../../domain/entities/chat_entity.dart';
import '../../domain/repositories/chat_repository.dart';
import '../datasources/remote/chat_remote_datasource.dart';

class ChatRepositoryImpl implements ChatRepository {
  final ChatRemoteDatasource _chatRemoteDatasource;
  ChatRepositoryImpl({required ChatRemoteDatasource chatRemoteDatasource}) : _chatRemoteDatasource = chatRemoteDatasource;

  @override
  Future<ChatEntity> createChat(ChatType type, List<String> participants) async {
    final result = await _chatRemoteDatasource.createChat(type.name, participants);
    return ChatEntity(id: result['id'], type: type, participants: participants, createdAt: DateTime.now());
  }

  @override
  Future<ChatEntity?> getChat(String chatId) => Future.value(null);

  @override
  Future<List<ChatEntity>> getUserChats() => Future.value([]);

  @override
  Future<void> deleteChat(String chatId) => Future.value();

  @override
  Future<void> updateChat(ChatEntity chat) => Future.value();

  @override
  Stream<List<ChatEntity>> chatsStream() => _chatRemoteDatasource.chatsStream().map((docs) => docs.map((d) => ChatEntity(id: d['id'], type: ChatType.values.byName(d['type'] ?? 'individual'), participants: List<String>.from(d['participants'] ?? []), createdAt: DateTime.now())).toList());

  @override
  Stream<List<MessageEntity>> messagesStream(String chatId) => _chatRemoteDatasource.messagesStream(chatId).map((docs) => docs.map((d) => MessageEntity(id: d['id'] ?? '', chatId: chatId, senderId: d['senderId'] ?? '', senderName: d['senderName'] ?? '', content: d['content'] ?? '', timestamp: DateTime.now())).toList());

  @override
  Future<MessageEntity> sendMessage(String chatId, MessageEntity message) async {
    final result = await _chatRemoteDatasource.sendMessage(chatId, {'senderId': message.senderId, 'senderName': message.senderName, 'content': message.content, 'type': message.type});
    return MessageEntity(id: result['id'], chatId: chatId, senderId: message.senderId, senderName: message.senderName, content: message.content, timestamp: DateTime.now());
  }

  @override
  Future<void> deleteMessage(String chatId, String messageId) => Future.value();

  @override
  Future<void> markAsRead(String chatId, String messageId) => Future.value();

  @override
  Future<void> addReaction(String chatId, String messageId, MessageReaction reaction) => Future.value();

  @override
  Future<void> removeReaction(String chatId, String messageId, String userId) => Future.value();

  @override
  Future<void> setTyping(String chatId, String userId, bool isTyping) => Future.value();

  @override
  Stream<Map<String, bool>> typingStream(String chatId) => Stream.value({});
}
