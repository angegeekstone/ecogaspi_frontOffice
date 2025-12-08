import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../providers/translation_controller.dart';

/// Widget intelligent pour traductions hybrides
/// Utilise Easy Localization pour les clés statiques
/// et TranslationController pour les textes dynamiques
class SmartText extends ConsumerWidget {
  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;
  final String? sourceLanguage;
  final bool isDynamic;
  final Widget? loadingWidget;

  const SmartText(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.sourceLanguage,
    this.isDynamic = false,
    this.loadingWidget,
  });

  /// Constructeur pour textes statiques (clés de traduction)
  const SmartText.static(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
  }) : sourceLanguage = null,
       isDynamic = false,
       loadingWidget = null;

  /// Constructeur pour textes dynamiques (nécessitent traduction)
  const SmartText.dynamic(
    this.text, {
    super.key,
    required this.sourceLanguage,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.loadingWidget,
  }) : isDynamic = true;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (!isDynamic) {
      // Texte statique : utilise Easy Localization
      return Text(
        text.tr(),
        style: style,
        textAlign: textAlign,
        maxLines: maxLines,
        overflow: overflow,
      );
    }

    // Texte dynamique : utilise TranslationController
    final currentLocale = context.locale.languageCode;
    final sourceLocale = sourceLanguage ?? 'en';

    // Si c'est déjà dans la bonne langue, afficher directement
    if (sourceLocale == currentLocale) {
      return Text(
        text,
        style: style,
        textAlign: textAlign,
        maxLines: maxLines,
        overflow: overflow,
      );
    }

    // Récupérer la traduction depuis l'état
    final translationKey = '${sourceLocale}_${currentLocale}_${text.hashCode}';
    final translations = ref.watch(translationControllerProvider);
    final translation = translations[translationKey];

    // Si pas encore traduit, déclencher la traduction
    if (translation == null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        ref.read(translationControllerProvider.notifier).translateDynamic(
          text: text,
          from: sourceLocale,
          to: currentLocale,
        );
      });

      // Afficher le widget de loading ou le texte original
      return loadingWidget ?? Text(
        text,
        style: style?.copyWith(color: Colors.grey),
        textAlign: textAlign,
        maxLines: maxLines,
        overflow: overflow,
      );
    }

    // Afficher la traduction
    return Text(
      translation.translatedText,
      style: style,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
    );
  }
}

/// Extension pour simplifier l'utilisation
extension SmartTranslation on String {
  /// Crée un SmartText statique
  Widget toStaticText({
    TextStyle? style,
    TextAlign? textAlign,
    int? maxLines,
    TextOverflow? overflow,
    List<Object>? args,
  }) {
    String translatedText = this.tr();

    // Si des arguments sont fournis, les appliquer
    if (args != null && args.isNotEmpty) {
      for (int i = 0; i < args.length; i++) {
        translatedText = translatedText.replaceAll('{}', args[i].toString());
      }
    }

    return Text(
      translatedText,
      style: style,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
    );
  }

  /// Crée un SmartText dynamique
  Widget toDynamicText({
    required String sourceLanguage,
    TextStyle? style,
    TextAlign? textAlign,
    int? maxLines,
    TextOverflow? overflow,
    Widget? loadingWidget,
  }) {
    return SmartText.dynamic(
      this,
      sourceLanguage: sourceLanguage,
      style: style,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
      loadingWidget: loadingWidget,
    );
  }
}

/// Widget pour une liste de traductions dynamiques
class SmartTextList extends ConsumerWidget {
  final List<MapEntry<String, String>> items; // key -> original text
  final String sourceLanguage;
  final Widget Function(String key, String translatedText) itemBuilder;
  final Widget? loadingBuilder;

  const SmartTextList({
    super.key,
    required this.items,
    required this.sourceLanguage,
    required this.itemBuilder,
    this.loadingBuilder,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentLocale = context.locale.languageCode;

    // Si c'est déjà dans la bonne langue, construire directement
    if (sourceLanguage == currentLocale) {
      return Column(
        children: items.map((entry) => itemBuilder(entry.key, entry.value)).toList(),
      );
    }

    // Récupérer l'état des traductions
    final translations = ref.watch(translationControllerProvider);
    final controller = ref.read(translationControllerProvider.notifier);

    // Vérifier si toutes les traductions sont disponibles
    final allTranslated = items.every((entry) {
      final key = '${sourceLanguage}_${currentLocale}_${entry.value.hashCode}';
      return translations.containsKey(key) && !translations[key]!.isLoading;
    });

    if (!allTranslated) {
      // Déclencher la traduction en batch
      WidgetsBinding.instance.addPostFrameCallback((_) {
        final textMap = Map.fromEntries(items);
        controller.translateBatch(
          textMap: textMap,
          from: sourceLanguage,
          to: currentLocale,
        );
      });

      // Afficher le widget de loading
      return loadingBuilder ?? const Center(child: CircularProgressIndicator());
    }

    // Construire la liste avec les traductions
    return Column(
      children: items.map((entry) {
        final key = '${sourceLanguage}_${currentLocale}_${entry.value.hashCode}';
        final translation = translations[key]?.translatedText ?? entry.value;
        return itemBuilder(entry.key, translation);
      }).toList(),
    );
  }
}