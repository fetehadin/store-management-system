// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'inventory_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SupplierModel _$SupplierModelFromJson(Map<String, dynamic> json) =>
    _SupplierModel(
      id: json['id'] as String,
      name: json['name'] as String,
      phone: json['phone'] as String,
      creditBalance: (json['creditBalance'] as num?)?.toDouble() ?? 0.0,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$SupplierModelToJson(_SupplierModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'phone': instance.phone,
      'creditBalance': instance.creditBalance,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

_ProductModel _$ProductModelFromJson(Map<String, dynamic> json) =>
    _ProductModel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String?,
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$ProductModelToJson(_ProductModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'price': instance.price,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

_InventoryBatchModel _$InventoryBatchModelFromJson(Map<String, dynamic> json) =>
    _InventoryBatchModel(
      id: json['id'] as String,
      batchCode: json['batchCode'] as String,
      productId: json['productId'] as String,
      supplierId: json['supplierId'] as String,
      quantityReceived: (json['quantityRecieved'] as num).toInt(),
      remainingQty: (json['remainingQty'] as num).toInt(),
      unitCostPrice: (json['unitCostPrice'] as num?)?.toDouble() ?? 0.0,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
      product: json['product'] == null
          ? null
          : ProductModel.fromJson(json['product'] as Map<String, dynamic>),
      supplier: json['supplier'] == null
          ? null
          : SupplierModel.fromJson(json['supplier'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$InventoryBatchModelToJson(
  _InventoryBatchModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'batchCode': instance.batchCode,
  'productId': instance.productId,
  'supplierId': instance.supplierId,
  'quantityRecieved': instance.quantityReceived,
  'remainingQty': instance.remainingQty,
  'unitCostPrice': instance.unitCostPrice,
  'createdAt': instance.createdAt?.toIso8601String(),
  'updatedAt': instance.updatedAt?.toIso8601String(),
  'product': instance.product,
  'supplier': instance.supplier,
};
