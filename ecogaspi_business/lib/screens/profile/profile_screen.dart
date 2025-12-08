import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../constants/app_colors.dart';
import '../../widgets/smart_text.dart';
import '../settings/language_settings_screen.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header avec profil
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppColors.primaryColor,
                    AppColors.primaryColor.withValues(alpha: 0.8),
                  ],
                ),
              ),
              child: SafeArea(
                child: Column(
                  children: [
                    // Photo de profil et infos
                    const CircleAvatar(
                      radius: 40,
                      backgroundColor: Colors.white,
                      child: Icon(
                        Icons.store,
                        size: 40,
                        color: AppColors.primaryColor,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Jean Boutique',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Épicerie Jean - Douala, Akwa',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.verified,
                            size: 16,
                            color: Colors.white,
                          ),
                          const SizedBox(width: 4),
                          'verifiedMerchant'.toStaticText(
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 24),

                    // Stats rapides
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildStatItem('24', 'activeProducts'.tr()),
                        _buildStatItem('127', 'totalSales'.tr()),
                        _buildStatItem('4.8★', 'averageRating'.tr()),
                      ],
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Menu principal
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  _buildMenuSection(
                    'myBusiness'.tr(),
                    [
                      _buildMenuItem(
                        Icons.analytics_outlined,
                        'salesStatistics'.tr(),
                        'viewYourPerformance'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.account_balance_wallet_outlined,
                        'walletPayments'.tr(),
                        'manageYourTransactions'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.star_outline,
                        'reviewsRatings'.tr(),
                        'viewCustomerReviews'.tr(),
                        () {},
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  _buildMenuSection(
                    'settings'.tr(),
                    [
                      _buildMenuItem(
                        Icons.person_outline,
                        'personalInformation'.tr(),
                        'editYourProfile'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.store_outlined,
                        'businessInformation'.tr(),
                        'businessDetails'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.notifications_outlined,
                        'notifications'.tr(),
                        'manageYourAlerts'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.security_outlined,
                        'security'.tr(),
                        'securitySettings'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.language_outlined,
                        'language'.tr(),
                        '${_getLanguageFlag(context.locale.languageCode)} ${_getLanguageName(context.locale.languageCode)}',
                        () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const LanguageSettingsScreen(),
                            ),
                          );
                        },
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  _buildMenuSection(
                    'support'.tr(),
                    [
                      _buildMenuItem(
                        Icons.help_outline,
                        'helpCenter'.tr(),
                        'faqAndGuides'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.chat_outlined,
                        'contactSupport'.tr(),
                        'weHelpYou'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.feedback_outlined,
                        'giveFeedback'.tr(),
                        'improveTogether'.tr(),
                        () {},
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  _buildMenuSection(
                    'application'.tr(),
                    [
                      _buildMenuItem(
                        Icons.info_outline,
                        'about'.tr(),
                        'version'.tr(),
                        () {},
                      ),
                      _buildMenuItem(
                        Icons.policy_outlined,
                        'termsOfService'.tr(),
                        'termsAndPrivacy'.tr(),
                        () {},
                      ),
                    ],
                  ),

                  const SizedBox(height: 32),

                  // Bouton déconnexion
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(
                      onPressed: () {
                        _showLogoutDialog(context);
                      },
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        side: const BorderSide(color: AppColors.errorColor),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: 'signOut'.toStaticText(
                        style: TextStyle(
                          color: AppColors.errorColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 12,
            color: Colors.white70,
          ),
        ),
      ],
    );
  }

  Widget _buildMenuSection(String title, List<Widget> items) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 16),
          ...items,
        ],
      ),
    );
  }

  Widget _buildMenuItem(
    IconData icon,
    String title,
    String subtitle,
    VoidCallback onTap,
  ) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                icon,
                color: AppColors.primaryColor,
                size: 20,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.chevron_right,
              color: AppColors.textSecondary,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        title: 'signOut'.toStaticText(
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            color: AppColors.textPrimary,
          ),
        ),
        content: 'confirmSignOut'.toStaticText(
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: 'cancel'.toStaticText(
              style: const TextStyle(
                color: AppColors.textSecondary,
              ),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              // Logic de déconnexion
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.errorColor,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: 'signOut'.toStaticText(),
          ),
        ],
      ),
    );
  }

  String _getLanguageFlag(String languageCode) {
    switch (languageCode) {
      case 'fr':
        return '🇫🇷';
      case 'ar':
        return '🇸🇦';
      case 'en':
        return '🇺🇸';
      default:
        return '🌍';
    }
  }

  String _getLanguageName(String languageCode) {
    switch (languageCode) {
      case 'fr':
        return 'Français';
      case 'ar':
        return 'العربية';
      case 'en':
        return 'English';
      default:
        return 'Unknown';
    }
  }
}