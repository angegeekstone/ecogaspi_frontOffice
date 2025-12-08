import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../constants/app_colors.dart';
import '../../widgets/smart_text.dart';

class ChatDetailScreen extends ConsumerStatefulWidget {
  final Map<String, dynamic> chatInfo;

  const ChatDetailScreen({
    super.key,
    required this.chatInfo,
  });

  @override
  ConsumerState<ChatDetailScreen> createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends ConsumerState<ChatDetailScreen> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: _buildAppBar(),
      body: Column(
        children: [
          // Info sur la négociation si applicable
          if (widget.chatInfo['negotiationStatus'] != null)
            _buildNegotiationHeader(),

          // Messages
          Expanded(
            child: _buildMessagesList(),
          ),

          // Barre de saisie
          _buildMessageInput(),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 1,
      leading: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
      ),
      title: Row(
        children: [
          Stack(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: AppColors.primaryColor.withValues(alpha: 0.1),
                child: Text(
                  widget.chatInfo['contactName'][0],
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primaryColor,
                  ),
                ),
              ),
              if (widget.chatInfo['isOnline'])
                Positioned(
                  right: 0,
                  bottom: 0,
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: const Color(0xFF4CAF50),
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                widget.chatInfo['contactName'].toString().toDynamicText(
                  sourceLanguage: 'fr',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                widget.chatInfo['businessInfo'].toString().toDynamicText(
                  sourceLanguage: 'fr',
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      actions: [
        IconButton(
          onPressed: () {
            // Appel téléphonique
          },
          icon: const Icon(Icons.call, color: AppColors.primaryColor),
        ),
        IconButton(
          onPressed: () {
            // Plus d'options
            _showMoreOptions();
          },
          icon: const Icon(Icons.more_vert, color: AppColors.textSecondary),
        ),
      ],
    );
  }

  Widget _buildNegotiationHeader() {
    final status = widget.chatInfo['negotiationStatus'];
    Color statusColor;
    String statusKey;

    switch (status) {
      case 'Offre':
        statusColor = const Color(0xFF2196F3);
        statusKey = 'offer';
        break;
      case 'Négoc.':
        statusColor = const Color(0xFFFF8F00);
        statusKey = 'negotiation';
        break;
      case 'Accord':
        statusColor = const Color(0xFF4CAF50);
        statusKey = 'agreement';
        break;
      default:
        statusColor = AppColors.textSecondary;
        statusKey = 'unknown';
    }

    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: statusColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: statusColor.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: statusColor.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              _getNegotiationIcon(status),
              color: statusColor,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    statusKey.toStaticText(
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: statusColor,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: statusColor.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: 'inProgress'.toStaticText(
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: statusColor,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                'negotiationDescription'.toStaticText(
                  style: TextStyle(
                    fontSize: 12,
                    color: statusColor.withValues(alpha: 0.8),
                  ),
                ),
              ],
            ),
          ),
          TextButton(
            onPressed: () {
              _showNegotiationDetails();
            },
            child: 'details'.toStaticText(
              style: TextStyle(
                color: statusColor,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessagesList() {
    return ListView.builder(
      controller: _scrollController,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      itemCount: _mockMessages.length,
      itemBuilder: (context, index) {
        final message = _mockMessages[index];
        return _buildMessageBubble(message);
      },
    );
  }

  Widget _buildMessageBubble(Map<String, dynamic> message) {
    final isMe = message['isMe'] as bool;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (!isMe) ...[
            CircleAvatar(
              radius: 16,
              backgroundColor: AppColors.primaryColor.withValues(alpha: 0.1),
              child: Text(
                widget.chatInfo['contactName'][0],
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryColor,
                ),
              ),
            ),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              constraints: BoxConstraints(
                maxWidth: MediaQuery.of(context).size.width * 0.75,
              ),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isMe
                    ? AppColors.primaryColor
                    : Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(12),
                  topRight: const Radius.circular(12),
                  bottomLeft: Radius.circular(isMe ? 12 : 4),
                  bottomRight: Radius.circular(isMe ? 4 : 12),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: _buildMessageContent(message, isMe),
            ),
          ),
          if (!isMe) ...[
            const SizedBox(width: 8),
            Text(
              message['time'],
              style: const TextStyle(
                fontSize: 10,
                color: AppColors.textSecondary,
              ),
            ),
          ] else ...[
            const SizedBox(width: 8),
            Column(
              children: [
                Text(
                  message['time'],
                  style: const TextStyle(
                    fontSize: 10,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 2),
                Icon(
                  message['isDelivered'] ? Icons.done_all : Icons.done,
                  size: 14,
                  color: message['isRead']
                      ? AppColors.primaryColor
                      : AppColors.textSecondary,
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildMessageContent(Map<String, dynamic> message, bool isMe) {
    switch (message['type']) {
      case 'text':
        return message['content'].toString().toDynamicText(
          sourceLanguage: 'fr',
          style: TextStyle(
            color: isMe ? Colors.white : AppColors.textPrimary,
            fontSize: 14,
          ),
        );

      case 'product_offer':
        return _buildProductOfferMessage(message, isMe);

      case 'negotiation':
        return _buildNegotiationMessage(message, isMe);

      case 'system':
        return message['content'].toString().toDynamicText(
          sourceLanguage: 'fr',
          style: TextStyle(
            color: isMe ? Colors.white70 : AppColors.textSecondary,
            fontSize: 13,
            fontStyle: FontStyle.italic,
          ),
        );

      default:
        return message['content'].toString().toDynamicText(
          sourceLanguage: 'fr',
          style: TextStyle(
            color: isMe ? Colors.white : AppColors.textPrimary,
            fontSize: 14,
          ),
        );
    }
  }

  Widget _buildProductOfferMessage(Map<String, dynamic> message, bool isMe) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: (isMe ? Colors.white : AppColors.primaryColor).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                Icons.inventory_2,
                color: isMe ? Colors.white : AppColors.primaryColor,
                size: 20,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  message['productName'].toString().toDynamicText(
                    sourceLanguage: 'fr',
                    style: TextStyle(
                      color: isMe ? Colors.white : AppColors.textPrimary,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  message['productDescription'].toString().toDynamicText(
                    sourceLanguage: 'fr',
                    style: TextStyle(
                      color: isMe ? Colors.white70 : AppColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: (isMe ? Colors.white : AppColors.primaryColor).withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  'price'.toStaticText(
                    style: TextStyle(
                      color: isMe ? Colors.white70 : AppColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                  Text(
                    '${message['price']} FCFA',
                    style: TextStyle(
                      color: isMe ? Colors.white : AppColors.textPrimary,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  'quantity'.toStaticText(
                    style: TextStyle(
                      color: isMe ? Colors.white70 : AppColors.textSecondary,
                      fontSize: 12,
                    ),
                  ),
                  Text(
                    message['quantity'],
                    style: TextStyle(
                      color: isMe ? Colors.white : AppColors.textPrimary,
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildNegotiationMessage(Map<String, dynamic> message, bool isMe) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: const Color(0xFFFF8F00).withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: const Color(0xFFFF8F00).withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.handshake,
                color: const Color(0xFFFF8F00),
                size: 16,
              ),
              const SizedBox(width: 6),
              'counterOffer'.toStaticText(
                style: const TextStyle(
                  color: Color(0xFFFF8F00),
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          message['content'].toString().toDynamicText(
            sourceLanguage: 'fr',
            style: TextStyle(
              color: isMe ? Colors.white : AppColors.textPrimary,
              fontSize: 14,
            ),
          ),
          if (message['newPrice'] != null) ...[
            const SizedBox(height: 8),
            Row(
              children: [
                'newPrice'.toStaticText(
                  style: const TextStyle(
                    color: Color(0xFFFF8F00),
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(width: 4),
                Text(
                  '${message['newPrice']} FCFA',
                  style: const TextStyle(
                    color: Color(0xFFFF8F00),
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildMessageInput() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        children: [
          IconButton(
            onPressed: () {
              _showAttachmentOptions();
            },
            icon: const Icon(
              Icons.add,
              color: AppColors.primaryColor,
            ),
          ),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.surfaceColor,
                borderRadius: BorderRadius.circular(24),
              ),
              child: TextField(
                controller: _messageController,
                decoration: InputDecoration(
                  hintText: 'typeMessage'.tr(),
                  hintStyle: const TextStyle(
                    color: AppColors.textSecondary,
                    fontSize: 14,
                  ),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
                maxLines: null,
                textCapitalization: TextCapitalization.sentences,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Container(
            decoration: const BoxDecoration(
              color: AppColors.primaryColor,
              shape: BoxShape.circle,
            ),
            child: IconButton(
              onPressed: () {
                _sendMessage();
              },
              icon: const Icon(
                Icons.send,
                color: Colors.white,
                size: 20,
              ),
            ),
          ),
        ],
      ),
    );
  }

  IconData _getNegotiationIcon(String status) {
    switch (status) {
      case 'Offre':
        return Icons.local_offer;
      case 'Négoc.':
        return Icons.handshake;
      case 'Accord':
        return Icons.check_circle;
      default:
        return Icons.info_outline;
    }
  }

  void _showMoreOptions() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.person, color: AppColors.primaryColor),
              title: 'viewProfile'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Voir le profil
              },
            ),
            ListTile(
              leading: const Icon(Icons.block, color: AppColors.errorColor),
              title: 'blockUser'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Bloquer l'utilisateur
              },
            ),
            ListTile(
              leading: const Icon(Icons.report, color: AppColors.errorColor),
              title: 'reportUser'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Signaler l'utilisateur
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showNegotiationDetails() {
    // Afficher les détails de la négociation
  }

  void _showAttachmentOptions() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt, color: AppColors.primaryColor),
              title: 'takePhoto'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Prendre une photo
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library, color: AppColors.primaryColor),
              title: 'selectFromGallery'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Sélectionner depuis la galerie
              },
            ),
            ListTile(
              leading: const Icon(Icons.inventory_2, color: AppColors.primaryColor),
              title: 'shareProduct'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Partager un produit
              },
            ),
            ListTile(
              leading: const Icon(Icons.attach_money, color: AppColors.primaryColor),
              title: 'makeOffer'.toStaticText(),
              onTap: () {
                Navigator.pop(context);
                // Faire une offre
              },
            ),
          ],
        ),
      ),
    );
  }

  void _sendMessage() {
    final text = _messageController.text.trim();
    if (text.isNotEmpty) {
      // Logique d'envoi du message
      _messageController.clear();
    }
  }

  // Messages de démonstration
  final List<Map<String, dynamic>> _mockMessages = [
    {
      'type': 'system',
      'content': 'Conversation démarrée',
      'time': '14:00',
      'isMe': false,
    },
    {
      'type': 'text',
      'content': 'Bonjour ! Je suis intéressé par votre lot de yaourts.',
      'time': '14:05',
      'isMe': false,
      'isDelivered': true,
      'isRead': true,
    },
    {
      'type': 'product_offer',
      'content': '',
      'productName': 'Lot de yaourts Danone',
      'productDescription': '24 pots de yaourt aux fruits, DLC 3 jours',
      'price': '30000',
      'quantity': '24 pots',
      'time': '14:06',
      'isMe': true,
      'isDelivered': true,
      'isRead': true,
    },
    {
      'type': 'negotiation',
      'content': 'Votre prix me semble un peu élevé, pouvez-vous faire un geste ?',
      'newPrice': '25000',
      'time': '14:10',
      'isMe': false,
      'isDelivered': true,
      'isRead': true,
    },
    {
      'type': 'text',
      'content': 'Je peux descendre à 28,000 FCFA, c\'est mon dernier prix.',
      'time': '14:15',
      'isMe': true,
      'isDelivered': true,
      'isRead': false,
    },
    {
      'type': 'text',
      'content': 'D\'accord, je prends ! Comment procédons-nous pour la livraison ?',
      'time': '14:20',
      'isMe': false,
      'isDelivered': true,
      'isRead': true,
    },
    {
      'type': 'text',
      'content': 'Parfait ! Je peux vous livrer demain matin vers 9h. L\'adresse que vous avez indiquée est-elle correcte ?',
      'time': '14:25',
      'isMe': true,
      'isDelivered': false,
      'isRead': false,
    },
  ];
}