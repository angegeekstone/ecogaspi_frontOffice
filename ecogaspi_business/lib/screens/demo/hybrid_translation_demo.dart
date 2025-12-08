import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../constants/app_colors.dart';
import '../../widgets/smart_text.dart';

class HybridTranslationDemo extends ConsumerWidget {
  const HybridTranslationDemo({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppColors.backgroundColor,
      appBar: AppBar(
        title: 'translationDemo'.toStaticText(), // Utilise Easy Localization
        backgroundColor: AppColors.primaryColor,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Section pour les traductions statiques
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    'staticTranslations'.toStaticText(
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    'dashboard'.toStaticText(),
                    'products'.toStaticText(),
                    'messages'.toStaticText(),
                    'profile'.toStaticText(),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Section pour les traductions dynamiques
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    'dynamicTranslations'.toStaticText(
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Exemples de données provenant d'une API
                    'Pommes bio fraîches'.toDynamicText(
                      sourceLanguage: 'fr',
                      loadingWidget: const Row(
                        children: [
                          SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          ),
                          SizedBox(width: 8),
                          Text('Traduction en cours...')
                        ],
                      ),
                    ),

                    const SizedBox(height: 8),

                    'Fresh organic chicken from local farm'.toDynamicText(
                      sourceLanguage: 'en',
                    ),

                    const SizedBox(height: 8),

                    'خضار طازجة مزروعة محلياً'.toDynamicText(
                      sourceLanguage: 'ar',
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Bouton pour changer de langue
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => _showLanguageSelector(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryColor,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: 'changeLanguage'.toStaticText(
                  style: const TextStyle(color: Colors.white),
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Informations sur la langue actuelle
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  Text(
                    '${'currentLanguage'.tr()}: ${_getLanguageName(context.locale.languageCode)}',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${'isRTL'.tr()}: ${context.locale.languageCode == 'ar' ? 'Oui' : 'Non'}',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getLanguageName(String code) {
    switch (code) {
      case 'fr': return 'Français';
      case 'en': return 'English';
      case 'ar': return 'العربية';
      default: return code;
    }
  }

  void _showLanguageSelector(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: 'chooseLanguage'.toStaticText(),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildLanguageOption(context, 'fr', 'Français', '🇫🇷'),
            _buildLanguageOption(context, 'en', 'English', '🇺🇸'),
            _buildLanguageOption(context, 'ar', 'العربية', '🇸🇦'),
          ],
        ),
      ),
    );
  }

  Widget _buildLanguageOption(BuildContext context, String code, String name, String flag) {
    final isSelected = context.locale.languageCode == code;

    return ListTile(
      leading: Text(flag, style: const TextStyle(fontSize: 24)),
      title: Text(name),
      trailing: isSelected ? const Icon(Icons.check, color: AppColors.primaryColor) : null,
      onTap: () {
        if (!isSelected) {
          context.setLocale(Locale(code));
          Navigator.pop(context);

          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: 'languageChanged'.toStaticText(),
              backgroundColor: AppColors.primaryColor,
            ),
          );
        }
      },
    );
  }
}