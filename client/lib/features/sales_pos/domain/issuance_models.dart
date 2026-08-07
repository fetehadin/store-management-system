import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../core/domain/enums.dart';
import '../../auth/domain/user_model.dart';

part 'issuance_models.freezed.dart';
part 'issuance_models.g.dart';

// --- prisma: model IssuanceItem ---
@freezed  abstract
class IssuanceItemModel with _$IssuanceItemModel {
  const factory IssuanceItemModel({
    required String id,
    required String issuanceId,
    required String productId,
    @JsonKey(name: 'wholesalePrice', defaultValue: 0.0) required double wholesalePrice,
    required int qtyIssued,
    @JsonKey(name: 'cogsCalculated', defaultValue: 0.0) required double cogsCalculated,
  }) = _IssuanceItemModel;

  factory IssuanceItemModel.fromJson(Map<String, dynamic> json) =>
      _$IssuanceItemModelFromJson(json);
}

// --- prisma: model StockIssuance ---
@freezed  abstract
class StockIssuanceModel with _$StockIssuanceModel {
  const factory StockIssuanceModel({
    required String id,
    required String userId,
    @Default(IssuanceStatus.issued) IssuanceStatus status,
    @JsonKey(name: 'totalWholesaleValue', defaultValue: 0.0) required double totalWholesaleValue,
    DateTime? createdAt,
    DateTime? updatedAt,
    @Default([]) List<IssuanceItemModel> items,
    UserModel? user,
  }) = _StockIssuanceModel;

  factory StockIssuanceModel.fromJson(Map<String, dynamic> json) =>
      _$StockIssuanceModelFromJson(json);
}