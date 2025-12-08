import 'package:dio/dio.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../models/translation_cache_model.dart';

class TranslationService {
  static const String _defaultApiUrl = 'https://libretranslate.pussthecat.org/translate';
  static const String _cacheBoxName = 'translation_cache';

  late final Dio _dio;
  late final Box<TranslationCacheEntry> _cacheBox;

  TranslationService({
    String? apiUrl,
    String? apiKey,
  }) {
    _dio = Dio(BaseOptions(
      baseUrl: apiUrl ?? _defaultApiUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      headers: {
        'Content-Type': 'application/json',
        if (apiKey != null) 'Authorization': 'Bearer $apiKey',
      },
    ));

    _dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (obj) => print('🌐 Translation API: $obj'),
    ));
  }

  /// Initialise le service de traduction
  Future<void> initialize() async {
    await Hive.initFlutter();

    if (!Hive.isAdapterRegistered(1)) {
      Hive.registerAdapter(TranslationCacheEntryAdapter());
    }

    _cacheBox = await Hive.openBox<TranslationCacheEntry>(_cacheBoxName);

    // Nettoyer les traductions expirées au démarrage
    await _cleanExpiredCache();
  }

  /// Traduit un texte d'une langue à une autre
  Future<String> translate({
    required String text,
    required String from,
    required String to,
    bool forceRefresh = false,
  }) async {
    try {
      // Si c'est la même langue, retourner le texte original
      if (from == to) return text;

      // Créer la clé de cache
      final cacheKey = '${from}_${to}_${text.hashCode}';

      // Vérifier le cache si pas de refresh forcé
      if (!forceRefresh) {
        final cachedEntry = _cacheBox.get(cacheKey);
        if (cachedEntry != null && !cachedEntry.isExpired) {
          print('📋 Cache hit: ${cachedEntry.translatedText}');
          return cachedEntry.translatedText;
        }
      }

      print('🌐 Translating: "$text" from $from to $to');

      // Faire l'appel API
      final response = await _dio.post('', data: {
        'q': text,
        'source': _mapLanguageCode(from),
        'target': _mapLanguageCode(to),
        'format': 'text',
      });

      if (response.statusCode == 200) {
        final translatedText = response.data['translatedText'] as String;

        // Stocker en cache
        final cacheEntry = TranslationCacheEntry.create(
          originalText: text,
          translatedText: translatedText,
          fromLanguage: from,
          toLanguage: to,
        );

        await _cacheBox.put(cacheKey, cacheEntry);

        print('✅ Translation cached: "$translatedText"');
        return translatedText;
      } else {
        throw TranslationException('API request failed with status ${response.statusCode}');
      }
    } catch (e) {
      print('❌ Translation error: $e');

      // En cas d'erreur, essayer de retourner une traduction en cache même expirée
      final cacheKey = '${from}_${to}_${text.hashCode}';
      final cachedEntry = _cacheBox.get(cacheKey);
      if (cachedEntry != null) {
        print('⚠️ Using expired cache due to error');
        return cachedEntry.translatedText;
      }

      // En dernier recours, retourner le texte original
      return text;
    }
  }

  /// Traduit plusieurs textes en une seule fois
  Future<Map<String, String>> translateBatch({
    required List<String> texts,
    required String from,
    required String to,
    bool forceRefresh = false,
  }) async {
    final results = <String, String>{};

    // Traiter en parallèle avec limitation
    const batchSize = 5;
    for (int i = 0; i < texts.length; i += batchSize) {
      final batch = texts.skip(i).take(batchSize);
      final futures = batch.map((text) => translate(
        text: text,
        from: from,
        to: to,
        forceRefresh: forceRefresh,
      ));

      final translations = await Future.wait(futures);

      for (int j = 0; j < batch.length; j++) {
        results[batch.elementAt(j)] = translations[j];
      }
    }

    return results;
  }

  /// Mappe les codes de langue Flutter vers LibreTranslate
  String _mapLanguageCode(String flutterCode) {
    switch (flutterCode) {
      case 'fr':
        return 'fr';
      case 'en':
        return 'en';
      case 'ar':
        return 'ar';
      default:
        return 'en'; // Fallback vers anglais
    }
  }

  /// Nettoie les traductions expirées du cache
  Future<void> _cleanExpiredCache() async {
    final keysToDelete = <String>[];

    for (final key in _cacheBox.keys) {
      final entry = _cacheBox.get(key);
      if (entry != null && entry.isExpired) {
        keysToDelete.add(key as String);
      }
    }

    for (final key in keysToDelete) {
      await _cacheBox.delete(key);
    }

    if (keysToDelete.isNotEmpty) {
      print('🧹 Cleaned ${keysToDelete.length} expired cache entries');
    }
  }

  /// Vide complètement le cache
  Future<void> clearCache() async {
    await _cacheBox.clear();
    print('🗑️ Translation cache cleared');
  }

  /// Récupère les statistiques du cache
  Map<String, dynamic> getCacheStats() {
    final entries = _cacheBox.values.toList();
    final expiredCount = entries.where((e) => e.isExpired).length;

    return {
      'totalEntries': entries.length,
      'expiredEntries': expiredCount,
      'validEntries': entries.length - expiredCount,
      'cacheSize': _cacheBox.length,
      'languages': entries.map((e) => '${e.fromLanguage}->${e.toLanguage}').toSet().toList(),
    };
  }

  /// Ferme le service et libère les ressources
  Future<void> dispose() async {
    await _cacheBox.close();
    _dio.close();
  }
}

class TranslationException implements Exception {
  final String message;
  const TranslationException(this.message);

  @override
  String toString() => 'TranslationException: $message';
}