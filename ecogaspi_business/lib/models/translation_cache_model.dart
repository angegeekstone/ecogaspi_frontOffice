import 'package:hive/hive.dart';

part 'translation_cache_model.g.dart';

@HiveType(typeId: 1)
class TranslationCacheEntry extends HiveObject {
  @HiveField(0)
  final String originalText;

  @HiveField(1)
  final String translatedText;

  @HiveField(2)
  final String fromLanguage;

  @HiveField(3)
  final String toLanguage;

  @HiveField(4)
  final DateTime cachedAt;

  @HiveField(5)
  final DateTime? expiresAt;

  TranslationCacheEntry({
    required this.originalText,
    required this.translatedText,
    required this.fromLanguage,
    required this.toLanguage,
    required this.cachedAt,
    this.expiresAt,
  });

  String get cacheKey => '${fromLanguage}_${toLanguage}_${originalText.hashCode}';

  bool get isExpired {
    if (expiresAt == null) return false;
    return DateTime.now().isAfter(expiresAt!);
  }

  factory TranslationCacheEntry.create({
    required String originalText,
    required String translatedText,
    required String fromLanguage,
    required String toLanguage,
    Duration cacheDuration = const Duration(days: 30),
  }) {
    final now = DateTime.now();
    return TranslationCacheEntry(
      originalText: originalText,
      translatedText: translatedText,
      fromLanguage: fromLanguage,
      toLanguage: toLanguage,
      cachedAt: now,
      expiresAt: now.add(cacheDuration),
    );
  }

  @override
  String toString() {
    return 'TranslationCacheEntry(original: $originalText, translated: $translatedText, $fromLanguage->$toLanguage)';
  }
}