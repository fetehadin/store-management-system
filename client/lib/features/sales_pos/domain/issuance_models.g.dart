// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'issuance_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_IssuanceItemModel _$IssuanceItemModelFromJson(Map<String, dynamic> json) =>
    _IssuanceItemModel(
      id: json['id'] as String,
      issuanceId: json['issuanceId'] as String,
      productId: json['productId'] as String,
      wholesalePrice: (json['wholesalePrice'] as num?)?.toDouble() ?? 0.0,
      qtyIssued: (json['qtyIssued'] as num).toInt(),
      cogsCalculated: (json['cogsCalculated'] as num?)?.toDouble() ?? 0.0,
    );

Map<String, dynamic> _$IssuanceItemModelToJson(_IssuanceItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'issuanceId': instance.issuanceId,
      'productId': instance.productId,
      'wholesalePrice': instance.wholesalePrice,
      'qtyIssued': instance.qtyIssued,
      'cogsCalculated': instance.cogsCalculated,
    };

_StockIssuanceModel _$StockIssuanceModelFromJson(
  Map<String, dynamic> json,
) => _StockIssuanceModel(
  id: json['id'] as String,
  userId: json['userId'] as String,
  status:
      $enumDecodeNullable(_$IssuanceStatusEnumMap, json['status']) ??
      IssuanceStatus.issued,
  totalWholesaleValue: (json['totalWholesaleValue'] as num?)?.toDouble() ?? 0.0,
  createdAt: json['createdAt'] == null
      ? null
      : DateTime.parse(json['createdAt'] as String),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
  items:
      (json['items'] as List<dynamic>?)
          ?.map((e) => IssuanceItemModel.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  user: json['user'] == null
      ? null
      : UserModel.fromJson(json['user'] as Map<String, dynamic>),
);

Map<String, dynamic> _$StockIssuanceModelToJson(_StockIssuanceModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'status': _$IssuanceStatusEnumMap[instance.status]!,
      'totalWholesaleValue': instance.totalWholesaleValue,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
      'items': instance.items,
      'user': instance.user,
    };

const _$IssuanceStatusEnumMap = {
  IssuanceStatus.issued: 'ISSUED',
  IssuanceStatus.returned: 'RETURNED',
  IssuanceStatus.partialReturned: 'PARTIAL_RETURNED',
};
