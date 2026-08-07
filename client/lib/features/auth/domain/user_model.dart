import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../core/domain/enums.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';


@freezed  abstract
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String fullName,
    required String phone,
    @Default(Role.salesRep) Role role,
    @JsonKey(name: 'creditLimit', defaultValue: 0.0) required double creditLimit,
    @JsonKey(name: 'creditBalance', defaultValue: 0.0) required double creditBalance,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}

extension UserModelX on UserModel {
  double get availableCredit => (creditLimit - creditBalance).clamp(0.0, double.infinity);
  bool get isCreditMaxed => creditBalance >= creditLimit && creditLimit > 0;
}