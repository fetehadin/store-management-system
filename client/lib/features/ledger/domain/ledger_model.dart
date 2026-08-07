import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../core/domain/enums.dart';

part 'ledger_model.freezed.dart';
part 'ledger_model.g.dart';

@freezed
class LedgerEntryModel with _$LedgerEntryModel {
  const factory LedgerEntryModel({
    required String id,
    DateTime? transactionDate,
    required AuditEntity fromEntity,
    String? fromEntityId,
    required AuditEntity toEntity,
    String? toEntityId,
    @JsonKey(name: 'amount', defaultValue: 0.0) required double amount,
    required String transferMethod,
    String? receiptUrl,
    String? auditRemark,
    String? transactionRefId,
    DateTime? createdAt,
  }) = _LedgerEntryModel;

  factory LedgerEntryModel.fromJson(Map<String, dynamic> json) =>
      _$LedgerEntryModelFromJson(json);
}