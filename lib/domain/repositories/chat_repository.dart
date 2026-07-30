import '../entities/chat_entity.dart';

abstract class ChatRepository {
  Future<ChatEntity> createChat(ChatType type, List<String> participants);
  Future<ChatEntity?> getChat(String chatId);
  Future<List<ChatEntity>> getUserChats();
  Future<void> deleteChat(String chatId);
  Future<void> updateChat(ChatEntity chat);
  Stream<List<ChatEntity>> chatsStream();
  Stream<List<MessageEntity>> messagesStream(String chatId);
  Future<MessageEntity> sendMessage(String chatId, MessageEntity message);
  Future<void> deleteMessage(String chatId, String messageId);
  Future<void> markAsRead(String chatId, String messageId);
  Future<void> addReaction(String chatId, String messageId, MessageReaction reaction);
  Future<void> removeReaction(String chatId, String messageId, String userId);
  Future<void> setTyping(String chatId, String userId, bool isTyping);
  Stream<Map<String, bool>> typingStream(String chatId);
}
