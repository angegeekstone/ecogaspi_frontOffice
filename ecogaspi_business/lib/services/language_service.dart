import 'dart:ui';
import 'package:shared_preferences/shared_preferences.dart';

class LanguageService {
  static const String _languageKey = 'selected_language';

  static final List<Locale> supportedLocales = [
    const Locale('fr'), // Français
    const Locale('ar'), // العربية
    const Locale('en'), // English (fallback)
  ];

  static Future<Locale> getSavedLanguage() async {
    final prefs = await SharedPreferences.getInstance();
    final languageCode = prefs.getString(_languageKey);

    if (languageCode != null) {
      return Locale(languageCode);
    }

    // Détecter la langue système par défaut
    final systemLocale = PlatformDispatcher.instance.locale;
    if (supportedLocales.contains(systemLocale)) {
      return systemLocale;
    }

    // Français par défaut
    return const Locale('fr');
  }

  static Future<bool> saveLanguage(Locale locale) async {
    final prefs = await SharedPreferences.getInstance();
    return await prefs.setString(_languageKey, locale.languageCode);
  }

  static String getLanguageName(Locale locale) {
    switch (locale.languageCode) {
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

  static String getLanguageFlag(Locale locale) {
    switch (locale.languageCode) {
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
}