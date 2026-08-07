// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'ledger_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$LedgerEntryModel {

 String get id; DateTime? get transactionDate; AuditEntity get fromEntity; String? get fromEntityId; AuditEntity get toEntity; String? get toEntityId;@JsonKey(name: 'amount', defaultValue: 0.0) double get amount; String get transferMethod; String? get receiptUrl; String? get auditRemark; String? get transactionRefId; DateTime? get createdAt;
/// Create a copy of LedgerEntryModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$LedgerEntryModelCopyWith<LedgerEntryModel> get copyWith => _$LedgerEntryModelCopyWithImpl<LedgerEntryModel>(this as LedgerEntryModel, _$identity);

  /// Serializes this LedgerEntryModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LedgerEntryModel&&(identical(other.id, id) || other.id == id)&&(identical(other.transactionDate, transactionDate) || other.transactionDate == transactionDate)&&(identical(other.fromEntity, fromEntity) || other.fromEntity == fromEntity)&&(identical(other.fromEntityId, fromEntityId) || other.fromEntityId == fromEntityId)&&(identical(other.toEntity, toEntity) || other.toEntity == toEntity)&&(identical(other.toEntityId, toEntityId) || other.toEntityId == toEntityId)&&(identical(other.amount, amount) || other.amount == amount)&&(identical(other.transferMethod, transferMethod) || other.transferMethod == transferMethod)&&(identical(other.receiptUrl, receiptUrl) || other.receiptUrl == receiptUrl)&&(identical(other.auditRemark, auditRemark) || other.auditRemark == auditRemark)&&(identical(other.transactionRefId, transactionRefId) || other.transactionRefId == transactionRefId)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,transactionDate,fromEntity,fromEntityId,toEntity,toEntityId,amount,transferMethod,receiptUrl,auditRemark,transactionRefId,createdAt);

@override
String toString() {
  return 'LedgerEntryModel(id: $id, transactionDate: $transactionDate, fromEntity: $fromEntity, fromEntityId: $fromEntityId, toEntity: $toEntity, toEntityId: $toEntityId, amount: $amount, transferMethod: $transferMethod, receiptUrl: $receiptUrl, auditRemark: $auditRemark, transactionRefId: $transactionRefId, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class $LedgerEntryModelCopyWith<$Res>  {
  factory $LedgerEntryModelCopyWith(LedgerEntryModel value, $Res Function(LedgerEntryModel) _then) = _$LedgerEntryModelCopyWithImpl;
@useResult
$Res call({
 String id, DateTime? transactionDate, AuditEntity fromEntity, String? fromEntityId, AuditEntity toEntity, String? toEntityId,@JsonKey(name: 'amount', defaultValue: 0.0) double amount, String transferMethod, String? receiptUrl, String? auditRemark, String? transactionRefId, DateTime? createdAt
});




}
/// @nodoc
class _$LedgerEntryModelCopyWithImpl<$Res>
    implements $LedgerEntryModelCopyWith<$Res> {
  _$LedgerEntryModelCopyWithImpl(this._self, this._then);

  final LedgerEntryModel _self;
  final $Res Function(LedgerEntryModel) _then;

/// Create a copy of LedgerEntryModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? transactionDate = freezed,Object? fromEntity = null,Object? fromEntityId = freezed,Object? toEntity = null,Object? toEntityId = freezed,Object? amount = null,Object? transferMethod = null,Object? receiptUrl = freezed,Object? auditRemark = freezed,Object? transactionRefId = freezed,Object? createdAt = freezed,}) {
  return _then(LedgerEntryModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,transactionDate: freezed == transactionDate ? _self.transactionDate : transactionDate // ignore: cast_nullable_to_non_nullable
as DateTime?,fromEntity: null == fromEntity ? _self.fromEntity : fromEntity // ignore: cast_nullable_to_non_nullable
as AuditEntity,fromEntityId: freezed == fromEntityId ? _self.fromEntityId : fromEntityId // ignore: cast_nullable_to_non_nullable
as String?,toEntity: null == toEntity ? _self.toEntity : toEntity // ignore: cast_nullable_to_non_nullable
as AuditEntity,toEntityId: freezed == toEntityId ? _self.toEntityId : toEntityId // ignore: cast_nullable_to_non_nullable
as String?,amount: null == amount ? _self.amount : amount // ignore: cast_nullable_to_non_nullable
as double,transferMethod: null == transferMethod ? _self.transferMethod : transferMethod // ignore: cast_nullable_to_non_nullable
as String,receiptUrl: freezed == receiptUrl ? _self.receiptUrl : receiptUrl // ignore: cast_nullable_to_non_nullable
as String?,auditRemark: freezed == auditRemark ? _self.auditRemark : auditRemark // ignore: cast_nullable_to_non_nullable
as String?,transactionRefId: freezed == transactionRefId ? _self.transactionRefId : transactionRefId // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [LedgerEntryModel].
extension LedgerEntryModelPatterns on LedgerEntryModel {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _LedgerEntryModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _LedgerEntryModel() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _LedgerEntryModel value)  $default,){
final _that = this;
switch (_that) {
case _LedgerEntryModel():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _LedgerEntryModel value)?  $default,){
final _that = this;
switch (_that) {
case _LedgerEntryModel() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  DateTime? transactionDate,  AuditEntity fromEntity,  String? fromEntityId,  AuditEntity toEntity,  String? toEntityId, @JsonKey(name: 'amount', defaultValue: 0.0)  double amount,  String transferMethod,  String? receiptUrl,  String? auditRemark,  String? transactionRefId,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _LedgerEntryModel() when $default != null:
return $default(_that.id,_that.transactionDate,_that.fromEntity,_that.fromEntityId,_that.toEntity,_that.toEntityId,_that.amount,_that.transferMethod,_that.receiptUrl,_that.auditRemark,_that.transactionRefId,_that.createdAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  DateTime? transactionDate,  AuditEntity fromEntity,  String? fromEntityId,  AuditEntity toEntity,  String? toEntityId, @JsonKey(name: 'amount', defaultValue: 0.0)  double amount,  String transferMethod,  String? receiptUrl,  String? auditRemark,  String? transactionRefId,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _LedgerEntryModel():
return $default(_that.id,_that.transactionDate,_that.fromEntity,_that.fromEntityId,_that.toEntity,_that.toEntityId,_that.amount,_that.transferMethod,_that.receiptUrl,_that.auditRemark,_that.transactionRefId,_that.createdAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  DateTime? transactionDate,  AuditEntity fromEntity,  String? fromEntityId,  AuditEntity toEntity,  String? toEntityId, @JsonKey(name: 'amount', defaultValue: 0.0)  double amount,  String transferMethod,  String? receiptUrl,  String? auditRemark,  String? transactionRefId,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _LedgerEntryModel() when $default != null:
return $default(_that.id,_that.transactionDate,_that.fromEntity,_that.fromEntityId,_that.toEntity,_that.toEntityId,_that.amount,_that.transferMethod,_that.receiptUrl,_that.auditRemark,_that.transactionRefId,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _LedgerEntryModel implements LedgerEntryModel {
  const _LedgerEntryModel({required this.id, this.transactionDate, required this.fromEntity, this.fromEntityId, required this.toEntity, this.toEntityId, @JsonKey(name: 'amount', defaultValue: 0.0) required this.amount, required this.transferMethod, this.receiptUrl, this.auditRemark, this.transactionRefId, this.createdAt});
  factory _LedgerEntryModel.fromJson(Map<String, dynamic> json) => _$LedgerEntryModelFromJson(json);

@override final  String id;
@override final  DateTime? transactionDate;
@override final  AuditEntity fromEntity;
@override final  String? fromEntityId;
@override final  AuditEntity toEntity;
@override final  String? toEntityId;
@override@JsonKey(name: 'amount', defaultValue: 0.0) final  double amount;
@override final  String transferMethod;
@override final  String? receiptUrl;
@override final  String? auditRemark;
@override final  String? transactionRefId;
@override final  DateTime? createdAt;

/// Create a copy of LedgerEntryModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$LedgerEntryModelCopyWith<_LedgerEntryModel> get copyWith => __$LedgerEntryModelCopyWithImpl<_LedgerEntryModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$LedgerEntryModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _LedgerEntryModel&&(identical(other.id, id) || other.id == id)&&(identical(other.transactionDate, transactionDate) || other.transactionDate == transactionDate)&&(identical(other.fromEntity, fromEntity) || other.fromEntity == fromEntity)&&(identical(other.fromEntityId, fromEntityId) || other.fromEntityId == fromEntityId)&&(identical(other.toEntity, toEntity) || other.toEntity == toEntity)&&(identical(other.toEntityId, toEntityId) || other.toEntityId == toEntityId)&&(identical(other.amount, amount) || other.amount == amount)&&(identical(other.transferMethod, transferMethod) || other.transferMethod == transferMethod)&&(identical(other.receiptUrl, receiptUrl) || other.receiptUrl == receiptUrl)&&(identical(other.auditRemark, auditRemark) || other.auditRemark == auditRemark)&&(identical(other.transactionRefId, transactionRefId) || other.transactionRefId == transactionRefId)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,transactionDate,fromEntity,fromEntityId,toEntity,toEntityId,amount,transferMethod,receiptUrl,auditRemark,transactionRefId,createdAt);

@override
String toString() {
  return 'LedgerEntryModel(id: $id, transactionDate: $transactionDate, fromEntity: $fromEntity, fromEntityId: $fromEntityId, toEntity: $toEntity, toEntityId: $toEntityId, amount: $amount, transferMethod: $transferMethod, receiptUrl: $receiptUrl, auditRemark: $auditRemark, transactionRefId: $transactionRefId, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$LedgerEntryModelCopyWith<$Res> implements $LedgerEntryModelCopyWith<$Res> {
  factory _$LedgerEntryModelCopyWith(_LedgerEntryModel value, $Res Function(_LedgerEntryModel) _then) = __$LedgerEntryModelCopyWithImpl;
@override @useResult
$Res call({
 String id, DateTime? transactionDate, AuditEntity fromEntity, String? fromEntityId, AuditEntity toEntity, String? toEntityId,@JsonKey(name: 'amount', defaultValue: 0.0) double amount, String transferMethod, String? receiptUrl, String? auditRemark, String? transactionRefId, DateTime? createdAt
});




}
/// @nodoc
class __$LedgerEntryModelCopyWithImpl<$Res>
    implements _$LedgerEntryModelCopyWith<$Res> {
  __$LedgerEntryModelCopyWithImpl(this._self, this._then);

  final _LedgerEntryModel _self;
  final $Res Function(_LedgerEntryModel) _then;

/// Create a copy of LedgerEntryModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? transactionDate = freezed,Object? fromEntity = null,Object? fromEntityId = freezed,Object? toEntity = null,Object? toEntityId = freezed,Object? amount = null,Object? transferMethod = null,Object? receiptUrl = freezed,Object? auditRemark = freezed,Object? transactionRefId = freezed,Object? createdAt = freezed,}) {
  return _then(_LedgerEntryModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,transactionDate: freezed == transactionDate ? _self.transactionDate : transactionDate // ignore: cast_nullable_to_non_nullable
as DateTime?,fromEntity: null == fromEntity ? _self.fromEntity : fromEntity // ignore: cast_nullable_to_non_nullable
as AuditEntity,fromEntityId: freezed == fromEntityId ? _self.fromEntityId : fromEntityId // ignore: cast_nullable_to_non_nullable
as String?,toEntity: null == toEntity ? _self.toEntity : toEntity // ignore: cast_nullable_to_non_nullable
as AuditEntity,toEntityId: freezed == toEntityId ? _self.toEntityId : toEntityId // ignore: cast_nullable_to_non_nullable
as String?,amount: null == amount ? _self.amount : amount // ignore: cast_nullable_to_non_nullable
as double,transferMethod: null == transferMethod ? _self.transferMethod : transferMethod // ignore: cast_nullable_to_non_nullable
as String,receiptUrl: freezed == receiptUrl ? _self.receiptUrl : receiptUrl // ignore: cast_nullable_to_non_nullable
as String?,auditRemark: freezed == auditRemark ? _self.auditRemark : auditRemark // ignore: cast_nullable_to_non_nullable
as String?,transactionRefId: freezed == transactionRefId ? _self.transactionRefId : transactionRefId // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
