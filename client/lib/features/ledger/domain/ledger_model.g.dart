// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ledger_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_LedgerEntryModel _$LedgerEntryModelFromJson(Map<String, dynamic> json) =>
    _LedgerEntryModel(
      id: json['id'] as String,
      transactionDate: json['transactionDate'] == null
          ? null
          : DateTime.parse(json['transactionDate'] as String),
      fromEntity: $enumDecode(_$AuditEntityEnumMap, json['fromEntity']),
      fromEntityId: json['fromEntityId'] as String?,
      toEntity: $enumDecode(_$AuditEntityEnumMap, json['toEntity']),
      toEntityId: json['toEntityId'] as String?,
      amount: (json['amount'] as num?)?.toDouble() ?? 0.0,
      transferMethod: json['transferMethod'] as String,
      receiptUrl: json['receiptUrl'] as String?,
      auditRemark: json['auditRemark'] as String?,
      transactionRefId: json['transactionRefId'] as String?,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$LedgerEntryModelToJson(_LedgerEntryModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'transactionDate': instance.transactionDate?.toIso8601String(),
      'fromEntity': _$AuditEntityEnumMap[instance.fromEntity]!,
      'fromEntityId': instance.fromEntityId,
      'toEntity': _$AuditEntityEnumMap[instance.toEntity]!,
      'toEntityId': instance.toEntityId,
      'amount': instance.amount,
      'transferMethod': instance.transferMethod,
      'receiptUrl': instance.receiptUrl,
      'auditRemark': instance.auditRemark,
      'transactionRefId': instance.transactionRefId,
      'createdAt': instance.createdAt?.toIso8601String(),
    };

const _$AuditEntityEnumMap = {
  AuditEntity.adminStore: 'ADMIN_STORE',
  AuditEntity.salesRep: 'SALES_REP',
  AuditEntity.supplier: 'SUPPLIER',
  AuditEntity.directBuyer: 'DIRECT_BUYER',
};
