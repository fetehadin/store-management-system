// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_UserModel _$UserModelFromJson(Map<String, dynamic> json) => _UserModel(
  id: json['id'] as String,
  fullName: json['fullName'] as String,
  phone: json['phone'] as String,
  role: $enumDecodeNullable(_$RoleEnumMap, json['role']) ?? Role.salesRep,
  creditLimit: (json['creditLimit'] as num?)?.toDouble() ?? 0.0,
  creditBalance: (json['creditBalance'] as num?)?.toDouble() ?? 0.0,
  createdAt: json['createdAt'] == null
      ? null
      : DateTime.parse(json['createdAt'] as String),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$UserModelToJson(_UserModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'fullName': instance.fullName,
      'phone': instance.phone,
      'role': _$RoleEnumMap[instance.role]!,
      'creditLimit': instance.creditLimit,
      'creditBalance': instance.creditBalance,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

const _$RoleEnumMap = {Role.admin: 'ADMIN', Role.salesRep: 'SALES_REP'};
