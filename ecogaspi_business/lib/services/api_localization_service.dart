import 'dart:ui';
import 'package:flutter/material.dart';
import '../generated/l10n/app_localizations.dart';

class ApiLocalizationService {
  /// Traduit les catégories de produits depuis l'API
  static String translateProductCategory(String categoryKey, BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    switch (categoryKey.toLowerCase()) {
      case 'fruits_vegetables':
        return l10n.fruitsVegetables;
      case 'dairy':
        return l10n.dairy;
      case 'meat_fish':
        return l10n.meatFish;
      case 'bakery':
        return l10n.bakery;
      case 'beverages':
        return l10n.beverages;
      case 'processed_foods':
        return l10n.processedFoods;
      case 'spices_condiments':
        return l10n.spicesCondiments;
      case 'frozen_foods':
        return l10n.frozenFoods;
      default:
        return categoryKey; // Retourne la clé si pas de traduction
    }
  }

  /// Traduit les statuts de commandes depuis l'API
  static String translateOrderStatus(String statusKey, BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    switch (statusKey.toLowerCase()) {
      case 'pending':
        return l10n.statusPending;
      case 'confirmed':
        return l10n.statusConfirmed;
      case 'shipped':
        return l10n.statusShipped;
      case 'delivered':
        return l10n.statusDelivered;
      case 'cancelled':
        return l10n.statusCancelled;
      default:
        return statusKey;
    }
  }

  /// Traduit les unités depuis l'API
  static String translateUnit(String unitKey, BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    switch (unitKey.toLowerCase()) {
      case 'kg':
        return l10n.unitKg;
      case 'g':
        return l10n.unitG;
      case 'l':
        return l10n.unitL;
      case 'ml':
        return l10n.unitMl;
      case 'piece':
        return l10n.unitPiece;
      case 'box':
        return l10n.unitBox;
      case 'pack':
        return l10n.unitPack;
      default:
        return unitKey;
    }
  }

  /// Formate les dates selon la locale
  static String formatDate(DateTime date, BuildContext context) {
    final locale = Localizations.localeOf(context);

    switch (locale.languageCode) {
      case 'fr':
        return '${date.day}/${date.month}/${date.year}';
      case 'ar':
        return '${date.day}/${date.month}/${date.year}'; // Ou format arabe spécifique
      case 'en':
      default:
        return '${date.month}/${date.day}/${date.year}';
    }
  }

  /// Formate les prix selon la locale
  static String formatPrice(double price, BuildContext context) {
    final locale = Localizations.localeOf(context);

    switch (locale.languageCode) {
      case 'fr':
        return '${price.toStringAsFixed(0)} FCFA';
      case 'ar':
        return '${price.toStringAsFixed(0)} فرنك';
      case 'en':
      default:
        return '${price.toStringAsFixed(0)} FCFA';
    }
  }

  /// Envoie la langue actuelle dans les requêtes API
  static Map<String, String> getApiHeaders(BuildContext context) {
    final locale = Localizations.localeOf(context);

    return {
      'Accept-Language': locale.languageCode,
      'Content-Type': 'application/json',
    };
  }

  /// Construit l'URL d'API avec la langue
  static String buildApiUrl(String baseUrl, BuildContext context) {
    final locale = Localizations.localeOf(context);
    final separator = baseUrl.contains('?') ? '&' : '?';
    return '$baseUrl${separator}lang=${locale.languageCode}';
  }
}