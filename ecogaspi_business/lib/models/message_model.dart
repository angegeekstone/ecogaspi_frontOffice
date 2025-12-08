enum MessageType { text, image, offer, system }

class Message {
  final String id;
  final String conversationId;
  final String senderId;
  final String receiverId;
  final String content;
  final MessageType type;
  final DateTime timestamp;
  final bool isRead;
  final String? imageUrl;
  final double? offerAmount;
  final String? productId;

  Message({
    required this.id,
    required this.conversationId,
    required this.senderId,
    required this.receiverId,
    required this.content,
    required this.type,
    required this.timestamp,
    this.isRead = false,
    this.imageUrl,
    this.offerAmount,
    this.productId,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'conversationId': conversationId,
      'senderId': senderId,
      'receiverId': receiverId,
      'content': content,
      'type': type.name,
      'timestamp': timestamp.toIso8601String(),
      'isRead': isRead,
      'imageUrl': imageUrl,
      'offerAmount': offerAmount,
      'productId': productId,
    };
  }

  factory Message.fromMap(Map<String, dynamic> map) {
    return Message(
      id: map['id'] ?? '',
      conversationId: map['conversationId'] ?? '',
      senderId: map['senderId'] ?? '',
      receiverId: map['receiverId'] ?? '',
      content: map['content'] ?? '',
      type: MessageType.values.firstWhere(
        (e) => e.name == map['type'],
        orElse: () => MessageType.text,
      ),
      timestamp: DateTime.parse(map['timestamp']),
      isRead: map['isRead'] ?? false,
      imageUrl: map['imageUrl'],
      offerAmount: map['offerAmount']?.toDouble(),
      productId: map['productId'],
    );
  }

  Message copyWith({
    String? id,
    String? conversationId,
    String? senderId,
    String? receiverId,
    String? content,
    MessageType? type,
    DateTime? timestamp,
    bool? isRead,
    String? imageUrl,
    double? offerAmount,
    String? productId,
  }) {
    return Message(
      id: id ?? this.id,
      conversationId: conversationId ?? this.conversationId,
      senderId: senderId ?? this.senderId,
      receiverId: receiverId ?? this.receiverId,
      content: content ?? this.content,
      type: type ?? this.type,
      timestamp: timestamp ?? this.timestamp,
      isRead: isRead ?? this.isRead,
      imageUrl: imageUrl ?? this.imageUrl,
      offerAmount: offerAmount ?? this.offerAmount,
      productId: productId ?? this.productId,
    );
  }

  bool get isOffer => type == MessageType.offer && offerAmount != null;

  String get formattedTime {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inDays > 0) {
      return '${difference.inDays}j';
    } else if (difference.inHours > 0) {
      return '${difference.inHours}h';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes}min';
    } else {
      return 'maintenant';
    }
  }
}

class Conversation {
  final String id;
  final List<String> participantIds;
  final String? productId;
  final Message? lastMessage;
  final DateTime createdAt;
  final DateTime updatedAt;
  final int unreadCount;

  Conversation({
    required this.id,
    required this.participantIds,
    this.productId,
    this.lastMessage,
    required this.createdAt,
    required this.updatedAt,
    this.unreadCount = 0,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'participantIds': participantIds,
      'productId': productId,
      'lastMessage': lastMessage?.toMap(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'unreadCount': unreadCount,
    };
  }

  factory Conversation.fromMap(Map<String, dynamic> map) {
    return Conversation(
      id: map['id'] ?? '',
      participantIds: List<String>.from(map['participantIds'] ?? []),
      productId: map['productId'],
      lastMessage: map['lastMessage'] != null
          ? Message.fromMap(map['lastMessage'])
          : null,
      createdAt: DateTime.parse(map['createdAt']),
      updatedAt: DateTime.parse(map['updatedAt']),
      unreadCount: map['unreadCount'] ?? 0,
    );
  }

  Conversation copyWith({
    String? id,
    List<String>? participantIds,
    String? productId,
    Message? lastMessage,
    DateTime? createdAt,
    DateTime? updatedAt,
    int? unreadCount,
  }) {
    return Conversation(
      id: id ?? this.id,
      participantIds: participantIds ?? this.participantIds,
      productId: productId ?? this.productId,
      lastMessage: lastMessage ?? this.lastMessage,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      unreadCount: unreadCount ?? this.unreadCount,
    );
  }
}