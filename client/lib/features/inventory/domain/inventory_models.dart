import 'package:freezed_annotation/freezed_annotation.dart';

part 'inventory_models.freezed.dart';
part 'inventory_models.g.dart';

// --- prisma: model Supplier ---
@freezed  abstract
class SupplierModel with _$SupplierModel {
  const factory SupplierModel({
    required String id,
    required String name,
    required String phone,
    @JsonKey(name: 'creditBalance', defaultValue: 0.0) required double creditBalance,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _SupplierModel;

  factory SupplierModel.fromJson(Map<String, dynamic> json) =>
      _$SupplierModelFromJson(json);
}

// --- prisma: model Product ---
@freezed  abstract
class ProductModel with _$ProductModel {
  const factory ProductModel({
    required String id,
    required String name,
    String? description,
    @JsonKey(name: 'price', defaultValue: 0.0) required double price,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _ProductModel;

  factory ProductModel.fromJson(Map<String, dynamic> json) =>
      _$ProductModelFromJson(json);
}

// --- prisma: model InventoryBatch ---
@freezed  abstract
class InventoryBatchModel with _$InventoryBatchModel {
  const factory InventoryBatchModel({
    required String id,
    required String batchCode,
    required String productId,
    required String supplierId,
    // Exact Prisma column spelling preserved:
    @JsonKey(name: 'quantityRecieved') required int quantityReceived,
    required int remainingQty,
    @JsonKey(name: 'unitCostPrice', defaultValue: 0.0) required double unitCostPrice,
    DateTime? createdAt,
    DateTime? updatedAt,
    // Optional nested relations when included by Prisma:
    ProductModel? product,
    SupplierModel? supplier,
  }) = _InventoryBatchModel;

  factory InventoryBatchModel.fromJson(Map<String, dynamic> json) =>
      _$InventoryBatchModelFromJson(json);
}