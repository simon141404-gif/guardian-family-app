import 'package:cloud_firestore/cloud_firestore.dart';

class ChatRemoteDatasource {
  final FirebaseFirestore _firestore;
  ChatRemoteDatasource(this._firestore);
  
  Future<Map<String, dynamic>> createChat(String type, List<String> participants) async {
    final docRef = _firestore.collection('chats').doc();
    final chatData = {'id': docRef.id, 'type': type, 'participants': participants, 'createdAt': FieldValue.serverTimestamp()};
    await docRef.set(chatData);
    return {'id': docRef.id, ...chatData};
  }
  
  Stream<List<Map<String, dynamic>>> chatsStream() {
    return _firestore.collection('chats').snapshots().map((snapshot) {
      return snapshot.docs.map((doc) {
        final data = doc.data();
        data['id'] = doc.id;
        return data;
      }).toList();
    });
  }
  
  Stream<List<Map<String, dynamic>>> messagesStream(String chatId) {
    return _firestore.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', descending: true).snapshots().map((snapshot) {
      return snapshot.docs.map((doc) {
        final data = doc.data();
        data['id'] = doc.id;
        return data;
      }).toList();
    });
  }
  
  Future<Map<String, dynamic>> sendMessage(String chatId, Map<String, dynamic> message) async {
    final docRef = _firestore.collection('chats').doc(chatId).collection('messages').doc();
    final messageData = {'id': docRef.id, ...message, 'timestamp': FieldValue.serverTimestamp()};
    await docRef.set(messageData);
    await _firestore.collection('chats').doc(chatId).update({'lastMessage': message['content'], 'lastMessageTime': FieldValue.serverTimestamp()});
    return messageData;
  }
}
