import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../constants/app_colors.dart';
import '../../widgets/smart_text.dart';
import 'chat_detail_screen.dart';

class ChatListScreen extends ConsumerWidget {
  ChatListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        title: Text(
          'messages'.tr(),
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.search,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Stats rapides
          Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppColors.primaryColor,
                  AppColors.primaryColor.withValues(alpha: 0.8),
                ],
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      'activeConversations'.toStaticText(
                        args: ['7'],
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      'negotiationsInProgress'.toStaticText(
                        args: ['3'],
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(
                    Icons.chat_bubble_outline,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),

          // Liste des conversations
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _mockChats.length,
              itemBuilder: (context, index) {
                final chat = _mockChats[index];
                return _buildChatItem(context, chat);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChatItem(BuildContext context, Map<String, dynamic> chat) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: chat['hasNewMessages']
            ? Border.all(color: AppColors.primaryColor.withValues(alpha: 0.3))
            : null,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ChatDetailScreen(chatInfo: chat),
            ),
          );
        },
        child: Row(
          children: [
            Stack(
              children: [
                CircleAvatar(
                  radius: 28,
                  backgroundColor: AppColors.primaryColor.withValues(alpha: 0.1),
                  child: Text(
                    chat['contactName'][0],
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primaryColor,
                    ),
                  ),
                ),
                if (chat['isOnline'])
                  Positioned(
                    right: 2,
                    bottom: 2,
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
                  Row(
                    children: [
                      Expanded(
                        child: chat['contactName'].toString().toDynamicText(
                          sourceLanguage: 'fr',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: chat['hasNewMessages']
                                ? FontWeight.bold
                                : FontWeight.w600,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ),
                      if (chat['negotiationStatus'] != null)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: _getNegotiationColor(chat['negotiationStatus']).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: _getTranslatedNegotiationStatus(chat['negotiationStatus']).toStaticText(
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: _getNegotiationColor(chat['negotiationStatus']),
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 2),
                  chat['businessInfo'].toString().toDynamicText(
                    sourceLanguage: 'fr',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      if (chat['isTyping'])
                        Text(
                          'typing'.tr(),
                          style: const TextStyle(
                            fontSize: 14,
                            color: AppColors.primaryColor,
                            fontStyle: FontStyle.italic,
                          ),
                        )
                      else
                        Expanded(
                          child: chat['lastMessage'].toString().toDynamicText(
                            sourceLanguage: 'fr',
                            style: TextStyle(
                              fontSize: 14,
                              color: chat['hasNewMessages']
                                  ? AppColors.textPrimary
                                  : AppColors.textSecondary,
                              fontWeight: chat['hasNewMessages']
                                  ? FontWeight.w500
                                  : FontWeight.normal,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      const SizedBox(width: 8),
                      Text(
                        chat['time'],
                        style: TextStyle(
                          fontSize: 12,
                          color: chat['hasNewMessages']
                              ? AppColors.primaryColor
                              : AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            Column(
              children: [
                if (chat['hasNewMessages'])
                  Container(
                    width: 20,
                    height: 20,
                    decoration: const BoxDecoration(
                      color: AppColors.primaryColor,
                      shape: BoxShape.circle,
                    ),
                    child: Center(
                      child: Text(
                        chat['unreadCount'].toString(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                const SizedBox(height: 8),
                Icon(
                  Icons.chevron_right,
                  color: AppColors.textSecondary.withValues(alpha: 0.5),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _getTranslatedNegotiationStatus(String status) {
    switch (status) {
      case 'Offre':
        return 'offer';
      case 'Négoc.':
        return 'negotiation';
      case 'Accord':
        return 'agreement';
      default:
        return 'unknown';
    }
  }

  Color _getNegotiationColor(String status) {
    switch (status) {
      case 'Offre':
        return const Color(0xFF2196F3);
      case 'Négoc.':
        return const Color(0xFFFF8F00);
      case 'Accord':
        return const Color(0xFF4CAF50);
      default:
        return AppColors.textSecondary;
    }
  }

  final List<Map<String, dynamic>> _mockChats = [
    {
      'contactName': 'Marie Supermarché',
      'businessInfo': 'Épicerie - Douala Centre',
      'lastMessage': 'Parfait pour 35,000 FCFA le lot',
      'time': '14:30',
      'hasNewMessages': true,
      'unreadCount': 2,
      'isOnline': true,
      'isTyping': false,
      'negotiationStatus': 'Accord',
    },
    {
      'contactName': 'Boutique Centrale',
      'businessInfo': 'Dépôt alimentaire - Yaoundé',
      'lastMessage': 'Je peux faire 28,000 maximum',
      'time': '13:15',
      'hasNewMessages': true,
      'unreadCount': 1,
      'isOnline': true,
      'isTyping': true,
      'negotiationStatus': 'Négoc.',
    },
    {
      'contactName': 'Grossiste Nord',
      'businessInfo': 'Grossiste - Garoua',
      'lastMessage': 'Photos reçues, intéressé par le lot',
      'time': '11:45',
      'hasNewMessages': false,
      'unreadCount': 0,
      'isOnline': false,
      'isTyping': false,
      'negotiationStatus': 'Offre',
    },
    {
      'contactName': 'Épicerie du Coin',
      'businessInfo': 'Boutique - Douala Bassa',
      'lastMessage': 'Merci, commande livrée ✅',
      'time': 'Hier',
      'hasNewMessages': false,
      'unreadCount': 0,
      'isOnline': false,
      'isTyping': false,
      'negotiationStatus': null,
    },
  ];
}