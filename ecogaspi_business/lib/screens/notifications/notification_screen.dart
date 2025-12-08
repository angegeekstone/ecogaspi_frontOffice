import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../constants/app_colors.dart';
import '../../widgets/smart_text.dart';

class NotificationScreen extends ConsumerStatefulWidget {
  const NotificationScreen({super.key});

  @override
  ConsumerState<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends ConsumerState<NotificationScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        title: Text(
          'notifications'.tr(),
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: () {
              // Marquer toutes comme lues
            },
            child: Text(
              'markAllAsRead'.tr(),
              style: const TextStyle(
                color: AppColors.primaryColor,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primaryColor,
          labelColor: AppColors.primaryColor,
          unselectedLabelColor: AppColors.textSecondary,
          labelStyle: const TextStyle(fontWeight: FontWeight.w600),
          tabs: [
            Tab(text: 'alertsWithCount'.tr(args: ['5'])),
            Tab(text: 'messagesWithCount'.tr(args: ['3'])),
            Tab(text: 'activityWithCount'.tr(args: ['8'])),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildAlerts(),
          _buildMessages(),
          _buildActivity(),
        ],
      ),
    );
  }

  Widget _buildAlerts() {
    final alerts = [
      {
        'type': 'expiration',
        'title': 'Produits bientôt expirés',
        'message': '3 produits expirent dans moins de 2 jours',
        'time': 'Il y a 10 min',
        'urgent': true,
        'products': ['Yaourts Danone', 'Pain de mie', 'Fromage blanc'],
      },
      {
        'type': 'slow_rotation',
        'title': 'Rotation lente détectée',
        'message': 'Lot de biscuits LU - seulement 2 vues en 48h',
        'time': 'Il y a 2h',
        'urgent': false,
        'suggestion': 'Réduire le prix de 15%',
      },
      {
        'type': 'stock_boost',
        'title': 'Suggestion de boost',
        'message': 'Votre huile de palme pourrait avoir plus de visibilité',
        'time': 'Il y a 4h',
        'urgent': false,
        'suggestion': 'Booster pour 2,000 FCFA',
      },
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: alerts.length,
      itemBuilder: (context, index) {
        final alert = alerts[index];
        return _buildAlertCard(alert);
      },
    );
  }

  Widget _buildAlertCard(Map<String, dynamic> alert) {
    IconData icon;
    Color color;

    switch (alert['type']) {
      case 'expiration':
        icon = Icons.warning_amber;
        color = AppColors.errorColor;
        break;
      case 'slow_rotation':
        icon = Icons.trending_down;
        color = const Color(0xFFFF8F00);
        break;
      case 'stock_boost':
        icon = Icons.rocket_launch;
        color = const Color(0xFF2196F3);
        break;
      default:
        icon = Icons.info_outline;
        color = AppColors.textSecondary;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: alert['urgent']
            ? Border.all(color: AppColors.errorColor.withValues(alpha: 0.3))
            : null,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  icon,
                  color: color,
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    alert['title'].toString().toDynamicText(
                      sourceLanguage: 'fr',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    Text(
                      alert['time'],
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              if (alert['urgent'])
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.errorColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    'urgent'.tr(),
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: AppColors.errorColor,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 12),
          alert['message'].toString().toDynamicText(
            sourceLanguage: 'fr',
            style: const TextStyle(
              color: AppColors.textPrimary,
            ),
          ),
          if (alert['products'] != null) ...[
            const SizedBox(height: 8),
            Wrap(
              spacing: 6,
              children: (alert['products'] as List<String>).map((product) {
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceColor,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: product.toDynamicText(
                    sourceLanguage: 'fr',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
          if (alert['suggestion'] != null) ...[
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(
                  Icons.lightbulb_outline,
                  size: 16,
                  color: AppColors.primaryColor,
                ),
                const SizedBox(width: 6),
                alert['suggestion'].toString().toDynamicText(
                  sourceLanguage: 'fr',
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppColors.primaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const Spacer(),
                TextButton(
                  onPressed: () {
                    // Appliquer la suggestion
                  },
                  child: Text(
                    'apply'.tr(),
                    style: const TextStyle(
                      color: AppColors.primaryColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildMessages() {
    return Center(
      child: 'messageNotifications'.toStaticText(
        style: const TextStyle(color: AppColors.textSecondary),
      ),
    );
  }

  Widget _buildActivity() {
    return Center(
      child: 'recentActivity'.toStaticText(
        style: const TextStyle(color: AppColors.textSecondary),
      ),
    );
  }
}