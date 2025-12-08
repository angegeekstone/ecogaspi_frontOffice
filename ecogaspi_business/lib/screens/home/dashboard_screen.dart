import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../constants/app_colors.dart';
import '../../widgets/stat_card.dart';
import '../../widgets/quick_action_card.dart';
import '../../widgets/smart_text.dart';
import '../products/add_product_screen.dart';
import '../marketplace/national_feed_screen.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  const CircleAvatar(
                    radius: 24,
                    backgroundColor: AppColors.primaryColor,
                    child: Icon(
                      Icons.store,
                      color: Colors.white,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        'hello'.toStaticText(
                          args: ['Jean'],
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        Text(
                          'Épicerie Jean - Douala',
                          style: TextStyle(
                            fontSize: 14,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      // Notifications
                    },
                    icon: Stack(
                      children: [
                        const Icon(
                          Icons.notifications_outlined,
                          color: AppColors.textSecondary,
                          size: 28,
                        ),
                        Positioned(
                          right: 2,
                          top: 2,
                          child: Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(
                              color: AppColors.errorColor,
                              shape: BoxShape.circle,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 32),

              // Alertes urgentes
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFF3E0),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFFFB74D)),
                ),
                child: Row(
                  children: [
                    const Icon(
                      Icons.warning_amber,
                      color: Color(0xFFFF8F00),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: 'urgentProductsExpiring'.toStaticText(
                        args: ['3'],
                        style: const TextStyle(
                          color: Color(0xFFE65100),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Text(
                        'Voir',
                        style: TextStyle(
                          color: Color(0xFFFF8F00),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Statistiques
              'yourPerformance'.toStaticText(
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),

              Row(
                children: [
                  Expanded(
                    child: StatCard(
                      title: 'activeProducts'.tr(),
                      value: '24',
                      icon: Icons.inventory_2_outlined,
                      color: AppColors.primaryColor,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: StatCard(
                      title: 'salesThisMonth'.tr(),
                      value: '12',
                      icon: Icons.trending_up,
                      color: Color(0xFF4CAF50),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: StatCard(
                      title: 'unreadMessages'.tr(),
                      value: '7',
                      icon: Icons.message_outlined,
                      color: Color(0xFF2196F3),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: StatCard(
                      title: 'revenueThisMonth'.tr(),
                      value: '240K',
                      subtitle: 'FCFA',
                      icon: Icons.account_balance_wallet_outlined,
                      color: Color(0xFF9C27B0),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 32),

              // Actions rapides
              'quickActions'.toStaticText(
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),

              Row(
                children: [
                  Expanded(
                    child: QuickActionCard(
                      title: 'publishProduct'.tr(),
                      subtitle: 'inLessThan20Seconds'.tr(),
                      icon: Icons.add_shopping_cart,
                      color: AppColors.primaryColor,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const AddProductScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: QuickActionCard(
                      title: 'marketplace'.tr(),
                      subtitle: 'seeOffers'.tr(),
                      icon: Icons.public,
                      color: const Color(0xFF2196F3),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const NationalFeedScreen(),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 32),

              // Activité récente
              'recentActivity'.toStaticText(
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),

              ..._buildRecentActivity(),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AddProductScreen(),
            ),
          );
        },
        backgroundColor: AppColors.primaryColor,
        foregroundColor: Colors.white,
        label: Text('publish'.tr()),
        icon: const Icon(Icons.add),
      ),
    );
  }

  List<Widget> _buildRecentActivity() {
    final activities = [
      {
        'icon': Icons.message_outlined,
        'title': 'Nouveau message de Marie Boutique',
        'subtitle': 'Négociation pour lot de yaourts',
        'time': 'Il y a 5 min',
        'color': const Color(0xFF2196F3),
      },
      {
        'icon': Icons.shopping_cart,
        'title': 'Vente réalisée',
        'subtitle': 'Lot de pains - 15,000 FCFA',
        'time': 'Il y a 2h',
        'color': const Color(0xFF4CAF50),
      },
      {
        'icon': Icons.visibility,
        'title': 'Nouveau produit consulté',
        'subtitle': 'Votre offre de légumes a été vue 12 fois',
        'time': 'Il y a 4h',
        'color': AppColors.primaryColor,
      },
    ];

    return activities.map((activity) {
      return Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: (activity['color'] as Color).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(
                activity['icon'] as IconData,
                color: activity['color'] as Color,
                size: 20,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  (activity['title'] as String).toDynamicText(
                    sourceLanguage: 'fr',
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 2),
                  (activity['subtitle'] as String).toDynamicText(
                    sourceLanguage: 'fr',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            (activity['time'] as String).toDynamicText(
              sourceLanguage: 'fr',
              style: const TextStyle(
                fontSize: 11,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      );
    }).toList();
  }
}