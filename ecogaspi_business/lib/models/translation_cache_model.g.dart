// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'translation_cache_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class TranslationCacheEntryAdapter extends TypeAdapter<TranslationCacheEntry> {
  @override
  final int typeId = 1;

  @override
  TranslationCacheEntry read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return TranslationCacheEntry(
      originalText: fields[0] as String,
      translatedText: fields[1] as String,
      fromLanguage: fields[2] as String,
      toLanguage: fields[3] as String,
      cachedAt: fields[4] as DateTime,
      expiresAt: fields[5] as DateTime?,
    );
  }

  @override
  void write(BinaryWriter writer, TranslationCacheEntry obj) {
    writer
      ..writeByte(6)
      ..writeByte(0)
      ..write(obj.originalText)
      ..writeByte(1)
      ..write(obj.translatedText)
      ..writeByte(2)
      ..write(obj.fromLanguage)
      ..writeByte(3)
      ..write(obj.toLanguage)
      ..writeByte(4)
      ..write(obj.cachedAt)
      ..writeByte(5)
      ..write(obj.expiresAt);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is TranslationCacheEntryAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
