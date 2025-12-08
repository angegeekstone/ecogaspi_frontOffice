import 'package:flutter/material.dart';
import '../services/language_service.dart';

class LanguageProvider extends ChangeNotifier {
  Locale _currentLocale = const Locale('fr');

  Locale get currentLocale => _currentLocale;

  Future<void> loadSavedLanguage() async {
    _currentLocale = await LanguageService.getSavedLanguage();
    notifyListeners();
  }

  Future<void> changeLanguage(Locale locale) async {
    if (_currentLocale == locale) return;

    _currentLocale = locale;
    await LanguageService.saveLanguage(locale);

    // Forcer un rebuild complet - notifier plusieurs fois
    notifyListeners();

    // Attendre un frame puis notifier à nouveau pour s'assurer que tout se rebuild
    await Future.delayed(const Duration(milliseconds: 50));
    notifyListeners();
  }

  bool get isRTL => _currentLocale.languageCode == 'ar';
}