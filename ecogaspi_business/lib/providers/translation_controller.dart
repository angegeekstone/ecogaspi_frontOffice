import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../services/translation_service.dart';

// Provider pour le service de traduction
final translationServiceProvider = Provider<TranslationService>((ref) {
  return TranslationService();
});

// État pour une traduction dynamique
class DynamicTranslation {
  final String originalText;
  final String translatedText;
  final String fromLanguage;
  final String toLanguage;
  final bool isLoading;
  final String? error;

  const DynamicTranslation({
    required this.originalText,
    required this.translatedText,
    required this.fromLanguage,
    required this.toLanguage,
    this.isLoading = false,
    this.error,
  });

  DynamicTranslation copyWith({
    String? originalText,
    String? translatedText,
    String? fromLanguage,
    String? toLanguage,
    bool? isLoading,
    String? error,
  }) {
    return DynamicTranslation(
      originalText: originalText ?? this.originalText,
      translatedText: translatedText ?? this.translatedText,
      fromLanguage: fromLanguage ?? this.fromLanguage,
      toLanguage: toLanguage ?? this.toLanguage,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}

// Controller pour gérer les traductions dynamiques
class TranslationController extends StateNotifier<Map<String, DynamicTranslation>> {
  final TranslationService _translationService;

  TranslationController(this._translationService) : super({});

  /// Traduit un texte dynamique et met à jour l'état
  Future<String> translateDynamic({
    required String text,
    required String from,
    String? to,
    bool forceRefresh = false,
  }) async {
    // Utiliser la langue actuelle si 'to' n'est pas spécifié
    final targetLanguage = to ?? 'en';

    final key = '${from}_${targetLanguage}_${text.hashCode}';

    // Créer l'état initial avec loading
    state = {
      ...state,
      key: DynamicTranslation(
        originalText: text,
        translatedText: text, // Texte original en attendant
        fromLanguage: from,
        toLanguage: targetLanguage,
        isLoading: true,
      ),
    };

    try {
      final translatedText = await _translationService.translate(
        text: text,
        from: from,
        to: targetLanguage,
        forceRefresh: forceRefresh,
      );

      // Mettre à jour avec la traduction
      state = {
        ...state,
        key: DynamicTranslation(
          originalText: text,
          translatedText: translatedText,
          fromLanguage: from,
          toLanguage: targetLanguage,
          isLoading: false,
        ),
      };

      return translatedText;
    } catch (e) {
      // En cas d'erreur, garder le texte original
      state = {
        ...state,
        key: DynamicTranslation(
          originalText: text,
          translatedText: text,
          fromLanguage: from,
          toLanguage: targetLanguage,
          isLoading: false,
          error: e.toString(),
        ),
      };

      return text;
    }
  }

  /// Traduit plusieurs textes en batch
  Future<Map<String, String>> translateBatch({
    required Map<String, String> textMap, // key -> original text
    required String from,
    String? to,
    bool forceRefresh = false,
  }) async {
    final targetLanguage = to ?? 'en';
    final results = <String, String>{};

    // Marquer tous comme loading
    final loadingStates = <String, DynamicTranslation>{};
    for (final entry in textMap.entries) {
      final key = '${from}_${targetLanguage}_${entry.value.hashCode}';
      loadingStates[key] = DynamicTranslation(
        originalText: entry.value,
        translatedText: entry.value,
        fromLanguage: from,
        toLanguage: targetLanguage,
        isLoading: true,
      );
    }

    state = {...state, ...loadingStates};

    try {
      final translations = await _translationService.translateBatch(
        texts: textMap.values.toList(),
        from: from,
        to: targetLanguage,
        forceRefresh: forceRefresh,
      );

      // Mettre à jour les états avec les traductions
      final finalStates = <String, DynamicTranslation>{};
      for (final entry in textMap.entries) {
        final translatedText = translations[entry.value] ?? entry.value;
        final key = '${from}_${targetLanguage}_${entry.value.hashCode}';

        finalStates[key] = DynamicTranslation(
          originalText: entry.value,
          translatedText: translatedText,
          fromLanguage: from,
          toLanguage: targetLanguage,
          isLoading: false,
        );

        results[entry.key] = translatedText;
      }

      state = {...state, ...finalStates};
      return results;
    } catch (e) {
      // En cas d'erreur, garder les textes originaux
      final errorStates = <String, DynamicTranslation>{};
      for (final entry in textMap.entries) {
        final key = '${from}_${targetLanguage}_${entry.value.hashCode}';
        errorStates[key] = DynamicTranslation(
          originalText: entry.value,
          translatedText: entry.value,
          fromLanguage: from,
          toLanguage: targetLanguage,
          isLoading: false,
          error: e.toString(),
        );

        results[entry.key] = entry.value;
      }

      state = {...state, ...errorStates};
      return results;
    }
  }

  /// Vide le cache des traductions
  Future<void> clearCache() async {
    await _translationService.clearCache();
    state = {};
  }

  /// Récupère une traduction depuis l'état actuel
  String? getTranslation(String text, String from, String to) {
    final key = '${from}_${to}_${text.hashCode}';
    return state[key]?.translatedText;
  }

  /// Vérifie si une traduction est en cours
  bool isTranslating(String text, String from, String to) {
    final key = '${from}_${to}_${text.hashCode}';
    return state[key]?.isLoading ?? false;
  }
}

// Provider pour le controller
final translationControllerProvider = StateNotifierProvider<TranslationController, Map<String, DynamicTranslation>>((ref) {
  final service = ref.read(translationServiceProvider);
  return TranslationController(service);
});

// Provider pour obtenir une traduction spécifique
final dynamicTranslationProvider = Provider.family<String?, (String, String, String)>((ref, params) {
  final (text, from, to) = params;
  final controller = ref.watch(translationControllerProvider.notifier);
  return controller.getTranslation(text, from, to);
});

// Provider pour vérifier l'état de loading d'une traduction
final translationLoadingProvider = Provider.family<bool, (String, String, String)>((ref, params) {
  final (text, from, to) = params;
  final controller = ref.watch(translationControllerProvider.notifier);
  return controller.isTranslating(text, from, to);
});